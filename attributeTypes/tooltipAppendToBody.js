let tooltipAppendToBodyInstance = null;
module.exports = class tooltipAppendToBodytooltipAppendToBodytooltipAppendToBody {

    constructor() {
        if (!tooltipAppendToBodyInstance) {
            tooltipAppendToBodyInstance = this;
            //set all other default values

            this.displayAs = 'tooltipAppendToBody';
            this.value = '[tooltipAppendToBody]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return tooltipAppendToBodyInstance;
    }
}