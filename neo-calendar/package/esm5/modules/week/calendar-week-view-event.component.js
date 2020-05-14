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
            template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDisabled=\"tooltipDisabled\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-column=\"column\"\n      let-daysInWeek=\"daysInWeek\"\n    >\n      <div\n        class=\"cal-event\"\n        [ngStyle]=\"{\n          backgroundColor: weekEvent.event.color?.secondary,'border-left': '5px solid',\n          'borderColor': '#867ff2'\n        }\"\n        [mwlCalendarTooltip]=\"\n          !tooltipDisabled\n            ? (weekEvent.event.title\n              | calendarEventTitle\n                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')\n                : weekEvent.event)\n            : ''\n        \"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\"\n        [tooltipDelay]=\"tooltipDelay\"\n        (mwlClick)=\"eventClicked.emit({ sourceEvent: $event })\"\n        (mwlKeydownEnter)=\"eventClicked.emit({ sourceEvent: $event })\"\n        tabindex=\"0\"\n        role=\"application\"\n        (click) = \"onEventClick(weekEvent.event)\"\n      >\n        <mwl-calendar-event-actions\n            [event]=\"weekEvent.event\"\n            [customTemplate]=\"eventActionsTemplate\"\n          >\n        </mwl-calendar-event-actions> \n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          [view]=\"daysInWeek === 1 ? 'day' : 'week'\"\n        >\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDisabled: tooltipDisabled,\n        tooltipDelay: tooltipDelay,\n        column: column,\n        daysInWeek: daysInWeek\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewEventComponent);
    return CalendarWeekViewEventComponent;
}());
export { CalendarWeekViewEventComponent };
// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBd0UvRTtJQTZCRSx3Q0FBbUIsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztJQUlMLENBQUM7SUFFRCxpREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHFEQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOztnQkFUdUMsbUJBQW1COztJQTVCbEQ7UUFBUixLQUFLLEVBQUU7a0VBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7cUVBQW9EO0lBRW5EO1FBQVIsS0FBSyxFQUFFOzRFQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTsrRUFBOEI7SUFFN0I7UUFBUixLQUFLLEVBQUU7MkVBQTBCO0lBRXpCO1FBQVIsS0FBSyxFQUFFO3dFQUE2QjtJQUU1QjtRQUFSLEtBQUssRUFBRTswRUFBa0M7SUFFakM7UUFBUixLQUFLLEVBQUU7OEVBQXNDO0lBRXJDO1FBQVIsS0FBSyxFQUFFO2dGQUF3QztJQUV2QztRQUFSLEtBQUssRUFBRTsyRUFBbUM7SUFFbEM7UUFBUixLQUFLLEVBQUU7a0VBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFO3NFQUFvQjtJQUVsQjtRQUFULE1BQU0sRUFBRTt3RUFFSjtJQTNCTSw4QkFBOEI7UUF0RTFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsUUFBUSxFQUFFLCt5RUFrRVQ7U0FDRixDQUFDO09BQ1csOEJBQThCLENBdUMxQztJQUFELHFDQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksOEJBQThCO0FBeUMzQyxzQkFBc0I7QUFDdEIsNkNBQTZDO0FBQzdDLHVDQUF1QztBQUN2QyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBXZWVrVmlld0FsbERheUV2ZW50LFxuICBXZWVrVmlld1RpbWVFdmVudCxcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC1lbWl0dGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC13ZWVrRXZlbnQ9XCJ3ZWVrRXZlbnRcIlxuICAgICAgbGV0LXRvb2x0aXBQbGFjZW1lbnQ9XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgbGV0LXRvb2x0aXBEaXNhYmxlZD1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBsZXQtdG9vbHRpcERlbGF5PVwidG9vbHRpcERlbGF5XCJcbiAgICAgIGxldC1jb2x1bW49XCJjb2x1bW5cIlxuICAgICAgbGV0LWRheXNJbldlZWs9XCJkYXlzSW5XZWVrXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogd2Vla0V2ZW50LmV2ZW50LmNvbG9yPy5zZWNvbmRhcnksJ2JvcmRlci1sZWZ0JzogJzVweCBzb2xpZCcsXG4gICAgICAgICAgJ2JvcmRlckNvbG9yJzogJyM4NjdmZjInXG4gICAgICAgIH1cIlxuICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cIlxuICAgICAgICAgICF0b29sdGlwRGlzYWJsZWRcbiAgICAgICAgICAgID8gKHdlZWtFdmVudC5ldmVudC50aXRsZVxuICAgICAgICAgICAgICB8IGNhbGVuZGFyRXZlbnRUaXRsZVxuICAgICAgICAgICAgICAgIDogKGRheXNJbldlZWsgPT09IDEgPyAnZGF5VG9vbHRpcCcgOiAnd2Vla1Rvb2x0aXAnKVxuICAgICAgICAgICAgICAgIDogd2Vla0V2ZW50LmV2ZW50KVxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICBcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJhcHBsaWNhdGlvblwiXG4gICAgICAgIChjbGljaykgPSBcIm9uRXZlbnRDbGljayh3ZWVrRXZlbnQuZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zXG4gICAgICAgICAgICBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zPiBcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC10aXRsZVxuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgIFt2aWV3XT1cImRheXNJbldlZWsgPT09IDEgPyAnZGF5JyA6ICd3ZWVrJ1wiXG4gICAgICAgID5cbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHdlZWtFdmVudDogd2Vla0V2ZW50LFxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXG4gICAgICAgIHRvb2x0aXBBcHBlbmRUb0JvZHk6IHRvb2x0aXBBcHBlbmRUb0JvZHksXG4gICAgICAgIHRvb2x0aXBEaXNhYmxlZDogdG9vbHRpcERpc2FibGVkLFxuICAgICAgICB0b29sdGlwRGVsYXk6IHRvb2x0aXBEZWxheSxcbiAgICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICAgIGRheXNJbldlZWs6IGRheXNJbldlZWtcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCB8IFdlZWtWaWV3VGltZUV2ZW50O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGNvbHVtbjogV2Vla1ZpZXdIb3VyQ29sdW1uO1xuXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25FdmVudENsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXROYXZDaGFuZ2VFdmVudCgnRURJVF9FVkVOVF9DTElDS0VEJywgZXZlbnQpO1xuICB9XG59XG5cbi8vIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4vLyB7IGV2ZW50OiB3ZWVrRXZlbnQuZXZlbnQsIGxvY2FsZTogbG9jYWxlIH1cbi8vICAgfCBjYWxlbmRhckExMXk6ICdldmVudERlc2NyaXB0aW9uJ1xuLy8gXCJcbiJdfQ==