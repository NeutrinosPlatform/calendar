import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
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
        <mwl-calendar-event-actions
            [event]="weekEvent.event"
            [customTemplate]="eventActionsTemplate"
          >
        </mwl-calendar-event-actions> 
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
// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBd0UvRSxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQTZCekMsWUFBbUIsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztJQUlMLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YsQ0FBQTs7WUFWeUMsbUJBQW1COztBQTVCbEQ7SUFBUixLQUFLLEVBQUU7OERBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7aUVBQW9EO0FBRW5EO0lBQVIsS0FBSyxFQUFFO3dFQUFrQztBQUVqQztJQUFSLEtBQUssRUFBRTsyRUFBOEI7QUFFN0I7SUFBUixLQUFLLEVBQUU7dUVBQTBCO0FBRXpCO0lBQVIsS0FBSyxFQUFFO29FQUE2QjtBQUU1QjtJQUFSLEtBQUssRUFBRTtzRUFBa0M7QUFFakM7SUFBUixLQUFLLEVBQUU7MEVBQXNDO0FBRXJDO0lBQVIsS0FBSyxFQUFFOzRFQUF3QztBQUV2QztJQUFSLEtBQUssRUFBRTt1RUFBbUM7QUFFbEM7SUFBUixLQUFLLEVBQUU7OERBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFO2tFQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTtvRUFFSjtBQTNCTSw4QkFBOEI7SUF0RTFDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw4QkFBOEI7UUFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRVQ7S0FDRixDQUFDO0dBQ1csOEJBQThCLENBdUMxQztTQXZDWSw4QkFBOEI7QUF5QzNDLHNCQUFzQjtBQUN0Qiw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFdlZWtWaWV3VGltZUV2ZW50LFxuICBXZWVrVmlld0hvdXJDb2x1bW5cbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXdlZWtFdmVudD1cIndlZWtFdmVudFwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICBsZXQtdG9vbHRpcERpc2FibGVkPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICBsZXQtZGF5c0luV2Vlaz1cImRheXNJbldlZWtcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB3ZWVrRXZlbnQuZXZlbnQuY29sb3I/LnNlY29uZGFyeSwnYm9yZGVyLWxlZnQnOiAnNXB4IHNvbGlkJyxcbiAgICAgICAgICAnYm9yZGVyQ29sb3InOiAnIzg2N2ZmMidcbiAgICAgICAgfVwiXG4gICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXG4gICAgICAgICAgIXRvb2x0aXBEaXNhYmxlZFxuICAgICAgICAgICAgPyAod2Vla0V2ZW50LmV2ZW50LnRpdGxlXG4gICAgICAgICAgICAgIHwgY2FsZW5kYXJFdmVudFRpdGxlXG4gICAgICAgICAgICAgICAgOiAoZGF5c0luV2VlayA9PT0gMSA/ICdkYXlUb29sdGlwJyA6ICd3ZWVrVG9vbHRpcCcpXG4gICAgICAgICAgICAgICAgOiB3ZWVrRXZlbnQuZXZlbnQpXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgIFwiXG4gICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICBbdG9vbHRpcEV2ZW50XT1cIndlZWtFdmVudC5ldmVudFwiXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcbiAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgIChtd2xLZXlkb3duRW50ZXIpPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgcm9sZT1cImFwcGxpY2F0aW9uXCJcbiAgICAgICAgKGNsaWNrKSA9IFwib25FdmVudENsaWNrKHdlZWtFdmVudC5ldmVudClcIlxuICAgICAgPlxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnNcbiAgICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICA+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+IFxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgW2V2ZW50XT1cIndlZWtFdmVudC5ldmVudFwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgW3ZpZXddPVwiZGF5c0luV2VlayA9PT0gMSA/ICdkYXknIDogJ3dlZWsnXCJcbiAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgd2Vla0V2ZW50OiB3ZWVrRXZlbnQsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keSxcbiAgICAgICAgdG9vbHRpcERpc2FibGVkOiB0b29sdGlwRGlzYWJsZWQsXG4gICAgICAgIHRvb2x0aXBEZWxheTogdG9vbHRpcERlbGF5LFxuICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgZGF5c0luV2VlazogZGF5c0luV2Vla1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQ7XG5cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgY29sdW1uOiBXZWVrVmlld0hvdXJDb2x1bW47XG5cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIH0+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGV2ZW50RW1pdHRlclNlcnZpY2U6IEV2ZW50RW1pdHRlclNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkV2ZW50Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdFRElUX0VWRU5UX0NMSUNLRUQnLCBldmVudCk7XG4gIH1cbn1cblxuLy8gW2F0dHIuYXJpYS1sYWJlbF09XCJcbi8vIHsgZXZlbnQ6IHdlZWtFdmVudC5ldmVudCwgbG9jYWxlOiBsb2NhbGUgfVxuLy8gICB8IGNhbGVuZGFyQTExeTogJ2V2ZW50RGVzY3JpcHRpb24nXG4vLyBcIlxuIl19