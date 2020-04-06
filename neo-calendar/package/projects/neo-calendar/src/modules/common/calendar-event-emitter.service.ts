import { Injectable, EventEmitter, Output } from '@angular/core';

export class EventEmitterService {
    
  @Output() eventChange = new EventEmitter<any>();

  constructor() {}

  emitNavChangeEvent(value, event) {
    this.eventChange.emit({value, event});
  }

  getNavChangeEmitter() {
    return this.eventChange;
  }
}
