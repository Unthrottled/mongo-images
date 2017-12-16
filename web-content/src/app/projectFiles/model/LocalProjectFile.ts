import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class LocalProjectFile implements ProjectFile {
    setNewFile(file: File): void {
        this.selectedFile=Observable.of(file);
    }
    getName(): string {
        return this._name;
    }
    private _loaded: boolean = false;

    private repeat = new BehaviorSubject<MSBaseReader>(null);

    private _name: string;

    constructor(id: string) {
        this._name = id;
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
                };
                fileReader.readAsDataURL(file);
            });
    }

    imageBinary(): Observable<MSBaseReader> {
        return this.repeat;
    }
}