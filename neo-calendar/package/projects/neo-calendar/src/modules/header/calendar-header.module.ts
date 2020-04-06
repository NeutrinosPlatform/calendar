import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCommonHeaderComponent } from './calendar-header.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { CalendarCommonModalModule } from '../calendar-modal/calendar-modal.module';
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component"
import { EventEmitterService } from '../common/calendar-event-emitter.service';

export {
  CalendarCommonHeaderComponent
} from './calendar-header.component';

@NgModule({
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
export class CalendarCommonHeaderModule { }
