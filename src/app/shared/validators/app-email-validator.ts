import { ValidatorFn } from "@angular/forms";

export function appEmailValidator(domains: string[]): ValidatorFn {

    const domainStrings = domains.join("|")
    const regExp = new RegExp(`[^@]{6,}@gmail\.(${domainStrings})$`);

    return (constrol) => {
        return constrol.value === '' || regExp.test(constrol.value)
            ? null : { appEmailValidator: true }

    }
}