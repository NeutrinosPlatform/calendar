import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModalComponent } from './calendar-modal.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
export { CalendarModalComponent } from './calendar-modal.component';
var ɵ0 = {}, ɵ1 = {};
var CalendarCommonModalModule = /** @class */ (function () {
    function CalendarCommonModalModule() {
    }
    CalendarCommonModalModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                CalendarCommonModule,
                CalendarWeekModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                MatNativeDateModule,
                MatDatepickerModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatSelectModule,
                MatToolbarModule,
                BrowserModule,
                BrowserAnimationsModule,
                NgxMaterialTimepickerModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: ɵ0 },
                { provide: MatDialogRef, useValue: ɵ1 }
            ],
            declarations: [CalendarModalComponent],
            exports: [CalendarModalComponent],
        })
    ], CalendarCommonModalModule);
    return CalendarCommonModalModule;
}());
export { CalendarCommonModalModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUN2RCxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFcEUsT0FBTyxFQUNILHNCQUFzQixFQUN6QixNQUFNLDRCQUE0QixDQUFDO1NBcUJNLEVBQUUsT0FDTCxFQUFFO0FBTXpDO0lBQUE7SUFBd0MsQ0FBQztJQUE1Qix5QkFBeUI7UUExQnJDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLG9CQUFvQjtnQkFDcEIsa0JBQWtCO2dCQUNsQixhQUFhO2dCQUNiLGtCQUFrQjtnQkFDbEIsY0FBYztnQkFDZCxtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLHVCQUF1QjtnQkFDdkIsMkJBQTJCO2FBQzVCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLElBQUksRUFBRTtnQkFDMUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsSUFBSSxFQUFFO2FBRXpDO1lBQ0EsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbEMsQ0FBQztPQUNXLHlCQUF5QixDQUFHO0lBQUQsZ0NBQUM7Q0FBQSxBQUF6QyxJQUF5QztTQUE1Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsXHJcbiAgIE1hdERhdGVwaWNrZXJNb2R1bGUsIE1hdE5hdGl2ZURhdGVNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGUsIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge05neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZX0gZnJvbSAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIENhbGVuZGFyTW9kYWxDb21wb25lbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLW1vZGFsLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSwgXHJcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSwgXHJcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsICAgXHJcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlICwgIFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsIFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9IH0sXHJcbiAgICB7IHByb3ZpZGU6IE1hdERpYWxvZ1JlZiwgdXNlVmFsdWU6IHt9IH1cclxuICAgIFxyXG4gXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhck1vZGFsQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQ2FsZW5kYXJNb2RhbENvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlIHt9XHJcbiJdfQ==