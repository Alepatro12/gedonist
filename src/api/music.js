import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}music/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
		.post('search.php', { searchLine })
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
		.post('search-performer.php', { userId, performerId })
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
 * @param {number} musicianId Artist ID
 * @param {boolean} isDelete Flag remove from collection
 * @param {number} collectionId
 * @returns {Object}
 */
export const addPerformerAPI = (
	userId = 0,
	musicianId = 0,
	isDelete = false,
	collectionId = 0
) => {
	return instance
		.post('add-performer.php', { userId, musicianId, isDelete, collectionId })
		.then(response => response.data)
	;
};

/**
 * Get the user's music artist collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} userName Username
 * @returns {Object}
 */
export const getCollectionsAPI = (userName = '') => {
	return instance
		.post('collection.php', { userName })
		.then(response => response.data)
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
		.post('is-add-performer.php', { userId, performerId })
		.then(response => response.data)
	;
};

/**
 * Get the user's music artist collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} musicianId Musician ID
 * @returns {Object}
 */
export const getUserCollectionsAPI = (userId = 0, musicianId = 0) => {
	return instance
		.post('collection.php', { userId, musicianId })
		.then(response => response.data)
};

/**
 * Get the user's music artist collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} musicianId Musician ID
 * @param {String} collectionName
 * @returns {Object}
 */
export const getCreateCollectionAPI = (collectionName = '', userId = 0, musicianId = 0) => {
	return instance
		.post('add-collection.php', { userId, musicianId, collectionName })
		.then(response => response.data)
};

/**
 * Get the user's music artist collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} collectionId Collection ID
 * @returns {Object}
 */
export const getCollectionElementsAPI = (collectionId = 0) => {
	return instance
		.post('collection.php', { collectionId })
		.then(response => response.data)
};

/**
 * Get the change user's music artist collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} collectionId collection ID
 * @param {String} collectionName
 * @returns {Object}
 */
export const getChangeCollectionAPI = (collectionName = '', userId = 0, collectionId = 0) => {
	return instance
		.post('change-collection.php', { userId, collectionId, collectionName })
		.then(response => response.data)
};

/**
 * Delete collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId User ID
 * @param {number} collectionId collection ID
 * @param {String} collectionName
 * @returns {Object}
 */
export const deleteCollectionAPI = (userId = 0, collectionId = 0) => {
	return instance
		.post('delete-collection.php', { userId, collectionId })
		.then(response => response.data)
};