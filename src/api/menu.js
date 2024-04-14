import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}menu/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Get menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} userType User type
 * @param {bool} isAdminPanel Admin panel pages flag
 * @returns {Object}
 */
export const getMenuAPI = (userId = 0, userType = 0, isAdminPanel = false) => {
	return instance
		.post('menu-controller.php', { userId, userType, isAdminPanel })
		.then(response => response.data)
};
