import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";

export class RemoteProjectFile implements ProjectFile {

    /**
     * Replaces the current remote project file with the new binary
     * @param {File} file
     */
    setNewFile(file: File): void {
        //todo: me?
    }
    getName(): string {
        return this._name;
    }
    private replaySubject = new ReplaySubject<any>(1);
    private loaded = false;
    private _rawFile: Observable<any>;
    private _name: string;

    constructor(identifier: Identifier = new Identifier(),
                file: Observable<any> = Observable.empty()) {

        file.subscribe(blob => {
            this.loaded = true;
            this.replaySubject.next(blob);
        });

        this._rawFile = file;
        this._identifier = identifier;
        this._name = this.identifier.id;
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
        return this.replaySubject
    }



}