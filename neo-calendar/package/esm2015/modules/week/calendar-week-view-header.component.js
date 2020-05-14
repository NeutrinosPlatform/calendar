import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
let CalendarWeekViewHeaderComponent = class CalendarWeekViewHeaderComponent {
    constructor() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.dragEnter = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
};
tslib_1.__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "days", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewHeaderComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "dayHeaderClicked", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "eventDropped", void 0);
tslib_1.__decorate([
    Output()
], CalendarWeekViewHeaderComponent.prototype, "dragEnter", void 0);
CalendarWeekViewHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view-header',
        template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass"
          (mwlClick)="dayHeaderClicked.emit({ day: day, sourceEvent: $event })"
          mwlDroppable
          dragOverClass="cal-drag-over"
          (drop)="
            eventDropped.emit({
              event: $event.dropData.event,
              newStart: day.date
            })
          "
          (dragEnter)="dragEnter.emit({ date: day.date })"
          tabindex="0"
          role="columnheader"
        >
          <div class="week-header-day">
            {{ day.date | calendarDate: 'weekViewColumnHeader':locale }}
          </div>
          <div class="week-header-date">
            {{day.date | calendarDate: 'weekViewColumnSubHeader':locale}}
          </div>
        </div>     
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewHeaderComponent);
export { CalendarWeekViewHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRWIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUEyRDFELElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBekQ1QztRQWdFWSxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFHekMsQ0FBQztRQUVLLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBR3JDLENBQUM7UUFFSyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFekQsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQztDQUFBLENBQUE7QUFuQlU7SUFBUixLQUFLLEVBQUU7NkRBQWlCO0FBRWhCO0lBQVIsS0FBSyxFQUFFOytEQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFO3VFQUFrQztBQUVoQztJQUFULE1BQU0sRUFBRTt5RUFHSjtBQUVLO0lBQVQsTUFBTSxFQUFFO3FFQUdKO0FBRUs7SUFBVCxNQUFNLEVBQUU7a0VBQWdEO0FBakI5QywrQkFBK0I7SUF6RDNDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDtLQUNGLENBQUM7R0FDVywrQkFBK0IsQ0FvQjNDO1NBcEJZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIFdlZWtEYXkgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1kYXlzPVwiZGF5c1wiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcbiAgICAgIGxldC1kYXlIZWFkZXJDbGlja2VkPVwiZGF5SGVhZGVyQ2xpY2tlZFwiXG4gICAgICBsZXQtZXZlbnREcm9wcGVkPVwiZXZlbnREcm9wcGVkXCJcbiAgICAgIGxldC10cmFja0J5V2Vla0RheUhlYWRlckRhdGU9XCJ0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgbGV0LWRyYWdFbnRlcj1cImRyYWdFbnRlclwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXktaGVhZGVyc1wiIHJvbGU9XCJyb3dcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhlYWRlclwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtcGFzdF09XCJkYXkuaXNQYXN0XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoeyBkYXk6IGRheSwgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxuICAgICAgICAgIChkcm9wKT1cIlxuICAgICAgICAgICAgZXZlbnREcm9wcGVkLmVtaXQoe1xuICAgICAgICAgICAgICBldmVudDogJGV2ZW50LmRyb3BEYXRhLmV2ZW50LFxuICAgICAgICAgICAgICBuZXdTdGFydDogZGF5LmRhdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXCJcbiAgICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlci5lbWl0KHsgZGF0ZTogZGF5LmRhdGUgfSlcIlxuICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vlay1oZWFkZXItZGF5XCI+XG4gICAgICAgICAgICB7eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ3dlZWtWaWV3Q29sdW1uSGVhZGVyJzpsb2NhbGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vlay1oZWFkZXItZGF0ZVwiPlxuICAgICAgICAgICAge3tkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ3dlZWtWaWV3Q29sdW1uU3ViSGVhZGVyJzpsb2NhbGV9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gICAgIFxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBkYXlzOiBkYXlzLFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgZGF5SGVhZGVyQ2xpY2tlZDogZGF5SGVhZGVyQ2xpY2tlZCxcbiAgICAgICAgZXZlbnREcm9wcGVkOiBldmVudERyb3BwZWQsXG4gICAgICAgIGRyYWdFbnRlcjogZHJhZ0VudGVyLFxuICAgICAgICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICBAT3V0cHV0KCkgZXZlbnREcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgbmV3U3RhcnQ6IERhdGU7XG4gIH0+KCk7XG5cbiAgQE91dHB1dCgpIGRyYWdFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XG5cbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlO1xufVxuIl19