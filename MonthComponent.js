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

    const templateUrl = 'articles/#!components-guide-for-release-6/card';

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
      value: 'true',
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
      value: '',
      type: 'kv',
      complexity: "advanced"
    }));
    super.addAttribute(new Attribute({
      key: 'align',
      value: '',
      type: 'kv',
    }));

  //   this.template = `
  //   <div *ngIf = "view === 'month'">
  //   <mwl-calendar-month-view
  //   [viewDate]="viewDate"
  //   [excludeDays] = [0,1]
  //   [events]="events"
  //   [refresh]="refresh"
  //   [activeDayIsOpen]="activeDayIsOpen"
  //   (dayClicked)="dayClicked($event.day)"
  //   (eventClicked)="handleEvent('Clicked', $event.event)"
  //   (eventTimesChanged)="eventTimesChanged($event)"
  // >
  // </mwl-calendar-month-view>
  // </div>
  //   `;
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
    let activeDayIsOpen = componentAttribute.activeDayIsOpen['_value'];
    let dayClicked = componentAttribute.dayClicked['_value'];
    let eventClicked = componentAttribute.eventClicked['_value'];
    let eventTimesChanged = componentAttribute.eventTimesChanged['_value'];
    let tooltipPlacement = componentAttribute.tooltipPlacement['_value'];
    let tooltipAppendToBody = componentAttribute.tooltipAppendToBody['_value'] === 'true' ? true : false;
    let tooltipTemplate = componentAttribute.tooltipTemplate['_value'];
    let tooltipDelay = componentAttribute.tooltipDelay['_value'];
    let beforeViewRender = componentAttribute.beforeViewRender['_value'];

    let template = '';
    template = `<mwl-calendar-month-view
    *ngIf="view=='month'"
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [activeDayIsOpen]="activeDayIsOpen"
    [activeDay] = "activeDay"
    [locale]="fr"
    [tooltipAppendToBody] = "false"
    [tooltipPlacement] = "left-bottom"
    weekendDays = [3,4]
    [cellTemplate]="customCellTemplate"
    (dayClicked)="dayClicked($event.day)"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  >
  </mwl-calendar-month-view>
    `;
    return template;
  }
  set template(templateString) { }
};