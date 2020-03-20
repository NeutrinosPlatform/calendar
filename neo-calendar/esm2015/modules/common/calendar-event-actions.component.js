import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EventEmitterService } from './calendar-event-emitter.service';
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
tslib_1.__decorate([
    Input()
], CalendarEventActionsComponent.prototype, "event", void 0);
tslib_1.__decorate([
    Input()
], CalendarEventActionsComponent.prototype, "customTemplate", void 0);
CalendarEventActionsComponent = tslib_1.__decorate([
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
export { CalendarEventActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUF3Q3RFLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBS3hDLFlBQW1CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSTNELG9CQUFlLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBbUIsRUFBRSxFQUFFLENBQ3ZELE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUhqQyxDQUFDO0lBS0QsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNO1FBQ3hCLElBQUcsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUU7YUFBSyxJQUFHLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVFO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBZHlDLG1CQUFtQjs7QUFKbEQ7SUFBUixLQUFLLEVBQUU7NERBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFO3FFQUFrQztBQUgvQiw2QkFBNkI7SUF0Q3pDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUO0tBQ0YsQ0FBQztHQUNXLDZCQUE2QixDQW1CekM7U0FuQlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIEV2ZW50QWN0aW9uIH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXG4gICAgICBsZXQtdHJhY2tCeUFjdGlvbklkPVwidHJhY2tCeUFjdGlvbklkXCJcbiAgICA+XG4gICAgICA8c3BhbiAqbmdJZj1cImV2ZW50LmFjdGlvbnNcIiBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25zXCI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uIG1hdGVyaWFsLWljb25zXCJcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGV2ZW50LmFjdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlBY3Rpb25JZFwiXG4gICAgICAgICAgKG13bENsaWNrKT1cImFjdGlvbi5vbkNsaWNrKHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pOyBvbkV2ZW50Q2xpY2soZXZlbnQsIGFjdGlvbi5hMTF5TGFiZWwpIFwiXG4gICAgICAgICAgKG13bEtleWRvd25FbnRlcik9XCJcbiAgICAgICAgICAgIGFjdGlvbi5vbkNsaWNrKHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXG4gICAgICAgICAgXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJhY3Rpb24uY3NzQ2xhc3NcIlxuICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAgIHsgYWN0aW9uOiBhY3Rpb24gfSB8IGNhbGVuZGFyQTExeTogJ2FjdGlvbkJ1dHRvbkxhYmVsJ1xuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAge3thY3Rpb24ubGFiZWx9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIHRyYWNrQnlBY3Rpb25JZDogdHJhY2tCeUFjdGlvbklkXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50QWN0aW9uc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlKXtcblxuICB9XG5cbiAgdHJhY2tCeUFjdGlvbklkID0gKGluZGV4OiBudW1iZXIsIGFjdGlvbjogRXZlbnRBY3Rpb24pID0+XG4gICAgYWN0aW9uLmlkID8gYWN0aW9uLmlkIDogYWN0aW9uO1xuXG4gIG9uRXZlbnRDbGljayhldmVudCwgYWN0aW9uKXtcbiAgICBpZihhY3Rpb24gPT09ICdFRElUJykge1xuICAgICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXROYXZDaGFuZ2VFdmVudCgnRURJVF9FVkVOVF9DTElDS0VEJywgZXZlbnQpO1xuICAgIH1lbHNlIGlmKGFjdGlvbiA9PT0gJ0RFTEVURScpIHtcbiAgICAgIHRoaXMuZXZlbnRFbWl0dGVyU2VydmljZS5lbWl0TmF2Q2hhbmdlRXZlbnQoJ0RFTEVURV9FVkVOVF9DTElDS0VEJywgZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19