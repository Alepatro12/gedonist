import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}menu/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

/**
 * Get menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} parameters
 * @returns {Object}
 */
export const getMenuAPI = (parameters) => {
	return instance
		.post('menu-controller.php', parameters)
		.then(response => response.data);
};
