let activeDayIsOpenInstance = null;
module.exports = class activeDayIsOpen {

    constructor() {
        if (!activeDayIsOpenInstance) {
            activeDayIsOpenInstance = this;
            //set all other default values

            this.displayAs = 'activeDayIsOpen';
            this.value = '[activeDayIsOpen]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return activeDayIsOpenInstance;
    }
}