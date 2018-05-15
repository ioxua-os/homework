"use strict";
exports.__esModule = true;
var express_1 = require("express");
var subject_controller_1 = require("./admin/subject.controller");
var teacher_controller_1 = require("./admin/teacher.controller");
var router = express_1.Router();
router.use(subject_controller_1.SubjectController);
router.use(teacher_controller_1.TeacherController);
exports.AdminController = router;
