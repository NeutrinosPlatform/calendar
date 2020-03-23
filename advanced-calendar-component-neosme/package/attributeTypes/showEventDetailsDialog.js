let showEventDetailsDialogInstance = null;
module.exports = class showEventDetailsDialog {

    constructor() {
        if (!showEventDetailsDialogInstance) {
            showEventDetailsDialogInstance = this;
            //set all other default values

            this.displayAs = 'showEventDetailsDialog';
            this.value = '[showEventDetailsDialog]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showEventDetailsDialogInstance;
    }
}