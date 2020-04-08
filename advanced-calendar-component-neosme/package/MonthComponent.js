'use strict';
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;
let Attribute = require("@jatahworx/bhive-toolkits").Attribute;

module.exports = class MonthComponent extends AdvancedComponent {
  constructor() {
    const name = 'month-component';
    const designerTemplate = `<month-component slot="month-component" block-copy class="display-block">
        <span class="component-placeholder title-align">Month</span>
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
    super.addAttribute(
      new Attribute({
        key: 'Month',
        value: 'Month',
        type: 'a',
        useAsLabel: true,
        isVisibleForParent: true
      })
    );
    super.addAttribute(new Attribute({
      key: 'viewDate',
      value: 'viewDate',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'events',
      value: 'events',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'activeDayIsOpen',
      value: 'activeDayIsOpen',
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
    super.addAttribute(new Attribute({
      key: 'align',
      value: '',
      type: 'kv',
    }));
    super.addAttribute(new Attribute({
      key: 'customCaptureEventDialog',
      value: '',
      type: 'kv',
    })); super.addAttribute(new Attribute({
      key: 'customEventDialog',
      value: '',
      type: 'kv',
    })); super.addAttribute(new Attribute({
      key: 'onAddEventSaveClick',
      value: '',
      type: 'kv',
    })); super.addAttribute(new Attribute({
      key: 'onEditEventClick',
      value: '',
      type: 'kv',
    })); super.addAttribute(new Attribute({
      key: 'onDeleteEventClick',
      value: '',
      type: 'kv',
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

    let classValue = componentAttribute.class['_value'];
    let viewDate = componentAttribute.viewDate['_value'];
    let events = componentAttribute.events['_value'];
    let refresh = componentAttribute.refresh['_value'];
    let activeDayIsOpen = componentAttribute.activeDayIsOpen['_value'];
    let activeDay = componentAttribute.activeDay['_value'];
    let locale = componentAttribute.locale['_value'];
    let excludeDays = componentAttribute.excludeDays['_value'];
    let weekendDays = componentAttribute.weekendDays['_value'];
    let weekStartsOn = componentAttribute.weekStartsOn['_value'];
    let dayClicked = componentAttribute.dayClicked['_value'];
    let eventClicked = componentAttribute.eventClicked['_value'];
    let eventTimesChanged = componentAttribute.eventTimesChanged['_value'];
    let tooltipPlacement = componentAttribute.tooltipPlacement['_value'];
    let cellTemplate = componentAttribute.cellTemplate['_value'];
    let tooltipAppendToBody = componentAttribute.tooltipAppendToBody['_value'];
    let tooltipTemplate = componentAttribute.tooltipTemplate['_value'];
    let tooltipDelay = componentAttribute.tooltipDelay['_value'];
    let customCaptureEventDialog = componentAttribute.customCaptureEventDialog['_value'];
    let customEventDialog = componentAttribute.customEventDialog['_value'];
    let onAddEventSaveClick = componentAttribute.onAddEventSaveClick['_value'];
    let onEditEventClick = componentAttribute.onEditEventClick['_value'];
    let onDeleteEventClick = componentAttribute.onDeleteEventClick['_value'];
    let columnHeaderClicked = componentAttribute.columnHeaderclicked['_value'];
    let beforeViewRender = componentAttribute.beforeViewRender['_value'];

    let template = '';
    template = ` <div>%style% <mwl-calendar-month-view
    *ngIf="view=='month'"
    [(viewDate)]= "${viewDate}"
    [events]="${events}"
    [refresh]="${refresh}"
    [activeDayIsOpen]="${activeDayIsOpen}"
    [activeDay] = "${activeDay}"
    [locale]="${locale}"
    [tooltipDelay] = "${tooltipDelay}"
    [tooltipAppendToBody] = "${tooltipAppendToBody}"
    [tooltipPlacement] = "${tooltipPlacement}"
    [weekendDays] = "${weekendDays}"
    [excludeDays] = "${excludeDays}"
    [weekStartsOn] = "${weekStartsOn}"
    [cellTemplate]="${cellTemplate}"
    [customCaptureEventDialog] = "${customCaptureEventDialog}"
    [customEventDialog] = "${customEventDialog}"
    [tooltipTemplate] = "${tooltipTemplate}"
    `;
    if(classValue!==null){
      classValue = classValue.toString();
      classValue = classValue.replace(",", " ");
      template = template + `class = "${classValue}"`
    }
    if (dayClicked !== "")
      template = template + `(dayClicked)="${dayClicked}"`;

    if (eventClicked !== "")
      template = template + `(eventClicked)="${eventClicked}"`;

    if (eventTimesChanged !== "")
      template = template + `(eventTimesChanged)="${eventTimesChanged}"`;

    if (onAddEventSaveClick !== "")
      template = template + `(onAddEventSaveClick)="${onAddEventSaveClick}"`;

    if (onEditEventClick !== "")
      template = template + `(onEditEventClick)="${onEditEventClick}"`;

    if (onDeleteEventClick !== "")
      template = template + `(onDeleteEventClick)="${onDeleteEventClick}"`;

    if (columnHeaderClicked !== "") {
      template = template + `(columnHeaderClicked) = "${columnHeaderClicked}"`
    }
    if(beforeViewRender!==""){
      template = template + `(beforeViewRender) = "${beforeViewRender}"`
    }
 

    template = template + `> </mwl-calendar-month-view> </div>`;

    return template;
  }
  set template(templateString) { }
};