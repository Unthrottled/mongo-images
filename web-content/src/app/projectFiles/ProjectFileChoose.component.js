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
var ProjectFileChooseComponent = /** @class */ (function () {
    function ProjectFileChooseComponent() {
        this.fileSelectedEmitter = new core_1.EventEmitter();
    }
    ProjectFileChooseComponent.prototype.selectFile = function (event) {
        this.selectedFile = event.target.files.item(0);
        this.fileSelectedEmitter.emit(this.selectedFile);
    };
    Object.defineProperty(ProjectFileChooseComponent.prototype, "selectedFile", {
        get: function () {
            return this._selectedFile;
        },
        set: function (value) {
            this._selectedFile = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProjectFileChooseComponent.prototype, "fileSelectedEmitter", void 0);
    ProjectFileChooseComponent = __decorate([
        core_1.Component({
            selector: 'project-file-choose',
            template: require('./ProjectFileChoose.component.htm')
        }),
        __metadata("design:paramtypes", [])
    ], ProjectFileChooseComponent);
    return ProjectFileChooseComponent;
}());
exports.ProjectFileChooseComponent = ProjectFileChooseComponent;
//# sourceMappingURL=ProjectFileChoose.component.js.map