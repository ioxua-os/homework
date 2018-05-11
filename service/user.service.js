"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var model_1 = require("../model");
var abstract_service_1 = require("./abstract.service");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype._mockValues = function () {
        this.datastore.insert(new model_1.User("admin@admin.admin", "admin", model_1.UserType.ADMIN));
    };
    UserService.getInstance = function () {
        if (!UserService.instance) {
            UserService.instance = new UserService();
            UserService.instance._mockValues();
        }
        return UserService.instance;
    };
    UserService.prototype.getInstance = function () {
        return UserService.getInstance();
    };
    UserService.prototype.login = function (login, passwd) {
        return this.datastore.findOne({ login: login, passwd: passwd });
    };
    return UserService;
}(abstract_service_1.AbstractService));
exports.UserService = UserService;
