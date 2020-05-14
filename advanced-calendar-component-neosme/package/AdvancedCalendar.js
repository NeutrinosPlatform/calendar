// import attribute and advanced component
"use strict";
let AdvancedComponent = require("@jatahworx/bhive-toolkits").AdvancedComponent;

module.exports = class AdvancedCalendar extends AdvancedComponent {
  constructor() {
    const name = "advanced-calendar-neosme";
    const designerTemplate = `
    <advanced-calendar-neosme id="advanced-calendar-neosme" onclick="click(event)" component-label="Calendar" class="ad-element flex-shrink-0 flex-grow-1 drop">
      <div slot="add"  class="ad-card-buttons" style="width:100% !important;padding:0px">
        <div class="calendar-image"> </div>  
        <div style="display:flex;padding-left:15px">
          <button id="calendar-header" class="add-child-button flex-column" no-select>Header</button>
          <button id="month-component" class="add-child-button flex-column" no-select>Month</button>
          <button id="week-component" class="add-child-button flex-column" no-select>Week</button>
          <button id="day-component" class="add-child-button flex-column" no-select>Day</button>
        </div>
      </div>   
    </advanced-calendar-neosme>`;
    const paletteTemplate = "Calendar";
    const componentLabel = 'Calendar';
    const templateUrl = "https://mattlewis92.github.io/angular-calendar/";

    super(
      {
        name,
        designerTemplate,
        paletteTemplate,
        componentLabel,
        templateUrl,
        isAdvancedChild: false
      }
    );
    super.setType(AdvancedComponent.COMPONENT_TYPE_TITLES.LAYOUT.val);

    super.composeTemplate({
      styles: `
      :host {
        display: flex;
        padding-top: 2em;
        padding-bottom: 1em;
        min-width: 20em;
        flex-direction: column;
        align-self: start;
      }
      `,
      slotsTemplate: `  
      <div class="parent_card">
        <slot id="addSlot" name="add-component"></slot>
      </div>     
      <div class="parent_card">
        <slot id="addSlot" name="add"></slot>
      </div>
      `,
      onInit: function () {
        if ($(this).find('calendar-header').length === 0) {
          this.addChild('calendar-header');
        }
      },
      onDestroy: function () { },
      customMethods: {
        click: function (e) {
          if (e.target.id === "month-component") {
            this.addChild("month-component");
          }
          if (e.target.id === "week-component") {
            this.addChild("week-component");
          }
          if (e.target.id === "day-component") {
            this.addChild("day-component");
          }
          if (e.target.id === "calendar-header") {
            this.addChild("calendar-header");
          }
        }
      }
    });
  }

  get template() {
      let template = `<div %bCustomProps% %style% %class%></div>`;
      return template;
  }
  set template(templateString) { }
};

