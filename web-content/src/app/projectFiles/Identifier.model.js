"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier = /** @class */ (function () {
    function Identifier(id) {
        if (id === void 0) { id = ''; }
        this._id = id;
    }
    Object.defineProperty(Identifier.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=Identifier.model.js.map