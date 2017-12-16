"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Identifier_model_1 = require("./Identifier.model");
var RemoteProjectFile = /** @class */ (function () {
    function RemoteProjectFile(identifier, remoteProjectFile) {
        if (identifier === void 0) { identifier = new Identifier_model_1.Identifier(); }
        if (remoteProjectFile === void 0) { remoteProjectFile = Observable_1.Observable.empty(); }
        var _this = this;
        this.imageBinaryReplay = new ReplaySubject_1.ReplaySubject(1);
        this.loaded = false;
        remoteProjectFile.subscribe(function (imageBinary) {
            _this.loaded = true;
            _this.imageBinaryReplay.next(imageBinary);
        });
        this._identifier = identifier;
        this._name = this.identifier.id;
    }
    Object.defineProperty(RemoteProjectFile.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (value) {
            this._identifier = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RemoteProjectFile.prototype, "id", {
        get: function () {
            return this.identifier.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Replaces the current remote project file with the new binary
     * @param {File} file
     */
    RemoteProjectFile.prototype.setNewFile = function (file) {
        //todo: me?
    };
    RemoteProjectFile.prototype.getName = function () {
        return this._name;
    };
    RemoteProjectFile.prototype.isLoaded = function () {
        return this.loaded;
    };
    RemoteProjectFile.prototype.imageBinary = function () {
        return this.imageBinaryReplay;
    };
    return RemoteProjectFile;
}());
exports.RemoteProjectFile = RemoteProjectFile;
//# sourceMappingURL=RemoteProjectFile.js.map