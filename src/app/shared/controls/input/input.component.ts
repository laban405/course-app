import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input()
  placeholder!: string;

  @Output() 
  changed = new EventEmitter<string>();

  value!: string;
  isDisabled: boolean = false;

  constructor() { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty  
  }

  private propagateChange: any = () => { }
  private propagateTouched: any = () => { }
  // private propagateChange: any = () =>{}

  writeValue(value: string): void {
    this.value = value

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value:string):void{
    this.value=value;
    this.propagateChange(value);
    this.changed.emit(value)
  }

  onBlur(): void{
    this.propagateTouched();
  }

}