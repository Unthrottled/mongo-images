
import {Injectable, OnInit} from "@angular/core";
import {ProjectFile} from "../model/ProjectFile.model";
import {LocalProjectFile} from "../model/LocalProjectFile";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {IHash} from "../../IHash.model";
import {LocalProjectFileService} from "./LocalProjectFile.service";


@Injectable()
export class ProjectFileService implements OnInit {
    private projectFileIndices: IHash<number> = {};


    constructor(private localProjectFileService: LocalProjectFileService) {

    }

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
        let items = this.localProjectFileService.createLocalProject();
        this._projectFiles.push(items);
        let index = this._projectFiles.length - 1;
        items.getName()
            .subscribe(name=>this.localProjectFileService[name]=index);
    }

    removeProjectFile(projectFile: ProjectFile) {
        if(projectFile instanceof RemoteProjectFile){
            //todo: remove remote project
        } else if (projectFile instanceof LocalProjectFile){
            this.removeLocal(projectFile);
        }
    }

    private removeLocal(projectFile: LocalProjectFile) {
        projectFile.getName()
            .subscribe(name=>{
                let projectIndex = this.localProjectFileService[name];
                delete this.localProjectFileService[name];
                this.projectFiles.splice(projectIndex, 1);
            })
    }

    uploadFile(projectFile: ProjectFile) {
        //todo: me
    }
}