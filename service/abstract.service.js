"use strict";
exports.__esModule = true;
var nedb_promise_1 = require("nedb-promise");
var AbstractService = /** @class */ (function () {
    function AbstractService() {
        this.datastore = new nedb_promise_1.datastore();
    }
    AbstractService.prototype.save = function (what) {
        return this.datastore.insert(what);
    };
    AbstractService.prototype.getById = function (id) {
        return this.datastore.findOne({ _id: id });
    };
    AbstractService.prototype.list = function () {
        return this.datastore.find({});
    };
    AbstractService.prototype.edit = function (what) {
        return this.datastore.update({ _id: what._id }, what);
    };
    AbstractService.prototype["delete"] = function (what) {
        var key = typeof what == 'string' ? what : what._id;
        if (!key)
            throw new Error('What must be either an number or instance of User');
        return this.datastore.remove({ _id: key });
    };
    return AbstractService;
}());
exports.AbstractService = AbstractService;
