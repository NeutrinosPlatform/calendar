let showMonthBtnInstance = null;
module.exports = class showDayBtn {

    constructor() {
        if (!showMonthBtnInstance) {
            showMonthBtnInstance = this;
            //set all other default values

            this.displayAs = 'showMonthBtn';
            this.value = '[showMonthBtn]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showMonthBtnInstance;
    }
}