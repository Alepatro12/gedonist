import * as axios from 'axios';

const instance = axios.create({
	baseURL: '/eoeo/',
	withCredentials: true
});

export const checkUserAPI = (getParameter = '') => {
	return instance
		.get(`auth/auto-authenticate.php${getParameter}`)
		.then(response => response.data)
	;
}

export const getLogoutAPI = (userName) => {
	return instance
		.get(`auth/logout.php?name=${userName}`)
		.then(response => response.data)
	;
}

export const getLoginAPI = (password, userName, remember) => {
	return instance
		.get(`auth/login.php?password=${password}&name=${userName}&remember=${remember}`)
		.then(response => response.data)
	;
}

export const getRegistrationAPI = (userName, email, password, passwordValid) => {
	return instance
		.get(`auth/registration.php?name=${userName}&email=${email}&password=${password}&passwordValid=${passwordValid}`)
		.then(response => response.data)
	;
}

export const getChangePasswordAPI = (email) => {
	return instance
		.get(`auth/change-password.php?email=${email}`)
		.then(response => response.data)
	;
}

export const getNewPasswordAPI = (password, passwordValid, token, email) => {
	return instance
		.get(`auth/change-password.php?password=${password}&passwordValid=${passwordValid}&token=${token}&email=${email}`)
		.then(response => response.data)
	;
}