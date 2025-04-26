import * as axios from 'axios';

import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Rename subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Object}
 */
export const renameSubjectAPI = (data = {}) => {
	return instance
		.post('edit-subject-controller.php', { ...data })
		.then(response => response.data);
};
