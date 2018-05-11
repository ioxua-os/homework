import { read } from "fs/promises";
import { HWResponse } from "./model";

const prefix = "HW_"

function buildError(message: string, detail: string, httpCode?: number) {
	const err = HWResponse.error()
	err.message = message
	err.detail = detail

	if(httpCode)
		err.httpCode = httpCode

	return err
}

export const SESSION_KEYS = {
	loggedInUser: prefix + "LOGGED_IN_USER"
}

export const DEFAULT_ERRORS = {
	loginError: (function() {
		return buildError('Erro na autenticação', 'Email ou senha errados')
	})(),
	accessDenied: (function() {
		return buildError('Acesso negado', 'Você não tem acesso a essa página', 403)
	})(),
	serverError: (function() {
		return buildError('Erro interno', 'Ocorreu um erro no servidor. Tente novamente mais tarde', 500)
	})()
}