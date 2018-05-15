import { Router } from "express"

import { SubjectController } 	from "./admin/subject.controller";
import { TeacherController } 	from "./admin/teacher.controller";
import { AssignmentController } from './admin/assignment.controller'

const router: Router = Router()

router.use(SubjectController)
router.use(TeacherController)
router.use(AssignmentController)

export const AdminController = router
