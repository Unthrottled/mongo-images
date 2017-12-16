import {Observable} from "rxjs/Observable";
import {Identifier} from "./Identifier.model";

export interface ProjectFile {
    imageBinary(): Observable<any>;
    getIdentifier(): string;
    setNewFile(file: File): void;
}