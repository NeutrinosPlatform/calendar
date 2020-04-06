import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CalendarCommonModule, CalendarUtils, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y, DateAdapter } from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarCommonHeaderModule } from './header/calendar-header.module';
import { CalendarCommonModalModule } from './calendar-modal/calendar-modal.module';
import { MatIconModule } from '@angular/material/icon';
import { adapterFactory } from '../date-adapters/date-fns';
export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './day/calendar-day.module';
export * from './header/calendar-header.module';
const ɵ0 = adapterFactory;
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
let CalendarModule = class CalendarModule {
};
CalendarModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule,
            MatIconModule,
            CalendarCommonModule.forRoot({
                provide: DateAdapter,
                useFactory: ɵ0
            })
        ],
        exports: [
            CalendarCommonModule,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarCommonHeaderModule,
            CalendarCommonModalModule,
        ],
        providers: [CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y, CalendarUtils],
    })
], CalendarModule);
export { CalendarModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxvQkFBb0IsRUFFcEIsYUFBYSxFQUNiLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxjQUFjLGlDQUFpQyxDQUFDO1dBNEI5QixjQUFjO0FBMUJoQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQTBCSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUcsQ0FBQTtBQUFqQixjQUFjO0lBekIxQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsMEJBQTBCO1lBQzFCLHlCQUF5QjtZQUN6QixhQUFhO1lBQ2Isb0JBQW9CLENBQUMsT0FBTyxDQUFDO2dCQUMzQixPQUFPLEVBQUUsV0FBVztnQkFDcEIsVUFBVSxJQUFnQjthQUMzQixDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUU7WUFDUCxvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsMEJBQTBCO1lBQzFCLHlCQUF5QjtTQUMxQjtRQUNELFNBQVMsRUFBRSxDQUFDLDJCQUEyQixFQUFDLHFCQUFxQixFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7S0FDMUYsQ0FBQztHQUVXLGNBQWMsQ0FBRztTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgQ2FsZW5kYXJNb2R1bGVDb25maWcsXG4gIENhbGVuZGFyVXRpbHMsXG4gIENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICBDYWxlbmRhckExMXksXG4gIERhdGVBZGFwdGVyXG59IGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla01vZHVsZSB9IGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRheU1vZHVsZSB9IGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25IZWFkZXJNb2R1bGUgfSBmcm9tICcuL2hlYWRlci9jYWxlbmRhci1oZWFkZXIubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kYWxNb2R1bGUgfSBmcm9tICcuL2NhbGVuZGFyLW1vZGFsL2NhbGVuZGFyLW1vZGFsLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBhZGFwdGVyRmFjdG9yeSB9IGZyb20gJy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1mbnMnO1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5tb2R1bGUnO1xuXG4vKipcbiAqIFRoZSBtYWluIG1vZHVsZSBvZiB0aGlzIGxpYnJhcnkuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ2FsZW5kZXJNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgQ2FsZW5kZXJNb2R1bGUuZm9yUm9vdCgpXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeU1vZHVsZSB7fVxuICogYGBgXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25IZWFkZXJNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25Nb2RhbE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VGYWN0b3J5OiBhZGFwdGVyRmFjdG9yeVxuICAgIH0pIFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25IZWFkZXJNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25Nb2RhbE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLENhbGVuZGFyRGF0ZUZvcm1hdHRlcixDYWxlbmRhckExMXksQ2FsZW5kYXJVdGlsc10sXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2R1bGUge31cblxuIl19