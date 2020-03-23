let showNextDayBtnInstance = null;
module.exports = class showNextDay {

    constructor() {
        if (!showNextDayBtnInstance) {
            showNextDayBtnInstance = this;
            //set all other default values

            this.displayAs = 'showNextDay';
            this.value = '[showNextDay]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showNextDayBtnInstance;
    }
}