"use strict";
exports.__esModule = true;
var model_1 = require("./model");
var prefix = "HW_";
function buildError(message, detail, httpCode) {
    var err = model_1.HWResponse.error();
    err.message = message;
    err.detail = detail;
    if (httpCode)
        err.httpCode = httpCode;
    return err;
}
exports.SESSION_KEYS = {
    loggedInUser: prefix + "LOGGED_IN_USER"
};
exports.DEFAULT_ERRORS = {
    loginError: (function () {
        return buildError('Erro na autenticação', 'Email ou senha errados');
    })(),
    accessDenied: (function () {
        return buildError('Acesso negado', 'Você não tem acesso a essa página', 403);
    })(),
    serverError: (function () {
        return buildError('Erro interno', 'Ocorreu um erro no servidor. Tente novamente mais tarde', 500);
    })()
};
