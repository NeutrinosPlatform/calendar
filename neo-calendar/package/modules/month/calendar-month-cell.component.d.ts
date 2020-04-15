import { EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { isWithinThreshold } from '../common/util';
import { PlacementArray } from 'positioning';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export declare class CalendarMonthCellComponent {
    eventEmitterService: EventEmitterService;
    day: MonthViewDay;
    openDay: MonthViewDay;
    locale: string;
    tooltipPlacement: PlacementArray;
    tooltipAppendToBody: boolean;
    customTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    tooltipDelay: number | null;
    highlightDay: EventEmitter<any>;
    unhighlightDay: EventEmitter<any>;
    eventActionsTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent<any>;
        sourceEvent: MouseEvent;
    }>;
    trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
    validateDrag: typeof isWithinThreshold;
    constructor(eventEmitterService: EventEmitterService);
    onEventClick(event: any): void;
}
