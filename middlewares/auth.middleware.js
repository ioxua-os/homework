"use strict";
exports.__esModule = true;
var Constants = require("../constants");
function authRequired(role) {
    return function (req, res, next) {
        var loggedIn = req.session[Constants.SESSION_KEYS.loggedInUser];
        if (loggedIn) {
            if (loggedIn.role == role) {
                next();
            }
        }
        var response = Constants.DEFAULT_ERRORS.accessDenied;
        res
            .status(403)
            .render('error', { response: response }); // Access denied
    };
}
exports.authRequired = authRequired;
