

import {Component, Input} from "@angular/core";
import {ProjectFile} from "./ProjectFile.model";

@Component(
    {
        selector: 'project-file-manipulation',
        template: require('./ProjectFileManipulation.component.htm')
    }
)
export class ProjectFileManipulationComponent {
    private _projectFile: ProjectFile;


    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
    }

    fileChosen(file: File): void{

    }
}