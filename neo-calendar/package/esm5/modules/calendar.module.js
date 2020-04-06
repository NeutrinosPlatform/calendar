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
var ɵ0 = adapterFactory;
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
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
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
    return CalendarModule;
}());
export { CalendarModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxvQkFBb0IsRUFFcEIsYUFBYSxFQUNiLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxjQUFjLGlDQUFpQyxDQUFDO1NBNEI5QixjQUFjO0FBMUJoQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQTBCSDtJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQXpCMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixrQkFBa0I7Z0JBQ2xCLGlCQUFpQjtnQkFDakIsMEJBQTBCO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLGFBQWE7Z0JBQ2Isb0JBQW9CLENBQUMsT0FBTyxDQUFDO29CQUMzQixPQUFPLEVBQUUsV0FBVztvQkFDcEIsVUFBVSxJQUFnQjtpQkFDM0IsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixrQkFBa0I7Z0JBQ2xCLGlCQUFpQjtnQkFDakIsMEJBQTBCO2dCQUMxQix5QkFBeUI7YUFDMUI7WUFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsRUFBQyxxQkFBcUIsRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO1NBQzFGLENBQUM7T0FFVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICBDYWxlbmRhck1vZHVsZUNvbmZpZyxcbiAgQ2FsZW5kYXJVdGlscyxcbiAgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gIENhbGVuZGFyQTExeSxcbiAgRGF0ZUFkYXB0ZXJcbn0gZnJvbSAnLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoTW9kdWxlIH0gZnJvbSAnLi9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyRGF5TW9kdWxlIH0gZnJvbSAnLi9kYXkvY2FsZW5kYXItZGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSB9IGZyb20gJy4vaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2RhbE1vZHVsZSB9IGZyb20gJy4vY2FsZW5kYXItbW9kYWwvY2FsZW5kYXItbW9kYWwubW9kdWxlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IGFkYXB0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWZucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9oZWFkZXIvY2FsZW5kYXItaGVhZGVyLm1vZHVsZSc7XG5cbi8qKlxuICogVGhlIG1haW4gbW9kdWxlIG9mIHRoaXMgbGlicmFyeS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRlck1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICBDYWxlbmRlck1vZHVsZS5mb3JSb290KClcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUuZm9yUm9vdCh7XG4gICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcbiAgICAgIHVzZUZhY3Rvcnk6IGFkYXB0ZXJGYWN0b3J5XG4gICAgfSkgXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbkhlYWRlck1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZGFsTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLENhbGVuZGFyQTExeSxDYWxlbmRhclV0aWxzXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7fVxuXG4iXX0=