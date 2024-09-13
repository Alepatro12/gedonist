import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}admin-repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Get admin menu of repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @returns {Object}
 */
export const getMenuAPI = (userId = 0) => {
	return instance
		.post('repetition-controller.php', { userId })
		.then(response => response.data)
};
