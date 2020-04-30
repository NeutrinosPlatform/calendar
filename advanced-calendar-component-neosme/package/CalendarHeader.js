'use strict';
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;
let Attribute = require("@jatahworx/bhive-toolkits").Attribute;

module.exports = class CalendarHeader extends AdvancedComponent {
  constructor() {
    const name = 'calendar-header';
    const designerTemplate = `
    <calendar-header slot="add-component" component-label="Header" class="display-block" block-copy>
      <div class="three-label">
          <div class="first-container-view">
            <div class="">
                <div class="container-view">
                  <span class="modal-text title-align" id="previous-pick-content">Previous</span>
                  <span class="modal-text title-align" id="today-pick-content">Today</span>
                  <span class="modal-text title-align" id="next-pick-content">Next</span>
                </div>
            </div>
            <div class="Add-event-container">
                <span class="Add-event-view">Add Event</span>
            </div>
          </div>
          <div class="january-container">
            <span class="january">January 20</span>
          </div>
          <div class="third-container-view">
            <div class="month-event-container">
                <span class="day-event-view">Month</span>
            </div>
            <div class="month-event-container">
                <span class="day-event-view">Week</span>
            </div>
            <div class="month-event-container">
                <span class="day-event-view">Day</span>
            </div>
          </div>
      </div>
    </calendar-header>`;
    const paletteTemplate = '';
    const componentLabel = '';

    const templateUrl = 'https://mattlewis92.github.io/angular-calendar/';

    super({
      name,
      template: ``,
      designerTemplate,
      componentLabel,
      paletteTemplate,
      isAdvancedChild: true,
      templateUrl
    });
    super.setType(AdvancedComponent.COMPONENT_TYPE_TITLES.LAYOUT.val);

    super.addAttribute(new Attribute({
      key: 'view',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'viewDate',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'viewChange',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'viewDateChange',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showPreviousDayBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showTodayBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showNextDayBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showMonthBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showWeekBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showDayBtn',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'daysInAWeek',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'excludeDaysInAWeek',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showAddEvent',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'onAddEventClick',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showCaptureEventDialog',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'showEventDetailsDialog',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'customCaptureEventDialog',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'customEventDialog',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'onEditEventClick',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'onDeleteEventClick',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'setView',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'onAddEventSaveClick',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));

    super.composeTemplate({
      styles: `:host {
              padding: 1.3em;
              position: relative;
              border: 1px solid lightgrey;
              margin: 6px 25px !important;
              border-radius: 5px !important;
              }`
    });
  }

  get template() {
    let componentAttribute = this.getHtmlAttributes(this.htmlAttributes);
    let view = componentAttribute.view['_value'];
    let viewDate = componentAttribute.viewDate['_value'];
    let viewChange = componentAttribute.viewChange['_value'];
    let viewDateChange = componentAttribute.viewDateChange['_value'];
    let showPreviousDayBtn = componentAttribute.showPreviousDayBtn['_value'];
    let showTodayBtn = componentAttribute.showTodayBtn['_value'];
    let showNextDayBtn = componentAttribute.showNextDayBtn['_value'];
    let showMonthBtn = componentAttribute.showMonthBtn['_value'];
    let showWeekBtn = componentAttribute.showWeekBtn['_value'];
    let showDayBtn = componentAttribute.showDayBtn['_value'];
    let daysInAWeek = componentAttribute.daysInAWeek['_value'] !== '' ? componentAttribute.daysInAWeek['_value'].toString() : '';
    let excludeDays = componentAttribute.excludeDaysInAWeek['_value'];
    let showAddEvent = componentAttribute.showAddEvent['_value'];
    let onAddEventClick = componentAttribute.onAddEventClick['_value'];
    let showCaptureEventDialog = componentAttribute.showCaptureEventDialog['_value'];
    let showEventDetailsDialog = componentAttribute.showEventDetailsDialog['_value'];
    let customCaptureEventDialog = componentAttribute.customCaptureEventDialog['_value'];
    let customEventDialog = componentAttribute.customEventDialog['_value'];
    let onEditEventClick = componentAttribute.onEditEventClick['_value'];
    let onDeleteEventClick = componentAttribute.onDeleteEventClick['_value'];

    let setView = componentAttribute.setView['_value'];
    let onAddEventSaveClick = componentAttribute.onAddEventSaveClick['_value'];

    let template = `<div %style% %bCustomProps% %class%> <mwl-calendar-header 
    [showPreviousDayBtn] = "${showPreviousDayBtn}"
    [showTodayBtn] = "${showTodayBtn}"
    [showNextDayBtn] =  "${showNextDayBtn}"
    [showMonthBtn] = "${showMonthBtn}"
    [showWeekBtn] = "${showWeekBtn}"
    [showDayBtn] = "${showDayBtn}"
    [showCaptureEventDialog] = "${showCaptureEventDialog}"
    [showEventDetailsDialog] = "${showEventDetailsDialog}"
    [showAddEvent] = "${showAddEvent}"
    `;

    if (viewDate !== "")
      template = template + `[view]= "${view}"`;

    if (viewDate !== "")
      template = template + `[(viewDate)]= "${viewDate}"`;

    if(daysInAWeek !== '' && daysInAWeek !== null){
      template = template + `[daysInWeek]="${daysInAWeek}"`
    }

    if(excludeDays !== '' && excludeDays !== null){
      template = template + `[excludeDays]="${excludeDays}"`
    }

    if(customCaptureEventDialog!== "") {
      template = template + `[customCaptureEventDialog] = "${customCaptureEventDialog}"`;
    }

    if(customEventDialog!== ""){
      template = template + `[customEventDialog] = "${customEventDialog}"`;
    }

    if (viewChange !== "") {
      template = template + `(viewChange) = "${viewChange}"`
    }

    if (viewDateChange !== "") {
      template = template + `(viewDateChange) = "${viewDateChange}"`
    }

    if (onAddEventClick !== "") {
      template = template + `(onAddEventClick) = "${onAddEventClick}"`
    }

    if (onEditEventClick !== "") {
      template = template + `(onEditEventClick)="${onEditEventClick}"`;
    }

    if(onDeleteEventClick !==""){
      template = template + `(onDeleteEventClick) = "${onDeleteEventClick}"`
    }

    if (setView !== "") {
      template = template + `(setView) = "${setView}"  `
    }

    if(onAddEventSaveClick !== ""){
      template = template + `(onAddEventSaveClick) = "${onAddEventSaveClick}"`
    }

    template = template + `></mwl-calendar-header> </div>`;
    return template;
  }
  set template(templateString) {}
};