let showTodayBtnInstance = null;
module.exports = class showTodayBtn {

    constructor() {
        if (!showTodayBtnInstance) {
            showTodayBtnInstance = this;
            //set all other default values

            this.displayAs = 'showTodayBtn';
            this.value = '[showTodayBtn]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showTodayBtnInstance;
    }
}