
import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";

export class RemoteProjectFile implements ProjectFile {
    getName(): Observable<string> {
        return this._name;
    }
    private replaySubject = new ReplaySubject<any>(1);
    private loaded = false;
    private _rawFile: Observable<any>;
    private _name: Observable<string> = Observable.empty();

    constructor(identifier: Identifier = new Identifier(),
                file: Observable<any> = Observable.empty()) {

        file.subscribe(blob => {
            this.loaded = true;
            this.replaySubject.next(blob);
        });

        this._rawFile = file;
        this._identifier = identifier;
        this._name = Observable.of(this.identifier.id);
    }

    private _identifier: Identifier;

    get identifier(): Identifier {
        return this._identifier;
    }

    set identifier(value: Identifier) {
        this._identifier = value;
    }

    isLoaded(): boolean {
        return this.loaded;
    }

    get id(): string {
        return this.identifier.id;
    }

    imageBinary(): Observable<any> {
        return this._rawFile;
    }



}