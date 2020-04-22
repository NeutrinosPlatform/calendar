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
            template: "  \n  <div>\n  <h1 class=\"calendar-header-text\">Calendar </h1> \n  <div class=\"header-container\">\n     \n    <div class=\"header-view\">\n      <div>\n        <mat-button-toggle-group id=\"today-toggle-group\" name=\"fontStyle\" aria-label=\"Font Style\"\n        #group=\"matButtonToggleGroup\">\n        <mat-button-toggle class=\"previous-button\" id=\"toggle-button\" \n          *ngIf=\"showPreviousDayBtn\"\n          mwlCalendarPreviousView \n          [(viewDate)]=\"viewDate\" \n          [view]=\"view\" \n          (viewDateChange)=\"onViewDateChange('Previous')\" \n          (viewChange)=\"onViewChange()\" \n          [daysInWeek]=\"daysInWeek\" \n          [excludeDays]=\"excludeDays\">\n          Previous\n        </mat-button-toggle>\n        <mat-button-toggle class=\"today-button\" id=\"toggle-button\" \n        *ngIf=\"showTodayBtn\"\n                mwlCalendarToday \n                [(viewDate)]=\"viewDate\" \n                (viewDateChange)=\"viewDateChange.next(viewDate)\">\n        Today\n        </mat-button-toggle>\n        <mat-button-toggle id=\"toggle-button\" \n        *ngIf=\"showNextDayBtn\"\n                mwlCalendarNextView \n                [view]=\"view\" \n                [(viewDate)]=\"viewDate\" \n                (viewDateChange)=\"onViewDateChange('Next')\" \n                (viewChange)=\"onViewChange()\" \n                [daysInWeek]=\"daysInWeek\" \n                [excludeDays]=\"excludeDays\">\n        Next\n        </mat-button-toggle>\n      </mat-button-toggle-group>\n    </div>\n      \n      <button class=\"event-button\" *ngIf=\"showAddEvent\" (click)=\"addEventClick()\" mat-raised-button><mat-icon class=\"add-icon-view\">add</mat-icon> Add Event</button>\n    </div>\n    <div class=\"date-view-container\">\n      <mat-icon mwlCalendarPreviousView \n      [(viewDate)]=\"viewDate\" \n      [view]=\"view\" \n      (viewDateChange)=\"onViewDateChange('Previous')\" \n      (viewChange)=\"onViewChange()\" \n      [daysInWeek]=\"daysInWeek\" \n      [excludeDays]=\"excludeDays\">arrow_left</mat-icon>\n      <h3 class=\"date-view\">{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>\n      <mat-icon mwlCalendarNextView \n      [view]=\"view\" \n      [(viewDate)]=\"viewDate\" \n      (viewDateChange)=\"onViewDateChange('Next')\" \n      (viewChange)=\"onViewChange()\" \n      [daysInWeek]=\"daysInWeek\" \n      [excludeDays]=\"excludeDays\">arrow_right</mat-icon>\n    </div>\n    <div>\n      <mat-button-toggle-group class=\"day-toggle-view\" id=\"toggle-group\" name=\"fontStyle\" aria-label=\"Font Style\" #group=\"matButtonToggleGroup\">\n        <mat-button-toggle class=\"day-view\" id=\"toggle-button\" *ngIf=\"showDayBtn\" (click)=\"onSetView('day')\" [checked]=\"view === 'day'\">Day</mat-button-toggle>\n        <mat-button-toggle class=\"week-view\"id=\"toggle-button\" *ngIf=\"showWeekBtn\" (click)=\"onSetView('week')\" [checked]=\"view === 'week'\">Week</mat-button-toggle>\n        <mat-button-toggle id=\"toggle-button\" *ngIf=\"showMonthBtn\" (click)=\"onSetView('month')\" [checked]=\"view === 'month'\">Month</mat-button-toggle>\n      </mat-button-toggle-group>\n    </div>\n</div>\n</div>\n  ",
            styles: [".header-container{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;padding:20px!important}.header-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header-view>div{margin-right:3%}.event-button{background:#404041;color:#fff;width:136px;height:42px;border-radius:4px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.add-icon-view{font-size:22px!important}#today-toggle-group{max-width:210px;width:auto;border-radius:4px;background-color:#fff}#toggle-button{padding-top:4px;padding-bottom:4px;border-left:none}.day-view,.previous-button,.today-button{position:relative}.day-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.week-view{position:relative}.previous-button::after,.today-button::after,.week-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.calendar-header-text{font-size:32px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.02px;padding-left:16px;color:#404041;font-family:poppins}#toggle-group{max-width:188px!important;width:auto;height:42px;border-radius:4px;background-color:#fff}#toggle-button-button{width:92px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important;height:32px}#toggle-button-button>div{width:75px;height:25px;font-size:18px;font-weight:400;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.01px;text-align:left;color:#404041}#today-toggle-group .mat-button-toggle{height:34px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.previous-button{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.date-view{height:20px;font-size:14px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:normal;text-align:left;color:#4d585e;margin:0!important;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.date-view-container{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;cursor:pointer}.day-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.mat-button-toggle-checked{color:#fff;background-color:#404041;border-radius:3px}.mat-button-toggle{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.cal-month-view .cal-cell-top{border:1px solid #dadbdd!important}@media (max-width:767px){.header-container{width:100%!important;display:-webkit-box!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important;-webkit-box-pack:center!important;justify-content:center!important;-webkit-box-align:center!important;align-items:center!important;padding:0!important}.date-view-container,.day-toggle-view,.header-view{margin-bottom:12px}}@media (max-width:350px){#today-toggle-group{margin-bottom:12px}.header-view{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}}"]
        })
    ], CalendarCommonHeaderComponent);
    return CalendarCommonHeaderComponent;
}());
export { CalendarCommonHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQTRFL0U7SUF1REUsdUNBQW9CLFdBQXdCLEVBQ25DLG1CQUF3QyxFQUN4QyxNQUFpQjtRQUZOLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQTVDMUI7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQVFwQzs7V0FFRztRQUNPLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0Qyx1QkFB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R0FxRVQ7O1NBQ0YsQ0FBQztPQUNXLDZCQUE2QixDQThMekM7SUFBRCxvQ0FBQztDQUFBLEFBOUxELElBOExDO1NBOUxZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXZpZXcuZW51bSc7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50cywgZ2V0V2Vla1ZpZXdQZXJpb2QgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IGFkZERheXNXaXRoRXhjbHVzaW9ucyB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIFdlZWtEYXksXG4gIE1vbnRoVmlldyxcbiAgTW9udGhWaWV3RGF5LFxuICBWaWV3UGVyaW9kXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyLW1vZGFsL2NhbGVuZGFyLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1oZWFkZXInLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGAgIFxuICA8ZGl2PlxuICA8aDEgY2xhc3M9XCJjYWxlbmRhci1oZWFkZXItdGV4dFwiPkNhbGVuZGFyIDwvaDE+IFxuICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxuICAgICBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXZpZXdcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCBpZD1cInRvZGF5LXRvZ2dsZS1ncm91cFwiIG5hbWU9XCJmb250U3R5bGVcIiBhcmlhLWxhYmVsPVwiRm9udCBTdHlsZVwiXG4gICAgICAgICNncm91cD1cIm1hdEJ1dHRvblRvZ2dsZUdyb3VwXCI+XG4gICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZSBjbGFzcz1cInByZXZpb3VzLWJ1dHRvblwiIGlkPVwidG9nZ2xlLWJ1dHRvblwiIFxuICAgICAgICAgICpuZ0lmPVwic2hvd1ByZXZpb3VzRGF5QnRuXCJcbiAgICAgICAgICBtd2xDYWxlbmRhclByZXZpb3VzVmlldyBcbiAgICAgICAgICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiIFxuICAgICAgICAgIFt2aWV3XT1cInZpZXdcIiBcbiAgICAgICAgICAodmlld0RhdGVDaGFuZ2UpPVwib25WaWV3RGF0ZUNoYW5nZSgnUHJldmlvdXMnKVwiIFxuICAgICAgICAgICh2aWV3Q2hhbmdlKT1cIm9uVmlld0NoYW5nZSgpXCIgXG4gICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiIFxuICAgICAgICAgIFtleGNsdWRlRGF5c109XCJleGNsdWRlRGF5c1wiPlxuICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZSBjbGFzcz1cInRvZGF5LWJ1dHRvblwiIGlkPVwidG9nZ2xlLWJ1dHRvblwiIFxuICAgICAgICAqbmdJZj1cInNob3dUb2RheUJ0blwiXG4gICAgICAgICAgICAgICAgbXdsQ2FsZW5kYXJUb2RheSBcbiAgICAgICAgICAgICAgICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiIFxuICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJ2aWV3RGF0ZUNoYW5nZS5uZXh0KHZpZXdEYXRlKVwiPlxuICAgICAgICBUb2RheVxuICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgaWQ9XCJ0b2dnbGUtYnV0dG9uXCIgXG4gICAgICAgICpuZ0lmPVwic2hvd05leHREYXlCdG5cIlxuICAgICAgICAgICAgICAgIG13bENhbGVuZGFyTmV4dFZpZXcgXG4gICAgICAgICAgICAgICAgW3ZpZXddPVwidmlld1wiIFxuICAgICAgICAgICAgICAgIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCIgXG4gICAgICAgICAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cIm9uVmlld0RhdGVDaGFuZ2UoJ05leHQnKVwiIFxuICAgICAgICAgICAgICAgICh2aWV3Q2hhbmdlKT1cIm9uVmlld0NoYW5nZSgpXCIgXG4gICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiIFxuICAgICAgICAgICAgICAgIFtleGNsdWRlRGF5c109XCJleGNsdWRlRGF5c1wiPlxuICAgICAgICBOZXh0XG4gICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICA8L21hdC1idXR0b24tdG9nZ2xlLWdyb3VwPlxuICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZXZlbnQtYnV0dG9uXCIgKm5nSWY9XCJzaG93QWRkRXZlbnRcIiAoY2xpY2spPVwiYWRkRXZlbnRDbGljaygpXCIgbWF0LXJhaXNlZC1idXR0b24+PG1hdC1pY29uIGNsYXNzPVwiYWRkLWljb24tdmlld1wiPmFkZDwvbWF0LWljb24+IEFkZCBFdmVudDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkYXRlLXZpZXctY29udGFpbmVyXCI+XG4gICAgICA8bWF0LWljb24gbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXcgXG4gICAgICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiIFxuICAgICAgW3ZpZXddPVwidmlld1wiIFxuICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cIm9uVmlld0RhdGVDaGFuZ2UoJ1ByZXZpb3VzJylcIiBcbiAgICAgICh2aWV3Q2hhbmdlKT1cIm9uVmlld0NoYW5nZSgpXCIgXG4gICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCIgXG4gICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIj5hcnJvd19sZWZ0PC9tYXQtaWNvbj5cbiAgICAgIDxoMyBjbGFzcz1cImRhdGUtdmlld1wiPnt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOidlbicgfX08L2gzPlxuICAgICAgPG1hdC1pY29uIG13bENhbGVuZGFyTmV4dFZpZXcgXG4gICAgICBbdmlld109XCJ2aWV3XCIgXG4gICAgICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiIFxuICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cIm9uVmlld0RhdGVDaGFuZ2UoJ05leHQnKVwiIFxuICAgICAgKHZpZXdDaGFuZ2UpPVwib25WaWV3Q2hhbmdlKClcIiBcbiAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIiBcbiAgICAgIFtleGNsdWRlRGF5c109XCJleGNsdWRlRGF5c1wiPmFycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIGNsYXNzPVwiZGF5LXRvZ2dsZS12aWV3XCIgaWQ9XCJ0b2dnbGUtZ3JvdXBcIiBuYW1lPVwiZm9udFN0eWxlXCIgYXJpYS1sYWJlbD1cIkZvbnQgU3R5bGVcIiAjZ3JvdXA9XCJtYXRCdXR0b25Ub2dnbGVHcm91cFwiPlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgY2xhc3M9XCJkYXktdmlld1wiIGlkPVwidG9nZ2xlLWJ1dHRvblwiICpuZ0lmPVwic2hvd0RheUJ0blwiIChjbGljayk9XCJvblNldFZpZXcoJ2RheScpXCIgW2NoZWNrZWRdPVwidmlldyA9PT0gJ2RheSdcIj5EYXk8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgY2xhc3M9XCJ3ZWVrLXZpZXdcImlkPVwidG9nZ2xlLWJ1dHRvblwiICpuZ0lmPVwic2hvd1dlZWtCdG5cIiAoY2xpY2spPVwib25TZXRWaWV3KCd3ZWVrJylcIiBbY2hlY2tlZF09XCJ2aWV3ID09PSAnd2VlaydcIj5XZWVrPC9tYXQtYnV0dG9uLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlIGlkPVwidG9nZ2xlLWJ1dHRvblwiICpuZ0lmPVwic2hvd01vbnRoQnRuXCIgKGNsaWNrKT1cIm9uU2V0VmlldygnbW9udGgnKVwiIFtjaGVja2VkXT1cInZpZXcgPT09ICdtb250aCdcIj5Nb250aDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICA8L21hdC1idXR0b24tdG9nZ2xlLWdyb3VwPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSB2aWV3OiBDYWxlbmRhclZpZXcgfCAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSc7XG5cbiAgLyoqXG4gICAqIERheXMgdG8gc2tpcCB3aGVuIGdvaW5nIGJhY2sgYnkgMSBkYXlcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBJZiBzZXQgd2lsbCBzdWJ0cmFjdCB0aGlzIGFtb3VudCBvZiBkYXlzIGluc3RlYWQgb2YgMSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNldFZpZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkFkZEV2ZW50Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkVkaXRFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25EZWxldGVFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25BZGRFdmVudFNhdmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93UHJldmlvdXNEYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9kYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TmV4dERheUJ0bjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2hvd01vbnRoQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1dlZWtCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RGF5QnRuOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93QWRkRXZlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93Q2FwdHVyZUV2ZW50RGlhbG9nOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0V2ZW50RGV0YWlsc0RpYWxvZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUNhcHR1cmVFdmVudERpYWxvZzogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgY3VzdG9tRXZlbnREaWFsb2c6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29sdW1uSGVhZGVyczogYW55O1xuICBldmVudHM6IENhbGVuZGFyRXZlbnQ8YW55PltdO1xuICBiZWZvcmVWaWV3UmVuZGVyOiBhbnk7XG4gIHBhZ2UgPSBcImhlYWRlclwiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICAgIHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3O1xuICAgIHRoaXMuc2V0Vmlldy5lbWl0KHRoaXMudmlldyk7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmdldE5hdkNoYW5nZUVtaXR0ZXIoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YS52YWx1ZSkge1xuICAgICAgICBjYXNlICdFRElUX0VWRU5UX0NMSUNLRUQnOlxuICAgICAgICAgIHRoaXMub3BlbkRpYWxvZygnRURJVCcsIGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBRERfU0FWRV9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50U2F2ZUNsaWNrKGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFRElUX1NBVkVfQ0xJQ0tFRCc6XG4gICAgICAgICAgdGhpcy5lZGl0RXZlbnRTYXZlQ2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFTEVURV9FVkVOVF9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50Q2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblZpZXdDaGFuZ2UoKSB7XG4gICAgdGhpcy52aWV3Q2hhbmdlLmVtaXQoKTtcbiAgfVxuXG4gIG9uVmlld0RhdGVDaGFuZ2UodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnUHJldmlvdXMnKSB7XG4gICAgICBjb25zdCBzdWJGbjogYW55ID0ge1xuICAgICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViRGF5cyxcbiAgICAgICAgd2VlazogdGhpcy5kYXRlQWRhcHRlci5zdWJXZWVrcyxcbiAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViTW9udGhzXG4gICAgICB9W3RoaXMudmlld107XG4gICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdWJGbih0aGlzLnZpZXdEYXRlLCAwKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnTmV4dCcpIHtcbiAgICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XG4gICAgICAgIGRheTogdGhpcy5kYXRlQWRhcHRlci5hZGREYXlzLFxuICAgICAgICB3ZWVrOiB0aGlzLmRhdGVBZGFwdGVyLmFkZFdlZWtzLFxuICAgICAgICBtb250aDogdGhpcy5kYXRlQWRhcHRlci5hZGRNb250aHNcbiAgICAgIH1bdGhpcy52aWV3XTtcbiAgICAgIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5EYXkpIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxuICAgICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LldlZWsgJiYgdGhpcy5kYXlzSW5XZWVrKSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAgIHRoaXMuZGF5c0luV2VlayxcbiAgICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoYWRkRm4odGhpcy52aWV3RGF0ZSwgMCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU2V0Vmlldyh2aWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLnNldFZpZXcuZW1pdCh2aWV3KTtcbiAgfVxuXG4gIGFkZEV2ZW50Q2xpY2soKSB7XG4gICAgdGhpcy5vbkFkZEV2ZW50Q2xpY2suZW1pdCgpO1xuICAgIHRoaXMub3BlbkRpYWxvZygnQUREJywgbnVsbCk7XG4gIH1cblxuICBhZGRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25BZGRFdmVudFNhdmVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGVkaXRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25FZGl0RXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGRlbGV0ZUV2ZW50Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLm9uRGVsZXRlRXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2codHlwZSwgZGF0YSkge1xuICAgIGxldCB0ZW1wbGF0ZTogYW55ID0gbnVsbFxuICAgIGlmICh0eXBlID09PSAnRURJVCcpIHtcbiAgICAgIGlmICh0aGlzLnNob3dFdmVudERldGFpbHNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcGxhdGUgPSBDYWxlbmRhck1vZGFsQ29tcG9uZW50O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUV2ZW50RGlhbG9nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGUgPSB0aGlzLmN1c3RvbUV2ZW50RGlhbG9nXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdBREQnKSB7XG4gICAgICBpZiAodGhpcy5zaG93Q2FwdHVyZUV2ZW50RGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXBsYXRlID0gQ2FsZW5kYXJNb2RhbENvbXBvbmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21DYXB0dXJlRXZlbnREaWFsb2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZSA9IHRoaXMuY3VzdG9tQ2FwdHVyZUV2ZW50RGlhbG9nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGVtcGxhdGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4odGVtcGxhdGUsIHtcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSk7XG5cbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=