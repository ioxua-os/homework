"use strict";
exports.__esModule = true;
var express_1 = require("express");
var service_1 = require("../../service");
var router = express_1.Router();
router.get('/assignment', function (req, res) {
    Promise.all([
        service_1.SubjectService.getInstance().list(),
        service_1.TeacherService.getInstance().list()
    ])
        .then(function (results) {
        var subjects = results[0];
        var teachers = results[1];
        res.render('admin/assignment', { subjects: subjects, teachers: teachers });
    });
});
exports.AssignmentController = router;
