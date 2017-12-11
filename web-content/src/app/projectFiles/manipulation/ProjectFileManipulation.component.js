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
var ProjectFileManipulationComponent = /** @class */ (function () {
    function ProjectFileManipulationComponent() {
        this.projectFileUpdated = new core_1.EventEmitter();
    }
    Object.defineProperty(ProjectFileManipulationComponent.prototype, "projectFile", {
        get: function () {
            return this._projectFile;
        },
        set: function (value) {
            this._projectFile = value;
        },
        enumerable: true,
        configurable: true
    });
    ProjectFileManipulationComponent.prototype.fileChosen = function (file) {
        this._projectFile.setNewFile(file);
        this.projectFileUpdated.emit(this._projectFile);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProjectFileManipulationComponent.prototype, "projectFileUpdated", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ProjectFileManipulationComponent.prototype, "projectFile", null);
    ProjectFileManipulationComponent = __decorate([
        core_1.Component({
            selector: 'project-file-manipulation',
            template: require('./ProjectFileManipulation.component.htm')
        })
    ], ProjectFileManipulationComponent);
    return ProjectFileManipulationComponent;
}());
exports.ProjectFileManipulationComponent = ProjectFileManipulationComponent;
//# sourceMappingURL=ProjectFileManipulation.component.js.map