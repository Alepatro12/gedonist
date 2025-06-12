import { createSelector } from "reselect";

/**
 * Get initialized status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getInitializedSuper = (state) => {
	return state.appData.initialized;
}

/**
 * Get initialized status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {boolean} initialized
 * @returns {boolean}
 */
export const getInitialized = createSelector(getInitializedSuper, (initialized) => {
	return initialized;
});

/**
 * Get authenticate status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsAuthenticate = (state) => {
	return state.authenticationData.isAuthenticate;
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
	return state.authenticationData.isFetching;
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
	return state.authenticationData.isDisabled;
}

/**
 * Get username
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getUserName = (state) => {
	return state.authenticationData.userName;
}

/**
 * Get user id
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {number}
 */
export const getUserId = (state) => {
	return state.authenticationData.userId;
}

/**
 * Get login error text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getLoginError = (state) => {
	return state.authenticationData.loginError.errorText;
}

/**
 * Get registration error text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getRegistrationError = (state) => {
	return state.authenticationData.registrationError.errorText;
}

/**
 * Get email status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getEmailStatus = (state) => {
	return state.authenticationData.emailStatus;
}

/**
 * Get change password error text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getChangePasswordError = (state) => {
	return state.authenticationData.changePasswordError.errorText;
}

/**
 * Get change password status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsChangePassword = (state) => {
	return state.authenticationData.isChangePassword;
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
export const getNewPasswordError = (state) => {
	return state.authenticationData.newPasswordError.errorText;
}

/**
 * Get menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getMenu = (state) => state.menu.menu;

/**
 * Get user type
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {number}
 */
export const getUserType = (state) => state.authenticationData.userType;

/**
 * Get sub menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getSubMenu = (state) => state.menu.subMenu;
