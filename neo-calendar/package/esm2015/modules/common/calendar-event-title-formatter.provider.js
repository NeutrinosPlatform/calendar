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
let CalendarEventTitleFormatter = class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     */
    month(event, title) {
        return event.title;
    }
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    monthTooltip(event, title) {
        return event.title;
    }
    /**
     * The week view event title.
     */
    week(event, title) {
        return event.title;
    }
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    weekTooltip(event, title) {
        return event.title;
    }
    /**
     * The day view event title.
     */
    day(event, title) {
        return event.title;
    }
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    dayTooltip(event, title) {
        return event.title;
    }
};
CalendarEventTitleFormatter.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CalendarEventTitleFormatter_Factory() { return new CalendarEventTitleFormatter(); }, token: CalendarEventTitleFormatter, providedIn: "root" });
CalendarEventTitleFormatter = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CalendarEventTitleFormatter);
export { CalendarEventTitleFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUlILElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBQ3RDOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUN2QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWSxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUM5QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUN0QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUNyQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUM1QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGLENBQUE7O0FBMUNZLDJCQUEyQjtJQUh2QyxVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csMkJBQTJCLENBMEN2QztTQTFDWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIGFsbCBldmVudCB0aXRsZXMgd2l0aGluIHRoZSBjYWxlbmRhci4gWW91IG1heSBvdmVycmlkZSBhbnkgb2YgaXRzIG1ldGhvZHMgdmlhIGFuZ3VsYXJzIERJIHRvIHN1aXQgeW91ciByZXF1aXJlbWVudHMuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciwgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIEN1c3RvbUV2ZW50VGl0bGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIge1xuICpcbiAqICAgbW9udGgoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBgQ3VzdG9tIHByZWZpeDogJHtldmVudC50aXRsZX1gO1xuICogICB9XG4gKlxuICogfVxuICpcbiAqIC8vIGluIHlvdXIgY29tcG9uZW50XG4gKiBwcm92aWRlcnM6IFt7XG4gKiAgcHJvdmlkZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICogIHVzZUNsYXNzOiBDdXN0b21FdmVudFRpdGxlRm9ybWF0dGVyXG4gKiB9XVxuICogYGBgXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBldmVudCB0aXRsZS5cbiAgICovXG4gIG1vbnRoKGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgZXZlbnQgdG9vbHRpcC4gUmV0dXJuIGEgZmFsc2V5IHZhbHVlIGZyb20gdGhpcyB0byBkaXNhYmxlIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgbW9udGhUb29sdGlwKGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBldmVudCB0aXRsZS5cbiAgICovXG4gIHdlZWsoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGV2ZW50IHRvb2x0aXAuIFJldHVybiBhIGZhbHNleSB2YWx1ZSBmcm9tIHRoaXMgdG8gZGlzYWJsZSB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHdlZWtUb29sdGlwKGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRheSB2aWV3IGV2ZW50IHRpdGxlLlxuICAgKi9cbiAgZGF5KGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRheSB2aWV3IGV2ZW50IHRvb2x0aXAuIFJldHVybiBhIGZhbHNleSB2YWx1ZSBmcm9tIHRoaXMgdG8gZGlzYWJsZSB0aGUgdG9vbHRpcC5cbiAgICovXG4gIGRheVRvb2x0aXAoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxufVxuIl19