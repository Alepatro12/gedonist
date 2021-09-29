import * as axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost/',
	withCredentials: true
});

export const checkUserAPI = (getParameter = '') => {
	return instance
		.get(`auth/auto-authenticate.php${getParameter}`)
		.then(response => response.data)
	;
}

export const getLogoutAPI = (name) => {
	return instance
		.get(`auth/logout.php?name=${name}`)
		.then(response => response.data)
	;
}

export const getLoginAPI = (password, name, remember) => {
	return instance
		.get(`auth/login.php?password=${password}&name=${name}&remember=${remember}`)
		.then(response => response.data)
	;
}

export const getRegistrationAPI = (name, email, password, passwordValid) => {
	return instance
		.get(`auth/registration.php?name=${name}&email=${email}&password=${password}&passwordValid=${passwordValid}`)
		.then(response => {
			console.log(response);
			return response.data;
		})
	;
}