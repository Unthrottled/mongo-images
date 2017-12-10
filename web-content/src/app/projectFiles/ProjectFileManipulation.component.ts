

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectFile} from "./ProjectFile.model";
import {LocalProjectFile} from "./LocalProjectFile";
import {Observable} from "rxjs/Observable";

@Component(
    {
        selector: 'project-file-manipulation',
        template: require('./ProjectFileManipulation.component.htm')
    }
)
export class ProjectFileManipulationComponent {
    private _projectFile: ProjectFile;

    @Output()
    private projectFileChanged = new EventEmitter<ProjectFile>();


    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
    }

    fileChosen(file: File): void{
        this._projectFile = new LocalProjectFile(Observable.of(file));
        this.projectFileChanged.emit(this._projectFile);
    }
}