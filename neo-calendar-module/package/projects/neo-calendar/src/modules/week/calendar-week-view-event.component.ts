import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  WeekViewAllDayEvent,
  WeekViewTimeEvent,
  WeekViewHourColumn
} from 'calendar-utils';
import { PlacementArray } from 'positioning';
import { EventEmitterService } from '../common/calendar-event-emitter.service';

@Component({
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
export class CalendarWeekViewEventComponent implements OnInit {
  @Input() locale: string;

  @Input() weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent;

  @Input() tooltipPlacement: PlacementArray;

  @Input() tooltipAppendToBody: boolean;

  @Input() tooltipDisabled: boolean;

  @Input() tooltipDelay: number | null;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() eventActionsTemplate: TemplateRef<any>;

  @Input() tooltipTemplate: TemplateRef<any>;

  @Input() column: WeekViewHourColumn;

  @Input() daysInWeek: number;

  @Output() eventClicked = new EventEmitter<{
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  constructor(public eventEmitterService: EventEmitterService) {

  }

  ngOnInit() {
  }

  onEventClick(event) {
    this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
  }
}

// [attr.aria-label]="
// { event: weekEvent.event, locale: locale }
//   | calendarA11y: 'eventDescription'
// "
