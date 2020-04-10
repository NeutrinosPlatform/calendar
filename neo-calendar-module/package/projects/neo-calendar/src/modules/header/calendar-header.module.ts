import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCommonHeaderComponent } from './calendar-header.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { CalendarCommonModalModule } from '../calendar-modal/calendar-modal.module';
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component"
import { EventEmitterService } from '../common/calendar-event-emitter.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
export {
  CalendarCommonHeaderComponent
} from './calendar-header.component';

@NgModule({
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarCommonHeaderModule { }
