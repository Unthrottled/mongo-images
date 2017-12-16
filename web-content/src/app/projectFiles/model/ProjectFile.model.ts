import {Observable} from "rxjs/Observable";

export interface ProjectFile {
    imageBinary(): Observable<any>;
    getName(): string;
    setNewFile(file: File): void;
}