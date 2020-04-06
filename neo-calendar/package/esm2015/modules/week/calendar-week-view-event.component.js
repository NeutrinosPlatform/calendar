import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let CalendarWeekViewEventComponent = class CalendarWeekViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
};
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
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary
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
        [attr.aria-label]="
          { event: weekEvent.event, locale: locale }
            | calendarA11y: 'eventDescription'
        "
      >
        <mwl-calendar-event-actions
          [event]="weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        >
        </mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          [view]="daysInWeek === 1 ? 'day' : 'week'"
        >
        </mwl-calendar-event-title>
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
export { CalendarWeekViewEventComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBa0Z2QixJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQTFFM0M7UUFtR1ksaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztJQUNQLENBQUM7Q0FBQSxDQUFBO0FBM0JVO0lBQVIsS0FBSyxFQUFFOzhEQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFO2lFQUFvRDtBQUVuRDtJQUFSLEtBQUssRUFBRTt3RUFBa0M7QUFFakM7SUFBUixLQUFLLEVBQUU7MkVBQThCO0FBRTdCO0lBQVIsS0FBSyxFQUFFO3VFQUEwQjtBQUV6QjtJQUFSLEtBQUssRUFBRTtvRUFBNkI7QUFFNUI7SUFBUixLQUFLLEVBQUU7c0VBQWtDO0FBRWpDO0lBQVIsS0FBSyxFQUFFOzBFQUFzQztBQUVyQztJQUFSLEtBQUssRUFBRTs0RUFBd0M7QUFFdkM7SUFBUixLQUFLLEVBQUU7dUVBQW1DO0FBRWxDO0lBQVIsS0FBSyxFQUFFOzhEQUE0QjtBQUUzQjtJQUFSLEtBQUssRUFBRTtrRUFBb0I7QUFFbEI7SUFBVCxNQUFNLEVBQUU7b0VBRUo7QUEzQk0sOEJBQThCO0lBMUUxQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsOEJBQThCO1FBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFVDtLQUNGLENBQUM7R0FDVyw4QkFBOEIsQ0E0QjFDO1NBNUJZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFdlZWtWaWV3VGltZUV2ZW50LFxuICBXZWVrVmlld0hvdXJDb2x1bW5cbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXdlZWtFdmVudD1cIndlZWtFdmVudFwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICBsZXQtdG9vbHRpcERpc2FibGVkPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICBsZXQtZGF5c0luV2Vlaz1cImRheXNJbldlZWtcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB3ZWVrRXZlbnQuZXZlbnQuY29sb3I/LnNlY29uZGFyeSxcbiAgICAgICAgICBib3JkZXJDb2xvcjogd2Vla0V2ZW50LmV2ZW50LmNvbG9yPy5wcmltYXJ5XG4gICAgICAgIH1cIlxuICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cIlxuICAgICAgICAgICF0b29sdGlwRGlzYWJsZWRcbiAgICAgICAgICAgID8gKHdlZWtFdmVudC5ldmVudC50aXRsZVxuICAgICAgICAgICAgICB8IGNhbGVuZGFyRXZlbnRUaXRsZVxuICAgICAgICAgICAgICAgIDogKGRheXNJbldlZWsgPT09IDEgPyAnZGF5VG9vbHRpcCcgOiAnd2Vla1Rvb2x0aXAnKVxuICAgICAgICAgICAgICAgIDogd2Vla0V2ZW50LmV2ZW50KVxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICBcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIHJvbGU9XCJhcHBsaWNhdGlvblwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgeyBldmVudDogd2Vla0V2ZW50LmV2ZW50LCBsb2NhbGU6IGxvY2FsZSB9XG4gICAgICAgICAgICB8IGNhbGVuZGFyQTExeTogJ2V2ZW50RGVzY3JpcHRpb24nXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9uc1xuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbdmlld109XCJkYXlzSW5XZWVrID09PSAxID8gJ2RheScgOiAnd2VlaydcIlxuICAgICAgICA+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICB3ZWVrRXZlbnQ6IHdlZWtFdmVudCxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5LFxuICAgICAgICB0b29sdGlwRGlzYWJsZWQ6IHRvb2x0aXBEaXNhYmxlZCxcbiAgICAgICAgdG9vbHRpcERlbGF5OiB0b29sdGlwRGVsYXksXG4gICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICBkYXlzSW5XZWVrOiBkYXlzSW5XZWVrXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnQge1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudDtcblxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGw7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbjtcblxuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgfT4oKTtcbn1cbiJdfQ==