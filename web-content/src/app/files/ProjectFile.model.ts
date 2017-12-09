

import {Observable} from "rxjs/Observable";

export interface ProjectFile {
    imageBinary(): Observable<any>;
    isLoaded(): boolean;
}