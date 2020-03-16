let showCaptureEventDialogInstance = null;
module.exports = class showCaptureEventDialog {

    constructor() {
        if (!showCaptureEventDialogInstance) {
            showCaptureEventDialogInstance = this;
            //set all other default values

            this.displayAs = 'showCaptureEventDialog';
            this.value = '[showCaptureEventDialog]'
            this.type = 'TOGGLE';
            this.values = {'true-value':'true', 'false-value': 'false'}
        }
        return showCaptureEventDialogInstance;
    }
}