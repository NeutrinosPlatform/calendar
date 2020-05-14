import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export declare class CalendarModalComponent implements OnInit {
    dialogRef: MatDialogRef<CalendarModalComponent>;
    eventEmitterService: EventEmitterService;
    data: any;
    screenType: string;
    title: string;
    titlePlaceholder: string;
    locationPlaceholder: string;
    descriptionPlaceholder: string;
    addEvents: FormGroup;
    constructor(dialogRef: MatDialogRef<CalendarModalComponent>, eventEmitterService: EventEmitterService, data: any);
    ngOnInit(): void;
    addMinutesToDate(date: any, minutes: any): Date;
    assignEventDetails(): void;
    addOrUpdateEvent(): void;
    CombineDateAndTime(dateObject: any, timeString: any): Date;
    onNoClick(): void;
    onDelete(): void;
    onEdit(): void;
}
