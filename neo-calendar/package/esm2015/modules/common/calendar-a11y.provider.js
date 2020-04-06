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
let CalendarA11y = class CalendarA11y {
    constructor(i18nPlural) {
        this.i18nPlural = i18nPlural;
    }
    /**
     * Aria label for the badges/date of a cell
     * @example: `Saturday October 19 1 event click to expand`
     */
    monthCell({ day, locale }) {
        if (day.badgeTotal > 0) {
            return `
        ${formatDate(day.date, 'EEEE MMMM d', locale)},
        ${this.i18nPlural.transform(day.badgeTotal, {
                '=0': 'No events',
                '=1': 'One event',
                other: '# events'
            })},
         click to expand
      `;
        }
        else {
            return `${formatDate(day.date, 'EEEE MMMM d', locale)}`;
        }
    }
    /**
     * Aria label for the open day events start landmark
     * @example: `Saturday October 19 expanded view`
     */
    openDayEventsLandmark({ date, locale }) {
        return `
      Beginning of expanded view for ${formatDate(date, 'EEEE MMMM dd', locale)}
    `;
    }
    /**
     * Aria label for alert that a day in the month view was expanded
     * @example: `Saturday October 19 expanded`
     */
    openDayEventsAlert({ date, locale }) {
        return `${formatDate(date, 'EEEE MMMM dd', locale)} expanded`;
    }
    /**
     * Descriptive aria label for an event
     * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
     */
    eventDescription({ event, locale }) {
        if (event.allDay === true) {
            return this.allDayEventDescription({ event, locale });
        }
        const aria = `
      ${formatDate(event.start, 'EEEE MMMM dd', locale)},
      ${event.title}, from ${formatDate(event.start, 'hh:mm a', locale)}
    `;
        if (event.end) {
            return aria + ` to ${formatDate(event.end, 'hh:mm a', locale)}`;
        }
        return aria;
    }
    /**
     * Descriptive aria label for an all day event
     * @example:
     * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
     */
    allDayEventDescription({ event, locale }) {
        const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, 'MMMM dd hh:mm a', locale)}
    `;
        if (event.end) {
            return (aria + `, stop time ${formatDate(event.end, 'MMMM d hh:mm a', locale)}`);
        }
        return aria + `, no stop time`;
    }
    /**
     * Aria label for the calendar event actions icons
     * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
     */
    actionButtonLabel({ action }) {
        return action.a11yLabel;
    }
    /**
     * @returns {number} Tab index to be given to month cells
     */
    monthCellTabIndex() {
        return 0;
    }
    /**
     * @returns true if the events inside the month cell should be aria-hidden
     */
    hideMonthCellEvents() {
        return true;
    }
    /**
     * @returns true if event titles should be aria-hidden (global)
     */
    hideEventTitle() {
        return true;
    }
    /**
     * @returns true if hour segments in the week view should be aria-hidden
     */
    hideWeekHourSegment() {
        return true;
    }
    /**
     * @returns true if hour segments in the day view should be aria-hidden
     */
    hideDayHourSegment() {
        return true;
    }
};
CalendarA11y.ctorParameters = () => [
    { type: I18nPluralPipe }
];
CalendarA11y.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CalendarA11y_Factory() { return new CalendarA11y(i0.ɵɵinject(i1.I18nPluralPipe)); }, token: CalendarA11y, providedIn: "root" });
CalendarA11y = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CalendarA11y);
export { CalendarA11y };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWExMXkucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFJSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBQ3ZCLFlBQXNCLFVBQTBCO1FBQTFCLGVBQVUsR0FBVixVQUFVLENBQWdCO0lBQUcsQ0FBQztJQUVwRDs7O09BR0c7SUFDSSxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFjO1FBQzFDLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTztVQUNILFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUM7VUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDMUMsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsVUFBVTthQUNsQixDQUFDOztPQUVILENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHFCQUFxQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBYztRQUN2RCxPQUFPO3VDQUM0QixVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUM7S0FDMUUsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQkFBa0IsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQWM7UUFDcEQsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYztRQUNuRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxNQUFNLElBQUksR0FBRztRQUNULFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUM7UUFDL0MsS0FBSyxDQUFDLEtBQUssVUFBVSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO0tBQ2xFLENBQUM7UUFDRixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLElBQUksR0FBRyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHNCQUFzQixDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYztRQUN6RCxNQUFNLElBQUksR0FBRztRQUNULEtBQUssQ0FBQyxLQUFLO21CQUNBLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztLQUNoRSxDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxDQUNMLElBQUksR0FBRyxlQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQ3hFLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxHQUFHLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBYztRQUM3QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUJBQWlCO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFrQjtRQUN2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBOztZQXZIbUMsY0FBYzs7O0FBRHJDLFlBQVk7SUFIeEIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLFlBQVksQ0F3SHhCO1NBeEhZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXREYXRlLCBJMThuUGx1cmFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBMTF5UGFyYW1zIH0gZnJvbSAnLi9jYWxlbmRhci1hMTF5LmludGVyZmFjZSc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgYWRkaW5nIGFjY2Vzc2liaWxpdHkgdG8gdGhlIGNhbGVuZGFyLlxuICogWW91IG1heSBvdmVycmlkZSBhbnkgb2YgaXRzIG1ldGhvZHMgdmlhIGFuZ3VsYXJzIERJIHRvIHN1aXQgeW91ciByZXF1aXJlbWVudHMuXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBBMTF5UGFyYW1zLCBDYWxlbmRhckExMXkgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqIGltcG9ydCB7IGZvcm1hdERhdGUsIEkxOG5QbHVyYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbiAqIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiAvLyBhZGRpbmcgeW91ciBvd24gYTExeSBwYXJhbXNcbiAqIGV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tQTExeVBhcmFtcyBleHRlbmRzIEExMXlQYXJhbXMge1xuICogICBpc0RyU3Vlc3M/OiBib29sZWFuO1xuICogfVxuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGV4cG9ydCBjbGFzcyBDdXN0b21DYWxlbmRhckExMXkgZXh0ZW5kcyBDYWxlbmRhckExMXkge1xuICogICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaTE4blBsdXJhbDogSTE4blBsdXJhbFBpcGUpIHtcbiAqICAgICBzdXBlcihpMThuUGx1cmFsKTtcbiAqICAgfVxuICpcbiAqICAgLy8gb3ZlcnJpZGluZyBhIGZ1bmN0aW9uXG4gKiAgIHB1YmxpYyBvcGVuRGF5RXZlbnRzTGFuZG1hcmsoeyBkYXRlLCBsb2NhbGUsIGlzRHJTdWVzcyB9OiBDdXN0b21BMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAqICAgICBpZiAoaXNEclN1ZXNzKSB7XG4gKiAgICAgICByZXR1cm4gYFxuICogICAgICAgICAke2Zvcm1hdERhdGUoZGF0ZSwgJ0VFRUUgTU1NTSBkJywgbG9jYWxlKX1cbiAqICAgICAgICAgIFRvZGF5IHlvdSBhcmUgeW91ISBUaGF0IGlzIHRydWVyIHRoYW4gdHJ1ZSEgVGhlcmUgaXMgbm8gb25lIGFsaXZlXG4gKiAgICAgICAgICB3aG8gaXMgeW91LWVyIHRoYW4geW91IVxuICogICAgICAgYDtcbiAqICAgICB9XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiAvLyBpbiB5b3VyIGNvbXBvbmVudCB0aGF0IHVzZXMgdGhlIGNhbGVuZGFyXG4gKiBwcm92aWRlcnM6IFt7XG4gKiAgcHJvdmlkZTogQ2FsZW5kYXJBMTF5LFxuICogIHVzZUNsYXNzOiBDdXN0b21DYWxlbmRhckExMXlcbiAqIH1dXG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBMTF5IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGkxOG5QbHVyYWw6IEkxOG5QbHVyYWxQaXBlKSB7fVxuXG4gIC8qKlxuICAgKiBBcmlhIGxhYmVsIGZvciB0aGUgYmFkZ2VzL2RhdGUgb2YgYSBjZWxsXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSAxIGV2ZW50IGNsaWNrIHRvIGV4cGFuZGBcbiAgICovXG4gIHB1YmxpYyBtb250aENlbGwoeyBkYXksIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICBpZiAoZGF5LmJhZGdlVG90YWwgPiAwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICAke2Zvcm1hdERhdGUoZGF5LmRhdGUsICdFRUVFIE1NTU0gZCcsIGxvY2FsZSl9LFxuICAgICAgICAke3RoaXMuaTE4blBsdXJhbC50cmFuc2Zvcm0oZGF5LmJhZGdlVG90YWwsIHtcbiAgICAgICAgICAnPTAnOiAnTm8gZXZlbnRzJyxcbiAgICAgICAgICAnPTEnOiAnT25lIGV2ZW50JyxcbiAgICAgICAgICBvdGhlcjogJyMgZXZlbnRzJ1xuICAgICAgICB9KX0sXG4gICAgICAgICBjbGljayB0byBleHBhbmRcbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtmb3JtYXREYXRlKGRheS5kYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBvcGVuIGRheSBldmVudHMgc3RhcnQgbGFuZG1hcmtcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5IGV4cGFuZGVkIHZpZXdgXG4gICAqL1xuICBwdWJsaWMgb3BlbkRheUV2ZW50c0xhbmRtYXJrKHsgZGF0ZSwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICBCZWdpbm5pbmcgb2YgZXhwYW5kZWQgdmlldyBmb3IgJHtmb3JtYXREYXRlKGRhdGUsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfVxuICAgIGA7XG4gIH1cblxuICAvKipcbiAgICogQXJpYSBsYWJlbCBmb3IgYWxlcnQgdGhhdCBhIGRheSBpbiB0aGUgbW9udGggdmlldyB3YXMgZXhwYW5kZWRcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5IGV4cGFuZGVkYFxuICAgKi9cbiAgcHVibGljIG9wZW5EYXlFdmVudHNBbGVydCh7IGRhdGUsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX0gZXhwYW5kZWRgO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaXB0aXZlIGFyaWEgbGFiZWwgZm9yIGFuIGV2ZW50XG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOXRoLCBTY290dCdzIFBpenphIFBhcnR5LCBmcm9tIDExOjAwYW0gdG8gNTowMHBtYFxuICAgKi9cbiAgcHVibGljIGV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIGlmIChldmVudC5hbGxEYXkgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGFyaWEgPSBgXG4gICAgICAke2Zvcm1hdERhdGUoZXZlbnQuc3RhcnQsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfSxcbiAgICAgICR7ZXZlbnQudGl0bGV9LCBmcm9tICR7Zm9ybWF0RGF0ZShldmVudC5zdGFydCwgJ2hoOm1tIGEnLCBsb2NhbGUpfVxuICAgIGA7XG4gICAgaWYgKGV2ZW50LmVuZCkge1xuICAgICAgcmV0dXJuIGFyaWEgKyBgIHRvICR7Zm9ybWF0RGF0ZShldmVudC5lbmQsICdoaDptbSBhJywgbG9jYWxlKX1gO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjcmlwdGl2ZSBhcmlhIGxhYmVsIGZvciBhbiBhbGwgZGF5IGV2ZW50XG4gICAqIEBleGFtcGxlOlxuICAgKiBgU2NvdHQncyBQYXJ0eSwgZXZlbnQgc3BhbnMgbXVsdGlwbGUgZGF5czogc3RhcnQgdGltZSBPY3RvYmVyIDE5IDU6MDBwbSwgbm8gc3RvcCB0aW1lYFxuICAgKi9cbiAgcHVibGljIGFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGFyaWEgPSBgXG4gICAgICAke2V2ZW50LnRpdGxlfSwgZXZlbnQgc3BhbnMgbXVsdGlwbGUgZGF5czpcbiAgICAgIHN0YXJ0IHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LnN0YXJ0LCAnTU1NTSBkZCBoaDptbSBhJywgbG9jYWxlKX1cbiAgICBgO1xuICAgIGlmIChldmVudC5lbmQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFyaWEgKyBgLCBzdG9wIHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LmVuZCwgJ01NTU0gZCBoaDptbSBhJywgbG9jYWxlKX1gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYSArIGAsIG5vIHN0b3AgdGltZWA7XG4gIH1cblxuICAvKipcbiAgICogQXJpYSBsYWJlbCBmb3IgdGhlIGNhbGVuZGFyIGV2ZW50IGFjdGlvbnMgaWNvbnNcbiAgICogQHJldHVybnMgJ0VkaXQnIGZvciBmYS1wZW5jaWwgaWNvbnMsIGFuZCAnRGVsZXRlJyBmb3IgZmEtdGltZXMgaWNvbnNcbiAgICovXG4gIHB1YmxpYyBhY3Rpb25CdXR0b25MYWJlbCh7IGFjdGlvbiB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYWN0aW9uLmExMXlMYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUYWIgaW5kZXggdG8gYmUgZ2l2ZW4gdG8gbW9udGggY2VsbHNcbiAgICovXG4gIHB1YmxpYyBtb250aENlbGxUYWJJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50cyBpbnNpZGUgdGhlIG1vbnRoIGNlbGwgc2hvdWxkIGJlIGFyaWEtaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgaGlkZU1vbnRoQ2VsbEV2ZW50cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGV2ZW50IHRpdGxlcyBzaG91bGQgYmUgYXJpYS1oaWRkZW4gKGdsb2JhbClcbiAgICovXG4gIHB1YmxpYyBoaWRlRXZlbnRUaXRsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGhvdXIgc2VnbWVudHMgaW4gdGhlIHdlZWsgdmlldyBzaG91bGQgYmUgYXJpYS1oaWRkZW5cbiAgICovXG4gIHB1YmxpYyBoaWRlV2Vla0hvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgaG91ciBzZWdtZW50cyBpbiB0aGUgZGF5IHZpZXcgc2hvdWxkIGJlIGFyaWEtaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgaGlkZURheUhvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=