import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
var CalendarDayViewComponent = /** @class */ (function () {
    function CalendarDayViewComponent() {
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
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "events", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "hourSegments", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "hourSegmentHeight", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "refresh", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "eventSnapSize", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "hourSegmentTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "eventTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "eventTitleTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "snapDraggedEvents", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarDayViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarDayViewComponent.prototype, "eventClicked", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarDayViewComponent.prototype, "eventTimesChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarDayViewComponent.prototype, "beforeViewRender", void 0);
    CalendarDayViewComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-day-view',
            template: "\n    <mwl-calendar-week-view\n      class=\"cal-day-view\"\n      [daysInWeek]=\"1\"\n      [viewDate]=\"viewDate\"\n      [events]=\"events\"\n      [hourSegments]=\"hourSegments\"\n      [hourSegmentHeight]=\"hourSegmentHeight\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayStartMinute]=\"dayStartMinute\"\n      [dayEndHour]=\"dayEndHour\"\n      [dayEndMinute]=\"dayEndMinute\"\n      [refresh]=\"refresh\"\n      [locale]=\"locale\"\n      [eventSnapSize]=\"eventSnapSize\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipAppendToBody]=\"tooltipAppendToBody\"\n      [tooltipDelay]=\"tooltipDelay\"\n      [hourSegmentTemplate]=\"hourSegmentTemplate\"\n      [eventTemplate]=\"eventTemplate\"\n      [eventTitleTemplate]=\"eventTitleTemplate\"\n      [eventActionsTemplate]=\"eventActionsTemplate\"\n      [snapDraggedEvents]=\"snapDraggedEvents\"\n      [allDayEventsLabelTemplate]=\"allDayEventsLabelTemplate\"\n      [currentTimeMarkerTemplate]=\"currentTimeMarkerTemplate\"\n      (eventClicked)=\"eventClicked.emit($event)\"\n      (hourSegmentClicked)=\"hourSegmentClicked.emit($event)\"\n      (eventTimesChanged)=\"eventTimesChanged.emit($event)\"\n      (beforeViewRender)=\"beforeViewRender.emit($event)\"\n    ></mwl-calendar-week-view>\n  "
        })
    ], CalendarDayViewComponent);
    return CalendarDayViewComponent;
}());
export { CalendarDayViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXkvY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBU3ZCOzs7Ozs7Ozs7R0FTRztBQW9DSDtJQW5DQTtRQXlDRTs7O1dBR0c7UUFDTSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUV0Qzs7V0FFRztRQUNNLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRWxDOztXQUVHO1FBQ00sc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBRXhDOztXQUVHO1FBQ00saUJBQVksR0FBVyxDQUFDLENBQUM7UUFFbEM7O1dBRUc7UUFDTSxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUVwQzs7V0FFRztRQUNNLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFakM7O1dBRUc7UUFDTSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQWlCbkM7O1dBRUc7UUFDTSxxQkFBZ0IsR0FBbUIsTUFBTSxDQUFDO1FBT25EOztXQUVHO1FBQ00sd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBRTdDOzs7V0FHRztRQUNNLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQXNCNUM7O1dBRUc7UUFDTSxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFZM0M7O1dBRUc7UUFDTyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUVyQyxDQUFDO1FBRUw7O1dBRUc7UUFDTyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFFM0MsQ0FBQztRQUVMOztXQUVHO1FBQ08sc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBRTNDLENBQUM7UUFFSjs7O1dBR0c7UUFDTyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFFMUMsQ0FBQztJQUNOLENBQUM7SUF6SVU7UUFBUixLQUFLLEVBQUU7OERBQWdCO0lBTWY7UUFBUixLQUFLLEVBQUU7NERBQThCO0lBSzdCO1FBQVIsS0FBSyxFQUFFO2tFQUEwQjtJQUt6QjtRQUFSLEtBQUssRUFBRTt1RUFBZ0M7SUFLL0I7UUFBUixLQUFLLEVBQUU7a0VBQTBCO0lBS3pCO1FBQVIsS0FBSyxFQUFFO29FQUE0QjtJQUszQjtRQUFSLEtBQUssRUFBRTtnRUFBeUI7SUFLeEI7UUFBUixLQUFLLEVBQUU7a0VBQTJCO0lBSzFCO1FBQVIsS0FBSyxFQUFFOzZEQUF1QjtJQUt0QjtRQUFSLEtBQUssRUFBRTs0REFBZ0I7SUFLZjtRQUFSLEtBQUssRUFBRTttRUFBdUI7SUFLdEI7UUFBUixLQUFLLEVBQUU7c0VBQTJDO0lBSzFDO1FBQVIsS0FBSyxFQUFFO3FFQUFtQztJQUtsQztRQUFSLEtBQUssRUFBRTt5RUFBcUM7SUFNcEM7UUFBUixLQUFLLEVBQUU7a0VBQW9DO0lBS25DO1FBQVIsS0FBSyxFQUFFO3lFQUF1QztJQUt0QztRQUFSLEtBQUssRUFBRTttRUFBaUM7SUFLaEM7UUFBUixLQUFLLEVBQUU7d0VBQXNDO0lBS3JDO1FBQVIsS0FBSyxFQUFFOzBFQUF3QztJQUt2QztRQUFSLEtBQUssRUFBRTt1RUFBbUM7SUFLbEM7UUFBUixLQUFLLEVBQUU7K0VBQTZDO0lBSzVDO1FBQVIsS0FBSyxFQUFFOytFQUE2QztJQUszQztRQUFULE1BQU0sRUFBRTtrRUFFSjtJQUtLO1FBQVQsTUFBTSxFQUFFO3dFQUVKO0lBS0s7UUFBVCxNQUFNLEVBQUU7dUVBRUw7SUFNTTtRQUFULE1BQU0sRUFBRTtzRUFFTDtJQTVJTyx3QkFBd0I7UUFuQ3BDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLDJ5Q0ErQlQ7U0FDRixDQUFDO09BQ1csd0JBQXdCLENBNklwQztJQUFELCtCQUFDO0NBQUEsQUE3SUQsSUE2SUM7U0E3SVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudCB9IGZyb20gJy4uL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudCA9IENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudDtcblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gZGF5LiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItZGF5LXZpZXdcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XG4gKiA8L213bC1jYWxlbmRhci1kYXktdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZGF5LXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XG4gICAgICBjbGFzcz1cImNhbC1kYXktdmlld1wiXG4gICAgICBbZGF5c0luV2Vla109XCIxXCJcbiAgICAgIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXG4gICAgICBbaG91clNlZ21lbnRzXT1cImhvdXJTZWdtZW50c1wiXG4gICAgICBbaG91clNlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgW2RheVN0YXJ0SG91cl09XCJkYXlTdGFydEhvdXJcIlxuICAgICAgW2RheVN0YXJ0TWludXRlXT1cImRheVN0YXJ0TWludXRlXCJcbiAgICAgIFtkYXlFbmRIb3VyXT1cImRheUVuZEhvdXJcIlxuICAgICAgW2RheUVuZE1pbnV0ZV09XCJkYXlFbmRNaW51dGVcIlxuICAgICAgW3JlZnJlc2hdPVwicmVmcmVzaFwiXG4gICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICBbZXZlbnRTbmFwU2l6ZV09XCJldmVudFNuYXBTaXplXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICBbaG91clNlZ21lbnRUZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgIFtldmVudFRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgIFtzbmFwRHJhZ2dlZEV2ZW50c109XCJzbmFwRHJhZ2dlZEV2ZW50c1wiXG4gICAgICBbYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZV09XCJhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlXCJcbiAgICAgIFtjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlXT1cImN1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGVcIlxuICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChob3VyU2VnbWVudENsaWNrZWQpPVwiaG91clNlZ21lbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoZXZlbnRUaW1lc0NoYW5nZWQpPVwiZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChiZWZvcmVWaWV3UmVuZGVyKT1cImJlZm9yZVZpZXdSZW5kZXIuZW1pdCgkZXZlbnQpXCJcbiAgICA+PC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgdG8gc25hcCByZXNpemluZyBhbmQgZHJhZ2dpbmcgb2YgZXZlbnRzIHRvXG4gICAqL1xuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBzbmFwIGV2ZW50cyB0byBhIGdyaWQgd2hlbiBkcmFnZ2luZ1xuICAgKi9cbiAgQElucHV0KCkgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBjdXJyZW50IHRpbWUgbWFya2VyXG4gICAqL1xuICBASW5wdXQoKSBjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF0ZTogRGF0ZTtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KCkgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFxuICA+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgZGF5LlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGFuIGhvdXIgZ3JpZCBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKSBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudFxuICA+KCk7XG59XG4iXX0=