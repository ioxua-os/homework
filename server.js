"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var session = require("express-session");
var compileSass = require("express-compile-sass");
var Constants = require("./constants");
var model_1 = require("./model");
var users_service_1 = require("./service/users.service");
var auth_middleware_1 = require("./middlewares/auth.middleware");
var controllers_1 = require("./controllers");
var app = express();
var port = Number(process.env.PORT) || 3000;
var root = process.cwd();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compileSass({
    root: 'static',
    sourceMap: true,
    watchFiles: true,
    logToConsole: true
}));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'eu sou MA-RA-VI-LHO-SO' }));
app.use('/admin', auth_middleware_1.authRequired(model_1.UserType.ADMIN), controllers_1.AdminController);
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/login', 
// TODO Implement form validation
function (req, res) {
    users_service_1.UserService.getInstance().login(req.body['email'], req.body['password'])
        .then(function (usr) {
        console.log(usr);
        if (usr) {
            req.session[Constants.SESSION_KEYS.loggedInUser] = usr;
            res.redirect('/admin');
        }
        else
            res.render('login', { error: Constants.DEFAULT_ERRORS.loginError });
    })["catch"](function (err) {
        var response = Constants.DEFAULT_ERRORS.serverError;
        res.render('error', { response: response });
    });
});
app.listen(port, function () {
    console.log("Listening on port:", port);
});
