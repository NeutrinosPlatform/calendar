import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { isWithinThreshold, trackByEventId } from '../common/util';
export var collapseAnimation = trigger('collapse', [
    state('void', style({
        height: 0,
        overflow: 'hidden',
        'padding-top': 0,
        'padding-bottom': 0
    })),
    state('*', style({
        height: '*',
        overflow: 'hidden',
        'padding-top': '*',
        'padding-bottom': '*'
    })),
    transition('* => void', animate('150ms ease-out')),
    transition('void => *', animate('150ms ease-in'))
]);
var CalendarOpenDayEventsComponent = /** @class */ (function () {
    function CalendarOpenDayEventsComponent() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
    CalendarOpenDayEventsComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "isOpen", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "events", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "eventTitleTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarOpenDayEventsComponent.prototype, "date", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarOpenDayEventsComponent.prototype, "eventClicked", void 0);
    CalendarOpenDayEventsComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-open-day-events',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-events=\"events\"\n      let-eventClicked=\"eventClicked\"\n      let-isOpen=\"isOpen\"\n      let-trackByEventId=\"trackByEventId\"\n      let-validateDrag=\"validateDrag\"\n    >\n      <div\n        class=\"cal-open-day-events\"\n        [@collapse]\n        *ngIf=\"isOpen\"\n        role=\"application\"\n      >\n        <span\n          tabindex=\"-1\"\n          role=\"alert\"\n          [attr.aria-label]=\"\n            { date: date, locale: locale } | calendarA11y: 'openDayEventsAlert'\n          \"\n        ></span>\n        <span\n          tabindex=\"0\"\n          role=\"landmark\"\n          [attr.aria-label]=\"\n            { date: date, locale: locale }\n              | calendarA11y: 'openDayEventsLandmark'\n          \"\n        ></span>\n        <div\n          *ngFor=\"let event of events; trackBy: trackByEventId\"\n          [ngClass]=\"event?.cssClass\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n          [validateDrag]=\"validateDrag\"\n        >\n          <span\n            class=\"cal-event\"\n            [ngStyle]=\"{ backgroundColor: event.color?.primary }\"\n          >\n          </span>\n          &ngsp;\n          <mwl-calendar-event-title\n            [event]=\"event\"\n            [customTemplate]=\"eventTitleTemplate\"\n            view=\"month\"\n            (mwlClick)=\"\n              eventClicked.emit({ event: event, sourceEvent: $event })\n            \"\n            (mwlKeydownEnter)=\"\n              eventClicked.emit({ event: event, sourceEvent: $event })\n            \"\n            tabindex=\"0\"\n            [attr.aria-label]=\"\n              { event: event, locale: locale }\n                | calendarA11y: 'eventDescription'\n            \"\n          >\n          </mwl-calendar-event-title>\n          &ngsp;\n          <mwl-calendar-event-actions\n            [event]=\"event\"\n            [customTemplate]=\"eventActionsTemplate\"\n          >\n          </mwl-calendar-event-actions>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        events: events,\n        eventClicked: eventClicked,\n        isOpen: isOpen,\n        trackByEventId: trackByEventId,\n        validateDrag: validateDrag\n      }\"\n    >\n    </ng-template>\n  ",
            animations: [collapseAnimation]
        })
    ], CalendarOpenDayEventsComponent);
    return CalendarOpenDayEventsComponent;
}());
export { CalendarOpenDayEventsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9udGgvY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBNkIsT0FBTyxDQUFDLFVBQVUsRUFBRTtJQUM3RSxLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQztRQUNKLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsYUFBYSxFQUFFLENBQUM7UUFDaEIsZ0JBQWdCLEVBQUUsQ0FBQztLQUNwQixDQUFDLENBQ0g7SUFDRCxLQUFLLENBQ0gsR0FBRyxFQUNILEtBQUssQ0FBQztRQUNKLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLFFBQVE7UUFDbEIsYUFBYSxFQUFFLEdBQUc7UUFDbEIsZ0JBQWdCLEVBQUUsR0FBRztLQUN0QixDQUFDLENBQ0g7SUFDRCxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xELFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQ2xELENBQUMsQ0FBQztBQTBGSDtJQXhGQTtRQTRGVyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBYWpDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBRzNCLENBQUM7UUFFTCxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUVoQyxpQkFBWSxHQUFHLGlCQUFpQixDQUFDO0lBSW5DLENBQUM7SUFGQyxpREFBUSxHQUFSO0lBQ0EsQ0FBQztJQXpCUTtRQUFSLEtBQUssRUFBRTtrRUFBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTtrRUFBeUI7SUFFeEI7UUFBUixLQUFLLEVBQUU7a0VBQXlCO0lBRXhCO1FBQVIsS0FBSyxFQUFFOzBFQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTs4RUFBc0M7SUFFckM7UUFBUixLQUFLLEVBQUU7Z0ZBQXdDO0lBRXZDO1FBQVIsS0FBSyxFQUFFO2dFQUFZO0lBR3BCO1FBREMsTUFBTSxFQUFFO3dFQUlKO0lBcEJNLDhCQUE4QjtRQXhGMUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxRQUFRLEVBQUUsNGhGQW1GVDtZQUNELFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1NBQ2hDLENBQUM7T0FDVyw4QkFBOEIsQ0E0QjFDO0lBQUQscUNBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0eWxlLFxuICBzdGF0ZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IGlzV2l0aGluVGhyZXNob2xkLCB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQW5pbWF0aW9uOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSB0cmlnZ2VyKCdjb2xsYXBzZScsIFtcbiAgc3RhdGUoXG4gICAgJ3ZvaWQnLFxuICAgIHN0eWxlKHtcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICdwYWRkaW5nLXRvcCc6IDAsXG4gICAgICAncGFkZGluZy1ib3R0b20nOiAwXG4gICAgfSlcbiAgKSxcbiAgc3RhdGUoXG4gICAgJyonLFxuICAgIHN0eWxlKHtcbiAgICAgIGhlaWdodDogJyonLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgJ3BhZGRpbmctdG9wJzogJyonLFxuICAgICAgJ3BhZGRpbmctYm90dG9tJzogJyonXG4gICAgfSlcbiAgKSxcbiAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMTUwbXMgZWFzZS1vdXQnKSksXG4gIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzE1MG1zIGVhc2UtaW4nKSlcbl0pO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1ldmVudHM9XCJldmVudHNcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtaXNPcGVuPVwiaXNPcGVuXCJcbiAgICAgIGxldC10cmFja0J5RXZlbnRJZD1cInRyYWNrQnlFdmVudElkXCJcbiAgICAgIGxldC12YWxpZGF0ZURyYWc9XCJ2YWxpZGF0ZURyYWdcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtb3Blbi1kYXktZXZlbnRzXCJcbiAgICAgICAgW0Bjb2xsYXBzZV1cbiAgICAgICAgKm5nSWY9XCJpc09wZW5cIlxuICAgICAgICByb2xlPVwiYXBwbGljYXRpb25cIlxuICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAgIHsgZGF0ZTogZGF0ZSwgbG9jYWxlOiBsb2NhbGUgfSB8IGNhbGVuZGFyQTExeTogJ29wZW5EYXlFdmVudHNBbGVydCdcbiAgICAgICAgICBcIlxuICAgICAgICA+PC9zcGFuPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgcm9sZT1cImxhbmRtYXJrXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgICAgICAgeyBkYXRlOiBkYXRlLCBsb2NhbGU6IGxvY2FsZSB9XG4gICAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5OiAnb3BlbkRheUV2ZW50c0xhbmRtYXJrJ1xuICAgICAgICAgIFwiXG4gICAgICAgID48L3NwYW4+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZXZlbnRzOyB0cmFja0J5OiB0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJldmVudC5kcmFnZ2FibGVcIlxuICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IGV2ZW50IH1cIlxuICAgICAgICAgIFtkcmFnQXhpc109XCJ7IHg6IGV2ZW50LmRyYWdnYWJsZSwgeTogZXZlbnQuZHJhZ2dhYmxlIH1cIlxuICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogZXZlbnQuY29sb3I/LnByaW1hcnkgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAmbmdzcDtcbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICB2aWV3PVwibW9udGhcIlxuICAgICAgICAgICAgKG13bENsaWNrKT1cIlxuICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIChtd2xLZXlkb3duRW50ZXIpPVwiXG4gICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgIHsgZXZlbnQ6IGV2ZW50LCBsb2NhbGU6IGxvY2FsZSB9XG4gICAgICAgICAgICAgICAgfCBjYWxlbmRhckExMXk6ICdldmVudERlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XG4gICAgICAgICAgJm5nc3A7XG4gICAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zXG4gICAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICAgIHRyYWNrQnlFdmVudElkOiB0cmFja0J5RXZlbnRJZCxcbiAgICAgICAgdmFsaWRhdGVEcmFnOiB2YWxpZGF0ZURyYWdcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBhbmltYXRpb25zOiBbY29sbGFwc2VBbmltYXRpb25dXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBkYXRlOiBEYXRlO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIH0+KCk7XG5cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcblxuICB2YWxpZGF0ZURyYWcgPSBpc1dpdGhpblRocmVzaG9sZDtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxufVxuIl19