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
export { CalendarWeekViewEventComponent };
// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBb0UvRSxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQTZCekMsWUFBbUIsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztJQUlMLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YsQ0FBQTs7WUFWeUMsbUJBQW1COztBQTVCbEQ7SUFBUixLQUFLLEVBQUU7OERBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7aUVBQW9EO0FBRW5EO0lBQVIsS0FBSyxFQUFFO3dFQUFrQztBQUVqQztJQUFSLEtBQUssRUFBRTsyRUFBOEI7QUFFN0I7SUFBUixLQUFLLEVBQUU7dUVBQTBCO0FBRXpCO0lBQVIsS0FBSyxFQUFFO29FQUE2QjtBQUU1QjtJQUFSLEtBQUssRUFBRTtzRUFBa0M7QUFFakM7SUFBUixLQUFLLEVBQUU7MEVBQXNDO0FBRXJDO0lBQVIsS0FBSyxFQUFFOzRFQUF3QztBQUV2QztJQUFSLEtBQUssRUFBRTt1RUFBbUM7QUFFbEM7SUFBUixLQUFLLEVBQUU7OERBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFO2tFQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTtvRUFFSjtBQTNCTSw4QkFBOEI7SUFsRTFDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw4QkFBOEI7UUFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThEVDtLQUNGLENBQUM7R0FDVyw4QkFBOEIsQ0F1QzFDO1NBdkNZLDhCQUE4QjtBQXlDM0Msc0JBQXNCO0FBQ3RCLDZDQUE2QztBQUM3Qyx1Q0FBdUM7QUFDdkMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCxcbiAgV2Vla1ZpZXdUaW1lRXZlbnQsXG4gIFdlZWtWaWV3SG91ckNvbHVtblxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtd2Vla0V2ZW50PVwid2Vla0V2ZW50XCJcbiAgICAgIGxldC10b29sdGlwUGxhY2VtZW50PVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgIGxldC10b29sdGlwRGlzYWJsZWQ9XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgbGV0LXRvb2x0aXBEZWxheT1cInRvb2x0aXBEZWxheVwiXG4gICAgICBsZXQtY29sdW1uPVwiY29sdW1uXCJcbiAgICAgIGxldC1kYXlzSW5XZWVrPVwiZGF5c0luV2Vla1wiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5LCdib3JkZXItbGVmdCc6ICc1cHggc29saWQnLFxuICAgICAgICAgICdib3JkZXJDb2xvcic6ICcjODY3ZmYyJ1xuICAgICAgICB9XCJcbiAgICAgICAgW213bENhbGVuZGFyVG9vbHRpcF09XCJcbiAgICAgICAgICAhdG9vbHRpcERpc2FibGVkXG4gICAgICAgICAgICA/ICh3ZWVrRXZlbnQuZXZlbnQudGl0bGVcbiAgICAgICAgICAgICAgfCBjYWxlbmRhckV2ZW50VGl0bGVcbiAgICAgICAgICAgICAgICA6IChkYXlzSW5XZWVrID09PSAxID8gJ2RheVRvb2x0aXAnIDogJ3dlZWtUb29sdGlwJylcbiAgICAgICAgICAgICAgICA6IHdlZWtFdmVudC5ldmVudClcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgIFt0b29sdGlwRXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcbiAgICAgICAgKG13bEtleWRvd25FbnRlcik9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxuICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICByb2xlPVwiYXBwbGljYXRpb25cIlxuICAgICAgICAoY2xpY2spID0gXCJvbkV2ZW50Q2xpY2sod2Vla0V2ZW50LmV2ZW50KVwiXG4gICAgICA+XG4gICAgICA8cCBjbGFzcz1cIndlZWstZXZlbnQtdGl0bGVcIj57e3dlZWtFdmVudC5ldmVudC5zdGFydCB8IGRhdGU6J3Nob3J0VGltZSd9fTwvcD5cbiAgICAgIDxwIGNsYXNzPVwid2Vlay1ldmVudC10aXRsZVwiPnt7d2Vla0V2ZW50LmV2ZW50LnRpdGxlfX08L3A+XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9uc1xuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgd2Vla0V2ZW50OiB3ZWVrRXZlbnQsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keSxcbiAgICAgICAgdG9vbHRpcERpc2FibGVkOiB0b29sdGlwRGlzYWJsZWQsXG4gICAgICAgIHRvb2x0aXBEZWxheTogdG9vbHRpcERlbGF5LFxuICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgZGF5c0luV2VlazogZGF5c0luV2Vla1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQ7XG5cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgY29sdW1uOiBXZWVrVmlld0hvdXJDb2x1bW47XG5cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIH0+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGV2ZW50RW1pdHRlclNlcnZpY2U6IEV2ZW50RW1pdHRlclNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkV2ZW50Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdFRElUX0VWRU5UX0NMSUNLRUQnLCBldmVudCk7XG4gIH1cbn1cblxuLy8gW2F0dHIuYXJpYS1sYWJlbF09XCJcbi8vIHsgZXZlbnQ6IHdlZWtFdmVudC5ldmVudCwgbG9jYWxlOiBsb2NhbGUgfVxuLy8gICB8IGNhbGVuZGFyQTExeTogJ2V2ZW50RGVzY3JpcHRpb24nXG4vLyBcIlxuIl19