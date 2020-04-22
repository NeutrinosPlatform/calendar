import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isWithinThreshold, trackByEventId } from '../common/util';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
var CalendarMonthCellComponent = /** @class */ (function () {
    function CalendarMonthCellComponent(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
        this.events = [];
        this.count = 0;
    }
    CalendarMonthCellComponent.prototype.ngOnInit = function () {
        this.initialCall();
    };
    CalendarMonthCellComponent.prototype.ngOnChanges = function (changes) {
        this.initialCall();
    };
    CalendarMonthCellComponent.prototype.initialCall = function () {
        if (this.day.events.length >= 1) {
            this.events = this.day.events.slice(0, 1);
            this.count = this.day.events.length - this.events.length;
        }
        else {
            this.events = this.day.events;
            this.count = 0;
        }
    };
    CalendarMonthCellComponent.prototype.onEventClick = function (event) {
        this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    };
    CalendarMonthCellComponent.ctorParameters = function () { return [
        { type: EventEmitterService }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "day", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "openDay", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarMonthCellComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
    CalendarMonthCellComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-month-cell',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-day=\"day\"\n      let-openDay=\"openDay\"\n      let-locale=\"locale\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-highlightDay=\"highlightDay\"\n      let-unhighlightDay=\"unhighlightDay\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-trackByEventId=\"trackByEventId\"\n      let-validateDrag=\"validateDrag\"\n    >\n      <div\n        class=\"cal-cell-top\"\n        id=\"date-cell\"\n        [attr.aria-label]=\"\n          { day: day, locale: locale } | calendarA11y: 'monthCell'\n        \"\n      >\n        <span aria-hidden=\"true\">\n          <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{\n            day.badgeTotal\n          }}</span>\n          <span class=\"calendar-count\"*ngIf=\"count !== 0\">+{{count}}</span>\n          <span class=\"cal-day-number\" id=\"day-number-view\">{{\n            day.date | calendarDate: 'monthViewDayNumber':locale\n          }}</span>\n        </span>\n      </div>\n      <div class=\"cal-events\" *ngIf=\"events.length > 0\">\n        <div\n          class=\"cal-event\"\n          *ngFor=\"let event of events; trackBy: trackByEventId\"\n          [ngStyle]=\"{'width': 100 + '%','height': 61 + 'px', 'border-radius': 0 + 'px','background-color': '#dcf8e9','display': 'flex', 'flex-direction': 'column','justify-content': 'center', 'border-left': '5px solid #58d395','margin-left': '0px','margin-right': '0px','margin-bottom': '0px' }\"\n          [ngClass]=\"event?.cssClass\"\n          (mouseenter)=\"highlightDay.emit({ event: event })\"\n          (mouseleave)=\"unhighlightDay.emit({ event: event })\"\n          [mwlCalendarTooltip]=\"\n            event.title | calendarEventTitle: 'monthTooltip':event\n          \"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipEvent]=\"event\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, draggedFrom: day }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n          [validateDrag]=\"validateDrag\"\n          (mwlClick)=\"eventClicked.emit({ event: event, sourceEvent: $event })\"\n          [attr.aria-hidden]=\"{} | calendarA11y: 'hideMonthCellEvents'\"\n          (click) = \"onEventClick(event)\"\n        >\n        <p class=\"event-title\">{{event.start | date:'shortTime'}}</p>\n        <div class=\"calendar-title-container\">\n        <p class=\"event-title\">{{event.title}}</p>\n        \n        </div>\n\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        day: day,\n        openDay: openDay,\n        locale: locale,\n        tooltipPlacement: tooltipPlacement,\n        highlightDay: highlightDay,\n        unhighlightDay: unhighlightDay,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDelay: tooltipDelay,\n        trackByEventId: trackByEventId,\n        validateDrag: validateDrag\n      }\"\n    >\n    </ng-template>\n  ",
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
    return CalendarMonthCellComponent;
}());
export { CalendarMonthCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL21vbnRoL2NhbGVuZGFyLW1vbnRoLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUliLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQTtBQXlHOUU7SUFxQ0Usb0NBQW1CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBbkJqRCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLakUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFHM0IsQ0FBQztRQUVMLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBRWhDLGlCQUFZLEdBQUcsaUJBQWlCLENBQUM7UUFFakMsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFFM0IsVUFBSyxHQUFXLENBQUMsQ0FBQztJQUdsQixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0RBQVcsR0FBWCxVQUFZLE9BQVk7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxnREFBVyxHQUFYO1FBQ0UsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMxRDthQUFJO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtTQUNmO0lBQ0gsQ0FBQztJQUVELGlEQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdFLENBQUM7O2dCQXhCdUMsbUJBQW1COztJQW5DbEQ7UUFBUixLQUFLLEVBQUU7MkRBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOytEQUF1QjtJQUV0QjtRQUFSLEtBQUssRUFBRTs4REFBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTt3RUFBa0M7SUFFakM7UUFBUixLQUFLLEVBQUU7MkVBQThCO0lBRTdCO1FBQVIsS0FBSyxFQUFFO3NFQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTt1RUFBbUM7SUFFbEM7UUFBUixLQUFLLEVBQUU7b0VBQTZCO0lBRTNCO1FBQVQsTUFBTSxFQUFFO29FQUFzRDtJQUVyRDtRQUFULE1BQU0sRUFBRTtzRUFBd0Q7SUFFeEQ7UUFBUixLQUFLLEVBQUU7NEVBQXdDO0lBR2hEO1FBREMsTUFBTSxFQUFFO29FQUlKO0lBNUJNLDBCQUEwQjtRQXZHdEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlCQUF5QjtZQUVuQyxRQUFRLEVBQUUsODdHQXNGVDtZQUNELElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsdUJBQXVCO2dCQUM5QixrQkFBa0IsRUFBRSxZQUFZO2dCQUNoQyxtQkFBbUIsRUFBRSxhQUFhO2dCQUNsQyxvQkFBb0IsRUFBRSxjQUFjO2dCQUNwQyxxQkFBcUIsRUFBRSxlQUFlO2dCQUN0QyxzQkFBc0IsRUFBRSxhQUFhO2dCQUNyQyx1QkFBdUIsRUFBRSxjQUFjO2dCQUN2Qyx3QkFBd0IsRUFBRSxtQkFBbUI7Z0JBQzdDLGtCQUFrQixFQUFFLGlCQUFpQjtnQkFDckMsNkJBQTZCLEVBQUUsdUJBQXVCO2FBQ3ZEOztTQUNGLENBQUM7T0FDVywwQkFBMEIsQ0FnRXRDO0lBQUQsaUNBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9udGhWaWV3RGF5LCBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgaXNXaXRoaW5UaHJlc2hvbGQsIHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1tb250aC12aWV3LnNjc3MnXSwgIFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheT1cImRheVwiXG4gICAgICBsZXQtb3BlbkRheT1cIm9wZW5EYXlcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWhpZ2hsaWdodERheT1cImhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtdW5oaWdobGlnaHREYXk9XCJ1bmhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgbGV0LXRyYWNrQnlFdmVudElkPVwidHJhY2tCeUV2ZW50SWRcIlxuICAgICAgbGV0LXZhbGlkYXRlRHJhZz1cInZhbGlkYXRlRHJhZ1wiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1jZWxsLXRvcFwiXG4gICAgICAgIGlkPVwiZGF0ZS1jZWxsXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICB7IGRheTogZGF5LCBsb2NhbGU6IGxvY2FsZSB9IHwgY2FsZW5kYXJBMTF5OiAnbW9udGhDZWxsJ1xuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1kYXktYmFkZ2VcIiAqbmdJZj1cImRheS5iYWRnZVRvdGFsID4gMFwiPnt7XG4gICAgICAgICAgICBkYXkuYmFkZ2VUb3RhbFxuICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsZW5kYXItY291bnRcIipuZ0lmPVwiY291bnQgIT09IDBcIj4re3tjb3VudH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1udW1iZXJcIiBpZD1cImRheS1udW1iZXItdmlld1wiPnt7XG4gICAgICAgICAgICBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ21vbnRoVmlld0RheU51bWJlcic6bG9jYWxlXG4gICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIiAqbmdJZj1cImV2ZW50cy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIGV2ZW50czsgdHJhY2tCeTogdHJhY2tCeUV2ZW50SWRcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAxMDAgKyAnJScsJ2hlaWdodCc6IDYxICsgJ3B4JywgJ2JvcmRlci1yYWRpdXMnOiAwICsgJ3B4JywnYmFja2dyb3VuZC1jb2xvcic6ICcjZGNmOGU5JywnZGlzcGxheSc6ICdmbGV4JywgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLCAnYm9yZGVyLWxlZnQnOiAnNXB4IHNvbGlkICM1OGQzOTUnLCdtYXJnaW4tbGVmdCc6ICcwcHgnLCdtYXJnaW4tcmlnaHQnOiAnMHB4JywnbWFyZ2luLWJvdHRvbSc6ICcwcHgnIH1cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImV2ZW50Py5jc3NDbGFzc1wiXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwiaGlnaGxpZ2h0RGF5LmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cInVuaGlnaGxpZ2h0RGF5LmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxuICAgICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXG4gICAgICAgICAgICBldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTogJ21vbnRoVG9vbHRpcCc6ZXZlbnRcbiAgICAgICAgICBcIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgIFt0b29sdGlwRXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiZXZlbnQuZHJhZ2dhYmxlXCJcbiAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBldmVudCwgZHJhZ2dlZEZyb206IGRheSB9XCJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwieyB4OiBldmVudC5kcmFnZ2FibGUsIHk6IGV2ZW50LmRyYWdnYWJsZSB9XCJcbiAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ2hpZGVNb250aENlbGxFdmVudHMnXCJcbiAgICAgICAgICAoY2xpY2spID0gXCJvbkV2ZW50Q2xpY2soZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8cCBjbGFzcz1cImV2ZW50LXRpdGxlXCI+e3tldmVudC5zdGFydCB8IGRhdGU6J3Nob3J0VGltZSd9fTwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRpdGxlLWNvbnRhaW5lclwiPlxuICAgICAgICA8cCBjbGFzcz1cImV2ZW50LXRpdGxlXCI+e3tldmVudC50aXRsZX19PC9wPlxuICAgICAgICBcbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBvcGVuRGF5OiBvcGVuRGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgaGlnaGxpZ2h0RGF5OiBoaWdobGlnaHREYXksXG4gICAgICAgIHVuaGlnaGxpZ2h0RGF5OiB1bmhpZ2hsaWdodERheSxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5LFxuICAgICAgICB0b29sdGlwRGVsYXk6IHRvb2x0aXBEZWxheSxcbiAgICAgICAgdHJhY2tCeUV2ZW50SWQ6IHRyYWNrQnlFdmVudElkLFxuICAgICAgICB2YWxpZGF0ZURyYWc6IHZhbGlkYXRlRHJhZ1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2NhbC1jZWxsIGNhbC1kYXktY2VsbCcsXG4gICAgJ1tjbGFzcy5jYWwtcGFzdF0nOiAnZGF5LmlzUGFzdCcsXG4gICAgJ1tjbGFzcy5jYWwtdG9kYXldJzogJ2RheS5pc1RvZGF5JyxcbiAgICAnW2NsYXNzLmNhbC1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXG4gICAgJ1tjbGFzcy5jYWwtd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXG4gICAgJ1tjbGFzcy5jYWwtaW4tbW9udGhdJzogJ2RheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWwtaGFzLWV2ZW50c10nOiAnZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbY2xhc3MuY2FsLW9wZW5dJzogJ2RheSA9PT0gb3BlbkRheScsXG4gICAgJ1tjbGFzcy5jYWwtZXZlbnQtaGlnaGxpZ2h0XSc6ICchIWRheS5iYWNrZ3JvdW5kQ29sb3InXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbDtcblxuICBAT3V0cHV0KCkgaGlnaGxpZ2h0RGF5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdW5oaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xuXG4gIHZhbGlkYXRlRHJhZyA9IGlzV2l0aGluVGhyZXNob2xkO1xuXG4gIGV2ZW50czogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIGNvdW50OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSl7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbml0aWFsQ2FsbCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5pbml0aWFsQ2FsbCgpXG4gIH1cblxuICBpbml0aWFsQ2FsbCgpIHtcbiAgICBpZih0aGlzLmRheS5ldmVudHMubGVuZ3RoID49IDEpe1xuICAgICAgdGhpcy5ldmVudHMgPSB0aGlzLmRheS5ldmVudHMuc2xpY2UoMCwxKTtcbiAgICAgIHRoaXMuY291bnQgPSB0aGlzLmRheS5ldmVudHMubGVuZ3RoIC0gdGhpcy5ldmVudHMubGVuZ3RoO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5ldmVudHMgPSB0aGlzLmRheS5ldmVudHM7XG4gICAgICB0aGlzLmNvdW50ID0gMFxuICAgIH1cbiAgfVxuXG4gIG9uRXZlbnRDbGljayhldmVudCl7XG4gICAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdFRElUX0VWRU5UX0NMSUNLRUQnLCBldmVudCk7XG4gIH1cbiAgXG5cbn1cbiJdfQ==