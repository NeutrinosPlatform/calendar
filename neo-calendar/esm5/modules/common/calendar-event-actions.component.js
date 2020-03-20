import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EventEmitterService } from './calendar-event-emitter.service';
var CalendarEventActionsComponent = /** @class */ (function () {
    function CalendarEventActionsComponent(eventEmitterService) {
        this.eventEmitterService = eventEmitterService;
        this.trackByActionId = function (index, action) {
            return action.id ? action.id : action;
        };
    }
    CalendarEventActionsComponent.prototype.onEventClick = function (event, action) {
        if (action === 'EDIT') {
            this.eventEmitterService.emitNavChangeEvent('EDIT_EVENT_CLICKED', event);
        }
        else if (action === 'DELETE') {
            this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', event);
        }
    };
    CalendarEventActionsComponent.ctorParameters = function () { return [
        { type: EventEmitterService }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarEventActionsComponent.prototype, "event", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarEventActionsComponent.prototype, "customTemplate", void 0);
    CalendarEventActionsComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-event-actions',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-event=\"event\"\n      let-trackByActionId=\"trackByActionId\"\n    >\n      <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n        <span\n          class=\"cal-event-action material-icons\"\n          href=\"javascript:;\"\n          *ngFor=\"let action of event.actions; trackBy: trackByActionId\"\n          (mwlClick)=\"action.onClick({ event: event, sourceEvent: $event }); onEventClick(event, action.a11yLabel) \"\n          (mwlKeydownEnter)=\"\n            action.onClick({ event: event, sourceEvent: $event })\n          \"\n          [ngClass]=\"action.cssClass\"\n          tabindex=\"0\"\n          role=\"button\"\n          [attr.aria-label]=\"\n            { action: action } | calendarA11y: 'actionButtonLabel'\n          \"\n        >\n        {{action.label}}\n        </span>\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        trackByActionId: trackByActionId\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarEventActionsComponent);
    return CalendarEventActionsComponent;
}());
export { CalendarEventActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUF3Q3RFO0lBS0UsdUNBQW1CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSTNELG9CQUFlLEdBQUcsVUFBQyxLQUFhLEVBQUUsTUFBbUI7WUFDbkQsT0FBQSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQTlCLENBQThCLENBQUM7SUFIakMsQ0FBQztJQUtELG9EQUFZLEdBQVosVUFBYSxLQUFLLEVBQUUsTUFBTTtRQUN4QixJQUFHLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFFO2FBQUssSUFBRyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1RTtJQUNILENBQUM7O2dCQWJ1QyxtQkFBbUI7O0lBSmxEO1FBQVIsS0FBSyxFQUFFO2dFQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTt5RUFBa0M7SUFIL0IsNkJBQTZCO1FBdEN6QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFFBQVEsRUFBRSxvbUNBa0NUO1NBQ0YsQ0FBQztPQUNXLDZCQUE2QixDQW1CekM7SUFBRCxvQ0FBQztDQUFBLEFBbkJELElBbUJDO1NBbkJZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBFdmVudEFjdGlvbiB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlclNlcnZpY2UgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWV2ZW50PVwiZXZlbnRcIlxuICAgICAgbGV0LXRyYWNrQnlBY3Rpb25JZD1cInRyYWNrQnlBY3Rpb25JZFwiXG4gICAgPlxuICAgICAgPHNwYW4gKm5nSWY9XCJldmVudC5hY3Rpb25zXCIgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uc1wiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbiBtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBldmVudC5hY3Rpb25zOyB0cmFja0J5OiB0cmFja0J5QWN0aW9uSWRcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJhY3Rpb24ub25DbGljayh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KTsgb25FdmVudENsaWNrKGV2ZW50LCBhY3Rpb24uYTExeUxhYmVsKSBcIlxuICAgICAgICAgIChtd2xLZXlkb3duRW50ZXIpPVwiXG4gICAgICAgICAgICBhY3Rpb24ub25DbGljayh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVxuICAgICAgICAgIFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiYWN0aW9uLmNzc0NsYXNzXCJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICB7IGFjdGlvbjogYWN0aW9uIH0gfCBjYWxlbmRhckExMXk6ICdhY3Rpb25CdXR0b25MYWJlbCdcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgIHt7YWN0aW9uLmxhYmVsfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB0cmFja0J5QWN0aW9uSWQ6IHRyYWNrQnlBY3Rpb25JZFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSl7XG5cbiAgfVxuXG4gIHRyYWNrQnlBY3Rpb25JZCA9IChpbmRleDogbnVtYmVyLCBhY3Rpb246IEV2ZW50QWN0aW9uKSA9PlxuICAgIGFjdGlvbi5pZCA/IGFjdGlvbi5pZCA6IGFjdGlvbjtcblxuICBvbkV2ZW50Q2xpY2soZXZlbnQsIGFjdGlvbil7XG4gICAgaWYoYWN0aW9uID09PSAnRURJVCcpIHtcbiAgICAgIHRoaXMuZXZlbnRFbWl0dGVyU2VydmljZS5lbWl0TmF2Q2hhbmdlRXZlbnQoJ0VESVRfRVZFTlRfQ0xJQ0tFRCcsIGV2ZW50KTtcbiAgICB9ZWxzZSBpZihhY3Rpb24gPT09ICdERUxFVEUnKSB7XG4gICAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdERUxFVEVfRVZFTlRfQ0xJQ0tFRCcsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==