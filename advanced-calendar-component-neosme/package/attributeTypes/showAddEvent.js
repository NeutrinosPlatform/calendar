let showAddEventInstance = null;
module.exports = class showAddEvent {

    constructor() {
        if (!showAddEventInstance) {
            showAddEventInstance = this;
            //set all other default values

            this.displayAs = 'showAddEvent';
            this.value = '[showAddEvent]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showAddEventInstance;
    }
}