

import {Observable} from "rxjs/Observable";

export interface ProjectFile {
    imageBinary(): Observable<any>;
    isLoaded(): boolean;
    getName(): string;
    setNewFile(file: File): void;
}