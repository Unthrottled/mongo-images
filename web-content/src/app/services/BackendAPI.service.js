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
var http_1 = require("@angular/common/http");
var BackendAPIService = /** @class */ (function () {
    function BackendAPIService(httpClient) {
        this.httpClient = httpClient;
    }
    BackendAPIService.prototype.postImage = function (formData) {
        return this.httpClient.post('./api/image/save', formData, {
            responseType: 'text'
        });
    };
    BackendAPIService.prototype.fetchImage = function (_id) {
        return this.httpClient.get('./api/image/get/' + _id, {
            responseType: 'arraybuffer'
        });
    };
    BackendAPIService.prototype.fetchAllImageIds = function () {
        return this.httpClient.get('./api/images', {
            responseType: 'json'
        });
    };
    BackendAPIService.prototype.deleteImage = function (_id) {
        return this.httpClient.delete('./api/image/delete/' + _id, {
            responseType: 'json'
        }).map(function (response) { return (response === true); });
    };
    BackendAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], BackendAPIService);
    return BackendAPIService;
}());
exports.BackendAPIService = BackendAPIService;
//# sourceMappingURL=BackendAPI.service.js.map