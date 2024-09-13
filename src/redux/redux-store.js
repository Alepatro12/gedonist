import appReducer from './app-reducer';
import gmaReducer from './gma-reducer';
import menuReducer from './menu-reducer';
import thunkMiddleware from 'redux-thunk';
import musicReducer from './music-reducer';
import { reducer as formReducer } from 'redux-form';
import repetitionReducer from './repetition-reducer';
import checkAuthenticationReducer from './account-data-reducer';
import adminRepetitionReducer from './admin-repetition-reducer';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const reducers = combineReducers({
	gma: gmaReducer,
	menu: menuReducer,
	form: formReducer,
	appData: appReducer,
	music: musicReducer,
	repetition: repetitionReducer,
	adminRepetition: adminRepetitionReducer,
	authenticationData: checkAuthenticationReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
