import { TemplateRef } from '@angular/core';
import { CalendarEvent, EventAction } from 'calendar-utils';
import { EventEmitterService } from './calendar-event-emitter.service';
export declare class CalendarEventActionsComponent {
    eventEmitterService: EventEmitterService;
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    constructor(eventEmitterService: EventEmitterService);
    trackByActionId: (index: number, action: EventAction) => string | number | EventAction;
    onEventClick(event: any, action: any): void;
}
