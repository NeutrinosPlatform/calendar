let showWeekBtnInstance = null;
module.exports = class showDayBtn {

    constructor() {
        if (!showWeekBtnInstance) {
            showWeekBtnInstance = this;
            //set all other default values

            this.displayAs = 'showWeekBtn';
            this.value = '[showWeekBtn]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showWeekBtnInstance;
    }
}