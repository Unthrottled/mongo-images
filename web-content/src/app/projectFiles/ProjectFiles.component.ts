import {Component, OnInit} from "@angular/core";
import {ProjectFile} from "./model/ProjectFile.model";
import {ProjectFileService} from "./service/ProjectFileService";

@Component({
    selector: 'project-file-component',
    template: require('./ProjectFiles.component.htm')
})
export class ProjectFilesComponent implements OnInit {
    ngOnInit(): void {
        this.projectFileService.ngOnInit();
    }

    constructor(private projectFileService: ProjectFileService){}

    get projectFiles(): Iterable<ProjectFile> {
        return this.projectFileService.projectFiles;
    }

    addFile(): void {
        this.projectFileService.addProject();
    }
}