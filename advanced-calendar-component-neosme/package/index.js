
let AdvancedCalendar = require('./AdvancedCalendar');
let CalendarHeader = require('advanced-calendar-component-neosme/CalendarHeader');
let CalendarDay = require('advanced-calendar-component-neosme/DayComponent');
let CalendarWeek = require('advanced-calendar-component-neosme/WeekComponent');
let CalendarMonth = require('advanced-calendar-component-neosme/MonthComponent');

//Importing attribute Types
let showPreviousDayBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showPreviousDayBtn');
let showTodayBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showTodayBtn');
let showNextDayBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showNextDayBtn');
let showMonthBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showMonthBtn');
let showWeekBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showWeekBtn');
let showDayBtnConfig = require('../advanced-calendar-component-neosme/attributeTypes/showDayBtn');
let showAddEventConfig = require('advanced-calendar-component-neosme/attributeTypes/showAddEvent');
let snapDraggedEventsConfig = require('advanced-calendar-component-neosme/attributeTypes/snapDraggedEvents');
let tooltipAppendToBodyConfig = require('advanced-calendar-component-neosme/attributeTypes/tooltipAppendToBody');
let activeDayIsOpenConfig = require('advanced-calendar-component-neosme/attributeTypes/activeDayIsOpen');
let showCaptureEventDialogConfig =  require('advanced-calendar-component-neosme/attributeTypes/showCaptureEventDialog');
let showEventDetailsDialogConfig = require('advanced-calendar-component-neosme/attributeTypes/showEventDetailsDialog');

module.exports = {
    components: {
        AdvancedCalendar,
        CalendarHeader,
        CalendarDay,
        CalendarWeek,
        CalendarMonth,
    },
    attributeTypes: {
        'showPreviousDayBtn': new showPreviousDayBtnConfig(),
        'showTodayBtn' : new showTodayBtnConfig,
        'showNextDayBtn' : new showNextDayBtnConfig(),
        'showMonthBtn' : new showMonthBtnConfig(),
        'showWeekBtn' : new showWeekBtnConfig(),
        'showDayBtn' : new showDayBtnConfig(),
        'showAddEvent' :  new showAddEventConfig(),
        'snapDraggedEvents' : new snapDraggedEventsConfig(),
        'tooltipAppendToBody' : new tooltipAppendToBodyConfig(),
        'showCaptureEventDialog' : new showCaptureEventDialogConfig(),
        'showEventDetailsDialog': new showEventDetailsDialogConfig(),
        'activeDayIsOpen' : new activeDayIsOpenConfig(),
    }
};