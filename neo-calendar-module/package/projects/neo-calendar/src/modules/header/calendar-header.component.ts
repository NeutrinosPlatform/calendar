import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef
} from '@angular/core';
import { CalendarView } from '../common/calendar-view.enum';
import { validateEvents, getWeekViewPeriod } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { addDaysWithExclusions } from '../common/util';
import {
  CalendarEvent,
  WeekDay,
  MonthView,
  MonthViewDay,
  ViewPeriod
} from 'calendar-utils';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { EventEmitterService } from '../common/calendar-event-emitter.service';

@Component({
  selector: 'mwl-calendar-header',
  styleUrls: ['./calendar-header.component.scss'],
  template: `   
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
        <mat-button-toggle id="toggle-button" 
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
        <mat-button-toggle id="toggle-button" *ngIf="showWeekBtn" (click)="onSetView('week')" [checked]="view === 'week'">Week</mat-button-toggle>
        <mat-button-toggle id="toggle-button" *ngIf="showMonthBtn" (click)="onSetView('month')" [checked]="view === 'month'">Month</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
</div>
  `
})
export class CalendarCommonHeaderComponent implements OnInit {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  /**
   * Days to skip when going back by 1 day
   */
  @Input() excludeDays: number[] = [];

  /**
   * The number of days in a week. If set will subtract this amount of days instead of 1 week
   */
  @Input() daysInWeek: number;
  @Input() weekStartsOn: number;
  @Input() weekendDays: number[];
  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange = new EventEmitter();

  @Output() viewChange = new EventEmitter();
  @Output() setView = new EventEmitter();
  @Output() onAddEventClick = new EventEmitter();
  @Output() onEditEventClick = new EventEmitter();
  @Output() onDeleteEventClick = new EventEmitter();
  @Output() onAddEventSaveClick = new EventEmitter();

  @Input() showPreviousDayBtn: boolean = true;
  @Input() showTodayBtn: boolean = true;
  @Input() showNextDayBtn: boolean = true;

  @Input() showMonthBtn: boolean = true;
  @Input() showWeekBtn: boolean = true;
  @Input() showDayBtn: boolean = true;

  @Input() showAddEvent: boolean = true;
  @Input() showCaptureEventDialog: boolean = true;
  @Input() showEventDetailsDialog: boolean = true;
  @Input() customCaptureEventDialog: TemplateRef<any>;
  @Input() customEventDialog: TemplateRef<any>;

  columnHeaders: any;
  events: CalendarEvent<any>[];
  beforeViewRender: any;
  page = "header";

  constructor(private dateAdapter: DateAdapter,
    public eventEmitterService: EventEmitterService,
    public dialog: MatDialog) { }

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
      const subFn: any = {
        day: this.dateAdapter.subDays,
        week: this.dateAdapter.subWeeks,
        month: this.dateAdapter.subMonths
      }[this.view];
      if (this.view === CalendarView.Day) {
        this.viewDateChange.emit(
          addDaysWithExclusions(
            this.dateAdapter,
            this.viewDate,
            0,
            this.excludeDays
          )
        );
      } else if (this.view === CalendarView.Week && this.daysInWeek) {
        this.viewDateChange.emit(
          addDaysWithExclusions(
            this.dateAdapter,
            this.viewDate,
            0,
            this.excludeDays
          )
        );
      } else {
        this.viewDateChange.emit(subFn(this.viewDate, 0));
      }
    } else if (type === 'Next') {
      const addFn: any = {
        day: this.dateAdapter.addDays,
        week: this.dateAdapter.addWeeks,
        month: this.dateAdapter.addMonths
      }[this.view];
      if (this.view === CalendarView.Day) {
        this.viewDateChange.emit(
          addDaysWithExclusions(
            this.dateAdapter,
            this.viewDate,
            0,
            this.excludeDays
          )
        );
      } else if (this.view === CalendarView.Week && this.daysInWeek) {
        this.viewDateChange.emit(
          addDaysWithExclusions(
            this.dateAdapter,
            this.viewDate,
            this.daysInWeek,
            this.excludeDays
          )
        );
      } else {
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
    let template: any = null
    if (type === 'EDIT') {
      if (this.showEventDetailsDialog === true) {
        template = CalendarModalComponent;
      } else if (this.customEventDialog !== undefined) {
        template = this.customEventDialog
      }
    }
    else if (type === 'ADD') {
      if (this.showCaptureEventDialog === true) {
        template = CalendarModalComponent;
      } else if (this.customCaptureEventDialog !== undefined) {
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
}
