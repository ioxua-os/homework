"use strict";
exports.__esModule = true;
var express_1 = require("express");
var service_1 = require("../../service");
var model_1 = require("../../model");
var router = express_1.Router();
router.get('/subjects', function (req, res) {
    Promise.all([
        service_1.SubjectService.getInstance().list(),
        service_1.TeacherService.getInstance().list()
    ])
        .then(function (results) {
        var subjects = results[0];
        var teachers = results[1];
        res.render('admin/subjects', { subjects: subjects, teachers: teachers });
    });
});
router.post('/subject', function (req, res) {
    var subject = instantiateSubject(req);
    Promise.all([
        service_1.SubjectService.getInstance().save(subject),
        service_1.SubjectService.getInstance().list()
    ])
        .then(function (data) {
        var subjects = data[1];
        subjects.push(subject);
        res.render('admin/subjects', { subjects: subjects });
    });
});
router["delete"]('/subject/:id', function (req, res) {
    service_1.SubjectService.getInstance()["delete"](req.params.id).then(function (teachers) {
        res.redirect('admin/subjects');
    });
});
// Edit
router.get('/subject/:id', function (req, res) {
    Promise.all([
        service_1.SubjectService.getInstance().list(),
        service_1.SubjectService.getInstance().getById(req.params.id),
        service_1.TeacherService.getInstance().list()
    ])
        .then(function (data) {
        var subjects = data[0];
        var subject = data[1];
        var teachers = data[2];
        res.render('admin/subjects', { subjects: subjects, subject: subject, teachers: teachers });
    });
});
router.put('/subject/:id', function (req, res) {
    var subject = instantiateSubject(req);
    service_1.SubjectService.getInstance().edit(subject).then(function (data) {
        res.redirect('/admin/subjects');
    });
});
function instantiateSubject(req) {
    var subject = new model_1.Subject(req.body.code, req.body.name);
    if (req.params.id)
        subject._id = req.params.id;
    if (req.body.teacherId != -1) {
        subject.teacher = new model_1.Teacher();
        subject.teacher._id = req.body.teacherId;
    }
    return subject;
}
exports.SubjectController = router;
