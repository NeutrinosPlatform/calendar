import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
let KeydownEnterDirective = class KeydownEnterDirective {
    constructor() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    onKeyPress(event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
        }
    }
};
tslib_1.__decorate([
    Output('mwlKeydownEnter')
], KeydownEnterDirective.prototype, "keydown", void 0);
tslib_1.__decorate([
    HostListener('keydown', ['$event'])
], KeydownEnterDirective.prototype, "onKeyPress", null);
KeydownEnterDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlKeydownEnter]'
    })
], KeydownEnterDirective);
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9rZXlkb3duLWVudGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs5RSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUhsQztRQUk2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUMsQ0FBQyxzQkFBc0I7SUFVaEcsQ0FBQztJQVBDLFVBQVUsQ0FBQyxLQUFvQjtRQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQ3ZFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVY0QjtJQUExQixNQUFNLENBQUMsaUJBQWlCLENBQUM7c0RBQTZDO0FBR3ZFO0lBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3VEQU9uQztBQVZVLHFCQUFxQjtJQUhqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO0tBQzlCLENBQUM7R0FDVyxxQkFBcUIsQ0FXakM7U0FYWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bEtleWRvd25FbnRlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEtleWRvd25FbnRlckRpcmVjdGl2ZSB7XG4gIEBPdXRwdXQoJ213bEtleWRvd25FbnRlcicpIGtleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC53aGljaCA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmtleWRvd24uZW1pdChldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=