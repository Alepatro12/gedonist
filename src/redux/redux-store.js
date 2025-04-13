import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import appReducer from './app-reducer';
import gmaReducer from './gma-reducer';
import menuReducer from './menu-reducer';
import musicReducer from './music-reducer';
import repetitionReducer from './repetition-reducer';
import checkAuthenticationReducer from './account-data-reducer';
import RepetitionEditSubjectReducer from './repetition-edit-subject-reducer';
import RepetitionEditQuestionsReducer from './repetition-edit-questions-reducer';

const reducers = combineReducers({
	gma: gmaReducer,
	menu: menuReducer,
	form: formReducer,
	appData: appReducer,
	music: musicReducer,
	repetition: repetitionReducer,
	authenticationData: checkAuthenticationReducer,
	repetitionEditSubject : RepetitionEditSubjectReducer,
	repetitionEditQuestions: RepetitionEditQuestionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
