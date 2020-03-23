import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModalComponent } from './calendar-modal.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
export { CalendarModalComponent } from './calendar-modal.component';
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
                // FormsModule,     
                MatNativeDateModule,
                MatDatepickerModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatSelectModule,
                MatToolbarModule,
                BrowserModule,
                BrowserAnimationsModule
            ],
            providers: [{
                    provide: MatDialogRef,
                }
            ],
            declarations: [CalendarModalComponent],
            exports: [CalendarModalComponent],
        })
    ], CalendarCommonModalModule);
    return CalendarCommonModalModule;
}());
export { CalendarCommonModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUN2RCxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pGLHNFQUFzRTtBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUNILHNCQUFzQixFQUN6QixNQUFNLDRCQUE0QixDQUFDO0FBMkJwQztJQUFBO0lBQXdDLENBQUM7SUFBNUIseUJBQXlCO1FBekJyQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjtnQkFDbEIsYUFBYTtnQkFDYixrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2Qsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLHVCQUF1QjthQUN4QjtZQUNELFNBQVMsRUFBRSxDQUFDO29CQUNSLE9BQU8sRUFBRSxZQUFZO2lCQUN0QjthQUNIO1lBQ0EsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbEMsQ0FBQztPQUNXLHlCQUF5QixDQUFHO0lBQUQsZ0NBQUM7Q0FBQSxBQUF6QyxJQUF5QztTQUE1Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsXHJcbiAgIE1hdERhdGVwaWNrZXJNb2R1bGUsIE1hdE5hdGl2ZURhdGVNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlICB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge01hdERpYWxvZ01vZHVsZSwgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIENhbGVuZGFyTW9kYWxDb21wb25lbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLW1vZGFsLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSwgXHJcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSwgXHJcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAvLyBGb3Jtc01vZHVsZSwgICAgIFxyXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSAsICBcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgICAgcHJvdmlkZTogTWF0RGlhbG9nUmVmLFxyXG4gICAgfVxyXG4gXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhck1vZGFsQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQ2FsZW5kYXJNb2RhbENvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlIHt9XHJcbiJdfQ==