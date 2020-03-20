import { TemplateRef, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
export declare class CalendarEventTitleComponent implements OnInit {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    view: string;
    ngOnInit(): void;
}
