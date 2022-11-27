import {
	getCollectionAPI,
	getPerformersAPI,
	getPerformerAPI,
	addPerformerAPI,
} from './../api/api'

const GET_RERFORMER = 'music/GET_RERFORMER';
const GET_RERFORMERS = 'music/GET_RERFORMERS';
const GET_COLLECTION = 'music/GET_COLLECTION';
const GET_ADD_RERFORMER = 'music/GET_ADD_RERFORMER'
const TOGGLE_IS_FOCUS = 'music/TOGGLE_IS_FOCUS';
const TOGGLE_IS_FETCHING = 'music/TOGGLE_IS_FETCHING';
const TOGGLE_IS_DISABLED = 'music/TOGGLE_IS_DISABLED';


let initialState = {
	isAddPerformer: false,
	isFetching: false,
	isDisabled: false,
	isFocus: false,
	collection: [],
	performers: [],
	performer: {},
	errorCode: 0,
};

const musicReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RERFORMERS:
			return {
				...state,
				performers: [ ...action.performers ],
			};
		case GET_COLLECTION:
			return {
				...state,
				collection: [ ...action.collection ],
			};
		case TOGGLE_IS_FOCUS:
			return {
				...state,
				isFocus: action.isFocus,
			};
		case GET_RERFORMER:
			return {
				...state,
				performer: { ...action.performer },
				isAddPerformer: action.isAddPerformer,
			};
		case GET_ADD_RERFORMER:
			return {
				...state,
				errorCode: action.errorCode,
				isAddPerformer: action.isAddPerformer,
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
		default:
			return state;
	}
};

const setPerformers = ({ performers = [], errorCode = 0 }) => {
	return {
		errorCode,
		performers,
		type: GET_RERFORMERS,
	}
};

const setCollection = ({ collection = [], errorCode = 0 }) => {
	return {
		errorCode,
		collection,
		type: GET_COLLECTION,
	}
};

const setPerformer = ({ performer = {}, errorCode = 0, isAddPerformer = false }) => {
	return {
		errorCode,
		performer,
		isAddPerformer,
		type: GET_RERFORMER,
	}
};

const setAddPerformer = ({ errorCode = 0, isAddPerformer = false }) => {
	return {
		errorCode,
		isAddPerformer,
		type: GET_ADD_RERFORMER,
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

const setToggle = (isToggle) => {
	return (dispatch) => {
		dispatch(setIsFetching(isToggle));
		dispatch(setIsDisabled(isToggle));
	}
};

export const findPerformers = (searchLine = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getPerformersAPI(searchLine);

		dispatch(setPerformers(response));
		dispatch(setToggle(false));
	}
};

export const setIsFocus = (isFocus) => {
	return {
		type: TOGGLE_IS_FOCUS,
		isFocus,
	}
};

export const findPerformer = (userId = 0, performerId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getPerformerAPI(userId, performerId);

		dispatch(setPerformer(response));
		dispatch(setToggle(false));
	}
};

export const addPerformer = (userId = 0, performerId = 0, isDelete = false) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await addPerformerAPI(userId, performerId, isDelete);

		dispatch(setAddPerformer(response));
		dispatch(setToggle(false));
	}
};

export const findCollection = (userId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCollectionAPI(userId);

		dispatch(setCollection(response));
		dispatch(setToggle(false));
	}
};

export default musicReducer;