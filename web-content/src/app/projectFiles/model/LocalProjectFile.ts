import {ProjectFile} from "./ProjectFile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";

export class LocalProjectFile implements ProjectFile {
    private imageBinaryRepeater = new ReplaySubject<MSBaseReader>(1);
    private _identifier: Identifier;

    constructor(id: Identifier) {
        this._identifier = id;
    }

    private _selectedFile: Observable<File>;

    /**
     * This is the expected data structure that will
     * be translated as a rest call to the backend.
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

    getIdentifier(): string {
        return this._identifier.id;
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