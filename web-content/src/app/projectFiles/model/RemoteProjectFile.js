"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Identifier_model_1 = require("./Identifier.model");
var RemoteProjectFile = /** @class */ (function () {
    /**
     *
     * @param {Identifier} identifier the unique identifier that will allow use of
     *                      the backend rest api.
     * @param {Observable<any>} remoteProjectFile project file from the backend
     */
    function RemoteProjectFile(identifier, remoteProjectFile) {
        if (identifier === void 0) { identifier = new Identifier_model_1.Identifier(); }
        if (remoteProjectFile === void 0) { remoteProjectFile = Observable_1.Observable.empty(); }
        var _this = this;
        this.imageBinaryReplay = new ReplaySubject_1.ReplaySubject(1);
        remoteProjectFile.subscribe(function (imageBinary) {
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
    /**
     * Replaces the current remote project file with the new binary.
     *
     * I am kind of torn at the moment because one you set the binary again
     * it is no longer a remote project file and does not fit int this current
     * abstraction.
     * @param {File} file
     */
    RemoteProjectFile.prototype.setNewFile = function (file) {
        //todo: me?
    };
    RemoteProjectFile.prototype.getIdentifier = function () {
        return this._identifier.id;
    };
    /**
     * Actual binary received from the backend service.
     * @returns {Observable<any>}
     */
    RemoteProjectFile.prototype.imageBinary = function () {
        return this.imageBinaryReplay;
    };
    return RemoteProjectFile;
}());
exports.RemoteProjectFile = RemoteProjectFile;
//# sourceMappingURL=RemoteProjectFile.js.map