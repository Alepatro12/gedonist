import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}auth/`,
	withCredentials: true
});

/**
 * Account registration confirmation
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} getParameter Email and token to confirm registration
 * @returns {Object}
 */
export const checkUserAPI = (getParameter = '') => {
	return instance
		.get(`auto-authenticate.php${getParameter}`)
		.then(response => response.data)
	;
};

/**
 * Logout
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} userName Username
 * @returns {Object}
 */
export const getLogoutAPI = (userName = '') => {
	return instance
		.get(`logout.php?name=${userName}`)
		.then(response => response.data)
	;
};

/**
 * Account login
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} password User password
 * @param {string} userName Username
 * @param {boolean} remember Flag remember user
 * @returns {Object}
 */
export const getLoginAPI = (password = '', userName = '', remember = false) => {
	return instance
		.get(`login.php?password=${password}&name=${userName}&remember=${remember}`)
		.then(response => response.data)
	;
};

/**
 * Register an account
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} userName Username
 * @param {string} email User email
 * @param {string} password User password
 * @param {string} passwordValid User password
 * @returns {Object}
 */
export const getRegistrationAPI = (userName = '', email = '', password = '', passwordValid = '') => {
	return instance
		.get(`registration.php?name=${userName}&email=${email}&password=${password}&passwordValid=${passwordValid}`)
		.then(response => response.data)
	;
};

/**
 * Password change request
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} email User email
 * @returns {Object}
 */
export const getChangePasswordAPI = (email = '') => {
	return instance
		.get(`change-password.php?email=${email}`)
		.then(response => response.data)
	;
};

/**
 * Change account password
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} password User password
 * @param {string} passwordValid User password
 * @param {string} token Password change token
 * @param {string} email User email
 * @returns {Object}
 */
export const getNewPasswordAPI = (password = '', passwordValid = '', token = '', email = '') => {
	return instance
		.get(`change-password.php?password=${password}&passwordValid=${passwordValid}&token=${token}&email=${email}`)
		.then(response => response.data)
	;
};