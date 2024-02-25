import {
	getNomineesAPI,
	getNominationsAPI,
	getCollectionElementsAPI
} from './../api/gma';

/**
 * @const
 * @type {string} Action type - back to main
 */
const BACK_TO_MAIN = 'music/BACK_TO_MAIN';

/**
 * @const
 * @type {string} Action type - get collections
 */
const GET_COLLECTIONS = 'music/GET_COLLECTIONS';

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

/**
 * @const
 * @type {string} Action type - get whether to show the user's collections modal window
 */
const IS_SHOW_MODAL_USER_COLLECTIONS = 'music/IS_SHOW_MODAL_USER_COLLECTIONS';

/**
 * @const
 * @type {string} Action type - get user's collection
 */
const GET_USER_COLLECTIONS = 'music/GET_USER_COLLECTIONS';

const GET_COLLECTION = 'music/GET_COLLECTION';

/**
 * @const
 * @type {string} Action type - get collection
 */
const GET_NOMINATIONS = 'music/GET_NOMINATIONS';

/**
 * @const
 * @type {string} Action type - get collection
 */
const GET_NOMINEES = 'music/GET_NOMINEES';

let initialState = {
	isMainPage: true,
	isFetching: false,
	isDisabled: false,
	isFocus: false,
	year: 2023,
	nominees: [],
	nominations: [],
	collectionId: 0,
	nominationId: 0,
	countCollections: 0,
	collection: {},
	collections: {},
	errorCode: 0,
	collectionName: '',
	nominationName: '',
	collectionUserId: 0,
	nominationTypeId: 0,
	collectionError: {
		errorCode: 0,
		errorText: '',
	},
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
		case GET_COLLECTIONS: {
			let changeState = {};

			if (action.countCollections === 1) {
				changeState = {
					collection: {
						...state.collection,
						[action.userName]: {
							...state.collection[action.userName],
							[action.collectionId]: action.collection,
						}
					},
				}
			} else {
				changeState = {
					collections: {
						...state.collections,
						[action.userName]: [
							...action.collections,
						]
					},
				};
			}

			return {
				...state,
				collectionId: action.countCollections === 1 ? action.collectionId : 0,
				collectionName: action.countCollections === 1 ? action.collectionName : 0,
				countCollections: action.countCollections,
				...changeState,
			};
		}
		case GET_USER_COLLECTIONS: {
			return {
				...state,
				userCollections: [ ...action.userCollections ],
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
				collectionId: 0,
			};
		}
		case GET_NOMINEES : {
			return {
				...state,
				nominations: [],
				year: action.year,
				nominationId: action.nominationId,
				nominees: [ ...action.nominees ],
				nominationName: action.nominationName,
				nominationTypeId: action.nominationTypeId,
			};
		}
		case GET_NOMINATIONS: {
			return {
				...state,
				nominees: [],
				year: action.year,
				nominationId: 0,
				nominationName: '',
				nominationTypeId: 0,
				nominations: [ ...action.nominations ],
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
 * Set user's collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} userCollections
 * @param {number} userId
 * @param {number} errorCode
 * @returns {Object}
 */
const setNominations = ({
	nominations = [],
	errorCode = 0,
	},
	year = 0
) => {
	return {
		year,
		errorCode,
		nominations,
		type: GET_NOMINATIONS,
	}
};

/**
 * Set user's collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} userCollections
 * @param {number} userId
 * @param {number} errorCode
 * @returns {Object}
 */
const setNominees = ({
	nominees = [],
	errorCode = 0,
	nominationName = '',
	nominationTypeId = 0,
	},
	nominationId = 0,
	year = 0,
) => {
	return {
		year,
		nominees,
		errorCode,
		nominationId,
		nominationName,
		nominationTypeId,
		type: GET_NOMINEES,
	}
};

/**
 * Set collection elements
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} collection
 * @param {number} userId
 * @param {number} errorCode
 * @param {number} collectionId
 * @returns {Object}
 */
const setCollectionElements = ({
	collectionUserId = 0,
	collectionName = '',
	collectionId = 0,
	collection = [],
	errorCode = 0,
	},
	userName = ''
) => {
	return {
		userName,
		errorCode,
		collection,
		collectionId,
		collectionName,
		collectionUserId,
		type: GET_COLLECTION,
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
 * Find collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} userName
 * @returns {Function}
 */
export const findNominees = (nominationId = 0, year = 2023) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getNomineesAPI(nominationId, year);

		dispatch(setNominees(response, nominationId, year));
		dispatch(setToggle(false));
	}
};

/**
 * Set whether to show the user's collections modal window
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} isShow
 * @returns {Function}
 */
export const setIsShowModalUserCollections = (isShow = false) => {
	return {
		isShow,
		type: IS_SHOW_MODAL_USER_COLLECTIONS
	}
};

/**
 * Find user's collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} musicianId
 * @returns {Function}
 */
export const findNominations = (year = 2023) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getNominationsAPI(year);

		dispatch(setNominations(response, year));
		dispatch(setToggle(false));
	}
};

/**
 * Find collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} collectionId Collection ID
 * @returns {Function}
 */
export const findCollectionElements = (collectionId = 0, userName = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCollectionElementsAPI(collectionId);

		dispatch(setCollectionElements(response, userName));
		dispatch(setToggle(false));
	}
};

export default musicReducer;