import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';

import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => { }
  private propagateTouched: any = () => { }

  writeValue(value: string) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.propagateChange = fn
  }
  registerOnTouched(fn: any) {
    this.propagateTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatSelectChange): void {
    console.log(event.value)
    const value = event.value ? event.value : null;

    this.value=value;
    this.propagateChange(value);
    this.changed.emit(value)

  }

  onBlur(): void {
    this.propagateTouched()
  }

}
