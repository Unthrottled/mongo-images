"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocalProjectFile_1 = require("../model/LocalProjectFile");
var RemoteProjectFile_1 = require("../model/RemoteProjectFile");
var ProjectFileService = /** @class */ (function () {
    function ProjectFileService() {
        this.projectFileIndices = {};
        this.hashiCorp = require('node-object-hash');
        this._projectFiles = [];
    }
    ProjectFileService.prototype.ngOnInit = function () {
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
        var localProjectFile = new LocalProjectFile_1.LocalProjectFile();
        this._projectFiles.push(localProjectFile);
        console.log(new this.hashiCorp().hash(this._projectFiles));
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
        //todo: me
    };
    ProjectFileService.prototype.uploadFile = function (projectFile) {
        //todo: me
    };
    ProjectFileService = __decorate([
        core_1.Injectable()
    ], ProjectFileService);
    return ProjectFileService;
}());
exports.ProjectFileService = ProjectFileService;
//# sourceMappingURL=ProjectFileService.js.map