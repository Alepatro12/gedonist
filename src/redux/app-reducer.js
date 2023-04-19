import { getUser } from './account-data-reducer';

const SET_INITIALIZED = 'app/SET_INITIALIZED';

let initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
};

export const setInitialized = () => {
	return {
		type: SET_INITIALIZED,
	}
};

export const initializedApp = (getParameter = '') => {
	return async (dispatch) => {
		await dispatch(getUser(getParameter));
		dispatch(setInitialized());
	}
};

export default appReducer;