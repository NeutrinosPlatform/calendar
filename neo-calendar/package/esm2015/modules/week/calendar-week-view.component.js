import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, roundToNearest, trackByWeekDayHeaderDate, trackByHourSegment, trackByHour, getMinutesMoved, getDefaultEventEnd, getMinimumEventHeightInMinutes, addDaysWithExclusions, isDraggedWithinPeriod, shouldFireDroppedEvent, getWeekViewPeriod, trackByWeekAllDayEvent, trackByWeekTimeEvent } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
let CalendarWeekViewComponent = class CalendarWeekViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 60;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current week.
         * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.allDayEventResizes = new Map();
        /**
         * @hidden
         */
        this.timeEventResizes = new Map();
        /**
         * @hidden
         */
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        /**
         * @hidden
         */
        this.dragActive = false;
        /**
         * @hidden
         */
        this.dragAlreadyMoved = false;
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar week view id');
        /**
         * @hidden
         */
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByWeekAllDayEvent = trackByWeekAllDayEvent;
        /**
         * @hidden
         */
        this.trackByWeekTimeEvent = trackByWeekTimeEvent;
        /**
         * @hidden
         */
        this.trackByHourColumn = (index, column) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        /**
         * @hidden
         */
        this.trackById = (index, row) => row.id;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
        console.log("eventActionsTemplate", this.eventActionsTemplate);
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weekStartsOn;
        const refreshBody = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments ||
            changes.weekStartsOn ||
            changes.weekendDays ||
            changes.excludeDays ||
            changes.hourSegmentHeight ||
            changes.events ||
            changes.daysInWeek;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    resizeStarted(eventsContainer, minWidth) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    timeEventResizeStarted(eventsContainer, timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        this.resizeStarted(eventsContainer);
    }
    /**
     * @hidden
     */
    timeEventResizing(timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        const adjustedEvents = new Map();
        const tempEvents = [...this.events];
        this.timeEventResizes.forEach((lastResizeEvent, event) => {
            const newEventDates = this.getTimeEventResizedDates(event, lastResizeEvent);
            const adjustedEvent = Object.assign({}, event, newEventDates);
            adjustedEvents.set(adjustedEvent, event);
            const eventIndex = tempEvents.indexOf(event);
            tempEvents[eventIndex] = adjustedEvent;
        });
        this.restoreOriginalEvents(tempEvents, adjustedEvents);
    }
    /**
     * @hidden
     */
    timeEventResizeEnded(timeEvent) {
        this.view = this.getWeekView(this.events);
        const lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
        if (lastResizeEvent) {
            this.timeEventResizes.delete(timeEvent.event);
            const newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
            this.eventTimesChanged.emit({
                newStart: newEventDates.start,
                newEnd: newEventDates.end,
                event: timeEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeStarted(allDayEventsContainer, allDayEvent, resizeEvent) {
        this.allDayEventResizes.set(allDayEvent, {
            originalOffset: allDayEvent.offset,
            originalSpan: allDayEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
    }
    /**
     * @hidden
     */
    allDayEventResizing(allDayEvent, resizeEvent, dayWidth) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.left / dayWidth);
            allDayEvent.offset = currentResize.originalOffset + diff;
            allDayEvent.span = currentResize.originalSpan - diff;
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.right / dayWidth);
            allDayEvent.span = currentResize.originalSpan + diff;
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeEnded(allDayEvent) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (currentResize) {
            const allDayEventResizingBeforeStart = currentResize.edge === 'left';
            let daysDiff;
            if (allDayEventResizingBeforeStart) {
                daysDiff = allDayEvent.offset - currentResize.originalOffset;
            }
            else {
                daysDiff = allDayEvent.span - currentResize.originalSpan;
            }
            allDayEvent.offset = currentResize.originalOffset;
            allDayEvent.span = currentResize.originalSpan;
            let newStart = allDayEvent.event.start;
            let newEnd = allDayEvent.event.end || allDayEvent.event.start;
            if (allDayEventResizingBeforeStart) {
                newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
            }
            else {
                newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
            }
            this.eventTimesChanged.emit({
                newStart,
                newEnd,
                event: allDayEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
            this.allDayEventResizes.delete(allDayEvent);
        }
    }
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    /**
     * @hidden
     */
    dateDragEnter(date) {
        this.lastDragEnterDate = date;
    }
    /**
     * @hidden
     */
    eventDropped(dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
            this.lastDragEnterDate.getTime() === date.getTime()) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay
            });
        }
    }
    /**
     * @hidden
     */
    dragEnter(type) {
        this.eventDragEnterByType[type]++;
    }
    /**
     * @hidden
     */
    dragLeave(type) {
        this.eventDragEnterByType[type]--;
    }
    /**
     * @hidden
     */
    dragStarted(eventsContainer, event, dayEvent) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const dragHelper = new CalendarDragHelper(eventsContainer, event);
        this.validateDrag = ({ x, y, transform }) => this.allDayEventResizes.size === 0 &&
            this.timeEventResizes.size === 0 &&
            dragHelper.validateDrag({
                x,
                y,
                snapDraggedEvents: this.snapDraggedEvents,
                dragAlreadyMoved: this.dragAlreadyMoved,
                transform
            });
        this.dragActive = true;
        this.dragAlreadyMoved = false;
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        if (!this.snapDraggedEvents && dayEvent) {
            this.view.hourColumns.forEach(column => {
                const linkedEvent = column.events.find(columnEvent => columnEvent.event === dayEvent.event && columnEvent !== dayEvent);
                // hide any linked events while dragging
                if (linkedEvent) {
                    linkedEvent.width = 0;
                    linkedEvent.height = 0;
                }
            });
        }
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    dragMove(dayEvent, dragEvent) {
        if (this.snapDraggedEvents) {
            const newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
            const originalEvent = dayEvent.event;
            const adjustedEvent = Object.assign({}, originalEvent, newEventTimes);
            const tempEvents = this.events.map(event => {
                if (event === originalEvent) {
                    return adjustedEvent;
                }
                return event;
            });
            this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent, originalEvent]]));
        }
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    allDayEventDragMove() {
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    dragEnded(weekEvent, dragEndEvent, dayWidth, useY = false) {
        this.view = this.getWeekView(this.events);
        this.dragActive = false;
        const { start, end } = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY);
        if (this.eventDragEnterByType[useY ? 'time' : 'allDay'] > 0 &&
            isDraggedWithinPeriod(start, end, this.view.period)) {
            this.eventTimesChanged.emit({
                newStart: start,
                newEnd: end,
                event: weekEvent.event,
                type: CalendarEventTimesChangedEventType.Drag,
                allDay: !useY
            });
        }
    }
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader(Object.assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    refreshBody() {
        this.view = this.getWeekView(this.events);
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    }
    emitBeforeViewRender() {
        if (this.days && this.view) {
            this.beforeViewRender.emit(Object.assign({ header: this.days }, this.view));
        }
    }
    getWeekView(events) {
        return this.utils.getWeekView(Object.assign({ events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            }, dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY) {
        const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
        const minutesMoved = useY
            ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
            : 0;
        const start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
        let end;
        if (weekEvent.event.end) {
            end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
        }
        return { start, end };
    }
    restoreOriginalEvents(tempEvents, adjustedEvents) {
        const previousView = this.view;
        this.view = this.getWeekView(tempEvents);
        const adjustedEventsArray = tempEvents.filter(event => adjustedEvents.has(event));
        this.view.hourColumns.forEach((column, columnIndex) => {
            previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
                hour.segments.forEach((segment, segmentIndex) => {
                    column.hours[hourIndex].segments[segmentIndex].cssClass =
                        segment.cssClass;
                });
            });
            adjustedEventsArray.forEach(adjustedEvent => {
                const originalEvent = adjustedEvents.get(adjustedEvent);
                const existingColumnEvent = column.events.find(columnEvent => columnEvent.event === adjustedEvent);
                if (existingColumnEvent) {
                    // restore the original event so trackBy kicks in and the dom isn't changed
                    existingColumnEvent.event = originalEvent;
                }
                else {
                    // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
                    column.events.push({
                        event: originalEvent,
                        left: 0,
                        top: 0,
                        height: 0,
                        width: 0,
                        startsBeforeDay: false,
                        endsAfterDay: false
                    });
                }
            });
        });
        adjustedEvents.clear();
    }
    getTimeEventResizedDates(calendarEvent, resizeEvent) {
        const minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
        const newEventDates = {
            start: calendarEvent.start,
            end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight)
        };
        const { end } = calendarEvent, eventWithoutEnd = tslib_1.__rest(calendarEvent, ["end"]);
        const smallestResizes = {
            start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
            end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight)
        };
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
            const newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
            const newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        if (typeof resizeEvent.edges.top !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        return newEventDates;
    }
};
CalendarWeekViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "viewDate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "events", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "excludeDays", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "refresh", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipAppendToBody", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipDelay", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "headerTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventTitleTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventActionsTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "precision", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "weekendDays", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "snapDraggedEvents", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegments", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegmentHeight", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayStartHour", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayStartMinute", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayEndHour", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayEndMinute", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegmentTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventSnapSize", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "daysInWeek", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "dayHeaderClicked", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "eventTimesChanged", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "beforeViewRender", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "hourSegmentClicked", void 0);
CalendarWeekViewComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view',
        template: `
    <div class="cal-week-view" role="grid">
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
        (dragEnter)="dateDragEnter($event.date)"
      >
      </mwl-calendar-week-view-header>
      <div
        class="cal-all-day-events"
        #allDayEventsContainer
        *ngIf="view.allDayEventRows.length > 0"
        mwlDroppable
        (dragEnter)="dragEnter('allDay')"
        (dragLeave)="dragLeave('allDay')"
      >
        <div class="cal-day-columns">
          <div
            class="cal-time-label-column"
            [ngTemplateOutlet]="allDayEventsLabelTemplate"
          ></div>
          <div
            class="cal-day-column"
            *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date, true)"
            (dragEnter)="dateDragEnter(day.date)"
          ></div>
        </div>
        <div
          *ngFor="let eventRow of view.allDayEventRows; trackBy: trackById"
          #eventRowContainer
          class="cal-events-row"
        >
          <div
            *ngFor="
              let allDayEvent of eventRow.row;
              trackBy: trackByWeekAllDayEvent
            "
            #event
            class="cal-event-container"
            [class.cal-draggable]="
              allDayEvent.event.draggable && allDayEventResizes.size === 0
            "
            [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
            [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
            [ngClass]="allDayEvent.event?.cssClass"
            [style.width.%]="(100 / days.length) * allDayEvent.span"
            [style.marginLeft.%]="(100 / days.length) * allDayEvent.offset"
            mwlResizable
            [resizeSnapGrid]="{ left: dayColumnWidth, right: dayColumnWidth }"
            [validateResize]="validateResize"
            (resizeStart)="
              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)
            "
            (resizing)="
              allDayEventResizing(allDayEvent, $event, dayColumnWidth)
            "
            (resizeEnd)="allDayEventResizeEnded(allDayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{ event: allDayEvent.event, calendarId: calendarId }"
            [dragAxis]="{
              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,
              y:
                !snapDraggedEvents &&
                allDayEvent.event.draggable &&
                allDayEventResizes.size === 0
            }"
            [dragSnapGrid]="snapDraggedEvents ? { x: dayColumnWidth } : {}"
            [validateDrag]="validateDrag"
            (dragStart)="dragStarted(eventRowContainer, event)"
            (dragging)="allDayEventDragMove()"
            (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)"
          >
            <div
              class="cal-resize-handle cal-resize-handle-before-start"
              *ngIf="
                allDayEvent.event?.resizable?.beforeStart &&
                !allDayEvent.startsBeforeWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ left: true }"
            ></div>
            <mwl-calendar-week-view-event
              [locale]="locale"
              [weekEvent]="allDayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              [daysInWeek]="daysInWeek"
              (eventClicked)="
                eventClicked.emit({
                  event: allDayEvent.event,
                  sourceEvent: $event.sourceEvent
                })
              "
            >
            </mwl-calendar-week-view-event>
            <div
              class="cal-resize-handle cal-resize-handle-after-end"
              *ngIf="
                allDayEvent.event?.resizable?.afterEnd &&
                !allDayEvent.endsAfterWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ right: true }"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="dragEnter('time')"
        (dragLeave)="dragLeave('time')"
      >
        <div
          class="cal-time-label-column"
          *ngIf="view.hourColumns.length > 0 && daysInWeek !== 1"
        >
          <div
            *ngFor="
              let hour of view.hourColumns[0].hours;
              trackBy: trackByHour;
              let odd = odd
            "
            class="cal-hour"
            [class.cal-hour-odd]="odd"
          >
            <mwl-calendar-week-view-hour-segment
              *ngFor="let segment of hour.segments; trackBy: trackByHourSegment"
              [style.height.px]="hourSegmentHeight"
              [segment]="segment"
              [segmentHeight]="hourSegmentHeight"
              [locale]="locale"
              [customTemplate]="hourSegmentTemplate"
              [isTimeLabel]="true"
              [daysInWeek]="daysInWeek"
            >
            </mwl-calendar-week-view-hour-segment>
          </div>
        </div>
        <div
          class="cal-day-columns"
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns
        >
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy: trackByHourColumn"
          >
            <mwl-calendar-week-view-current-time-marker
              [columnDate]="column.date"
              [dayStartHour]="dayStartHour"
              [dayStartMinute]="dayStartMinute"
              [dayEndHour]="dayEndHour"
              [dayEndMinute]="dayEndMinute"
              [hourSegments]="hourSegments"
              [hourSegmentHeight]="hourSegmentHeight"
              [customTemplate]="currentTimeMarkerTemplate"
            ></mwl-calendar-week-view-current-time-marker>
            <div class="cal-events-container">
              <div
                *ngFor="
                  let timeEvent of column.events;
                  trackBy: trackByWeekTimeEvent
                "
                #event
                class="cal-event-container"
                [class.cal-draggable]="
                  timeEvent.event.draggable && timeEventResizes.size === 0
                "
                [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
                [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
                [ngClass]="timeEvent.event.cssClass"
                [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                [style.top.px]="timeEvent.top"
                [style.height.px]="timeEvent.height"
                [style.left.%]="timeEvent.left"
                [style.width.%]="timeEvent.width"
                mwlResizable
                [resizeSnapGrid]="{
                  left: dayColumnWidth,
                  right: dayColumnWidth,
                  top: eventSnapSize || hourSegmentHeight,
                  bottom: eventSnapSize || hourSegmentHeight
                }"
                [validateResize]="validateResize"
                [allowNegativeResizes]="true"
                (resizeStart)="
                  timeEventResizeStarted(dayColumns, timeEvent, $event)
                "
                (resizing)="timeEventResizing(timeEvent, $event)"
                (resizeEnd)="timeEventResizeEnded(timeEvent)"
                mwlDraggable
                dragActiveClass="cal-drag-active"
                [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
                [dragAxis]="{
                  x: timeEvent.event.draggable && timeEventResizes.size === 0,
                  y: timeEvent.event.draggable && timeEventResizes.size === 0
                }"
                [dragSnapGrid]="
                  snapDraggedEvents
                    ? {
                        x: dayColumnWidth,
                        y: eventSnapSize || hourSegmentHeight
                      }
                    : {}
                "
                [ghostDragEnabled]="!snapDraggedEvents"
                [validateDrag]="validateDrag"
                (dragStart)="dragStarted(dayColumns, event, timeEvent)"
                (dragging)="dragMove(timeEvent, $event)"
                (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)"
              >
                <div
                  class="cal-resize-handle cal-resize-handle-before-start"
                  *ngIf="
                    timeEvent.event?.resizable?.beforeStart &&
                    !timeEvent.startsBeforeDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    left: true,
                    top: true
                  }"
                ></div>
                <mwl-calendar-week-view-event
                  [locale]="locale"
                  [weekEvent]="timeEvent"
                  [tooltipPlacement]="tooltipPlacement"
                  [tooltipTemplate]="tooltipTemplate"
                  [tooltipAppendToBody]="tooltipAppendToBody"
                  [tooltipDisabled]="dragActive || timeEventResizes.size > 0"
                  [tooltipDelay]="tooltipDelay"
                  [customTemplate]="eventTemplate"
                  [eventTitleTemplate]="eventTitleTemplate"
                  [eventActionsTemplate]="eventActionsTemplate"
                  [column]="column"
                  [daysInWeek]="daysInWeek"
                  (eventClicked)="
                    eventClicked.emit({
                      event: timeEvent.event,
                      sourceEvent: $event.sourceEvent
                    })
                  "
                >
                </mwl-calendar-week-view-event>
                <div
                  class="cal-resize-handle cal-resize-handle-after-end"
                  *ngIf="
                    timeEvent.event?.resizable?.afterEnd &&
                    !timeEvent.endsAfterDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    right: true,
                    bottom: true
                  }"
                ></div>
              </div>
            </div>

            <div
              *ngFor="
                let hour of column.hours;
                trackBy: trackByHour;
                let odd = odd
              "
              class="cal-hour"
              [class.cal-hour-odd]="odd"
            >
              <mwl-calendar-week-view-hour-segment
                *ngFor="
                  let segment of hour.segments;
                  trackBy: trackByHourSegment
                "
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
                (mwlClick)="
                  hourSegmentClicked.emit({
                    date: segment.date,
                    sourceEvent: $event
                  })
                "
                [clickListenerDisabled]="
                  hourSegmentClicked.observers.length === 0
                "
                mwlDroppable
                [dragOverClass]="
                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null
                "
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date, false)"
                (dragEnter)="dateDragEnter(segment.date)"
                [isTimeLabel]="daysInWeek === 1"
              >
              </mwl-calendar-week-view-hour-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    }),
    tslib_1.__param(2, Inject(LOCALE_ID))
], CalendarWeekViewComponent);
export { CalendarWeekViewComponent };
// [eventActionsTemplate]="eventActionsTemplate"
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQWV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBRUwsa0NBQWtDLEVBQ25DLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2QsY0FBYyxFQUNkLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsOEJBQThCLEVBQzlCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3JCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBbUIvRDs7Ozs7Ozs7O0dBU0c7QUFtVUgsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFzU3BDOztPQUVHO0lBQ0gsWUFDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFM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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThUVDtLQUNGLENBQUM7SUE2U0csbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0dBNVNULHlCQUF5QixDQW02QnJDO1NBbjZCWSx5QkFBeUI7QUFxNkJ0QyxnREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgV2Vla0RheSxcbiAgQ2FsZW5kYXJFdmVudCxcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgV2Vla1ZpZXcsXG4gIFZpZXdQZXJpb2QsXG4gIFdlZWtWaWV3SG91ckNvbHVtbixcbiAgV2Vla1ZpZXdUaW1lRXZlbnQsXG4gIFdlZWtWaWV3SG91clNlZ21lbnQsXG4gIFdlZWtWaWV3SG91cixcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFJvd1xufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEcmFnSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50LFxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlRXZlbnRzLFxuICByb3VuZFRvTmVhcmVzdCxcbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlLFxuICB0cmFja0J5SG91clNlZ21lbnQsXG4gIHRyYWNrQnlIb3VyLFxuICBnZXRNaW51dGVzTW92ZWQsXG4gIGdldERlZmF1bHRFdmVudEVuZCxcbiAgZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzLFxuICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMsXG4gIGlzRHJhZ2dlZFdpdGhpblBlcmlvZCxcbiAgc2hvdWxkRmlyZURyb3BwZWRFdmVudCxcbiAgZ2V0V2Vla1ZpZXdQZXJpb2QsXG4gIHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQsXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50XG59IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtcbiAgRHJhZ0VuZEV2ZW50LFxuICBEcm9wRXZlbnQsXG4gIERyYWdNb3ZlRXZlbnQsXG4gIFZhbGlkYXRlRHJhZ1xufSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZSB7XG4gIG9yaWdpbmFsT2Zmc2V0OiBudW1iZXI7XG4gIG9yaWdpbmFsU3BhbjogbnVtYmVyO1xuICBlZGdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50IGV4dGVuZHMgV2Vla1ZpZXcge1xuICBoZWFkZXI6IFdlZWtEYXlbXTtcbn1cblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gd2Vlay4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8bXdsLWNhbGVuZGFyLXdlZWstdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cbiAqIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHsgICBcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLXdlZWstdmlld1wiIHJvbGU9XCJncmlkXCI+XG4gICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXJcbiAgICAgICAgW2RheXNdPVwiZGF5c1wiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgKGRheUhlYWRlckNsaWNrZWQpPVwiZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KCRldmVudClcIlxuICAgICAgICAoZXZlbnREcm9wcGVkKT1cIlxuICAgICAgICAgIGV2ZW50RHJvcHBlZCh7IGRyb3BEYXRhOiAkZXZlbnQgfSwgJGV2ZW50Lm5ld1N0YXJ0LCB0cnVlKVxuICAgICAgICBcIlxuICAgICAgICAoZHJhZ0VudGVyKT1cImRhdGVEcmFnRW50ZXIoJGV2ZW50LmRhdGUpXCJcbiAgICAgID5cbiAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWFsbC1kYXktZXZlbnRzXCJcbiAgICAgICAgI2FsbERheUV2ZW50c0NvbnRhaW5lclxuICAgICAgICAqbmdJZj1cInZpZXcuYWxsRGF5RXZlbnRSb3dzLmxlbmd0aCA+IDBcIlxuICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgKGRyYWdFbnRlcik9XCJkcmFnRW50ZXIoJ2FsbERheScpXCJcbiAgICAgICAgKGRyYWdMZWF2ZSk9XCJkcmFnTGVhdmUoJ2FsbERheScpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXktY29sdW1uc1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtbGFiZWwtY29sdW1uXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFsbERheUV2ZW50c0xhYmVsVGVtcGxhdGVcIlxuICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImNhbC1kYXktY29sdW1uXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5czsgdHJhY2tCeTogdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXCJcbiAgICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxuICAgICAgICAgICAgKGRyb3ApPVwiZXZlbnREcm9wcGVkKCRldmVudCwgZGF5LmRhdGUsIHRydWUpXCJcbiAgICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcihkYXkuZGF0ZSlcIlxuICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnRSb3cgb2Ygdmlldy5hbGxEYXlFdmVudFJvd3M7IHRyYWNrQnk6IHRyYWNrQnlJZFwiXG4gICAgICAgICAgI2V2ZW50Um93Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRzLXJvd1wiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgbGV0IGFsbERheUV2ZW50IG9mIGV2ZW50Um93LnJvdztcbiAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeVdlZWtBbGxEYXlFdmVudFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICNldmVudFxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIlxuICAgICAgICAgICAgICBhbGxEYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4td2Vla109XCIhYWxsRGF5RXZlbnQuc3RhcnRzQmVmb3JlV2Vla1wiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLXdlZWtdPVwiIWFsbERheUV2ZW50LmVuZHNBZnRlcldlZWtcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiYWxsRGF5RXZlbnQuZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cIigxMDAgLyBkYXlzLmxlbmd0aCkgKiBhbGxEYXlFdmVudC5zcGFuXCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0LiVdPVwiKDEwMCAvIGRheXMubGVuZ3RoKSAqIGFsbERheUV2ZW50Lm9mZnNldFwiXG4gICAgICAgICAgICBtd2xSZXNpemFibGVcbiAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7IGxlZnQ6IGRheUNvbHVtbldpZHRoLCByaWdodDogZGF5Q29sdW1uV2lkdGggfVwiXG4gICAgICAgICAgICBbdmFsaWRhdGVSZXNpemVdPVwidmFsaWRhdGVSZXNpemVcIlxuICAgICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cIlxuICAgICAgICAgICAgICBhbGxEYXlFdmVudFJlc2l6ZVN0YXJ0ZWQoZXZlbnRSb3dDb250YWluZXIsIGFsbERheUV2ZW50LCAkZXZlbnQpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgKHJlc2l6aW5nKT1cIlxuICAgICAgICAgICAgICBhbGxEYXlFdmVudFJlc2l6aW5nKGFsbERheUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIChyZXNpemVFbmQpPVwiYWxsRGF5RXZlbnRSZXNpemVFbmRlZChhbGxEYXlFdmVudClcIlxuICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IGFsbERheUV2ZW50LmV2ZW50LCBjYWxlbmRhcklkOiBjYWxlbmRhcklkIH1cIlxuICAgICAgICAgICAgW2RyYWdBeGlzXT1cIntcbiAgICAgICAgICAgICAgeDogYWxsRGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIGFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwLFxuICAgICAgICAgICAgICB5OlxuICAgICAgICAgICAgICAgICFzbmFwRHJhZ2dlZEV2ZW50cyAmJlxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJlxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwXG4gICAgICAgICAgICB9XCJcbiAgICAgICAgICAgIFtkcmFnU25hcEdyaWRdPVwic25hcERyYWdnZWRFdmVudHMgPyB7IHg6IGRheUNvbHVtbldpZHRoIH0gOiB7fVwiXG4gICAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXG4gICAgICAgICAgICAoZHJhZ1N0YXJ0KT1cImRyYWdTdGFydGVkKGV2ZW50Um93Q29udGFpbmVyLCBldmVudClcIlxuICAgICAgICAgICAgKGRyYWdnaW5nKT1cImFsbERheUV2ZW50RHJhZ01vdmUoKVwiXG4gICAgICAgICAgICAoZHJhZ0VuZCk9XCJkcmFnRW5kZWQoYWxsRGF5RXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYmVmb3JlLXN0YXJ0XCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICBhbGxEYXlFdmVudC5ldmVudD8ucmVzaXphYmxlPy5iZWZvcmVTdGFydCAmJlxuICAgICAgICAgICAgICAgICFhbGxEYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyBsZWZ0OiB0cnVlIH1cIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnRcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbd2Vla0V2ZW50XT1cImFsbERheUV2ZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxuICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxuICAgICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBhbGxEYXlFdmVudC5ldmVudCxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWFmdGVyLWVuZFwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmQgJiZcbiAgICAgICAgICAgICAgICAhYWxsRGF5RXZlbnQuZW5kc0FmdGVyV2Vla1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInsgcmlnaHQ6IHRydWUgfVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtZXZlbnRzXCJcbiAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZHJhZ0VudGVyKCd0aW1lJylcIlxuICAgICAgICAoZHJhZ0xlYXZlKT1cImRyYWdMZWF2ZSgndGltZScpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtbGFiZWwtY29sdW1uXCJcbiAgICAgICAgICAqbmdJZj1cInZpZXcuaG91ckNvbHVtbnMubGVuZ3RoID4gMCAmJiBkYXlzSW5XZWVrICE9PSAxXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICBsZXQgaG91ciBvZiB2aWV3LmhvdXJDb2x1bW5zWzBdLmhvdXJzO1xuICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91cjtcbiAgICAgICAgICAgICAgbGV0IG9kZCA9IG9kZFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1ob3VyLW9kZF09XCJvZGRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudFxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzOyB0cmFja0J5OiB0cmFja0J5SG91clNlZ21lbnRcIlxuICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgW3NlZ21lbnRdPVwic2VnbWVudFwiXG4gICAgICAgICAgICAgIFtzZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtpc1RpbWVMYWJlbF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXJlc2l6ZS1hY3RpdmVdPVwidGltZUV2ZW50UmVzaXplcy5zaXplID4gMFwiXG4gICAgICAgICAgI2RheUNvbHVtbnNcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiB2aWV3LmhvdXJDb2x1bW5zOyB0cmFja0J5OiB0cmFja0J5SG91ckNvbHVtblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlclxuICAgICAgICAgICAgICBbY29sdW1uRGF0ZV09XCJjb2x1bW4uZGF0ZVwiXG4gICAgICAgICAgICAgIFtkYXlTdGFydEhvdXJdPVwiZGF5U3RhcnRIb3VyXCJcbiAgICAgICAgICAgICAgW2RheVN0YXJ0TWludXRlXT1cImRheVN0YXJ0TWludXRlXCJcbiAgICAgICAgICAgICAgW2RheUVuZEhvdXJdPVwiZGF5RW5kSG91clwiXG4gICAgICAgICAgICAgIFtkYXlFbmRNaW51dGVdPVwiZGF5RW5kTWludXRlXCJcbiAgICAgICAgICAgICAgW2hvdXJTZWdtZW50c109XCJob3VyU2VnbWVudHNcIlxuICAgICAgICAgICAgICBbaG91clNlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICA+PC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50cy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgICAgbGV0IHRpbWVFdmVudCBvZiBjb2x1bW4uZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeVdlZWtUaW1lRXZlbnRcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICNldmVudFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiXG4gICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCIhdGltZUV2ZW50LnN0YXJ0c0JlZm9yZURheVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiIXRpbWVFdmVudC5lbmRzQWZ0ZXJEYXlcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRpbWVFdmVudC5ldmVudC5jc3NDbGFzc1wiXG4gICAgICAgICAgICAgICAgW2hpZGRlbl09XCJ0aW1lRXZlbnQuaGVpZ2h0ID09PSAwICYmIHRpbWVFdmVudC53aWR0aCA9PT0gMFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRvcC5weF09XCJ0aW1lRXZlbnQudG9wXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInRpbWVFdmVudC5oZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5sZWZ0LiVdPVwidGltZUV2ZW50LmxlZnRcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cInRpbWVFdmVudC53aWR0aFwiXG4gICAgICAgICAgICAgICAgbXdsUmVzaXphYmxlXG4gICAgICAgICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cIntcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IGRheUNvbHVtbldpZHRoLFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IGRheUNvbHVtbldpZHRoLFxuICAgICAgICAgICAgICAgICAgdG9wOiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgYm90dG9tOiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgW3ZhbGlkYXRlUmVzaXplXT1cInZhbGlkYXRlUmVzaXplXCJcbiAgICAgICAgICAgICAgICBbYWxsb3dOZWdhdGl2ZVJlc2l6ZXNdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cIlxuICAgICAgICAgICAgICAgICAgdGltZUV2ZW50UmVzaXplU3RhcnRlZChkYXlDb2x1bW5zLCB0aW1lRXZlbnQsICRldmVudClcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIChyZXNpemluZyk9XCJ0aW1lRXZlbnRSZXNpemluZyh0aW1lRXZlbnQsICRldmVudClcIlxuICAgICAgICAgICAgICAgIChyZXNpemVFbmQpPVwidGltZUV2ZW50UmVzaXplRW5kZWQodGltZUV2ZW50KVwiXG4gICAgICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcbiAgICAgICAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogdGltZUV2ZW50LmV2ZW50LCBjYWxlbmRhcklkOiBjYWxlbmRhcklkIH1cIlxuICAgICAgICAgICAgICAgIFtkcmFnQXhpc109XCJ7XG4gICAgICAgICAgICAgICAgICB4OiB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCxcbiAgICAgICAgICAgICAgICAgIHk6IHRpbWVFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgdGltZUV2ZW50UmVzaXplcy5zaXplID09PSAwXG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJcbiAgICAgICAgICAgICAgICAgIHNuYXBEcmFnZ2VkRXZlbnRzXG4gICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZGF5Q29sdW1uV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA6IHt9XG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBbZ2hvc3REcmFnRW5hYmxlZF09XCIhc25hcERyYWdnZWRFdmVudHNcIlxuICAgICAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgICAgICAoZHJhZ1N0YXJ0KT1cImRyYWdTdGFydGVkKGRheUNvbHVtbnMsIGV2ZW50LCB0aW1lRXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZHJhZ2dpbmcpPVwiZHJhZ01vdmUodGltZUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZHJhZ0VuZCk9XCJkcmFnRW5kZWQodGltZUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoLCB0cnVlKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRpbWVFdmVudC5zdGFydHNCZWZvcmVEYXlcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50XG4gICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgICBbd2Vla0V2ZW50XT1cInRpbWVFdmVudFwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJkcmFnQWN0aXZlIHx8IHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA+IDBcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxuICAgICAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGlja2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYWZ0ZXItZW5kXCJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgIHRpbWVFdmVudC5ldmVudD8ucmVzaXphYmxlPy5hZnRlckVuZCAmJlxuICAgICAgICAgICAgICAgICAgICAhdGltZUV2ZW50LmVuZHNBZnRlckRheVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgIGxldCBob3VyIG9mIGNvbHVtbi5ob3VycztcbiAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91cjtcbiAgICAgICAgICAgICAgICBsZXQgb2RkID0gb2RkXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICAgICBbY2xhc3MuY2FsLWhvdXItb2RkXT1cIm9kZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudFxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgICAgbGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50cztcbiAgICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlIb3VyU2VnbWVudFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRdPVwic2VnbWVudFwiXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgKG13bENsaWNrKT1cIlxuICAgICAgICAgICAgICAgICAgaG91clNlZ21lbnRDbGlja2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBzZWdtZW50LmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnRcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBbY2xpY2tMaXN0ZW5lckRpc2FibGVkXT1cIlxuICAgICAgICAgICAgICAgICAgaG91clNlZ21lbnRDbGlja2VkLm9ic2VydmVycy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgICAgICAgIFtkcmFnT3ZlckNsYXNzXT1cIlxuICAgICAgICAgICAgICAgICAgIWRyYWdBY3RpdmUgfHwgIXNuYXBEcmFnZ2VkRXZlbnRzID8gJ2NhbC1kcmFnLW92ZXInIDogbnVsbFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAoZHJvcCk9XCJldmVudERyb3BwZWQoJGV2ZW50LCBzZWdtZW50LmRhdGUsIGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXRlRHJhZ0VudGVyKHNlZ21lbnQuZGF0ZSlcIlxuICAgICAgICAgICAgICAgIFtpc1RpbWVMYWJlbF09XCJkYXlzSW5XZWVrID09PSAxXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIG5vdCBwcm92aWRlZCB0aGUgdG9vbHRpcFxuICAgKiB3aWxsIGJlIGRpc3BsYXllZCBpbW1lZGlhdGVseS5cbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGFydCBudW1iZXIgb2YgdGhlIHdlZWsuXG4gICAqIFRoaXMgaXMgaWdub3JlZCB3aGVuIHRoZSBgZGF5c0luV2Vla2AgaW5wdXQgaXMgYWxzbyBzZXQgYXMgdGhlIGB2aWV3RGF0ZWAgd2lsbCBiZSB1c2VkIGFzIHRoZSBzdGFydCBvZiB0aGUgd2VlayBpbnN0ZWFkLlxuICAgKiBOb3RlLCB5b3Ugc2hvdWxkIGFsc28gcGFzcyB0aGlzIHRvIHRoZSBjYWxlbmRhciB0aXRsZSBwaXBlIHNvIGl0IHNob3dzIHRoZSBzYW1lIGRheXM6IHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOmxvY2FsZTp3ZWVrU3RhcnRzT24gfX1cbiAgICovXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB3ZWVrIHZpZXcgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IGFjdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlY2lzaW9uIHRvIGRpc3BsYXkgZXZlbnRzLlxuICAgKiBgZGF5c2Agd2lsbCByb3VuZCBldmVudCBzdGFydCBhbmQgZW5kIGRhdGVzIHRvIHRoZSBuZWFyZXN0IGRheSBhbmQgYG1pbnV0ZXNgIHdpbGwgbm90IGRvIHRoaXMgcm91bmRpbmdcbiAgICovXG4gIEBJbnB1dCgpIHByZWNpc2lvbjogJ2RheXMnIHwgJ21pbnV0ZXMnID0gJ2RheXMnO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBzbmFwIGV2ZW50cyB0byBhIGdyaWQgd2hlbiBkcmFnZ2luZ1xuICAgKi9cbiAgQElucHV0KCkgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgYmUgPD0gNlxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXIgPSAyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IGluIHBpeGVscyBvZiBlYWNoIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDYwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgdG8gc25hcCByZXNpemluZyBhbmQgZHJhZ2dpbmcgb2YgaG91cmx5IGV2ZW50cyB0b1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRTbmFwU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBDYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzaG9ydGVyIG9yIGxvbmdlciB3ZWVrIHZpZXcuXG4gICAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgd2lsbCBhbHdheXMgYmUgdGhlIGB2aWV3RGF0ZWAgYW5kIGB3ZWVrU3RhcnRzT25gIGlmIHNldCB3aWxsIGJlIGlnbm9yZWRcbiAgICovXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgY3VycmVudCB0aW1lIG1hcmtlclxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZC4gQWRkaW5nIGEgYGNzc0NsYXNzYCBwcm9wZXJ0eSBvbiBgJGV2ZW50LmRheWAgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBkYXlIZWFkZXJDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBXZWVrRGF5O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCB3ZWVrLlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGEgZGF5IGluIHRoZSBoZWFkZXIgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJlZm9yZVZpZXdSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBob3VyU2VnbWVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXlzOiBXZWVrRGF5W107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZpZXc6IFdlZWtWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50UmVzaXplczogTWFwPFxuICAgIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gICAgV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZVxuICA+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0aW1lRXZlbnRSZXNpemVzOiBNYXA8Q2FsZW5kYXJFdmVudCwgUmVzaXplRXZlbnQ+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBldmVudERyYWdFbnRlckJ5VHlwZSA9IHtcbiAgICBhbGxEYXk6IDAsXG4gICAgdGltZTogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnQWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiBWYWxpZGF0ZURyYWc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlUmVzaXplOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXlDb2x1bW5XaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjYWxlbmRhcklkID0gU3ltYm9sKCdhbmd1bGFyIGNhbGVuZGFyIHdlZWsgdmlldyBpZCcpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IHRyYWNrQnlIb3VyU2VnbWVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCA9IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gdHJhY2tCeVdlZWtUaW1lRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgbGFzdERyYWdFbnRlckRhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyQ29sdW1uID0gKGluZGV4OiBudW1iZXIsIGNvbHVtbjogV2Vla1ZpZXdIb3VyQ29sdW1uKSA9PlxuICAgIGNvbHVtbi5ob3Vyc1swXSA/IGNvbHVtbi5ob3Vyc1swXS5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCkgOiBjb2x1bW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCByb3c6IFdlZWtWaWV3QWxsRGF5RXZlbnRSb3cpID0+IHJvdy5pZDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcbiAgICBwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyXG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcImV2ZW50QWN0aW9uc1RlbXBsYXRlXCIsIHRoaXMuZXZlbnRBY3Rpb25zVGVtcGxhdGUpXG4gIH1cblxuICBwYWdlOidvdGhlcic7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJlZnJlc2hIZWFkZXIgPVxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxuICAgICAgY2hhbmdlcy5kYXlzSW5XZWVrIHx8XG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbjtcblxuICAgIGNvbnN0IHJlZnJlc2hCb2R5ID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50cyB8fFxuICAgICAgY2hhbmdlcy53ZWVrU3RhcnRzT24gfHxcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXMgfHxcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRIZWlnaHQgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XG4gICAgICBjaGFuZ2VzLmRheXNJbldlZWs7XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlcikge1xuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XG4gICAgICB2YWxpZGF0ZUV2ZW50cyh0aGlzLmV2ZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKHJlZnJlc2hCb2R5KSB7XG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgfVxuXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIgfHwgcmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlc2l6ZVN0YXJ0ZWQoZXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCwgbWluV2lkdGg/OiBudW1iZXIpIHtcbiAgICB0aGlzLmRheUNvbHVtbldpZHRoID0gdGhpcy5nZXREYXlDb2x1bW5XaWR0aChldmVudHNDb250YWluZXIpO1xuICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIoXG4gICAgICBldmVudHNDb250YWluZXIsXG4gICAgICBtaW5XaWR0aFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRpbWVFdmVudFJlc2l6ZVN0YXJ0ZWQoXG4gICAgZXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICB0aW1lRXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudFxuICApOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuc2V0KHRpbWVFdmVudC5ldmVudCwgcmVzaXplRXZlbnQpO1xuICAgIHRoaXMucmVzaXplU3RhcnRlZChldmVudHNDb250YWluZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRpbWVFdmVudFJlc2l6aW5nKHRpbWVFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCkge1xuICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5zZXQodGltZUV2ZW50LmV2ZW50LCByZXNpemVFdmVudCk7XG4gICAgY29uc3QgYWRqdXN0ZWRFdmVudHMgPSBuZXcgTWFwPENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRXZlbnQ+KCk7XG5cbiAgICBjb25zdCB0ZW1wRXZlbnRzID0gWy4uLnRoaXMuZXZlbnRzXTtcblxuICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5mb3JFYWNoKChsYXN0UmVzaXplRXZlbnQsIGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBuZXdFdmVudERhdGVzID0gdGhpcy5nZXRUaW1lRXZlbnRSZXNpemVkRGF0ZXMoXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBsYXN0UmVzaXplRXZlbnRcbiAgICAgICk7XG4gICAgICBjb25zdCBhZGp1c3RlZEV2ZW50ID0geyAuLi5ldmVudCwgLi4ubmV3RXZlbnREYXRlcyB9O1xuICAgICAgYWRqdXN0ZWRFdmVudHMuc2V0KGFkanVzdGVkRXZlbnQsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGV2ZW50SW5kZXggPSB0ZW1wRXZlbnRzLmluZGV4T2YoZXZlbnQpO1xuICAgICAgdGVtcEV2ZW50c1tldmVudEluZGV4XSA9IGFkanVzdGVkRXZlbnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc3RvcmVPcmlnaW5hbEV2ZW50cyh0ZW1wRXZlbnRzLCBhZGp1c3RlZEV2ZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdGltZUV2ZW50UmVzaXplRW5kZWQodGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCkge1xuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGhpcy5ldmVudHMpO1xuICAgIGNvbnN0IGxhc3RSZXNpemVFdmVudCA9IHRoaXMudGltZUV2ZW50UmVzaXplcy5nZXQodGltZUV2ZW50LmV2ZW50KTtcbiAgICBpZiAobGFzdFJlc2l6ZUV2ZW50KSB7XG4gICAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuZGVsZXRlKHRpbWVFdmVudC5ldmVudCk7XG4gICAgICBjb25zdCBuZXdFdmVudERhdGVzID0gdGhpcy5nZXRUaW1lRXZlbnRSZXNpemVkRGF0ZXMoXG4gICAgICAgIHRpbWVFdmVudC5ldmVudCxcbiAgICAgICAgbGFzdFJlc2l6ZUV2ZW50XG4gICAgICApO1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgbmV3U3RhcnQ6IG5ld0V2ZW50RGF0ZXMuc3RhcnQsXG4gICAgICAgIG5ld0VuZDogbmV3RXZlbnREYXRlcy5lbmQsXG4gICAgICAgIGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuUmVzaXplXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnRSZXNpemVTdGFydGVkKFxuICAgIGFsbERheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgYWxsRGF5RXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLnNldChhbGxEYXlFdmVudCwge1xuICAgICAgb3JpZ2luYWxPZmZzZXQ6IGFsbERheUV2ZW50Lm9mZnNldCxcbiAgICAgIG9yaWdpbmFsU3BhbjogYWxsRGF5RXZlbnQuc3BhbixcbiAgICAgIGVkZ2U6IHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJyA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZVN0YXJ0ZWQoXG4gICAgICBhbGxEYXlFdmVudHNDb250YWluZXIsXG4gICAgICB0aGlzLmdldERheUNvbHVtbldpZHRoKGFsbERheUV2ZW50c0NvbnRhaW5lcilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50UmVzaXppbmcoXG4gICAgYWxsRGF5RXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LFxuICAgIGRheVdpZHRoOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZSA9IHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmdldChcbiAgICAgIGFsbERheUV2ZW50XG4gICAgKTtcblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IE1hdGgucm91bmQoK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyBkYXlXaWR0aCk7XG4gICAgICBhbGxEYXlFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0ICsgZGlmZjtcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiAtIGRpZmY7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIGRheVdpZHRoKTtcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiArIGRpZmY7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50UmVzaXplRW5kZWQoYWxsRGF5RXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplID0gdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuZ2V0KFxuICAgICAgYWxsRGF5RXZlbnRcbiAgICApO1xuXG4gICAgaWYgKGN1cnJlbnRSZXNpemUpIHtcbiAgICAgIGNvbnN0IGFsbERheUV2ZW50UmVzaXppbmdCZWZvcmVTdGFydCA9IGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ2xlZnQnO1xuICAgICAgbGV0IGRheXNEaWZmOiBudW1iZXI7XG4gICAgICBpZiAoYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0KSB7XG4gICAgICAgIGRheXNEaWZmID0gYWxsRGF5RXZlbnQub2Zmc2V0IC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbE9mZnNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRheXNEaWZmID0gYWxsRGF5RXZlbnQuc3BhbiAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xuICAgICAgfVxuXG4gICAgICBhbGxEYXlFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xuICAgICAgYWxsRGF5RXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xuXG4gICAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSBhbGxEYXlFdmVudC5ldmVudC5zdGFydDtcbiAgICAgIGxldCBuZXdFbmQ6IERhdGUgPSBhbGxEYXlFdmVudC5ldmVudC5lbmQgfHwgYWxsRGF5RXZlbnQuZXZlbnQuc3RhcnQ7XG4gICAgICBpZiAoYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0KSB7XG4gICAgICAgIG5ld1N0YXJ0ID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgbmV3U3RhcnQsXG4gICAgICAgICAgZGF5c0RpZmYsXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RW5kID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgbmV3RW5kLFxuICAgICAgICAgIGRheXNEaWZmLFxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgbmV3U3RhcnQsXG4gICAgICAgIG5ld0VuZCxcbiAgICAgICAgZXZlbnQ6IGFsbERheUV2ZW50LmV2ZW50LFxuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLlJlc2l6ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5kZWxldGUoYWxsRGF5RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBnZXREYXlDb2x1bW5XaWR0aChldmVudFJvd0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGV2ZW50Um93Q29udGFpbmVyLm9mZnNldFdpZHRoIC8gdGhpcy5kYXlzLmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZGF0ZURyYWdFbnRlcihkYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5sYXN0RHJhZ0VudGVyRGF0ZSA9IGRhdGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXZlbnREcm9wcGVkKFxuICAgIGRyb3BFdmVudDogRHJvcEV2ZW50PHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50OyBjYWxlbmRhcklkPzogc3ltYm9sIH0+LFxuICAgIGRhdGU6IERhdGUsXG4gICAgYWxsRGF5OiBib29sZWFuXG4gICk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHNob3VsZEZpcmVEcm9wcGVkRXZlbnQoZHJvcEV2ZW50LCBkYXRlLCBhbGxEYXksIHRoaXMuY2FsZW5kYXJJZCkgJiZcbiAgICAgIHRoaXMubGFzdERyYWdFbnRlckRhdGUuZ2V0VGltZSgpID09PSBkYXRlLmdldFRpbWUoKVxuICAgICkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wLFxuICAgICAgICBldmVudDogZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LFxuICAgICAgICBuZXdTdGFydDogZGF0ZSxcbiAgICAgICAgYWxsRGF5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZHJhZ0VudGVyKHR5cGU6ICdhbGxEYXknIHwgJ3RpbWUnKSB7XG4gICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZVt0eXBlXSsrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdMZWF2ZSh0eXBlOiAnYWxsRGF5JyB8ICd0aW1lJykge1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdHlwZV0tLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnU3RhcnRlZChcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIGV2ZW50OiBIVE1MRWxlbWVudCxcbiAgICBkYXlFdmVudD86IFdlZWtWaWV3VGltZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuZGF5Q29sdW1uV2lkdGggPSB0aGlzLmdldERheUNvbHVtbldpZHRoKGV2ZW50c0NvbnRhaW5lcik7XG4gICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihcbiAgICAgIGV2ZW50c0NvbnRhaW5lcixcbiAgICAgIGV2ZW50XG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7IHgsIHksIHRyYW5zZm9ybSB9KSA9PlxuICAgICAgdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJlxuICAgICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDAgJiZcbiAgICAgIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgc25hcERyYWdnZWRFdmVudHM6IHRoaXMuc25hcERyYWdnZWRFdmVudHMsXG4gICAgICAgIGRyYWdBbHJlYWR5TW92ZWQ6IHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCxcbiAgICAgICAgdHJhbnNmb3JtXG4gICAgICB9KTtcbiAgICB0aGlzLmRyYWdBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGUgPSB7XG4gICAgICBhbGxEYXk6IDAsXG4gICAgICB0aW1lOiAwXG4gICAgfTtcbiAgICBpZiAoIXRoaXMuc25hcERyYWdnZWRFdmVudHMgJiYgZGF5RXZlbnQpIHtcbiAgICAgIHRoaXMudmlldy5ob3VyQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlZEV2ZW50ID0gY29sdW1uLmV2ZW50cy5maW5kKFxuICAgICAgICAgIGNvbHVtbkV2ZW50ID0+XG4gICAgICAgICAgICBjb2x1bW5FdmVudC5ldmVudCA9PT0gZGF5RXZlbnQuZXZlbnQgJiYgY29sdW1uRXZlbnQgIT09IGRheUV2ZW50XG4gICAgICAgICk7XG4gICAgICAgIC8vIGhpZGUgYW55IGxpbmtlZCBldmVudHMgd2hpbGUgZHJhZ2dpbmdcbiAgICAgICAgaWYgKGxpbmtlZEV2ZW50KSB7XG4gICAgICAgICAgbGlua2VkRXZlbnQud2lkdGggPSAwO1xuICAgICAgICAgIGxpbmtlZEV2ZW50LmhlaWdodCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnTW92ZShkYXlFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsIGRyYWdFdmVudDogRHJhZ01vdmVFdmVudCkge1xuICAgIGlmICh0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzKSB7XG4gICAgICBjb25zdCBuZXdFdmVudFRpbWVzID0gdGhpcy5nZXREcmFnTW92ZWRFdmVudFRpbWVzKFxuICAgICAgICBkYXlFdmVudCxcbiAgICAgICAgZHJhZ0V2ZW50LFxuICAgICAgICB0aGlzLmRheUNvbHVtbldpZHRoLFxuICAgICAgICB0cnVlXG4gICAgICApO1xuICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGRheUV2ZW50LmV2ZW50O1xuICAgICAgY29uc3QgYWRqdXN0ZWRFdmVudCA9IHsgLi4ub3JpZ2luYWxFdmVudCwgLi4ubmV3RXZlbnRUaW1lcyB9O1xuICAgICAgY29uc3QgdGVtcEV2ZW50cyA9IHRoaXMuZXZlbnRzLm1hcChldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudCA9PT0gb3JpZ2luYWxFdmVudCkge1xuICAgICAgICAgIHJldHVybiBhZGp1c3RlZEV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZXN0b3JlT3JpZ2luYWxFdmVudHMoXG4gICAgICAgIHRlbXBFdmVudHMsXG4gICAgICAgIG5ldyBNYXAoW1thZGp1c3RlZEV2ZW50LCBvcmlnaW5hbEV2ZW50XV0pXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50RHJhZ01vdmUoKSB7XG4gICAgdGhpcy5kcmFnQWxyZWFkeU1vdmVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnRW5kZWQoXG4gICAgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQsXG4gICAgZHJhZ0VuZEV2ZW50OiBEcmFnRW5kRXZlbnQsXG4gICAgZGF5V2lkdGg6IG51bWJlcixcbiAgICB1c2VZID0gZmFsc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XG4gICAgdGhpcy5kcmFnQWN0aXZlID0gZmFsc2U7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLmdldERyYWdNb3ZlZEV2ZW50VGltZXMoXG4gICAgICB3ZWVrRXZlbnQsXG4gICAgICBkcmFnRW5kRXZlbnQsXG4gICAgICBkYXlXaWR0aCxcbiAgICAgIHVzZVlcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdXNlWSA/ICd0aW1lJyA6ICdhbGxEYXknXSA+IDAgJiZcbiAgICAgIGlzRHJhZ2dlZFdpdGhpblBlcmlvZChzdGFydCwgZW5kLCB0aGlzLnZpZXcucGVyaW9kKVxuICAgICkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgbmV3U3RhcnQ6IHN0YXJ0LFxuICAgICAgICBuZXdFbmQ6IGVuZCxcbiAgICAgICAgZXZlbnQ6IHdlZWtFdmVudC5ldmVudCxcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5EcmFnLFxuICAgICAgICBhbGxEYXk6ICF1c2VZXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmRheXMgPSB0aGlzLnV0aWxzLmdldFdlZWtWaWV3SGVhZGVyKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXG4gICAgICAuLi5nZXRXZWVrVmlld1BlcmlvZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xuICAgICAgKVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGhpcy5ldmVudHMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBoZWFkZXI6IHRoaXMuZGF5cyxcbiAgICAgICAgLi4udGhpcy52aWV3XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0V2Vla1ZpZXcoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pIHtcbiAgICByZXR1cm4gdGhpcy51dGlscy5nZXRXZWVrVmlldyh7XG4gICAgICBldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb24sXG4gICAgICBhYnNvbHV0ZVBvc2l0aW9uZWRFdmVudHM6IHRydWUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGRheUVuZDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGVcbiAgICAgIH0sXG4gICAgICBzZWdtZW50SGVpZ2h0OiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXG4gICAgICAuLi5nZXRXZWVrVmlld1BlcmlvZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xuICAgICAgKVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERyYWdNb3ZlZEV2ZW50VGltZXMoXG4gICAgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQsXG4gICAgZHJhZ0VuZEV2ZW50OiBEcmFnRW5kRXZlbnQgfCBEcmFnTW92ZUV2ZW50LFxuICAgIGRheVdpZHRoOiBudW1iZXIsXG4gICAgdXNlWTogYm9vbGVhblxuICApIHtcbiAgICBjb25zdCBkYXlzRHJhZ2dlZCA9IHJvdW5kVG9OZWFyZXN0KGRyYWdFbmRFdmVudC54LCBkYXlXaWR0aCkgLyBkYXlXaWR0aDtcbiAgICBjb25zdCBtaW51dGVzTW92ZWQgPSB1c2VZXG4gICAgICA/IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgICAgICBkcmFnRW5kRXZlbnQueSxcbiAgICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxuICAgICAgICApXG4gICAgICA6IDA7XG5cbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgd2Vla0V2ZW50LmV2ZW50LnN0YXJ0LFxuICAgICAgICBkYXlzRHJhZ2dlZCxcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgKSxcbiAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICk7XG4gICAgbGV0IGVuZDogRGF0ZTtcbiAgICBpZiAod2Vla0V2ZW50LmV2ZW50LmVuZCkge1xuICAgICAgZW5kID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICB3ZWVrRXZlbnQuZXZlbnQuZW5kLFxuICAgICAgICAgIGRheXNEcmFnZ2VkLFxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgKSxcbiAgICAgICAgbWludXRlc01vdmVkXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7IHN0YXJ0LCBlbmQgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXN0b3JlT3JpZ2luYWxFdmVudHMoXG4gICAgdGVtcEV2ZW50czogQ2FsZW5kYXJFdmVudFtdLFxuICAgIGFkanVzdGVkRXZlbnRzOiBNYXA8Q2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudD5cbiAgKSB7XG4gICAgY29uc3QgcHJldmlvdXNWaWV3ID0gdGhpcy52aWV3O1xuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGVtcEV2ZW50cyk7XG4gICAgY29uc3QgYWRqdXN0ZWRFdmVudHNBcnJheSA9IHRlbXBFdmVudHMuZmlsdGVyKGV2ZW50ID0+XG4gICAgICBhZGp1c3RlZEV2ZW50cy5oYXMoZXZlbnQpXG4gICAgKTtcbiAgICB0aGlzLnZpZXcuaG91ckNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgcHJldmlvdXNWaWV3LmhvdXJDb2x1bW5zW2NvbHVtbkluZGV4XS5ob3Vycy5mb3JFYWNoKChob3VyLCBob3VySW5kZXgpID0+IHtcbiAgICAgICAgaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBzZWdtZW50SW5kZXgpID0+IHtcbiAgICAgICAgICBjb2x1bW4uaG91cnNbaG91ckluZGV4XS5zZWdtZW50c1tzZWdtZW50SW5kZXhdLmNzc0NsYXNzID1cbiAgICAgICAgICAgIHNlZ21lbnQuY3NzQ2xhc3M7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBhZGp1c3RlZEV2ZW50c0FycmF5LmZvckVhY2goYWRqdXN0ZWRFdmVudCA9PiB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBhZGp1c3RlZEV2ZW50cy5nZXQoYWRqdXN0ZWRFdmVudCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQ29sdW1uRXZlbnQgPSBjb2x1bW4uZXZlbnRzLmZpbmQoXG4gICAgICAgICAgY29sdW1uRXZlbnQgPT4gY29sdW1uRXZlbnQuZXZlbnQgPT09IGFkanVzdGVkRXZlbnRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nQ29sdW1uRXZlbnQpIHtcbiAgICAgICAgICAvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCBldmVudCBzbyB0cmFja0J5IGtpY2tzIGluIGFuZCB0aGUgZG9tIGlzbid0IGNoYW5nZWRcbiAgICAgICAgICBleGlzdGluZ0NvbHVtbkV2ZW50LmV2ZW50ID0gb3JpZ2luYWxFdmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhZGQgYSBkdW1teSBldmVudCB0byB0aGUgZHJvcCBzbyBpZiB0aGUgZXZlbnQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgb3JpZ2luYWwgY29sdW1uIHRoZSBkcmFnIGRvZXNuJ3QgZW5kIGVhcmx5XG4gICAgICAgICAgY29sdW1uLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGV2ZW50OiBvcmlnaW5hbEV2ZW50LFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgc3RhcnRzQmVmb3JlRGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGVuZHNBZnRlckRheTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgYWRqdXN0ZWRFdmVudHMuY2xlYXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRUaW1lRXZlbnRSZXNpemVkRGF0ZXMoXG4gICAgY2FsZW5kYXJFdmVudDogQ2FsZW5kYXJFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnRcbiAgKSB7XG4gICAgY29uc3QgbWluaW11bUV2ZW50SGVpZ2h0ID0gZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzKFxuICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0XG4gICAgKTtcbiAgICBjb25zdCBuZXdFdmVudERhdGVzID0ge1xuICAgICAgc3RhcnQ6IGNhbGVuZGFyRXZlbnQuc3RhcnQsXG4gICAgICBlbmQ6IGdldERlZmF1bHRFdmVudEVuZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgY2FsZW5kYXJFdmVudCxcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0XG4gICAgICApXG4gICAgfTtcbiAgICBjb25zdCB7IGVuZCwgLi4uZXZlbnRXaXRob3V0RW5kIH0gPSBjYWxlbmRhckV2ZW50O1xuICAgIGNvbnN0IHNtYWxsZXN0UmVzaXplcyA9IHtcbiAgICAgIHN0YXJ0OiB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kLFxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHQgKiAtMVxuICAgICAgKSxcbiAgICAgIGVuZDogZ2V0RGVmYXVsdEV2ZW50RW5kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICBldmVudFdpdGhvdXRFbmQsXG4gICAgICAgIG1pbmltdW1FdmVudEhlaWdodFxuICAgICAgKVxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBkYXlzRGlmZiA9IE1hdGgucm91bmQoXG4gICAgICAgICtyZXNpemVFdmVudC5lZGdlcy5sZWZ0IC8gdGhpcy5kYXlDb2x1bW5XaWR0aFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0LFxuICAgICAgICBkYXlzRGlmZixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgKTtcbiAgICAgIGlmIChuZXdTdGFydCA8IHNtYWxsZXN0UmVzaXplcy5zdGFydCkge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gc21hbGxlc3RSZXNpemVzLnN0YXJ0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgZGF5c0RpZmYgPSBNYXRoLnJvdW5kKFxuICAgICAgICArcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgLyB0aGlzLmRheUNvbHVtbldpZHRoXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3RW5kID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCxcbiAgICAgICAgZGF5c0RpZmYsXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICk7XG4gICAgICBpZiAobmV3RW5kID4gc21hbGxlc3RSZXNpemVzLmVuZCkge1xuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCA9IG5ld0VuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gc21hbGxlc3RSZXNpemVzLmVuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMudG9wIGFzIG51bWJlcixcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0LFxuICAgICAgICBtaW51dGVzTW92ZWRcbiAgICAgICk7XG4gICAgICBpZiAobmV3U3RhcnQgPCBzbWFsbGVzdFJlc2l6ZXMuc3RhcnQpIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5zdGFydCA9IG5ld1N0YXJ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5zdGFydCA9IHNtYWxsZXN0UmVzaXplcy5zdGFydDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5ib3R0b20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBtaW51dGVzTW92ZWQgPSBnZXRNaW51dGVzTW92ZWQoXG4gICAgICAgIHJlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbSBhcyBudW1iZXIsXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgICB0aGlzLmV2ZW50U25hcFNpemVcbiAgICAgICk7XG4gICAgICBjb25zdCBuZXdFbmQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kLFxuICAgICAgICBtaW51dGVzTW92ZWRcbiAgICAgICk7XG4gICAgICBpZiAobmV3RW5kID4gc21hbGxlc3RSZXNpemVzLmVuZCkge1xuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCA9IG5ld0VuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gc21hbGxlc3RSZXNpemVzLmVuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RXZlbnREYXRlcztcbiAgfVxufVxuXG4vLyBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuIl19