let snapDraggedEventsInstance = null;
module.exports = class snapDraggedEvents {

    constructor() {
        if (!snapDraggedEventsInstance) {
            snapDraggedEventsInstance = this;
            //set all other default values

            this.displayAs = 'snapDraggedEvents';
            this.value = '[snapDraggedEvents]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return snapDraggedEventsInstance;
    }
}