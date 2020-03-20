import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export declare class CalendarModalComponent implements OnInit {
    dialogRef: MatDialogRef<CalendarModalComponent>;
    eventEmitterService: EventEmitterService;
    data: any;
    constructor(dialogRef: MatDialogRef<CalendarModalComponent>, eventEmitterService: EventEmitterService, data: any);
    screenType: string;
    titlePlaceholder: string;
    locationPlaceholder: string;
    descriptionPlaceholder: string;
    ngOnInit(): void;
    assignEventDetails(): void;
    addEvents: FormGroup;
    addOrUpdateEvent(): void;
    onNoClick(): void;
}
