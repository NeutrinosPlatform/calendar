import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from '../common/calendar-view.enum';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { addDaysWithExclusions } from '../common/util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
let CalendarCommonHeaderComponent = class CalendarCommonHeaderComponent {
    constructor(dateAdapter, eventEmitterService, dialog) {
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
    ngOnInit() {
        this.view = this.view;
        this.setView.emit(this.view);
        this.eventEmitterService.getNavChangeEmitter().subscribe((data) => {
            switch (data.value) {
                case 'EDIT_EVENT_CLICKED':
                    this.openDialog('EDIT', data.event);
                    break;
                case 'ADD_SAVE_CLICKED':
                    this.addEventSaveClick(data.event);
                    break;
                case 'EDIT_SAVE_CLICKED':
                    this.editEventSaveClick(data.event);
                    break;
                case 'DELETE_EVENT_CLICKED':
                    this.deleteEventClick(data.event);
                    break;
                default:
            }
        });
    }
    onViewChange() {
        this.viewChange.emit();
    }
    onViewDateChange(type) {
        if (type === 'Previous') {
            const subFn = {
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
            const addFn = {
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
    }
    onSetView(view) {
        this.view = view;
        this.setView.emit(view);
    }
    addEventClick() {
        this.onAddEventClick.emit();
        this.openDialog('ADD', null);
    }
    addEventSaveClick(event) {
        this.onAddEventSaveClick.emit(event);
    }
    editEventSaveClick(event) {
        this.onEditEventClick.emit(event);
    }
    deleteEventClick(event) {
        this.onDeleteEventClick.emit(event);
    }
    openDialog(type, data) {
        let template = null;
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
            const dialogRef = this.dialog.open(template, {
                data: data
            });
            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
};
CalendarCommonHeaderComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: EventEmitterService },
    { type: MatDialog }
];
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
        template: `  
  <div>
  <h1 class="calendar-header-text">Calendar </h1> 
  <div class="header-container">
     
    <div class="header-view">
      <div>
        <mat-button-toggle-group id="today-toggle-group" name="fontStyle" aria-label="Font Style"
        #group="matButtonToggleGroup">
        <mat-button-toggle class="previous-button" id="toggle-button" 
          *ngIf="showPreviousDayBtn"
          mwlCalendarPreviousView 
          [(viewDate)]="viewDate" 
          [view]="view" 
          (viewDateChange)="onViewDateChange('Previous')" 
          (viewChange)="onViewChange()" 
          [daysInWeek]="daysInWeek" 
          [excludeDays]="excludeDays">
          Previous
        </mat-button-toggle>
        <mat-button-toggle class="today-button" id="toggle-button" 
        *ngIf="showTodayBtn"
                mwlCalendarToday 
                [(viewDate)]="viewDate" 
                (viewDateChange)="viewDateChange.next(viewDate)">
        Today
        </mat-button-toggle>
        <mat-button-toggle id="toggle-button" 
        *ngIf="showNextDayBtn"
                mwlCalendarNextView 
                [view]="view" 
                [(viewDate)]="viewDate" 
                (viewDateChange)="onViewDateChange('Next')" 
                (viewChange)="onViewChange()" 
                [daysInWeek]="daysInWeek" 
                [excludeDays]="excludeDays">
        Next
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
      
      <button class="event-button" *ngIf="showAddEvent" (click)="addEventClick()" mat-raised-button><mat-icon class="add-icon-view">add</mat-icon> Add Event</button>
    </div>
    <div class="date-view-container">
      <mat-icon mwlCalendarPreviousView 
      [(viewDate)]="viewDate" 
      [view]="view" 
      (viewDateChange)="onViewDateChange('Previous')" 
      (viewChange)="onViewChange()" 
      [daysInWeek]="daysInWeek" 
      [excludeDays]="excludeDays">arrow_left</mat-icon>
      <h3 class="date-view">{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
      <mat-icon mwlCalendarNextView 
      [view]="view" 
      [(viewDate)]="viewDate" 
      (viewDateChange)="onViewDateChange('Next')" 
      (viewChange)="onViewChange()" 
      [daysInWeek]="daysInWeek" 
      [excludeDays]="excludeDays">arrow_right</mat-icon>
    </div>
    <div>
      <mat-button-toggle-group class="day-toggle-view" id="toggle-group" name="fontStyle" aria-label="Font Style" #group="matButtonToggleGroup">
        <mat-button-toggle class="day-view" id="toggle-button" *ngIf="showDayBtn" (click)="onSetView('day')" [checked]="view === 'day'">Day</mat-button-toggle>
        <mat-button-toggle class="week-view"id="toggle-button" *ngIf="showWeekBtn" (click)="onSetView('week')" [checked]="view === 'week'">Week</mat-button-toggle>
        <mat-button-toggle id="toggle-button" *ngIf="showMonthBtn" (click)="onSetView('month')" [checked]="view === 'month'">Month</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
</div>
</div>
  `,
        styles: [".header-container{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;padding:20px!important}.header-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header-view>div{margin-right:3%}.event-button{background:#404041;color:#fff;width:136px;height:42px;border-radius:4px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.add-icon-view{font-size:22px!important}#today-toggle-group{max-width:210px;width:auto;border-radius:4px;background-color:#fff}#toggle-button{padding-top:4px;padding-bottom:4px;border-left:none}.day-view,.previous-button,.today-button{position:relative}.day-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.week-view{position:relative}.previous-button::after,.today-button::after,.week-view::after{content:\" \";position:absolute;border-right:1px solid #d3d3d3!important;top:22%;right:0;height:50%;margin-top:auto;margin-bottom:auto}.calendar-header-text{font-size:32px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.02px;padding-left:16px;color:#404041;font-family:poppins}#toggle-group{max-width:188px!important;width:auto;height:42px;border-radius:4px;background-color:#fff}#toggle-button-button{width:92px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important;height:32px}#toggle-button-button>div{width:75px;height:25px;font-size:18px;font-weight:400;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.01px;text-align:left;color:#404041}#today-toggle-group .mat-button-toggle{height:34px;display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.previous-button{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.date-view{height:20px;font-size:14px!important;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:normal;text-align:left;color:#4d585e;margin:0!important;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.date-view-container{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;cursor:pointer}.day-view{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.mat-button-toggle-checked{color:#fff;background-color:#404041;border-radius:3px}.mat-button-toggle{display:-webkit-box!important;display:flex!important;-webkit-box-align:center!important;align-items:center!important}.cal-month-view .cal-cell-top{border:1px solid #dadbdd!important}@media (max-width:767px){.header-container{width:100%!important;display:-webkit-box!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important;-webkit-box-pack:center!important;justify-content:center!important;-webkit-box-align:center!important;align-items:center!important;padding:0!important}.date-view-container,.day-toggle-view,.header-view{margin-bottom:12px}}@media (max-width:350px){#today-toggle-group{margin-bottom:12px}.header-view{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}}"]
    })
], CalendarCommonHeaderComponent);
export { CalendarCommonHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQTRFL0UsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUF1RHhDLFlBQW9CLFdBQXdCLEVBQ25DLG1CQUF3QyxFQUN4QyxNQUFpQjtRQUZOLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQTVDMUI7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQVFwQzs7V0FFRztRQUNPLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQUcs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFFVDs7S0FDRixDQUFDO0dBQ1csNkJBQTZCLENBOEx6QztTQTlMWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyVmlldyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci12aWV3LmVudW0nO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHMsIGdldFdlZWtWaWV3UGVyaW9kIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQgeyBhZGREYXlzV2l0aEV4Y2x1c2lvbnMgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrRGF5LFxuICBNb250aFZpZXcsXG4gIE1vbnRoVmlld0RheSxcbiAgVmlld1BlcmlvZFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENhbGVuZGFyTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC1lbWl0dGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItaGVhZGVyJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgICBcbiAgPGRpdj5cbiAgPGgxIGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyLXRleHRcIj5DYWxlbmRhciA8L2gxPiBcbiAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj5cbiAgICAgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlci12aWV3XCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAgaWQ9XCJ0b2RheS10b2dnbGUtZ3JvdXBcIiBuYW1lPVwiZm9udFN0eWxlXCIgYXJpYS1sYWJlbD1cIkZvbnQgU3R5bGVcIlxuICAgICAgICAjZ3JvdXA9XCJtYXRCdXR0b25Ub2dnbGVHcm91cFwiPlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgY2xhc3M9XCJwcmV2aW91cy1idXR0b25cIiBpZD1cInRvZ2dsZS1idXR0b25cIiBcbiAgICAgICAgICAqbmdJZj1cInNob3dQcmV2aW91c0RheUJ0blwiXG4gICAgICAgICAgbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXcgXG4gICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIiBcbiAgICAgICAgICBbdmlld109XCJ2aWV3XCIgXG4gICAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cIm9uVmlld0RhdGVDaGFuZ2UoJ1ByZXZpb3VzJylcIiBcbiAgICAgICAgICAodmlld0NoYW5nZSk9XCJvblZpZXdDaGFuZ2UoKVwiIFxuICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIiBcbiAgICAgICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIj5cbiAgICAgICAgICBQcmV2aW91c1xuICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgY2xhc3M9XCJ0b2RheS1idXR0b25cIiBpZD1cInRvZ2dsZS1idXR0b25cIiBcbiAgICAgICAgKm5nSWY9XCJzaG93VG9kYXlCdG5cIlxuICAgICAgICAgICAgICAgIG13bENhbGVuZGFyVG9kYXkgXG4gICAgICAgICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIiBcbiAgICAgICAgICAgICAgICAodmlld0RhdGVDaGFuZ2UpPVwidmlld0RhdGVDaGFuZ2UubmV4dCh2aWV3RGF0ZSlcIj5cbiAgICAgICAgVG9kYXlcbiAgICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlIGlkPVwidG9nZ2xlLWJ1dHRvblwiIFxuICAgICAgICAqbmdJZj1cInNob3dOZXh0RGF5QnRuXCJcbiAgICAgICAgICAgICAgICBtd2xDYWxlbmRhck5leHRWaWV3IFxuICAgICAgICAgICAgICAgIFt2aWV3XT1cInZpZXdcIiBcbiAgICAgICAgICAgICAgICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiIFxuICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdOZXh0JylcIiBcbiAgICAgICAgICAgICAgICAodmlld0NoYW5nZSk9XCJvblZpZXdDaGFuZ2UoKVwiIFxuICAgICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIiBcbiAgICAgICAgICAgICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIj5cbiAgICAgICAgTmV4dFxuICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cD5cbiAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImV2ZW50LWJ1dHRvblwiICpuZ0lmPVwic2hvd0FkZEV2ZW50XCIgKGNsaWNrKT1cImFkZEV2ZW50Q2xpY2soKVwiIG1hdC1yYWlzZWQtYnV0dG9uPjxtYXQtaWNvbiBjbGFzcz1cImFkZC1pY29uLXZpZXdcIj5hZGQ8L21hdC1pY29uPiBBZGQgRXZlbnQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS12aWV3LWNvbnRhaW5lclwiPlxuICAgICAgPG1hdC1pY29uIG13bENhbGVuZGFyUHJldmlvdXNWaWV3IFxuICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIiBcbiAgICAgIFt2aWV3XT1cInZpZXdcIiBcbiAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdQcmV2aW91cycpXCIgXG4gICAgICAodmlld0NoYW5nZSk9XCJvblZpZXdDaGFuZ2UoKVwiIFxuICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiIFxuICAgICAgW2V4Y2x1ZGVEYXlzXT1cImV4Y2x1ZGVEYXlzXCI+YXJyb3dfbGVmdDwvbWF0LWljb24+XG4gICAgICA8aDMgY2xhc3M9XCJkYXRlLXZpZXdcIj57eyB2aWV3RGF0ZSB8IGNhbGVuZGFyRGF0ZToodmlldyArICdWaWV3VGl0bGUnKTonZW4nIH19PC9oMz5cbiAgICAgIDxtYXQtaWNvbiBtd2xDYWxlbmRhck5leHRWaWV3IFxuICAgICAgW3ZpZXddPVwidmlld1wiIFxuICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIiBcbiAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdOZXh0JylcIiBcbiAgICAgICh2aWV3Q2hhbmdlKT1cIm9uVmlld0NoYW5nZSgpXCIgXG4gICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCIgXG4gICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIj5hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCBjbGFzcz1cImRheS10b2dnbGUtdmlld1wiIGlkPVwidG9nZ2xlLWdyb3VwXCIgbmFtZT1cImZvbnRTdHlsZVwiIGFyaWEtbGFiZWw9XCJGb250IFN0eWxlXCIgI2dyb3VwPVwibWF0QnV0dG9uVG9nZ2xlR3JvdXBcIj5cbiAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlIGNsYXNzPVwiZGF5LXZpZXdcIiBpZD1cInRvZ2dsZS1idXR0b25cIiAqbmdJZj1cInNob3dEYXlCdG5cIiAoY2xpY2spPVwib25TZXRWaWV3KCdkYXknKVwiIFtjaGVja2VkXT1cInZpZXcgPT09ICdkYXknXCI+RGF5PC9tYXQtYnV0dG9uLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlIGNsYXNzPVwid2Vlay12aWV3XCJpZD1cInRvZ2dsZS1idXR0b25cIiAqbmdJZj1cInNob3dXZWVrQnRuXCIgKGNsaWNrKT1cIm9uU2V0Vmlldygnd2VlaycpXCIgW2NoZWNrZWRdPVwidmlldyA9PT0gJ3dlZWsnXCI+V2VlazwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZSBpZD1cInRvZ2dsZS1idXR0b25cIiAqbmdJZj1cInNob3dNb250aEJ0blwiIChjbGljayk9XCJvblNldFZpZXcoJ21vbnRoJylcIiBbY2hlY2tlZF09XCJ2aWV3ID09PSAnbW9udGgnXCI+TW9udGg8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21tb25IZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgdmlldzogQ2FsZW5kYXJWaWV3IHwgJ21vbnRoJyB8ICd3ZWVrJyB8ICdkYXknO1xuXG4gIC8qKlxuICAgKiBEYXlzIHRvIHNraXAgd2hlbiBnb2luZyBiYWNrIGJ5IDEgZGF5XG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBkYXlzIGluIGEgd2Vlay4gSWYgc2V0IHdpbGwgc3VidHJhY3QgdGhpcyBhbW91bnQgb2YgZGF5cyBpbnN0ZWFkIG9mIDEgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xuICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IG51bWJlcjtcbiAgQElucHV0KCkgd2Vla2VuZERheXM6IG51bWJlcltdO1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZXRWaWV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25BZGRFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25FZGl0RXZlbnRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRGVsZXRlRXZlbnRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQWRkRXZlbnRTYXZlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1ByZXZpb3VzRGF5QnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1RvZGF5QnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd05leHREYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNob3dNb250aEJ0bjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dXZWVrQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0RheUJ0bjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2hvd0FkZEV2ZW50OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0NhcHR1cmVFdmVudERpYWxvZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dFdmVudERldGFpbHNEaWFsb2c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjdXN0b21DYXB0dXJlRXZlbnREaWFsb2c6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGN1c3RvbUV2ZW50RGlhbG9nOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbHVtbkhlYWRlcnM6IGFueTtcbiAgZXZlbnRzOiBDYWxlbmRhckV2ZW50PGFueT5bXTtcbiAgYmVmb3JlVmlld1JlbmRlcjogYW55O1xuICBwYWdlID0gXCJoZWFkZXJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcixcbiAgICBwdWJsaWMgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmlldyA9IHRoaXMudmlldztcbiAgICB0aGlzLnNldFZpZXcuZW1pdCh0aGlzLnZpZXcpO1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyU2VydmljZS5nZXROYXZDaGFuZ2VFbWl0dGVyKCkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBzd2l0Y2ggKGRhdGEudmFsdWUpIHtcbiAgICAgICAgY2FzZSAnRURJVF9FVkVOVF9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2coJ0VESVQnLCBkYXRhLmV2ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQUREX1NBVkVfQ0xJQ0tFRCc6XG4gICAgICAgICAgdGhpcy5hZGRFdmVudFNhdmVDbGljayhkYXRhLmV2ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRURJVF9TQVZFX0NMSUNLRUQnOlxuICAgICAgICAgIHRoaXMuZWRpdEV2ZW50U2F2ZUNsaWNrKGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdERUxFVEVfRVZFTlRfQ0xJQ0tFRCc6XG4gICAgICAgICAgdGhpcy5kZWxldGVFdmVudENsaWNrKGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25WaWV3Q2hhbmdlKCkge1xuICAgIHRoaXMudmlld0NoYW5nZS5lbWl0KCk7XG4gIH1cblxuICBvblZpZXdEYXRlQ2hhbmdlKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gJ1ByZXZpb3VzJykge1xuICAgICAgY29uc3Qgc3ViRm46IGFueSA9IHtcbiAgICAgICAgZGF5OiB0aGlzLmRhdGVBZGFwdGVyLnN1YkRheXMsXG4gICAgICAgIHdlZWs6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViV2Vla3MsXG4gICAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLnN1Yk1vbnRoc1xuICAgICAgfVt0aGlzLnZpZXddO1xuICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LkRheSkge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxuICAgICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoc3ViRm4odGhpcy52aWV3RGF0ZSwgMCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ05leHQnKSB7XG4gICAgICBjb25zdCBhZGRGbjogYW55ID0ge1xuICAgICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkRGF5cyxcbiAgICAgICAgd2VlazogdGhpcy5kYXRlQWRhcHRlci5hZGRXZWVrcyxcbiAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTW9udGhzXG4gICAgICB9W3RoaXMudmlld107XG4gICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICB0aGlzLmRheXNJbldlZWssXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIDApKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblNldFZpZXcodmlldykge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5zZXRWaWV3LmVtaXQodmlldyk7XG4gIH1cblxuICBhZGRFdmVudENsaWNrKCkge1xuICAgIHRoaXMub25BZGRFdmVudENsaWNrLmVtaXQoKTtcbiAgICB0aGlzLm9wZW5EaWFsb2coJ0FERCcsIG51bGwpO1xuICB9XG5cbiAgYWRkRXZlbnRTYXZlQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLm9uQWRkRXZlbnRTYXZlQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBlZGl0RXZlbnRTYXZlQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLm9uRWRpdEV2ZW50Q2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBkZWxldGVFdmVudENsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5vbkRlbGV0ZUV2ZW50Q2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBvcGVuRGlhbG9nKHR5cGUsIGRhdGEpIHtcbiAgICBsZXQgdGVtcGxhdGU6IGFueSA9IG51bGxcbiAgICBpZiAodHlwZSA9PT0gJ0VESVQnKSB7XG4gICAgICBpZiAodGhpcy5zaG93RXZlbnREZXRhaWxzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXBsYXRlID0gQ2FsZW5kYXJNb2RhbENvbXBvbmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21FdmVudERpYWxvZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRlbXBsYXRlID0gdGhpcy5jdXN0b21FdmVudERpYWxvZ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnQUREJykge1xuICAgICAgaWYgKHRoaXMuc2hvd0NhcHR1cmVFdmVudERpYWxvZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0ZW1wbGF0ZSA9IENhbGVuZGFyTW9kYWxDb21wb25lbnQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tQ2FwdHVyZUV2ZW50RGlhbG9nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGUgPSB0aGlzLmN1c3RvbUNhcHR1cmVFdmVudERpYWxvZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKHRlbXBsYXRlLCB7XG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuXG4gICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19