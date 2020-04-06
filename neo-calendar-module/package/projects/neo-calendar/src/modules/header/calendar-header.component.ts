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
    if(type === 'Previous'){
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
    }else if(type === 'Next'){
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
    if(template !== null){
      const dialogRef = this.dialog.open(template, {
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
}
