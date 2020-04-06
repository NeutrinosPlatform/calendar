import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * @Injectable()
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
var CalendarEventTitleFormatter = /** @class */ (function () {
    function CalendarEventTitleFormatter() {
    }
    /**
     * The month view event title.
     */
    CalendarEventTitleFormatter.prototype.month = function (event, title) {
        return event.title;
    };
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.monthTooltip = function (event, title) {
        return event.title;
    };
    /**
     * The week view event title.
     */
    CalendarEventTitleFormatter.prototype.week = function (event, title) {
        return event.title;
    };
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.weekTooltip = function (event, title) {
        return event.title;
    };
    /**
     * The day view event title.
     */
    CalendarEventTitleFormatter.prototype.day = function (event, title) {
        return event.title;
    };
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.dayTooltip = function (event, title) {
        return event.title;
    };
    CalendarEventTitleFormatter.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CalendarEventTitleFormatter_Factory() { return new CalendarEventTitleFormatter(); }, token: CalendarEventTitleFormatter, providedIn: "root" });
    CalendarEventTitleFormatter = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], CalendarEventTitleFormatter);
    return CalendarEventTitleFormatter;
}());
export { CalendarEventTitleFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUlIO0lBQUE7S0EwQ0M7SUF6Q0M7O09BRUc7SUFDSCwyQ0FBSyxHQUFMLFVBQU0sS0FBb0IsRUFBRSxLQUFhO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrREFBWSxHQUFaLFVBQWEsS0FBb0IsRUFBRSxLQUFhO1FBQzlDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQ0FBSSxHQUFKLFVBQUssS0FBb0IsRUFBRSxLQUFhO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpREFBVyxHQUFYLFVBQVksS0FBb0IsRUFBRSxLQUFhO1FBQzdDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCx5Q0FBRyxHQUFILFVBQUksS0FBb0IsRUFBRSxLQUFhO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnREFBVSxHQUFWLFVBQVcsS0FBb0IsRUFBRSxLQUFhO1FBQzVDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDOztJQXpDVSwyQkFBMkI7UUFIdkMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLDJCQUEyQixDQTBDdkM7c0NBdEVEO0NBc0VDLEFBMUNELElBMENDO1NBMUNZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgYWxsIGV2ZW50IHRpdGxlcyB3aXRoaW4gdGhlIGNhbGVuZGFyLiBZb3UgbWF5IG92ZXJyaWRlIGFueSBvZiBpdHMgbWV0aG9kcyB2aWEgYW5ndWxhcnMgREkgdG8gc3VpdCB5b3VyIHJlcXVpcmVtZW50cy4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLCBDYWxlbmRhckV2ZW50IH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgQ3VzdG9tRXZlbnRUaXRsZUZvcm1hdHRlciBleHRlbmRzIENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB7XG4gKlxuICogICBtb250aChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIGBDdXN0b20gcHJlZml4OiAke2V2ZW50LnRpdGxlfWA7XG4gKiAgIH1cbiAqXG4gKiB9XG4gKlxuICogLy8gaW4geW91ciBjb21wb25lbnRcbiAqIHByb3ZpZGVyczogW3tcbiAqICBwcm92aWRlOiBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXG4gKiAgdXNlQ2xhc3M6IEN1c3RvbUV2ZW50VGl0bGVGb3JtYXR0ZXJcbiAqIH1dXG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGV2ZW50IHRpdGxlLlxuICAgKi9cbiAgbW9udGgoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBtb250aFRvb2x0aXAoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGV2ZW50IHRpdGxlLlxuICAgKi9cbiAgd2VlayhldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgZXZlbnQgdG9vbHRpcC4gUmV0dXJuIGEgZmFsc2V5IHZhbHVlIGZyb20gdGhpcyB0byBkaXNhYmxlIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgd2Vla1Rvb2x0aXAoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgZXZlbnQgdGl0bGUuXG4gICAqL1xuICBkYXkoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgZXZlbnQgdG9vbHRpcC4gUmV0dXJuIGEgZmFsc2V5IHZhbHVlIGZyb20gdGhpcyB0byBkaXNhYmxlIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgZGF5VG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG59XG4iXX0=