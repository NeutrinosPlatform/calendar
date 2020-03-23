import * as tslib_1 from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
let CalendarWeekViewCurrentTimeMarkerComponent = class CalendarWeekViewCurrentTimeMarkerComponent {
    constructor(dateAdapter, zone) {
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1000)), startWith(0), switchMapTo(this.columnDate$), map(columnDate => {
            const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
            const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
            const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) / 60;
            const now = new Date();
            return {
                isVisible: this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier
            };
        }));
    }
    ngOnChanges(changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    }
};
CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: NgZone }
];
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "columnDate", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartHour", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartMinute", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndHour", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndMinute", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegments", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegmentHeight", void 0);
tslib_1.__decorate([
    Input()
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "customTemplate", void 0);
CalendarWeekViewCurrentTimeMarkerComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view-current-time-marker',
        template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewCurrentTimeMarkerComponent);
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFvQy9ELElBQWEsMENBQTBDLEdBQXZELE1BQWEsMENBQTBDO0lBa0RyRCxZQUFvQixXQUF3QixFQUFVLElBQVk7UUFBOUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBakMxRCxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVqRSxZQUFPLEdBR0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMxQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDN0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ3hELElBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7WUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztZQUNGLE1BQU0sa0JBQWtCLEdBQ3RCLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN2QixPQUFPO2dCQUNMLFNBQVMsRUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO29CQUMzQyxHQUFHLElBQUksVUFBVTtvQkFDakIsR0FBRyxJQUFJLFFBQVE7Z0JBQ2pCLEdBQUcsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7b0JBQ3JELGtCQUFrQjthQUNyQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVtRSxDQUFDO0lBRXRFLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Q0FDRixDQUFBOztZQVBrQyxXQUFXO1lBQWdCLE1BQU07O0FBakR6RDtJQUFSLEtBQUssRUFBRTs4RUFBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFO2tGQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTs4RUFBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFO2dGQUFzQjtBQUVyQjtJQUFSLEtBQUssRUFBRTtxRkFBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7a0ZBQWtDO0FBZi9CLDBDQUEwQztJQWxDdEQsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDRDQUE0QztRQUN0RCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtLQUNGLENBQUM7R0FDVywwQ0FBMEMsQ0F5RHREO1NBekRZLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgaW50ZXJ2YWwsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcFRvLCBzdGFydFdpdGgsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtY29sdW1uRGF0ZT1cImNvbHVtbkRhdGVcIlxuICAgICAgbGV0LWRheVN0YXJ0SG91cj1cImRheVN0YXJ0SG91clwiXG4gICAgICBsZXQtZGF5U3RhcnRNaW51dGU9XCJkYXlTdGFydE1pbnV0ZVwiXG4gICAgICBsZXQtZGF5RW5kSG91cj1cImRheUVuZEhvdXJcIlxuICAgICAgbGV0LWRheUVuZE1pbnV0ZT1cImRheUVuZE1pbnV0ZVwiXG4gICAgICBsZXQtaXNWaXNpYmxlPVwiaXNWaXNpYmxlXCJcbiAgICAgIGxldC10b3BQeD1cInRvcFB4XCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWN1cnJlbnQtdGltZS1tYXJrZXJcIlxuICAgICAgICAqbmdJZj1cImlzVmlzaWJsZVwiXG4gICAgICAgIFtzdHlsZS50b3AucHhdPVwidG9wUHhcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgY29sdW1uRGF0ZTogY29sdW1uRGF0ZSxcbiAgICAgICAgZGF5U3RhcnRIb3VyOiBkYXlTdGFydEhvdXIsXG4gICAgICAgIGRheVN0YXJ0TWludXRlOiBkYXlTdGFydE1pbnV0ZSxcbiAgICAgICAgZGF5RW5kSG91cjogZGF5RW5kSG91cixcbiAgICAgICAgZGF5RW5kTWludXRlOiBkYXlFbmRNaW51dGUsXG4gICAgICAgIGlzVmlzaWJsZTogKG1hcmtlciQgfCBhc3luYyk/LmlzVmlzaWJsZSxcbiAgICAgICAgdG9wUHg6IChtYXJrZXIkIHwgYXN5bmMpPy50b3BcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbHVtbkRhdGU6IERhdGU7XG5cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXI7XG5cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXI7XG5cbiAgQElucHV0KCkgZGF5RW5kTWludXRlOiBudW1iZXI7XG5cbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXI7XG5cbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwcml2YXRlIGNvbHVtbkRhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlPih0aGlzLmNvbHVtbkRhdGUpO1xuXG4gIG1hcmtlciQ6IE9ic2VydmFibGU8e1xuICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgICB0b3A6IG51bWJlcjtcbiAgfT4gPSB0aGlzLnpvbmUub25TdGFibGUucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gaW50ZXJ2YWwoNjAgKiAxMDAwKSksXG4gICAgc3RhcnRXaXRoKDApLFxuICAgIHN3aXRjaE1hcFRvKHRoaXMuY29sdW1uRGF0ZSQpLFxuICAgIG1hcChjb2x1bW5EYXRlID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0T2ZEYXkgPSB0aGlzLmRhdGVBZGFwdGVyLnNldE1pbnV0ZXMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuc2V0SG91cnMoY29sdW1uRGF0ZSwgdGhpcy5kYXlTdGFydEhvdXIpLFxuICAgICAgICB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICApO1xuICAgICAgY29uc3QgZW5kT2ZEYXkgPSB0aGlzLmRhdGVBZGFwdGVyLnNldE1pbnV0ZXMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuc2V0SG91cnMoY29sdW1uRGF0ZSwgdGhpcy5kYXlFbmRIb3VyKSxcbiAgICAgICAgdGhpcy5kYXlFbmRNaW51dGVcbiAgICAgICk7XG4gICAgICBjb25zdCBob3VySGVpZ2h0TW9kaWZpZXIgPVxuICAgICAgICAodGhpcy5ob3VyU2VnbWVudHMgKiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0KSAvIDYwO1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzVmlzaWJsZTpcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmlzU2FtZURheShjb2x1bW5EYXRlLCBub3cpICYmXG4gICAgICAgICAgbm93ID49IHN0YXJ0T2ZEYXkgJiZcbiAgICAgICAgICBub3cgPD0gZW5kT2ZEYXksXG4gICAgICAgIHRvcDpcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmRpZmZlcmVuY2VJbk1pbnV0ZXMobm93LCBzdGFydE9mRGF5KSAqXG4gICAgICAgICAgaG91ckhlaWdodE1vZGlmaWVyXG4gICAgICB9O1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb2x1bW5EYXRlKSB7XG4gICAgICB0aGlzLmNvbHVtbkRhdGUkLm5leHQoY2hhbmdlcy5jb2x1bW5EYXRlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=