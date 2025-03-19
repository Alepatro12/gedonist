import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}admin-repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Create question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} disciplineId Discipline ID
 * @param {String} question
 * @param {String} answer
 * @returns {Object}
 */
export const getCreationQuestionAPI = (disciplineId = 0, question = '', answer = '') => {
	return instance
		.post('discipline-controller.php', { disciplineId, question, answer, isCreationQuestion: true })
		.then(response => response.data);
};

/**
 * Search questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} disciplineId Discipline ID
 * @param {String} request
 * @param {bool} isSearchAnswer Search by answer flag
 * @returns {Object}
 */
export const getSearchQuestionAPI = (disciplineId = 0, request = '', isSearchAnswer = false) => {
	return instance
		.post('discipline-controller.php', { disciplineId, request, isSearchAnswer })
		.then(response => response.data);
};

/**
 * Delete question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} questionId Question ID
 * @param {number} disciplineId Discipline ID
 * @returns {Object}
 */
export const deleteQuestionAPI = (data) => {
	return instance
		.post('discipline-controller.php', { isDeleteQuestion: true, ...data })
		.then(response => response.data);
};

/**
 * Edit question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} question Question object
 * @param {number} disciplineId Discipline ID
 * @returns {Object}
 */
export const editQuestionAPI = (data = {}, disciplineId = 0) => {
	return instance
		.post('discipline-controller.php', { disciplineId, ...data })
		.then(response => response.data);
};
