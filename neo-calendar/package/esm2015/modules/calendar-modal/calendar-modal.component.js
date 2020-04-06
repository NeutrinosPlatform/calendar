import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from '../common/calendar-event-emitter.service';
// import {moment} from 'moment';
let CalendarModalComponent = class CalendarModalComponent {
    constructor(dialogRef, eventEmitterService, data) {
        this.dialogRef = dialogRef;
        this.eventEmitterService = eventEmitterService;
        this.data = data;
        this.screenType = "add";
        this.titlePlaceholder = this.data ? "Edit Title" : "Add Title";
        this.locationPlaceholder = this.data ? "Edit Location" : "Add Location";
        this.descriptionPlaceholder = this.data ? "Edit Description" : "Add Description";
        this.addEvents = new FormGroup({
            title: new FormControl(),
            location: new FormControl(),
            description: new FormControl(),
            fromDate: new FormControl(),
            toDate: new FormControl(),
            fromTime: new FormControl(),
            toTime: new FormControl(),
        });
    }
    ngOnInit() {
        if (this.data) {
            this.assignEventDetails();
        }
    }
    assignEventDetails() {
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
            title: this.addEvents.controls['title'].value,
            description: this.addEvents.controls['description'].value,
            location: this.addEvents.controls['location'].value,
            start: this.addEvents.controls['fromDate'].value,
            end: this.addEvents.controls['toDate'].value,
            fromTime: this.addEvents.controls['fromTime'].value,
            toTime: this.addEvents.controls['toTime'].value
        };
        if (this.data === null) {
            this.eventEmitterService.emitNavChangeEvent('ADD_SAVE_CLICKED', tempObject);
        }
        else {
            this.eventEmitterService.emitNavChangeEvent('EDIT_SAVE_CLICKED', tempObject);
        }
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
CalendarModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: EventEmitterService },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
CalendarModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar-modal',
        template: "<!-- <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\" style=\"font-family: Poppins;\" id=\"exampleModalLabel\">Add Event</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n        <div class=\"modal-body\">\n\n            <form class=\"example-form\" [formGroup]=\"addEvents\">\n\n                <mat-form-field class=\"example-full-width\" id=\"Add-title-view\"\n                    style=\"font-family: Poppins;width: 95% !important;\">\n                    <input matInput placeholder=\"Add Title\" style=\"font-family: Poppins;\" formControlName=\"title\"\n                        value=\"\">\n                </mat-form-field>\n\n                <div class=\"timeinterval\" id=\"start-end-time\" style=\"display: flex !important;\n    justify-content: space-between !important;align-items: center;\">\n                    <mat-icon aria-hidden=\"false\">access_time</mat-icon>\n                    <mat-form-field class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n                        <mat-label>Choose a date</mat-label>\n                        <input matInput [matDatepicker]=\"picker\">\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\">\n                            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n                        </mat-datepicker-toggle>\n                        <mat-datepicker #picker></mat-datepicker>\n                    </mat-form-field>\n\n                    <mat-form-field style=\"width: 16%;\">\n                        <mat-label style=\"font-family: Poppins;\">Start Time</mat-label>\n                        <mat-select style=\"font-family: Poppins;\" name=\"countryString\" [(value)]=\"selectedCountry\">\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"volvo\"\n                                selected>03:00 AM</mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"saab\">04:00 AM\n                            </mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"mercedes\">\n                                05:00 AM</mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"audi\">06:00 AM\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n\n\n                    <mat-form-field style=\"width: 16%;\">\n                        <mat-label style=\"font-family: Poppins;\">End Time</mat-label>\n                        <mat-select style=\"font-family: Poppins;\" name=\"countryString\" [(value)]=\"selectedCountry\">\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"volvo\"\n                                selected>03:00 AM</mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"saab\">04:00 AM\n                            </mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"mercedes\">\n                                05:00 AM</mat-option>\n                            <mat-option style=\"font-family: Poppins;z-index: 99999999 !important\" value=\"audi\">06:00 AM\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n\n                    <mat-form-field class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n                        <mat-label>Choose a date</mat-label>\n                        <input matInput [matDatepicker]=\"datepicker\">\n                        <mat-datepicker-toggle matSuffix [for]=\"datepicker\">\n                            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n                        </mat-datepicker-toggle>\n                        <mat-datepicker #datepicker></mat-datepicker>\n                    </mat-form-field>\n                </div>\n\n                <div class=\"header\">\n                    <mat-icon aria-hidden=\"false\">location_on</mat-icon>\n                    <mat-form-field class=\"form-field\">\n                        <input matInput placeholder=\"Add Location\" formControlName=\"location\" value=\"\"\n                            style=\" width: 95% !important;\" />\n                    </mat-form-field>\n                </div>\n\n                <div class=\"header\">\n                    <mat-icon aria-hidden=\"false\">menu</mat-icon>\n                    <mat-form-field class=\"form-field\">\n                        <textarea matInput placeholder=\"Add description\" formControlName=\"description\" value=\"\"\n                            style=\" width: 95% !important;\"></textarea>\n                    </mat-form-field>\n                </div>\n\n            </form>\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"addEvent()\" data-dismiss=\"modal\">Save</button>\n            </div>\n        </div>\n    </div>\n</div> -->\n\n<!-- <h1 mat-dialog-title>Hi</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"'data'\" cdkFocusInitial>Ok</button>\n</div> -->\n\n<div class=\"titleStyle\">\n    <h1 mat-dialog-title style=\"font-family: Poppins;\">{{titlePlaceholder}}</h1>\n    <mat-icon aria-hidden=\"false\" style=\"cursor: pointer;\" (click)=\"onNoClick()\">close</mat-icon>\n</div>\n<div mat-dialog-content>\n\n    <form class=\"example-form\" [formGroup]=\"addEvents\">\n\n        <mat-form-field class=\"example-full-width\" id=\"Add-title-view\"\n            style=\"font-family: Poppins;width: 95% !important;margin-left: 5%;\">\n            <input matInput placeholder=\"{{titlePlaceholder}}\" style=\"font-family: Poppins;\" formControlName=\"title\">\n        </mat-form-field>\n\n        <div class=\"timeinterval\" id=\"start-end-time\" style=\"display: flex !important;align-items: center;\">\n\n            <mat-icon aria-hidden=\"false\">access_time</mat-icon>\n            <div style=\"display: flex !important;\njustify-content: space-between !important;align-items: center;margin-left: 2%;padding-right: 2%;\">\n                <mat-form-field class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n                    <mat-label>Start date</mat-label>\n                    <input matInput formControlName=\"fromDate\" [matDatepicker]=\"picker\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker\">\n                        <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n                    </mat-datepicker-toggle>\n                    <mat-datepicker #picker></mat-datepicker>\n                </mat-form-field>\n\n                <div class=\"md-form\">\n                    <input type=\"time\" id=\"input\" formControlName=\"fromTime\" class=\"form-control\" mdbInput />\n                </div>\n\n\n                <div class=\"md-form\">\n                    <input type=\"time\" id=\"input\" formControlName=\"toTime\" class=\"form-control\" mdbInput />\n                </div>\n\n                <mat-form-field class=\"example-full-width\" style=\"width: 22%;font-family: Poppins;\">\n                    <mat-label>End date</mat-label>\n                    <input [min]=\"addEvents.controls['fromDate'].value\" matInput formControlName=\"toDate\"\n                        [matDatepicker]=\"datepicker\">\n                    <mat-datepicker-toggle matSuffix [for]=\"datepicker\">\n                        <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n                    </mat-datepicker-toggle>\n                    <mat-datepicker #datepicker></mat-datepicker>\n                </mat-form-field>\n            </div>\n\n        </div>\n\n        <div class=\"header\">\n            <mat-icon aria-hidden=\"false\">location_on</mat-icon>\n            <mat-form-field class=\"form-field\" style=\"margin-left: 2%;\">\n                <input matInput placeholder=\"{{locationPlaceholder}}\" formControlName=\"location\"\n                    style=\" width: 95% !important;\" />\n            </mat-form-field>\n        </div>\n\n        <div class=\"header\">\n            <mat-icon aria-hidden=\"false\">menu</mat-icon>\n            <mat-form-field class=\"form-field\" id=\"formField\" style=\"margin-left: 2%;\">\n                <textarea matInput placeholder=\"{{descriptionPlaceholder}}\" formControlName=\"description\"\n                    style=\" width: 95% !important;height: 21px;\"></textarea>\n            </mat-form-field>\n        </div>\n    </form>\n</div>\n<div mat-dialog-actions style=\"margin-left: 91%;\" *ngIf=\"addEvents.controls['description'].value!==''\n&& addEvents.controls['description'].value!==null &&\naddEvents.controls['location'].value!==''&& \naddEvents.controls['location'].value!==null &&\naddEvents.controls['title'].value!==''&& \naddEvents.controls['title'].value!==null &&\naddEvents.controls['fromDate'].value!==''&&\naddEvents.controls['fromDate'].value!==null &&\naddEvents.controls['toDate'].value!==''\n&& addEvents.controls['toDate'].value!==null &&\naddEvents.controls['fromTime'].value!==''&& \naddEvents.controls['fromTime'].value!==null &&\naddEvents.controls['toTime'].value!==''\n&&  addEvents.controls['toTime'].value!==null &&\naddEvents.controls['fromDate'].value <=\naddEvents.controls['toDate'].value &&\naddEvents.controls['fromTime'].value <\naddEvents.controls['toTime'].value\n\n\">\n    <button type=\"button\" class=\"btn btn-primary\" [mat-dialog-close]=\"'data'\" cdkFocusInitial\n        (click)=\"addOrUpdateEvent()\">Save</button>\n</div>",
        styles: [".cdk-overlay-container{z-index:1127}.form-field{font-family:Poppins;width:95%!important}.header{margin-top:4%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.titleStyle{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}"]
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA))
], CalendarModalComponent);
export { CalendarModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsaUNBQWlDO0FBT2pDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBRWpDLFlBQW1CLFNBQStDLEVBQ3pELG1CQUF3QyxFQUNmLElBQVM7UUFGeEIsY0FBUyxHQUFULFNBQVMsQ0FBc0M7UUFDekQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUNmLFNBQUksR0FBSixJQUFJLENBQUs7UUFJM0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMxRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNuRSwyQkFBc0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFxQjVFLGNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUN4QixLQUFLLEVBQUUsSUFBSSxXQUFXLEVBQUU7WUFDeEIsUUFBUSxFQUFF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WUFBWTtZQUNaLG1CQUFtQjs0Q0FDOUMsTUFBTSxTQUFDLGVBQWU7O0FBSmQsc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsMmxVQUE4Qzs7S0FFL0MsQ0FBQztJQUtHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtHQUpmLHNCQUFzQixDQWlFbEM7U0FqRVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LWVtaXR0ZXIuc2VydmljZSc7XG4vLyBpbXBvcnQge21vbWVudH0gZnJvbSAnbW9tZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNhbGVuZGFyLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItbW9kYWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2FsZW5kYXJNb2RhbENvbXBvbmVudD4sXG4gICAgcHVibGljIGV2ZW50RW1pdHRlclNlcnZpY2U6IEV2ZW50RW1pdHRlclNlcnZpY2UsXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnlcbiAgKSB7IFxuICAgIFxuICB9XG4gIHNjcmVlblR5cGUgPSBcImFkZFwiO1xuICB0aXRsZVBsYWNlaG9sZGVyID0gdGhpcy5kYXRhID8gXCJFZGl0IFRpdGxlXCIgOiBcIkFkZCBUaXRsZVwiO1xuICBsb2NhdGlvblBsYWNlaG9sZGVyID0gdGhpcy5kYXRhID8gXCJFZGl0IExvY2F0aW9uXCIgOiBcIkFkZCBMb2NhdGlvblwiO1xuICBkZXNjcmlwdGlvblBsYWNlaG9sZGVyID0gdGhpcy5kYXRhID8gXCJFZGl0IERlc2NyaXB0aW9uXCIgOiBcIkFkZCBEZXNjcmlwdGlvblwiO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIFxuICAgIGlmKHRoaXMuZGF0YSl7XG4gICAgICB0aGlzLmFzc2lnbkV2ZW50RGV0YWlscygpO1xuICAgIH1cblxuICB9XG5cbiAgYXNzaWduRXZlbnREZXRhaWxzKCl7XG4gICAgdGhpcy5zY3JlZW5UeXBlID0gXCJlZGl0XCI7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ3RpdGxlJ10uc2V0VmFsdWUodGhpcy5kYXRhLnRpdGxlKTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snbG9jYXRpb24nXS5zZXRWYWx1ZSh0aGlzLmRhdGEubG9jYXRpb24pO1xuICAgIHRoaXMuYWRkRXZlbnRzLmNvbnRyb2xzWydkZXNjcmlwdGlvbiddLnNldFZhbHVlKHRoaXMuZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Zyb21EYXRlJ10uc2V0VmFsdWUodGhpcy5kYXRhLnN0YXJ0KTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndG9EYXRlJ10uc2V0VmFsdWUodGhpcy5kYXRhLmVuZCk7XG4gICAgdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ2Zyb21UaW1lJ10uc2V0VmFsdWUodGhpcy5kYXRhLmZyb21UaW1lKTtcbiAgICB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndG9UaW1lJ10uc2V0VmFsdWUodGhpcy5kYXRhLnRvVGltZSk7XG4gIH1cblxuICBhZGRFdmVudHMgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICB0aXRsZTogbmV3IEZvcm1Db250cm9sKCksXG4gICAgbG9jYXRpb246IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIGRlc2NyaXB0aW9uOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICBmcm9tRGF0ZTogbmV3IEZvcm1Db250cm9sKCksXG4gICAgdG9EYXRlOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICBmcm9tVGltZTogbmV3IEZvcm1Db250cm9sKCksXG4gICAgdG9UaW1lOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgfSk7XG5cbiAgYWRkT3JVcGRhdGVFdmVudCgpIHtcbiAgICBsZXQgdGVtcE9iamVjdCA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndGl0bGUnXS52YWx1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snZGVzY3JpcHRpb24nXS52YWx1ZSxcbiAgICAgIGxvY2F0aW9uOiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snbG9jYXRpb24nXS52YWx1ZSxcbiAgICAgIHN0YXJ0OiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1snZnJvbURhdGUnXS52YWx1ZSxcbiAgICAgIGVuZDogdGhpcy5hZGRFdmVudHMuY29udHJvbHNbJ3RvRGF0ZSddLnZhbHVlLFxuICAgICAgZnJvbVRpbWU6IHRoaXMuYWRkRXZlbnRzLmNvbnRyb2xzWydmcm9tVGltZSddLnZhbHVlLFxuICAgICAgdG9UaW1lOiB0aGlzLmFkZEV2ZW50cy5jb250cm9sc1sndG9UaW1lJ10udmFsdWVcbiAgICB9O1xuICAgIGlmKHRoaXMuZGF0YSA9PT0gbnVsbCl7XG4gICAgICB0aGlzLmV2ZW50RW1pdHRlclNlcnZpY2UuZW1pdE5hdkNoYW5nZUV2ZW50KCdBRERfU0FWRV9DTElDS0VEJywgdGVtcE9iamVjdCk7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5ldmVudEVtaXR0ZXJTZXJ2aWNlLmVtaXROYXZDaGFuZ2VFdmVudCgnRURJVF9TQVZFX0NMSUNLRUQnLCB0ZW1wT2JqZWN0KTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBvbk5vQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG5cbn1cbiJdfQ==