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
var Object_util_1 = require("../../util/Object.util");
var ImageUploadService = /** @class */ (function () {
    function ImageUploadService(backendAPIService) {
        this.backendAPIService = backendAPIService;
    }
    ImageUploadService.prototype.uploadImage = function (reachFile) {
        var _this = this;
        return reachFile
            .filter(Object_util_1.isDefined)
            .map(function (reachFile) {
            var formData = new FormData();
            /**
             * The name that we append to the form has to correspond
             * to the name of the parameter in the method signature
             * in the REST controller.
             */
            formData.append('projectFile', reachFile);
            return formData;
        }).flatMap(function (formData) {
            return _this.backendAPIService.postImage(formData);
        });
    };
    ImageUploadService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService])
    ], ImageUploadService);
    return ImageUploadService;
}());
exports.ImageUploadService = ImageUploadService;
//# sourceMappingURL=ImageUpload.service.js.map