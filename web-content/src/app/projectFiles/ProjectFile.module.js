"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RemoteProjectFile_service_1 = require("./service/RemoteProjectFile.service");
var ProjectFileChoose_component_1 = require("./choose/ProjectFileChoose.component");
var ProjectFileList_component_1 = require("./list/ProjectFileList.component");
var ProjectFileView_component_1 = require("./view/ProjectFileView.component");
var ProjectFiles_component_1 = require("./ProjectFiles.component");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ProjectFileManipulation_component_1 = require("./manipulation/ProjectFileManipulation.component");
var ProjectFileService_1 = require("./service/ProjectFileService");
var ProjectFile_component_1 = require("./view/ProjectFile.component");
var LocalProjectFile_service_1 = require("./service/LocalProjectFile.service");
var ImageUpload_service_1 = require("./service/ImageUpload.service");
var ProjectFileModule = /** @class */ (function () {
    function ProjectFileModule() {
    }
    ProjectFileModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
            ],
            exports: [
                ProjectFileChoose_component_1.ProjectFileChooseComponent,
                ProjectFileList_component_1.ProjectFileListComponent,
                ProjectFileView_component_1.ProjectFileViewComponent,
                ProjectFile_component_1.ProjectFileComponent,
                ProjectFiles_component_1.ProjectFilesComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent
            ],
            declarations: [
                ProjectFileChoose_component_1.ProjectFileChooseComponent,
                ProjectFileList_component_1.ProjectFileListComponent,
                ProjectFileView_component_1.ProjectFileViewComponent,
                ProjectFile_component_1.ProjectFileComponent,
                ProjectFiles_component_1.ProjectFilesComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent
            ],
            bootstrap: [],
            providers: [RemoteProjectFile_service_1.RemoteProjectFileService,
                ProjectFileService_1.ProjectFileService,
                LocalProjectFile_service_1.LocalProjectFileService,
                ImageUpload_service_1.ImageUploadService
            ],
            schemas: []
        })
    ], ProjectFileModule);
    return ProjectFileModule;
}());
exports.ProjectFileModule = ProjectFileModule;
//# sourceMappingURL=ProjectFile.module.js.map