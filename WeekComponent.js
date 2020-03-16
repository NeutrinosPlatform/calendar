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
    this.template = `
    <mwl-calendar-week-view
    *ngIf="view=='week'"
    [viewDate]="viewDate"
    [events]="events"
    [excludeDays]="excludeDays"
    [daysInWeek] = "5"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  ></mwl-calendar-week-view>
        `;
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
};