"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Identifier_model_1 = require("./Identifier.model");
var RemoteProjectFile = /** @class */ (function () {
    function RemoteProjectFile(identifier, file) {
        if (identifier === void 0) { identifier = new Identifier_model_1.Identifier(); }
        if (file === void 0) { file = Observable_1.Observable.empty(); }
        var _this = this;
        this.replaySubject = new ReplaySubject_1.ReplaySubject(1);
        this.loaded = false;
        this._name = Observable_1.Observable.empty();
        file.subscribe(function (blob) {
            _this.loaded = true;
            _this.replaySubject.next(blob);
        });
        this._rawFile = file;
        this._identifier = identifier;
        this._name = Observable_1.Observable.of(this.identifier.id);
    }
    RemoteProjectFile.prototype.setNewFile = function (file) {
        //todo: me?
    };
    RemoteProjectFile.prototype.getName = function () {
        return this._name;
    };
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
    RemoteProjectFile.prototype.isLoaded = function () {
        return this.loaded;
    };
    Object.defineProperty(RemoteProjectFile.prototype, "id", {
        get: function () {
            return this.identifier.id;
        },
        enumerable: true,
        configurable: true
    });
    RemoteProjectFile.prototype.imageBinary = function () {
        return this._rawFile;
    };
    return RemoteProjectFile;
}());
exports.RemoteProjectFile = RemoteProjectFile;
//# sourceMappingURL=RemoteProjectFile.js.map