import * as axios from 'axios';

import { SERVER_BASE_URL } from './constants';

const instance = axios.create({
	baseURL: `${SERVER_BASE_URL}repetition/`,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
