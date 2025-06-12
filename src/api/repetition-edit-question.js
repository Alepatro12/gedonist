import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Create question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {String} question
 * @param {String} answer
 * @returns {Object}
 */
export const getCreationQuestionAPI = (userId = 0, disciplineId = 0, question = '', answer = '') => {
	return instance
		.post('edit-question-controller.php', {
			userId,
			answer,
			question,
			disciplineId,
			isCreationQuestion: true,
		})
		.then(response => response.data);
};

/**
 * Search questions or answers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {String} request
 * @param {bool} isSearchAnswer Search by answer flag
 * @returns {Object}
 */
export const getSearchQuestionAPI = (userId = 0, disciplineId = 0, request = '', isSearchAnswer = false) => {
	return instance
		.post('edit-question-controller.php', {
			userId,
			request,
			disciplineId,
			isSearchAnswer
		})
		.then(response => response.data);
};

/**
 * Delete question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Object}
 */
export const deleteQuestionAPI = (data) => {
	return instance
		.post('edit-question-controller.php', { isDeleteQuestion: true, ...data })
		.then(response => response.data);
};

/**
 * Edit question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @param {number} disciplineId Discipline ID
 * @returns {Object}
 */
export const editQuestionAPI = (data = {}, disciplineId = 0) => {
	return instance
		.post('edit-question-controller.php', { disciplineId, ...data })
		.then(response => response.data);
};
