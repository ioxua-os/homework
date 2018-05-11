"use strict";
exports.__esModule = true;
var Datastore = require("nedb");
var Persistence = /** @class */ (function () {
    function Persistence() {
    }
    Persistence.prototype._init = function () {
        Persistence.isStarted = true;
    };
    Persistence.isStated = false;
    Persistence.users = new Datastore();
    return Persistence;
}());
exports.Persistence = Persistence;
