import {NgModule} from "@angular/core";
import {RemoteProjectFileService} from "./service/RemoteProjectFile.service";
import {ProjectFileChooseComponent} from "./choose/ProjectFileChoose.component";
import {ProjectFileListComponent} from "./list/ProjectFileList.component";
import {ProjectFileViewComponent} from "./view/ProjectFileView.component";
import {ProjectFilesComponent} from "./ProjectFiles.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ProjectFileManipulationComponent} from "./manipulation/ProjectFileManipulation.component";
import {ProjectFileService} from "./service/ProjectFileService";
import {ProjectFileComponent} from "./view/ProjectFile.component";
import {LocalProjectFileService} from "./service/LocalProjectFile.service";
import {ImageUploadService} from "./service/ImageUpload.service";

@NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,

        ],
        exports: [
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            ProjectFileComponent,
            ProjectFilesComponent,
            ProjectFileManipulationComponent

        ],
        declarations:[
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            ProjectFileComponent,
            ProjectFilesComponent,
            ProjectFileManipulationComponent
        ],
        bootstrap: [],
        providers: [RemoteProjectFileService,
            ProjectFileService,
            LocalProjectFileService,
            ImageUploadService
        ],
        schemas: []
})
export class ProjectFileModule {

}