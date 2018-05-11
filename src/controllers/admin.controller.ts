import { Router, Request, Response } from "express"

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
	res.render('admin/index')
})

export const AdminController = router
