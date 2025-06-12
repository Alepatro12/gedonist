import * as axios from 'axios';

import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: SERVER_BASE_URL,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/**
 * Send request
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} url request URL
 * @param {Object} data
 * @returns {Object}
 */
export const sendRequestAPI = (url = '', data = {}) => {
	return instance
		.post(url, data)
		.then(response => response.data);
};
