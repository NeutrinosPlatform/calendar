import * as tslib_1 from "tslib";
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { getWeekViewPeriod } from './util';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
var CalendarAngularDateFormatter = /** @class */ (function () {
    function CalendarAngularDateFormatter(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    CalendarAngularDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEEE', locale);
    };
    /**
     * The month view cell day number
     */
    CalendarAngularDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'd', locale);
    };
    /**
     * The month view title
     */
    CalendarAngularDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'LLLL y', locale);
    };
    /**
     * The week view header week day labels
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEEE', locale);
    };
    /**
     * The week view sub header day and month labels
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'MMM d', locale);
    };
    /**
     * The week view title
     */
    CalendarAngularDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale, weekStartsOn = _a.weekStartsOn, excludeDays = _a.excludeDays, daysInWeek = _a.daysInWeek;
        var _b = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
        var format = function (dateToFormat, showYear) {
            return formatDate(dateToFormat, 'MMM d' + (showYear ? ', yyyy' : ''), locale);
        };
        return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
    };
    /**
     * The time formatting down the left hand side of the week view
     */
    CalendarAngularDateFormatter.prototype.weekViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'h a', locale);
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    CalendarAngularDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'h a', locale);
    };
    /**
     * The day view title
     */
    CalendarAngularDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEEE, MMMM d, y', locale);
    };
    CalendarAngularDateFormatter.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    CalendarAngularDateFormatter = tslib_1.__decorate([
        Injectable()
    ], CalendarAngularDateFormatter);
    return CalendarAngularDateFormatter;
}());
export { CalendarAngularDateFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWFuZ3VsYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFM0M7O0dBRUc7QUFFSDtJQUVFLHNDQUFzQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFbEQ7O09BRUc7SUFDSSw0REFBcUIsR0FBNUIsVUFBNkIsRUFBcUM7WUFBbkMsY0FBSSxFQUFFLGtCQUFNO1FBQ3pDLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0kseURBQWtCLEdBQXpCLFVBQTBCLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUN0QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLHFEQUFjLEdBQXJCLFVBQXNCLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNsQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNJLDJEQUFvQixHQUEzQixVQUE0QixFQUFxQztZQUFuQyxjQUFJLEVBQUUsa0JBQU07UUFDeEMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw4REFBdUIsR0FBOUIsVUFBK0IsRUFHVDtZQUZwQixjQUFJLEVBQ0osa0JBQU07UUFFTixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUdJLG9EQUFhLEdBQXBCLFVBQXFCLEVBTUM7WUFMcEIsY0FBSSxFQUNKLGtCQUFNLEVBQ04sOEJBQVksRUFDWiw0QkFBVyxFQUNYLDBCQUFVO1FBRUosSUFBQSxxRkFNTCxFQU5PLHdCQUFTLEVBQUUsb0JBTWxCLENBQUM7UUFDRixJQUFNLE1BQU0sR0FBRyxVQUFDLFlBQWtCLEVBQUUsUUFBaUI7WUFDbkQsT0FBQSxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUM7UUFBdEUsQ0FBc0UsQ0FBQztRQUN6RSxPQUFVLE1BQU0sQ0FDZCxTQUFTLEVBQ1QsU0FBUyxDQUFDLGNBQWMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FDeEQsV0FBTSxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBRyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLG1EQUFZLEdBQW5CLFVBQW9CLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLGtEQUFXLEdBQWxCLFVBQW1CLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUMvQixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLG1EQUFZLEdBQW5CLFVBQW9CLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Z0JBdEZrQyxXQUFXOztJQUZuQyw0QkFBNEI7UUFEeEMsVUFBVSxFQUFFO09BQ0EsNEJBQTRCLENBeUZ4QztJQUFELG1DQUFDO0NBQUEsQUF6RkQsSUF5RkM7U0F6RlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlLFxuICBEYXRlRm9ybWF0dGVyUGFyYW1zXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQgeyBnZXRXZWVrVmlld1BlcmlvZCB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogVGhpcyB3aWxsIHVzZSB0aGUgYW5ndWxhciBkYXRlIHBpcGUgdG8gZG8gYWxsIGRhdGUgZm9ybWF0dGluZy4gSXQgaXMgdGhlIGRlZmF1bHQgZGF0ZSBmb3JtYXR0ZXIgdXNlZCBieSB0aGUgY2FsZW5kYXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyXG4gIGltcGxlbWVudHMgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCAnRUVFRScsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgY2VsbCBkYXkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdkJywgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdMTExMIHknLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uSGVhZGVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdFRUVFJywgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHN1YiBoZWFkZXIgZGF5IGFuZCBtb250aCBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7XG4gICAgZGF0ZSxcbiAgICBsb2NhbGVcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ01NTSBkJywgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHRpdGxlXG4gICAqL1xuXG4gICBcbiAgcHVibGljIHdlZWtWaWV3VGl0bGUoe1xuICAgIGRhdGUsXG4gICAgbG9jYWxlLFxuICAgIHdlZWtTdGFydHNPbixcbiAgICBleGNsdWRlRGF5cyxcbiAgICBkYXlzSW5XZWVrXG4gIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgdmlld1N0YXJ0LCB2aWV3RW5kIH0gPSBnZXRXZWVrVmlld1BlcmlvZChcbiAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICBkYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZURheXMsXG4gICAgICBkYXlzSW5XZWVrLCBcbiAgICApO1xuICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlVG9Gb3JtYXQ6IERhdGUsIHNob3dZZWFyOiBib29sZWFuKSA9PlxuICAgICAgZm9ybWF0RGF0ZShkYXRlVG9Gb3JtYXQsICdNTU0gZCcgKyAoc2hvd1llYXIgPyAnLCB5eXl5JyA6ICcnKSwgbG9jYWxlKTtcbiAgICByZXR1cm4gYCR7Zm9ybWF0KFxuICAgICAgdmlld1N0YXJ0LFxuICAgICAgdmlld1N0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkgIT09IHZpZXdFbmQuZ2V0VVRDRnVsbFllYXIoKVxuICAgICl9IC0gJHtmb3JtYXQodmlld0VuZCwgdHJ1ZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSB3ZWVrIHZpZXdcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0hvdXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ2ggYScsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRpbWUgZm9ybWF0dGluZyBkb3duIHRoZSBsZWZ0IGhhbmQgc2lkZSBvZiB0aGUgZGF5IHZpZXdcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3SG91cih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCAnaCBhJywgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ0VFRUUsIE1NTU0gZCwgeScsIGxvY2FsZSk7XG4gIH1cbn1cbiJdfQ==