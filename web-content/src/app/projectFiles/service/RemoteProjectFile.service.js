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
var BackendAPI_service_1 = require("../../services/BackendAPI.service");
var window_1 = require("../../util/window");
var RemoteProjectFile_1 = require("../model/RemoteProjectFile");
var Identifier_model_1 = require("../model/Identifier.model");
var Observable_1 = require("rxjs/Observable");
var RemoteProjectFileService = /** @class */ (function () {
    function RemoteProjectFileService(backendAPISevice, windowRef) {
        this.backendAPISevice = backendAPISevice;
        this.windowRef = windowRef;
    }
    RemoteProjectFileService.prototype.fetchRemoteProject = function (fileId) {
        var _this = this;
        return new RemoteProjectFile_1.RemoteProjectFile(new Identifier_model_1.Identifier(fileId), this.backendAPISevice.fetchImage(fileId)
            .map(function (arrayBuffer) { return _this.convertToImageBinary(arrayBuffer); }));
    };
    RemoteProjectFileService.prototype.fetchAllRemoteProjects = function () {
        var _this = this;
        return this.backendAPISevice.fetchAllImageIds()
            .map(function (response) { return response; })
            .flatMap(function (files) { return Observable_1.Observable.from(files); })
            .map(function (identifier) { return identifier._id; })
            .map(function (id) { return _this.fetchRemoteProject(id); });
    };
    RemoteProjectFileService.prototype.removeProject = function (projectToRemove) {
        return this.backendAPISevice.deleteImage(projectToRemove.getIdentifier());
    };
    RemoteProjectFileService.prototype.convertToImageBinary = function (arrayBuffer) {
        var binary = '';
        var bytes = new Uint8Array(arrayBuffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
    };
    RemoteProjectFileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService, window_1.WindowRef])
    ], RemoteProjectFileService);
    return RemoteProjectFileService;
}());
exports.RemoteProjectFileService = RemoteProjectFileService;
//# sourceMappingURL=RemoteProjectFile.service.js.map