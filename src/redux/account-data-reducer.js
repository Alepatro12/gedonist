import { checkUserAPI, getLogoutAPI, getLoginAPI, getRegistrationAPI } from './../api/api'

const CHECK_AUTHENTICATION = 'checkAuthentication/CHECK_AUTHENTICATION';
const ATTEMPT_REGISTRATION = 'checkAuthentication/ATTEMPT_REGISTRATION';
const TOGGLE_IS_FETCHING = 'checkAuthentication/TOGGLE_IS_FETCHING';
const TOGGLE_IS_DISABLED = 'checkAuthentication/TOGGLE_IS_DISABLED';
const ATTEMPT_LOGIN = 'checkAuthentication/ATTEMPT_LOGIN';


let initialState = {
	userId: 0,
	userName: '',
	emailStatus: 0,
	isFetching: false,
	isDisabled: false,
	isAuthenticate: false,
	errors: {
		loginError: {
			errorCode: 0,
			errorText: '',
		},
		registrationError: {
			errorCode: 0,
			errorText: '',
		},
	},
};

const checkAuthenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_AUTHENTICATION:
			return {
				...state,
				userId: action.userId,
				userName: action.userName,
				emailStatus: action.emailStatus,
				isAuthenticate: action.isAuthenticate,
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
				userId: action.userId,
				userName: action.userName,
				emailStatus: action.emailStatus,
				isAuthenticate: action.isAuthenticate,
				errors: {
					registrationError: { ...state.errors.registrationError },
					loginError: {
						...state.errors.loginError,
						errorCode: action.errorCode,
						errorText: action.errorText,
					},
				},
			};
		case ATTEMPT_REGISTRATION:
			return {
				...state,
				userId: action.userId,
				userName: action.userName,
				emailStatus: action.emailStatus,
				isAuthenticate: action.isAuthenticate,
				errors: {
					loginError: { ...state.errors.loginError },
					registrationError: {
						...state.errors.registrationError,
						errorCode: action.errorCode,
						errorText: action.errorText,
					},
				},
			};
		default:
			return state;
	}
};

export const checkUser = ({ userName = '', userId = 0, emailStatus = 0, errorCode = 0, errorText = '' }) => {
	return {
		userId,
		userName,
		errorCode,
		errorText,
		emailStatus,
		type: CHECK_AUTHENTICATION,
		isAuthenticate: userId && userName && !errorCode ? true : false,
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

const attemptLogin = ({ userName = '', userId = 0, emailStatus = 0, errorCode = 0, errorText = '' }) => {
	return {
		userId,
		userName,
		errorCode,
		errorText,
		emailStatus,
		type: ATTEMPT_LOGIN,
		isAuthenticate: userId && userName && !errorCode ? true : false,
	}
};

const attemptRegistration = ({ userName = '', userId = 0, emailStatus = 0, errorCode = 0, errorText = '' }) => {
	return {
		userId,
		userName,
		errorCode,
		errorText,
		emailStatus,
		type: ATTEMPT_REGISTRATION,
		isAuthenticate: userId && userName && !errorCode ? true : false,
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

		dispatch(checkUser({ ...response }));
		dispatch(setIsFetching(false));
	}
};

export const getLogout = (userName) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getLogoutAPI(userName);

		dispatch(checkUser({ ...response }));
		dispatch(setToggle(false));
	}
};

export const getLogin = (password, userName, remember) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getLoginAPI(password, userName, remember);

		dispatch(attemptLogin({ ...response }));
		dispatch(setToggle(false));
	}
};

export const getRegistration = (userName, email, password, passwordValid) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getRegistrationAPI(userName, email, password, passwordValid);

		dispatch(attemptRegistration({ ...response }));
		dispatch(setToggle(false));
	}
};

export default checkAuthenticationReducer;