import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCommonHeaderComponent } from './calendar-header.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { CalendarCommonModalModule } from '../calendar-modal/calendar-modal.module';
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";
import { EventEmitterService } from '../common/calendar-event-emitter.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
export { CalendarCommonHeaderComponent } from './calendar-header.component';
var CalendarCommonHeaderModule = /** @class */ (function () {
    function CalendarCommonHeaderModule() {
    }
    CalendarCommonHeaderModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                CalendarCommonModule,
                CalendarWeekModule,
                CalendarCommonModalModule,
                MatButtonModule,
                MatIconModule,
                MatButtonToggleModule
            ],
            declarations: [CalendarCommonHeaderComponent,
            ],
            providers: [
                EventEmitterService
            ],
            entryComponents: [CalendarModalComponent],
            exports: [CalendarCommonHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
    ], CalendarCommonHeaderModule);
    return CalendarCommonHeaderModule;
}());
export { CalendarCommonHeaderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUMsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFBO0FBQ25GLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUNMLDZCQUE2QixFQUM5QixNQUFNLDZCQUE2QixDQUFDO0FBcUJyQztJQUFBO0lBQTBDLENBQUM7SUFBOUIsMEJBQTBCO1FBbkJ0QyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjtnQkFDbEIseUJBQXlCO2dCQUN6QixlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IscUJBQXFCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUMsNkJBQTZCO2FBQzNDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULG1CQUFtQjthQUNwQjtZQUNELGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ3pDLE9BQU8sRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFFLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7T0FDVywwQkFBMEIsQ0FBSTtJQUFELGlDQUFDO0NBQUEsQUFBM0MsSUFBMkM7U0FBOUIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlIH0gZnJvbSAnLi4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwuY29tcG9uZW50XCJcbmltcG9ydCB7IEV2ZW50RW1pdHRlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XG5leHBvcnQge1xuICBDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsIFxuICAgIENhbGVuZGFyQ29tbW9uTW9kYWxNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhbGVuZGFyQ29tbW9uSGVhZGVyQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFdmVudEVtaXR0ZXJTZXJ2aWNlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0NhbGVuZGFyTW9kYWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2FsZW5kYXJDb21tb25IZWFkZXJDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSB7IH1cbiJdfQ==