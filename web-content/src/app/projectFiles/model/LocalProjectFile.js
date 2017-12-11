"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var LocalProjectFile = /** @class */ (function () {
    function LocalProjectFile(file) {
        if (file === void 0) { file = Observable_1.Observable.empty(); }
        var _this = this;
        this._loaded = false;
        this.repeat = new BehaviorSubject_1.BehaviorSubject(null);
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
    }
    LocalProjectFile.prototype.getName = function () {
        return this.selectedFile
            .map(function (file) { return file.toLocaleString(); });
    };
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
        return this.repeat;
    };
    return LocalProjectFile;
}());
exports.LocalProjectFile = LocalProjectFile;
//# sourceMappingURL=LocalProjectFile.js.map