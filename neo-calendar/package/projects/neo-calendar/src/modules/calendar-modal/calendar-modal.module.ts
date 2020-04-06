import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModalComponent } from './calendar-modal.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { MatIconModule, MatFormFieldModule, MatInputModule,
   MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

export {
    CalendarModalComponent
} from './calendar-modal.component';

@NgModule({
  imports: [
    CommonModule, 
    CalendarCommonModule, 
    CalendarWeekModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // FormsModule,     
    MatNativeDateModule ,  
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
export class CalendarCommonModalModule {}
