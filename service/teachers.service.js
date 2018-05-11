"use strict";
exports.__esModule = true;
var nedb_promise_1 = require("nedb-promise");
var model_1 = require("../model");
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = new nedb_promise_1.datastore();
    }
    UserService.getInstance = function () {
        if (!UserService.instance) {
            UserService.instance = new UserService();
            UserService.instance._mockValues();
        }
        return UserService.instance;
    };
    UserService.prototype.login = function (login, passwd) {
        return this.users.findOne({ login: login, passwd: passwd });
    };
    UserService.prototype.save = function (what) {
        return this.users.insert(what);
    };
    UserService.prototype.getById = function (id) {
        return this.users.findOne({ _id: id });
    };
    UserService.prototype.list = function () {
        return this.users.find({});
    };
    UserService.prototype.edit = function (what) {
        return this.users.update({ _id: what._id }, what);
    };
    UserService.prototype["delete"] = function (what) {
        var key = what instanceof model_1.User ? what._id :
            typeof what == 'string' ? what : null;
        if (!key)
            throw new Error('What must be either an number or instance of User');
        return this.users.remove({ _id: key });
    };
    UserService.prototype._mockValues = function () {
        this.users.insert([
            new model_1.User("admin@admin.admin", "admin", model_1.UserType.ADMIN),
            new model_1.User("profelias@fatec.br", "profelias", model_1.UserType.TEACHER),
            new model_1.User("profedith@fatec.br", "profedith", model_1.UserType.TEACHER),
            new model_1.User("aluno@fatec.br", "aluno", model_1.UserType.STUDENT),
            new model_1.User("aluna@fatec.br", "aluna", model_1.UserType.STUDENT)
        ]);
    };
    return UserService;
}());
exports.UserService = UserService;
