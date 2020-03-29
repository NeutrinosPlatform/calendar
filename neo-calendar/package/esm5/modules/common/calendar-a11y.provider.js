import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { formatDate, I18nPluralPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * This class is responsible for adding accessibility to the calendar.
 * You may override any of its methods via angulars DI to suit your requirements.
 * For example:
 *
 * ```typescript
 * import { A11yParams, CalendarA11y } from 'angular-calendar';
 * import { formatDate, I18nPluralPipe } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * // adding your own a11y params
 * export interface CustomA11yParams extends A11yParams {
 *   isDrSuess?: boolean;
 * }
 *
 * @Injectable()
 * export class CustomCalendarA11y extends CalendarA11y {
 *   constructor(protected i18nPlural: I18nPluralPipe) {
 *     super(i18nPlural);
 *   }
 *
 *   // overriding a function
 *   public openDayEventsLandmark({ date, locale, isDrSuess }: CustomA11yParams): string {
 *     if (isDrSuess) {
 *       return `
 *         ${formatDate(date, 'EEEE MMMM d', locale)}
 *          Today you are you! That is truer than true! There is no one alive
 *          who is you-er than you!
 *       `;
 *     }
 *   }
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *  provide: CalendarA11y,
 *  useClass: CustomCalendarA11y
 * }]
 * ```
 */
var CalendarA11y = /** @class */ (function () {
    function CalendarA11y(i18nPlural) {
        this.i18nPlural = i18nPlural;
    }
    /**
     * Aria label for the badges/date of a cell
     * @example: `Saturday October 19 1 event click to expand`
     */
    CalendarA11y.prototype.monthCell = function (_a) {
        var day = _a.day, locale = _a.locale;
        if (day.badgeTotal > 0) {
            return "\n        " + formatDate(day.date, 'EEEE MMMM d', locale) + ",\n        " + this.i18nPlural.transform(day.badgeTotal, {
                '=0': 'No events',
                '=1': 'One event',
                other: '# events'
            }) + ",\n         click to expand\n      ";
        }
        else {
            return "" + formatDate(day.date, 'EEEE MMMM d', locale);
        }
    };
    /**
     * Aria label for the open day events start landmark
     * @example: `Saturday October 19 expanded view`
     */
    CalendarA11y.prototype.openDayEventsLandmark = function (_a) {
        var date = _a.date, locale = _a.locale;
        return "\n      Beginning of expanded view for " + formatDate(date, 'EEEE MMMM dd', locale) + "\n    ";
    };
    /**
     * Aria label for alert that a day in the month view was expanded
     * @example: `Saturday October 19 expanded`
     */
    CalendarA11y.prototype.openDayEventsAlert = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEEE MMMM dd', locale) + " expanded";
    };
    /**
     * Descriptive aria label for an event
     * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
     */
    CalendarA11y.prototype.eventDescription = function (_a) {
        var event = _a.event, locale = _a.locale;
        if (event.allDay === true) {
            return this.allDayEventDescription({ event: event, locale: locale });
        }
        var aria = "\n      " + formatDate(event.start, 'EEEE MMMM dd', locale) + ",\n      " + event.title + ", from " + formatDate(event.start, 'hh:mm a', locale) + "\n    ";
        if (event.end) {
            return aria + (" to " + formatDate(event.end, 'hh:mm a', locale));
        }
        return aria;
    };
    /**
     * Descriptive aria label for an all day event
     * @example:
     * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
     */
    CalendarA11y.prototype.allDayEventDescription = function (_a) {
        var event = _a.event, locale = _a.locale;
        var aria = "\n      " + event.title + ", event spans multiple days:\n      start time " + formatDate(event.start, 'MMMM dd hh:mm a', locale) + "\n    ";
        if (event.end) {
            return (aria + (", stop time " + formatDate(event.end, 'MMMM d hh:mm a', locale)));
        }
        return aria + ", no stop time";
    };
    /**
     * Aria label for the calendar event actions icons
     * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
     */
    CalendarA11y.prototype.actionButtonLabel = function (_a) {
        var action = _a.action;
        return action.a11yLabel;
    };
    /**
     * @returns {number} Tab index to be given to month cells
     */
    CalendarA11y.prototype.monthCellTabIndex = function () {
        return 0;
    };
    /**
     * @returns true if the events inside the month cell should be aria-hidden
     */
    CalendarA11y.prototype.hideMonthCellEvents = function () {
        return true;
    };
    /**
     * @returns true if event titles should be aria-hidden (global)
     */
    CalendarA11y.prototype.hideEventTitle = function () {
        return true;
    };
    /**
     * @returns true if hour segments in the week view should be aria-hidden
     */
    CalendarA11y.prototype.hideWeekHourSegment = function () {
        return true;
    };
    /**
     * @returns true if hour segments in the day view should be aria-hidden
     */
    CalendarA11y.prototype.hideDayHourSegment = function () {
        return true;
    };
    CalendarA11y.ctorParameters = function () { return [
        { type: I18nPluralPipe }
    ]; };
    CalendarA11y.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CalendarA11y_Factory() { return new CalendarA11y(i0.ɵɵinject(i1.I18nPluralPipe)); }, token: CalendarA11y, providedIn: "root" });
    CalendarA11y = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], CalendarA11y);
    return CalendarA11y;
}());
export { CalendarA11y };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWExMXkucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFJSDtJQUNFLHNCQUFzQixVQUEwQjtRQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtJQUFHLENBQUM7SUFFcEQ7OztPQUdHO0lBQ0ksZ0NBQVMsR0FBaEIsVUFBaUIsRUFBMkI7WUFBekIsWUFBRyxFQUFFLGtCQUFNO1FBQzVCLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxlQUNILFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsbUJBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFVBQVU7YUFDbEIsQ0FBQyx3Q0FFSCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sS0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFHLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNENBQXFCLEdBQTVCLFVBQTZCLEVBQTRCO1lBQTFCLGNBQUksRUFBRSxrQkFBTTtRQUN6QyxPQUFPLDRDQUM0QixVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsV0FDMUUsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSx5Q0FBa0IsR0FBekIsVUFBMEIsRUFBNEI7WUFBMUIsY0FBSSxFQUFFLGtCQUFNO1FBQ3RDLE9BQVUsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQVcsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksdUNBQWdCLEdBQXZCLFVBQXdCLEVBQTZCO1lBQTNCLGdCQUFLLEVBQUUsa0JBQU07UUFDckMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQU0sSUFBSSxHQUFHLGFBQ1QsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxpQkFDL0MsS0FBSyxDQUFDLEtBQUssZUFBVSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQ2xFLENBQUM7UUFDRixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLElBQUksSUFBRyxTQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUcsQ0FBQSxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDZDQUFzQixHQUE3QixVQUE4QixFQUE2QjtZQUEzQixnQkFBSyxFQUFFLGtCQUFNO1FBQzNDLElBQU0sSUFBSSxHQUFHLGFBQ1QsS0FBSyxDQUFDLEtBQUssdURBQ0EsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLFdBQ2hFLENBQUM7UUFDRixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLENBQ0wsSUFBSSxJQUFHLGlCQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBRyxDQUFBLENBQ3hFLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxHQUFHLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSx3Q0FBaUIsR0FBeEIsVUFBeUIsRUFBc0I7WUFBcEIsa0JBQU07UUFDL0IsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFpQixHQUF4QjtRQUNFLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMENBQW1CLEdBQTFCO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMENBQW1CLEdBQTFCO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5Q0FBa0IsR0FBekI7UUFDRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O2dCQXRIaUMsY0FBYzs7O0lBRHJDLFlBQVk7UUFIeEIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLFlBQVksQ0F3SHhCO3VCQXZLRDtDQXVLQyxBQXhIRCxJQXdIQztTQXhIWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgSTE4blBsdXJhbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQTExeVBhcmFtcyB9IGZyb20gJy4vY2FsZW5kYXItYTExeS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGFkZGluZyBhY2Nlc3NpYmlsaXR5IHRvIHRoZSBjYWxlbmRhci5cbiAqIFlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIGl0cyBtZXRob2RzIHZpYSBhbmd1bGFycyBESSB0byBzdWl0IHlvdXIgcmVxdWlyZW1lbnRzLlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQTExeVBhcmFtcywgQ2FsZW5kYXJBMTF5IH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XG4gKiBpbXBvcnQgeyBmb3JtYXREYXRlLCBJMThuUGx1cmFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4gKiBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogLy8gYWRkaW5nIHlvdXIgb3duIGExMXkgcGFyYW1zXG4gKiBleHBvcnQgaW50ZXJmYWNlIEN1c3RvbUExMXlQYXJhbXMgZXh0ZW5kcyBBMTF5UGFyYW1zIHtcbiAqICAgaXNEclN1ZXNzPzogYm9vbGVhbjtcbiAqIH1cbiAqXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBleHBvcnQgY2xhc3MgQ3VzdG9tQ2FsZW5kYXJBMTF5IGV4dGVuZHMgQ2FsZW5kYXJBMTF5IHtcbiAqICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGkxOG5QbHVyYWw6IEkxOG5QbHVyYWxQaXBlKSB7XG4gKiAgICAgc3VwZXIoaTE4blBsdXJhbCk7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIG92ZXJyaWRpbmcgYSBmdW5jdGlvblxuICogICBwdWJsaWMgb3BlbkRheUV2ZW50c0xhbmRtYXJrKHsgZGF0ZSwgbG9jYWxlLCBpc0RyU3Vlc3MgfTogQ3VzdG9tQTExeVBhcmFtcyk6IHN0cmluZyB7XG4gKiAgICAgaWYgKGlzRHJTdWVzcykge1xuICogICAgICAgcmV0dXJuIGBcbiAqICAgICAgICAgJHtmb3JtYXREYXRlKGRhdGUsICdFRUVFIE1NTU0gZCcsIGxvY2FsZSl9XG4gKiAgICAgICAgICBUb2RheSB5b3UgYXJlIHlvdSEgVGhhdCBpcyB0cnVlciB0aGFuIHRydWUhIFRoZXJlIGlzIG5vIG9uZSBhbGl2ZVxuICogICAgICAgICAgd2hvIGlzIHlvdS1lciB0aGFuIHlvdSFcbiAqICAgICAgIGA7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XG4gKlxuICogLy8gaW4geW91ciBjb21wb25lbnQgdGhhdCB1c2VzIHRoZSBjYWxlbmRhclxuICogcHJvdmlkZXJzOiBbe1xuICogIHByb3ZpZGU6IENhbGVuZGFyQTExeSxcbiAqICB1c2VDbGFzczogQ3VzdG9tQ2FsZW5kYXJBMTF5XG4gKiB9XVxuICogYGBgXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQTExeSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpMThuUGx1cmFsOiBJMThuUGx1cmFsUGlwZSkge31cblxuICAvKipcbiAgICogQXJpYSBsYWJlbCBmb3IgdGhlIGJhZGdlcy9kYXRlIG9mIGEgY2VsbFxuICAgKiBAZXhhbXBsZTogYFNhdHVyZGF5IE9jdG9iZXIgMTkgMSBldmVudCBjbGljayB0byBleHBhbmRgXG4gICAqL1xuICBwdWJsaWMgbW9udGhDZWxsKHsgZGF5LCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgaWYgKGRheS5iYWRnZVRvdGFsID4gMCkge1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtmb3JtYXREYXRlKGRheS5kYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfSxcbiAgICAgICAgJHt0aGlzLmkxOG5QbHVyYWwudHJhbnNmb3JtKGRheS5iYWRnZVRvdGFsLCB7XG4gICAgICAgICAgJz0wJzogJ05vIGV2ZW50cycsXG4gICAgICAgICAgJz0xJzogJ09uZSBldmVudCcsXG4gICAgICAgICAgb3RoZXI6ICcjIGV2ZW50cydcbiAgICAgICAgfSl9LFxuICAgICAgICAgY2xpY2sgdG8gZXhwYW5kXG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zm9ybWF0RGF0ZShkYXkuZGF0ZSwgJ0VFRUUgTU1NTSBkJywgbG9jYWxlKX1gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcmlhIGxhYmVsIGZvciB0aGUgb3BlbiBkYXkgZXZlbnRzIHN0YXJ0IGxhbmRtYXJrXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSBleHBhbmRlZCB2aWV3YFxuICAgKi9cbiAgcHVibGljIG9wZW5EYXlFdmVudHNMYW5kbWFyayh7IGRhdGUsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgQmVnaW5uaW5nIG9mIGV4cGFuZGVkIHZpZXcgZm9yICR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX1cbiAgICBgO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyaWEgbGFiZWwgZm9yIGFsZXJ0IHRoYXQgYSBkYXkgaW4gdGhlIG1vbnRoIHZpZXcgd2FzIGV4cGFuZGVkXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSBleHBhbmRlZGBcbiAgICovXG4gIHB1YmxpYyBvcGVuRGF5RXZlbnRzQWxlcnQoeyBkYXRlLCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2Zvcm1hdERhdGUoZGF0ZSwgJ0VFRUUgTU1NTSBkZCcsIGxvY2FsZSl9IGV4cGFuZGVkYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjcmlwdGl2ZSBhcmlhIGxhYmVsIGZvciBhbiBldmVudFxuICAgKiBAZXhhbXBsZTogYFNhdHVyZGF5IE9jdG9iZXIgMTl0aCwgU2NvdHQncyBQaXp6YSBQYXJ0eSwgZnJvbSAxMTowMGFtIHRvIDU6MDBwbWBcbiAgICovXG4gIHB1YmxpYyBldmVudERlc2NyaXB0aW9uKHsgZXZlbnQsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICBpZiAoZXZlbnQuYWxsRGF5ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGxEYXlFdmVudERlc2NyaXB0aW9uKHsgZXZlbnQsIGxvY2FsZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhcmlhID0gYFxuICAgICAgJHtmb3JtYXREYXRlKGV2ZW50LnN0YXJ0LCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX0sXG4gICAgICAke2V2ZW50LnRpdGxlfSwgZnJvbSAke2Zvcm1hdERhdGUoZXZlbnQuc3RhcnQsICdoaDptbSBhJywgbG9jYWxlKX1cbiAgICBgO1xuICAgIGlmIChldmVudC5lbmQpIHtcbiAgICAgIHJldHVybiBhcmlhICsgYCB0byAke2Zvcm1hdERhdGUoZXZlbnQuZW5kLCAnaGg6bW0gYScsIGxvY2FsZSl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGFyaWE7XG4gIH1cblxuICAvKipcbiAgICogRGVzY3JpcHRpdmUgYXJpYSBsYWJlbCBmb3IgYW4gYWxsIGRheSBldmVudFxuICAgKiBAZXhhbXBsZTpcbiAgICogYFNjb3R0J3MgUGFydHksIGV2ZW50IHNwYW5zIG11bHRpcGxlIGRheXM6IHN0YXJ0IHRpbWUgT2N0b2JlciAxOSA1OjAwcG0sIG5vIHN0b3AgdGltZWBcbiAgICovXG4gIHB1YmxpYyBhbGxEYXlFdmVudERlc2NyaXB0aW9uKHsgZXZlbnQsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICBjb25zdCBhcmlhID0gYFxuICAgICAgJHtldmVudC50aXRsZX0sIGV2ZW50IHNwYW5zIG11bHRpcGxlIGRheXM6XG4gICAgICBzdGFydCB0aW1lICR7Zm9ybWF0RGF0ZShldmVudC5zdGFydCwgJ01NTU0gZGQgaGg6bW0gYScsIGxvY2FsZSl9XG4gICAgYDtcbiAgICBpZiAoZXZlbnQuZW5kKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBhcmlhICsgYCwgc3RvcCB0aW1lICR7Zm9ybWF0RGF0ZShldmVudC5lbmQsICdNTU1NIGQgaGg6bW0gYScsIGxvY2FsZSl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyaWEgKyBgLCBubyBzdG9wIHRpbWVgO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBjYWxlbmRhciBldmVudCBhY3Rpb25zIGljb25zXG4gICAqIEByZXR1cm5zICdFZGl0JyBmb3IgZmEtcGVuY2lsIGljb25zLCBhbmQgJ0RlbGV0ZScgZm9yIGZhLXRpbWVzIGljb25zXG4gICAqL1xuICBwdWJsaWMgYWN0aW9uQnV0dG9uTGFiZWwoeyBhY3Rpb24gfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFjdGlvbi5hMTF5TGFiZWw7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge251bWJlcn0gVGFiIGluZGV4IHRvIGJlIGdpdmVuIHRvIG1vbnRoIGNlbGxzXG4gICAqL1xuICBwdWJsaWMgbW9udGhDZWxsVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBldmVudHMgaW5zaWRlIHRoZSBtb250aCBjZWxsIHNob3VsZCBiZSBhcmlhLWhpZGRlblxuICAgKi9cbiAgcHVibGljIGhpZGVNb250aENlbGxFdmVudHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBldmVudCB0aXRsZXMgc2hvdWxkIGJlIGFyaWEtaGlkZGVuIChnbG9iYWwpXG4gICAqL1xuICBwdWJsaWMgaGlkZUV2ZW50VGl0bGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBob3VyIHNlZ21lbnRzIGluIHRoZSB3ZWVrIHZpZXcgc2hvdWxkIGJlIGFyaWEtaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgaGlkZVdlZWtIb3VyU2VnbWVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGhvdXIgc2VnbWVudHMgaW4gdGhlIGRheSB2aWV3IHNob3VsZCBiZSBhcmlhLWhpZGRlblxuICAgKi9cbiAgcHVibGljIGhpZGVEYXlIb3VyU2VnbWVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19