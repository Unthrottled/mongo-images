import {Component, Input} from '@angular/core';
import {ProjectFile} from "../model/ProjectFile.model";
import {ProjectFileService} from "../service/ProjectFileService";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'project-file',
    template: require('./ProjectFile.component.htm')
})
export class ProjectFileComponent {

    constructor(private projectFileService: ProjectFileService) {
    }

    private _projectFile: ProjectFile;

    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
    }

    //todo: remove dis
    get editMode(): boolean {
        return true;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

    uploadFile(): void {
        this.projectFileService.uploadFile(this.projectFile);
    }

    delete(): void {
        this.projectFileService.removeProjectFile(this.projectFile);
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }
}