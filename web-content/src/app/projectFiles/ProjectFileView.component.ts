import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProjectFile} from "./model/ProjectFile.model";

@Component({
    selector: 'project-file-view',
    template: require('./ProjectFileView.component.htm')
})
export class ProjectFileViewComponent {

    @Output()
    private projectFileChanged = new EventEmitter<ProjectFile>();

    constructor() {
    }

    private _projectFile: ProjectFile;

    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
        this.projectFileChanged.emit(this.projectFile)
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }

    get editMode(): boolean {
        return true;
    }

}