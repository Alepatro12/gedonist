import { checkUserAPI, getLogoutAPI, getLoginAPI, getRegistrationAPI } from './../api/api'

const CHECK_AUTHENTICATION = 'checkAuthentication/CHECK_AUTHENTICATION';
const TOGGLE_IS_FETCHING = 'checkAuthentication/TOGGLE_IS_FETCHING';
const TOGGLE_IS_DISABLED = 'checkAuthentication/TOGGLE_IS_DISABLED';
const ATTEMPT_LOGIN = 'checkAuthentication/ATTEMPT_LOGIN';


let initialState = {
	isAuthenticate: false,
	isFetching: false,
	isDisabled: false,
	name: ''
};

let isAuthenticate;

const checkAuthenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_AUTHENTICATION:
			return {
				...state,
				isAuthenticate: action.isAuthenticate,
				name: action.name || ''
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_IS_DISABLED:
			return {
				...state,
				isDisabled: action.isDisabled,
			};
		case ATTEMPT_LOGIN:
			return {
				...state,
				isAuthenticate: action.isAuthenticate,
				name: action.name,
			};
		default:
			return state;
	}
};

export const checkUser = (name) => {
	isAuthenticate = name ? true : false;
	return {
		type: CHECK_AUTHENTICATION,
		isAuthenticate,
		name
	}
};

const setIsFetching = (isFetching) => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching,
	}
};

const setIsDisabled = (isDisabled) => {
	return {
		type: TOGGLE_IS_DISABLED,
		isDisabled,
	}
};

const attemptLogin = (name, isAuthenticate) => {
	return {
		type: ATTEMPT_LOGIN,
		isAuthenticate,
		name
	}
};

const setToggle = (isToggle) => {
	return (dispatch) => {
		dispatch(setIsFetching(isToggle));
		dispatch(setIsDisabled(isToggle));
	}
};

export const getUser = (getParameter = '') => {
	return async (dispatch) => {
		dispatch(setIsFetching(true));

		const response = await checkUserAPI(getParameter);

		if (response.resultCode === 0) {
			dispatch(checkUser(response.username));
		} else {
			dispatch(checkUser());
		}

		dispatch(setIsFetching(false));
	}
};

export const getLogout = (name) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getLogoutAPI(name);
		if (response.resultCode === 0) {
			dispatch(checkUser());
		}

		dispatch(setToggle(false));
	}
};

export const getLogin = (password, name, remember) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getLoginAPI(password, name, remember);
		if (response.resultCode === 0) {
			dispatch(attemptLogin(response.username, Boolean(response.username)));
		} else {
			// const action = stopSubmit('login', {_error: 'Что-то пошло не так, попробуйте позже'});
			// dispatch(action);
		}

		dispatch(setToggle(false));
	}
};

export const getRegistration = (name, email, password, passwordValid) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getRegistrationAPI(name, email, password, passwordValid);
		if (response.resultCode === 0) {
			dispatch(attemptLogin(response.username, Boolean(response.username)));
		} else {
			// const action = stopSubmit('registration', {_error: 'Что-то пошло не так, попробуйте позже'});
			// dispatch(action);
		}

		dispatch(setToggle(false));
	}
};

export default checkAuthenticationReducer;