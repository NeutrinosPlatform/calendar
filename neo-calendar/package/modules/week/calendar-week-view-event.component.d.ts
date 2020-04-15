import { EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { WeekViewAllDayEvent, WeekViewTimeEvent, WeekViewHourColumn } from 'calendar-utils';
import { PlacementArray } from 'positioning';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export declare class CalendarWeekViewEventComponent implements OnInit {
    eventEmitterService: EventEmitterService;
    locale: string;
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent;
    tooltipPlacement: PlacementArray;
    tooltipAppendToBody: boolean;
    tooltipDisabled: boolean;
    tooltipDelay: number | null;
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventActionsTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    column: WeekViewHourColumn;
    daysInWeek: number;
    eventClicked: EventEmitter<{
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    constructor(eventEmitterService: EventEmitterService);
    ngOnInit(): void;
    onEventClick(event: any): void;
}
