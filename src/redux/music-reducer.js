import {
	getCollectionAPI,
	getPerformersAPI,
	getPerformerAPI,
	addPerformerAPI,
	getIsAddPerformerAPI
} from './../api/music';

/**
 * @const
 * @type {string} Action type - back to main
 */
const BACK_TO_MAIN = 'music/BACK_TO_MAIN';

/**
 * @const
 * @type {string} Action type - get performer
 */
const GET_RERFORMER = 'music/GET_RERFORMER';

/**
 * @const
 * @type {string} Action type - get performers
 */
const GET_RERFORMERS = 'music/GET_RERFORMERS';

/**
 * @const
 * @type {string} Action type - get collection
 */
const GET_COLLECTION = 'music/GET_COLLECTION';

/**
 * @const
 * @type {string} Action type - get add performer
 */
const GET_ADD_RERFORMER = 'music/GET_ADD_RERFORMER';

/**
 * @const
 * @type {string} Action type - get available performer
 */
const GET_AVAILABLE_PERFORMER = 'music/GET_AVAILABLE_PERFORMER';

/**
 * @const
 * @type {string} Action type - get performer from storage
 */
const GET_PERFORMER_FROM_STORAGE = 'music/GET_PERFORMER_FROM_STORAGE';

/**
 * @const
 * @type {string} Action type - get performers from storage
 */
const GET_RERFORMERS_FROM_STORAGE = 'music/GET_RERFORMERS_FROM_STORAGE';

/**
 * @const
 * @type {string} Action type - toggle is focus
 */
const TOGGLE_IS_FOCUS = 'music/TOGGLE_IS_FOCUS';

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'music/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'music/TOGGLE_IS_DISABLED';


let initialState = {
	isAddPerformer: false,
	isMainPage: true,
	isFetching: false,
	isDisabled: false,
	isFocus: false,
	collection: {},
	performers: [],
	performer: {},
	performersStorage: [],
	isAddPerformerStorage: {},
	searchPerformersStorage: {},
	errorCode: 0,
};

/**
 * Reducer the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const musicReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case GET_RERFORMERS: {
			const changeState = {
				...state,
				performers: [ ...action.performers ],
			};

			if (action.searchStr && !state.searchPerformersStorage[action.searchStr]?.length) {
				changeState.searchPerformersStorage = { ...state.searchPerformersStorage, [action.searchStr]: [ ...action.performers ] };
			}

			return changeState;
		}
		case GET_RERFORMERS_FROM_STORAGE: {
			return {
				...state,
				performers: [ ...state.searchPerformersStorage[action.searchStr] ],
			};
		}
		case GET_COLLECTION: {
			return {
				...state,
				collection: { ...state.collection, [action.userId]: action.collection },
			};
		}
		case TOGGLE_IS_FOCUS: {
			return {
				...state,
				isFocus: action.isFocus,
			};
		}
		case BACK_TO_MAIN: {
			return {
				...state,
				isMainPage: true,
			};
		}
		case GET_RERFORMER: {
			const changeState = {
				...state,
				performer: { ...action.performer },
				isMainPage: false,
				isAddPerformer: action.isAddPerformer
			};

			if (!state.performersStorage.length) {
				changeState.performersStorage = [action.performer];
			} else {
				const performersStorage = state.performersStorage.filter((performer) => Number(performer.id) === Number(action.performerId));

				if (!performersStorage.length) {
					changeState.performersStorage = [ ...state.performersStorage, action.performer ];
				}
			}

			if (!state.isAddPerformerStorage[action.userId]?.length) {
				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [[action.performerId, action.isAddPerformer]] };
			} else {
				const isAddPerformerStorage = state.isAddPerformerStorage[action.userId].filter((performer) => Number(performer[0]) !== Number(action.performerId));

				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [ ...isAddPerformerStorage, [action.performerId, action.isAddPerformer]] };
			}

			return changeState;
		}
		case GET_AVAILABLE_PERFORMER: {
			const performerData = state.performersStorage.filter((performer) => Number(performer.id) === Number(action.performerId));
			const changeState = {
				...state,
				performer: { ...performerData[0] },
				isMainPage: false,
				isAddPerformer: action.isAddPerformer
			};

			if (!state.isAddPerformerStorage[action.userId]?.length) {
				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [[action.performerId, action.isAddPerformer]] };
			} else {
				const isAddPerformerStorage = state.isAddPerformerStorage[action.userId].filter((performer) => Number(performer[0]) !== Number(action.performerId));

				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [ ...isAddPerformerStorage, [action.performerId, action.isAddPerformer]] };
			}

			return changeState;
		}
		case GET_PERFORMER_FROM_STORAGE: {
			const performerData = state.performersStorage.filter((performer) => Number(performer.id) === Number(action.performerId));

			return {
				...state,
				performer: { ...performerData[0] },
				isMainPage: false,
				isAddPerformer: action.isAddPerformer,
			};
		}
		case GET_ADD_RERFORMER: {
			let newCollection = [];
			let isChangeCollection = action.performerId && state.collection[action.userId].length;

			const changeState = {
				...state,
				errorCode: action.errorCode,
				isAddPerformer: action.isAddPerformer,
			};

			if (isChangeCollection) {
				newCollection =
					action.isAddPerformer ?
						[ ...state.collection[action.userId], action.addedPerformer ]
					:
						state.collection[action.userId].filter((performer) => performer.id !== Number(action.performerId))
					;

				changeState.collection = { ...state.collection, [action.userId]: newCollection };
			}

			if (!state.isAddPerformerStorage[action.userId]?.length) {
				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [[action.performerId, action.isAddPerformer]] };
			} else {
				const isAddPerformerStorage = state.isAddPerformerStorage[action.userId].filter((performer) => Number(performer[0]) !== Number(action.performerId));

				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [ ...isAddPerformerStorage, [action.performerId, action.isAddPerformer]] };
			}

			return changeState;
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
 * Set performers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} performers
 * @param {String} searchStr
 * @param {number} errorCode
 * @returns {Object}
 */
const setPerformers = ({ performers = [], errorCode = 0 }, searchStr = '') => {
	return {
		errorCode,
		performers,
		searchStr,
		type: GET_RERFORMERS,
	}
};

/**
 * Set collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} collection
 * @param {number} userId
 * @param {number} errorCode
 * @returns {Object}
 */
const setCollection = ({ collection = [], errorCode = 0 }, userId = 0) => {
	return {
		userId,
		errorCode,
		collection,
		type: GET_COLLECTION,
	}
};

/**
 * Set performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} performer
 * @param {boolean} isAddPerformer
 * @param {number} userId
 * @param {number} performerId
 * @param {number} errorCode
 * @returns {Object}
 */
const setPerformer = ({ performer = {}, errorCode = 0, isAddPerformer = false }, userId = 0, performerId = 0) => {
	return {
		userId,
		errorCode,
		performer,
		performerId,
		isAddPerformer,
		type: GET_RERFORMER,
	}
};

/**
 * Set available performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isAddPerformer
 * @param {number} performerId
 * @param {number} errorCode
 * @returns {Object}
 */
const setAvailablePerformer = ({ errorCode = 0, isAddPerformer = false }, performerId = 0) => {
	return {
		errorCode,
		performerId,
		isAddPerformer,
		type: GET_AVAILABLE_PERFORMER,
	}
};

/**
 * Set add performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} addedPerformer
 * @param {boolean} isAddPerformer
 * @param {number} userId
 * @param {number} performerId
 * @param {number} errorCode
 * @returns {Object}
 */
const setAddPerformer = ({ errorCode = 0, isAddPerformer = false, addedPerformer = [] }, userId = 0, performerId = 0) => {
	return {
		userId,
		errorCode,
		performerId,
		addedPerformer,
		isAddPerformer,
		type: GET_ADD_RERFORMER,
	}
};

/**
 * Set fetching
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isFetching
 * @returns {Object}
 */
const setIsFetching = (isFetching = false) => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching,
	}
};

/**
 * Set disabled
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isDisabled
 * @returns {Object}
 */
const setIsDisabled = (isDisabled = false) => {
	return {
		type: TOGGLE_IS_DISABLED,
		isDisabled,
	}
};

/**
 * Set focus
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isFocus
 * @returns {Object}
 */
export const setIsFocus = (isFocus = false) => {
	return {
		type: TOGGLE_IS_FOCUS,
		isFocus,
	}
};

/**
 * Set toggle
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isToggle
 * @returns {Object}
 */
const setToggle = (isToggle = false) => {
	return (dispatch) => {
		dispatch(setIsFetching(isToggle));
		dispatch(setIsDisabled(isToggle));
	}
};

/**
 * Set back to main
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Object}
 */
export const backToMain = () => {
	return {
		type: BACK_TO_MAIN,
	}
};

/**
 * Find performers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} searchStr
 * @returns {Function}
 */
export const findPerformers = (searchStr = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getPerformersAPI(searchStr);

		dispatch(setPerformers(response, searchStr));
		dispatch(setToggle(false));
	}
};

/**
 * Find performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} performerId
 * @returns {Function}
 */
export const findPerformer = (userId = 0, performerId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getPerformerAPI(userId, performerId);

		dispatch(setPerformer(response, userId, performerId));
		dispatch(setToggle(false));
	}
};

/**
 * Find performer from storage
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} performerId
 * @param {boolean} isAddPerformer
 * @returns {Function}
 */
export const findPerformerFromStorage = (userId = 0, performerId = 0, isAddPerformer = false) => {
	return {
		userId,
		performerId,
		isAddPerformer,
		type: GET_PERFORMER_FROM_STORAGE
	}
};

/**
 * Add or delete performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} performerId
 * @param {boolean} isDelete
 * @returns {Function}
 */
export const addPerformer = (userId = 0, performerId = 0, isDelete = false) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await addPerformerAPI(userId, performerId, isDelete);

		dispatch(setAddPerformer(response, userId, performerId));
		dispatch(setToggle(false));
	}
};

/**
 * Find collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @returns {Function}
 */
export const findCollection = (userId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCollectionAPI(userId);

		dispatch(setCollection(response, userId));
		dispatch(setToggle(false));
	}
};

/**
 * Get performers from storage
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} searchStr
 * @returns {Function}
 */
export const getPerformersFromStorage = (searchStr = '') => {
	return {
		searchStr,
		type: GET_RERFORMERS_FROM_STORAGE
	}
};

/**
 * Find information about added performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} performerId
 * @returns {Function}
 */
export const findIsAddPerformer = (userId = 0, performerId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getIsAddPerformerAPI(userId, performerId);

		dispatch(setAvailablePerformer(response, userId, performerId));
		dispatch(setToggle(false));
	}
};

export default musicReducer;