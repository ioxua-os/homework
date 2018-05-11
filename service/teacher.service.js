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
var TeacherService = /** @class */ (function (_super) {
    __extends(TeacherService, _super);
    function TeacherService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeacherService.prototype._mockValues = function () {
        this.datastore.insert([
            new model_1.Teacher("Elias", "111.222.333-96", new model_1.User("profelias@fatec.br", "profelias", model_1.UserType.TEACHER)),
            new model_1.Teacher("Edith", "222.333.444-69", new model_1.User("profedith@fatec.br", "profedith", model_1.UserType.TEACHER)),
            new model_1.Teacher("Leandro", "333.444.555-75", new model_1.User("ll@fatec.br", "luque", model_1.UserType.TEACHER))
        ]);
    };
    TeacherService.getInstance = function () {
        if (!TeacherService.instance) {
            TeacherService.instance = new TeacherService();
            TeacherService.instance._mockValues();
        }
        return TeacherService.instance;
    };
    TeacherService.prototype.getInstance = function () {
        return TeacherService.getInstance();
    };
    return TeacherService;
}(abstract_service_1.AbstractService));
exports.TeacherService = TeacherService;
