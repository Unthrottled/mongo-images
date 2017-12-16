import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";

export class RemoteProjectFile implements ProjectFile {
    private imageBinaryReplay = new ReplaySubject<any>(1);
    private _name: string;

    constructor(identifier: Identifier = new Identifier(),
                remoteProjectFile: Observable<any> = Observable.empty()) {

        remoteProjectFile.subscribe(imageBinary => {
            this.imageBinaryReplay.next(imageBinary);
        });

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

    get id(): string {
        return this.identifier.id;
    }

    /**
     * Replaces the current remote project file with the new binary.
     *
     * I am kind of torn at the moment because one you set the binary again
     * it is no longer a remote project file and does not fit int this current
     * abstraction.
     * @param {File} file
     */
    setNewFile(file: File): void {
        //todo: me?
    }

    getName(): string {
        return this._name;
    }

    imageBinary(): Observable<any> {
        return this.imageBinaryReplay
    }


}