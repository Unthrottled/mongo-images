import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProjectFile} from "./ProjectFile.model";

@Component({
    selector: 'project-file-view',
    template: require('./ProjectFileView.component.htm')
})
export class FileViewComponent {

    constructor() {
    }

    private _project: ProjectFile;

    @Input()
    get project(): ProjectFile {
        return this._project;
    }

    set project(value: ProjectFile) {
        this._project = value;
    }

    get reachBinary(): Observable<any> {
        return this._project.imageBinary();
    }

}