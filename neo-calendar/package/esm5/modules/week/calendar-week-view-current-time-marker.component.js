import * as tslib_1 from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
var CalendarWeekViewCurrentTimeMarkerComponent = /** @class */ (function () {
    function CalendarWeekViewCurrentTimeMarkerComponent(dateAdapter, zone) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(function () { return interval(60 * 1000); }), startWith(0), switchMapTo(this.columnDate$), map(function (columnDate) {
            var startOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayStartHour), _this.dayStartMinute);
            var endOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayEndHour), _this.dayEndMinute);
            var hourHeightModifier = (_this.hourSegments * _this.hourSegmentHeight) / 60;
            var now = new Date();
            return {
                isVisible: _this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: _this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier
            };
        }));
    }
    CalendarWeekViewCurrentTimeMarkerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    };
    CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = function () { return [
        { type: DateAdapter },
        { type: NgZone }
    ]; };
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
            template: "\n    <ng-template\n      #defaultTemplate\n      let-columnDate=\"columnDate\"\n      let-dayStartHour=\"dayStartHour\"\n      let-dayStartMinute=\"dayStartMinute\"\n      let-dayEndHour=\"dayEndHour\"\n      let-dayEndMinute=\"dayEndMinute\"\n      let-isVisible=\"isVisible\"\n      let-topPx=\"topPx\"\n    >\n      <div\n        class=\"cal-current-time-marker\"\n        *ngIf=\"isVisible\"\n        [style.top.px]=\"topPx\"\n      ></div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        columnDate: columnDate,\n        dayStartHour: dayStartHour,\n        dayStartMinute: dayStartMinute,\n        dayEndHour: dayEndHour,\n        dayEndMinute: dayEndMinute,\n        isVisible: (marker$ | async)?.isVisible,\n        topPx: (marker$ | async)?.top\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewCurrentTimeMarkerComponent);
    return CalendarWeekViewCurrentTimeMarkerComponent;
}());
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFvQy9EO0lBa0RFLG9EQUFvQixXQUF3QixFQUFVLElBQVk7UUFBbEUsaUJBQXNFO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpDMUQsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFakUsWUFBTyxHQUdGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDMUIsU0FBUyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFuQixDQUFtQixDQUFDLEVBQ3BDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDWixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUM3QixHQUFHLENBQUMsVUFBQSxVQUFVO1lBQ1osSUFBTSxVQUFVLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzVDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLEVBQ3hELEtBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7WUFDRixJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FDMUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEQsS0FBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztZQUNGLElBQU0sa0JBQWtCLEdBQ3RCLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN2QixPQUFPO2dCQUNMLFNBQVMsRUFDUCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO29CQUMzQyxHQUFHLElBQUksVUFBVTtvQkFDakIsR0FBRyxJQUFJLFFBQVE7Z0JBQ2pCLEdBQUcsRUFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7b0JBQ3JELGtCQUFrQjthQUNyQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVtRSxDQUFDO0lBRXRFLGdFQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7O2dCQU5nQyxXQUFXO2dCQUFnQixNQUFNOztJQWpEekQ7UUFBUixLQUFLLEVBQUU7a0ZBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFO29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTtzRkFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7a0ZBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTtvRkFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7eUZBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFO3NGQUFrQztJQWYvQiwwQ0FBMEM7UUFsQ3RELFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0Q0FBNEM7WUFDdEQsUUFBUSxFQUFFLGs0QkE4QlQ7U0FDRixDQUFDO09BQ1csMENBQTBDLENBeUR0RDtJQUFELGlEQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBpbnRlcnZhbCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwVG8sIHN0YXJ0V2l0aCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1jb2x1bW5EYXRlPVwiY29sdW1uRGF0ZVwiXG4gICAgICBsZXQtZGF5U3RhcnRIb3VyPVwiZGF5U3RhcnRIb3VyXCJcbiAgICAgIGxldC1kYXlTdGFydE1pbnV0ZT1cImRheVN0YXJ0TWludXRlXCJcbiAgICAgIGxldC1kYXlFbmRIb3VyPVwiZGF5RW5kSG91clwiXG4gICAgICBsZXQtZGF5RW5kTWludXRlPVwiZGF5RW5kTWludXRlXCJcbiAgICAgIGxldC1pc1Zpc2libGU9XCJpc1Zpc2libGVcIlxuICAgICAgbGV0LXRvcFB4PVwidG9wUHhcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtY3VycmVudC10aW1lLW1hcmtlclwiXG4gICAgICAgICpuZ0lmPVwiaXNWaXNpYmxlXCJcbiAgICAgICAgW3N0eWxlLnRvcC5weF09XCJ0b3BQeFwiXG4gICAgICA+PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBjb2x1bW5EYXRlOiBjb2x1bW5EYXRlLFxuICAgICAgICBkYXlTdGFydEhvdXI6IGRheVN0YXJ0SG91cixcbiAgICAgICAgZGF5U3RhcnRNaW51dGU6IGRheVN0YXJ0TWludXRlLFxuICAgICAgICBkYXlFbmRIb3VyOiBkYXlFbmRIb3VyLFxuICAgICAgICBkYXlFbmRNaW51dGU6IGRheUVuZE1pbnV0ZSxcbiAgICAgICAgaXNWaXNpYmxlOiAobWFya2VyJCB8IGFzeW5jKT8uaXNWaXNpYmxlLFxuICAgICAgICB0b3BQeDogKG1hcmtlciQgfCBhc3luYyk/LnRvcFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29sdW1uRGF0ZTogRGF0ZTtcblxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHByaXZhdGUgY29sdW1uRGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KHRoaXMuY29sdW1uRGF0ZSk7XG5cbiAgbWFya2VyJDogT2JzZXJ2YWJsZTx7XG4gICAgaXNWaXNpYmxlOiBib29sZWFuO1xuICAgIHRvcDogbnVtYmVyO1xuICB9PiA9IHRoaXMuem9uZS5vblN0YWJsZS5waXBlKFxuICAgIHN3aXRjaE1hcCgoKSA9PiBpbnRlcnZhbCg2MCAqIDEwMDApKSxcbiAgICBzdGFydFdpdGgoMCksXG4gICAgc3dpdGNoTWFwVG8odGhpcy5jb2x1bW5EYXRlJCksXG4gICAgbWFwKGNvbHVtbkRhdGUgPT4ge1xuICAgICAgY29uc3Qgc3RhcnRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheVN0YXJ0SG91ciksXG4gICAgICAgIHRoaXMuZGF5U3RhcnRNaW51dGVcbiAgICAgICk7XG4gICAgICBjb25zdCBlbmRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheUVuZEhvdXIpLFxuICAgICAgICB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGhvdXJIZWlnaHRNb2RpZmllciA9XG4gICAgICAgICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpIC8gNjA7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNWaXNpYmxlOlxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuaXNTYW1lRGF5KGNvbHVtbkRhdGUsIG5vdykgJiZcbiAgICAgICAgICBub3cgPj0gc3RhcnRPZkRheSAmJlxuICAgICAgICAgIG5vdyA8PSBlbmRPZkRheSxcbiAgICAgICAgdG9wOlxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZGlmZmVyZW5jZUluTWludXRlcyhub3csIHN0YXJ0T2ZEYXkpICpcbiAgICAgICAgICBob3VySGVpZ2h0TW9kaWZpZXJcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbHVtbkRhdGUpIHtcbiAgICAgIHRoaXMuY29sdW1uRGF0ZSQubmV4dChjaGFuZ2VzLmNvbHVtbkRhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==