'use strict';
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;
let Attribute = require("@jatahworx/bhive-toolkits").Attribute;

module.exports = class DayComponent extends AdvancedComponent {
  constructor() {
    const name = 'week-component';
    const designerTemplate = `<week-component slot="week-component" block-copy class="display-block">
        <span class="component-placeholder title-align">Week</span>
      </week-component>`;
    const paletteTemplate = 'Week';
    const componentLabel = 'Week';

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
        key: 'Week',
        value: 'Week',
        type: 'a',
        useAsLabel: true,
        isVisibleForParent: true
      })
    );
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
      key: 'allDayEventsLabelTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'currentTimeMarkerTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayEndHour',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayEndMinute',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'daysInWeek',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayStartHour',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayStartMinute',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventActionsTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventSnapSize',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventTitleTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'excludeDays',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'headerTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegmentHeight',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegments',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegmentTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'locale',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'precision',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }))
    super.addAttribute(new Attribute({
      key: 'snapDraggedEvents',
      value: 'true',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipAppendToBody',
      value: 'true',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipDelay',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipPlacement',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'tooltipTemplate',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'weekendDays',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'weekStartsOn',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'beforeViewRender',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayHeaderClicked',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventClicked',
      value: '',
      type: 'kv',
      complexity:"advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegmentClicked',
      value: '',
      type: 'kv',
      complexity:"advanced"
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
    let dayEndHour = componentAttribute.dayEndHour['_value'];
    let dayEndMinute = componentAttribute.dayEndMinute['_value'];
    let dayStartHour = componentAttribute.dayStartHour['_value'];
    let dayStartMinute = componentAttribute.dayStartMinute['_value'];
    let eventSnapSize = componentAttribute.eventSnapSize['_value'];
    let hourSegmentHeight = componentAttribute.hourSegmentHeight['_value'];
    let hourSegments = componentAttribute.hourSegments['_value'];
    let tooltipAppendToBody = componentAttribute.tooltipAppendToBody['_value'];
    let tooltipDelay = componentAttribute.tooltipDelay['_value'];
    let tooltipPlacement = componentAttribute.tooltipPlacement['_value'];
    let excludeDays = componentAttribute.excludeDays['_value'];
    let eventTimesChanged = componentAttribute.eventTimesChanged['_value'];
    let eventClicked = componentAttribute.eventClicked['_value'];
    let beforeViewRender = componentAttribute.beforeViewRender['_value'];
    let hourSegmentClicked = componentAttribute.hourSegmentClicked['_value'];
    let dayHeaderClicked = componentAttribute.dayHeaderClicked['_value'];
    let allDayEventsLabelTemplate = componentAttribute.allDayEventsLabelTemplate['_value'];
    let currentTimeMarkerTemplate = componentAttribute.currentTimeMarkerTemplate['_value'];
    let daysInWeek = componentAttribute.daysInWeek['_value'];
    let eventActionsTemplate = componentAttribute.eventActionsTemplate['_value'];
    let eventTemplate = componentAttribute.eventTemplate['_value'];
    let eventTitleTemplate = componentAttribute.eventTitleTemplate['_value'];
    let headerTemplate = componentAttribute.headerTemplate['_value'];
    let hourSegmentTemplate = componentAttribute.hourSegmentTemplate['_value'];
    let locale = componentAttribute.locale['_value'];
    let precision = componentAttribute.precision['_value'];
    let snapDraggedEvents = componentAttribute.snapDraggedEvents['_value'];
    let tooltipTemplate = componentAttribute.tooltipTemplate['_value'];
    let weekendDays = componentAttribute.weekendDays['_value'];
    let weekStartsOn = componentAttribute.weekStartsOn['_value'];

    let template = '';
    template = `<div> %style% <mwl-calendar-week-view
    *ngIf="view=='week'"
    [viewDate]= "${viewDate}"
    [events]="${events}"
    [refresh]="${refresh}"
    [allDayEventsLabelTemplate]="${allDayEventsLabelTemplate}"
    [currentTimeMarkerTemplate]="${currentTimeMarkerTemplate}"
    [dayEndHour] = "${dayEndHour}"
    [dayEndMinute] = "${dayEndMinute}"
    [daysInWeek]="${daysInWeek}"
    [dayStartHour] = "${dayStartHour}"
    [dayStartMinute] = "${dayStartMinute}"
    [eventActionsTemplate] = "${eventActionsTemplate}"
    [eventSnapSize] = "${eventSnapSize}"
    [eventTemplate]="${eventTemplate}"
    [eventTitleTemplate]="${eventTitleTemplate}"
    [excludeDays] = "${excludeDays}"
    [headerTemplate]="${headerTemplate}"
    [hourSegmentHeight] = "${hourSegmentHeight}"
    [hourSegments] = "${hourSegments}"
    [hourSegmentTemplate]="${hourSegmentTemplate}"
    [locale]="${locale}"
    [precision]="${precision}"
    [snapDraggedEvents]="${snapDraggedEvents}"
    [tooltipAppendToBody] = "${tooltipAppendToBody}"
    [tooltipDelay] = "${tooltipDelay}"
    [tooltipPlacement] = "${tooltipPlacement}"
    [tooltipTemplate]="${tooltipTemplate}"
    [weekendDays]="${weekendDays}"
    [weekStartsOn]="${weekStartsOn}"
    `;
    if(classValue!==null){
      classValue = classValue.toString();
      classValue = classValue.replace(",", " ");
      template = template + `class = "${classValue}"`
    }
    if (eventClicked !== "")
      template = template + `(eventClicked)="${eventClicked}"`;

    if (eventTimesChanged !== "")
      template = template + `(eventTimesChanged)="${eventTimesChanged}"`;

    if (beforeViewRender !== "")
      template = template + `(beforeViewRender)="${beforeViewRender}"`;

    if (hourSegmentClicked !== "")
      template = template + `(hourSegmentClicked)="${hourSegmentClicked}"`;

    if (dayHeaderClicked !== "")
      template = template + `(hourSegmentClicked)="${dayHeaderClicked}"`;
    

    template = template + `> </mwl-calendar-week-view> </div>`;

    return template;
  }
  set template(templateString) { }
};