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
export const getNominations = (state) => {
	return state.gma.nominations;
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
export const getNominees = (state) => {
	return state.gma.nominees;
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
export const getNominationId = (state) => {
	return state.gma.nominationId;
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
export const getNominationTypeId = (state) => {
	return state.gma.nominationTypeId;
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
export const getNominationName = (state) => {
	return state.gma.nominationName;
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
export const getWinnerArtist = (state) => {
	return state.gma.winnerArtist;
}
