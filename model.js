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
var HWResponse = /** @class */ (function () {
    function HWResponse(type) {
        this.type = type.name;
    }
    HWResponse.error = function () {
        return new HWResponse(HWResponse.ERROR);
    };
    HWResponse.info = function () {
        return new HWResponse(HWResponse.INFO);
    };
    HWResponse.ERROR = { name: "Erro" };
    HWResponse.INFO = { name: "Informação" };
    return HWResponse;
}());
exports.HWResponse = HWResponse;
var Entity = /** @class */ (function () {
    function Entity() {
    }
    return Entity;
}());
exports.Entity = Entity;
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name, document, user) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.document = document;
        _this.user = user;
        return _this;
    }
    return Person;
}(Entity));
exports.Person = Person;
var UserType = /** @class */ (function () {
    function UserType() {
    }
    UserType.TEACHER = "Professor";
    UserType.STUDENT = "Aluno";
    UserType.ADMIN = "Administrador";
    return UserType;
}());
exports.UserType = UserType;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(login, passwd, role) {
        var _this = _super.call(this) || this;
        _this.login = login;
        _this.passwd = passwd;
        _this.role = role;
        return _this;
    }
    return User;
}(Entity));
exports.User = User;
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Teacher;
}(Person));
exports.Teacher = Teacher;
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Student;
}(Person));
exports.Student = Student;
var Assignment = /** @class */ (function (_super) {
    __extends(Assignment, _super);
    function Assignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Assignment;
}(Entity));
exports.Assignment = Assignment;
var FinishedAssignment = /** @class */ (function (_super) {
    __extends(FinishedAssignment, _super);
    function FinishedAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FinishedAssignment;
}(Entity));
exports.FinishedAssignment = FinishedAssignment;
var Subject = /** @class */ (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Subject;
}(Entity));
exports.Subject = Subject;
var Material = /** @class */ (function (_super) {
    __extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Material;
}(Entity));
exports.Material = Material;
