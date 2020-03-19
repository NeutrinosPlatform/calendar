'use strict';
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;
let Attribute = require("@jatahworx/bhive-toolkits").Attribute;

module.exports = class DayComponent extends AdvancedComponent {
  constructor() {
    const name = 'day-component';
    const designerTemplate = `<day-component slot="day-component" block-copy class="display-block">
        <span class="component-placeholder title-align">Day</span>
      </day-component>`;
    const paletteTemplate = 'Day';
    const componentLabel = 'Day';

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
        key: 'Day',
        value: 'Day',
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
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'currentTimeMarkerTemplate',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayEndHour',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayEndMinute',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayStartHour',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'dayStartMinute',
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
      key: 'eventSnapSize',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventTemplate',
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
      key: 'hourSegmentHeight',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegments',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegmentTemplate',
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
      key: 'snapDraggedEvents',
      value: 'true',
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
      key: 'beforeViewRender',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'eventClicked',
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'hourSegmentClicked',
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
    let eventTimesChanged = componentAttribute.eventTimesChanged['_value'];
    let eventClicked = componentAttribute.eventClicked['_value'];
    let beforeViewRender = componentAttribute.beforeViewRender['_value'];
    let hourSegmentClicked = componentAttribute.hourSegmentClicked['_value'];
    let eventActionsTemplate = componentAttribute.eventActionsTemplate['_value'];
    let eventTemplate = componentAttribute.eventTemplate['_value'];
    let hourSegmentTemplate = componentAttribute.hourSegmentTemplate['_value'];
    let locale = componentAttribute.locale['_value'];
    let snapDraggedEvents = componentAttribute.snapDraggedEvents['_value'];
    let eventTitleTemplate = componentAttribute.eventTitleTemplate['_value'];

    let template = '';
    template = `<div %style% %class%> <mwl-calendar-day-view
    *ngIf="view=='day'"
    [(viewDate)]= "${viewDate}"
    [events]="${events}"
    [refresh]="${refresh}"
    [dayEndHour] = "${dayEndHour}"
    [dayEndMinute] = "${dayEndMinute}"
    [dayStartHour] = "${dayStartHour}"
    [dayStartMinute] = "${dayStartMinute}"
    [hourSegmentHeight] = "${hourSegmentHeight}"
    [hourSegments] = "${hourSegments}"
    [eventSnapSize] = "${eventSnapSize}"
    [tooltipDelay] = "${tooltipDelay}"
    [tooltipAppendToBody] = "${tooltipAppendToBody}"
    [tooltipPlacement] = "${tooltipPlacement}"
    [eventActionsTemplate] = "${eventActionsTemplate}"
    [eventTemplate] = "${eventTemplate}"
    [eventTitleTemplate] = "${eventTitleTemplate}"
    [hourSegmentTemplate] = "${hourSegmentTemplate}"
    [locale] = "${locale}"
    [snapDraggedEvents] = "${snapDraggedEvents}"
    `;

    if (eventClicked !== "")
      template = template + `(eventClicked)="${eventClicked}"`;

    if (eventTimesChanged !== "")
      template = template + `(eventTimesChanged)="${eventTimesChanged}"`;

    if (beforeViewRender !== "")
      template = template + `(beforeViewRender)="${beforeViewRender}"`;

    if (hourSegmentClicked !== "")
      template = template + `(hourSegmentClicked)="${hourSegmentClicked}"`;

    template = template + `> </mwl-calendar-day-view> </div>`;

    return template;
  }
  set template(templateString) { }
};