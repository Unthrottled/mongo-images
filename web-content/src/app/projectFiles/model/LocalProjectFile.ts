import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";

export class LocalProjectFile implements ProjectFile {
    private imageBinaryRepeater = new ReplaySubject<MSBaseReader>(1);
    private _name: string;

    constructor(id: string) {
        this._name = id;
    }

    private _selectedFile: Observable<File>;

    /**
     * This is the expected data structure that will
     * be transalated as a rest call to the backend.
     * @returns {Observable<File>}
     */
    get selectedFile(): Observable<File> {
        return this._selectedFile;
    }

    set selectedFile(value: Observable<File>) {
        this._selectedFile = value;
        this.readFileIntoBinary();
    }

    /**
     * Sets current project file and also
     * reads the file into binary so that it
     * will be displayed.
     * @param {File} file preferably a image file.
     */
    setNewFile(file: File): void {
        this.selectedFile = Observable.of(file);
    }

    getName(): string {
        return this._name;
    }

    /**
     * This is the raw image data binary that
     * will be rendered by the browser.
     * @returns {Observable<MSBaseReader>}
     */
    imageBinary(): Observable<MSBaseReader> {
        return this.imageBinaryRepeater;
    }

    private readFileIntoBinary() {
        this._selectedFile
            .subscribe(file => {
                let fileReader = new FileReader();
                fileReader.onload = event => {
                    this.imageBinaryRepeater.next(fileReader.result);
                };
                fileReader.readAsDataURL(file);
            });
    }
}