import * as Constants from "../constants"
import { HWResponse } from "../model";

export function authRequired(role: string) {
	return (req, res, next) => {
		const loggedIn = req.session[Constants.SESSION_KEYS.loggedInUser]
		if(loggedIn) {
			if(loggedIn.role == role) {
				next()
			}
		}

		const response: HWResponse = Constants.DEFAULT_ERRORS.accessDenied

		res
			.status(403)
			.render('error', { response }) // Access denied
	}
}