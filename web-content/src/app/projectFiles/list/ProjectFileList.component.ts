import {Component, Input} from "@angular/core";
import {ProjectFile} from "../model/ProjectFile.model";

@Component({
    selector: 'project-file-list',
    template: require('./ProjectFileList.component.htm')
})
export class ProjectFileListComponent {
    private _projectFiles: ProjectFile[] = [];

    @Input()
    get projectFiles(): ProjectFile[] {
        return this._projectFiles;
    }

    set projectFiles(value: ProjectFile[]) {
        this._projectFiles = value;
    }
}