

import {ProjectFile} from "./ProjectFile.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class LocalProjectFile implements ProjectFile {
    private _loaded: boolean = false;

    isLoaded(): boolean {
        return this._loaded;
    }
    private repeat = new BehaviorSubject<MSBaseReader>(null);


    constructor(file: Observable<any> = Observable.empty<any>()) {
        this._selectedFile = file;
        let self = this;
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

    private _selectedFile: Observable<File>;

    get selectedFile(): Observable<File> {
        return this._selectedFile;
    }

    imageBinary(): Observable<MSBaseReader> {
        return this.repeat;
    }
}