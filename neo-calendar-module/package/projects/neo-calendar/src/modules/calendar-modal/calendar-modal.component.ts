import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
import format from 'date-fns/format';
import { round } from '@qc/date-round';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

  screenType = "add";
  title = this.data ? "Edit Event" : "Add Event";
  titlePlaceholder = this.data ? "Edit Title" : "Add Title";
  locationPlaceholder = this.data ? "Edit Location" : "Add Location";
  descriptionPlaceholder = this.data ? "Edit Description" : "Add Description";
  addEvents: FormGroup;

  constructor(public dialogRef: MatDialogRef<CalendarModalComponent>,
    public eventEmitterService: EventEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
  }

  ngOnInit() {
    const dateIn = new Date() // The date to be rounded
    const interval = 30 * 60 * 1000; // 30 minutes (aka quarter hour)
    const dateOut = round(dateIn, interval);
    const fromTime = format(dateOut, 'HH:mm');
    this.addEvents = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl(),
      description: new FormControl(),
      fromDate: new FormControl(new Date(), Validators.required),
      toDate: new FormControl('', Validators.required),
      fromTime: new FormControl(fromTime, Validators.required),
      toTime: new FormControl('', Validators.required),
    });

    if(this.data){
      this.addEvents.disable();
      this.assignEventDetails();
    }
  }

  addMinutesToDate(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
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

  addOrUpdateEvent() {
    let tempObject = {
      id: this.data === null ? Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) : this.data.id,
      title: this.addEvents.controls['title'].value,
      description: this.addEvents.controls['description'].value,
      location: this.addEvents.controls['location'].value,
      start: this.addEvents.controls['fromDate'].value,
      end: this.addEvents.controls['toDate'].value,
      fromTime: this.addEvents.controls['fromTime'].value,
      toTime: this.addEvents.controls['toTime'].value
    };
    let startDatetime = this.CombineDateAndTime(tempObject.start,tempObject.fromTime)
    let endDatetime = this.CombineDateAndTime(tempObject.end,tempObject.toTime)
    tempObject.start = startDatetime;
    tempObject.end = endDatetime;
    console.log("startDatetime, endDatetime tempObject", tempObject)
    
    if(this.data === null){
      this.eventEmitterService.emitNavChangeEvent('ADD_SAVE_CLICKED', tempObject);
    }else {
      this.eventEmitterService.emitNavChangeEvent('EDIT_SAVE_CLICKED', tempObject);
    }
    this.dialogRef.close();
  }

  CombineDateAndTime(dateObject, timeString) {
    // var timeString = time.getHours() + ':' + time.getMinutes() + ':00';
    // var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    var date = new Date(dateObject);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();

    var dateString = '' + year + '-' + month + '-' + day;
    // var datec = dateString + 'T' + timeString;
    var combined = new Date(dateString + ' ' + timeString);

    return combined;
};

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', this.data);
    this.dialogRef.close();
  }

  onEdit() {
    this.addEvents.enable()
  }


}
