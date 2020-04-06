import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import {
  CalendarCommonModule,
  CalendarModuleConfig,
  CalendarUtils,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  CalendarA11y,
  DateAdapter
} from './common/calendar-common.module';
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
@NgModule({
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
      useFactory: adapterFactory
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
  providers: [CalendarEventTitleFormatter,CalendarDateFormatter,CalendarA11y,CalendarUtils],
})

export class CalendarModule {}

