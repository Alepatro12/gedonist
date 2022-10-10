import { createSelector } from "reselect";

export const getInitializedSuper = (state) => {
	return state.appData.initialized;
}

export const getInitialized = createSelector(getInitializedSuper, (initialized) => {
	return initialized;
});

export const getIsAuthenticate = (state) => {
	return state.authenticationData.isAuthenticate;
}

export const getIsFetching = (state) => {
	return state.authenticationData.isFetching;
}

export const getIsDisabled = (state) => {
	return state.authenticationData.isDisabled;
}

export const getUserName = (state) => {
	return state.authenticationData.userName;
}

export const getLoginError = (state) => {
	return state.authenticationData.loginError.errorText;
}

export const getRegistrationError = (state) => {
	return state.authenticationData.registrationError.errorText;
}

export const getEmailStatus = (state) => {
	return state.authenticationData.emailStatus;
}

export const getChangePasswordError = (state) => {
	return state.authenticationData.changePasswordError.errorText;
}

export const getIsChangePassword = (state) => {
	return state.authenticationData.isChangePassword;
}

export const getNewPasswordError = (state) => {
	return state.authenticationData.newPasswordError.errorText;
}

export const getMenu = (state) => {
	return state.menu;
}