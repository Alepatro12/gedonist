import * as axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}gma/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Get nominations for year
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} year
 * @returns {Object}
 */
export const getNominationsAPI = (year = 2024) => {
	return instance
		.post('nominations.php', { year })
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
 * @returns {Object}
 */
export const getNomineesAPI = (nominationId = 0, year = 2024) => {
	return instance
		.post('nominees.php', { nominationId, year })
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
