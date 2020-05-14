import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
import format from 'date-fns/format';
import { round } from '@qc/date-round';
var CalendarModalComponent = /** @class */ (function () {
    function CalendarModalComponent(dialogRef, eventEmitterService, data) {
        this.dialogRef = dialogRef;
        this.eventEmitterService = eventEmitterService;
        this.data = data;
        this.screenType = "add";
        this.title = this.data ? "Edit Event" : "Add Event";
        this.titlePlaceholder = this.data ? "Edit Title" : "Add Title";
        this.locationPlaceholder = this.data ? "Edit Location" : "Add Location";
        this.descriptionPlaceholder = this.data ? "Edit Description" : "Add Description";
    }
    CalendarModalComponent.prototype.ngOnInit = function () {
        var dateIn = new Date(); // The date to be rounded
        var interval = 30 * 60 * 1000; // 30 minutes (aka quarter hour)
        var dateOut = round(dateIn, interval);
        var fromTime = format(dateOut, 'HH:mm');
        this.addEvents = new FormGroup({
            title: new FormControl('', Validators.required),
            location: new FormControl(),
            description: new FormControl(),
            fromDate: new FormControl(new Date(), Validators.required),
            toDate: new FormControl('', Validators.required),
            fromTime: new FormControl(fromTime, Validators.required),
            toTime: new FormControl('', Validators.required),
        });
        if (this.data) {
            this.addEvents.disable();
            this.assignEventDetails();
        }
    };
    CalendarModalComponent.prototype.addMinutesToDate = function (date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    };
    CalendarModalComponent.prototype.assignEventDetails = function () {
        this.screenType = "edit";
        this.addEvents.controls['title'].setValue(this.data.title);
        this.addEvents.controls['location'].setValue(this.data.location);
        this.addEvents.controls['description'].setValue(this.data.description);
        this.addEvents.controls['fromDate'].setValue(this.data.start);
        this.addEvents.controls['toDate'].setValue(this.data.end);
        this.addEvents.controls['fromTime'].setValue(this.data.fromTime);
        this.addEvents.controls['toTime'].setValue(this.data.toTime);
    };
    CalendarModalComponent.prototype.addOrUpdateEvent = function () {
        var tempObject = {
            id: this.data === null ? Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) : this.data.id,
            title: this.addEvents.controls['title'].value,
            description: this.addEvents.controls['description'].value,
            location: this.addEvents.controls['location'].value,
            start: this.addEvents.controls['fromDate'].value,
            end: this.addEvents.controls['toDate'].value,
            fromTime: this.addEvents.controls['fromTime'].value,
            toTime: this.addEvents.controls['toTime'].value
        };
        var startDatetime = this.CombineDateAndTime(tempObject.start, tempObject.fromTime);
        var endDatetime = this.CombineDateAndTime(tempObject.end, tempObject.toTime);
        tempObject.start = startDatetime;
        tempObject.end = endDatetime;
        console.log("startDatetime, endDatetime tempObject", tempObject);
        if (this.data === null) {
            this.eventEmitterService.emitNavChangeEvent('ADD_SAVE_CLICKED', tempObject);
        }
        else {
            this.eventEmitterService.emitNavChangeEvent('EDIT_SAVE_CLICKED', tempObject);
        }
        this.dialogRef.close();
    };
    CalendarModalComponent.prototype.CombineDateAndTime = function (dateObject, timeString) {
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
    ;
    CalendarModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CalendarModalComponent.prototype.onDelete = function () {
        this.eventEmitterService.emitNavChangeEvent('DELETE_EVENT_CLICKED', this.data);
        this.dialogRef.close();
    };
    CalendarModalComponent.prototype.onEdit = function () {
        this.addEvents.enable();
    };
    CalendarModalComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: EventEmitterService },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    CalendarModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-calendar-modal',
            template: "<div class=\"header\" id=\"header-view\">\n  <div class=\"titleStyle\">\n    <h1 mat-dialog-title style=\"font-family: Poppins;\">{{title}}</h1>\n  </div>\n  <div>\n    <mat-icon *ngIf=\"title === 'Edit Event'\" aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onEdit()\">edit\n    </mat-icon>\n    <mat-icon *ngIf=\"title === 'Edit Event'\" aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onDelete()\">delete\n    </mat-icon>\n    <mat-icon aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onNoClick()\">close</mat-icon>\n  </div>\n</div>\n<div mat-dialog-content id=\"dialog-container\">\n\n  <form class=\"example-form\" [formGroup]=\"addEvents\" (ngSubmit)=\"addOrUpdateEvent()\">\n\n    <mat-form-field class=\"example-full-width\" id=\"Add-title-view\"\n      style=\"font-family: Poppins;width: 95% !important;margin-left: 5%;\">\n      <input class=\"add-title-input\" matInput placeholder=\"{{titlePlaceholder}}\" formControlName=\"title\">\n    </mat-form-field>\n\n    <div class=\"timeinterval\" id=\"start-end-time\" style=\"display: flex !important;align-items: center;\">\n\n      <mat-icon aria-hidden=\"false\">access_time</mat-icon>\n      <div style=\"display: flex !important;\njustify-content: space-between !important;align-items: center;margin-left: 2%;padding-right: 2%;width: calc(100% - 5%);\">\n        <mat-form-field class=\"example-full-width\" style=\"width: 22%;\">\n          <mat-label>Start date</mat-label>\n          <input matInput formControlName=\"fromDate\" [matDatepicker]=\"picker\" >\n          <mat-datepicker-toggle matSuffix [for]=\"picker\">\n            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n          </mat-datepicker-toggle>\n          <mat-datepicker #picker></mat-datepicker>\n        </mat-form-field>\n\n        <mat-form-field class=\"start-time-view\">\n          <mat-label>From time</mat-label>\n          <input matInput [ngxTimepicker]=\"fromTime\" [format]=\"24\" formControlName=\"fromTime\"  readonly >\n          <ngx-material-timepicker #fromTime></ngx-material-timepicker>\n        </mat-form-field>\n\n        <mat-form-field class=\"end-time-view\">\n          <mat-label>To time</mat-label>\n          <input matInput [ngxTimepicker]=\"toTime\" [format]=\"24\" formControlName=\"toTime\" readonly\n            [disabled]=\"addEvents.controls['fromTime'].value > addEvents.controls['toTime'].value\">\n          <ngx-material-timepicker #toTime></ngx-material-timepicker>\n        </mat-form-field>\n\n        <mat-form-field id=\"end-date-view\"class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n          <mat-label>End date</mat-label>\n          <input [min]=\"addEvents.controls['fromDate'].value\" matInput formControlName=\"toDate\"\n            [matDatepicker]=\"datepicker\" >\n          <mat-datepicker-toggle matSuffix [for]=\"datepicker\">\n            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n          </mat-datepicker-toggle>\n          <mat-datepicker #datepicker></mat-datepicker>\n        </mat-form-field>\n      </div>\n\n    </div>\n\n    <div class=\"header\" id=\"location-view\">\n      <mat-icon aria-hidden=\"false\">location_on</mat-icon>\n      <mat-form-field class=\"form-field\" style=\"margin-left: 2%;\">\n        <input  class=\"location-input-view\" matInput placeholder=\"{{locationPlaceholder}}\" formControlName=\"location\"\n          style=\" width: 95% !important;\" />\n      </mat-form-field>\n    </div>\n\n    <div class=\"text-area-container\">\n      <mat-icon aria-hidden=\"false\" class=\"menu-icon-view\">menu</mat-icon>\n      <textarea id=\"text-input-view\"class=\"text-area-view\" placeholder=\"{{descriptionPlaceholder}}\" formControlName=\"description\"></textarea>\n    </div>\n    <div class=\"save-button-view\">\n      <button type=\"submit\" mat-button class=\"event-button\" [disabled]=\"!addEvents.valid\" [ngStyle]=\"{ 'opacity' : !addEvents.valid ? '0.5' : '1.5' }\">Save</button>\n    </div>\n  </form>\n</div>\n\n",
            styles: [".cdk-overlay-container{z-index:1127}.form-field{font-family:Poppins;width:95%!important}.event-button{background:#404041;color:#fff;width:141px;height:42px;border-radius:4px;border:1px solid #404041}.titleStyle{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.header{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center}.save-button-view{display:-webkit-box;display:flex;-webkit-box-pack:end;justify-content:flex-end;-webkit-box-align:center;align-items:center;margin-bottom:0!important}.save-button-view button{width:110px;height:47px;border-radius:6px;background-color:#404041}.text-area-view{width:100%!important;height:75px;resize:unset;overflow:auto;padding-top:5px;padding-left:5px;margin-left:2%;border-radius:5px;font-family:poppins}.text-area-container{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;padding-top:28px;padding-bottom:2%}.menu-icon-view{position:relative;bottom:3px}.titleStyle h1{margin-bottom:0!important;font-family:Poppins;font-size:28px;font-weight:500;font-stretch:normal;font-style:normal;line-height:1.5;letter-spacing:.01px;text-align:left;color:#404041}.add-title-input{font-size:20px!important;font-weight:500!important;font-stretch:normal!important;font-style:normal!important;letter-spacing:.01px!important;text-align:left!important;color:#7b7f8b!important}input{font-size:20px;font-weight:500;font-stretch:normal;font-style:normal;letter-spacing:.01px;text-align:left;color:#7b7f8b}#dialog-container{max-height:70vh!important}@media (max-width:991px){.end-time-view,.start-time-view{width:15%!important}}.example-full-width input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px!important}.start-time-view input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.end-time-view input{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px!important}.location-input-view{font-size:14px}#text-input-view{font-size:14px;color:#7b7f8b}#start-end-time{padding-top:18px}.mat-input-placeholder{color:#fff;font-size:2em}.mat-form-field-label,mat-label{font-size:14px!important}#location-view{margin-top:6px}#header-view{margin-bottom:12px}"]
        }),
        tslib_1.__param(2, Inject(MAT_DIALOG_DATA))
    ], CalendarModalComponent);
    return CalendarModalComponent;
}());
export { CalendarModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sTUFBTSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU92QztJQVNFLGdDQUFtQixTQUErQyxFQUN6RCxtQkFBd0MsRUFDZixJQUFTO1FBRnhCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ3pELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFLO1FBVDNDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsVUFBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQy9DLHFCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzFELHdCQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ25FLDJCQUFzQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FB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SUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDekIsQ0FBQzs7Z0JBOUY2QixZQUFZO2dCQUNaLG1CQUFtQjtnREFDOUMsTUFBTSxTQUFDLGVBQWU7O0lBWGQsc0JBQXNCO1FBTGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsbytIQUE4Qzs7U0FFL0MsQ0FBQztRQVlHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtPQVhmLHNCQUFzQixDQTBHbEM7SUFBRCw2QkFBQztDQUFBLEFBMUdELElBMEdDO1NBMUdZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSc7XG5pbXBvcnQgZm9ybWF0IGZyb20gJ2RhdGUtZm5zL2Zvcm1hdCc7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gJ0BxYy9kYXRlLXJvdW5kJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNhbGVuZGFyLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItbW9kYWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBzY3JlZW5UeXBlID0gXCJhZGRcIjtcbiAgdGl0bGUgPSB0aGlzLmRhdGEgPyBcIkVkaXQgRXZlbnRcIiA6IFwiQWRkIEV2ZW50XCI7XG4gIHRpdGxlUGxhY2Vob2xkZXIgPSB0aGlzLmRhdGEgPyBcIkVkaXQgVGl0bGVcIiA6IFwiQWRkIFRpdGxlXCI7XG4gIGxvY2F0aW9uUGxhY2Vob2xkZXIgPSB0aGlzLmRhdGEgPyBcIkVkaXQgTG9jYXRpb25cIiA6IFwiQWRkIExvY2F0aW9uXCI7XG4gIGRlc2NyaXB0aW9uUGxhY2Vob2xkZXIgPSB0aGlzLmRhdGEgPyBcIkVkaXQgRGVzY3JpcHRpb25cIiA6IFwiQWRkIERlc2NyaXB0aW9uXCI7XG4gIGFkZEV2ZW50czogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDYWxlbmRhck1vZGFsQ29tcG9uZW50PixcbiAgICBwdWJsaWMgZXZlbnRFbWl0dGVyU2VydmljZTogRXZlbnRFbWl0dGVyU2VydmljZSxcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueVxuICApIHsgXG4gICAgXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkYXRlSW4gPSBuZXcgRGF0ZSgpIC8vIFRoZSBkYXRlIHRvIGJlIHJvdW5kZWRcbiAgICBjb25zdCBpbnRlcnZhbCA9IDMwICogNjAgKiAxMDAwOyAvLyAzMCBtaW51dGVzIChha2EgcXVhcnRlciBob3VyKVxuICAgIGNvbnN0IGRhdGVPdXQgPSByb3VuZChkYXRlSW4sIGludGVydmFsKTtcbiAgICBjb25zdCBmcm9tVGltZSA9IGZvcm1hdChkYXRlT3V0LCAnSEg6bW0nKTtcbiAgICB0aGlzLmFkZEV2ZW50cyA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICBsb2NhdGlvbjogbmV3IEZvcm1Db250cm9sKCksXG4gICAgICBkZXNjcmlwdGlvbjogbmV3IEZvcm1Db250cm9sKCksXG4gICAgICBmcm9tRGF0ZTogbmV3IEZvcm1Db250cm9sKG5ldyBEYXRlKCksIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgdG9EYXRlOiBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgZnJvbVRpbWU6IG5ldyBGb3JtQ29udHJvbChmcm9tVGltZSwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB0b1RpbWU6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgfSk7XG5cbiAgICBpZih0aGlzLmRhdGEpe1xuICAgICAgdGhpcy5hZGRFdmVudHMuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5hc3NpZ25FdmVudERldGFpbHMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRNaW51dGVzVG9EYXRlKGRhdGUsIG1pbnV0ZXMpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIG1pbnV0ZXMqNjAwMDApO1xuICB9XG5cbiAgYXNzaWduRXZlbnREZXRhaWxzKCl7XG4gICAgdGhpcy5zY3JlZW5UeXBlID0gXCJlZGl0XCI7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ3RpdGxlJ10uc2V0VmFsdWUodGhpcy5kYXRhLnRpdGxlKTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snbG9jYXRpb24nXS5zZXRWYWx1ZSh0aGlzLmRhdGEubG9jYXRpb24pO1xuICAgIHRoaXMuYWRkRXZlbnRzLmNvbnRyb2xzWydkZXNjcmlwdGlvbiddLnNldFZhbHVlKHRoaXMuZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Zyb21EYXRlJ10uc2V0VmFsdWUodGhpcy5kYXRhLnN0YXJ0KTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndG9EYXRlJ10uc2V0VmFsdWUodGhpcy5kYXRhLmVuZCk7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Zyb21UaW1lJ10uc2V0VmFsdWUodGhpcy5kYXRhLmZyb21UaW1lKTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndG9UaW1lJ10uc2V0VmFsdWUodGhpcy5kYXRhLnRvVGltZSk7XG4gIH1cblxuICBhZGRPclVwZGF0ZUV2ZW50KCkge1xuICAgIGxldCB0ZW1wT2JqZWN0ID0ge1xuICAgICAgaWQ6IHRoaXMuZGF0YSA9PT0gbnVsbCA/IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoL1teYS16XSsvZywgJycpLnN1YnN0cigyLCAxMCkgOiB0aGlzLmRhdGEuaWQsXG4gICAgICB0aXRsZTogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ3RpdGxlJ10udmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Rlc2NyaXB0aW9uJ10udmFsdWUsXG4gICAgICBsb2NhdGlvbjogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2xvY2F0aW9uJ10udmFsdWUsXG4gICAgICBzdGFydDogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Zyb21EYXRlJ10udmFsdWUsXG4gICAgICBlbmQ6IHRoaXMuYWRkRXZlbnRzLmNvbnRyb2xzWyd0b0RhdGUnXS52YWx1ZSxcbiAgICAgIGZyb21UaW1lOiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snZnJvbVRpbWUnXS52YWx1ZSxcbiAgICAgIHRvVGltZTogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ3RvVGltZSddLnZhbHVlXG4gICAgfTtcbiAgICBsZXQgc3RhcnREYXRldGltZSA9IHRoaXMuQ29tYmluZURhdGVBbmRUaW1lKHRlbXBPYmplY3Quc3RhcnQsdGVtcE9iamVjdC5mcm9tVGltZSlcbiAgICBsZXQgZW5kRGF0ZXRpbWUgPSB0aGlzLkNvbWJpbmVEYXRlQW5kVGltZSh0ZW1wT2JqZWN0LmVuZCx0ZW1wT2JqZWN0LnRvVGltZSlcbiAgICB0ZW1wT2JqZWN0LnN0YXJ0ID0gc3RhcnREYXRldGltZTtcbiAgICB0ZW1wT2JqZWN0LmVuZCA9IGVuZERhdGV0aW1lO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnREYXRldGltZSwgZW5kRGF0ZXRpbWUgdGVtcE9iamVjdFwiLCB0ZW1wT2JqZWN0KVxuICAgIFxuICAgIGlmKHRoaXMuZGF0YSA9PT0gbnVsbCl7XG4gICAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdBRERfU0FWRV9DTElDS0VEJywgdGVtcE9iamVjdCk7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXROYXZDaGFuZ2VFdmVudCgnRURJVF9TQVZFX0NMSUNLRUQnLCB0ZW1wT2JqZWN0KTtcbiAgICB9XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIENvbWJpbmVEYXRlQW5kVGltZShkYXRlT2JqZWN0LCB0aW1lU3RyaW5nKSB7XG4gICAgLy8gdmFyIHRpbWVTdHJpbmcgPSB0aW1lLmdldEhvdXJzKCkgKyAnOicgKyB0aW1lLmdldE1pbnV0ZXMoKSArICc6MDAnO1xuICAgIC8vIHZhciBhbXBtID0gdGltZS5nZXRIb3VycygpID49IDEyID8gJ1BNJyA6ICdBTSc7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlT2JqZWN0KTtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxOyAvLyBKYW4gaXMgMCwgZGVjIGlzIDExXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgdmFyIGRhdGVTdHJpbmcgPSAnJyArIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgICAvLyB2YXIgZGF0ZWMgPSBkYXRlU3RyaW5nICsgJ1QnICsgdGltZVN0cmluZztcbiAgICB2YXIgY29tYmluZWQgPSBuZXcgRGF0ZShkYXRlU3RyaW5nICsgJyAnICsgdGltZVN0cmluZyk7XG5cbiAgICByZXR1cm4gY29tYmluZWQ7XG59O1xuXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgb25EZWxldGUoKSB7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXROYXZDaGFuZ2VFdmVudCgnREVMRVRFX0VWRU5UX0NMSUNLRUQnLCB0aGlzLmRhdGEpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBvbkVkaXQoKSB7XG4gICAgdGhpcy5hZGRFdmVudHMuZW5hYmxlKClcbiAgfVxuXG5cbn1cbiJdfQ==