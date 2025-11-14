import { AbstractControl, ValidationErrors } from '@angular/forms';

export function oneOfRequiredValidator(keys: string[]) {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!group || typeof (group as any).get !== 'function') return null;
    const hasAny = keys.some(k => {
      const v = (group as any).get(k)?.value;
      return v !== null && v !== undefined && v !== '';
    });
    return hasAny ? null : { oneOfRequired: { fields: keys } };
  };
}
