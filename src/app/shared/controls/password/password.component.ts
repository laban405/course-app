import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PasswordType = 'password' | 'text'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input()
  placeholder!: string;

  @Output() changed = new EventEmitter<string>();

  value!: string;
  isDisabled!: boolean;
  passwordType!: PasswordType;

  constructor() {
    this.passwordType='password'
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

  setDisabledState(isDisabled: boolean){
    this.isDisabled = isDisabled;
  }

  onKeyup(value:string):void{
    this.value=value;
    this.propagateChange(value)
    this.changed.emit(value)
  }

  onBlur():void{
    this.propagateTouched()
  }

  togglePassword():void{
    this.passwordType=this.passwordType==='password'?'text':'password'
  }

  ngOnInit(): void {
  }

}
