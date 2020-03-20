import { isInside, isWithinThreshold } from './util';
var CalendarDragHelper = /** @class */ (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    CalendarDragHelper.prototype.validateDrag = function (_a) {
        var x = _a.x, y = _a.y, snapDraggedEvents = _a.snapDraggedEvents, dragAlreadyMoved = _a.dragAlreadyMoved, transform = _a.transform;
        if (snapDraggedEvents) {
            var newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + transform.x,
                right: this.startPosition.right + transform.x,
                top: this.startPosition.top + transform.y,
                bottom: this.startPosition.bottom + transform.y
            });
            return ((isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved;
        }
    };
    return CalendarDragHelper;
}());
export { CalendarDragHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZW8tY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1kcmFnLWhlbHBlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR3JEO0lBR0UsNEJBQ1Usb0JBQWlDLEVBQ3pDLGdCQUE2QjtRQURyQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWE7UUFHekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRCx5Q0FBWSxHQUFaLFVBQWEsRUFZWjtZQVhDLFFBQUMsRUFDRCxRQUFDLEVBQ0Qsd0NBQWlCLEVBQ2pCLHNDQUFnQixFQUNoQix3QkFBUztRQVFULElBQUksaUJBQWlCLEVBQUU7WUFDckIsSUFBTSxPQUFPLEdBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDekMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztZQUVILE9BQU8sQ0FDTCxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO2dCQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHFCQUFxQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQ3JFLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0luc2lkZSwgaXNXaXRoaW5UaHJlc2hvbGQgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgVmFsaWRhdGVEcmFnUGFyYW1zIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRHJhZ0hlbHBlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRyYWdDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBkcmFnZ2FibGVFbGVtZW50OiBIVE1MRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgdmFsaWRhdGVEcmFnKHtcbiAgICB4LFxuICAgIHksXG4gICAgc25hcERyYWdnZWRFdmVudHMsXG4gICAgZHJhZ0FscmVhZHlNb3ZlZCxcbiAgICB0cmFuc2Zvcm1cbiAgfToge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW47XG4gICAgZHJhZ0FscmVhZHlNb3ZlZDogYm9vbGVhbjtcbiAgICB0cmFuc2Zvcm06IFZhbGlkYXRlRHJhZ1BhcmFtc1sndHJhbnNmb3JtJ107XG4gIH0pOiBib29sZWFuIHtcbiAgICBpZiAoc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgIGNvbnN0IG5ld1JlY3Q6IENsaWVudFJlY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXJ0UG9zaXRpb24sIHtcbiAgICAgICAgbGVmdDogdGhpcy5zdGFydFBvc2l0aW9uLmxlZnQgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuc3RhcnRQb3NpdGlvbi5yaWdodCArIHRyYW5zZm9ybS54LFxuICAgICAgICB0b3A6IHRoaXMuc3RhcnRQb3NpdGlvbi50b3AgKyB0cmFuc2Zvcm0ueSxcbiAgICAgICAgYm90dG9tOiB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tICsgdHJhbnNmb3JtLnlcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAoaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQpICYmXG4gICAgICAgIGlzSW5zaWRlKHRoaXMuZHJhZ0NvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIG5ld1JlY3QpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=