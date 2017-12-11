
import {Component} from "@angular/core";
import {ProjectFile} from "./model/ProjectFile.model";
import {LocalProjectFile} from "./model/LocalProjectFile";
import {ProjectFileService} from "./service/ProjectFileService";

@Component({
    selector: 'project-file-component',
    template: require('./ProjectFiles.component.htm')
})
export class ProjectFileComponent {

    constructor(private projectFileService: ProjectFileService){}

    get projectFiles(): ProjectFile[] {
        return this.projectFileService.projectFiles;
    }

    addFile(): void {
        this.projectFileService.addProject();
    }
}