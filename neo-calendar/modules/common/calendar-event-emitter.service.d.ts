import { EventEmitter } from '@angular/core';
export declare class EventEmitterService {
    eventChange: EventEmitter<any>;
    constructor();
    emitNavChangeEvent(value: any, event: any): void;
    getNavChangeEmitter(): EventEmitter<any>;
}
