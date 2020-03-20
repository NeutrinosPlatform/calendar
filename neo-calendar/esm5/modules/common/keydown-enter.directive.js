import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
var KeydownEnterDirective = /** @class */ (function () {
    function KeydownEnterDirective() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    KeydownEnterDirective.prototype.onKeyPress = function (event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
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
    return KeydownEnterDirective;
}());
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9rZXlkb3duLWVudGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs5RTtJQUhBO1FBSTZCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQyxDQUFDLHNCQUFzQjtJQVVoRyxDQUFDO0lBUEMsMENBQVUsR0FBVixVQUFXLEtBQW9CO1FBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDdkUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFUMEI7UUFBMUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDOzBEQUE2QztJQUd2RTtRQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzsyREFPbkM7SUFWVSxxQkFBcUI7UUFIakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUFDO09BQ1cscUJBQXFCLENBV2pDO0lBQUQsNEJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bEtleWRvd25FbnRlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEtleWRvd25FbnRlckRpcmVjdGl2ZSB7XG4gIEBPdXRwdXQoJ213bEtleWRvd25FbnRlcicpIGtleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC53aGljaCA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmtleWRvd24uZW1pdChldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=