/**
 * Get performers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getPerformers = (state) => {
	return state.music.performers;
}

/**
 * Get focus status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getMusicFocus = (state) => {
	return state.music.isFocus;
}

/**
 * Get performer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Object}
 */
export const getPerformer = (state) => {
	return state.music.performer;
}

/**
 * Get added performer status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getIsAddPerformer = (state) => {
	return state.music.isAddPerformer;
}

/**
 * Get collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCollection = (state) => {
	return state.music.collection;
}

/**
 * Get page status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsMainPage = (state) => {
	return state.music.isMainPage;
}

/**
 * Get performers from storage
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Object}
 */
export const getPerformersStorage = (state) => {
	return state.music.performersStorage;
}

/**
 * Get added performers from storage
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Object}
 */
export const getIsAddPerformerStorage = (state) => {
	return state.music.isAddPerformerStorage[state.authenticationData.userId];
}

/**
 * Get performer search results from storage
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Object}
 */
export const getSearchPerformersStorage = (state) => {
	return state.music.searchPerformersStorage;
}

/**
 * Get collection id
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCollectionId = (state) => {
	return state.music.collectionId;
}

/**
 * Get count collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCountCollections = (state) => {
	return state.music.countCollections;
}

/**
 * Get whether to show the user's collections modal window
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getIsShowModalUserCollections = (state) => {
	return state.music.isShowModalUserCollections;
}

/**
 * Get user's collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getUserCollections = (state) => {
	return state.music.userCollections;
}

/**
 * Get new password error text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getCollectionError = (state) => {
	return state.music.collectionError.errorText;
}

/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsFetching = (state) => {
	return state.music.isFetching;
}

/**
 * Get disabled status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsDisabled = (state) => {
	return state.music.isDisabled;
}

/**
 * Get is created collecton
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsCreatedCollection = (state) => {
	return state.music.isCreatedCollection;
}

/**
 * Get collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCollections = (state) => {
	return state.music.collections;
}

/**
 * Get collection name
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCollectionName = (state) => {
	return state.music.collectionName;
}

/**
 * Get collection user ID
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCollectionUserId = (state) => {
	return state.music.collectionUserId;
}