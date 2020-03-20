import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
 * ```
 */
var CalendarTodayDirective = /** @class */ (function () {
    function CalendarTodayDirective(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    CalendarTodayDirective.prototype.onClick = function () {
        this.viewDateChange.emit(this.dateAdapter.startOfDay(new Date()));
    };
    CalendarTodayDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CalendarTodayDirective.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Output()
    ], CalendarTodayDirective.prototype, "viewDateChange", void 0);
    tslib_1.__decorate([
        HostListener('click')
    ], CalendarTodayDirective.prototype, "onClick", null);
    CalendarTodayDirective = tslib_1.__decorate([
        Directive({
            selector: '[mwlCalendarToday]'
        })
    ], CalendarTodayDirective);
    return CalendarTodayDirective;
}());
export { CalendarTodayDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9kYXkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9kYXkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFL0Q7Ozs7Ozs7Ozs7R0FVRztBQUlIO0lBV0UsZ0NBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTDVDOztXQUVHO1FBQ08sbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRWhEOztPQUVHO0lBRUgsd0NBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O2dCQVJnQyxXQUFXOztJQVBuQztRQUFSLEtBQUssRUFBRTs0REFBZ0I7SUFLZDtRQUFULE1BQU0sRUFBRTtrRUFBeUQ7SUFRbEU7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO3lEQUdyQjtJQW5CVSxzQkFBc0I7UUFIbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO09BQ1csc0JBQXNCLENBb0JsQztJQUFELDZCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBjdXJyZW50IGRheS4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPGJ1dHRvblxuICogIG13bENhbGVuZGFyVG9kYXlcbiAqICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiPlxuICogIFRvZGF5XG4gKiA8L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJUb2RheV0nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdCh0aGlzLmRhdGVBZGFwdGVyLnN0YXJ0T2ZEYXkobmV3IERhdGUoKSkpO1xuICB9XG59XG4iXX0=