/**
 * Get showing pop up flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsShow = (state) => state.popUpNotification.isShow;

/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsFetching = (state) => state.popUpNotification.isFetching;

/**
 * Get lifetime
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Number}
 */
export const getLifeTime = (state) => state.popUpNotification.lifetime;

/**
 * Get pop up text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getText = (state) => state.popUpNotification.text;

/**
 * Get data
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getData = (state) => state.popUpNotification.data;

/**
 * Get request URL
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getURL = (state) => state.popUpNotification.url;

/**
 * Get update flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Bool}
 */
export const getIsUpdate = (state) => state.popUpNotification.isUpdate;
