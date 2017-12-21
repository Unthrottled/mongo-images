import {Injectable, OnInit} from "@angular/core";
import {ProjectFile} from "../model/ProjectFile.model";
import {LocalProjectFile} from "../model/LocalProjectFile";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {IHash} from "../../util/IHash.model";
import {LocalProjectFileService} from "./LocalProjectFile.service";
import {ImageUploadService} from "./ImageUpload.service";
import {RemoteProjectFileService} from "./RemoteProjectFile.service";


@Injectable()
export class ProjectFileService implements OnInit {
    private projectFileMap: Map<String, ProjectFile> = new Map<String, ProjectFile>();


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


    get projectFiles(): Iterable<ProjectFile> {
        return this.projectFileMap.values();
    }

    addProject() {
        let items = this.localProjectFileService.createLocalProject();
        this.addProjectToList(items);
    }

    private addProjectToList(project: ProjectFile) {
        this.projectFileMap.set(project.getIdentifier(), project)
    }

    removeProjectFile(projectFile: ProjectFile) {
        if(projectFile instanceof RemoteProjectFile){
            let self = this;
            this.remoteProjectFileService.removeProject(<RemoteProjectFile>projectFile)
                .filter(b=>b)
                .subscribe(result=>{
                    self.removeProjectFileFromList(projectFile);
                }, error=>{
                    console.log(error)
            });
        } else if (projectFile instanceof LocalProjectFile){
            this.removeProjectFileFromList(projectFile);
        }
    }

    private removeProjectFileFromList(projectFile: ProjectFile) {
        this.projectFileMap.delete(projectFile.getIdentifier());

    }

    uploadFile(projectFile: LocalProjectFile) {
        this.imageUploadService.uploadImage(projectFile.selectedFile)
            .map(imageId=>this.remoteProjectFileService.fetchRemoteProject(imageId))
            .subscribe(remoteProject=> {
                this.removeProjectFileFromList(projectFile);
                this.projectFileMap.set(remoteProject.getIdentifier(), remoteProject);
            });
    }
}