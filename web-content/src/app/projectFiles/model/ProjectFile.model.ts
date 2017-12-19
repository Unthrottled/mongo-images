import {Observable} from "rxjs/Observable";

export interface ProjectFile {
    imageBinary(): Observable<any>;
    getIdentifier(): string;
    setNewFile(file: File): void;
}