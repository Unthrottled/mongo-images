import {Injectable, OnInit} from "@angular/core";
import {ProjectFile} from "../model/ProjectFile.model";
import {LocalProjectFile} from "../model/LocalProjectFile";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {IHash} from "../../IHash.model";
import {LocalProjectFileService} from "./LocalProjectFile.service";
import {ImageUploadService} from "./ImageUpload.service";
import {RemoteProjectFileService} from "./RemoteProjectFile.service";


@Injectable()
export class ProjectFileService implements OnInit {
    private projectFileIndices: IHash<number> = {};


    constructor(private localProjectFileService: LocalProjectFileService,
                private remoteProjectFileService: RemoteProjectFileService,
                private imageUploadService: ImageUploadService) {

    }

    ngOnInit(): void {
        this.remoteProjectFileService.fetchAllRemoteProjects()
            .subscribe(remoteFile=> {
                this.addProjectToList(remoteFile);
            }, error=> {
                console.log(error);
            })
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
        this.addProjectToList(items);
    }

    private addProjectToList(items: ProjectFile) {
        this._projectFiles.push(items);
        this.projectFileIndices[items.getName()] = this._projectFiles.length - 1;
    }

    removeProjectFile(projectFile: ProjectFile) {
        if(projectFile instanceof RemoteProjectFile){
            let self = this;
            this.remoteProjectFileService.removeProject(<RemoteProjectFile>projectFile)
                .filter(b=>b)
                .subscribe(result=>{
                    self.removeLocal(projectFile);
                }, error=>{
                    console.log(error)
            });
        } else if (projectFile instanceof LocalProjectFile){
            this.removeLocal(projectFile);
        }
    }

    private removeLocal(projectFile: ProjectFile) {
        this.projectFiles.splice(this.removeProjectIndex(projectFile), 1);

    }

    uploadFile(projectFile: LocalProjectFile) {
        this.imageUploadService.uploadImage(projectFile.selectedFile)
            .map(imageId=>this.remoteProjectFileService.fetchRemoteProject(imageId))
            .subscribe(remoteProject=> {
                let index = this.removeProjectIndex(projectFile);
                this.projectFileIndices[remoteProject.getName()] = index;
                this.projectFiles[index] = remoteProject;
            });
    }

    private removeProjectIndex(projectFile: ProjectFile): number {
        let name = projectFile.getName();
        let projectIndex = this.projectFileIndices[name];
        delete this.projectFileIndices[name];
        return projectIndex;
    }
}