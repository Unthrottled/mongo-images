

import {NgModule} from "@angular/core";
import {RemoteProjectFileService} from "./service/RemoteProjectFile.service";
import {ProjectFileChooseComponent} from "./choose/ProjectFileChoose.component";
import {ProjectFileListComponent} from "./list/ProjectFileList.component";
import {ProjectFileViewComponent} from "./view/ProjectFileView.component";
import {ProjectFileComponent} from "./ProjectFile.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ProjectFileManipulationComponent} from "./manipulation/ProjectFileManipulation.component";

@NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule
        ],
        exports: [
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            ProjectFileComponent,
            ProjectFileManipulationComponent

        ],
        declarations:[
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            ProjectFileComponent,
            ProjectFileManipulationComponent
        ],
        bootstrap: [],
        providers: [RemoteProjectFileService],
        schemas: []
})
export class ProjectFileModule {

}