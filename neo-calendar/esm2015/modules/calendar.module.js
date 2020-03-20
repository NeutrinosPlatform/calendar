var CalendarModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CalendarCommonModule, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y } from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarCommonHeaderModule } from './header/calendar-header.module';
import { CalendarUtils } from './common/calendar-utils.provider';
import { CalendarCommonModalModule } from './calendar-modal/calendar-modal.module';
import { MatIconModule } from '@angular/material/icon';
export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './day/calendar-day.module';
export * from './header/calendar-header.module';
/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
let CalendarModule = CalendarModule_1 = class CalendarModule {
    static forRoot(dateAdapter, config = {}) {
        return {
            ngModule: CalendarModule_1,
            providers: [
                dateAdapter,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils,
                config.a11y || CalendarA11y
            ]
        };
    }
};
CalendarModule = CalendarModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule,
            MatIconModule
        ],
        exports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule
        ]
    })
], CalendarModule);
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsb0JBQW9CLEVBRXBCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsWUFBWSxFQUNiLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25GLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsK0JBQStCLENBQUM7QUFDOUMsY0FBYyw2QkFBNkIsQ0FBQztBQUM1QyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsaUNBQWlDLENBQUM7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFvQkgsSUFBYSxjQUFjLHNCQUEzQixNQUFhLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUFxQixFQUNyQixTQUErQixFQUFFO1FBRWpDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsTUFBTSxDQUFDLG1CQUFtQixJQUFJLDJCQUEyQjtnQkFDekQsTUFBTSxDQUFDLGFBQWEsSUFBSSxxQkFBcUI7Z0JBQzdDLE1BQU0sQ0FBQyxLQUFLLElBQUksYUFBYTtnQkFDN0IsTUFBTSxDQUFDLElBQUksSUFBSSxZQUFZO2FBQzVCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBaEJZLGNBQWM7SUFuQjFCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQiwwQkFBMEI7WUFDMUIseUJBQXlCO1lBQ3pCLGFBQWE7U0FDZDtRQUNELE9BQU8sRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQiwwQkFBMEI7WUFDMUIseUJBQXlCO1NBQzFCO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FnQjFCO1NBaEJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICBDYWxlbmRhck1vZHVsZUNvbmZpZyxcbiAgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gIENhbGVuZGFyQTExeVxufSBmcm9tICcuL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhNb2R1bGUgfSBmcm9tICcuL21vbnRoL2NhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlNb2R1bGUgfSBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uSGVhZGVyTW9kdWxlIH0gZnJvbSAnLi9oZWFkZXIvY2FsZW5kYXItaGVhZGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2RhbE1vZHVsZSB9IGZyb20gJy4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwubW9kdWxlJztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5cbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9oZWFkZXIvY2FsZW5kYXItaGVhZGVyLm1vZHVsZSc7XG5cbi8qKlxuICogVGhlIG1haW4gbW9kdWxlIG9mIHRoaXMgbGlicmFyeS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRlck1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICBDYWxlbmRlck1vZHVsZS5mb3JSb290KClcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICAgIENhbGVuZGFyTW9udGhNb2R1bGUsXG4gICAgQ2FsZW5kYXJXZWVrTW9kdWxlLFxuICAgIENhbGVuZGFyRGF5TW9kdWxlLFxuICAgIENhbGVuZGFyQ29tbW9uSGVhZGVyTW9kdWxlLFxuICAgIENhbGVuZGFyQ29tbW9uTW9kYWxNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGRhdGVBZGFwdGVyOiBQcm92aWRlcixcbiAgICBjb25maWc6IENhbGVuZGFyTW9kdWxlQ29uZmlnID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDYWxlbmRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBkYXRlQWRhcHRlcixcbiAgICAgICAgY29uZmlnLmV2ZW50VGl0bGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICAgICAgICBjb25maWcuZGF0ZUZvcm1hdHRlciB8fCBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy51dGlscyB8fCBDYWxlbmRhclV0aWxzLFxuICAgICAgICBjb25maWcuYTExeSB8fCBDYWxlbmRhckExMXlcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=