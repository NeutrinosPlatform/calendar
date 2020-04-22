import { __decorate, __param, __rest } from 'tslib';
import { EventEmitter, Output, Input, Component, ElementRef, Injector, Renderer2, ComponentFactoryResolver, ViewContainerRef, Inject, HostListener, Directive, Injectable, ɵɵdefineInjectable, ɵɵinject, LOCALE_ID, Pipe, InjectionToken, NgModule, ChangeDetectorRef, NgZone, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT, formatDate, I18nPluralPipe, CommonModule } from '@angular/common';
import { positionElements } from 'positioning';
import { Subject, of, timer, Observable, BehaviorSubject, interval } from 'rxjs';
import { takeUntil, switchMap, startWith, switchMapTo, map } from 'rxjs/operators';
import { validateEvents as validateEvents$1, getMonthView, getWeekViewHeader, getWeekView } from 'calendar-utils';
export { DAYS_OF_WEEK } from 'calendar-utils';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ResizableModule } from 'angular-resizable-element';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import format from 'date-fns/format';
import { round } from '@qc/date-round';
import { MatIconModule as MatIconModule$1, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { adapterFactory as adapterFactory$1 } from 'calendar-utils/date-adapters/date-fns';
import { addWeeks, addMonths, subDays, subWeeks, subMonths, getISOWeek, setDate, setMonth, setYear, getDate, getYear } from 'date-fns';

class EventEmitterService {
    constructor() {
        this.eventChange = new EventEmitter();
    }
    emitNavChangeEvent(value, event) {
        this.eventChange.emit({ value, event });
    }
    getNavChangeEmitter() {
        return this.eventChange;
    }
}
__decorate([
    Output()
], EventEmitterService.prototype, "eventChange", void 0);

let CalendarEventActionsComponent = class CalendarEventActionsComponent {
    constructor(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.trackByActionId = (index, action) => action.id ? action.id : action;
    }
    onEventClick(event, action) {
        if (action === 'EDIT') {
            this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
        }
        else if (action === 'DELETE') {
            this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', event);
        }
    }
};
CalendarEventActionsComponent.ctorParameters = () => [
    { type: EventEmitterService }
];
__decorate([
    Input()
], CalendarEventActionsComponent.prototype, "event", void 0);
__decorate([
    Input()
], CalendarEventActionsComponent.prototype, "customTemplate", void 0);
CalendarEventActionsComponent = __decorate([
    Component({
        selector: 'mwl-calendar-event-actions',
        template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-trackByActionId="trackByActionId"
    >
      <span *ngIf="event.actions" class="cal-event-actions">
        <span
          class="cal-event-action material-icons"
          href="javascript:;"
          *ngFor="let action of event.actions; trackBy: trackByActionId"
          (mwlClick)="action.onClick({ event: event, sourceEvent: $event }); onEventClick(event, action.a11yLabel) "
          (mwlKeydownEnter)="
            action.onClick({ event: event, sourceEvent: $event })
          "
          [ngClass]="action.cssClass"
          tabindex="0"
          role="button"
          [attr.aria-label]="
            { action: action } | calendarA11y: 'actionButtonLabel'
          "
        >
        {{action.label}}
        </span>
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        trackByActionId: trackByActionId
      }"
    >
    </ng-template>
  `
    })
], CalendarEventActionsComponent);

let CalendarEventTitleComponent = class CalendarEventTitleComponent {
    ngOnInit() {
    }
};
__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "event", void 0);
__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "customTemplate", void 0);
__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "view", void 0);
CalendarEventTitleComponent = __decorate([
    Component({
        selector: 'mwl-calendar-event-title',
        template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="event-title"
        [innerHTML]="event.title | calendarEventTitle: view:event"
        [attr.aria-hidden]="{} | calendarA11y: 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }"
    >
    </ng-template>
  `
    })
], CalendarEventTitleComponent);

let CalendarTooltipWindowComponent = class CalendarTooltipWindowComponent {
};
__decorate([
    Input()
], CalendarTooltipWindowComponent.prototype, "contents", void 0);
__decorate([
    Input()
], CalendarTooltipWindowComponent.prototype, "placement", void 0);
__decorate([
    Input()
], CalendarTooltipWindowComponent.prototype, "event", void 0);
__decorate([
    Input()
], CalendarTooltipWindowComponent.prototype, "customTemplate", void 0);
CalendarTooltipWindowComponent = __decorate([
    Component({
        selector: 'mwl-calendar-tooltip-window',
        template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event"
    >
      <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
        <div class="cal-tooltip-arrow"></div>
        <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        contents: contents,
        placement: placement,
        event: event
      }"
    >
    </ng-template>
  `
    })
], CalendarTooltipWindowComponent);
let CalendarTooltipDirective = class CalendarTooltipDirective {
    constructor(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        this.placement = 'auto'; // tslint:disable-line no-input-rename
        this.delay = null; // tslint:disable-line no-input-rename
        this.cancelTooltipDelay$ = new Subject();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    ngOnChanges(changes) {
        if (this.tooltipRef &&
            (changes.contents || changes.customTemplate || changes.event)) {
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            this.tooltipRef.changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this.hide();
    }
    onMouseOver() {
        const delay$ = this.delay === null ? of('now') : timer(this.delay);
        delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe(() => {
            this.show();
        });
    }
    onMouseOut() {
        this.hide();
    }
    show() {
        if (!this.tooltipRef && this.contents && this.appendToBody) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame(() => {
                this.positionTooltip();
            });
        }
    }
    hide() {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
        this.cancelTooltipDelay$.next();
    }
    positionTooltip(previousPositions = []) {
        if (this.tooltipRef) {
            this.tooltipRef.changeDetectorRef.detectChanges();
            this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            // keep re-positioning the tooltip until the arrow position doesn't make a difference
            if (previousPositions.indexOf(this.tooltipRef.instance.placement) === -1) {
                this.positionTooltip([
                    ...previousPositions,
                    this.tooltipRef.instance.placement
                ]);
            }
        }
    }
};
CalendarTooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
__decorate([
    Input('mwlCalendarTooltip')
], CalendarTooltipDirective.prototype, "contents", void 0);
__decorate([
    Input('tooltipPlacement')
], CalendarTooltipDirective.prototype, "placement", void 0);
__decorate([
    Input('tooltipTemplate')
], CalendarTooltipDirective.prototype, "customTemplate", void 0);
__decorate([
    Input('tooltipEvent')
], CalendarTooltipDirective.prototype, "event", void 0);
__decorate([
    Input('tooltipAppendToBody')
], CalendarTooltipDirective.prototype, "appendToBody", void 0);
__decorate([
    Input('tooltipDelay')
], CalendarTooltipDirective.prototype, "delay", void 0);
__decorate([
    HostListener('mouseenter')
], CalendarTooltipDirective.prototype, "onMouseOver", null);
__decorate([
    HostListener('mouseleave')
], CalendarTooltipDirective.prototype, "onMouseOut", null);
CalendarTooltipDirective = __decorate([
    Directive({
        selector: '[mwlCalendarTooltip]'
    }),
    __param(5, Inject(DOCUMENT))
], CalendarTooltipDirective);

class DateAdapter {
}

var CalendarView;
(function (CalendarView) {
    CalendarView["Month"] = "month";
    CalendarView["Week"] = "week";
    CalendarView["Day"] = "day";
})(CalendarView || (CalendarView = {}));

const validateEvents = (events) => {
    const warn = (...args) => console.warn('angular-calendar', ...args);
    return validateEvents$1(events, warn);
};
function isInside(outer, inner) {
    return (Math.floor(outer.left) <= Math.ceil(inner.left) &&
        Math.floor(inner.left) <= Math.ceil(outer.right) &&
        Math.floor(outer.left) <= Math.ceil(inner.right) &&
        Math.floor(inner.right) <= Math.ceil(outer.right) &&
        Math.floor(outer.top) <= Math.ceil(inner.top) &&
        Math.floor(inner.top) <= Math.ceil(outer.bottom) &&
        Math.floor(outer.top) <= Math.ceil(inner.bottom) &&
        Math.floor(inner.bottom) <= Math.ceil(outer.bottom));
}
function roundToNearest(amount, precision) {
    return Math.round(amount / precision) * precision;
}
const trackByEventId = (index, event) => event.id ? event.id : event;
const trackByWeekDayHeaderDate = (index, day) => day.date.toISOString();
const trackByHourSegment = (index, segment) => segment.date.toISOString();
const trackByHour = (index, hour) => hour.segments[0].date.toISOString();
const trackByWeekAllDayEvent = (index, weekEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
const trackByWeekTimeEvent = (index, weekEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
const MINUTES_IN_HOUR = 60;
function getPixelAmountInMinutes(hourSegments, hourSegmentHeight) {
    return MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight);
}
function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize) {
    const draggedInPixelsSnapSize = roundToNearest(movedY, eventSnapSize || hourSegmentHeight);
    const pixelAmountInMinutes = getPixelAmountInMinutes(hourSegments, hourSegmentHeight);
    return draggedInPixelsSnapSize * pixelAmountInMinutes;
}
function getMinimumEventHeightInMinutes(hourSegments, hourSegmentHeight) {
    return (getPixelAmountInMinutes(hourSegments, hourSegmentHeight) * hourSegmentHeight);
}
function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
    if (event.end) {
        return event.end;
    }
    else {
        return dateAdapter.addMinutes(event.start, minimumMinutes);
    }
}
function addDaysWithExclusions(dateAdapter, date, days, excluded) {
    let daysCounter = 0;
    let daysToAdd = 0;
    const changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
    let result = date;
    while (daysToAdd <= Math.abs(days)) {
        result = changeDays(date, daysCounter);
        const day = dateAdapter.getDay(result);
        if (excluded.indexOf(day) === -1) {
            daysToAdd++;
        }
        daysCounter++;
    }
    return result;
}
function isDraggedWithinPeriod(newStart, newEnd, period) {
    const end = newEnd || newStart;
    return ((period.start <= newStart && newStart <= period.end) ||
        (period.start <= end && end <= period.end));
}
function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
    return (dropEvent.dropData &&
        dropEvent.dropData.event &&
        (dropEvent.dropData.calendarId !== calendarId ||
            (dropEvent.dropData.event.allDay && !allDay) ||
            (!dropEvent.dropData.event.allDay && allDay)));
}
function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded = [], daysInWeek) {
    let viewStart = daysInWeek
        ? dateAdapter.startOfDay(viewDate)
        : dateAdapter.startOfWeek(viewDate, { weekStartsOn });
    const endOfWeek = dateAdapter.endOfWeek(viewDate, { weekStartsOn });
    while (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1 &&
        viewStart < endOfWeek) {
        viewStart = dateAdapter.addDays(viewStart, 1);
    }
    if (daysInWeek) {
        const viewEnd = dateAdapter.endOfDay(addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded));
        return { viewStart, viewEnd };
    }
    else {
        let viewEnd = endOfWeek;
        while (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1 &&
            viewEnd > viewStart) {
            viewEnd = dateAdapter.subDays(viewEnd, 1);
        }
        return { viewStart, viewEnd };
    }
}
function isWithinThreshold({ x, y }) {
    const DRAG_THRESHOLD = 1;
    return Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
}

/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
let CalendarPreviousViewDirective = class CalendarPreviousViewDirective {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going back by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.viewChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    onClick() {
        this.viewChange.emit();
        const subFn = {
            day: this.dateAdapter.subDays,
            week: this.dateAdapter.subWeeks,
            month: this.dateAdapter.subMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(subFn(this.viewDate, 1));
        }
    }
};
CalendarPreviousViewDirective.ctorParameters = () => [
    { type: DateAdapter }
];
__decorate([
    Input()
], CalendarPreviousViewDirective.prototype, "view", void 0);
__decorate([
    Input()
], CalendarPreviousViewDirective.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarPreviousViewDirective.prototype, "excludeDays", void 0);
__decorate([
    Input()
], CalendarPreviousViewDirective.prototype, "daysInWeek", void 0);
__decorate([
    Output()
], CalendarPreviousViewDirective.prototype, "viewDateChange", void 0);
__decorate([
    Output()
], CalendarPreviousViewDirective.prototype, "viewChange", void 0);
__decorate([
    HostListener('click')
], CalendarPreviousViewDirective.prototype, "onClick", null);
CalendarPreviousViewDirective = __decorate([
    Directive({
        selector: '[mwlCalendarPreviousView]'
    })
], CalendarPreviousViewDirective);

/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
let CalendarNextViewDirective = class CalendarNextViewDirective {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going forward by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.viewChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    onClick() {
        this.viewChange.emit();
        const addFn = {
            day: this.dateAdapter.addDays,
            week: this.dateAdapter.addWeeks,
            month: this.dateAdapter.addMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(addFn(this.viewDate, 1));
        }
    }
};
CalendarNextViewDirective.ctorParameters = () => [
    { type: DateAdapter }
];
__decorate([
    Input()
], CalendarNextViewDirective.prototype, "view", void 0);
__decorate([
    Input()
], CalendarNextViewDirective.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarNextViewDirective.prototype, "excludeDays", void 0);
__decorate([
    Input()
], CalendarNextViewDirective.prototype, "daysInWeek", void 0);
__decorate([
    Output()
], CalendarNextViewDirective.prototype, "viewDateChange", void 0);
__decorate([
    Output()
], CalendarNextViewDirective.prototype, "viewChange", void 0);
__decorate([
    HostListener('click')
], CalendarNextViewDirective.prototype, "onClick", null);
CalendarNextViewDirective = __decorate([
    Directive({
        selector: '[mwlCalendarNextView]'
    })
], CalendarNextViewDirective);

/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
 * ```
 */
let CalendarTodayDirective = class CalendarTodayDirective {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    onClick() {
        this.viewDateChange.emit(this.dateAdapter.startOfDay(new Date()));
    }
};
CalendarTodayDirective.ctorParameters = () => [
    { type: DateAdapter }
];
__decorate([
    Input()
], CalendarTodayDirective.prototype, "viewDate", void 0);
__decorate([
    Output()
], CalendarTodayDirective.prototype, "viewDateChange", void 0);
__decorate([
    HostListener('click')
], CalendarTodayDirective.prototype, "onClick", null);
CalendarTodayDirective = __decorate([
    Directive({
        selector: '[mwlCalendarToday]'
    })
], CalendarTodayDirective);

/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
let CalendarAngularDateFormatter = class CalendarAngularDateFormatter {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({ date, locale }) {
        return formatDate(date, 'EEE', locale);
    }
    /**
     * The month view cell day number
     */
    monthViewDayNumber({ date, locale }) {
        return formatDate(date, 'd', locale);
    }
    /**
     * The month view title
     */
    monthViewTitle({ date, locale }) {
        return formatDate(date, 'LLLL y', locale);
    }
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({ date, locale }) {
        return formatDate(date, 'EEE', locale);
    }
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({ date, locale }) {
        return formatDate(date, 'MMM d', locale);
    }
    /**
     * The week view title
     */
    weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek }) {
        const { viewStart, viewEnd } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
        const format = (dateToFormat, showYear) => formatDate(dateToFormat, 'MMM d' + (showYear ? ', yyyy' : ''), locale);
        return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
    }
    /**
     * The time formatting down the left hand side of the week view
     */
    weekViewHour({ date, locale }) {
        return formatDate(date, 'h a', locale);
    }
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({ date, locale }) {
        return formatDate(date, 'h a', locale);
    }
    /**
     * The day view title
     */
    dayViewTitle({ date, locale }) {
        return formatDate(date, 'EEEE, MMMM d, y', locale);
    }
};
CalendarAngularDateFormatter.ctorParameters = () => [
    { type: DateAdapter }
];
CalendarAngularDateFormatter = __decorate([
    Injectable()
], CalendarAngularDateFormatter);

/**
 * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
 *
 * If you wish, you may override any of the defaults via angulars DI. For example:
 *
 * ```typescript
 * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
 * import { formatDate } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * @Injectable()
 * class CustomDateFormatter extends CalendarDateFormatter {
 *
 *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
 *     return formatDate(date, 'EEE', locale); // use short week days
 *   }
 *
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *   provide: CalendarDateFormatter,
 *   useClass: CustomDateFormatter
 * }]
 * ```
 */
let CalendarDateFormatter = class CalendarDateFormatter extends CalendarAngularDateFormatter {
};
CalendarDateFormatter.ngInjectableDef = ɵɵdefineInjectable({ factory: function CalendarDateFormatter_Factory() { return new CalendarDateFormatter(ɵɵinject(DateAdapter)); }, token: CalendarDateFormatter, providedIn: "root" });
CalendarDateFormatter = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CalendarDateFormatter);

/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
let CalendarDatePipe = class CalendarDatePipe {
    constructor(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    transform(date, method, locale = this.locale, weekStartsOn = 0, excludeDays = [], daysInWeek) {
        if (typeof this.dateFormatter[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarDateFormatter.prototype)).filter(iMethod => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid date formatter. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.dateFormatter[method]({
            date,
            locale,
            weekStartsOn,
            excludeDays,
            daysInWeek
        });
    }
};
CalendarDatePipe.ctorParameters = () => [
    { type: CalendarDateFormatter },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarDatePipe = __decorate([
    Pipe({
        name: 'calendarDate'
    }),
    __param(1, Inject(LOCALE_ID))
], CalendarDatePipe);

/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * @Injectable()
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
let CalendarEventTitleFormatter = class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     */
    month(event, title) {
        return event.title;
    }
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    monthTooltip(event, title) {
        return event.title;
    }
    /**
     * The week view event title.
     */
    week(event, title) {
        return event.title;
    }
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    weekTooltip(event, title) {
        return event.title;
    }
    /**
     * The day view event title.
     */
    day(event, title) {
        return event.title;
    }
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    dayTooltip(event, title) {
        return event.title;
    }
};
CalendarEventTitleFormatter.ngInjectableDef = ɵɵdefineInjectable({ factory: function CalendarEventTitleFormatter_Factory() { return new CalendarEventTitleFormatter(); }, token: CalendarEventTitleFormatter, providedIn: "root" });
CalendarEventTitleFormatter = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CalendarEventTitleFormatter);

let CalendarEventTitlePipe = class CalendarEventTitlePipe {
    constructor(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    transform(title, titleType, event) {
        return this.calendarEventTitle[titleType](event, title);
    }
};
CalendarEventTitlePipe.ctorParameters = () => [
    { type: CalendarEventTitleFormatter }
];
CalendarEventTitlePipe = __decorate([
    Pipe({
        name: 'calendarEventTitle'
    })
], CalendarEventTitlePipe);

let ClickDirective = class ClickDirective {
    constructor(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.clickListenerDisabled = false;
        this.click = new EventEmitter(); // tslint:disable-line
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (!this.clickListenerDisabled) {
            this.listen()
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.stopPropagation();
                this.click.emit(event);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    listen() {
        return new Observable(observer => {
            return this.renderer.listen(this.elm.nativeElement, 'click', event => {
                observer.next(event);
            });
        });
    }
};
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
__decorate([
    Input()
], ClickDirective.prototype, "clickListenerDisabled", void 0);
__decorate([
    Output('mwlClick')
], ClickDirective.prototype, "click", void 0);
ClickDirective = __decorate([
    Directive({
        selector: '[mwlClick]'
    }),
    __param(2, Inject(DOCUMENT))
], ClickDirective);

let KeydownEnterDirective = class KeydownEnterDirective {
    constructor() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    onKeyPress(event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
        }
    }
};
__decorate([
    Output('mwlKeydownEnter')
], KeydownEnterDirective.prototype, "keydown", void 0);
__decorate([
    HostListener('keydown', ['$event'])
], KeydownEnterDirective.prototype, "onKeyPress", null);
KeydownEnterDirective = __decorate([
    Directive({
        selector: '[mwlKeydownEnter]'
    })
], KeydownEnterDirective);

let CalendarUtils = class CalendarUtils {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    getMonthView(args) {
        return getMonthView(this.dateAdapter, args);
    }
    getWeekViewHeader(args) {
        return getWeekViewHeader(this.dateAdapter, args);
    }
    getWeekView(args) {
        return getWeekView(this.dateAdapter, args);
    }
};
CalendarUtils.ctorParameters = () => [
    { type: DateAdapter }
];
CalendarUtils = __decorate([
    Injectable()
], CalendarUtils);

/**
 * This class is responsible for adding accessibility to the calendar.
 * You may override any of its methods via angulars DI to suit your requirements.
 * For example:
 *
 * ```typescript
 * import { A11yParams, CalendarA11y } from 'angular-calendar';
 * import { formatDate, I18nPluralPipe } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * // adding your own a11y params
 * export interface CustomA11yParams extends A11yParams {
 *   isDrSuess?: boolean;
 * }
 *
 * @Injectable()
 * export class CustomCalendarA11y extends CalendarA11y {
 *   constructor(protected i18nPlural: I18nPluralPipe) {
 *     super(i18nPlural);
 *   }
 *
 *   // overriding a function
 *   public openDayEventsLandmark({ date, locale, isDrSuess }: CustomA11yParams): string {
 *     if (isDrSuess) {
 *       return `
 *         ${formatDate(date, 'EEEE MMMM d', locale)}
 *          Today you are you! That is truer than true! There is no one alive
 *          who is you-er than you!
 *       `;
 *     }
 *   }
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *  provide: CalendarA11y,
 *  useClass: CustomCalendarA11y
 * }]
 * ```
 */
let CalendarA11y = class CalendarA11y {
    constructor(i18nPlural) {
        this.i18nPlural = i18nPlural;
    }
    /**
     * Aria label for the badges/date of a cell
     * @example: `Saturday October 19 1 event click to expand`
     */
    monthCell({ day, locale }) {
        if (day.badgeTotal > 0) {
            return `
        ${formatDate(day.date, 'EEEE MMMM d', locale)},
        ${this.i18nPlural.transform(day.badgeTotal, {
                '=0': 'No events',
                '=1': 'One event',
                other: '# events'
            })},
         click to expand
      `;
        }
        else {
            return `${formatDate(day.date, 'EEEE MMMM d', locale)}`;
        }
    }
    /**
     * Aria label for the open day events start landmark
     * @example: `Saturday October 19 expanded view`
     */
    openDayEventsLandmark({ date, locale }) {
        return `
      Beginning of expanded view for ${formatDate(date, 'EEEE MMMM dd', locale)}
    `;
    }
    /**
     * Aria label for alert that a day in the month view was expanded
     * @example: `Saturday October 19 expanded`
     */
    openDayEventsAlert({ date, locale }) {
        return `${formatDate(date, 'EEEE MMMM dd', locale)} expanded`;
    }
    /**
     * Descriptive aria label for an event
     * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
     */
    eventDescription({ event, locale }) {
        if (event.allDay === true) {
            return this.allDayEventDescription({ event, locale });
        }
        const aria = `
      ${formatDate(event.start, 'EEEE MMMM dd', locale)},
      ${event.title}, from ${formatDate(event.start, 'hh:mm a', locale)}
    `;
        if (event.end) {
            return aria + ` to ${formatDate(event.end, 'hh:mm a', locale)}`;
        }
        return aria;
    }
    /**
     * Descriptive aria label for an all day event
     * @example:
     * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
     */
    allDayEventDescription({ event, locale }) {
        const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, 'MMMM dd hh:mm a', locale)}
    `;
        if (event.end) {
            return (aria + `, stop time ${formatDate(event.end, 'MMMM d hh:mm a', locale)}`);
        }
        return aria + `, no stop time`;
    }
    /**
     * Aria label for the calendar event actions icons
     * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
     */
    actionButtonLabel({ action }) {
        return action.a11yLabel;
    }
    /**
     * @returns {number} Tab index to be given to month cells
     */
    monthCellTabIndex() {
        return 0;
    }
    /**
     * @returns true if the events inside the month cell should be aria-hidden
     */
    hideMonthCellEvents() {
        return true;
    }
    /**
     * @returns true if event titles should be aria-hidden (global)
     */
    hideEventTitle() {
        return true;
    }
    /**
     * @returns true if hour segments in the week view should be aria-hidden
     */
    hideWeekHourSegment() {
        return true;
    }
    /**
     * @returns true if hour segments in the day view should be aria-hidden
     */
    hideDayHourSegment() {
        return true;
    }
};
CalendarA11y.ctorParameters = () => [
    { type: I18nPluralPipe }
];
CalendarA11y.ngInjectableDef = ɵɵdefineInjectable({ factory: function CalendarA11y_Factory() { return new CalendarA11y(ɵɵinject(I18nPluralPipe)); }, token: CalendarA11y, providedIn: "root" });
CalendarA11y = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CalendarA11y);

/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
let CalendarA11yPipe = class CalendarA11yPipe {
    constructor(calendarA11y, locale) {
        this.calendarA11y = calendarA11y;
        this.locale = locale;
    }
    transform(a11yParams, method) {
        a11yParams.locale = a11yParams.locale || this.locale;
        if (typeof this.calendarA11y[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarA11y.prototype)).filter(iMethod => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid a11y method. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.calendarA11y[method](a11yParams);
    }
};
CalendarA11yPipe.ctorParameters = () => [
    { type: CalendarA11y },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarA11yPipe = __decorate([
    Pipe({
        name: 'calendarA11y'
    }),
    __param(1, Inject(LOCALE_ID))
], CalendarA11yPipe);

const MOMENT = new InjectionToken('Moment');
/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
let CalendarMomentDateFormatter = class CalendarMomentDateFormatter {
    /**
     * @hidden
     */
    constructor(moment, dateAdapter) {
        this.moment = moment;
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    }
    /**
     * The month view cell day number
     */
    monthViewDayNumber({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('D');
    }
    /**
     * The month view title
     */
    monthViewTitle({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('MMMM YYYY');
    }
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    }
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('MMM D');
    }
    /**
     * The week view title
     */
    weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek }) {
        const { viewStart, viewEnd } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
        const format = (dateToFormat, showYear) => this.moment(dateToFormat)
            .locale(locale)
            .format('MMM D' + (showYear ? ', YYYY' : ''));
        return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
    }
    /**
     * The time formatting down the left hand side of the week view
     */
    weekViewHour({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('ha');
    }
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('ha');
    }
    /**
     * The day view title
     */
    dayViewTitle({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd, D MMMM, YYYY');
    }
};
CalendarMomentDateFormatter.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [MOMENT,] }] },
    { type: DateAdapter }
];
CalendarMomentDateFormatter = __decorate([
    Injectable(),
    __param(0, Inject(MOMENT))
], CalendarMomentDateFormatter);

/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
let CalendarNativeDateFormatter = class CalendarNativeDateFormatter {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The month view cell day number
     */
    monthViewDayNumber({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
    }
    /**
     * The month view title
     */
    monthViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short'
        }).format(date);
    }
    /**
     * The week view title
     */
    weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek }) {
        const { viewStart, viewEnd } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
        const format = (dateToFormat, showYear) => new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: showYear ? 'numeric' : undefined
        }).format(dateToFormat);
        return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
    }
    /**
     * The time formatting down the left hand side of the week view
     */
    weekViewHour({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    }
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    }
    /**
     * The day view title
     */
    dayViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }).format(date);
    }
};
CalendarNativeDateFormatter.ctorParameters = () => [
    { type: DateAdapter }
];
CalendarNativeDateFormatter = __decorate([
    Injectable()
], CalendarNativeDateFormatter);

var CalendarEventTimesChangedEventType;
(function (CalendarEventTimesChangedEventType) {
    CalendarEventTimesChangedEventType["Drag"] = "drag";
    CalendarEventTimesChangedEventType["Drop"] = "drop";
    CalendarEventTimesChangedEventType["Resize"] = "resize";
})(CalendarEventTimesChangedEventType || (CalendarEventTimesChangedEventType = {}));

var CalendarCommonModule_1;
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
let CalendarCommonModule = CalendarCommonModule_1 = class CalendarCommonModule {
    static forRoot(dateAdapter, config = {}) {
        return {
            ngModule: CalendarCommonModule_1,
            providers: [
                dateAdapter,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils,
                config.a11y || CalendarA11y
            ]
        };
    }
};
CalendarCommonModule = CalendarCommonModule_1 = __decorate([
    NgModule({
        declarations: [
            CalendarEventActionsComponent,
            CalendarEventTitleComponent,
            CalendarTooltipWindowComponent,
            CalendarTooltipDirective,
            CalendarPreviousViewDirective,
            CalendarNextViewDirective,
            CalendarTodayDirective,
            CalendarDatePipe,
            CalendarEventTitlePipe,
            CalendarA11yPipe,
            ClickDirective,
            KeydownEnterDirective
        ],
        imports: [CommonModule],
        exports: [
            CalendarEventActionsComponent,
            CalendarEventTitleComponent,
            CalendarTooltipWindowComponent,
            CalendarTooltipDirective,
            CalendarPreviousViewDirective,
            CalendarNextViewDirective,
            CalendarTodayDirective,
            CalendarDatePipe,
            CalendarEventTitlePipe,
            CalendarA11yPipe,
            ClickDirective,
            KeydownEnterDirective
        ],
        providers: [I18nPluralPipe, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarUtils, CalendarA11y],
        entryComponents: [CalendarTooltipWindowComponent]
    })
], CalendarCommonModule);

/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
let CalendarMonthViewComponent = class CalendarMonthViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view.
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
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
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when a header week day is clicked. Returns ISO day number.
         */
        this.columnHeaderClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.trackByRowOffset = (index, offset) => this.view.days
            .slice(offset, this.view.totalDaysVisibleInWeek)
            .map(day => day.date.toISOString())
            .join('-');
        /**
         * @hidden
         */
        this.trackByDate = (index, day) => day.date.toISOString();
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
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
        const refreshBody = changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.weekendDays;
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
        if (changes.activeDayIsOpen ||
            changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.activeDay) {
            this.checkActiveDayIsOpen();
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
    /**
     * @hidden
     */
    toggleDayHighlight(event, isHighlighted) {
        this.view.days.forEach(day => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    }
    /**
     * @hidden
     */
    eventDropped(droppedOn, event, draggedFrom) {
        if (droppedOn !== draggedFrom) {
            const year = this.dateAdapter.getYear(droppedOn.date);
            const month = this.dateAdapter.getMonth(droppedOn.date);
            const date = this.dateAdapter.getDate(droppedOn.date);
            const newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
            let newEnd;
            if (event.end) {
                const secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
            }
            this.eventTimesChanged.emit({
                event,
                newStart,
                newEnd,
                day: droppedOn,
                type: CalendarEventTimesChangedEventType.Drop
            });
        }
    }
    refreshHeader() {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    refreshBody() {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    checkActiveDayIsOpen() {
        if (this.activeDayIsOpen === true) {
            const activeDay = this.activeDay || this.viewDate;
            this.openDay = this.view.days.find(day => this.dateAdapter.isSameDay(day.date, activeDay));
            const index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
        this.checkActiveDayIsOpen();
    }
    emitBeforeViewRender() {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period
            });
        }
    }
};
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "events", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "excludeDays", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "activeDay", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "refresh", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "headerTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "cellTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "openDayEventsTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input()
], CalendarMonthViewComponent.prototype, "weekendDays", void 0);
__decorate([
    Output()
], CalendarMonthViewComponent.prototype, "beforeViewRender", void 0);
__decorate([
    Output()
], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
__decorate([
    Output()
], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output()
], CalendarMonthViewComponent.prototype, "columnHeaderClicked", void 0);
__decorate([
    Output()
], CalendarMonthViewComponent.prototype, "eventTimesChanged", void 0);
CalendarMonthViewComponent = __decorate([
    Component({
        selector: 'mwl-calendar-month-view',
        template: `
    <div class="cal-month-view" role="grid">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
        class="headerView"
      >
      </mwl-calendar-month-view-header>
      <div class="cal-days">
        <div
        id="cal-cell-day"
          *ngFor="let rowIndex of view.rowOffsets; trackBy: trackByRowOffset"
        >
          <div class="cal-cell-row">
            <mwl-calendar-month-cell

              *ngFor="
                let day of view.days
                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek;
                trackBy: trackByDate
              "
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="cellTemplate"
              [ngStyle]="{ backgroundColor: day.backgroundColor }"
              (mwlClick)="dayClicked.emit({ day: day, sourceEvent: $event })"
              [clickListenerDisabled]="dayClicked.observers.length === 0"
              (mwlKeydownEnter)="
                dayClicked.emit({ day: day, sourceEvent: $event })
              "
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  day,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
              (eventClicked)="
                eventClicked.emit({
                  event: $event.event,
                  sourceEvent: $event.sourceEvent
                })
              "
              [attr.tabindex]="{} | calendarA11y: 'monthCellTabIndex'"
            >
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [locale]="locale"
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [date]="openDay?.date"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="
              eventClicked.emit({
                event: $event.event,
                sourceEvent: $event.sourceEvent
              })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped(
                openDay,
                $event.dropData.event,
                $event.dropData.draggedFrom
              )
            "
          >
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `,
        styles: [".calendar-count{background:#000;color:#fff;padding:6px;border-radius:50%;width:15px;height:15px;font-size:12px;font-weight:700;margin-right:2px!important}.calendar-title-container{display:-webkit-box;display:flex}@media (max-width:767px){.calendar-title-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}.cal-event{height:100%!important}}"]
    }),
    __param(2, Inject(LOCALE_ID))
], CalendarMonthViewComponent);

let CalendarMonthViewHeaderComponent = class CalendarMonthViewHeaderComponent {
    constructor() {
        this.columnHeaderClicked = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
};
__decorate([
    Input()
], CalendarMonthViewHeaderComponent.prototype, "days", void 0);
__decorate([
    Input()
], CalendarMonthViewHeaderComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarMonthViewHeaderComponent.prototype, "customTemplate", void 0);
__decorate([
    Output()
], CalendarMonthViewHeaderComponent.prototype, "columnHeaderClicked", void 0);
CalendarMonthViewHeaderComponent = __decorate([
    Component({
        selector: 'mwl-calendar-month-view-header',
        template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
    >
      <div class="cal-cell-row cal-header" role="row">
        <div
          class="cal-cell"
          id="cal-header-cell"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          (click)="
            columnHeaderClicked.emit({
              isoDayNumber: day.day,
              sourceEvent: $event
            })
          "
          [ngClass]="day.cssClass"
          tabindex="0"
          role="columnheader"
        >
          {{ day.date | calendarDate: 'monthViewColumnHeader':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `,
        styles: [".calendar-count{background:#000;color:#fff;padding:6px;border-radius:50%;width:15px;height:15px;font-size:12px;font-weight:700;margin-right:2px!important}.calendar-title-container{display:-webkit-box;display:flex}@media (max-width:767px){.calendar-title-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}.cal-event{height:100%!important}}"]
    })
], CalendarMonthViewHeaderComponent);

let CalendarMonthCellComponent = class CalendarMonthCellComponent {
    constructor(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
        this.events = [];
        this.count = 0;
    }
    ngOnInit() {
        this.initialCall();
    }
    ngOnChanges(changes) {
        this.initialCall();
    }
    initialCall() {
        if (this.day.events.length >= 1) {
            this.events = this.day.events.slice(0, 1);
            this.count = this.day.events.length - this.events.length;
        }
        else {
            this.events = this.day.events;
            this.count = 0;
        }
    }
    onEventClick(event) {
        this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    }
};
CalendarMonthCellComponent.ctorParameters = () => [
    { type: EventEmitterService }
];
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "day", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "openDay", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "customTemplate", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
CalendarMonthCellComponent = __decorate([
    Component({
        selector: 'mwl-calendar-month-cell',
        template: `
    <ng-template
      #defaultTemplate
      let-day="day"
      let-openDay="openDay"
      let-locale="locale"
      let-tooltipPlacement="tooltipPlacement"
      let-highlightDay="highlightDay"
      let-unhighlightDay="unhighlightDay"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDelay="tooltipDelay"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-cell-top"
        id="date-cell"
        [attr.aria-label]="
          { day: day, locale: locale } | calendarA11y: 'monthCell'
        "
      >
        <span aria-hidden="true">
          <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{
            day.badgeTotal
          }}</span>
          <span class="calendar-count"*ngIf="count !== 0">+{{count}}</span>
          <span class="cal-day-number" id="day-number-view">{{
            day.date | calendarDate: 'monthViewDayNumber':locale
          }}</span>
        </span>
      </div>
      <div class="cal-events" *ngIf="events.length > 0">
        <div
          class="cal-event"
          *ngFor="let event of events; trackBy: trackByEventId"
          [ngStyle]="{'width': 100 + '%','height': 61 + 'px', 'border-radius': 0 + 'px','background-color': '#dcf8e9','display': 'flex', 'flex-direction': 'column','justify-content': 'center', 'border-left': '5px solid #58d395','margin-left': '0px','margin-right': '0px','margin-bottom': '0px' }"
          [ngClass]="event?.cssClass"
          (mouseenter)="highlightDay.emit({ event: event })"
          (mouseleave)="unhighlightDay.emit({ event: event })"
          [mwlCalendarTooltip]="
            event.title | calendarEventTitle: 'monthTooltip':event
          "
          [tooltipPlacement]="tooltipPlacement"
          [tooltipEvent]="event"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          [tooltipDelay]="tooltipDelay"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event, draggedFrom: day }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
          [validateDrag]="validateDrag"
          (mwlClick)="eventClicked.emit({ event: event, sourceEvent: $event })"
          [attr.aria-hidden]="{} | calendarA11y: 'hideMonthCellEvents'"
          (click) = "onEventClick(event)"
        >
        <p class="event-title">{{event.start | date:'shortTime'}}</p>
        <div class="calendar-title-container">
        <p class="event-title">{{event.title}}</p>
        
        </div>

        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        openDay: openDay,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        highlightDay: highlightDay,
        unhighlightDay: unhighlightDay,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDelay: tooltipDelay,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
        host: {
            class: 'cal-cell cal-day-cell',
            '[class.cal-past]': 'day.isPast',
            '[class.cal-today]': 'day.isToday',
            '[class.cal-future]': 'day.isFuture',
            '[class.cal-weekend]': 'day.isWeekend',
            '[class.cal-in-month]': 'day.inMonth',
            '[class.cal-out-month]': '!day.inMonth',
            '[class.cal-has-events]': 'events.length > 0',
            '[class.cal-open]': 'day === openDay',
            '[class.cal-event-highlight]': '!!day.backgroundColor'
        },
        styles: [".calendar-count{background:#000;color:#fff;padding:6px;border-radius:50%;width:15px;height:15px;font-size:12px;font-weight:700;margin-right:2px!important}.calendar-title-container{display:-webkit-box;display:flex}@media (max-width:767px){.calendar-title-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}.cal-event{height:100%!important}}"]
    })
], CalendarMonthCellComponent);

const collapseAnimation = trigger('collapse', [
    state('void', style({
        height: 0,
        overflow: 'hidden',
        'padding-top': 0,
        'padding-bottom': 0
    })),
    state('*', style({
        height: '*',
        overflow: 'hidden',
        'padding-top': '*',
        'padding-bottom': '*'
    })),
    transition('* => void', animate('150ms ease-out')),
    transition('void => *', animate('150ms ease-in'))
]);
let CalendarOpenDayEventsComponent = class CalendarOpenDayEventsComponent {
    constructor() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "isOpen", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "events", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "customTemplate", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input()
], CalendarOpenDayEventsComponent.prototype, "date", void 0);
__decorate([
    Output()
], CalendarOpenDayEventsComponent.prototype, "eventClicked", void 0);
CalendarOpenDayEventsComponent = __decorate([
    Component({
        selector: 'mwl-calendar-open-day-events',
        template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-open-day-events"
        [@collapse]
        *ngIf="isOpen"
        role="application"
      >
        <span
          tabindex="-1"
          role="alert"
          [attr.aria-label]="
            { date: date, locale: locale } | calendarA11y: 'openDayEventsAlert'
          "
        ></span>
        <span
          tabindex="0"
          role="landmark"
          [attr.aria-label]="
            { date: date, locale: locale }
              | calendarA11y: 'openDayEventsLandmark'
          "
        ></span>
        <div
          *ngFor="let event of events; trackBy: trackByEventId"
          [ngClass]="event?.cssClass"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
          [validateDrag]="validateDrag"
        >
          <span
            class="cal-event"
            [ngStyle]="{ backgroundColor: event.color?.primary }"
          >
          </span>
          &ngsp;
          <mwl-calendar-event-title
            [event]="event"
            [customTemplate]="eventTitleTemplate"
            view="month"
            (mwlClick)="
              eventClicked.emit({ event: event, sourceEvent: $event })
            "
            (mwlKeydownEnter)="
              eventClicked.emit({ event: event, sourceEvent: $event })
            "
            tabindex="0"
            [attr.aria-label]="
              { event: event, locale: locale }
                | calendarA11y: 'eventDescription'
            "
          >
          </mwl-calendar-event-title>
          &ngsp;
          <mwl-calendar-event-actions
            [event]="event"
            [customTemplate]="eventActionsTemplate"
          >
          </mwl-calendar-event-actions>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
        animations: [collapseAnimation]
    })
], CalendarOpenDayEventsComponent);

let CalendarMonthModule = class CalendarMonthModule {
};
CalendarMonthModule = __decorate([
    NgModule({
        imports: [CommonModule, DragAndDropModule, CalendarCommonModule, MatIconModule],
        declarations: [
            CalendarMonthViewComponent,
            CalendarMonthCellComponent,
            CalendarOpenDayEventsComponent,
            CalendarMonthViewHeaderComponent
        ],
        exports: [
            DragAndDropModule,
            CalendarMonthViewComponent,
            CalendarMonthCellComponent,
            CalendarOpenDayEventsComponent,
            CalendarMonthViewHeaderComponent
        ]
    })
], CalendarMonthModule);

class CalendarDragHelper {
    constructor(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    validateDrag({ x, y, snapDraggedEvents, dragAlreadyMoved, transform }) {
        if (snapDraggedEvents) {
            const newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + transform.x,
                right: this.startPosition.right + transform.x,
                top: this.startPosition.top + transform.y,
                bottom: this.startPosition.bottom + transform.y
            });
            return ((isWithinThreshold({ x, y }) || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold({ x, y }) || dragAlreadyMoved;
        }
    }
}

class CalendarResizeHelper {
    constructor(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    validateResize({ rectangle }) {
        if (this.minWidth &&
            Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}

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
        const { end } = calendarEvent, eventWithoutEnd = __rest(calendarEvent, ["end"]);
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
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "events", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "excludeDays", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "refresh", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "headerTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "precision", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "weekendDays", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "snapDraggedEvents", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "hourSegmentTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "eventSnapSize", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "daysInWeek", void 0);
__decorate([
    Input()
], CalendarWeekViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "dayHeaderClicked", void 0);
__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "eventTimesChanged", void 0);
__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "beforeViewRender", void 0);
__decorate([
    Output()
], CalendarWeekViewComponent.prototype, "hourSegmentClicked", void 0);
CalendarWeekViewComponent = __decorate([
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
    __param(2, Inject(LOCALE_ID))
], CalendarWeekViewComponent);
// [eventActionsTemplate]="eventActionsTemplate"

let CalendarWeekViewHeaderComponent = class CalendarWeekViewHeaderComponent {
    constructor() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.dragEnter = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
};
__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "days", void 0);
__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "customTemplate", void 0);
__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "dayHeaderClicked", void 0);
__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "eventDropped", void 0);
__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "dragEnter", void 0);
CalendarWeekViewHeaderComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view-header',
        template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass"
          (mwlClick)="dayHeaderClicked.emit({ day: day, sourceEvent: $event })"
          mwlDroppable
          dragOverClass="cal-drag-over"
          (drop)="
            eventDropped.emit({
              event: $event.dropData.event,
              newStart: day.date
            })
          "
          (dragEnter)="dragEnter.emit({ date: day.date })"
          tabindex="0"
          role="columnheader"
        >
          <div class="week-header-day">
            {{ day.date | calendarDate: 'weekViewColumnHeader':locale }}
          </div>
          <div class="week-header-date">
            {{day.date | calendarDate: 'weekViewColumnSubHeader':locale}}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewHeaderComponent);

let CalendarWeekViewEventComponent = class CalendarWeekViewEventComponent {
    constructor(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.eventClicked = new EventEmitter();
    }
    ngOnInit() {
    }
    onEventClick(event) {
        this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    }
};
CalendarWeekViewEventComponent.ctorParameters = () => [
    { type: EventEmitterService }
];
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "weekEvent", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "customTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "column", void 0);
__decorate([
    Input()
], CalendarWeekViewEventComponent.prototype, "daysInWeek", void 0);
__decorate([
    Output()
], CalendarWeekViewEventComponent.prototype, "eventClicked", void 0);
CalendarWeekViewEventComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view-event',
        template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDisabled="tooltipDisabled"
      let-tooltipDelay="tooltipDelay"
      let-column="column"
      let-daysInWeek="daysInWeek"
    >
      <div
        class="cal-event"
        [ngStyle]="{
          backgroundColor: weekEvent.event.color?.secondary,'border-left': '5px solid',
          'borderColor': '#867ff2'
        }"
        [mwlCalendarTooltip]="
          !tooltipDisabled
            ? (weekEvent.event.title
              | calendarEventTitle
                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')
                : weekEvent.event)
            : ''
        "
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody"
        [tooltipDelay]="tooltipDelay"
        (mwlClick)="eventClicked.emit({ sourceEvent: $event })"
        (mwlKeydownEnter)="eventClicked.emit({ sourceEvent: $event })"
        tabindex="0"
        role="application"
        (click) = "onEventClick(weekEvent.event)"
      >
      <p class="week-event-title">{{weekEvent.event.start | date:'shortTime'}}</p>
      <p class="week-event-title">{{weekEvent.event.title}}</p>
        <mwl-calendar-event-actions
          [event]="weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        >
        </mwl-calendar-event-actions>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDisabled: tooltipDisabled,
        tooltipDelay: tooltipDelay,
        column: column,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewEventComponent);
// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "

let CalendarWeekViewHourSegmentComponent = class CalendarWeekViewHourSegmentComponent {
};
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "segment", void 0);
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "segmentHeight", void 0);
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "isTimeLabel", void 0);
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "daysInWeek", void 0);
__decorate([
    Input()
], CalendarWeekViewHourSegmentComponent.prototype, "customTemplate", void 0);
CalendarWeekViewHourSegmentComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view-hour-segment',
        template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-isTimeLabel="isTimeLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        <div class="cal-time" *ngIf="isTimeLabel">
          {{
            segment.displayDate
              | calendarDate
                : (daysInWeek === 1 ? 'dayViewHour' : 'weekViewHour')
                : locale
          }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        isTimeLabel: isTimeLabel,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewHourSegmentComponent);

let CalendarWeekViewCurrentTimeMarkerComponent = class CalendarWeekViewCurrentTimeMarkerComponent {
    constructor(dateAdapter, zone) {
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1000)), startWith(0), switchMapTo(this.columnDate$), map(columnDate => {
            const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
            const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
            const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) / 60;
            const now = new Date();
            return {
                isVisible: this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier
            };
        }));
    }
    ngOnChanges(changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    }
};
CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: NgZone }
];
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "columnDate", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegments", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "customTemplate", void 0);
CalendarWeekViewCurrentTimeMarkerComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view-current-time-marker',
        template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewCurrentTimeMarkerComponent);

let CalendarWeekModule = class CalendarWeekModule {
};
CalendarWeekModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ResizableModule,
            DragAndDropModule,
            CalendarCommonModule,
        ],
        declarations: [
            CalendarWeekViewComponent,
            CalendarWeekViewHeaderComponent,
            CalendarWeekViewEventComponent,
            CalendarWeekViewHourSegmentComponent,
            CalendarWeekViewCurrentTimeMarkerComponent
        ],
        exports: [
            ResizableModule,
            DragAndDropModule,
            CalendarWeekViewComponent,
            CalendarWeekViewHeaderComponent,
            CalendarWeekViewEventComponent,
            CalendarWeekViewHourSegmentComponent,
            CalendarWeekViewCurrentTimeMarkerComponent
        ],
        providers: [{
                provide: MatDialogRef,
            }
        ],
    })
], CalendarWeekModule);

/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
let CalendarDayViewComponent = class CalendarDayViewComponent {
    /**
     * Shows all events on a given day. Example usage:
     *
     * ```typescript
     * <mwl-calendar-day-view
     *  [viewDate]="viewDate"
     *  [events]="events">
     * </mwl-calendar-day-view>
     * ```
     */
    constructor() {
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
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
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
    }
};
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "events", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "refresh", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "eventSnapSize", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "hourSegmentTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "eventTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "snapDraggedEvents", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
__decorate([
    Input()
], CalendarDayViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
__decorate([
    Output()
], CalendarDayViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output()
], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
__decorate([
    Output()
], CalendarDayViewComponent.prototype, "eventTimesChanged", void 0);
__decorate([
    Output()
], CalendarDayViewComponent.prototype, "beforeViewRender", void 0);
CalendarDayViewComponent = __decorate([
    Component({
        selector: 'mwl-calendar-day-view',
        template: `
    <mwl-calendar-week-view
      class="cal-day-view"
      [daysInWeek]="1"
      [viewDate]="viewDate"
      [events]="events"
      [hourSegments]="hourSegments"
      [hourSegmentHeight]="hourSegmentHeight"
      [dayStartHour]="dayStartHour"
      [dayStartMinute]="dayStartMinute"
      [dayEndHour]="dayEndHour"
      [dayEndMinute]="dayEndMinute"
      [refresh]="refresh"
      [locale]="locale"
      [eventSnapSize]="eventSnapSize"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipAppendToBody]="tooltipAppendToBody"
      [tooltipDelay]="tooltipDelay"
      [hourSegmentTemplate]="hourSegmentTemplate"
      [eventTemplate]="eventTemplate"
      [eventTitleTemplate]="eventTitleTemplate"
      [eventActionsTemplate]="eventActionsTemplate"
      [snapDraggedEvents]="snapDraggedEvents"
      [allDayEventsLabelTemplate]="allDayEventsLabelTemplate"
      [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
      (eventClicked)="eventClicked.emit($event)"
      (hourSegmentClicked)="hourSegmentClicked.emit($event)"
      (eventTimesChanged)="eventTimesChanged.emit($event)"
      (beforeViewRender)="beforeViewRender.emit($event)"
    ></mwl-calendar-week-view>
  `
    })
], CalendarDayViewComponent);

let CalendarDayModule = class CalendarDayModule {
};
CalendarDayModule = __decorate([
    NgModule({
        imports: [CommonModule, CalendarCommonModule, CalendarWeekModule],
        declarations: [CalendarDayViewComponent],
        exports: [CalendarDayViewComponent]
    })
], CalendarDayModule);

let CalendarModalComponent = class CalendarModalComponent {
    constructor(dialogRef, eventEmitterService, data) {
        this.dialogRef = dialogRef;
        this.eventEmitterService = eventEmitterService;
        this.data = data;
        this.screenType = "add";
        this.title = this.data ? "Edit Event" : "Add Event";
        this.titlePlaceholder = this.data ? "Edit Title" : "Add Title";
        this.locationPlaceholder = this.data ? "Edit Location" : "Add Location";
        this.descriptionPlaceholder = this.data ? "Edit Description" : "Add Description";
    }
    ngOnInit() {
        const dateIn = new Date(); // The date to be rounded
        const interval = 30 * 60 * 1000; // 30 minutes (aka quarter hour)
        const dateOut = round(dateIn, interval);
        const fromTime = format(dateOut, 'HH:mm');
        this.addEvents = new FormGroup({
            title: new FormControl('', Validators.required),
            location: new FormControl(),
            description: new FormControl(),
            fromDate: new FormControl(new Date(), Validators.required),
            toDate: new FormControl('', Validators.required),
            fromTime: new FormControl(fromTime, Validators.required),
            toTime: new FormControl('', Validators.required),
        });
        if (this.data) {
            this.addEvents.disable();
            this.assignEventDetails();
        }
    }
    addMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    assignEventDetails() {
        this.screenType = "edit";
        this.addEvents.controls['title'].setValue(this.data.title);
        this.addEvents.controls['location'].setValue(this.data.location);
        this.addEvents.controls['description'].setValue(this.data.description);
        this.addEvents.controls['fromDate'].setValue(this.data.start);
        this.addEvents.controls['toDate'].setValue(this.data.end);
        this.addEvents.controls['fromTime'].setValue(this.data.fromTime);
        this.addEvents.controls['toTime'].setValue(this.data.toTime);
    }
    addOrUpdateEvent() {
        let tempObject = {
            title: this.addEvents.controls['title'].value,
            description: this.addEvents.controls['description'].value,
            location: this.addEvents.controls['location'].value,
            start: this.addEvents.controls['fromDate'].value,
            end: this.addEvents.controls['toDate'].value,
            fromTime: this.addEvents.controls['fromTime'].value,
            toTime: this.addEvents.controls['toTime'].value
        };
        let startDatetime = tempObject.start + ' ' + tempObject.fromTime;
        let endDatetime = tempObject.end + ' ' + tempObject.toTime;
        console.log("startDatetime, endDatetime", startDatetime, endDatetime);
        if (this.data === null) {
            this.eventEmitterService.emitNavChangeEvent('ADD_SAVE_CLICKED', tempObject);
        }
        else {
            this.eventEmitterService.emitNavChangeEvent('EDIT_SAVE_CLICKED', tempObject);
        }
        this.dialogRef.close();
    }
    onNoClick() {
        this.dialogRef.close();
    }
    onDelete() {
        this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', this.data);
        this.dialogRef.close();
    }
    onEdit() {
        this.addEvents.enable();
    }
};
CalendarModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: EventEmitterService },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
CalendarModalComponent = __decorate([
    Component({
        selector: 'app-calendar-modal',
        template: "<div class=\"header\" id=\"header-view\">\n  <div class=\"titleStyle\">\n    <h1 mat-dialog-title style=\"font-family: Poppins;\">{{title}}</h1>\n  </div>\n  <div>\n    <mat-icon *ngIf=\"title === 'Edit Event'\" aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onEdit()\">edit\n    </mat-icon>\n    <mat-icon *ngIf=\"title === 'Edit Event'\" aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onDelete()\">delete\n    </mat-icon>\n    <mat-icon aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onNoClick()\">close</mat-icon>\n  </div>\n</div>\n<div mat-dialog-content id=\"dialog-container\">\n\n  <form class=\"example-form\" [formGroup]=\"addEvents\" (ngSubmit)=\"addOrUpdateEvent()\">\n\n    <mat-form-field class=\"example-full-width\" id=\"Add-title-view\"\n      style=\"font-family: Poppins;width: 95% !important;margin-left: 5%;\">\n      <input class=\"add-title-input\" matInput placeholder=\"{{titlePlaceholder}}\" formControlName=\"title\">\n    </mat-form-field>\n\n    <div class=\"timeinterval\" id=\"start-end-time\" style=\"display: flex !important;align-items: center;\">\n\n      <mat-icon aria-hidden=\"false\">access_time</mat-icon>\n      <div style=\"display: flex !important;\njustify-content: space-between !important;align-items: center;margin-left: 2%;padding-right: 2%;width: calc(100% - 5%);\">\n        <mat-form-field class=\"example-full-width\" style=\"width: 22%;\">\n          <mat-label>Start date</mat-label>\n          <input matInput formControlName=\"fromDate\" [matDatepicker]=\"picker\" >\n          <mat-datepicker-toggle matSuffix [for]=\"picker\">\n            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n          </mat-datepicker-toggle>\n          <mat-datepicker #picker></mat-datepicker>\n        </mat-form-field>\n\n        <mat-form-field class=\"start-time-view\">\n          <input matInput [ngxTimepicker]=\"fromTime\" [format]=\"24\" formControlName=\"fromTime\"  readonly >\n          <ngx-material-timepicker #fromTime></ngx-material-timepicker>\n        </mat-form-field>\n\n        <mat-form-field class=\"end-time-view\">\n          <input matInput [ngxTimepicker]=\"toTime\" [format]=\"24\" formControlName=\"toTime\" readonly\n            [disabled]=\"addEvents.controls['fromTime'].value > addEvents.controls['toTime'].value\">\n          <ngx-material-timepicker #toTime></ngx-material-timepicker>\n        </mat-form-field>\n\n        <mat-form-field id=\"end-date-view\"class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n          <mat-label>End date</mat-label>\n          <input [min]=\"addEvents.controls['fromDate'].value\" matInput formControlName=\"toDate\"\n            [matDatepicker]=\"datepicker\" >\n          <mat-datepicker-toggle matSuffix [for]=\"datepicker\">\n            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n          </mat-datepicker-toggle>\n          <mat-datepicker #datepicker></mat-datepicker>\n        </mat-form-field>\n      </div>\n\n    </div>\n\n    <div class=\"header\" id=\"location-view\">\n      <mat-icon aria-hidden=\"false\">location_on</mat-icon>\n      <mat-form-field class=\"form-field\" style=\"margin-left: 2%;\">\n        <input  class=\"location-input-view\" matInput placeholder=\"{{locationPlaceholder}}\" formControlName=\"location\"\n          style=\" width: 95% !important;\" />\n      </mat-form-field>\n    </div>\n\n    <div class=\"text-area-container\">\n      <mat-icon aria-hidden=\"false\" class=\"menu-icon-view\">menu</mat-icon>\n      <textarea id=\"text-input-view\"class=\"text-area-view\" placeholder=\"{{descriptionPlaceholder}}\" formControlName=\"description\"></textarea>\n    </div>\n    <div class=\"save-button-view\">\n      <button type=\"submit\" mat-button class=\"event-button\" [disabled]=\"!addEvents.valid\" [ngStyle]=\"{ 'opacity' : !addEvents.valid ? '0.5' : '1.5' }\">Save</button>\n    </div>\n  </form>\n</div>\n\n",
        styles: [".cdk-overlay-container{z-index:1127}.form-field{font-family:Poppins;width:95%!important}.event-button{background:#404041;color:#fff;width:141px;height:42px;border-radius:4px;border:1px solid #404041}.titleStyle{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.header{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center}.save-button-view{display:-webkit-box;display:flex;-webkit-box-pack:end;justify-content:flex-end;-webkit-box-align:center;align-items:center;margin-bottom:0!important}.save-button-view button{width:110px;height:47px;border-radius:6px;background-color:#404041}.text-area-view{width:100%!important;height:75px;resize:unset;overflow:auto;padding-top:5px;padding-left:5px;margin-left:2%;border-radius:5px;font-family:poppins}.text-area-container{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;padding-top:28px;padding-bottom:2%}.menu-icon-view{position:relative;bottom:3px}.titleStyle h1{margin-bottom:0!important;font-family:Poppins;font-size:28px;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.01px;text-align:left;color:#404041}.add-title-input{font-size:20px!important;font-weight:500!important;font-stretch:normal!important;font-style:normal!important;letter-spacing:.01px!important;text-align:left!important;color:#7b7f8b!important}input{font-size:20px;font-weight:500;font-stretch:normal;font-style:normal;letter-spacing:.01px;text-align:left;color:#7b7f8b}#dialog-container{max-height:70vh!important}@media (max-width:991px){.end-time-view,.start-time-view{width:15%!important}}.example-full-width input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px!important}.start-time-view input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.end-time-view input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px!important}.location-input-view{font-size:14px}#text-input-view{font-size:14px;color:#7b7f8b}#start-end-time{padding-top:18px}.mat-input-placeholder{color:#fff;font-size:2em}.mat-form-field-label,mat-label{font-size:14px!important}#location-view{margin-top:6px}#header-view{margin-bottom:12px}"]
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], CalendarModalComponent);

let CalendarCommonHeaderComponent = class CalendarCommonHeaderComponent {
    constructor(dateAdapter, eventEmitterService, dialog) {
        this.dateAdapter = dateAdapter;
        this.eventEmitterService = eventEmitterService;
        this.dialog = dialog;
        /**
         * Days to skip when going back by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.viewChange = new EventEmitter();
        this.setView = new EventEmitter();
        this.onAddEventClick = new EventEmitter();
        this.onEditEventClick = new EventEmitter();
        this.onDeleteEventClick = new EventEmitter();
        this.onAddEventSaveClick = new EventEmitter();
        this.showPreviousDayBtn = true;
        this.showTodayBtn = true;
        this.showNextDayBtn = true;
        this.showMonthBtn = true;
        this.showWeekBtn = true;
        this.showDayBtn = true;
        this.showAddEvent = true;
        this.showCaptureEventDialog = true;
        this.showEventDetailsDialog = true;
        this.page = "header";
    }
    ngOnInit() {
        this.view = this.view;
        this.setView.emit(this.view);
        this.eventEmitterService.getNavChangeEmitter().subscribe((data) => {
            switch (data.value) {
                case 'EDIT_EVENT_CLICKED':
                    this.openDialog('EDIT', data.event);
                    break;
                case 'ADD_SAVE_CLICKED':
                    this.addEventSaveClick(data.event);
                    break;
                case 'EDIT_SAVE_CLICKED':
                    this.editEventSaveClick(data.event);
                    break;
                case 'DELETE_EVENT_CLICKED':
                    this.deleteEventClick(data.event);
                    break;
                default:
            }
        });
    }
    onViewChange() {
        this.viewChange.emit();
    }
    onViewDateChange(type) {
        if (type === 'Previous') {
            const subFn = {
                day: this.dateAdapter.subDays,
                week: this.dateAdapter.subWeeks,
                month: this.dateAdapter.subMonths
            }[this.view];
            if (this.view === CalendarView.Day) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else if (this.view === CalendarView.Week && this.daysInWeek) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else {
                this.viewDateChange.emit(subFn(this.viewDate, 0));
            }
        }
        else if (type === 'Next') {
            const addFn = {
                day: this.dateAdapter.addDays,
                week: this.dateAdapter.addWeeks,
                month: this.dateAdapter.addMonths
            }[this.view];
            if (this.view === CalendarView.Day) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else if (this.view === CalendarView.Week && this.daysInWeek) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
            }
            else {
                this.viewDateChange.emit(addFn(this.viewDate, 0));
            }
        }
    }
    onSetView(view) {
        this.view = view;
        this.setView.emit(view);
    }
    addEventClick() {
        this.onAddEventClick.emit();
        this.openDialog('ADD', null);
    }
    addEventSaveClick(event) {
        this.onAddEventSaveClick.emit(event);
    }
    editEventSaveClick(event) {
        this.onEditEventClick.emit(event);
    }
    deleteEventClick(event) {
        this.onDeleteEventClick.emit(event);
    }
    openDialog(type, data) {
        let template = null;
        if (type === 'EDIT') {
            if (this.showEventDetailsDialog === true) {
                template = CalendarModalComponent;
            }
            else if (this.customEventDialog !== undefined) {
                template = this.customEventDialog;
            }
        }
        else if (type === 'ADD') {
            if (this.showCaptureEventDialog === true) {
                template = CalendarModalComponent;
            }
            else if (this.customCaptureEventDialog !== undefined) {
                template = this.customCaptureEventDialog;
            }
        }
        if (template !== null) {
            const dialogRef = this.dialog.open(template, {
                data: data
            });
            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
};
CalendarCommonHeaderComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: EventEmitterService },
    { type: MatDialog }
];
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "viewDate", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "view", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "excludeDays", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "daysInWeek", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "weekStartsOn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "weekendDays", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "viewDateChange", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "viewChange", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "setView", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "onAddEventClick", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "onEditEventClick", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "onDeleteEventClick", void 0);
__decorate([
    Output()
], CalendarCommonHeaderComponent.prototype, "onAddEventSaveClick", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showPreviousDayBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showTodayBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showNextDayBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showMonthBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showWeekBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showDayBtn", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showAddEvent", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showCaptureEventDialog", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "showEventDetailsDialog", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "customCaptureEventDialog", void 0);
__decorate([
    Input()
], CalendarCommonHeaderComponent.prototype, "customEventDialog", void 0);
CalendarCommonHeaderComponent = __decorate([
    Component({
        selector: 'mwl-calendar-header',
        template: `  
  <div>
  <h1 class="calendar-header-text">Calendar </h1> 
  <div class="header-container">
     
    <div class="header-view">
      <div>
        <mat-button-toggle-group id="today-toggle-group" name="fontStyle" aria-label="Font Style"
        #group="matButtonToggleGroup">
        <mat-button-toggle class="previous-button" id="toggle-button" 
          *ngIf="showPreviousDayBtn"
          mwlCalendarPreviousView 
          [(viewDate)]="viewDate" 
          [view]="view" 
          (viewDateChange)="onViewDateChange('Previous')" 
          (viewChange)="onViewChange()" 
          [daysInWeek]="daysInWeek" 
          [excludeDays]="excludeDays">
          Previous
        </mat-button-toggle>
        <mat-button-toggle class="today-button" id="toggle-button" 
        *ngIf="showTodayBtn"
                mwlCalendarToday 
                [(viewDate)]="viewDate" 
                (viewDateChange)="viewDateChange.next(viewDate)">
        Today
        </mat-button-toggle>
        <mat-button-toggle id="toggle-button" 
        *ngIf="showNextDayBtn"
                mwlCalendarNextView 
                [view]="view" 
                [(viewDate)]="viewDate" 
                (viewDateChange)="onViewDateChange('Next')" 
                (viewChange)="onViewChange()" 
                [daysInWeek]="daysInWeek" 
                [excludeDays]="excludeDays">
        Next
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
      
      <button class="event-button" *ngIf="showAddEvent" (click)="addEventClick()" mat-raised-button><mat-icon class="add-icon-view">add</mat-icon> Add Event</button>
    </div>
    <div class="date-view-container">
      <mat-icon mwlCalendarPreviousView 
      [(viewDate)]="viewDate" 
      [view]="view" 
      (viewDateChange)="onViewDateChange('Previous')" 
      (viewChange)="onViewChange()" 
      [daysInWeek]="daysInWeek" 
      [excludeDays]="excludeDays">arrow_left</mat-icon>
      <h3 class="date-view">{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
      <mat-icon mwlCalendarNextView 
      [view]="view" 
      [(viewDate)]="viewDate" 
      (viewDateChange)="onViewDateChange('Next')" 
      (viewChange)="onViewChange()" 
      [daysInWeek]="daysInWeek" 
      [excludeDays]="excludeDays">arrow_right</mat-icon>
    </div>
    <div>
      <mat-button-toggle-group class="day-toggle-view" id="toggle-group" name="fontStyle" aria-label="Font Style" #group="matButtonToggleGroup">
        <mat-button-toggle class="day-view" id="toggle-button" *ngIf="showDayBtn" (click)="onSetView('day')" [checked]="view === 'day'">Day</mat-button-toggle>
        <mat-button-toggle class="week-view"id="toggle-button" *ngIf="showWeekBtn" (click)="onSetView('week')" [checked]="view === 'week'">Week</mat-button-toggle>
        <mat-button-toggle id="toggle-button" *ngIf="showMonthBtn" (click)="onSetView('month')" [checked]="view === 'month'">Month</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
</div>
</div>
  `,
        styles: [".header-container{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;padding:20px!important}.header-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header-view>div{margin-right:3%}.event-button{background:#404041;color:#fff;width:136px;height:42px;border-radius:4px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.add-icon-view{font-size:22px!important}#today-toggle-group{max-width:210px;width:auto;border-radius:4px;background-color:#fff}#toggle-button{padding-top:4px;padding-bottom:4px;border-left:none}.day-view,.previous-button,.today-button{position:relative}.day-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.week-view{position:relative}.previous-button::after,.today-button::after,.week-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.calendar-header-text{font-size:32px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.02px;padding-left:16px;color:#404041;font-family:poppins}#toggle-group{max-width:188px!important;width:auto;height:42px;border-radius:4px;background-color:#fff}#toggle-button-button{width:92px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important;height:32px}#toggle-button-button>div{width:75px;height:25px;font-size:18px;font-weight:400;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.01px;text-align:left;color:#404041}#today-toggle-group .mat-button-toggle{height:34px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.previous-button{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.date-view{height:20px;font-size:14px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:normal;text-align:left;color:#4d585e;margin:0!important;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.date-view-container{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;cursor:pointer}.day-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.mat-button-toggle-checked{color:#fff;background-color:#404041;border-radius:3px}.mat-button-toggle{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.cal-month-view .cal-cell-top{border:1px solid #dadbdd!important}@media (max-width:767px){.header-container{width:100%!important;display:-webkit-box!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important;-webkit-box-pack:center!important;justify-content:center!important;-webkit-box-align:center!important;align-items:center!important;padding:0!important}.date-view-container,.day-toggle-view,.header-view{margin-bottom:12px}}@media (max-width:350px){#today-toggle-group{margin-bottom:12px}.header-view{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}}"]
    })
], CalendarCommonHeaderComponent);

const ɵ0 = {}, ɵ1 = {};
let CalendarCommonModalModule = class CalendarCommonModalModule {
};
CalendarCommonModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            CalendarCommonModule,
            CalendarWeekModule,
            MatIconModule$1,
            MatFormFieldModule,
            MatInputModule,
            MatNativeDateModule,
            MatDatepickerModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatSelectModule,
            MatToolbarModule,
            BrowserModule,
            BrowserAnimationsModule,
            NgxMaterialTimepickerModule
        ],
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: ɵ0 },
            { provide: MatDialogRef, useValue: ɵ1 }
        ],
        declarations: [CalendarModalComponent],
        exports: [CalendarModalComponent],
    })
], CalendarCommonModalModule);

let CalendarCommonHeaderModule = class CalendarCommonHeaderModule {
};
CalendarCommonHeaderModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            CalendarCommonModule,
            CalendarWeekModule,
            CalendarCommonModalModule,
            MatButtonModule,
            MatIconModule,
            MatButtonToggleModule
        ],
        declarations: [CalendarCommonHeaderComponent,
        ],
        providers: [
            EventEmitterService
        ],
        entryComponents: [CalendarModalComponent],
        exports: [CalendarCommonHeaderComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
], CalendarCommonHeaderModule);

function adapterFactory() {
    return Object.assign({}, adapterFactory$1(), { addWeeks,
        addMonths,
        subDays,
        subWeeks,
        subMonths,
        getISOWeek,
        setDate,
        setMonth,
        setYear,
        getDate,
        getYear });
}

const ɵ0$1 = adapterFactory;
/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
let CalendarModule = class CalendarModule {
};
CalendarModule = __decorate([
    NgModule({
        imports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule,
            MatIconModule,
            CalendarCommonModule.forRoot({
                provide: DateAdapter,
                useFactory: ɵ0$1
            })
        ],
        exports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule,
        ],
        providers: [CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y, CalendarUtils],
    })
], CalendarModule);

/*
 * Public API Surface of angular-calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarA11y, CalendarAngularDateFormatter, CalendarCommonHeaderComponent, CalendarCommonHeaderModule, CalendarCommonModule, CalendarDateFormatter, CalendarDayModule, CalendarDayViewComponent, CalendarEventTimesChangedEventType, CalendarEventTitleFormatter, CalendarModule, CalendarMomentDateFormatter, CalendarMonthModule, CalendarMonthViewComponent, CalendarNativeDateFormatter, CalendarUtils, CalendarView, CalendarWeekModule, CalendarWeekViewComponent, DateAdapter, MOMENT, collapseAnimation, getWeekViewPeriod, ɵ0$1 as ɵ0, CalendarOpenDayEventsComponent as ɵa, CalendarEventActionsComponent as ɵb, EventEmitterService as ɵc, CalendarEventTitleComponent as ɵd, CalendarTooltipWindowComponent as ɵe, CalendarTooltipDirective as ɵf, CalendarPreviousViewDirective as ɵg, CalendarNextViewDirective as ɵh, CalendarTodayDirective as ɵi, CalendarDatePipe as ɵj, CalendarEventTitlePipe as ɵk, CalendarA11yPipe as ɵl, ClickDirective as ɵm, KeydownEnterDirective as ɵn, CalendarMonthCellComponent as ɵo, CalendarMonthViewHeaderComponent as ɵp, CalendarWeekViewHeaderComponent as ɵq, CalendarWeekViewEventComponent as ɵr, CalendarWeekViewHourSegmentComponent as ɵs, CalendarWeekViewCurrentTimeMarkerComponent as ɵt, CalendarCommonModalModule as ɵu, CalendarModalComponent as ɵv, adapterFactory as ɵw };
//# sourceMappingURL=neo-calendar.js.map
