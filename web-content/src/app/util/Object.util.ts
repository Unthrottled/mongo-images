import {isNullOrUndefined} from "";

export function isDefined(val: any): boolean {
    return !isNullOrUndefined(val)
}