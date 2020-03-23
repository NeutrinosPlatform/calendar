import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from '../common/calendar-view.enum';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { addDaysWithExclusions } from '../common/util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
var CalendarCommonHeaderComponent = /** @class */ (function () {
    function CalendarCommonHeaderComponent(dateAdapter, eventEmitterService, dialog) {
        this.dateAdapter = dateAdapter;
        this.eventEmitterService = eventEmitterService;
        this.dialog = dialog;
        /**
         * Days to skip when going back by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.viewChange = new EventEmitter();
        this.setView = new EventEmitter();
        this.onAddEventClick = new EventEmitter();
        this.onEditEventClick = new EventEmitter();
        this.onDeleteEventClick = new EventEmitter();
        this.onAddEventSaveClick = new EventEmitter();
        this.showPreviousDayBtn = true;
        this.showTodayBtn = true;
        this.showNextDayBtn = true;
        this.showMonthBtn = true;
        this.showWeekBtn = true;
        this.showDayBtn = true;
        this.showAddEvent = true;
        this.showCaptureEventDialog = true;
        this.showEventDetailsDialog = true;
        this.page = "header";
    }
    CalendarCommonHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.view = this.view;
        this.setView.emit(this.view);
        this.eventEmitterService.getNavChangeEmitter().subscribe(function (data) {
            switch (data.value) {
                case 'EDIT_EVENT_CLICKED':
                    _this.openDialog('EDIT', data.event);
                    break;
                case 'ADD_SAVE_CLICKED':
                    _this.addEventSaveClick(data.event);
                    break;
                case 'EDIT_SAVE_CLICKED':
                    _this.editEventSaveClick(data.event);
                    break;
                case 'DELETE_EVENT_CLICKED':
                    _this.deleteEventClick(data.event);
                    break;
                default:
            }
        });
    };
    CalendarCommonHeaderComponent.prototype.onViewChange = function () {
        this.viewChange.emit();
    };
    CalendarCommonHeaderComponent.prototype.onViewDateChange = function (type) {
        if (type === 'Previous') {
            var subFn = {
                day: this.dateAdapter.subDays,
                week: this.dateAdapter.subWeeks,
                month: this.dateAdapter.subMonths
            }[this.view];
            if (this.view === CalendarView.Day) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else if (this.view === CalendarView.Week && this.daysInWeek) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else {
                this.viewDateChange.emit(subFn(this.viewDate, 0));
            }
        }
        else if (type === 'Next') {
            var addFn = {
                day: this.dateAdapter.addDays,
                week: this.dateAdapter.addWeeks,
                month: this.dateAdapter.addMonths
            }[this.view];
            if (this.view === CalendarView.Day) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 0, this.excludeDays));
            }
            else if (this.view === CalendarView.Week && this.daysInWeek) {
                this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
            }
            else {
                this.viewDateChange.emit(addFn(this.viewDate, 0));
            }
        }
    };
    CalendarCommonHeaderComponent.prototype.onSetView = function (view) {
        this.view = view;
        this.setView.emit(view);
    };
    CalendarCommonHeaderComponent.prototype.addEventClick = function () {
        this.onAddEventClick.emit();
        this.openDialog('ADD', null);
    };
    CalendarCommonHeaderComponent.prototype.addEventSaveClick = function (event) {
        this.onAddEventSaveClick.emit(event);
    };
    CalendarCommonHeaderComponent.prototype.editEventSaveClick = function (event) {
        this.onEditEventClick.emit(event);
    };
    CalendarCommonHeaderComponent.prototype.deleteEventClick = function (event) {
        this.onDeleteEventClick.emit(event);
    };
    CalendarCommonHeaderComponent.prototype.openDialog = function (type, data) {
        var template = null;
        if (type === 'EDIT') {
            if (this.showEventDetailsDialog === true) {
                template = CalendarModalComponent;
            }
            else if (this.customEventDialog !== undefined) {
                template = this.customEventDialog;
            }
        }
        else if (type === 'ADD') {
            if (this.showCaptureEventDialog === true) {
                template = CalendarModalComponent;
            }
            else if (this.customCaptureEventDialog !== undefined) {
                template = this.customCaptureEventDialog;
            }
        }
        if (template !== null) {
            var dialogRef = this.dialog.open(template, {
                data: data
            });
            dialogRef.afterClosed().subscribe(function (result) {
            });
        }
    };
    CalendarCommonHeaderComponent.ctorParameters = function () { return [
        { type: DateAdapter },
        { type: EventEmitterService },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "view", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "excludeDays", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "daysInWeek", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "weekStartsOn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "weekendDays", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "viewDateChange", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "viewChange", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "setView", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "onAddEventClick", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "onEditEventClick", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "onDeleteEventClick", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarCommonHeaderComponent.prototype, "onAddEventSaveClick", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showPreviousDayBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showTodayBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showNextDayBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showMonthBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showWeekBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showDayBtn", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showAddEvent", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showCaptureEventDialog", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "showEventDetailsDialog", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "customCaptureEventDialog", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarCommonHeaderComponent.prototype, "customEventDialog", void 0);
    CalendarCommonHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-header',
            template: "\n  \n  <div class=\"row text-center\">\n          <div class=\"col-md-4\">\n                <div class=\"btn-group\">\n                    <div *ngIf=\"showPreviousDayBtn\" class=\"btn btn-primary\"\n                      mwlCalendarPreviousView\n                      [(viewDate)]=\"viewDate\"\n                      [view]=\"view\"\n                      (viewDateChange)=\"onViewDateChange('Previous')\"\n                      (viewChange)=\"onViewChange()\"\n                      [daysInWeek]=\"daysInWeek\"\n                      [excludeDays]=\"excludeDays\"\n                      >\n                          Previous\n                    </div>\n                      <div *ngIf=\"showTodayBtn\" class=\"btn btn-outline-secondary\"\n                        mwlCalendarToday\n                        [(viewDate)]=\"viewDate\"\n                        (viewDateChange)=\"viewDateChange.next(viewDate)\">\n                          Today\n                      </div>\n                      <div *ngIf=\"showNextDayBtn\" class=\"btn btn-primary\"        \n                        mwlCalendarNextView\n                        [view]=\"view\"\n                        [(viewDate)]=\"viewDate\"\n                        (viewDateChange)=\"onViewDateChange('Next')\"\n                        (viewChange)=\"onViewChange()\"\n                        [daysInWeek]=\"daysInWeek\"\n                        [excludeDays]=\"excludeDays\"\n                        >\n                          Next\n                      </div>\n                </div>\n                &nbsp;\n                <button *ngIf=\"showAddEvent\" (click)=\"addEventClick()\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#basicExampleModal\">\n                  Add Event\n                </button> \n           </div>\n          <div class=\"col-md-4\">\n            <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>\n          </div>\n          <div class=\"col-md-4\">\n                  <div class=\"btn-group\">\n                    <div *ngIf=\"showMonthBtn\" class=\"btn btn-primary\" (click)=\"onSetView('month')\" [class.active]=\"view === 'month'\">\n                      Month\n                    </div>\n                    <div *ngIf=\"showWeekBtn\" class=\"btn btn-primary\" (click)=\"onSetView('week')\" [class.active]=\"view === 'week'\">\n                      Week\n                    </div>\n                    <div *ngIf=\"showDayBtn\" class=\"btn btn-primary\" (click)=\"onSetView('day')\" [class.active]=\"view === 'day'\">\n                      Day\n                    </div>\n                  </div>\n            </div>\n  </div>\n  "
        })
    ], CalendarCommonHeaderComponent);
    return CalendarCommonHeaderComponent;
}());
export { CalendarCommonHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQThEL0U7SUF1REUsdUNBQW9CLFdBQXdCLEVBQ25DLG1CQUF3QyxFQUN4QyxNQUFpQjtRQUZOLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQTVDMUI7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQVFwQzs7V0FFRztRQUNPLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0Qyx1QkFB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RkF3RFQ7U0FDRixDQUFDO09BQ1csNkJBQTZCLENBOEx6QztJQUFELG9DQUFDO0NBQUEsQUE5TEQsSUE4TEM7U0E5TFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdmlldy5lbnVtJztcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzLCBnZXRXZWVrVmlld1BlcmlvZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgYWRkRGF5c1dpdGhFeGNsdXNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgV2Vla0RheSxcbiAgTW9udGhWaWV3LFxuICBNb250aFZpZXdEYXksXG4gIFZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gIFxuICA8ZGl2IGNsYXNzPVwicm93IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1ByZXZpb3VzRGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG13bENhbGVuZGFyUHJldmlvdXNWaWV3XG4gICAgICAgICAgICAgICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFt2aWV3XT1cInZpZXdcIlxuICAgICAgICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdQcmV2aW91cycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAodmlld0NoYW5nZSk9XCJvblZpZXdDaGFuZ2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2V4Y2x1ZGVEYXlzXT1cImV4Y2x1ZGVEYXlzXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VG9kYXlCdG5cIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbXdsQ2FsZW5kYXJUb2RheVxuICAgICAgICAgICAgICAgICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cInZpZXdEYXRlQ2hhbmdlLm5leHQodmlld0RhdGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFRvZGF5XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dOZXh0RGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBtd2xDYWxlbmRhck5leHRWaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICBbdmlld109XCJ2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdOZXh0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKHZpZXdDaGFuZ2UpPVwib25WaWV3Q2hhbmdlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dBZGRFdmVudFwiIChjbGljayk9XCJhZGRFdmVudENsaWNrKClcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjYmFzaWNFeGFtcGxlTW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgIEFkZCBFdmVudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPiBcbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICA8aDM+e3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6J2VuJyB9fTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93TW9udGhCdG5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvblNldFZpZXcoJ21vbnRoJylcIiBbY2xhc3MuYWN0aXZlXT1cInZpZXcgPT09ICdtb250aCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICBNb250aFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrQnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25TZXRWaWV3KCd3ZWVrJylcIiBbY2xhc3MuYWN0aXZlXT1cInZpZXcgPT09ICd3ZWVrJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIFdlZWtcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93RGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25TZXRWaWV3KCdkYXknKVwiIFtjbGFzcy5hY3RpdmVdPVwidmlldyA9PT0gJ2RheSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICBEYXlcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSB2aWV3OiBDYWxlbmRhclZpZXcgfCAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSc7XG5cbiAgLyoqXG4gICAqIERheXMgdG8gc2tpcCB3aGVuIGdvaW5nIGJhY2sgYnkgMSBkYXlcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBJZiBzZXQgd2lsbCBzdWJ0cmFjdCB0aGlzIGFtb3VudCBvZiBkYXlzIGluc3RlYWQgb2YgMSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNldFZpZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkFkZEV2ZW50Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkVkaXRFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25EZWxldGVFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25BZGRFdmVudFNhdmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93UHJldmlvdXNEYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9kYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TmV4dERheUJ0bjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2hvd01vbnRoQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1dlZWtCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RGF5QnRuOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93QWRkRXZlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93Q2FwdHVyZUV2ZW50RGlhbG9nOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0V2ZW50RGV0YWlsc0RpYWxvZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUNhcHR1cmVFdmVudERpYWxvZzogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgY3VzdG9tRXZlbnREaWFsb2c6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29sdW1uSGVhZGVyczogYW55O1xuICBldmVudHM6IENhbGVuZGFyRXZlbnQ8YW55PltdO1xuICBiZWZvcmVWaWV3UmVuZGVyOiBhbnk7XG4gIHBhZ2UgPSBcImhlYWRlclwiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICAgIHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3O1xuICAgIHRoaXMuc2V0Vmlldy5lbWl0KHRoaXMudmlldyk7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmdldE5hdkNoYW5nZUVtaXR0ZXIoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YS52YWx1ZSkge1xuICAgICAgICBjYXNlICdFRElUX0VWRU5UX0NMSUNLRUQnOlxuICAgICAgICAgIHRoaXMub3BlbkRpYWxvZygnRURJVCcsIGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBRERfU0FWRV9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50U2F2ZUNsaWNrKGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFRElUX1NBVkVfQ0xJQ0tFRCc6XG4gICAgICAgICAgdGhpcy5lZGl0RXZlbnRTYXZlQ2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFTEVURV9FVkVOVF9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50Q2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblZpZXdDaGFuZ2UoKSB7XG4gICAgdGhpcy52aWV3Q2hhbmdlLmVtaXQoKTtcbiAgfVxuXG4gIG9uVmlld0RhdGVDaGFuZ2UodHlwZSkge1xuICAgIGlmKHR5cGUgPT09ICdQcmV2aW91cycpe1xuICAgICAgY29uc3Qgc3ViRm46IGFueSA9IHtcbiAgICAgICAgZGF5OiB0aGlzLmRhdGVBZGFwdGVyLnN1YkRheXMsXG4gICAgICAgIHdlZWs6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViV2Vla3MsXG4gICAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLnN1Yk1vbnRoc1xuICAgICAgfVt0aGlzLnZpZXddO1xuICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LkRheSkge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxuICAgICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoc3ViRm4odGhpcy52aWV3RGF0ZSwgMCkpO1xuICAgICAgfVxuICAgIH1lbHNlIGlmKHR5cGUgPT09ICdOZXh0Jyl7XG4gICAgICBjb25zdCBhZGRGbjogYW55ID0ge1xuICAgICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkRGF5cyxcbiAgICAgICAgd2VlazogdGhpcy5kYXRlQWRhcHRlci5hZGRXZWVrcyxcbiAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTW9udGhzXG4gICAgICB9W3RoaXMudmlld107XG4gICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICB0aGlzLmRheXNJbldlZWssXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIDApKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gIFxuXG4gIG9uU2V0Vmlldyh2aWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLnNldFZpZXcuZW1pdCh2aWV3KTtcbiAgfVxuXG4gIGFkZEV2ZW50Q2xpY2soKSB7XG4gICAgdGhpcy5vbkFkZEV2ZW50Q2xpY2suZW1pdCgpO1xuICAgIHRoaXMub3BlbkRpYWxvZygnQUREJywgbnVsbCk7XG4gIH1cblxuICBhZGRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25BZGRFdmVudFNhdmVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGVkaXRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25FZGl0RXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGRlbGV0ZUV2ZW50Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLm9uRGVsZXRlRXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2codHlwZSwgZGF0YSkge1xuICAgIGxldCB0ZW1wbGF0ZTogYW55ID0gbnVsbFxuICAgIGlmICh0eXBlID09PSAnRURJVCcpIHtcbiAgICAgIGlmICh0aGlzLnNob3dFdmVudERldGFpbHNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcGxhdGUgPSBDYWxlbmRhck1vZGFsQ29tcG9uZW50O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUV2ZW50RGlhbG9nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGUgPSB0aGlzLmN1c3RvbUV2ZW50RGlhbG9nXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdBREQnKSB7XG4gICAgICBpZiAodGhpcy5zaG93Q2FwdHVyZUV2ZW50RGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXBsYXRlID0gQ2FsZW5kYXJNb2RhbENvbXBvbmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21DYXB0dXJlRXZlbnREaWFsb2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZSA9IHRoaXMuY3VzdG9tQ2FwdHVyZUV2ZW50RGlhbG9nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0ZW1wbGF0ZSAhPT0gbnVsbCl7XG4gICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKHRlbXBsYXRlLCB7XG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICBcbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=