import * as tslib_1 from "tslib";
import { EventEmitter, Output } from '@angular/core';
var EventEmitterService = /** @class */ (function () {
    function EventEmitterService() {
        this.eventChange = new EventEmitter();
    }
    EventEmitterService.prototype.emitNavChangeEvent = function (value, event) {
        this.eventChange.emit({ value: value, event: event });
    };
    EventEmitterService.prototype.getNavChangeEmitter = function () {
        return this.eventChange;
    };
    tslib_1.__decorate([
        Output()
    ], EventEmitterService.prototype, "eventChange", void 0);
    return EventEmitterService;
}());
export { EventEmitterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRTtJQUlFO1FBRlUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWpDLENBQUM7SUFFaEIsZ0RBQWtCLEdBQWxCLFVBQW1CLEtBQUssRUFBRSxLQUFLO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpREFBbUIsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQVZTO1FBQVQsTUFBTSxFQUFFOzREQUF1QztJQVdsRCwwQkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyU2VydmljZSB7XHJcbiAgICBcclxuICBAT3V0cHV0KCkgZXZlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBlbWl0TmF2Q2hhbmdlRXZlbnQodmFsdWUsIGV2ZW50KSB7XHJcbiAgICB0aGlzLmV2ZW50Q2hhbmdlLmVtaXQoe3ZhbHVlLCBldmVudH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmF2Q2hhbmdlRW1pdHRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50Q2hhbmdlO1xyXG4gIH1cclxufVxyXG4iXX0=