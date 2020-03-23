let showPreviousDayBtnInstance = null;
module.exports = class showPreviousDayBtn {

    constructor() {
        if (!showPreviousDayBtnInstance) {
            showPreviousDayBtnInstance = this;
            //set all other default values

            this.displayAs = 'showPreviousDayBtn';
            this.value = '[showPreviousDayBtn]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showPreviousDayBtnInstance;
    }
}