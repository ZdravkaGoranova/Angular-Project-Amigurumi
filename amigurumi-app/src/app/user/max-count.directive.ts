import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMaxCount]',

  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxCountDirective,
    multi: true
  }]
})
export class MaxCountDirective implements Validator {
  @Input() appMaxCount: number | undefined;

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log(control.value);
    // debugger;
    if (this.appMaxCount === undefined || (control.value?.length || 0) <= this.appMaxCount) {
      return null;
    }
    return { appMaxCount: this.appMaxCount };
  }
}
