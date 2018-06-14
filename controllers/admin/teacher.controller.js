"use strict";
exports.__esModule = true;
var express_1 = require("express");
var service_1 = require("../../service");
var model_1 = require("../../model");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.redirect('admin/teachers');
});
router.get('/teachers', function (req, res) {
    service_1.TeacherService.getInstance().list().then(function (teachers) {
        res.render('admin/teachers', { teachers: teachers });
    });
});
router.post('/teacher', function (req, res) {
    var teacher = instantiateTeacher(req);
    Promise.all([
        service_1.TeacherService.getInstance().save(teacher),
        service_1.TeacherService.getInstance().list()
    ])
        .then(function (data) {
        var teachers = data[1];
        teachers.push(teacher);
        console.log(teachers);
        res.render('admin/teachers', { teachers: teachers });
    });
});
router["delete"]('/teacher/:id', function (req, res) {
    service_1.TeacherService.getInstance()["delete"](req.params.id).then(function (teachers) {
        res.redirect('admin/teachers');
    });
});
router.get('/teacher/edit/:id', function (req, res) {
    Promise.all([
        service_1.TeacherService.getInstance().list(),
        service_1.TeacherService.getInstance().getById(req.params.id)
    ])
        .then(function (data) {
        var teachers = data[0];
        var teacher = data[1];
        res.render('admin/teachers', { teachers: teachers, teacher: teacher });
    });
});
router.post('/teacher/edit/:id', function (req, res) {
    var teacher = instantiateTeacher(req);
    service_1.TeacherService.getInstance().edit(teacher).then(function (data) {
        res.redirect('admin/teachers');
    });
});
function instantiateTeacher(req) {
    var teacher = new model_1.Teacher(req.body.name, req.body.document, new model_1.User(req.body.email, req.body.passwd, model_1.UserType.TEACHER));
    if (req.params.id)
        teacher._id = req.params.id;
    return teacher;
}
exports.TeacherController = router;
