import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModalComponent } from './calendar-modal.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import { MatIconModule, MatFormFieldModule, MatInputModule,
   MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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
    MatNativeDateModule ,  
    MatDatepickerModule,
    ReactiveFormsModule, 
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
    
 ],
  declarations: [CalendarModalComponent],
  exports: [CalendarModalComponent],
})
export class CalendarCommonModalModule {}
