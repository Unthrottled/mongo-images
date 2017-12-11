import {Component, Input} from '@angular/core';
import {ProjectFile} from "../model/ProjectFile.model";

@Component({
    selector: 'project-file',
    template: require('./ProjectFile.component.htm')
})
export class ProjectFileComponent {

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

    get editMode(): boolean {
        return true;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

    uploadFile(): void {

    }

    delete(): void {

    }
}