import {
	getCollectionsAPI,
	getPerformersAPI,
	getPerformerAPI,
	addPerformerAPI,
	deleteCollectionAPI,
	getIsAddPerformerAPI,
	getUserCollectionsAPI,
	getCreateCollectionAPI,
	getChangeCollectionAPI,
	getCollectionElementsAPI
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
 * @type {string} Action type - get collections
 */
const GET_COLLECTIONS = 'music/GET_COLLECTIONS';

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

/**
 * @const
 * @type {string} Action type - create collection
 */
const CREATE_COLLECTION = 'music/CREATE_COLLECTION';

/**
 * @const
 * @type {string} Action type - get collection
 */
const GET_COLLECTION = 'music/GET_COLLECTION';

/**
 * @const
 * @type {string} Action type - get change collection
 */
const CHANGE_COLLECTION = 'music/CHANGE_COLLECTION';

/**
 * @const
 * @type {string} Action type - get delete collection
 */
const DELETE_COLLECTION = 'music/DELETE_COLLECTION';


let initialState = {
	isAddPerformer: false,
	isMainPage: true,
	isFetching: false,
	isDisabled: false,
	isFocus: false,
	collectionId: 0,
	countCollections: 0,
	userCollections: [],
	collection: {},
	collections: {},
	performers: [],
	performer: {},
	performersStorage: [],
	isAddPerformerStorage: {},
	searchPerformersStorage: {},
	errorCode: 0,
	collectionName: '',
	collectionUserId: 0,
	isCreatedCollection: false,
	isShowModalUserCollections: false,
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
				isCreatedCollection: false,
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
				isCreatedCollection: false,
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
			let isChangeCollection = action.musicianId
				&& state.collection[action.userName]
				&& state.collection[action.userName][action.collectionId]
				&& state.collection[action.userName][action.collectionId].length;

			const changeState = {
				...state,
				errorCode: action.errorCode,
				isAddPerformer: action.isAddPerformer,
				collections: {}
			};

			if (isChangeCollection) {
				newCollection =
					action.isAddPerformerCollection ?
						[ ...state.collection[action.userName][action.collectionId], action.addedPerformer ]
					:
						state.collection[action.userName][action.collectionId].filter((performer) => Number(performer.id) !== Number(action.musicianId))
					;

				changeState.collection = {
					...state.collection,
					[action.userName]: {
						...state.collection[action.userName],
						[action.collectionId]: newCollection,
					}
				};
			}

			if (!state.isAddPerformerStorage[action.userId]?.length) {
				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [[action.musicianId, action.isAddPerformer]] };
			} else {
				const isAddPerformerStorage = state.isAddPerformerStorage[action.userId].filter((performer) => Number(performer[0]) !== Number(action.musicianId));

				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [ ...isAddPerformerStorage, [action.musicianId, action.isAddPerformer]] };
			}

			if (state.userCollections.length) {
				const userCollections = state.userCollections.map((collection) => {
					if (Number(collection['id']) === Number(action.collectionId)) {
						collection.isAddedMusician = action.isAddPerformerCollection;
					}

					return collection;
				});

				changeState.userCollections = [ ...userCollections ];
			}

			return changeState;
		}
		case IS_SHOW_MODAL_USER_COLLECTIONS : {
			return {
				...state,
				isShowModalUserCollections: action.isShow,
			};
		}
		case CREATE_COLLECTION: {
			const changeState = {
				...state,
				collections: {},
				isAddPerformer: action.isAddPerformer,
				countCollections: action.countCollections,
				isCreatedCollection: action.isCreatedCollection,
				collectionError: {
					...state.collectionError,
					errorCode: action.errorCode,
					errorText: action.errorText,
				},
			};

			if (!state.isAddPerformerStorage[action.userId]?.length) {
				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [[action.performerId, action.isAddPerformer]] };
			} else {
				const isAddPerformerStorage = state.isAddPerformerStorage[action.userId].filter((performer) => Number(performer[0]) !== Number(action.performerId));

				changeState.isAddPerformerStorage = { ...state.isAddPerformerStorage, [action.userId]: [ ...isAddPerformerStorage, [action.performerId, action.isAddPerformer]] };
			}

			return changeState;
		}
		case CHANGE_COLLECTION: {
			return {
				...state,
				collections: {},
				collectionId: 0,
				isCreatedCollection: action.isCreatedCollection,
				collectionError: {
					...state.collectionError,
					errorCode: action.errorCode,
					errorText: action.errorText,
				},
			};
		}
		case DELETE_COLLECTION: {
			return {
				...state,
				collections: {},
				collectionId: 0,
				isCreatedCollection: action.isCreatedCollection,
				collectionError: {
					...state.collectionError,
					errorCode: action.errorCode,
					errorText: action.errorText,
				},
			};
		}
		case GET_COLLECTION: {
			return {
				...state,
				collectionId: action.collectionId,
				collectionName: action.collectionName,
				collectionUserId: action.collectionUserId,
				isCreatedCollection: false,
				collection: {
					...state.collection,
					[action.userName]: {
						...state.collection[action.userName],
						[action.collectionId]: action.collection,
					}
				},
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
				isCreatedCollection: false,
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
 * @param {Array} collections
 * @param {number} userId
 * @param {number} errorCode
 * @param {number} collectionId
 * @param {number} countCollections
 * @param {String} userName
 * @returns {Object}
 */
const setCollections = ({
	collections = [],
	collection = [],
	errorCode = 0,
	collectionId = 0,
	collectionName = '',
	countCollections = 0,
	},
	userName = ''
) => {
	return {
		userName,
		errorCode,
		collection,
		collections,
		collectionId,
		collectionName,
		countCollections,
		type: GET_COLLECTIONS,
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
const setPerformer = ({
	performer = {},
	errorCode = 0,
	isAddPerformer = false
	},
	userId = 0,
	performerId = 0
) => {
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
const setAvailablePerformer = ({ errorCode = 0, isAddPerformer = false }, performerId = 0, userId = 0) => {
	return {
		userId,
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
 * @param {number} collectionId
 * @param {number} userId
 * @param {number} musicianId
 * @param {number} errorCode
 * @param {String} userName
 * @returns {Object}
 */
const setAddPerformer = ({
	errorCode = 0,
	isAddPerformer = false,
	addedPerformer = [],
	collectionId = 0,
	isAddPerformerCollection = false,
	},
	userId = 0,
	musicianId = 0,
	userName = '',
) => {
	return {
		userId,
		userName,
		errorCode,
		musicianId,
		collectionId,
		addedPerformer,
		isAddPerformer,
		isAddPerformerCollection,
		type: GET_ADD_RERFORMER,
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
const setUserCollections = ({
	userCollections = [],
	errorCode = 0,
	},
	userId = 0
) => {
	return {
		userId,
		errorCode,
		userCollections,
		type: GET_USER_COLLECTIONS,
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
const setNewCollection = ({
	isCreatedCollection = false,
	isAddPerformer = false,
	countCollections = 0,
	collectionId = 0,
	errorCode = 0,
	errorText = '',
	},
	userId = 0,
	collectionName = ''
) => {
	return {
		userId,
		errorCode,
		errorText,
		collectionId,
		collectionName,
		isAddPerformer,
		countCollections,
		isCreatedCollection,
		type: CREATE_COLLECTION,
	}
};

/**
 * Set change user's collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} userCollections
 * @param {number} userId
 * @param {number} errorCode
 * @returns {Object}
 */
const setChangeCollection = ({
	isCreatedCollection = false,
	collectionId = 0,
	errorCode = 0,
	errorText = '',
	},
	userId = 0,
	collectionName = ''
) => {
	return {
		userId,
		errorCode,
		errorText,
		collectionId,
		collectionName,
		isCreatedCollection,
		type: CHANGE_COLLECTION,
	}
};

/**
 * Set delete user's collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} userCollections
 * @param {number} userId
 * @param {number} errorCode
 * @returns {Object}
 */
const setDeleteCollection = ({
	errorCode = 0,
	errorText = '',
	isCreatedCollection = false
	},
) => {
	return {
		errorCode,
		errorText,
		isCreatedCollection,
		type: DELETE_COLLECTION,
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
 * @param {number} musicianId
 * @param {boolean} isDelete
 * @param {String} userName
 * @param {number} collectionId
 * @returns {Function}
 */
export const addPerformer = ({
	userId = 0,
	musicianId = 0,
	isDelete = false,
	userName = '',
	collectionId = 0
}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await addPerformerAPI(userId, musicianId, isDelete, collectionId);

		dispatch(setAddPerformer(response, userId, musicianId, userName));
		dispatch(setToggle(false));
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
export const findCollections = (userName = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCollectionsAPI(userName);

		dispatch(setCollections(response, userName));
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

		dispatch(setAvailablePerformer(response, performerId, userId));
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
export const findUserCollections = (userId = 0, musicianId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getUserCollectionsAPI(userId, musicianId);

		dispatch(setUserCollections(response, userId));
		dispatch(setToggle(false));
	}
};

/**
 * Create collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} musicianId
 * @param {String} collectionName
 * @returns {Function}
 */
export const createCollection = (collectionName = '', userId = 0, musicianId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCreateCollectionAPI(collectionName, userId, musicianId);

		dispatch(setNewCollection(response, userId, collectionName));
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

/**
 * Change collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} collectionId
 * @param {String} collectionName
 * @returns {Function}
 */
export const changeCollection = (collectionName = '', userId = 0, collectionId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getChangeCollectionAPI(collectionName, userId, collectionId);

		dispatch(setChangeCollection(response, userId, collectionName));
		dispatch(setToggle(false));
	}
};

/**
 * Delete collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} collectionId
 * @returns {Function}
 */
export const deleteCollection = (userId = 0, collectionId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await deleteCollectionAPI(userId, collectionId);

		dispatch(setDeleteCollection(response, userId));
		dispatch(setToggle(false));
	}
};

export default musicReducer;