import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
export { CalendarDayViewComponent } from './calendar-day-view.component';
var CalendarDayModule = /** @class */ (function () {
    function CalendarDayModule() {
    }
    CalendarDayModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, CalendarCommonModule, CalendarWeekModule],
            declarations: [CalendarDayViewComponent],
            exports: [CalendarDayViewComponent]
        })
    ], CalendarDayModule);
    return CalendarDayModule;
}());
export { CalendarDayModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWxFLE9BQU8sRUFDTCx3QkFBd0IsRUFFekIsTUFBTSwrQkFBK0IsQ0FBQztBQU92QztJQUFBO0lBQWdDLENBQUM7SUFBcEIsaUJBQWlCO1FBTDdCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztZQUNqRSxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUNwQyxDQUFDO09BQ1csaUJBQWlCLENBQUc7SUFBRCx3QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENhbGVuZGFyQ29tbW9uTW9kdWxlLCBDYWxlbmRhcldlZWtNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhckRheVZpZXdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheU1vZHVsZSB7fVxuIl19