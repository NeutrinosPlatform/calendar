import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CalendarView } from '../common/calendar-view.enum';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarEvent } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export declare class CalendarCommonHeaderComponent implements OnInit {
    private dateAdapter;
    eventEmitterService: EventEmitterService;
    dialog: MatDialog;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     */
    view: CalendarView | 'month' | 'week' | 'day';
    /**
     * Days to skip when going back by 1 day
     */
    excludeDays: number[];
    /**
     * The number of days in a week. If set will subtract this amount of days instead of 1 week
     */
    daysInWeek: number;
    weekStartsOn: number;
    weekendDays: number[];
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<any>;
    viewChange: EventEmitter<any>;
    setView: EventEmitter<any>;
    onAddEventClick: EventEmitter<any>;
    onEditEventClick: EventEmitter<any>;
    onDeleteEventClick: EventEmitter<any>;
    onAddEventSaveClick: EventEmitter<any>;
    showPreviousDayBtn: boolean;
    showTodayBtn: boolean;
    showNextDayBtn: boolean;
    showMonthBtn: boolean;
    showWeekBtn: boolean;
    showDayBtn: boolean;
    showAddEvent: boolean;
    showCaptureEventDialog: boolean;
    showEventDetailsDialog: boolean;
    customCaptureEventDialog: TemplateRef<any>;
    customEventDialog: TemplateRef<any>;
    columnHeaders: any;
    events: CalendarEvent<any>[];
    beforeViewRender: any;
    page: string;
    constructor(dateAdapter: DateAdapter, eventEmitterService: EventEmitterService, dialog: MatDialog);
    ngOnInit(): void;
    onViewChange(): void;
    onViewDateChange(type: any): void;
    onSetView(view: any): void;
    addEventClick(): void;
    addEventSaveClick(event: any): void;
    editEventSaveClick(event: any): void;
    deleteEventClick(event: any): void;
    openDialog(type: any, data: any): void;
}
