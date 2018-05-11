import * as Constants from "../constants"
import { HWResponse } from "../model";

export function authRequired(role: string) {
	return (req, res, next) => {
		const loggedIn = req.session[Constants.SESSION_KEYS.loggedInUser]
		if(loggedIn) {
			console.log('logado!')
			if(loggedIn.role == role) {
				console.log('tem a role certa :D')
				next()
			} else 
				console.log("nn tem a role certa ")
		}

		const response: HWResponse = Constants.DEFAULT_ERRORS.accessDenied

		res
			.status(403)
			.render('error', { response }) // Access denied
	}
}