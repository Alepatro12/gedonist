import { sendRequestAPI } from './../api/pop-up-notification';

/**
 * @const
 * @type {number} Ten seconds
 */
const TEN_SECONDS = 10 * 1000;

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'pop-up-notification/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'pop-up-notification/TOGGLE_IS_DISABLED';

/**
 * @const
 * @type {string} Action type - show pop up
 */
const SHOW = 'pop-up-notification/SHOW';

/**
 * @const
 * @type {string} Action type - set response
 */
const SET_RESPONSE = 'pop-up-notification/SET_RESPONSE';

/**
 * @const
 * @type {string} Action type - clear data
 */
const CLEAR_DATA = 'pop-up-notification/CLEAR_DATA';

const initialState = {
	url: '',
	text: '',
	data: {},
	lifetime: 0,
	isShow: false,
	isUpdate: false,
	isFetching: false,
	isDisabled: false,
	error: {
		code: 0,
		text: '',
	},
};

/**
 * Reducer the pop up notification
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const PopUpNotificationReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case SHOW: {
			return {
				...state,
				isShow: true,
				isUpdate: false,
				url: action.url,
				text: action.text,
				data: action.data,
				lifetime: action.lifetime,
				error: {
					code: 0,
					text: '',
				},
			};
		}
		case CLEAR_DATA: {
			return {
				...state,
				url: '',
				text: '',
				data: {},
				lifetime: 0,
				isShow: false,
			};
		}
		case SET_RESPONSE: {
			return {
				...state,
				url: '',
				text: '',
				data: {},
				lifetime: 0,
				isShow: false,
				isUpdate: true,
				error: { ...action.error },
			};
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching,
			};
		}
		case TOGGLE_IS_DISABLED: {
			return {
				...state,
				isDisabled: action.isDisabled,
			};
		}
		default:
			return state;
	}
};

/**
 * Set response
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} error
 * @returns {Object}
 */
const setResponse = ({
	error = {},
}) => {
	return {
		error,
		type: SET_RESPONSE,
	};
};

/**
 * Set fetching
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching
 * @returns {Object}
 */
const setIsFetching = (isFetching = false) => {
	return {
		isFetching,
		type: TOGGLE_IS_FETCHING,
	};
};

/**
 * Set disabled
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isDisabled
 * @returns {Object}
 */
const setIsDisabled = (isDisabled = false) => {
	return {
		isDisabled,
		type: TOGGLE_IS_DISABLED,
	};
};

/**
 * Set toggle
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isToggle
 * @returns {Function}
 */
const setToggle = (isToggle = false) => {
	return (dispatch) => {
		dispatch(setIsFetching(isToggle));
		dispatch(setIsDisabled(isToggle));
	}
};

/**
 * Send request
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} url Request URL
 * @param {Object} data Data for request
 * @returns {Function}
 */
export const sendRequest = (url = '', data = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await sendRequestAPI(url, data);

		dispatch(setResponse(response));
		dispatch(setToggle(false));
	}
};

/**
 * Show pop up
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} url Request URL
 * @param {String} text Pop up text
 * @param {Object} data Data for request
 * @param {Number} lifetime Popup lifetime
 * @returns {Function}
 */
export const showPopUp = (url = '', text = '', data = {}, lifetime = TEN_SECONDS) => {
	return async (dispatch) => {
		dispatch({
			url,
			text,
			data,
			lifetime,
			type: SHOW,
		});
	}
};

/**
 * Clear data
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Function}
 */
export const clearData = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_DATA });
	}
};

export default PopUpNotificationReducer;
