import { EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { CalendarEvent } from 'calendar-utils';
import { isWithinThreshold } from '../common/util';
export declare const collapseAnimation: AnimationTriggerMetadata;
export declare class CalendarOpenDayEventsComponent implements OnInit {
    locale: string;
    isOpen: boolean;
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventActionsTemplate: TemplateRef<any>;
    date: Date;
    eventClicked: EventEmitter<{
        event: CalendarEvent<any>;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
    validateDrag: typeof isWithinThreshold;
    ngOnInit(): void;
}
