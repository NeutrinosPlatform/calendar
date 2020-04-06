import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
var CalendarEventTitlePipe = /** @class */ (function () {
    function CalendarEventTitlePipe(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    CalendarEventTitlePipe.prototype.transform = function (title, titleType, event) {
        return this.calendarEventTitle[titleType](event, title);
    };
    CalendarEventTitlePipe.ctorParameters = function () { return [
        { type: CalendarEventTitleFormatter }
    ]; };
    CalendarEventTitlePipe = tslib_1.__decorate([
        Pipe({
            name: 'calendarEventTitle'
        })
    ], CalendarEventTitlePipe);
    return CalendarEventTitlePipe;
}());
export { CalendarEventTitlePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBS3hGO0lBQ0UsZ0NBQW9CLGtCQUErQztRQUEvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO0lBQUcsQ0FBQztJQUV2RSwwQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLFNBQWlCLEVBQUUsS0FBb0I7UUFDOUQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQUp1QywyQkFBMkI7O0lBRHhELHNCQUFzQjtRQUhsQyxJQUFJLENBQUM7WUFDSixJQUFJLEVBQUUsb0JBQW9CO1NBQzNCLENBQUM7T0FDVyxzQkFBc0IsQ0FNbEM7SUFBRCw2QkFBQztDQUFBLEFBTkQsSUFNQztTQU5ZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRXZlbnRUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyRXZlbnRUaXRsZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyKSB7fVxuXG4gIHRyYW5zZm9ybSh0aXRsZTogc3RyaW5nLCB0aXRsZVR5cGU6IHN0cmluZywgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyRXZlbnRUaXRsZVt0aXRsZVR5cGVdKGV2ZW50LCB0aXRsZSk7XG4gIH1cbn1cbiJdfQ==