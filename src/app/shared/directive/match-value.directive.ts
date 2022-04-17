import { Directive, Input } from "@angular/core";
import { Validator, ValidationErrors, FormGroup, NG_VALIDATORS, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[matchValue]",
  providers: [ { provide: NG_VALIDATORS, useExisting: MatchValueDirective, multi: true }]
})

export class MatchValueDirective implements Validator {
  @Input("matchValue") matchValueFields: string[] = [];

  constructor() {}

  validate(formGroup: FormGroup): any {
    return MatchValue(this.matchValueFields[0], this.matchValueFields[1])(formGroup);
  }
}


export function MatchValue(firstControlName: string, secondControlName: string) {
  return (formGroup: FormGroup) => {
    const firstControl: AbstractControl = formGroup.controls[firstControlName];
    const secondControl: AbstractControl = formGroup.controls[secondControlName];
    // return null if controls haven't initialised yet
    if(!firstControl || !secondControl || !firstControl.value || !secondControl.value) 
      return null;
    else if (secondControl.errors && !secondControl.errors['matchValueError']) 
      return null;
    else if (firstControl.value !== secondControl.value) {
      secondControl.setErrors({ matchValueError: true });
      return;
    }
    else {
      secondControl.setErrors(null);
      return;
    }
  };
}