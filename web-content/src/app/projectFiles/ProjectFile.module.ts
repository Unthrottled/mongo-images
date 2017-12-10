

import {NgModule} from "@angular/core";
import {RemoteProjectFileService} from "./RemoteProjectFile.service";
import {ProjectFileChooseComponent} from "./ProjectFileChoose.component";
import {ProjectFileListComponent} from "./ProjectFileList.component";
import {ProjectFileViewComponent} from "./ProjectFileView.component";
import {ProjectFileComponent} from "./ProjectFile.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

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
            ProjectFileComponent

        ],
        declarations:[
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            ProjectFileComponent
        ],
        bootstrap: [],
        providers: [RemoteProjectFileService],
        schemas: []
})
export class ProjectFileModule {

}