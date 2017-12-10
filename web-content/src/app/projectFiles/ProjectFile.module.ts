

import {NgModule} from "@angular/core";
import {RemoteProjectFileService} from "./RemoteProjectFile.service";
import {ProjectFileChooseComponent} from "./ProjectFileChoose.component";
import {ProjectFileListComponent} from "./ProjectFileList.component";
import {ProjectFileViewComponent} from "./ProjectFileView.component";
import {ProjectFileComponent} from "./ProjectFile.component";

@NgModule({
        imports: [],
        exports: [],
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