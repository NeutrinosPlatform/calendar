import * as tslib_1 from "tslib";
import { EventEmitter, Output } from '@angular/core';
export class EventEmitterService {
    constructor() {
        this.eventChange = new EventEmitter();
    }
    emitNavChangeEvent(value, event) {
        this.eventChange.emit({ value, event });
    }
    getNavChangeEmitter() {
        return this.eventChange;
    }
}
tslib_1.__decorate([
    Output()
], EventEmitterService.prototype, "eventChange", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtZW1pdHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRSxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCO1FBRlUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWpDLENBQUM7SUFFaEIsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFYVztJQUFULE1BQU0sRUFBRTt3REFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlclNlcnZpY2Uge1xyXG4gICAgXHJcbiAgQE91dHB1dCgpIGV2ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgZW1pdE5hdkNoYW5nZUV2ZW50KHZhbHVlLCBldmVudCkge1xyXG4gICAgdGhpcy5ldmVudENoYW5nZS5lbWl0KHt2YWx1ZSwgZXZlbnR9KTtcclxuICB9XHJcblxyXG4gIGdldE5hdkNoYW5nZUVtaXR0ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudENoYW5nZTtcclxuICB9XHJcbn1cclxuIl19