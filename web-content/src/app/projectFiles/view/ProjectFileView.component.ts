import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProjectFile} from "../model/ProjectFile.model";

@Component({
    selector: 'project-file-view',
    template: require('./ProjectFileView.component.htm')
})
export class ProjectFileViewComponent {

    constructor() {
    }

    private _projectFile: ProjectFile;

    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }

    get editMode(): boolean {
        return true;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

}