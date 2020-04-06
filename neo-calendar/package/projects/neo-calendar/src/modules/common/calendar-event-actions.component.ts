import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent, EventAction } from 'calendar-utils';
import { EventEmitterService } from './calendar-event-emitter.service'

@Component({
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
export class CalendarEventActionsComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  constructor(public eventEmitterService: EventEmitterService){

  }

  trackByActionId = (index: number, action: EventAction) =>
    action.id ? action.id : action;

  onEventClick(event, action){
    if(action === 'EDIT') {
      this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    }else if(action === 'DELETE') {
      this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', event);
    }
  }
}
