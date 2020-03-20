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
  
  <div class="row text-center">
          <div class="col-md-4">
                <div class="btn-group">
                    <div *ngIf="showPreviousDayBtn" class="btn btn-primary"
                      mwlCalendarPreviousView
                      [(viewDate)]="viewDate"
                      [view]="view"
                      (viewDateChange)="onViewDateChange('Previous')"
                      (viewChange)="onViewChange()"
                      [daysInWeek]="daysInWeek"
                      [excludeDays]="excludeDays"
                      >
                          Previous
                    </div>
                      <div *ngIf="showTodayBtn" class="btn btn-outline-secondary"
                        mwlCalendarToday
                        [(viewDate)]="viewDate"
                        (viewDateChange)="viewDateChange.next(viewDate)">
                          Today
                      </div>
                      <div *ngIf="showNextDayBtn" class="btn btn-primary"        
                        mwlCalendarNextView
                        [view]="view"
                        [(viewDate)]="viewDate"
                        (viewDateChange)="onViewDateChange('Next')"
                        (viewChange)="onViewChange()"
                        [daysInWeek]="daysInWeek"
                        [excludeDays]="excludeDays"
                        >
                          Next
                      </div>
                </div>
                &nbsp;
                <button *ngIf="showAddEvent" (click)="addEventClick()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModal">
                  Add Event
                </button> 
           </div>
          <div class="col-md-4">
            <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
          </div>
          <div class="col-md-4">
                  <div class="btn-group">
                    <div *ngIf="showMonthBtn" class="btn btn-primary" (click)="onSetView('month')" [class.active]="view === 'month'">
                      Month
                    </div>
                    <div *ngIf="showWeekBtn" class="btn btn-primary" (click)="onSetView('week')" [class.active]="view === 'week'">
                      Week
                    </div>
                    <div *ngIf="showDayBtn" class="btn btn-primary" (click)="onSetView('day')" [class.active]="view === 'day'">
                      Day
                    </div>
                  </div>
            </div>
  </div>
  `
    })
], CalendarCommonHeaderComponent);
export { CalendarCommonHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQThEL0UsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUF1RHhDLFlBQW9CLFdBQXdCLEVBQ25DLG1CQUF3QyxFQUN4QyxNQUFpQjtRQUZOLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQTVDMUI7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQVFwQzs7V0FFRztRQUNPLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQUcs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RUO0tBQ0YsQ0FBQztHQUNXLDZCQUE2QixDQThMekM7U0E5TFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdmlldy5lbnVtJztcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzLCBnZXRXZWVrVmlld1BlcmlvZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgYWRkRGF5c1dpdGhFeGNsdXNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgV2Vla0RheSxcbiAgTW9udGhWaWV3LFxuICBNb250aFZpZXdEYXksXG4gIFZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gIFxuICA8ZGl2IGNsYXNzPVwicm93IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1ByZXZpb3VzRGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG13bENhbGVuZGFyUHJldmlvdXNWaWV3XG4gICAgICAgICAgICAgICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFt2aWV3XT1cInZpZXdcIlxuICAgICAgICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdQcmV2aW91cycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAodmlld0NoYW5nZSk9XCJvblZpZXdDaGFuZ2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2V4Y2x1ZGVEYXlzXT1cImV4Y2x1ZGVEYXlzXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VG9kYXlCdG5cIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbXdsQ2FsZW5kYXJUb2RheVxuICAgICAgICAgICAgICAgICAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cInZpZXdEYXRlQ2hhbmdlLm5leHQodmlld0RhdGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFRvZGF5XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dOZXh0RGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBtd2xDYWxlbmRhck5leHRWaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICBbdmlld109XCJ2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2aWV3RGF0ZUNoYW5nZSk9XCJvblZpZXdEYXRlQ2hhbmdlKCdOZXh0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKHZpZXdDaGFuZ2UpPVwib25WaWV3Q2hhbmdlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZXhjbHVkZURheXNdPVwiZXhjbHVkZURheXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dBZGRFdmVudFwiIChjbGljayk9XCJhZGRFdmVudENsaWNrKClcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjYmFzaWNFeGFtcGxlTW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgIEFkZCBFdmVudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPiBcbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICA8aDM+e3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6J2VuJyB9fTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93TW9udGhCdG5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvblNldFZpZXcoJ21vbnRoJylcIiBbY2xhc3MuYWN0aXZlXT1cInZpZXcgPT09ICdtb250aCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICBNb250aFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrQnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25TZXRWaWV3KCd3ZWVrJylcIiBbY2xhc3MuYWN0aXZlXT1cInZpZXcgPT09ICd3ZWVrJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIFdlZWtcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93RGF5QnRuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25TZXRWaWV3KCdkYXknKVwiIFtjbGFzcy5hY3RpdmVdPVwidmlldyA9PT0gJ2RheSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICBEYXlcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSB2aWV3OiBDYWxlbmRhclZpZXcgfCAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSc7XG5cbiAgLyoqXG4gICAqIERheXMgdG8gc2tpcCB3aGVuIGdvaW5nIGJhY2sgYnkgMSBkYXlcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBJZiBzZXQgd2lsbCBzdWJ0cmFjdCB0aGlzIGFtb3VudCBvZiBkYXlzIGluc3RlYWQgb2YgMSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNldFZpZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkFkZEV2ZW50Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkVkaXRFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25EZWxldGVFdmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25BZGRFdmVudFNhdmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93UHJldmlvdXNEYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9kYXlCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TmV4dERheUJ0bjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2hvd01vbnRoQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1dlZWtCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RGF5QnRuOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93QWRkRXZlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93Q2FwdHVyZUV2ZW50RGlhbG9nOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0V2ZW50RGV0YWlsc0RpYWxvZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUNhcHR1cmVFdmVudERpYWxvZzogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgY3VzdG9tRXZlbnREaWFsb2c6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29sdW1uSGVhZGVyczogYW55O1xuICBldmVudHM6IENhbGVuZGFyRXZlbnQ8YW55PltdO1xuICBiZWZvcmVWaWV3UmVuZGVyOiBhbnk7XG4gIHBhZ2UgPSBcImhlYWRlclwiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICAgIHB1YmxpYyBldmVudEVtaXR0ZXJTZXJ2aWNlOiBFdmVudEVtaXR0ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3O1xuICAgIHRoaXMuc2V0Vmlldy5lbWl0KHRoaXMudmlldyk7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmdldE5hdkNoYW5nZUVtaXR0ZXIoKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YS52YWx1ZSkge1xuICAgICAgICBjYXNlICdFRElUX0VWRU5UX0NMSUNLRUQnOlxuICAgICAgICAgIHRoaXMub3BlbkRpYWxvZygnRURJVCcsIGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBRERfU0FWRV9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50U2F2ZUNsaWNrKGRhdGEuZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFRElUX1NBVkVfQ0xJQ0tFRCc6XG4gICAgICAgICAgdGhpcy5lZGl0RXZlbnRTYXZlQ2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFTEVURV9FVkVOVF9DTElDS0VEJzpcbiAgICAgICAgICB0aGlzLmRlbGV0ZUV2ZW50Q2xpY2soZGF0YS5ldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblZpZXdDaGFuZ2UoKSB7XG4gICAgdGhpcy52aWV3Q2hhbmdlLmVtaXQoKTtcbiAgfVxuXG4gIG9uVmlld0RhdGVDaGFuZ2UodHlwZSkge1xuICAgIGlmKHR5cGUgPT09ICdQcmV2aW91cycpe1xuICAgICAgY29uc3Qgc3ViRm46IGFueSA9IHtcbiAgICAgICAgZGF5OiB0aGlzLmRhdGVBZGFwdGVyLnN1YkRheXMsXG4gICAgICAgIHdlZWs6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViV2Vla3MsXG4gICAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLnN1Yk1vbnRoc1xuICAgICAgfVt0aGlzLnZpZXddO1xuICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LkRheSkge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxuICAgICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoc3ViRm4odGhpcy52aWV3RGF0ZSwgMCkpO1xuICAgICAgfVxuICAgIH1lbHNlIGlmKHR5cGUgPT09ICdOZXh0Jyl7XG4gICAgICBjb25zdCBhZGRGbjogYW55ID0ge1xuICAgICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkRGF5cyxcbiAgICAgICAgd2VlazogdGhpcy5kYXRlQWRhcHRlci5hZGRXZWVrcyxcbiAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTW9udGhzXG4gICAgICB9W3RoaXMudmlld107XG4gICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XG4gICAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xuICAgICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgICB0aGlzLmRheXNJbldlZWssXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIDApKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gIFxuXG4gIG9uU2V0Vmlldyh2aWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLnNldFZpZXcuZW1pdCh2aWV3KTtcbiAgfVxuXG4gIGFkZEV2ZW50Q2xpY2soKSB7XG4gICAgdGhpcy5vbkFkZEV2ZW50Q2xpY2suZW1pdCgpO1xuICAgIHRoaXMub3BlbkRpYWxvZygnQUREJywgbnVsbCk7XG4gIH1cblxuICBhZGRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25BZGRFdmVudFNhdmVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGVkaXRFdmVudFNhdmVDbGljayhldmVudCkge1xuICAgIHRoaXMub25FZGl0RXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGRlbGV0ZUV2ZW50Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLm9uRGVsZXRlRXZlbnRDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2codHlwZSwgZGF0YSkge1xuICAgIGxldCB0ZW1wbGF0ZTogYW55ID0gbnVsbFxuICAgIGlmICh0eXBlID09PSAnRURJVCcpIHtcbiAgICAgIGlmICh0aGlzLnNob3dFdmVudERldGFpbHNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcGxhdGUgPSBDYWxlbmRhck1vZGFsQ29tcG9uZW50O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUV2ZW50RGlhbG9nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGUgPSB0aGlzLmN1c3RvbUV2ZW50RGlhbG9nXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdBREQnKSB7XG4gICAgICBpZiAodGhpcy5zaG93Q2FwdHVyZUV2ZW50RGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXBsYXRlID0gQ2FsZW5kYXJNb2RhbENvbXBvbmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21DYXB0dXJlRXZlbnREaWFsb2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZSA9IHRoaXMuY3VzdG9tQ2FwdHVyZUV2ZW50RGlhbG9nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0ZW1wbGF0ZSAhPT0gbnVsbCl7XG4gICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKHRlbXBsYXRlLCB7XG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICBcbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=