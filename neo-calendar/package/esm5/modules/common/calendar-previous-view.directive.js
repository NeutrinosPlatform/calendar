import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarView } from './calendar-view.enum';
import { addDaysWithExclusions } from './util';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
var CalendarPreviousViewDirective = /** @class */ (function () {
    function CalendarPreviousViewDirective(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going back by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.viewChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    CalendarPreviousViewDirective.prototype.onClick = function () {
        this.viewChange.emit();
        var subFn = {
            day: this.dateAdapter.subDays,
            week: this.dateAdapter.subWeeks,
            month: this.dateAdapter.subMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(subFn(this.viewDate, 1));
        }
    };
    CalendarPreviousViewDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarPreviousViewDirective.prototype, "view", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarPreviousViewDirective.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarPreviousViewDirective.prototype, "excludeDays", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarPreviousViewDirective.prototype, "daysInWeek", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarPreviousViewDirective.prototype, "viewDateChange", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarPreviousViewDirective.prototype, "viewChange", void 0);
    tslib_1.__decorate([
        HostListener('click')
    ], CalendarPreviousViewDirective.prototype, "onClick", null);
    CalendarPreviousViewDirective = tslib_1.__decorate([
        Directive({
            selector: '[mwlCalendarPreviousView]'
        })
    ], CalendarPreviousViewDirective);
    return CalendarPreviousViewDirective;
}());
export { CalendarPreviousViewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1wcmV2aW91cy12aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7O0dBV0c7QUFJSDtJQTRCRSx1Q0FBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFqQjVDOztXQUVHO1FBQ00sZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFPcEM7O1dBRUc7UUFDTyxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRUssQ0FBQztJQUVoRDs7T0FFRztJQUVILCtDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3RCLElBQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtZQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTO1NBQ2xDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQ0YsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIscUJBQXFCLENBQ25CLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQ2IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7O2dCQW5DZ0MsV0FBVzs7SUF4Qm5DO1FBQVIsS0FBSyxFQUFFOytEQUErQztJQUs5QztRQUFSLEtBQUssRUFBRTttRUFBZ0I7SUFLZjtRQUFSLEtBQUssRUFBRTtzRUFBNEI7SUFLM0I7UUFBUixLQUFLLEVBQUU7cUVBQW9CO0lBS2xCO1FBQVQsTUFBTSxFQUFFO3lFQUF5RDtJQUV4RDtRQUFULE1BQU0sRUFBRTtxRUFBaUM7SUFRMUM7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO2dFQThCckI7SUEvRFUsNkJBQTZCO1FBSHpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwyQkFBMkI7U0FDdEMsQ0FBQztPQUNXLDZCQUE2QixDQWdFekM7SUFBRCxvQ0FBQztDQUFBLEFBaEVELElBZ0VDO1NBaEVZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IENhbGVuZGFyVmlldyB9IGZyb20gJy4vY2FsZW5kYXItdmlldy5lbnVtJztcbmltcG9ydCB7IGFkZERheXNXaXRoRXhjbHVzaW9ucyB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIHByZXZpb3VzIHZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxidXR0b25cbiAqICBtd2xDYWxlbmRhclByZXZpb3VzVmlld1xuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAqICBbdmlld109XCJ2aWV3XCI+XG4gKiAgUHJldmlvdXNcbiAqIDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclByZXZpb3VzVmlld10nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHZpZXc6IENhbGVuZGFyVmlldyB8ICdtb250aCcgfCAnd2VlaycgfCAnZGF5JztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogRGF5cyB0byBza2lwIHdoZW4gZ29pbmcgYmFjayBieSAxIGRheVxuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuIElmIHNldCB3aWxsIHN1YnRyYWN0IHRoaXMgYW1vdW50IG9mIGRheXMgaW5zdGVhZCBvZiAxIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0NoYW5nZS5lbWl0KClcbiAgICBjb25zdCBzdWJGbjogYW55ID0ge1xuICAgICAgZGF5OiB0aGlzLmRhdGVBZGFwdGVyLnN1YkRheXMsXG4gICAgICB3ZWVrOiB0aGlzLmRhdGVBZGFwdGVyLnN1YldlZWtzLFxuICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViTW9udGhzXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LkRheSkge1xuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICAgIC0xLFxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LldlZWsgJiYgdGhpcy5kYXlzSW5XZWVrKSB7XG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgLXRoaXMuZGF5c0luV2VlayxcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdWJGbih0aGlzLnZpZXdEYXRlLCAxKSk7XG4gICAgfVxuICB9XG59XG4iXX0=