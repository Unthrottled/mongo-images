
import {Component} from "@angular/core";
import {ProjectFile} from "./model/ProjectFile.model";
import {LocalProjectFile} from "./model/LocalProjectFile";

@Component({
    selector: 'project-file-component',
    template: require('./ProjectFile.component.htm')
})
export class ProjectFileComponent {

    private _projectFiles: ProjectFile[] = [];


    get projectFiles(): ProjectFile[] {
        return this._projectFiles;
    }

    set projectFiles(value: ProjectFile[]) {
        this._projectFiles = value;
    }

    addFile(): void {
        this.projectFiles.push(new LocalProjectFile());
    }
}