import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isWithinThreshold, trackByEventId } from '../common/util';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
let CalendarMonthCellComponent = class CalendarMonthCellComponent {
    constructor(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
    onEventClick(event) {
        this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
    }
};
CalendarMonthCellComponent.ctorParameters = () => [
    { type: EventEmitterService }
];
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "day", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "openDay", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipAppendToBody", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "tooltipDelay", void 0);
tslib_1.__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
tslib_1.__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
tslib_1.__decorate([
    Input()
], CalendarMonthCellComponent.prototype, "eventActionsTemplate", void 0);
tslib_1.__decorate([
    Output()
], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
CalendarMonthCellComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-month-cell',
        template: `
    <ng-template
      #defaultTemplate
      let-day="day"
      let-openDay="openDay"
      let-locale="locale"
      let-tooltipPlacement="tooltipPlacement"
      let-highlightDay="highlightDay"
      let-unhighlightDay="unhighlightDay"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDelay="tooltipDelay"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-cell-top"
        id="date-cell"
        [attr.aria-label]="
          { day: day, locale: locale } | calendarA11y: 'monthCell'
        "
      >
        <span aria-hidden="true">
          <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{
            day.badgeTotal
          }}</span>
          <span class="cal-day-number" id="day-number-view">{{
            day.date | calendarDate: 'monthViewDayNumber':locale
          }}</span>
        </span>
      </div>
      <div class="cal-events" *ngIf="day.events.length > 0">
        <div
          class="cal-event"
          *ngFor="let event of day.events; trackBy: trackByEventId"
          [ngStyle]="{'width': 100 + '%','height': 61 + 'px', 'border-radius': 0 + 'px','background-color': '#dcf8e9','display': 'flex', 'flex-direction': 'column','justify-content': 'center', 'border-left': '5px solid #58d395','margin-left': '0px','margin-right': '0px','margin-bottom': '0px' }"
          [ngClass]="event?.cssClass"
          (mouseenter)="highlightDay.emit({ event: event })"
          (mouseleave)="unhighlightDay.emit({ event: event })"
          [mwlCalendarTooltip]="
            event.title | calendarEventTitle: 'monthTooltip':event
          "
          [tooltipPlacement]="tooltipPlacement"
          [tooltipEvent]="event"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          [tooltipDelay]="tooltipDelay"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event, draggedFrom: day }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
          [validateDrag]="validateDrag"
          (mwlClick)="eventClicked.emit({ event: event, sourceEvent: $event })"
          [attr.aria-hidden]="{} | calendarA11y: 'hideMonthCellEvents'"
          (click) = "onEventClick(event)"
        >
        <p class="event-title">{{event.start | date:'shortTime'}}</p>
        <p class="event-title">{{event.title}}</p>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        openDay: openDay,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        highlightDay: highlightDay,
        unhighlightDay: unhighlightDay,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDelay: tooltipDelay,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
        host: {
            class: 'cal-cell cal-day-cell',
            '[class.cal-past]': 'day.isPast',
            '[class.cal-today]': 'day.isToday',
            '[class.cal-future]': 'day.isFuture',
            '[class.cal-weekend]': 'day.isWeekend',
            '[class.cal-in-month]': 'day.inMonth',
            '[class.cal-out-month]': '!day.inMonth',
            '[class.cal-has-events]': 'day.events.length > 0',
            '[class.cal-open]': 'day === openDay',
            '[class.cal-event-highlight]': '!!day.backgroundColor'
        },
        styles: [""]
    })
], CalendarMonthCellComponent);
export { CalendarMonthCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL21vbnRoL2NhbGVuZGFyLW1vbnRoLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQTtBQW9HOUUsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFpQ3JDLFlBQW1CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBaEJqRCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLakUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFHM0IsQ0FBQztRQUVMLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBRWhDLGlCQUFZLEdBQUcsaUJBQWlCLENBQUM7SUFJakMsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FHRixDQUFBOztZQVR5QyxtQkFBbUI7O0FBaENsRDtJQUFSLEtBQUssRUFBRTt1REFBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7MkRBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFOzBEQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFO29FQUFrQztBQUVqQztJQUFSLEtBQUssRUFBRTt1RUFBOEI7QUFFN0I7SUFBUixLQUFLLEVBQUU7a0VBQWtDO0FBRWpDO0lBQVIsS0FBSyxFQUFFO21FQUFtQztBQUVsQztJQUFSLEtBQUssRUFBRTtnRUFBNkI7QUFFM0I7SUFBVCxNQUFNLEVBQUU7Z0VBQXNEO0FBRXJEO0lBQVQsTUFBTSxFQUFFO2tFQUF3RDtBQUV4RDtJQUFSLEtBQUssRUFBRTt3RUFBd0M7QUFHaEQ7SUFEQyxNQUFNLEVBQUU7Z0VBSUo7QUEzQk0sMEJBQTBCO0lBbEd0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBRW5DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUZUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLG1CQUFtQixFQUFFLGFBQWE7WUFDbEMsb0JBQW9CLEVBQUUsY0FBYztZQUNwQyxxQkFBcUIsRUFBRSxlQUFlO1lBQ3RDLHNCQUFzQixFQUFFLGFBQWE7WUFDckMsdUJBQXVCLEVBQUUsY0FBYztZQUN2Qyx3QkFBd0IsRUFBRSx1QkFBdUI7WUFDakQsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLDZCQUE2QixFQUFFLHVCQUF1QjtTQUN2RDs7S0FDRixDQUFDO0dBQ1csMEJBQTBCLENBMEN0QztTQTFDWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbnRoVmlld0RheSwgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IGlzV2l0aGluVGhyZXNob2xkLCB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC1lbWl0dGVyLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1tb250aC1jZWxsJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItbW9udGgtdmlldy5zY3NzJ10sICBcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1kYXk9XCJkYXlcIlxuICAgICAgbGV0LW9wZW5EYXk9XCJvcGVuRGF5XCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxuICAgICAgbGV0LXRvb2x0aXBQbGFjZW1lbnQ9XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIGxldC1oaWdobGlnaHREYXk9XCJoaWdobGlnaHREYXlcIlxuICAgICAgbGV0LXVuaGlnaGxpZ2h0RGF5PVwidW5oaWdobGlnaHREYXlcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICBsZXQtdG9vbHRpcERlbGF5PVwidG9vbHRpcERlbGF5XCJcbiAgICAgIGxldC10cmFja0J5RXZlbnRJZD1cInRyYWNrQnlFdmVudElkXCJcbiAgICAgIGxldC12YWxpZGF0ZURyYWc9XCJ2YWxpZGF0ZURyYWdcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtY2VsbC10b3BcIlxuICAgICAgICBpZD1cImRhdGUtY2VsbFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgeyBkYXk6IGRheSwgbG9jYWxlOiBsb2NhbGUgfSB8IGNhbGVuZGFyQTExeTogJ21vbnRoQ2VsbCdcbiAgICAgICAgXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LWJhZGdlXCIgKm5nSWY9XCJkYXkuYmFkZ2VUb3RhbCA+IDBcIj57e1xuICAgICAgICAgICAgZGF5LmJhZGdlVG90YWxcbiAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1kYXktbnVtYmVyXCIgaWQ9XCJkYXktbnVtYmVyLXZpZXdcIj57e1xuICAgICAgICAgICAgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGU6ICdtb250aFZpZXdEYXlOdW1iZXInOmxvY2FsZVxuICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCIgKm5nSWY9XCJkYXkuZXZlbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50czsgdHJhY2tCeTogdHJhY2tCeUV2ZW50SWRcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiAxMDAgKyAnJScsJ2hlaWdodCc6IDYxICsgJ3B4JywgJ2JvcmRlci1yYWRpdXMnOiAwICsgJ3B4JywnYmFja2dyb3VuZC1jb2xvcic6ICcjZGNmOGU5JywnZGlzcGxheSc6ICdmbGV4JywgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLCAnYm9yZGVyLWxlZnQnOiAnNXB4IHNvbGlkICM1OGQzOTUnLCdtYXJnaW4tbGVmdCc6ICcwcHgnLCdtYXJnaW4tcmlnaHQnOiAnMHB4JywnbWFyZ2luLWJvdHRvbSc6ICcwcHgnIH1cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImV2ZW50Py5jc3NDbGFzc1wiXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwiaGlnaGxpZ2h0RGF5LmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cInVuaGlnaGxpZ2h0RGF5LmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxuICAgICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXG4gICAgICAgICAgICBldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTogJ21vbnRoVG9vbHRpcCc6ZXZlbnRcbiAgICAgICAgICBcIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgIFt0b29sdGlwRXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiZXZlbnQuZHJhZ2dhYmxlXCJcbiAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBldmVudCwgZHJhZ2dlZEZyb206IGRheSB9XCJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwieyB4OiBldmVudC5kcmFnZ2FibGUsIHk6IGV2ZW50LmRyYWdnYWJsZSB9XCJcbiAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ2hpZGVNb250aENlbGxFdmVudHMnXCJcbiAgICAgICAgICAoY2xpY2spID0gXCJvbkV2ZW50Q2xpY2soZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8cCBjbGFzcz1cImV2ZW50LXRpdGxlXCI+e3tldmVudC5zdGFydCB8IGRhdGU6J3Nob3J0VGltZSd9fTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJldmVudC10aXRsZVwiPnt7ZXZlbnQudGl0bGV9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBvcGVuRGF5OiBvcGVuRGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgaGlnaGxpZ2h0RGF5OiBoaWdobGlnaHREYXksXG4gICAgICAgIHVuaGlnaGxpZ2h0RGF5OiB1bmhpZ2hsaWdodERheSxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5LFxuICAgICAgICB0b29sdGlwRGVsYXk6IHRvb2x0aXBEZWxheSxcbiAgICAgICAgdHJhY2tCeUV2ZW50SWQ6IHRyYWNrQnlFdmVudElkLFxuICAgICAgICB2YWxpZGF0ZURyYWc6IHZhbGlkYXRlRHJhZ1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2NhbC1jZWxsIGNhbC1kYXktY2VsbCcsXG4gICAgJ1tjbGFzcy5jYWwtcGFzdF0nOiAnZGF5LmlzUGFzdCcsXG4gICAgJ1tjbGFzcy5jYWwtdG9kYXldJzogJ2RheS5pc1RvZGF5JyxcbiAgICAnW2NsYXNzLmNhbC1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXG4gICAgJ1tjbGFzcy5jYWwtd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXG4gICAgJ1tjbGFzcy5jYWwtaW4tbW9udGhdJzogJ2RheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWwtaGFzLWV2ZW50c10nOiAnZGF5LmV2ZW50cy5sZW5ndGggPiAwJyxcbiAgICAnW2NsYXNzLmNhbC1vcGVuXSc6ICdkYXkgPT09IG9wZW5EYXknLFxuICAgICdbY2xhc3MuY2FsLWV2ZW50LWhpZ2hsaWdodF0nOiAnISFkYXkuYmFja2dyb3VuZENvbG9yJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbDtcblxuICBAT3V0cHV0KCkgaGlnaGxpZ2h0RGF5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdW5oaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xuXG4gIHZhbGlkYXRlRHJhZyA9IGlzV2l0aGluVGhyZXNob2xkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlKXtcblxuICB9XG5cbiAgb25FdmVudENsaWNrKGV2ZW50KXtcbiAgICAgIHRoaXMuZXZlbnRFbWl0dGVyU2VydmljZS5lbWl0TmF2Q2hhbmdlRXZlbnQoJ0VESVRfRVZFTlRfQ0xJQ0tFRCcsIGV2ZW50KTtcbiAgfVxuICBcblxufVxuIl19