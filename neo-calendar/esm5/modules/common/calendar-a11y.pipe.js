import * as tslib_1 from "tslib";
import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarA11y } from './calendar-a11y.provider';
/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
var CalendarA11yPipe = /** @class */ (function () {
    function CalendarA11yPipe(calendarA11y, locale) {
        this.calendarA11y = calendarA11y;
        this.locale = locale;
    }
    CalendarA11yPipe.prototype.transform = function (a11yParams, method) {
        a11yParams.locale = a11yParams.locale || this.locale;
        if (typeof this.calendarA11y[method] === 'undefined') {
            var allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarA11y.prototype)).filter(function (iMethod) { return iMethod !== 'constructor'; });
            throw new Error(method + " is not a valid a11y method. Can only be one of " + allowedMethods.join(', '));
        }
        return this.calendarA11y[method](a11yParams);
    };
    CalendarA11yPipe.ctorParameters = function () { return [
        { type: CalendarA11y },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    CalendarA11yPipe = tslib_1.__decorate([
        Pipe({
            name: 'calendarA11y'
        }),
        tslib_1.__param(1, Inject(LOCALE_ID))
    ], CalendarA11yPipe);
    return CalendarA11yPipe;
}());
export { CalendarA11yPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItYTExeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUd4RDs7Ozs7O0dBTUc7QUFJSDtJQUNFLDBCQUNVLFlBQTBCLEVBQ1AsTUFBYztRQURqQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNQLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDeEMsQ0FBQztJQUVKLG9DQUFTLEdBQVQsVUFBVSxVQUFzQixFQUFFLE1BQWM7UUFDOUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ3BELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQzlDLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxLQUFLLGFBQWEsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQ1YsTUFBTSx3REFBbUQsY0FBYyxDQUFDLElBQUksQ0FDN0UsSUFBSSxDQUNILENBQ0osQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O2dCQWpCdUIsWUFBWTs2Q0FDakMsTUFBTSxTQUFDLFNBQVM7O0lBSFIsZ0JBQWdCO1FBSDVCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxjQUFjO1NBQ3JCLENBQUM7UUFJRyxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7T0FIVCxnQkFBZ0IsQ0FvQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBMT0NBTEVfSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJBMTF5IH0gZnJvbSAnLi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyJztcbmltcG9ydCB7IEExMXlQYXJhbXMgfSBmcm9tICcuL2NhbGVuZGFyLWExMXkuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBUaGlzIHBpcGUgaXMgcHJpbWFyaWx5IGZvciByZW5kZXJpbmcgYXJpYSBsYWJlbHMuIEV4YW1wbGUgdXNhZ2U6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyB3aGVyZSBgbXlFdmVudGAgaXMgYSBgQ2FsZW5kYXJFdmVudGAgYW5kIG15TG9jYWxlIGlzIGEgbG9jYWxlIGlkZW50aWZpZXJcbiAqIHt7IHsgZXZlbnQ6IG15RXZlbnQsIGxvY2FsZTogbXlMb2NhbGUgfSB8IGNhbGVuZGFyQTExeTogJ2V2ZW50RGVzY3JpcHRpb24nIH19XG4gKiBgYGBcbiAqL1xuQFBpcGUoe1xuICBuYW1lOiAnY2FsZW5kYXJBMTF5J1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckExMXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FsZW5kYXJBMTF5OiBDYWxlbmRhckExMXksXG4gICAgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHRyYW5zZm9ybShhMTF5UGFyYW1zOiBBMTF5UGFyYW1zLCBtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgYTExeVBhcmFtcy5sb2NhbGUgPSBhMTF5UGFyYW1zLmxvY2FsZSB8fCB0aGlzLmxvY2FsZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FsZW5kYXJBMTF5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBhbGxvd2VkTWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FsZW5kYXJBMTF5LnByb3RvdHlwZSlcbiAgICAgICkuZmlsdGVyKGlNZXRob2QgPT4gaU1ldGhvZCAhPT0gJ2NvbnN0cnVjdG9yJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAke21ldGhvZH0gaXMgbm90IGEgdmFsaWQgYTExeSBtZXRob2QuIENhbiBvbmx5IGJlIG9uZSBvZiAke2FsbG93ZWRNZXRob2RzLmpvaW4oXG4gICAgICAgICAgJywgJ1xuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyQTExeVttZXRob2RdKGExMXlQYXJhbXMpO1xuICB9XG59XG4iXX0=