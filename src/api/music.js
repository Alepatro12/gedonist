import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}music/`,
	withCredentials: true
});

/**
 * Find music artists
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} searchLine Part of a name or alias
 * @returns {Object}
 */
export const getPerformersAPI = (searchLine = '') => {
	return instance
		.get(`search.php?searchLine=${searchLine}`)
		.then(response => response.data)
	;
};

/**
 * Get information about a music artist
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} performerId Artist ID
 * @returns {Object}
 */
export const getPerformerAPI = (userId = 0, performerId = 0) => {
	return instance
		.get(`search-performer.php?userId=${userId}&performerId=${performerId}`)
		.then(response => response.data)
	;
};

/**
 * Add or remove a music artist from the collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} performerId Artist ID
 * @param {boolean} isDelete Flag remove from collection
 * @returns {Object}
 */
export const addPerformerAPI = (userId = 0, performerId = 0, isDelete = false) => {
	return instance
		.get(`add-performer.php?userId=${userId}&performerId=${performerId}&isDelete=${isDelete}`)
		.then(response => response.data)
	;
};

/**
 * Get the user's music artist collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @returns {Object}
 */
export const getCollectionAPI = (userId = 0) => {
	return instance
		.get(`collection.php?userId=${userId}`)
		.then(response => response.data)
	;
};

/**
 * Get the flag for adding a music artist to the collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} performerId Artist ID
 * @returns {Object}
 */
export const getIsAddPerformerAPI = (userId = 0, performerId = 0) => {
	return instance
		.get(`is-add-performer.php?userId=${userId}&performerId=${performerId}`)
		.then(response => response.data)
	;
};