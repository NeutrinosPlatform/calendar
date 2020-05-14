'use strict';
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;
let Attribute = require("@jatahworx/bhive-toolkits").Attribute;

module.exports = class MonthComponent extends AdvancedComponent {
  constructor() {
    const name = 'month-component';
    const designerTemplate = `<month-component slot="add-component" class="display-block" component-label="Month" block-copy>
    </month-component>`;
    const paletteTemplate = 'Month';
    const componentLabel = 'Month';

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
      key: 'viewDate',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'events',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'activeDayIsOpen',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'refresh',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'eventTimesChanged',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'activeDay',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'cellTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventActionsTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventTitleTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'excludeDays',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'headerTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'locale',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'openDayEventsTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipAppendToBody',
      value: 'true',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipDelay',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipPlacement',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'weekendDays',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'weekStartsOn',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'beforeViewRender',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'columnHeaderclicked',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayClicked',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventClicked',
      value: "",
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
    let viewDate = componentAttribute.viewDate['_value'];
    let events = componentAttribute.events['_value'];
    let activeDayIsOpen = componentAttribute.activeDayIsOpen['_value'];
    let refresh = componentAttribute.refresh['_value'];
    let eventTimesChanged = componentAttribute.eventTimesChanged['_value'];
    let activeDay = componentAttribute.activeDay['_value'];
    let cellTemplate = componentAttribute.cellTemplate['_value'];
    let eventActionsTemplate = componentAttribute.eventActionsTemplate['_value'];
    let eventTitleTemplate = componentAttribute.eventTitleTemplate['_value'];
    let excludeDays = componentAttribute.excludeDays['_value'];
    let headerTemplate = componentAttribute.headerTemplate['_value'];
    let locale = componentAttribute.locale['_value'];
    let openDayEventsTemplate = componentAttribute.openDayEventsTemplate['_value'];
    let tooltipAppendToBody = componentAttribute.tooltipAppendToBody['_value'];
    let tooltipDelay = componentAttribute.tooltipDelay['_value'];
    let tooltipPlacement = componentAttribute.tooltipPlacement['_value'];
    let tooltipTemplate = componentAttribute.tooltipTemplate['_value'];
    let weekendDays = componentAttribute.weekendDays['_value'];
    let weekStartsOn = componentAttribute.weekStartsOn['_value'];
    let beforeViewRender = componentAttribute.beforeViewRender['_value'];
    let columnHeaderClicked = componentAttribute.columnHeaderclicked['_value'];
    let dayClicked = componentAttribute.dayClicked['_value'];
    let eventClicked = componentAttribute.eventClicked['_value'];

    let template = '';
    template = `<div %style% %class% %bCustomProps%> <mwl-calendar-month-view
    *ngIf="view=='month'"
    `;

    if (viewDate !== "")
      template = template + `[(viewDate)]= "${viewDate}"`;

    if (activeDayIsOpen !== "")
      template = template + `[activeDayIsOpen]= "${activeDayIsOpen}"`;

    if (tooltipAppendToBody !== "")
      template = template + `[tooltipAppendToBody]= "${tooltipAppendToBody}"`;

    if (events !== "")
      template = template + `[events]="${events}"`;

    if (refresh !== "")
      template = template + `[refresh]="${refresh}"`;

    if (activeDay !== "")
      template = template + `[activeDay] = "${activeDay}"`;

    if (locale !== "")
      template = template + `[locale]="${locale}"`;

    if (tooltipDelay !== "")
      template = template + `[tooltipDelay]="${tooltipDelay}"`;

    if (tooltipPlacement !== "")
      template = template + `[tooltipPlacement] = "${tooltipPlacement}"`;

    if (weekendDays !== "")
      template = template + `[weekendDays] = "${weekendDays}"`;

    if (excludeDays !== "")
      template = template + `[excludeDays] = "${excludeDays}"`;

    if (weekStartsOn !== "")
      template = template + `[weekStartsOn] = "${weekStartsOn}"`;

    if (cellTemplate !== "")
      template = template + `[cellTemplate]="${cellTemplate}"`;

    if (tooltipTemplate !== "")
      template = template + `[tooltipTemplate] = "${tooltipTemplate}"`;

    if (eventActionsTemplate !== "")
      template = template + `[eventActionsTemplate] = "${eventActionsTemplate}"`;

    if (eventTitleTemplate !== "")
      template = template + `[eventTitleTemplate] = "${eventTitleTemplate}"`;

    if (headerTemplate !== "")
      template = template + `[headerTemplate] = "${headerTemplate}"`;

    if (openDayEventsTemplate !== "")
      template = template + `[openDayEventsTemplate] = "${openDayEventsTemplate}"`;

    if (dayClicked !== "")
      template = template + `(dayClicked)="${dayClicked}"`;

    if (eventClicked !== "")
      template = template + `(eventClicked)="${eventClicked}"`;

    if (eventTimesChanged !== "")
      template = template + `(eventTimesChanged)="${eventTimesChanged}"`;

    if (columnHeaderClicked !== "") {
      template = template + `(columnHeaderClicked) = "${columnHeaderClicked}"`
    }

    if (beforeViewRender !== "") {
      template = template + `(beforeViewRender) = "${beforeViewRender}"`
    }

    template = template + `> </mwl-calendar-month-view> </div>`;

    return template;
  }
  set template(templateString) {}
};