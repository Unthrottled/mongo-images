import {isNullOrUndefined} from "util";

export function isDefined(val: any): boolean {
    return !isNullOrUndefined(val)
}