import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Get info about discipline
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId
 * @returns {Object}
 */
export const getDisciplineAPI = (userId = 0, disciplineId = 0) => {
	return instance
		.post('discipline-controller.php', { userId, disciplineId })
		.then(response => response.data)
};

/**
 * Change priority of quest
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data Data of quest
 * @returns {Object}
 */
export const getChangeQuestionAPI = (data = {}) => {
	return instance
		.post('discipline-repeat-controller.php', data)
		.then(response => response.data)
};
