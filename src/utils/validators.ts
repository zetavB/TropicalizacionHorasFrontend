import { AbstractControl, ValidatorFn } from '@angular/forms'

export function numberRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

export function dateMaxRangeValidator(max: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && control.value >= max) {
      return { 'range': true };
    }
    return null;
  };
}
