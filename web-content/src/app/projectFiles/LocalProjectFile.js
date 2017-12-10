"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Observable_1 = require("rxjs/Observable");
var LocalProjectFile = /** @class */ (function () {
    function LocalProjectFile(file) {
        if (file === void 0) { file = Observable_1.Observable.empty(); }
        var _this = this;
        this._loaded = false;
        this.repeat = new ReplaySubject_1.ReplaySubject(1);
        this._selectedFile = file;
        var self = this;
        this._selectedFile
            .subscribe(function (file) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                _this.repeat.next(fileReader.result);
                _this._loaded = true;
            };
            fileReader.readAsDataURL(file);
        });
        this._rawFile = this.repeat;
    }
    LocalProjectFile.prototype.isLoaded = function () {
        return this._loaded;
    };
    Object.defineProperty(LocalProjectFile.prototype, "selectedFile", {
        get: function () {
            return this._selectedFile;
        },
        enumerable: true,
        configurable: true
    });
    LocalProjectFile.prototype.imageBinary = function () {
        return this._rawFile;
    };
    return LocalProjectFile;
}());
exports.LocalProjectFile = LocalProjectFile;
//# sourceMappingURL=LocalProjectFile.js.map