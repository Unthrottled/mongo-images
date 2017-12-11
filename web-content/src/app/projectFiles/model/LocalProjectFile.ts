

import {ProjectFile} from "./ProjectFile.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class LocalProjectFile implements ProjectFile {
    setNewFile(file: File): void {
        this.selectedFile=Observable.of(file);
    }
    getName(): Observable<string> {
        return this._name;
    }
    private _loaded: boolean = false;

    isLoaded(): boolean {
        return this._loaded;
    }
    private repeat = new BehaviorSubject<MSBaseReader>(null);

    private _name: Observable<string>;

    constructor(id: string) {
        this._name = Observable.of(id);
    }

    private _selectedFile: Observable<File>;

    get selectedFile(): Observable<File> {
        return this._selectedFile;
    }


    set selectedFile(value: Observable<File>) {
        this._selectedFile = value;
        this._selectedFile
            .subscribe(file => {
                let fileReader = new FileReader();
                fileReader.onload = event => {
                    this.repeat.next(fileReader.result);
                    this._loaded = true;
                };
                fileReader.readAsDataURL(file);
            });
    }

    imageBinary(): Observable<MSBaseReader> {
        return this.repeat;
    }
}