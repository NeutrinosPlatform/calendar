import * as tslib_1 from "tslib";
import { Directive, Renderer2, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Inject, Input, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ClickDirective = class ClickDirective {
    constructor(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.clickListenerDisabled = false;
        this.click = new EventEmitter(); // tslint:disable-line
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (!this.clickListenerDisabled) {
            this.listen()
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.stopPropagation();
                this.click.emit(event);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    listen() {
        return new Observable(observer => {
            return this.renderer.listen(this.elm.nativeElement, 'click', event => {
                observer.next(event);
            });
        });
    }
};
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
tslib_1.__decorate([
    Input()
], ClickDirective.prototype, "clickListenerDisabled", void 0);
tslib_1.__decorate([
    Output('mwlClick')
], ClickDirective.prototype, "click", void 0);
ClickDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlClick]'
    }),
    tslib_1.__param(2, Inject(DOCUMENT))
], ClickDirective);
export { ClickDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmVvLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2xpY2suZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQU96QixZQUNVLFFBQW1CLEVBQ25CLEdBQTRCLEVBQ1YsUUFBUTtRQUYxQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQXlCO1FBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQVQzQiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFFbkIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFjLENBQUMsQ0FBQyxzQkFBc0I7UUFFMUUsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFNOUIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUU7aUJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzlCLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxNQUFNO1FBQ1osT0FBTyxJQUFJLFVBQVUsQ0FBYSxRQUFRLENBQUMsRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7O1lBM0JxQixTQUFTO1lBQ2QsVUFBVTs0Q0FDdEIsTUFBTSxTQUFDLFFBQVE7O0FBVFQ7SUFBUixLQUFLLEVBQUU7NkRBQStCO0FBRW5CO0lBQW5CLE1BQU0sQ0FBQyxVQUFVLENBQUM7NkNBQXdDO0FBSGhELGNBQWM7SUFIMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7S0FDdkIsQ0FBQztJQVdHLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQVZSLGNBQWMsQ0FtQzFCO1NBbkNZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDbGlja10nXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjbGlja0xpc3RlbmVyRGlzYWJsZWQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCdtd2xDbGljaycpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tMaXN0ZW5lckRpc2FibGVkKSB7XG4gICAgICB0aGlzLmxpc3RlbigpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgdGhpcy5jbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbigpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TW91c2VFdmVudD4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsICdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19