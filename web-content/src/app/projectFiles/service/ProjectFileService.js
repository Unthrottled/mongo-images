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
var ProjectFileService = /** @class */ (function () {
    function ProjectFileService(localProjectFileService) {
        this.localProjectFileService = localProjectFileService;
        this.projectFileIndices = {};
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
        var _this = this;
        var items = this.localProjectFileService.createLocalProject();
        this._projectFiles.push(items);
        var index = this._projectFiles.length - 1;
        items.getName()
            .subscribe(function (name) { return _this.localProjectFileService[name] = index; });
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
        var _this = this;
        projectFile.getName()
            .subscribe(function (name) {
            var projectIndex = _this.localProjectFileService[name];
            delete _this.localProjectFileService[name];
            _this.projectFiles.splice(projectIndex, 1);
        });
    };
    ProjectFileService.prototype.uploadFile = function (projectFile) {
        //todo: me
    };
    ProjectFileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [LocalProjectFile_service_1.LocalProjectFileService])
    ], ProjectFileService);
    return ProjectFileService;
}());
exports.ProjectFileService = ProjectFileService;
//# sourceMappingURL=ProjectFileService.js.map