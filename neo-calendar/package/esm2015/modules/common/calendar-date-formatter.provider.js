import * as tslib_1 from "tslib";
import { CalendarAngularDateFormatter } from './calendar-angular-date-formatter.provider';
import { Injectable } from '@angular/core';
/**
 * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
 *
 * If you wish, you may override any of the defaults via angulars DI. For example:
 *
 * ```typescript
 * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
 * import { formatDate } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * @Injectable()
 * class CustomDateFormatter extends CalendarDateFormatter {
 *
 *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
 *     return formatDate(date, 'EEE', locale); // use short week days
 *   }
 *
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *   provide: CalendarDateFormatter,
 *   useClass: CustomDateFormatter
 * }]
 * ```
 */
let CalendarDateFormatter = class CalendarDateFormatter extends CalendarAngularDateFormatter {
};
CalendarDateFormatter = tslib_1.__decorate([
    Injectable()
], CalendarDateFormatter);
export { CalendarDateFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsNEJBQTRCO0NBQUcsQ0FBQTtBQUE3RCxxQkFBcUI7SUFEakMsVUFBVSxFQUFFO0dBQ0EscUJBQXFCLENBQXdDO1NBQTdELHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGVuZGFyQW5ndWxhckRhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWFuZ3VsYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBmb3JtYXR0aW5nIG9mIGRhdGVzLiBUaGVyZSBhcmUgMyBpbXBsZW1lbnRhdGlvbnMgYXZhaWxhYmxlLCB0aGUgYENhbGVuZGFyQW5ndWxhckRhdGVGb3JtYXR0ZXJgIChkZWZhdWx0KSB3aGljaCB1c2VzIHRoZSBhbmd1bGFyIGRhdGUgcGlwZSB0byBmb3JtYXQgZGF0ZXMsIHRoZSBgQ2FsZW5kYXJOYXRpdmVEYXRlRm9ybWF0dGVyYCB3aGljaCB3aWxsIHVzZSB0aGUgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5JbnRsPC9hPiBBUEkgdG8gZm9ybWF0IGRhdGVzLCBvciB0aGVyZSBpcyB0aGUgYENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlcmAgd2hpY2ggdXNlcyA8YSBocmVmPVwiaHR0cDovL21vbWVudGpzLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5tb21lbnQ8L2E+LlxuICpcbiAqIElmIHlvdSB3aXNoLCB5b3UgbWF5IG92ZXJyaWRlIGFueSBvZiB0aGUgZGVmYXVsdHMgdmlhIGFuZ3VsYXJzIERJLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsIERhdGVGb3JtYXR0ZXJQYXJhbXMgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqIGltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIEN1c3RvbURhdGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIge1xuICpcbiAqICAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7ZGF0ZSwgbG9jYWxlfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ0VFRScsIGxvY2FsZSk7IC8vIHVzZSBzaG9ydCB3ZWVrIGRheXNcbiAqICAgfVxuICpcbiAqIH1cbiAqXG4gKiAvLyBpbiB5b3VyIGNvbXBvbmVudCB0aGF0IHVzZXMgdGhlIGNhbGVuZGFyXG4gKiBwcm92aWRlcnM6IFt7XG4gKiAgIHByb3ZpZGU6IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAqICAgdXNlQ2xhc3M6IEN1c3RvbURhdGVGb3JtYXR0ZXJcbiAqIH1dXG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF0ZUZvcm1hdHRlciBleHRlbmRzIENhbGVuZGFyQW5ndWxhckRhdGVGb3JtYXR0ZXIge31cbiJdfQ==