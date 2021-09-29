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

export const getName = (state) => {
	return state.authenticationData.name;
}