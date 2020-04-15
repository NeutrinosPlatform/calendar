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
var CalendarWeekViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarWeekViewComponent(cdr, utils, locale, dateAdapter) {
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
        this.trackByHourColumn = function (index, column) {
            return column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        };
        /**
         * @hidden
         */
        this.trackById = function (index, row) { return row.id; };
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
        console.log("eventActionsTemplate", this.eventActionsTemplate);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnChanges = function (changes) {
        var refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weekStartsOn;
        var refreshBody = changes.viewDate ||
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
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarWeekViewComponent.prototype.resizeStarted = function (eventsContainer, minWidth) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        var resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizeStarted = function (eventsContainer, timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        this.resizeStarted(eventsContainer);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizing = function (timeEvent, resizeEvent) {
        var _this = this;
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        var adjustedEvents = new Map();
        var tempEvents = tslib_1.__spread(this.events);
        this.timeEventResizes.forEach(function (lastResizeEvent, event) {
            var newEventDates = _this.getTimeEventResizedDates(event, lastResizeEvent);
            var adjustedEvent = tslib_1.__assign({}, event, newEventDates);
            adjustedEvents.set(adjustedEvent, event);
            var eventIndex = tempEvents.indexOf(event);
            tempEvents[eventIndex] = adjustedEvent;
        });
        this.restoreOriginalEvents(tempEvents, adjustedEvents);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizeEnded = function (timeEvent) {
        this.view = this.getWeekView(this.events);
        var lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
        if (lastResizeEvent) {
            this.timeEventResizes.delete(timeEvent.event);
            var newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
            this.eventTimesChanged.emit({
                newStart: newEventDates.start,
                newEnd: newEventDates.end,
                event: timeEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizeStarted = function (allDayEventsContainer, allDayEvent, resizeEvent) {
        this.allDayEventResizes.set(allDayEvent, {
            originalOffset: allDayEvent.offset,
            originalSpan: allDayEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizing = function (allDayEvent, resizeEvent, dayWidth) {
        var currentResize = this.allDayEventResizes.get(allDayEvent);
        if (typeof resizeEvent.edges.left !== 'undefined') {
            var diff = Math.round(+resizeEvent.edges.left / dayWidth);
            allDayEvent.offset = currentResize.originalOffset + diff;
            allDayEvent.span = currentResize.originalSpan - diff;
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            var diff = Math.round(+resizeEvent.edges.right / dayWidth);
            allDayEvent.span = currentResize.originalSpan + diff;
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizeEnded = function (allDayEvent) {
        var currentResize = this.allDayEventResizes.get(allDayEvent);
        if (currentResize) {
            var allDayEventResizingBeforeStart = currentResize.edge === 'left';
            var daysDiff = void 0;
            if (allDayEventResizingBeforeStart) {
                daysDiff = allDayEvent.offset - currentResize.originalOffset;
            }
            else {
                daysDiff = allDayEvent.span - currentResize.originalSpan;
            }
            allDayEvent.offset = currentResize.originalOffset;
            allDayEvent.span = currentResize.originalSpan;
            var newStart = allDayEvent.event.start;
            var newEnd = allDayEvent.event.end || allDayEvent.event.start;
            if (allDayEventResizingBeforeStart) {
                newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
            }
            else {
                newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
            }
            this.eventTimesChanged.emit({
                newStart: newStart,
                newEnd: newEnd,
                event: allDayEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
            this.allDayEventResizes.delete(allDayEvent);
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.getDayColumnWidth = function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dateDragEnter = function (date) {
        this.lastDragEnterDate = date;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.eventDropped = function (dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
            this.lastDragEnterDate.getTime() === date.getTime()) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay: allDay
            });
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragEnter = function (type) {
        this.eventDragEnterByType[type]++;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragLeave = function (type) {
        this.eventDragEnterByType[type]--;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragStarted = function (eventsContainer, event, dayEvent) {
        var _this = this;
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        var dragHelper = new CalendarDragHelper(eventsContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y, transform = _a.transform;
            return _this.allDayEventResizes.size === 0 &&
                _this.timeEventResizes.size === 0 &&
                dragHelper.validateDrag({
                    x: x,
                    y: y,
                    snapDraggedEvents: _this.snapDraggedEvents,
                    dragAlreadyMoved: _this.dragAlreadyMoved,
                    transform: transform
                });
        };
        this.dragActive = true;
        this.dragAlreadyMoved = false;
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        if (!this.snapDraggedEvents && dayEvent) {
            this.view.hourColumns.forEach(function (column) {
                var linkedEvent = column.events.find(function (columnEvent) {
                    return columnEvent.event === dayEvent.event && columnEvent !== dayEvent;
                });
                // hide any linked events while dragging
                if (linkedEvent) {
                    linkedEvent.width = 0;
                    linkedEvent.height = 0;
                }
            });
        }
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragMove = function (dayEvent, dragEvent) {
        if (this.snapDraggedEvents) {
            var newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
            var originalEvent_1 = dayEvent.event;
            var adjustedEvent_1 = tslib_1.__assign({}, originalEvent_1, newEventTimes);
            var tempEvents = this.events.map(function (event) {
                if (event === originalEvent_1) {
                    return adjustedEvent_1;
                }
                return event;
            });
            this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent_1, originalEvent_1]]));
        }
        this.dragAlreadyMoved = true;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventDragMove = function () {
        this.dragAlreadyMoved = true;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragEnded = function (weekEvent, dragEndEvent, dayWidth, useY) {
        if (useY === void 0) { useY = false; }
        this.view = this.getWeekView(this.events);
        this.dragActive = false;
        var _a = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY), start = _a.start, end = _a.end;
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
    };
    CalendarWeekViewComponent.prototype.refreshHeader = function () {
        this.days = this.utils.getWeekViewHeader(tslib_1.__assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    };
    CalendarWeekViewComponent.prototype.refreshBody = function () {
        this.view = this.getWeekView(this.events);
    };
    CalendarWeekViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    };
    CalendarWeekViewComponent.prototype.emitBeforeViewRender = function () {
        if (this.days && this.view) {
            this.beforeViewRender.emit(tslib_1.__assign({ header: this.days }, this.view));
        }
    };
    CalendarWeekViewComponent.prototype.getWeekView = function (events) {
        return this.utils.getWeekView(tslib_1.__assign({ events: events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            }, dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    };
    CalendarWeekViewComponent.prototype.getDragMovedEventTimes = function (weekEvent, dragEndEvent, dayWidth, useY) {
        var daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
        var minutesMoved = useY
            ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
            : 0;
        var start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
        var end;
        if (weekEvent.event.end) {
            end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
        }
        return { start: start, end: end };
    };
    CalendarWeekViewComponent.prototype.restoreOriginalEvents = function (tempEvents, adjustedEvents) {
        var previousView = this.view;
        this.view = this.getWeekView(tempEvents);
        var adjustedEventsArray = tempEvents.filter(function (event) {
            return adjustedEvents.has(event);
        });
        this.view.hourColumns.forEach(function (column, columnIndex) {
            previousView.hourColumns[columnIndex].hours.forEach(function (hour, hourIndex) {
                hour.segments.forEach(function (segment, segmentIndex) {
                    column.hours[hourIndex].segments[segmentIndex].cssClass =
                        segment.cssClass;
                });
            });
            adjustedEventsArray.forEach(function (adjustedEvent) {
                var originalEvent = adjustedEvents.get(adjustedEvent);
                var existingColumnEvent = column.events.find(function (columnEvent) { return columnEvent.event === adjustedEvent; });
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
    };
    CalendarWeekViewComponent.prototype.getTimeEventResizedDates = function (calendarEvent, resizeEvent) {
        var minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
        var newEventDates = {
            start: calendarEvent.start,
            end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight)
        };
        var end = calendarEvent.end, eventWithoutEnd = tslib_1.__rest(calendarEvent, ["end"]);
        var smallestResizes = {
            start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
            end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight)
        };
        if (typeof resizeEvent.edges.left !== 'undefined') {
            var daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
            var newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            var daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
            var newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        if (typeof resizeEvent.edges.top !== 'undefined') {
            var minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            var newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            var minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            var newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        return newEventDates;
    };
    CalendarWeekViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: CalendarUtils },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
        { type: DateAdapter }
    ]; };
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
            template: "\n    <div class=\"cal-week-view\" role=\"grid\">\n      <mwl-calendar-week-view-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n        (eventDropped)=\"\n          eventDropped({ dropData: $event }, $event.newStart, true)\n        \"\n        (dragEnter)=\"dateDragEnter($event.date)\"\n      >\n      </mwl-calendar-week-view-header>\n      <div\n        class=\"cal-all-day-events\"\n        #allDayEventsContainer\n        *ngIf=\"view.allDayEventRows.length > 0\"\n        mwlDroppable\n        (dragEnter)=\"dragEnter('allDay')\"\n        (dragLeave)=\"dragLeave('allDay')\"\n      >\n        <div class=\"cal-day-columns\">\n          <div\n            class=\"cal-time-label-column\"\n            [ngTemplateOutlet]=\"allDayEventsLabelTemplate\"\n          ></div>\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            (drop)=\"eventDropped($event, day.date, true)\"\n            (dragEnter)=\"dateDragEnter(day.date)\"\n          ></div>\n        </div>\n        <div\n          *ngFor=\"let eventRow of view.allDayEventRows; trackBy: trackById\"\n          #eventRowContainer\n          class=\"cal-events-row\"\n        >\n          <div\n            *ngFor=\"\n              let allDayEvent of eventRow.row;\n              trackBy: trackByWeekAllDayEvent\n            \"\n            #event\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"\n              allDayEvent.event.draggable && allDayEventResizes.size === 0\n            \"\n            [class.cal-starts-within-week]=\"!allDayEvent.startsBeforeWeek\"\n            [class.cal-ends-within-week]=\"!allDayEvent.endsAfterWeek\"\n            [ngClass]=\"allDayEvent.event?.cssClass\"\n            [style.width.%]=\"(100 / days.length) * allDayEvent.span\"\n            [style.marginLeft.%]=\"(100 / days.length) * allDayEvent.offset\"\n            mwlResizable\n            [resizeSnapGrid]=\"{ left: dayColumnWidth, right: dayColumnWidth }\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"\n              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)\n            \"\n            (resizing)=\"\n              allDayEventResizing(allDayEvent, $event, dayColumnWidth)\n            \"\n            (resizeEnd)=\"allDayEventResizeEnded(allDayEvent)\"\n            mwlDraggable\n            dragActiveClass=\"cal-drag-active\"\n            [dropData]=\"{ event: allDayEvent.event, calendarId: calendarId }\"\n            [dragAxis]=\"{\n              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,\n              y:\n                !snapDraggedEvents &&\n                allDayEvent.event.draggable &&\n                allDayEventResizes.size === 0\n            }\"\n            [dragSnapGrid]=\"snapDraggedEvents ? { x: dayColumnWidth } : {}\"\n            [validateDrag]=\"validateDrag\"\n            (dragStart)=\"dragStarted(eventRowContainer, event)\"\n            (dragging)=\"allDayEventDragMove()\"\n            (dragEnd)=\"dragEnded(allDayEvent, $event, dayColumnWidth)\"\n          >\n            <div\n              class=\"cal-resize-handle cal-resize-handle-before-start\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.beforeStart &&\n                !allDayEvent.startsBeforeWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ left: true }\"\n            ></div>\n            <mwl-calendar-week-view-event\n              [locale]=\"locale\"\n              [weekEvent]=\"allDayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              [eventActionsTemplate]=\"eventActionsTemplate\"\n              [daysInWeek]=\"daysInWeek\"\n              (eventClicked)=\"\n                eventClicked.emit({\n                  event: allDayEvent.event,\n                  sourceEvent: $event.sourceEvent\n                })\n              \"\n            >\n            </mwl-calendar-week-view-event>\n            <div\n              class=\"cal-resize-handle cal-resize-handle-after-end\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.afterEnd &&\n                !allDayEvent.endsAfterWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ right: true }\"\n            ></div>\n          </div>\n        </div>\n      </div>\n      <div\n        class=\"cal-time-events\"\n        mwlDroppable\n        (dragEnter)=\"dragEnter('time')\"\n        (dragLeave)=\"dragLeave('time')\"\n      >\n        <div\n          class=\"cal-time-label-column\"\n          *ngIf=\"view.hourColumns.length > 0 && daysInWeek !== 1\"\n        >\n          <div\n            *ngFor=\"\n              let hour of view.hourColumns[0].hours;\n              trackBy: trackByHour;\n              let odd = odd\n            \"\n            class=\"cal-hour\"\n            [class.cal-hour-odd]=\"odd\"\n          >\n            <mwl-calendar-week-view-hour-segment\n              *ngFor=\"let segment of hour.segments; trackBy: trackByHourSegment\"\n              [style.height.px]=\"hourSegmentHeight\"\n              [segment]=\"segment\"\n              [segmentHeight]=\"hourSegmentHeight\"\n              [locale]=\"locale\"\n              [customTemplate]=\"hourSegmentTemplate\"\n              [isTimeLabel]=\"true\"\n              [daysInWeek]=\"daysInWeek\"\n            >\n            </mwl-calendar-week-view-hour-segment>\n          </div>\n        </div>\n        <div\n          class=\"cal-day-columns\"\n          [class.cal-resize-active]=\"timeEventResizes.size > 0\"\n          #dayColumns\n        >\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let column of view.hourColumns; trackBy: trackByHourColumn\"\n          >\n            <mwl-calendar-week-view-current-time-marker\n              [columnDate]=\"column.date\"\n              [dayStartHour]=\"dayStartHour\"\n              [dayStartMinute]=\"dayStartMinute\"\n              [dayEndHour]=\"dayEndHour\"\n              [dayEndMinute]=\"dayEndMinute\"\n              [hourSegments]=\"hourSegments\"\n              [hourSegmentHeight]=\"hourSegmentHeight\"\n              [customTemplate]=\"currentTimeMarkerTemplate\"\n            ></mwl-calendar-week-view-current-time-marker>\n            <div class=\"cal-events-container\">\n              <div\n                *ngFor=\"\n                  let timeEvent of column.events;\n                  trackBy: trackByWeekTimeEvent\n                \"\n                #event\n                class=\"cal-event-container\"\n                [class.cal-draggable]=\"\n                  timeEvent.event.draggable && timeEventResizes.size === 0\n                \"\n                [class.cal-starts-within-day]=\"!timeEvent.startsBeforeDay\"\n                [class.cal-ends-within-day]=\"!timeEvent.endsAfterDay\"\n                [ngClass]=\"timeEvent.event.cssClass\"\n                [hidden]=\"timeEvent.height === 0 && timeEvent.width === 0\"\n                [style.top.px]=\"timeEvent.top\"\n                [style.height.px]=\"timeEvent.height\"\n                [style.left.%]=\"timeEvent.left\"\n                [style.width.%]=\"timeEvent.width\"\n                mwlResizable\n                [resizeSnapGrid]=\"{\n                  left: dayColumnWidth,\n                  right: dayColumnWidth,\n                  top: eventSnapSize || hourSegmentHeight,\n                  bottom: eventSnapSize || hourSegmentHeight\n                }\"\n                [validateResize]=\"validateResize\"\n                [allowNegativeResizes]=\"true\"\n                (resizeStart)=\"\n                  timeEventResizeStarted(dayColumns, timeEvent, $event)\n                \"\n                (resizing)=\"timeEventResizing(timeEvent, $event)\"\n                (resizeEnd)=\"timeEventResizeEnded(timeEvent)\"\n                mwlDraggable\n                dragActiveClass=\"cal-drag-active\"\n                [dropData]=\"{ event: timeEvent.event, calendarId: calendarId }\"\n                [dragAxis]=\"{\n                  x: timeEvent.event.draggable && timeEventResizes.size === 0,\n                  y: timeEvent.event.draggable && timeEventResizes.size === 0\n                }\"\n                [dragSnapGrid]=\"\n                  snapDraggedEvents\n                    ? {\n                        x: dayColumnWidth,\n                        y: eventSnapSize || hourSegmentHeight\n                      }\n                    : {}\n                \"\n                [ghostDragEnabled]=\"!snapDraggedEvents\"\n                [validateDrag]=\"validateDrag\"\n                (dragStart)=\"dragStarted(dayColumns, event, timeEvent)\"\n                (dragging)=\"dragMove(timeEvent, $event)\"\n                (dragEnd)=\"dragEnded(timeEvent, $event, dayColumnWidth, true)\"\n              >\n                <div\n                  class=\"cal-resize-handle cal-resize-handle-before-start\"\n                  *ngIf=\"\n                    timeEvent.event?.resizable?.beforeStart &&\n                    !timeEvent.startsBeforeDay\n                  \"\n                  mwlResizeHandle\n                  [resizeEdges]=\"{\n                    left: true,\n                    top: true\n                  }\"\n                ></div>\n                <mwl-calendar-week-view-event\n                  [locale]=\"locale\"\n                  [weekEvent]=\"timeEvent\"\n                  [tooltipPlacement]=\"tooltipPlacement\"\n                  [tooltipTemplate]=\"tooltipTemplate\"\n                  [tooltipAppendToBody]=\"tooltipAppendToBody\"\n                  [tooltipDisabled]=\"dragActive || timeEventResizes.size > 0\"\n                  [tooltipDelay]=\"tooltipDelay\"\n                  [customTemplate]=\"eventTemplate\"\n                  [eventTitleTemplate]=\"eventTitleTemplate\"\n                  [eventActionsTemplate]=\"eventActionsTemplate\"\n                  [column]=\"column\"\n                  [daysInWeek]=\"daysInWeek\"\n                  (eventClicked)=\"\n                    eventClicked.emit({\n                      event: timeEvent.event,\n                      sourceEvent: $event.sourceEvent\n                    })\n                  \"\n                >\n                </mwl-calendar-week-view-event>\n                <div\n                  class=\"cal-resize-handle cal-resize-handle-after-end\"\n                  *ngIf=\"\n                    timeEvent.event?.resizable?.afterEnd &&\n                    !timeEvent.endsAfterDay\n                  \"\n                  mwlResizeHandle\n                  [resizeEdges]=\"{\n                    right: true,\n                    bottom: true\n                  }\"\n                ></div>\n              </div>\n            </div>\n\n            <div\n              *ngFor=\"\n                let hour of column.hours;\n                trackBy: trackByHour;\n                let odd = odd\n              \"\n              class=\"cal-hour\"\n              [class.cal-hour-odd]=\"odd\"\n            >\n              <mwl-calendar-week-view-hour-segment\n                *ngFor=\"\n                  let segment of hour.segments;\n                  trackBy: trackByHourSegment\n                \"\n                [style.height.px]=\"hourSegmentHeight\"\n                [segment]=\"segment\"\n                [segmentHeight]=\"hourSegmentHeight\"\n                [locale]=\"locale\"\n                [customTemplate]=\"hourSegmentTemplate\"\n                [daysInWeek]=\"daysInWeek\"\n                (mwlClick)=\"\n                  hourSegmentClicked.emit({\n                    date: segment.date,\n                    sourceEvent: $event\n                  })\n                \"\n                [clickListenerDisabled]=\"\n                  hourSegmentClicked.observers.length === 0\n                \"\n                mwlDroppable\n                [dragOverClass]=\"\n                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null\n                \"\n                dragActiveClass=\"cal-drag-active\"\n                (drop)=\"eventDropped($event, segment.date, false)\"\n                (dragEnter)=\"dateDragEnter(segment.date)\"\n                [isTimeLabel]=\"daysInWeek === 1\"\n              >\n              </mwl-calendar-week-view-hour-segment>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }),
        tslib_1.__param(2, Inject(LOCALE_ID))
    ], CalendarWeekViewComponent);
    return CalendarWeekViewComponent;
}());
export { CalendarWeekViewComponent };
// [eventActionsTemplate]="eventActionsTemplate"
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQWV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBRUwsa0NBQWtDLEVBQ25DLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2QsY0FBYyxFQUNkLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsOEJBQThCLEVBQzlCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3JCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBbUIvRDs7Ozs7Ozs7O0dBU0c7QUFtVUg7SUFzU0U7O09BRUc7SUFDSCxtQ0FDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUVwQixnQkFBVyxHQUFYLFdB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RTt1RUFDZ0U7SUFNekU7UUFEQyxNQUFNLEVBQUU7eUVBSUo7SUF6TE0seUJBQXlCO1FBbFVyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSw4cFpBOFRUO1NBQ0YsQ0FBQztRQTZTRyxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7T0E1U1QseUJBQXlCLENBbTZCckM7SUFBRCxnQ0FBQztDQUFBLEFBbjZCRCxJQW02QkM7U0FuNkJZLHlCQUF5QjtBQXE2QnRDLGdEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgTE9DQUxFX0lELFxuICBJbmplY3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBXZWVrRGF5LFxuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrVmlld0FsbERheUV2ZW50LFxuICBXZWVrVmlldyxcbiAgVmlld1BlcmlvZCxcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uLFxuICBXZWVrVmlld1RpbWVFdmVudCxcbiAgV2Vla1ZpZXdIb3VyU2VnbWVudCxcbiAgV2Vla1ZpZXdIb3VyLFxuICBXZWVrVmlld0FsbERheUV2ZW50Um93XG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFJlc2l6ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckRyYWdIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNpemVIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlcic7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGVcbn0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVFdmVudHMsXG4gIHJvdW5kVG9OZWFyZXN0LFxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUsXG4gIHRyYWNrQnlIb3VyU2VnbWVudCxcbiAgdHJhY2tCeUhvdXIsXG4gIGdldE1pbnV0ZXNNb3ZlZCxcbiAgZ2V0RGVmYXVsdEV2ZW50RW5kLFxuICBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXMsXG4gIGFkZERheXNXaXRoRXhjbHVzaW9ucyxcbiAgaXNEcmFnZ2VkV2l0aGluUGVyaW9kLFxuICBzaG91bGRGaXJlRHJvcHBlZEV2ZW50LFxuICBnZXRXZWVrVmlld1BlcmlvZCxcbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCxcbiAgdHJhY2tCeVdlZWtUaW1lRXZlbnRcbn0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQge1xuICBEcmFnRW5kRXZlbnQsXG4gIERyb3BFdmVudCxcbiAgRHJhZ01vdmVFdmVudCxcbiAgVmFsaWRhdGVEcmFnXG59IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplIHtcbiAgb3JpZ2luYWxPZmZzZXQ6IG51bWJlcjtcbiAgb3JpZ2luYWxTcGFuOiBudW1iZXI7XG4gIGVkZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQgZXh0ZW5kcyBXZWVrVmlldyB7XG4gIGhlYWRlcjogV2Vla0RheVtdO1xufVxuXG4vKipcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiB3ZWVrLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoeyAgIFxuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtd2Vlay12aWV3XCIgcm9sZT1cImdyaWRcIj5cbiAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlclxuICAgICAgICBbZGF5c109XCJkYXlzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAoZGF5SGVhZGVyQ2xpY2tlZCk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChldmVudERyb3BwZWQpPVwiXG4gICAgICAgICAgZXZlbnREcm9wcGVkKHsgZHJvcERhdGE6ICRldmVudCB9LCAkZXZlbnQubmV3U3RhcnQsIHRydWUpXG4gICAgICAgIFwiXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcigkZXZlbnQuZGF0ZSlcIlxuICAgICAgPlxuICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtYWxsLWRheS1ldmVudHNcIlxuICAgICAgICAjYWxsRGF5RXZlbnRzQ29udGFpbmVyXG4gICAgICAgICpuZ0lmPVwidmlldy5hbGxEYXlFdmVudFJvd3MubGVuZ3RoID4gMFwiXG4gICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlcignYWxsRGF5JylcIlxuICAgICAgICAoZHJhZ0xlYXZlKT1cImRyYWdMZWF2ZSgnYWxsRGF5JylcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZVwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgICAoZHJvcCk9XCJldmVudERyb3BwZWQoJGV2ZW50LCBkYXkuZGF0ZSwgdHJ1ZSlcIlxuICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXRlRHJhZ0VudGVyKGRheS5kYXRlKVwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudFJvdyBvZiB2aWV3LmFsbERheUV2ZW50Um93czsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgICAjZXZlbnRSb3dDb250YWluZXJcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudHMtcm93XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICBsZXQgYWxsRGF5RXZlbnQgb2YgZXZlbnRSb3cucm93O1xuICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5V2Vla0FsbERheUV2ZW50XG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiBhbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi13ZWVrXT1cIiFhbGxEYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCIhYWxsRGF5RXZlbnQuZW5kc0FmdGVyV2Vla1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJhbGxEYXlFdmVudC5ldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiKDEwMCAvIGRheXMubGVuZ3RoKSAqIGFsbERheUV2ZW50LnNwYW5cIlxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpbkxlZnQuJV09XCIoMTAwIC8gZGF5cy5sZW5ndGgpICogYWxsRGF5RXZlbnQub2Zmc2V0XCJcbiAgICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cInsgbGVmdDogZGF5Q29sdW1uV2lkdGgsIHJpZ2h0OiBkYXlDb2x1bW5XaWR0aCB9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAocmVzaXplU3RhcnQpPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXplU3RhcnRlZChldmVudFJvd0NvbnRhaW5lciwgYWxsRGF5RXZlbnQsICRldmVudClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAocmVzaXppbmcpPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXppbmcoYWxsRGF5RXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJhbGxEYXlFdmVudFJlc2l6ZUVuZGVkKGFsbERheUV2ZW50KVwiXG4gICAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsIGNhbGVuZGFySWQ6IGNhbGVuZGFySWQgfVwiXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xuICAgICAgICAgICAgICB4OiBhbGxEYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDAsXG4gICAgICAgICAgICAgIHk6XG4gICAgICAgICAgICAgICAgIXNuYXBEcmFnZ2VkRXZlbnRzICYmXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJzbmFwRHJhZ2dlZEV2ZW50cyA/IHsgeDogZGF5Q29sdW1uV2lkdGggfSA6IHt9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgIChkcmFnU3RhcnQpPVwiZHJhZ1N0YXJ0ZWQoZXZlbnRSb3dDb250YWluZXIsIGV2ZW50KVwiXG4gICAgICAgICAgICAoZHJhZ2dpbmcpPVwiYWxsRGF5RXZlbnREcmFnTW92ZSgpXCJcbiAgICAgICAgICAgIChkcmFnRW5kKT1cImRyYWdFbmRlZChhbGxEYXlFdmVudCwgJGV2ZW50LCBkYXlDb2x1bW5XaWR0aClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtcmVzaXplLWhhbmRsZSBjYWwtcmVzaXplLWhhbmRsZS1iZWZvcmUtc3RhcnRcIlxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmJlZm9yZVN0YXJ0ICYmXG4gICAgICAgICAgICAgICAgIWFsbERheUV2ZW50LnN0YXJ0c0JlZm9yZVdlZWtcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXG4gICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7IGxlZnQ6IHRydWUgfVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudFxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwiYWxsRGF5RXZlbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXG4gICAgICAgICAgICAgICAgZXZlbnRDbGlja2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgZXZlbnQ6IGFsbERheUV2ZW50LmV2ZW50LFxuICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYWZ0ZXItZW5kXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICBhbGxEYXlFdmVudC5ldmVudD8ucmVzaXphYmxlPy5hZnRlckVuZCAmJlxuICAgICAgICAgICAgICAgICFhbGxEYXlFdmVudC5lbmRzQWZ0ZXJXZWVrXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyByaWdodDogdHJ1ZSB9XCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1ldmVudHNcIlxuICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgKGRyYWdFbnRlcik9XCJkcmFnRW50ZXIoJ3RpbWUnKVwiXG4gICAgICAgIChkcmFnTGVhdmUpPVwiZHJhZ0xlYXZlKCd0aW1lJylcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIlxuICAgICAgICAgICpuZ0lmPVwidmlldy5ob3VyQ29sdW1ucy5sZW5ndGggPiAwICYmIGRheXNJbldlZWsgIT09IDFcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgIGxldCBob3VyIG9mIHZpZXcuaG91ckNvbHVtbnNbMF0uaG91cnM7XG4gICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlIb3VyO1xuICAgICAgICAgICAgICBsZXQgb2RkID0gb2RkXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtaG91clwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWhvdXItb2RkXT1cIm9kZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50XG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHM7IHRyYWNrQnk6IHRyYWNrQnlIb3VyU2VnbWVudFwiXG4gICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcbiAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2lzVGltZUxhYmVsXT1cInRydWVcIlxuICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtZGF5LWNvbHVtbnNcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtcmVzaXplLWFjdGl2ZV09XCJ0aW1lRXZlbnRSZXNpemVzLnNpemUgPiAwXCJcbiAgICAgICAgICAjZGF5Q29sdW1uc1xuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZGF5LWNvbHVtblwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHZpZXcuaG91ckNvbHVtbnM7IHRyYWNrQnk6IHRyYWNrQnlIb3VyQ29sdW1uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyXG4gICAgICAgICAgICAgIFtjb2x1bW5EYXRlXT1cImNvbHVtbi5kYXRlXCJcbiAgICAgICAgICAgICAgW2RheVN0YXJ0SG91cl09XCJkYXlTdGFydEhvdXJcIlxuICAgICAgICAgICAgICBbZGF5U3RhcnRNaW51dGVdPVwiZGF5U3RhcnRNaW51dGVcIlxuICAgICAgICAgICAgICBbZGF5RW5kSG91cl09XCJkYXlFbmRIb3VyXCJcbiAgICAgICAgICAgICAgW2RheUVuZE1pbnV0ZV09XCJkYXlFbmRNaW51dGVcIlxuICAgICAgICAgICAgICBbaG91clNlZ21lbnRzXT1cImhvdXJTZWdtZW50c1wiXG4gICAgICAgICAgICAgIFtob3VyU2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlXCJcbiAgICAgICAgICAgID48L213bC1jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgICAgICBsZXQgdGltZUV2ZW50IG9mIGNvbHVtbi5ldmVudHM7XG4gICAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5V2Vla1RpbWVFdmVudFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJcbiAgICAgICAgICAgICAgICAgIHRpbWVFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgdGltZUV2ZW50UmVzaXplcy5zaXplID09PSAwXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4tZGF5XT1cIiF0aW1lRXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLWRheV09XCIhdGltZUV2ZW50LmVuZHNBZnRlckRheVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwidGltZUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cInRpbWVFdmVudC5oZWlnaHQgPT09IDAgJiYgdGltZUV2ZW50LndpZHRoID09PSAwXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUudG9wLnB4XT1cInRpbWVFdmVudC50b3BcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwidGltZUV2ZW50LmhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmxlZnQuJV09XCJ0aW1lRXZlbnQubGVmdFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwidGltZUV2ZW50LndpZHRoXCJcbiAgICAgICAgICAgICAgICBtd2xSZXNpemFibGVcbiAgICAgICAgICAgICAgICBbcmVzaXplU25hcEdyaWRdPVwie1xuICAgICAgICAgICAgICAgICAgbGVmdDogZGF5Q29sdW1uV2lkdGgsXG4gICAgICAgICAgICAgICAgICByaWdodDogZGF5Q29sdW1uV2lkdGgsXG4gICAgICAgICAgICAgICAgICB0b3A6IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICBib3R0b206IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICBbdmFsaWRhdGVSZXNpemVdPVwidmFsaWRhdGVSZXNpemVcIlxuICAgICAgICAgICAgICAgIFthbGxvd05lZ2F0aXZlUmVzaXplc109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAocmVzaXplU3RhcnQpPVwiXG4gICAgICAgICAgICAgICAgICB0aW1lRXZlbnRSZXNpemVTdGFydGVkKGRheUNvbHVtbnMsIHRpbWVFdmVudCwgJGV2ZW50KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgKHJlc2l6aW5nKT1cInRpbWVFdmVudFJlc2l6aW5nKHRpbWVFdmVudCwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJ0aW1lRXZlbnRSZXNpemVFbmRlZCh0aW1lRXZlbnQpXCJcbiAgICAgICAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsIGNhbGVuZGFySWQ6IGNhbGVuZGFySWQgfVwiXG4gICAgICAgICAgICAgICAgW2RyYWdBeGlzXT1cIntcbiAgICAgICAgICAgICAgICAgIHg6IHRpbWVFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgdGltZUV2ZW50UmVzaXplcy5zaXplID09PSAwLFxuICAgICAgICAgICAgICAgICAgeTogdGltZUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiB0aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICBbZHJhZ1NuYXBHcmlkXT1cIlxuICAgICAgICAgICAgICAgICAgc25hcERyYWdnZWRFdmVudHNcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBkYXlDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDoge31cbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFtnaG9zdERyYWdFbmFibGVkXT1cIiFzbmFwRHJhZ2dlZEV2ZW50c1wiXG4gICAgICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxuICAgICAgICAgICAgICAgIChkcmFnU3RhcnQpPVwiZHJhZ1N0YXJ0ZWQoZGF5Q29sdW1ucywgZXZlbnQsIHRpbWVFdmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnZ2luZyk9XCJkcmFnTW92ZSh0aW1lRXZlbnQsICRldmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnRW5kKT1cImRyYWdFbmRlZCh0aW1lRXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgsIHRydWUpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYmVmb3JlLXN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgIHRpbWVFdmVudC5ldmVudD8ucmVzaXphYmxlPy5iZWZvcmVTdGFydCAmJlxuICAgICAgICAgICAgICAgICAgICAhdGltZUV2ZW50LnN0YXJ0c0JlZm9yZURheVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnRcbiAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwidGltZUV2ZW50XCJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cImRyYWdBY3RpdmUgfHwgdGltZUV2ZW50UmVzaXplcy5zaXplID4gMFwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHRpbWVFdmVudC5ldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50LnNvdXJjZUV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtcmVzaXplLWhhbmRsZSBjYWwtcmVzaXplLWhhbmRsZS1hZnRlci1lbmRcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICAgICAgdGltZUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmFmdGVyRW5kICYmXG4gICAgICAgICAgICAgICAgICAgICF0aW1lRXZlbnQuZW5kc0FmdGVyRGF5XG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXG4gICAgICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwie1xuICAgICAgICAgICAgICAgICAgICByaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgb2YgY29sdW1uLmhvdXJzO1xuICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlIb3VyO1xuICAgICAgICAgICAgICAgIGxldCBvZGQgPSBvZGRcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtaG91clwiXG4gICAgICAgICAgICAgIFtjbGFzcy5jYWwtaG91ci1vZGRdPVwib2RkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50XG4gICAgICAgICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeUhvdXJTZWdtZW50XG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcbiAgICAgICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgICAgICAobXdsQ2xpY2spPVwiXG4gICAgICAgICAgICAgICAgICBob3VyU2VnbWVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHNlZ21lbnQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFtjbGlja0xpc3RlbmVyRGlzYWJsZWRdPVwiXG4gICAgICAgICAgICAgICAgICBob3VyU2VnbWVudENsaWNrZWQub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICAgICAgW2RyYWdPdmVyQ2xhc3NdPVwiXG4gICAgICAgICAgICAgICAgICAhZHJhZ0FjdGl2ZSB8fCAhc25hcERyYWdnZWRFdmVudHMgPyAnY2FsLWRyYWctb3ZlcicgOiBudWxsXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgICAgICAgIChkcm9wKT1cImV2ZW50RHJvcHBlZCgkZXZlbnQsIHNlZ21lbnQuZGF0ZSwgZmFsc2UpXCJcbiAgICAgICAgICAgICAgICAoZHJhZ0VudGVyKT1cImRhdGVEcmFnRW50ZXIoc2VnbWVudC5kYXRlKVwiXG4gICAgICAgICAgICAgICAgW2lzVGltZUxhYmVsXT1cImRheXNJbldlZWsgPT09IDFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vlay5cbiAgICogVGhpcyBpcyBpZ25vcmVkIHdoZW4gdGhlIGBkYXlzSW5XZWVrYCBpbnB1dCBpcyBhbHNvIHNldCBhcyB0aGUgYHZpZXdEYXRlYCB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGluc3RlYWQuXG4gICAqIE5vdGUsIHlvdSBzaG91bGQgYWxzbyBwYXNzIHRoaXMgdG8gdGhlIGNhbGVuZGFyIHRpdGxlIHBpcGUgc28gaXQgc2hvd3MgdGhlIHNhbWUgZGF5czoge3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6bG9jYWxlOndlZWtTdGFydHNPbiB9fVxuICAgKi9cbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHdlZWsgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgYWN0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVjaXNpb24gdG8gZGlzcGxheSBldmVudHMuXG4gICAqIGBkYXlzYCB3aWxsIHJvdW5kIGV2ZW50IHN0YXJ0IGFuZCBlbmQgZGF0ZXMgdG8gdGhlIG5lYXJlc3QgZGF5IGFuZCBgbWludXRlc2Agd2lsbCBub3QgZG8gdGhpcyByb3VuZGluZ1xuICAgKi9cbiAgQElucHV0KCkgcHJlY2lzaW9uOiAnZGF5cycgfCAnbWludXRlcycgPSAnZGF5cyc7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCBpbmRpY2F0ZSB3aGljaCBkYXlzIGFyZSB3ZWVrZW5kc1xuICAgKi9cbiAgQElucHV0KCkgd2Vla2VuZERheXM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHNuYXAgZXZlbnRzIHRvIGEgZ3JpZCB3aGVuIGRyYWdnaW5nXG4gICAqL1xuICBASW5wdXQoKSBzbmFwRHJhZ2dlZEV2ZW50czogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gNjA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIGdyaWQgc2l6ZSB0byBzbmFwIHJlc2l6aW5nIGFuZCBkcmFnZ2luZyBvZiBob3VybHkgZXZlbnRzIHRvXG4gICAqL1xuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGFsbCBkYXkgZXZlbnRzIGxhYmVsIHRleHRcbiAgICovXG4gIEBJbnB1dCgpIGFsbERheUV2ZW50c0xhYmVsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuIENhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhIHNob3J0ZXIgb3IgbG9uZ2VyIHdlZWsgdmlldy5cbiAgICogVGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayB3aWxsIGFsd2F5cyBiZSB0aGUgYHZpZXdEYXRlYCBhbmQgYHdlZWtTdGFydHNPbmAgaWYgc2V0IHdpbGwgYmUgaWdub3JlZFxuICAgKi9cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBjdXJyZW50IHRpbWUgbWFya2VyXG4gICAqL1xuICBASW5wdXQoKSBjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGhlYWRlciB3ZWVrIGRheSBpcyBjbGlja2VkLiBBZGRpbmcgYSBgY3NzQ2xhc3NgIHByb3BlcnR5IG9uIGAkZXZlbnQuZGF5YCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBoZWFkZXIgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGRheUhlYWRlckNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXk6IFdlZWtEYXk7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IHdlZWsuXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYSBkYXkgaW4gdGhlIGhlYWRlciBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRhdGU6IERhdGU7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogV2Vla1ZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnRSZXNpemVzOiBNYXA8XG4gICAgV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgICBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplXG4gID4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRpbWVFdmVudFJlc2l6ZXM6IE1hcDxDYWxlbmRhckV2ZW50LCBSZXNpemVFdmVudD4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJhZ0VudGVyQnlUeXBlID0ge1xuICAgIGFsbERheTogMCxcbiAgICB0aW1lOiAwXG4gIH07XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdBY3RpdmUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZURyYWc6IFZhbGlkYXRlRHJhZztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVSZXNpemU6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheUNvbHVtbldpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNhbGVuZGFySWQgPSBTeW1ib2woJ2FuZ3VsYXIgY2FsZW5kYXIgd2VlayB2aWV3IGlkJyk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXJTZWdtZW50ID0gdHJhY2tCeUhvdXJTZWdtZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91ciA9IHRyYWNrQnlIb3VyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5V2Vla0FsbERheUV2ZW50ID0gdHJhY2tCeVdlZWtBbGxEYXlFdmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeVdlZWtUaW1lRXZlbnQgPSB0cmFja0J5V2Vla1RpbWVFdmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBsYXN0RHJhZ0VudGVyRGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXJDb2x1bW4gPSAoaW5kZXg6IG51bWJlciwgY29sdW1uOiBXZWVrVmlld0hvdXJDb2x1bW4pID0+XG4gICAgY29sdW1uLmhvdXJzWzBdID8gY29sdW1uLmhvdXJzWzBdLnNlZ21lbnRzWzBdLmRhdGUudG9JU09TdHJpbmcoKSA6IGNvbHVtbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIHJvdzogV2Vla1ZpZXdBbGxEYXlFdmVudFJvdykgPT4gcm93LmlkO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgdXRpbHM6IENhbGVuZGFyVXRpbHMsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nLFxuICAgIHByb3RlY3RlZCBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXJcbiAgKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIiwgdGhpcy5ldmVudEFjdGlvbnNUZW1wbGF0ZSlcbiAgfVxuXG4gIHBhZ2U6J290aGVyJztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVmcmVzaEhlYWRlciA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XG4gICAgICBjaGFuZ2VzLndlZWtlbmREYXlzIHx8XG4gICAgICBjaGFuZ2VzLmRheXNJbldlZWsgfHxcbiAgICAgIGNoYW5nZXMud2Vla1N0YXJ0c09uO1xuXG4gICAgY29uc3QgcmVmcmVzaEJvZHkgPVxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRzIHx8XG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbiB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudEhlaWdodCB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZGF5c0luV2VlaztcblxuICAgIGlmIChyZWZyZXNoSGVhZGVyKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlciB8fCByZWZyZXNoQm9keSkge1xuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzaXplU3RhcnRlZChldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LCBtaW5XaWR0aD86IG51bWJlcikge1xuICAgIHRoaXMuZGF5Q29sdW1uV2lkdGggPSB0aGlzLmdldERheUNvbHVtbldpZHRoKGV2ZW50c0NvbnRhaW5lcik7XG4gICAgY29uc3QgcmVzaXplSGVscGVyOiBDYWxlbmRhclJlc2l6ZUhlbHBlciA9IG5ldyBDYWxlbmRhclJlc2l6ZUhlbHBlcihcbiAgICAgIGV2ZW50c0NvbnRhaW5lcixcbiAgICAgIG1pbldpZHRoXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlUmVzaXplID0gKHsgcmVjdGFuZ2xlIH0pID0+XG4gICAgICByZXNpemVIZWxwZXIudmFsaWRhdGVSZXNpemUoeyByZWN0YW5nbGUgfSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdGltZUV2ZW50UmVzaXplU3RhcnRlZChcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHRpbWVFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5zZXQodGltZUV2ZW50LmV2ZW50LCByZXNpemVFdmVudCk7XG4gICAgdGhpcy5yZXNpemVTdGFydGVkKGV2ZW50c0NvbnRhaW5lcik7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdGltZUV2ZW50UmVzaXppbmcodGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KSB7XG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNldCh0aW1lRXZlbnQuZXZlbnQsIHJlc2l6ZUV2ZW50KTtcbiAgICBjb25zdCBhZGp1c3RlZEV2ZW50cyA9IG5ldyBNYXA8Q2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudD4oKTtcblxuICAgIGNvbnN0IHRlbXBFdmVudHMgPSBbLi4udGhpcy5ldmVudHNdO1xuXG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLmZvckVhY2goKGxhc3RSZXNpemVFdmVudCwgZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGxhc3RSZXNpemVFdmVudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGFkanVzdGVkRXZlbnQgPSB7IC4uLmV2ZW50LCAuLi5uZXdFdmVudERhdGVzIH07XG4gICAgICBhZGp1c3RlZEV2ZW50cy5zZXQoYWRqdXN0ZWRFdmVudCwgZXZlbnQpO1xuICAgICAgY29uc3QgZXZlbnRJbmRleCA9IHRlbXBFdmVudHMuaW5kZXhPZihldmVudCk7XG4gICAgICB0ZW1wRXZlbnRzW2V2ZW50SW5kZXhdID0gYWRqdXN0ZWRFdmVudDtcbiAgICB9KTtcblxuICAgIHRoaXMucmVzdG9yZU9yaWdpbmFsRXZlbnRzKHRlbXBFdmVudHMsIGFkanVzdGVkRXZlbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0aW1lRXZlbnRSZXNpemVFbmRlZCh0aW1lRXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50KSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XG4gICAgY29uc3QgbGFzdFJlc2l6ZUV2ZW50ID0gdGhpcy50aW1lRXZlbnRSZXNpemVzLmdldCh0aW1lRXZlbnQuZXZlbnQpO1xuICAgIGlmIChsYXN0UmVzaXplRXZlbnQpIHtcbiAgICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5kZWxldGUodGltZUV2ZW50LmV2ZW50KTtcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcbiAgICAgICAgdGltZUV2ZW50LmV2ZW50LFxuICAgICAgICBsYXN0UmVzaXplRXZlbnRcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBuZXdTdGFydDogbmV3RXZlbnREYXRlcy5zdGFydCxcbiAgICAgICAgbmV3RW5kOiBuZXdFdmVudERhdGVzLmVuZCxcbiAgICAgICAgZXZlbnQ6IHRpbWVFdmVudC5ldmVudCxcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBhbGxEYXlFdmVudFJlc2l6ZVN0YXJ0ZWQoXG4gICAgYWxsRGF5RXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuc2V0KGFsbERheUV2ZW50LCB7XG4gICAgICBvcmlnaW5hbE9mZnNldDogYWxsRGF5RXZlbnQub2Zmc2V0LFxuICAgICAgb3JpZ2luYWxTcGFuOiBhbGxEYXlFdmVudC5zcGFuLFxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIH0pO1xuICAgIHRoaXMucmVzaXplU3RhcnRlZChcbiAgICAgIGFsbERheUV2ZW50c0NvbnRhaW5lcixcbiAgICAgIHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgoYWxsRGF5RXZlbnRzQ29udGFpbmVyKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnRSZXNpemluZyhcbiAgICBhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnQsXG4gICAgZGF5V2lkdGg6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplID0gdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuZ2V0KFxuICAgICAgYWxsRGF5RXZlbnRcbiAgICApO1xuXG4gICAgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMubGVmdCAvIGRheVdpZHRoKTtcbiAgICAgIGFsbERheUV2ZW50Lm9mZnNldCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQgKyBkaWZmO1xuICAgICAgYWxsRGF5RXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuIC0gZGlmZjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5yaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IE1hdGgucm91bmQoK3Jlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0IC8gZGF5V2lkdGgpO1xuICAgICAgYWxsRGF5RXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuICsgZGlmZjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnRSZXNpemVFbmRlZChhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IFdlZWtWaWV3QWxsRGF5RXZlbnRSZXNpemUgPSB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5nZXQoXG4gICAgICBhbGxEYXlFdmVudFxuICAgICk7XG5cbiAgICBpZiAoY3VycmVudFJlc2l6ZSkge1xuICAgICAgY29uc3QgYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0ID0gY3VycmVudFJlc2l6ZS5lZGdlID09PSAnbGVmdCc7XG4gICAgICBsZXQgZGF5c0RpZmY6IG51bWJlcjtcbiAgICAgIGlmIChhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5vZmZzZXQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5zcGFuIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XG4gICAgICB9XG5cbiAgICAgIGFsbERheUV2ZW50Lm9mZnNldCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XG4gICAgICBhbGxEYXlFdmVudC5zcGFuID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XG5cbiAgICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LmVuZCB8fCBhbGxEYXlFdmVudC5ldmVudC5zdGFydDtcbiAgICAgIGlmIChhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgICAgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgICBkYXlzRGlmZixcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICBuZXdFbmQsXG4gICAgICAgICAgZGF5c0RpZmYsXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgbmV3RW5kLFxuICAgICAgICBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuUmVzaXplXG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmRlbGV0ZShhbGxEYXlFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGdldERheUNvbHVtbldpZHRoKGV2ZW50Um93Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZXZlbnRSb3dDb250YWluZXIub2Zmc2V0V2lkdGggLyB0aGlzLmRheXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXRlRHJhZ0VudGVyKGRhdGU6IERhdGUpIHtcbiAgICB0aGlzLmxhc3REcmFnRW50ZXJEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBldmVudERyb3BwZWQoXG4gICAgZHJvcEV2ZW50OiBEcm9wRXZlbnQ8eyBldmVudD86IENhbGVuZGFyRXZlbnQ7IGNhbGVuZGFySWQ/OiBzeW1ib2wgfT4sXG4gICAgZGF0ZTogRGF0ZSxcbiAgICBhbGxEYXk6IGJvb2xlYW5cbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgc2hvdWxkRmlyZURyb3BwZWRFdmVudChkcm9wRXZlbnQsIGRhdGUsIGFsbERheSwgdGhpcy5jYWxlbmRhcklkKSAmJlxuICAgICAgdGhpcy5sYXN0RHJhZ0VudGVyRGF0ZS5nZXRUaW1lKCkgPT09IGRhdGUuZ2V0VGltZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLkRyb3AsXG4gICAgICAgIGV2ZW50OiBkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgIG5ld1N0YXJ0OiBkYXRlLFxuICAgICAgICBhbGxEYXlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnRW50ZXIodHlwZTogJ2FsbERheScgfCAndGltZScpIHtcbiAgICB0aGlzLmV2ZW50RHJhZ0VudGVyQnlUeXBlW3R5cGVdKys7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZHJhZ0xlYXZlKHR5cGU6ICdhbGxEYXknIHwgJ3RpbWUnKSB7XG4gICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZVt0eXBlXS0tO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdTdGFydGVkKFxuICAgIGV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgZXZlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGRheUV2ZW50PzogV2Vla1ZpZXdUaW1lRXZlbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5kYXlDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRzQ29udGFpbmVyKTtcbiAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKFxuICAgICAgZXZlbnRzQ29udGFpbmVyLFxuICAgICAgZXZlbnRcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGVEcmFnID0gKHsgeCwgeSwgdHJhbnNmb3JtIH0pID0+XG4gICAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwICYmXG4gICAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJlxuICAgICAgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoe1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBzbmFwRHJhZ2dlZEV2ZW50czogdGhpcy5zbmFwRHJhZ2dlZEV2ZW50cyxcbiAgICAgICAgZHJhZ0FscmVhZHlNb3ZlZDogdGhpcy5kcmFnQWxyZWFkeU1vdmVkLFxuICAgICAgICB0cmFuc2Zvcm1cbiAgICAgIH0pO1xuICAgIHRoaXMuZHJhZ0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5kcmFnQWxyZWFkeU1vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZSA9IHtcbiAgICAgIGFsbERheTogMCxcbiAgICAgIHRpbWU6IDBcbiAgICB9O1xuICAgIGlmICghdGhpcy5zbmFwRHJhZ2dlZEV2ZW50cyAmJiBkYXlFdmVudCkge1xuICAgICAgdGhpcy52aWV3LmhvdXJDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgY29uc3QgbGlua2VkRXZlbnQgPSBjb2x1bW4uZXZlbnRzLmZpbmQoXG4gICAgICAgICAgY29sdW1uRXZlbnQgPT5cbiAgICAgICAgICAgIGNvbHVtbkV2ZW50LmV2ZW50ID09PSBkYXlFdmVudC5ldmVudCAmJiBjb2x1bW5FdmVudCAhPT0gZGF5RXZlbnRcbiAgICAgICAgKTtcbiAgICAgICAgLy8gaGlkZSBhbnkgbGlua2VkIGV2ZW50cyB3aGlsZSBkcmFnZ2luZ1xuICAgICAgICBpZiAobGlua2VkRXZlbnQpIHtcbiAgICAgICAgICBsaW5rZWRFdmVudC53aWR0aCA9IDA7XG4gICAgICAgICAgbGlua2VkRXZlbnQuaGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdNb3ZlKGRheUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCwgZHJhZ0V2ZW50OiBEcmFnTW92ZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgIGNvbnN0IG5ld0V2ZW50VGltZXMgPSB0aGlzLmdldERyYWdNb3ZlZEV2ZW50VGltZXMoXG4gICAgICAgIGRheUV2ZW50LFxuICAgICAgICBkcmFnRXZlbnQsXG4gICAgICAgIHRoaXMuZGF5Q29sdW1uV2lkdGgsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZGF5RXZlbnQuZXZlbnQ7XG4gICAgICBjb25zdCBhZGp1c3RlZEV2ZW50ID0geyAuLi5vcmlnaW5hbEV2ZW50LCAuLi5uZXdFdmVudFRpbWVzIH07XG4gICAgICBjb25zdCB0ZW1wRXZlbnRzID0gdGhpcy5ldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGFkanVzdGVkRXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfSk7XG4gICAgICB0aGlzLnJlc3RvcmVPcmlnaW5hbEV2ZW50cyhcbiAgICAgICAgdGVtcEV2ZW50cyxcbiAgICAgICAgbmV3IE1hcChbW2FkanVzdGVkRXZlbnQsIG9yaWdpbmFsRXZlbnRdXSlcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnREcmFnTW92ZSgpIHtcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdFbmRlZChcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudCxcbiAgICBkcmFnRW5kRXZlbnQ6IERyYWdFbmRFdmVudCxcbiAgICBkYXlXaWR0aDogbnVtYmVyLFxuICAgIHVzZVkgPSBmYWxzZVxuICApOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFdlZWtWaWV3KHRoaXMuZXZlbnRzKTtcbiAgICB0aGlzLmRyYWdBY3RpdmUgPSBmYWxzZTtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuZ2V0RHJhZ01vdmVkRXZlbnRUaW1lcyhcbiAgICAgIHdlZWtFdmVudCxcbiAgICAgIGRyYWdFbmRFdmVudCxcbiAgICAgIGRheVdpZHRoLFxuICAgICAgdXNlWVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZVt1c2VZID8gJ3RpbWUnIDogJ2FsbERheSddID4gMCAmJlxuICAgICAgaXNEcmFnZ2VkV2l0aGluUGVyaW9kKHN0YXJ0LCBlbmQsIHRoaXMudmlldy5wZXJpb2QpXG4gICAgKSB7XG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBuZXdTdGFydDogc3RhcnQsXG4gICAgICAgIG5ld0VuZDogZW5kLFxuICAgICAgICBldmVudDogd2Vla0V2ZW50LmV2ZW50LFxuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLkRyYWcsXG4gICAgICAgIGFsbERheTogIXVzZVlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGF5cyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXG4gICAgICApXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVmcmVzaEJvZHkoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVmcmVzaEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy52aWV3KSB7XG4gICAgICB0aGlzLmJlZm9yZVZpZXdSZW5kZXIuZW1pdCh7XG4gICAgICAgIGhlYWRlcjogdGhpcy5kYXlzLFxuICAgICAgICAuLi50aGlzLnZpZXdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRXZWVrVmlldyhldmVudHM6IENhbGVuZGFyRXZlbnRbXSkge1xuICAgIHJldHVybiB0aGlzLnV0aWxzLmdldFdlZWtWaWV3KHtcbiAgICAgIGV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgcHJlY2lzaW9uOiB0aGlzLnByZWNpc2lvbixcbiAgICAgIGFic29sdXRlUG9zaXRpb25lZEV2ZW50czogdHJ1ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXG4gICAgICApXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RHJhZ01vdmVkRXZlbnRUaW1lcyhcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudCxcbiAgICBkcmFnRW5kRXZlbnQ6IERyYWdFbmRFdmVudCB8IERyYWdNb3ZlRXZlbnQsXG4gICAgZGF5V2lkdGg6IG51bWJlcixcbiAgICB1c2VZOiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IGRheXNEcmFnZ2VkID0gcm91bmRUb05lYXJlc3QoZHJhZ0VuZEV2ZW50LngsIGRheVdpZHRoKSAvIGRheVdpZHRoO1xuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IHVzZVlcbiAgICAgID8gZ2V0TWludXRlc01vdmVkKFxuICAgICAgICAgIGRyYWdFbmRFdmVudC55LFxuICAgICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgICAgdGhpcy5ldmVudFNuYXBTaXplXG4gICAgICAgIClcbiAgICAgIDogMDtcblxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxuICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICB3ZWVrRXZlbnQuZXZlbnQuc3RhcnQsXG4gICAgICAgIGRheXNEcmFnZ2VkLFxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICApLFxuICAgICAgbWludXRlc01vdmVkXG4gICAgKTtcbiAgICBsZXQgZW5kOiBEYXRlO1xuICAgIGlmICh3ZWVrRXZlbnQuZXZlbnQuZW5kKSB7XG4gICAgICBlbmQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgIHdlZWtFdmVudC5ldmVudC5lbmQsXG4gICAgICAgICAgZGF5c0RyYWdnZWQsXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICApLFxuICAgICAgICBtaW51dGVzTW92ZWRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc3RvcmVPcmlnaW5hbEV2ZW50cyhcbiAgICB0ZW1wRXZlbnRzOiBDYWxlbmRhckV2ZW50W10sXG4gICAgYWRqdXN0ZWRFdmVudHM6IE1hcDxDYWxlbmRhckV2ZW50LCBDYWxlbmRhckV2ZW50PlxuICApIHtcbiAgICBjb25zdCBwcmV2aW91c1ZpZXcgPSB0aGlzLnZpZXc7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0ZW1wRXZlbnRzKTtcbiAgICBjb25zdCBhZGp1c3RlZEV2ZW50c0FycmF5ID0gdGVtcEV2ZW50cy5maWx0ZXIoZXZlbnQgPT5cbiAgICAgIGFkanVzdGVkRXZlbnRzLmhhcyhldmVudClcbiAgICApO1xuICAgIHRoaXMudmlldy5ob3VyQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICBwcmV2aW91c1ZpZXcuaG91ckNvbHVtbnNbY29sdW1uSW5kZXhdLmhvdXJzLmZvckVhY2goKGhvdXIsIGhvdXJJbmRleCkgPT4ge1xuICAgICAgICBob3VyLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIHNlZ21lbnRJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbHVtbi5ob3Vyc1tob3VySW5kZXhdLnNlZ21lbnRzW3NlZ21lbnRJbmRleF0uY3NzQ2xhc3MgPVxuICAgICAgICAgICAgc2VnbWVudC5jc3NDbGFzcztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGFkanVzdGVkRXZlbnRzQXJyYXkuZm9yRWFjaChhZGp1c3RlZEV2ZW50ID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGFkanVzdGVkRXZlbnRzLmdldChhZGp1c3RlZEV2ZW50KTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdDb2x1bW5FdmVudCA9IGNvbHVtbi5ldmVudHMuZmluZChcbiAgICAgICAgICBjb2x1bW5FdmVudCA9PiBjb2x1bW5FdmVudC5ldmVudCA9PT0gYWRqdXN0ZWRFdmVudFxuICAgICAgICApO1xuICAgICAgICBpZiAoZXhpc3RpbmdDb2x1bW5FdmVudCkge1xuICAgICAgICAgIC8vIHJlc3RvcmUgdGhlIG9yaWdpbmFsIGV2ZW50IHNvIHRyYWNrQnkga2lja3MgaW4gYW5kIHRoZSBkb20gaXNuJ3QgY2hhbmdlZFxuICAgICAgICAgIGV4aXN0aW5nQ29sdW1uRXZlbnQuZXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFkZCBhIGR1bW15IGV2ZW50IHRvIHRoZSBkcm9wIHNvIGlmIHRoZSBldmVudCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBvcmlnaW5hbCBjb2x1bW4gdGhlIGRyYWcgZG9lc24ndCBlbmQgZWFybHlcbiAgICAgICAgICBjb2x1bW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgZXZlbnQ6IG9yaWdpbmFsRXZlbnQsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBzdGFydHNCZWZvcmVEYXk6IGZhbHNlLFxuICAgICAgICAgICAgZW5kc0FmdGVyRGF5OiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBhZGp1c3RlZEV2ZW50cy5jbGVhcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcbiAgICBjYWxlbmRhckV2ZW50OiBDYWxlbmRhckV2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudFxuICApIHtcbiAgICBjb25zdCBtaW5pbXVtRXZlbnRIZWlnaHQgPSBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXMoXG4gICAgICB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHRcbiAgICApO1xuICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB7XG4gICAgICBzdGFydDogY2FsZW5kYXJFdmVudC5zdGFydCxcbiAgICAgIGVuZDogZ2V0RGVmYXVsdEV2ZW50RW5kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICBjYWxlbmRhckV2ZW50LFxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHRcbiAgICAgIClcbiAgICB9O1xuICAgIGNvbnN0IHsgZW5kLCAuLi5ldmVudFdpdGhvdXRFbmQgfSA9IGNhbGVuZGFyRXZlbnQ7XG4gICAgY29uc3Qgc21hbGxlc3RSZXNpemVzID0ge1xuICAgICAgc3RhcnQ6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXG4gICAgICAgIG1pbmltdW1FdmVudEhlaWdodCAqIC0xXG4gICAgICApLFxuICAgICAgZW5kOiBnZXREZWZhdWx0RXZlbnRFbmQoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIGV2ZW50V2l0aG91dEVuZCxcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0XG4gICAgICApXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGRheXNEaWZmID0gTWF0aC5yb3VuZChcbiAgICAgICAgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyB0aGlzLmRheUNvbHVtbldpZHRoXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQsXG4gICAgICAgIGRheXNEaWZmLFxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICApO1xuICAgICAgaWYgKG5ld1N0YXJ0IDwgc21hbGxlc3RSZXNpemVzLnN0YXJ0KSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBuZXdTdGFydDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBzbWFsbGVzdFJlc2l6ZXMuc3RhcnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBkYXlzRGlmZiA9IE1hdGgucm91bmQoXG4gICAgICAgICtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIHRoaXMuZGF5Q29sdW1uV2lkdGhcbiAgICAgICk7XG4gICAgICBjb25zdCBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kLFxuICAgICAgICBkYXlzRGlmZixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgKTtcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gbmV3RW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgbWludXRlc01vdmVkID0gZ2V0TWludXRlc01vdmVkKFxuICAgICAgICByZXNpemVFdmVudC5lZGdlcy50b3AgYXMgbnVtYmVyLFxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudEhlaWdodCxcbiAgICAgICAgdGhpcy5ldmVudFNuYXBTaXplXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3U3RhcnQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQsXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICAgIGlmIChuZXdTdGFydCA8IHNtYWxsZXN0UmVzaXplcy5zdGFydCkge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gc21hbGxlc3RSZXNpemVzLnN0YXJ0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tIGFzIG51bWJlcixcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gbmV3RW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdFdmVudERhdGVzO1xuICB9XG59XG5cbi8vIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4iXX0=