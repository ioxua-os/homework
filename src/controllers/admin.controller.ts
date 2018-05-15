import { Router } from "express"
import { SubjectController } from "./admin/subject.controller";
import { TeacherController } from "./admin/teacher.controller";

const router: Router = Router()

router.use(SubjectController)
router.use(TeacherController)

export const AdminController = router
