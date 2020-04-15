import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
var CalendarWeekViewEventComponent = /** @class */ (function () {
    function CalendarWeekViewEventComponent(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.eventClicked = new EventEmitter();
    }
    CalendarWeekViewEventComponent.prototype.ngOnInit = function () {
    };
    CalendarWeekViewEventComponent.prototype.onEventClick = function (event) {
        this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    };
    CalendarWeekViewEventComponent.ctorParameters = function () { return [
        { type: EventEmitterService }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "weekEvent", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "eventTitleTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "column", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarWeekViewEventComponent.prototype, "daysInWeek", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarWeekViewEventComponent.prototype, "eventClicked", void 0);
    CalendarWeekViewEventComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-week-view-event',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDisabled=\"tooltipDisabled\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-column=\"column\"\n      let-daysInWeek=\"daysInWeek\"\n    >\n      <div\n        class=\"cal-event\"\n        [ngStyle]=\"{\n          backgroundColor: weekEvent.event.color?.secondary,'border-left': '5px solid',\n          'borderColor': '#867ff2'\n        }\"\n        [mwlCalendarTooltip]=\"\n          !tooltipDisabled\n            ? (weekEvent.event.title\n              | calendarEventTitle\n                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')\n                : weekEvent.event)\n            : ''\n        \"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\"\n        [tooltipDelay]=\"tooltipDelay\"\n        (mwlClick)=\"eventClicked.emit({ sourceEvent: $event })\"\n        (mwlKeydownEnter)=\"eventClicked.emit({ sourceEvent: $event })\"\n        tabindex=\"0\"\n        role=\"application\"\n        (click) = \"onEventClick(weekEvent.event)\"\n      >\n      <p class=\"week-event-title\">{{weekEvent.event.start | date:'shortTime'}}</p>\n      <p class=\"week-event-title\">{{weekEvent.event.title}}</p>\n        <mwl-calendar-event-actions\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventActionsTemplate\"\n        >\n        </mwl-calendar-event-actions>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDisabled: tooltipDisabled,\n        tooltipDelay: tooltipDelay,\n        column: column,\n        daysInWeek: daysInWeek\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewEventComponent);
    return CalendarWeekViewEventComponent;
}());
export { CalendarWeekViewEventComponent };
// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBb0UvRTtJQTZCRSx3Q0FBbUIsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztJQUlMLENBQUM7SUFFRCxpREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHFEQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOztnQkFUdUMsbUJBQW1COztJQTVCbEQ7UUFBUixLQUFLLEVBQUU7a0VBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7cUVBQW9EO0lBRW5EO1FBQVIsS0FBSyxFQUFFOzRFQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTsrRUFBOEI7SUFFN0I7UUFBUixLQUFLLEVBQUU7MkVBQTBCO0lBRXpCO1FBQVIsS0FBSyxFQUFFO3dFQUE2QjtJQUU1QjtRQUFSLEtBQUssRUFBRTswRUFBa0M7SUFFakM7UUFBUixLQUFLLEVBQUU7OEVBQXNDO0lBRXJDO1FBQVIsS0FBSyxFQUFFO2dGQUF3QztJQUV2QztRQUFSLEtBQUssRUFBRTsyRUFBbUM7SUFFbEM7UUFBUixLQUFLLEVBQUU7a0VBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFO3NFQUFvQjtJQUVsQjtRQUFULE1BQU0sRUFBRTt3RUFFSjtJQTNCTSw4QkFBOEI7UUFsRTFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsUUFBUSxFQUFFLDR0RUE4RFQ7U0FDRixDQUFDO09BQ1csOEJBQThCLENBdUMxQztJQUFELHFDQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksOEJBQThCO0FBeUMzQyxzQkFBc0I7QUFDdEIsNkNBQTZDO0FBQzdDLHVDQUF1QztBQUN2QyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBXZWVrVmlld0FsbERheUV2ZW50LFxuICBXZWVrVmlld1RpbWVFdmVudCxcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC1lbWl0dGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC13ZWVrRXZlbnQ9XCJ3ZWVrRXZlbnRcIlxuICAgICAgbGV0LXRvb2x0aXBQbGFjZW1lbnQ9XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgbGV0LXRvb2x0aXBEaXNhYmxlZD1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBsZXQtdG9vbHRpcERlbGF5PVwidG9vbHRpcERlbGF5XCJcbiAgICAgIGxldC1jb2x1bW49XCJjb2x1bW5cIlxuICAgICAgbGV0LWRheXNJbldlZWs9XCJkYXlzSW5XZWVrXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogd2Vla0V2ZW50LmV2ZW50LmNvbG9yPy5zZWNvbmRhcnksJ2JvcmRlci1sZWZ0JzogJzVweCBzb2xpZCcsXG4gICAgICAgICAgJ2JvcmRlckNvbG9yJzogJyM4NjdmZjInXG4gICAgICAgIH1cIlxuICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cIlxuICAgICAgICAgICF0b29sdGlwRGlzYWJsZWRcbiAgICAgICAgICAgID8gKHdlZWtFdmVudC5ldmVudC50aXRsZVxuICAgICAgICAgICAgICB8IGNhbGVuZGFyRXZlbnRUaXRsZVxuICAgICAgICAgICAgICAgIDogKGRheXNJbldlZWsgPT09IDEgPyAnZGF5VG9vbHRpcCcgOiAnd2Vla1Rvb2x0aXAnKVxuICAgICAgICAgICAgICAgIDogd2Vla0V2ZW50LmV2ZW50KVxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICBcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJhcHBsaWNhdGlvblwiXG4gICAgICAgIChjbGljaykgPSBcIm9uRXZlbnRDbGljayh3ZWVrRXZlbnQuZXZlbnQpXCJcbiAgICAgID5cbiAgICAgIDxwIGNsYXNzPVwid2Vlay1ldmVudC10aXRsZVwiPnt7d2Vla0V2ZW50LmV2ZW50LnN0YXJ0IHwgZGF0ZTonc2hvcnRUaW1lJ319PC9wPlxuICAgICAgPHAgY2xhc3M9XCJ3ZWVrLWV2ZW50LXRpdGxlXCI+e3t3ZWVrRXZlbnQuZXZlbnQudGl0bGV9fTwvcD5cbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zXG4gICAgICAgICAgW2V2ZW50XT1cIndlZWtFdmVudC5ldmVudFwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICB3ZWVrRXZlbnQ6IHdlZWtFdmVudCxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5LFxuICAgICAgICB0b29sdGlwRGlzYWJsZWQ6IHRvb2x0aXBEaXNhYmxlZCxcbiAgICAgICAgdG9vbHRpcERlbGF5OiB0b29sdGlwRGVsYXksXG4gICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICBkYXlzSW5XZWVrOiBkYXlzSW5XZWVrXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudDtcblxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGw7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbjtcblxuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgfT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uRXZlbnRDbGljayhldmVudCkge1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyU2VydmljZS5lbWl0TmF2Q2hhbmdlRXZlbnQoJ0VESVRfRVZFTlRfQ0xJQ0tFRCcsIGV2ZW50KTtcbiAgfVxufVxuXG4vLyBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuLy8geyBldmVudDogd2Vla0V2ZW50LmV2ZW50LCBsb2NhbGU6IGxvY2FsZSB9XG4vLyAgIHwgY2FsZW5kYXJBMTF5OiAnZXZlbnREZXNjcmlwdGlvbidcbi8vIFwiXG4iXX0=