import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Get menu of repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {string} ownerName Page owner name
 * @returns {Object}
 */
export const getMenuAPI = (userId = 0, ownerName = '') => {
	return instance
		.post('repetition-controller.php', { userId, ownerName })
		.then(response => response.data)
};
