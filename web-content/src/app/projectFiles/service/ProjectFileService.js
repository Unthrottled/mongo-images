"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocalProjectFile_1 = require("../model/LocalProjectFile");
var RemoteProjectFile_1 = require("../model/RemoteProjectFile");
var LocalProjectFile_service_1 = require("./LocalProjectFile.service");
var ImageUpload_service_1 = require("./ImageUpload.service");
var RemoteProjectFile_service_1 = require("./RemoteProjectFile.service");
var ProjectFileService = /** @class */ (function () {
    function ProjectFileService(localProjectFileService, remoteProjectFileService, imageUploadService) {
        this.localProjectFileService = localProjectFileService;
        this.remoteProjectFileService = remoteProjectFileService;
        this.imageUploadService = imageUploadService;
        this.projectFileIndices = {};
        this._projectFiles = [];
    }
    ProjectFileService.prototype.ngOnInit = function () {
        var _this = this;
        this.remoteProjectFileService.fetchAllRemoteProjects()
            .subscribe(function (remoteFile) {
            console.log(remoteFile);
            _this.addProjectToList(remoteFile);
        }, function (error) {
            console.log(error);
        });
    };
    Object.defineProperty(ProjectFileService.prototype, "projectFiles", {
        get: function () {
            return this._projectFiles;
        },
        set: function (value) {
            this._projectFiles = value;
        },
        enumerable: true,
        configurable: true
    });
    ProjectFileService.prototype.addProject = function () {
        var items = this.localProjectFileService.createLocalProject();
        this.addProjectToList(items);
    };
    ProjectFileService.prototype.addProjectToList = function (items) {
        this._projectFiles.push(items);
        this.projectFileIndices[items.getName()] = this._projectFiles.length - 1;
    };
    ProjectFileService.prototype.removeProjectFile = function (projectFile) {
        if (projectFile instanceof RemoteProjectFile_1.RemoteProjectFile) {
            //todo: remove remote project
        }
        else if (projectFile instanceof LocalProjectFile_1.LocalProjectFile) {
            this.removeLocal(projectFile);
        }
    };
    ProjectFileService.prototype.removeLocal = function (projectFile) {
        this.projectFiles.splice(this.removeProjectIndex(projectFile), 1);
    };
    ProjectFileService.prototype.uploadFile = function (projectFile) {
        var _this = this;
        this.imageUploadService.uploadImage(projectFile.selectedFile)
            .map(function (imageId) { return _this.remoteProjectFileService.fetchRemoteProject(imageId); })
            .subscribe(function (remoteProject) {
            var index = _this.removeProjectIndex(projectFile);
            _this.projectFileIndices[remoteProject.getName()] = index;
            _this.projectFiles[index] = remoteProject;
        });
    };
    ProjectFileService.prototype.removeProjectIndex = function (projectFile) {
        var name = projectFile.getName();
        var projectIndex = this.projectFileIndices[name];
        delete this.projectFileIndices[name];
        return projectIndex;
    };
    ProjectFileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [LocalProjectFile_service_1.LocalProjectFileService,
            RemoteProjectFile_service_1.RemoteProjectFileService,
            ImageUpload_service_1.ImageUploadService])
    ], ProjectFileService);
    return ProjectFileService;
}());
exports.ProjectFileService = ProjectFileService;
//# sourceMappingURL=ProjectFileService.js.map