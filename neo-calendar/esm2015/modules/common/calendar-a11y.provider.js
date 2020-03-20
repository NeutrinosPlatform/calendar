import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { formatDate, I18nPluralPipe } from '@angular/common';
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
CalendarA11y = tslib_1.__decorate([
    Injectable()
], CalendarA11y);
export { CalendarA11y };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25lby1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWExMXkucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUc3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUFzQixVQUEwQjtRQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtJQUFHLENBQUM7SUFFcEQ7OztPQUdHO0lBQ0ksU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBYztRQUMxQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU87VUFDSCxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDO1VBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFVBQVU7YUFDbEIsQ0FBQzs7T0FFSCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQkFBcUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQWM7UUFDdkQsT0FBTzt1Q0FDNEIsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDO0tBQzFFLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0JBQWtCLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFjO1FBQ3BELE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWM7UUFDbkQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsTUFBTSxJQUFJLEdBQUc7UUFDVCxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDO1FBQy9DLEtBQUssQ0FBQyxLQUFLLFVBQVUsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztLQUNsRSxDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxJQUFJLEdBQUcsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNqRTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQkFBc0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWM7UUFDekQsTUFBTSxJQUFJLEdBQUc7UUFDVCxLQUFLLENBQUMsS0FBSzttQkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUM7S0FDaEUsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sQ0FDTCxJQUFJLEdBQUcsZUFBZSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUN4RSxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQWM7UUFDN0MsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNJLGlCQUFpQjtRQUN0QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQkFBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTs7WUF2SG1DLGNBQWM7O0FBRHJDLFlBQVk7SUFEeEIsVUFBVSxFQUFFO0dBQ0EsWUFBWSxDQXdIeEI7U0F4SFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdERhdGUsIEkxOG5QbHVyYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEExMXlQYXJhbXMgfSBmcm9tICcuL2NhbGVuZGFyLWExMXkuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYWNjZXNzaWJpbGl0eSB0byB0aGUgY2FsZW5kYXIuXG4gKiBZb3UgbWF5IG92ZXJyaWRlIGFueSBvZiBpdHMgbWV0aG9kcyB2aWEgYW5ndWxhcnMgREkgdG8gc3VpdCB5b3VyIHJlcXVpcmVtZW50cy5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IEExMXlQYXJhbXMsIENhbGVuZGFyQTExeSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICogaW1wb3J0IHsgZm9ybWF0RGF0ZSwgSTE4blBsdXJhbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIC8vIGFkZGluZyB5b3VyIG93biBhMTF5IHBhcmFtc1xuICogZXhwb3J0IGludGVyZmFjZSBDdXN0b21BMTF5UGFyYW1zIGV4dGVuZHMgQTExeVBhcmFtcyB7XG4gKiAgIGlzRHJTdWVzcz86IGJvb2xlYW47XG4gKiB9XG4gKlxuICogQEluamVjdGFibGUoKVxuICogZXhwb3J0IGNsYXNzIEN1c3RvbUNhbGVuZGFyQTExeSBleHRlbmRzIENhbGVuZGFyQTExeSB7XG4gKiAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpMThuUGx1cmFsOiBJMThuUGx1cmFsUGlwZSkge1xuICogICAgIHN1cGVyKGkxOG5QbHVyYWwpO1xuICogICB9XG4gKlxuICogICAvLyBvdmVycmlkaW5nIGEgZnVuY3Rpb25cbiAqICAgcHVibGljIG9wZW5EYXlFdmVudHNMYW5kbWFyayh7IGRhdGUsIGxvY2FsZSwgaXNEclN1ZXNzIH06IEN1c3RvbUExMXlQYXJhbXMpOiBzdHJpbmcge1xuICogICAgIGlmIChpc0RyU3Vlc3MpIHtcbiAqICAgICAgIHJldHVybiBgXG4gKiAgICAgICAgICR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfVxuICogICAgICAgICAgVG9kYXkgeW91IGFyZSB5b3UhIFRoYXQgaXMgdHJ1ZXIgdGhhbiB0cnVlISBUaGVyZSBpcyBubyBvbmUgYWxpdmVcbiAqICAgICAgICAgIHdobyBpcyB5b3UtZXIgdGhhbiB5b3UhXG4gKiAgICAgICBgO1xuICogICAgIH1cbiAqICAgfVxuICogfVxuICpcbiAqIC8vIGluIHlvdXIgY29tcG9uZW50IHRoYXQgdXNlcyB0aGUgY2FsZW5kYXJcbiAqIHByb3ZpZGVyczogW3tcbiAqICBwcm92aWRlOiBDYWxlbmRhckExMXksXG4gKiAgdXNlQ2xhc3M6IEN1c3RvbUNhbGVuZGFyQTExeVxuICogfV1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBMTF5IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGkxOG5QbHVyYWw6IEkxOG5QbHVyYWxQaXBlKSB7fVxuXG4gIC8qKlxuICAgKiBBcmlhIGxhYmVsIGZvciB0aGUgYmFkZ2VzL2RhdGUgb2YgYSBjZWxsXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSAxIGV2ZW50IGNsaWNrIHRvIGV4cGFuZGBcbiAgICovXG4gIHB1YmxpYyBtb250aENlbGwoeyBkYXksIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICBpZiAoZGF5LmJhZGdlVG90YWwgPiAwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICAke2Zvcm1hdERhdGUoZGF5LmRhdGUsICdFRUVFIE1NTU0gZCcsIGxvY2FsZSl9LFxuICAgICAgICAke3RoaXMuaTE4blBsdXJhbC50cmFuc2Zvcm0oZGF5LmJhZGdlVG90YWwsIHtcbiAgICAgICAgICAnPTAnOiAnTm8gZXZlbnRzJyxcbiAgICAgICAgICAnPTEnOiAnT25lIGV2ZW50JyxcbiAgICAgICAgICBvdGhlcjogJyMgZXZlbnRzJ1xuICAgICAgICB9KX0sXG4gICAgICAgICBjbGljayB0byBleHBhbmRcbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtmb3JtYXREYXRlKGRheS5kYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBvcGVuIGRheSBldmVudHMgc3RhcnQgbGFuZG1hcmtcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5IGV4cGFuZGVkIHZpZXdgXG4gICAqL1xuICBwdWJsaWMgb3BlbkRheUV2ZW50c0xhbmRtYXJrKHsgZGF0ZSwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICBCZWdpbm5pbmcgb2YgZXhwYW5kZWQgdmlldyBmb3IgJHtmb3JtYXREYXRlKGRhdGUsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfVxuICAgIGA7XG4gIH1cblxuICAvKipcbiAgICogQXJpYSBsYWJlbCBmb3IgYWxlcnQgdGhhdCBhIGRheSBpbiB0aGUgbW9udGggdmlldyB3YXMgZXhwYW5kZWRcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5IGV4cGFuZGVkYFxuICAgKi9cbiAgcHVibGljIG9wZW5EYXlFdmVudHNBbGVydCh7IGRhdGUsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX0gZXhwYW5kZWRgO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaXB0aXZlIGFyaWEgbGFiZWwgZm9yIGFuIGV2ZW50XG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOXRoLCBTY290dCdzIFBpenphIFBhcnR5LCBmcm9tIDExOjAwYW0gdG8gNTowMHBtYFxuICAgKi9cbiAgcHVibGljIGV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIGlmIChldmVudC5hbGxEYXkgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGFyaWEgPSBgXG4gICAgICAke2Zvcm1hdERhdGUoZXZlbnQuc3RhcnQsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfSxcbiAgICAgICR7ZXZlbnQudGl0bGV9LCBmcm9tICR7Zm9ybWF0RGF0ZShldmVudC5zdGFydCwgJ2hoOm1tIGEnLCBsb2NhbGUpfVxuICAgIGA7XG4gICAgaWYgKGV2ZW50LmVuZCkge1xuICAgICAgcmV0dXJuIGFyaWEgKyBgIHRvICR7Zm9ybWF0RGF0ZShldmVudC5lbmQsICdoaDptbSBhJywgbG9jYWxlKX1gO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjcmlwdGl2ZSBhcmlhIGxhYmVsIGZvciBhbiBhbGwgZGF5IGV2ZW50XG4gICAqIEBleGFtcGxlOlxuICAgKiBgU2NvdHQncyBQYXJ0eSwgZXZlbnQgc3BhbnMgbXVsdGlwbGUgZGF5czogc3RhcnQgdGltZSBPY3RvYmVyIDE5IDU6MDBwbSwgbm8gc3RvcCB0aW1lYFxuICAgKi9cbiAgcHVibGljIGFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGFyaWEgPSBgXG4gICAgICAke2V2ZW50LnRpdGxlfSwgZXZlbnQgc3BhbnMgbXVsdGlwbGUgZGF5czpcbiAgICAgIHN0YXJ0IHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LnN0YXJ0LCAnTU1NTSBkZCBoaDptbSBhJywgbG9jYWxlKX1cbiAgICBgO1xuICAgIGlmIChldmVudC5lbmQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFyaWEgKyBgLCBzdG9wIHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LmVuZCwgJ01NTU0gZCBoaDptbSBhJywgbG9jYWxlKX1gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYSArIGAsIG5vIHN0b3AgdGltZWA7XG4gIH1cblxuICAvKipcbiAgICogQXJpYSBsYWJlbCBmb3IgdGhlIGNhbGVuZGFyIGV2ZW50IGFjdGlvbnMgaWNvbnNcbiAgICogQHJldHVybnMgJ0VkaXQnIGZvciBmYS1wZW5jaWwgaWNvbnMsIGFuZCAnRGVsZXRlJyBmb3IgZmEtdGltZXMgaWNvbnNcbiAgICovXG4gIHB1YmxpYyBhY3Rpb25CdXR0b25MYWJlbCh7IGFjdGlvbiB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYWN0aW9uLmExMXlMYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUYWIgaW5kZXggdG8gYmUgZ2l2ZW4gdG8gbW9udGggY2VsbHNcbiAgICovXG4gIHB1YmxpYyBtb250aENlbGxUYWJJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50cyBpbnNpZGUgdGhlIG1vbnRoIGNlbGwgc2hvdWxkIGJlIGFyaWEtaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgaGlkZU1vbnRoQ2VsbEV2ZW50cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGV2ZW50IHRpdGxlcyBzaG91bGQgYmUgYXJpYS1oaWRkZW4gKGdsb2JhbClcbiAgICovXG4gIHB1YmxpYyBoaWRlRXZlbnRUaXRsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGhvdXIgc2VnbWVudHMgaW4gdGhlIHdlZWsgdmlldyBzaG91bGQgYmUgYXJpYS1oaWRkZW5cbiAgICovXG4gIHB1YmxpYyBoaWRlV2Vla0hvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgaG91ciBzZWdtZW50cyBpbiB0aGUgZGF5IHZpZXcgc2hvdWxkIGJlIGFyaWEtaGlkZGVuXG4gICAqL1xuICBwdWJsaWMgaGlkZURheUhvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=