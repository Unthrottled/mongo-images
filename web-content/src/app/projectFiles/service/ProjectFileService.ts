
import {Injectable, OnInit} from "@angular/core";
import {ProjectFile} from "../model/ProjectFile.model";
import {LocalProjectFile} from "../model/LocalProjectFile";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {IHash} from "../../IHash.model";


@Injectable()
export class ProjectFileService implements OnInit {
    private projectFileIndices: IHash<number> = {};

    ngOnInit(): void {
    }

    private _projectFiles: ProjectFile[] = [];


    get projectFiles(): ProjectFile[] {
        return this._projectFiles;
    }

    set projectFiles(value: ProjectFile[]) {
        this._projectFiles = value;
    }

    addProject() {
        let localProjectFile = new LocalProjectFile();
        this._projectFiles.push(localProjectFile);
    }

    removeProjectFile(projectFile: ProjectFile) {
        if(projectFile instanceof RemoteProjectFile){
            //todo: remove remote project
        } else if (projectFile instanceof LocalProjectFile){
            this.removeLocal(projectFile);
        }
    }

    private removeLocal(projectFile: LocalProjectFile) {
        //todo: me
    }

    uploadFile(projectFile: ProjectFile) {
        //todo: me
    }
}