import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import checkAuthenticationReducer from './account-data-reducer';
import { reducer as formReducer } from 'redux-form';
import sidebarReducer from './sidebar-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';

const reducers = combineReducers({
	authenticationData: checkAuthenticationReducer,
	sidebar: sidebarReducer,
	appData: appReducer,
	form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;