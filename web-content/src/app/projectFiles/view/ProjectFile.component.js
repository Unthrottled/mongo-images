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
var ProjectFileService_1 = require("../service/ProjectFileService");
var LocalProjectFile_1 = require("../model/LocalProjectFile");
var ProjectFileComponent = /** @class */ (function () {
    function ProjectFileComponent(projectFileService) {
        this.projectFileService = projectFileService;
    }
    Object.defineProperty(ProjectFileComponent.prototype, "projectFile", {
        get: function () {
            return this._projectFile;
        },
        set: function (value) {
            this._projectFile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectFileComponent.prototype, "editMode", {
        //todo: remove dis when you can change remote projects.
        get: function () {
            return this.projectFile instanceof LocalProjectFile_1.LocalProjectFile;
        },
        enumerable: true,
        configurable: true
    });
    ProjectFileComponent.prototype.updateFile = function (projectFile) {
        this.projectFile = projectFile;
    };
    ProjectFileComponent.prototype.uploadFile = function () {
        this.projectFileService.uploadFile(this.projectFile);
    };
    ProjectFileComponent.prototype.delete = function () {
        this.projectFileService.removeProjectFile(this.projectFile);
    };
    Object.defineProperty(ProjectFileComponent.prototype, "imageBinary", {
        get: function () {
            return this._projectFile.imageBinary();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ProjectFileComponent.prototype, "projectFile", null);
    ProjectFileComponent = __decorate([
        core_1.Component({
            selector: 'project-file',
            template: require('./ProjectFile.component.htm')
        }),
        __metadata("design:paramtypes", [ProjectFileService_1.ProjectFileService])
    ], ProjectFileComponent);
    return ProjectFileComponent;
}());
exports.ProjectFileComponent = ProjectFileComponent;
//# sourceMappingURL=ProjectFile.component.js.map