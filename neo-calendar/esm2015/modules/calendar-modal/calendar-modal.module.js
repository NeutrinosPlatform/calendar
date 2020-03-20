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
let CalendarCommonModalModule = class CalendarCommonModalModule {
};
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
export { CalendarCommonModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUN2RCxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pGLHNFQUFzRTtBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUNILHNCQUFzQixFQUN6QixNQUFNLDRCQUE0QixDQUFDO0FBMkJwQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtDQUFHLENBQUE7QUFBNUIseUJBQXlCO0lBekJyQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLHVCQUF1QjtTQUN4QjtRQUNELFNBQVMsRUFBRSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxZQUFZO2FBQ3RCO1NBQ0g7UUFDQSxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUN0QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUNsQyxDQUFDO0dBQ1cseUJBQXlCLENBQUc7U0FBNUIseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyV2Vla01vZHVsZSB9IGZyb20gJy4uL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlLFxyXG4gICBNYXREYXRlcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRlTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGUsIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBDYWxlbmRhck1vZGFsQ29tcG9uZW50XHJcbn0gZnJvbSAnLi9jYWxlbmRhci1tb2RhbC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsIFxyXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsIFxyXG4gICAgQ2FsZW5kYXJXZWVrTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgLy8gRm9ybXNNb2R1bGUsICAgICBcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUgLCAgXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSwgXHJcbiAgICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFt7XHJcbiAgICAgIHByb3ZpZGU6IE1hdERpYWxvZ1JlZixcclxuICAgIH1cclxuIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJNb2RhbENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0NhbGVuZGFyTW9kYWxDb21wb25lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21tb25Nb2RhbE1vZHVsZSB7fVxyXG4iXX0=