import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCommonHeaderComponent } from './calendar-header.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { CalendarCommonModalModule } from '../calendar-modal/calendar-modal.module';
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";
import { EventEmitterService } from '../common/calendar-event-emitter.service';
export { CalendarCommonHeaderComponent } from './calendar-header.component';
var CalendarCommonHeaderModule = /** @class */ (function () {
    function CalendarCommonHeaderModule() {
    }
    CalendarCommonHeaderModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, CalendarCommonModule,
                CalendarWeekModule, CalendarCommonModalModule],
            declarations: [CalendarCommonHeaderComponent,
            ],
            providers: [
                EventEmitterService
            ],
            entryComponents: [CalendarModalComponent],
            exports: [CalendarCommonHeaderComponent]
        })
    ], CalendarCommonHeaderModule);
    return CalendarCommonHeaderModule;
}());
export { CalendarCommonHeaderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFBO0FBQ25GLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRS9FLE9BQU8sRUFDTCw2QkFBNkIsRUFDOUIsTUFBTSw2QkFBNkIsQ0FBQztBQWFyQztJQUFBO0lBQTBDLENBQUM7SUFBOUIsMEJBQTBCO1FBWHRDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0I7Z0JBQzFDLGtCQUFrQixFQUFFLHlCQUF5QixDQUFDO1lBQ2hELFlBQVksRUFBRSxDQUFDLDZCQUE2QjthQUMzQztZQUNELFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7YUFDcEI7WUFDRCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUN6QyxPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUN6QyxDQUFDO09BQ1csMEJBQTBCLENBQUk7SUFBRCxpQ0FBQztDQUFBLEFBQTNDLElBQTJDO1NBQTlCLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25IZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kYWxNb2R1bGUgfSBmcm9tICcuLi9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9jYWxlbmRhci1tb2RhbC9jYWxlbmRhci1tb2RhbC5jb21wb25lbnRcIlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC1lbWl0dGVyLnNlcnZpY2UnO1xuXG5leHBvcnQge1xuICBDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsIENhbGVuZGFyQ29tbW9uTW9kYWxNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhckNvbW1vbkhlYWRlckNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXZlbnRFbWl0dGVyU2VydmljZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDYWxlbmRhck1vZGFsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhbGVuZGFyQ29tbW9uSGVhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSB7IH1cbiJdfQ==