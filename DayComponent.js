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
        key: 'beforeViewRender',
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
    <ng-template #customCellTemplate let-day="day" let-locale="locale">
  <div class="cal-cell-top">
    <span class="cal-day-badge" *ngIf="day.badgeTotal > 0"
      >{{ day.badgeTotal }}</span
    >
    <span class="cal-day-number"
      >{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span
    >
  </div>
  <small style="margin: 5px"
    >There are {{ day.events.length }} events on this day</small
  >
</ng-template>
    <mwl-calendar-day-view
    *ngIf="view=='day'"
    [viewDate]="viewDate"
    [events]="events"
    [excludeDays]="excludeDays"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
>
</mwl-calendar-day-view>
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