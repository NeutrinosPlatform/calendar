import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var CalendarEventTitleComponent = /** @class */ (function () {
    function CalendarEventTitleComponent() {
    }
    CalendarEventTitleComponent.prototype.ngOnInit = function () {
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
            template: "\n    <ng-template #defaultTemplate let-event=\"event\" let-view=\"view\">\n      <span\n        class=\"event-title\"\n        [innerHTML]=\"event.title | calendarEventTitle: view:event\"\n        [attr.aria-hidden]=\"{} | calendarA11y: 'hideEventTitle'\"\n      >\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        view: view\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarEventTitleComponent);
    return CalendarEventTitleComponent;
}());
export { CalendarEventTitleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsTUFBTSxlQUFlLENBQUM7QUF3QnRFO0lBQUE7SUFVQSxDQUFDO0lBRkMsOENBQVEsR0FBUjtJQUNBLENBQUM7SUFQUTtRQUFSLEtBQUssRUFBRTs4REFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7dUVBQWtDO0lBRWpDO1FBQVIsS0FBSyxFQUFFOzZEQUFjO0lBTlgsMkJBQTJCO1FBckJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSwwZkFpQlQ7U0FDRixDQUFDO09BQ1csMkJBQTJCLENBVXZDO0lBQUQsa0NBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1ldmVudD1cImV2ZW50XCIgbGV0LXZpZXc9XCJ2aWV3XCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImV2ZW50LXRpdGxlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTogdmlldzpldmVudFwiXG4gICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInt9IHwgY2FsZW5kYXJBMTF5OiAnaGlkZUV2ZW50VGl0bGUnXCJcbiAgICAgID5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgdmlldzogdmlld1xuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuIFxuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbn1cbiJdfQ==