/**
 * Created by alex on 6/7/17.
 */
import {Injectable} from '@angular/core';

function _window(): any {
    // return the global native browser window object
    return window;
}

@Injectable()
export class WindowRef {
    get nativeWindow(): any {
        return _window();
    }
}
