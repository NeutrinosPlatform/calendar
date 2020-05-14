import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let CalendarEventTitleComponent = class CalendarEventTitleComponent {
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "event", void 0);
tslib_1.__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarEventTitleComponent.prototype, "view", void 0);
CalendarEventTitleComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-event-title',
        template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <p class="week-event-title">{{event.start | date:'shortTime'}}</p>
      <p
        class="week-event-title"
        [innerHTML]="event.title | calendarEventTitle: view:event"
        [attr.aria-hidden]="{} | calendarA11y: 'hideEventTitle'"
      >   
      </p>  
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
export { CalendarEventTitleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsTUFBTSxlQUFlLENBQUM7QUF5QnRFLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBUXRDLFFBQVE7SUFDUixDQUFDO0NBQ0YsQ0FBQTtBQVJVO0lBQVIsS0FBSyxFQUFFOzBEQUFzQjtBQUVyQjtJQUFSLEtBQUssRUFBRTttRUFBa0M7QUFFakM7SUFBUixLQUFLLEVBQUU7eURBQWM7QUFOWCwyQkFBMkI7SUF0QnZDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7S0FDRixDQUFDO0dBQ1csMkJBQTJCLENBVXZDO1NBVlksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZSBsZXQtZXZlbnQ9XCJldmVudFwiIGxldC12aWV3PVwidmlld1wiPlxuICAgICAgPHAgY2xhc3M9XCJ3ZWVrLWV2ZW50LXRpdGxlXCI+e3tldmVudC5zdGFydCB8IGRhdGU6J3Nob3J0VGltZSd9fTwvcD5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzPVwid2Vlay1ldmVudC10aXRsZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6IHZpZXc6ZXZlbnRcIlxuICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ2hpZGVFdmVudFRpdGxlJ1wiXG4gICAgICA+ICAgXG4gICAgICA8L3A+ICBcbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgdmlldzogdmlld1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuIFxuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbn1cbiJdfQ==