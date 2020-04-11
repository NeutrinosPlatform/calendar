import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
// import {moment} from 'moment';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalendarModalComponent>,
    public eventEmitterService: EventEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
  }
  screenType = "add";
  title = this.data ? "Event Details" : "Add Event";
  titlePlaceholder = this.data ? "Edit Title" : "Add Title";
  locationPlaceholder = this.data ? "Edit Location" : "Add Location";
  descriptionPlaceholder = this.data ? "Edit Description" : "Add Description";

  ngOnInit() {
    
    if(this.data){
      this.assignEventDetails();
    }

  }

  assignEventDetails(){
    this.screenType = "edit";
    this.addEvents.controls['title'].setValue(this.data.title);
    this.addEvents.controls['location'].setValue(this.data.location);
    this.addEvents.controls['description'].setValue(this.data.description);
    this.addEvents.controls['fromDate'].setValue(this.data.start);
    this.addEvents.controls['toDate'].setValue(this.data.end);
    this.addEvents.controls['fromTime'].setValue(this.data.fromTime);
    this.addEvents.controls['toTime'].setValue(this.data.toTime);
  }

  addEvents = new FormGroup({
    title: new FormControl(),
    location: new FormControl(),
    description: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    fromTime: new FormControl(),
    toTime: new FormControl(),
  });

  addOrUpdateEvent() {
    let tempObject = {
      title: this.addEvents.controls['title'].value,
      description: this.addEvents.controls['description'].value,
      location: this.addEvents.controls['location'].value,
      start: this.addEvents.controls['fromDate'].value,
      end: this.addEvents.controls['toDate'].value,
      fromTime: this.addEvents.controls['fromTime'].value,
      toTime: this.addEvents.controls['toTime'].value
    };
    if(this.data === null){
      this.eventEmitterService.emitNavChangeEvent('ADD_SAVE_CLICKED', tempObject);
    }else {
      this.eventEmitterService.emitNavChangeEvent('EDIT_SAVE_CLICKED', tempObject);
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', this.data);
    this.dialogRef.close();
  }


}
