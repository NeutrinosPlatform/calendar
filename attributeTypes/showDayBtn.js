let showDayBtnInstance = null;
module.exports = class showDayBtn {

    constructor() {
        if (!showDayBtnInstance) {
            showDayBtnInstance = this;
            //set all other default values

            this.displayAs = 'showDayBtn';
            this.value = '[showDayBtn]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showDayBtnInstance;
    }
}