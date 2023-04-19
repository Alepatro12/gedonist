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