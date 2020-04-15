import { Component, Input, TemplateRef, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="event-title"
        [innerHTML]="event.title | calendarEventTitle: view:event"
        [attr.aria-hidden]="{} | calendarA11y: 'hideEventTitle'"
      >
      </span>
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
export class CalendarEventTitleComponent implements OnInit{
 
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() view: string;

  ngOnInit(): void {
  }
}
