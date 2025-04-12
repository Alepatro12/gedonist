import {
	editQuestionAPI,
	deleteQuestionAPI,
	getSearchQuestionAPI,
	getCreationQuestionAPI,
} from './../api/repetition-edit-question';
import { getDisciplineAPI } from './../api/repetition-discipline';

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'repetition-edit-questions/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'repetition-edit-questions/TOGGLE_IS_DISABLED';

/**
 * @const
 * @type {string} Action type - get info of discipline
 */
const GET_DISCIPLINE = 'repetition-edit-questions/GET_DISCIPLINE';

/**
 * @const
 * @type {string} Action type - set creation question
 */
const SET_CREATION_QUESTION = 'repetition-edit-questions/SET_CREATION_QUESTION';

/**
 * @const
 * @type {string} Action type - set creation new question
 */
const SET_CREATION_NEW_QUESTION = 'repetition-edit-questions/SET_CREATION_NEW_QUESTION';

/**
 * @const
 * @type {string} Action type - clear error notification
 */
const CLEAR_ERROR = 'repetition-edit-questions/CLEAR_ERROR';

/**
 * @const
 * @type {string} Action type - set questions
 */
const SET_QUESTIONS = 'repetition-edit-questions/SET_QUESTIONS';

/**
 * @const
 * @type {string} Action type - delete question
 */
const DELETE_QUESTION = 'repetition-edit-questions/DELETE_QUESTION';

/**
 * @const
 * @type {string} Action type - edit question
 */
const EDITE_QUESTION = 'repetition-edit-questions/EDIT_QUESTION';

const initialState = {
	name: '',
	menu: [],
	answers: [],
	questions: [],
	resultText: '',
	disciplineId: 0,
	isFetching: false,
	isDisabled: false,
	isShowError: false,
	isShowSuccess: false,
	isCreationQuestion: false,
	error: {
		code: 0,
		text: '',
	},
};

/**
 * Reducer the edit question repetition pages
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const RepetitionEditQuestionsReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_QUESTIONS: {
			const answers = action.answers?.length || action.error?.code ? action.answers : state.answers;
			const questions = action.questions?.length || action.error?.code ? action.questions : state.questions;

			return {
				...state,
				answers,
				questions,
				isShowError: false,
				isShowSuccess: false,
				error: { ...action.error },
			};
		}
		case EDITE_QUESTION:
		case DELETE_QUESTION: {
			const answers = action.error?.code ? state.answers : [];
			const questions = action.error?.code ? state.questions : [];

			return {
				...state,
				answers,
				questions,
				error: { ...action.error },
				resultText: action.resultText,
				isShowError: Boolean(action.error?.code),
				isShowSuccess: !Boolean(action.error?.code),
			};
		}
		case CLEAR_ERROR: {
			return {
				...state,
				isShowError: false,
			};
		}
		case SET_CREATION_NEW_QUESTION: {
			const answers = action.error?.code ? state.answers : [];
			const questions = action.error?.code ? state.questions : [];

			return {
				...state,
				answers,
				questions,
				resultText: action.resultText,
				isShowError: Boolean(action.error?.code),
				isShowSuccess: !Boolean(action.error?.code),
				isCreationQuestion: Boolean(action.error?.code),
			};
		}
		case SET_CREATION_QUESTION: {
			return {
				...state,
				isShowError: false,
				isShowSuccess: false,
				isCreationQuestion: action.isCreationQuestion,
			};
		}
		case GET_DISCIPLINE: {
			return {
				...state,
				name: action.name,
				error: { ...action.error },
				disciplineId: action.disciplineId,
				answers: [],
				questions: [],
				resultText: '',
				isShowError: false,
				isShowSuccess: false,
				isCreationQuestion: false,
			};
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching,
			};
		}
		case TOGGLE_IS_DISABLED: {
			return {
				...state,
				isDisabled: action.isDisabled,
			};
		}
		default:
			return state;
	}
};

/**
 * Set discipline data
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {Object} error
 * @param {number} disciplineId Discipline ID
 * @returns {Object}
 */
const setDiscipline = ({
	name = '',
	error = {},
	disciplineId = 0,
}) => {
	return {
		name,
		error,
		disciplineId,
		type: GET_DISCIPLINE,
	};
};

/**
 * Set new question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} resultText Query result text
 * @param {Object} error
 * @returns {Object}
 */
const setNewQuestion = ({
	error = {},
	resultText = '',
}) => {
	return {
		error,
		resultText,
		type: SET_CREATION_NEW_QUESTION,
	};
};

/**
 * Set questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} questions Questions
 * @param {Array} answers Answers
 * @param {Object} error
 * @returns {Object}
 */
const setQuestions = ({
	error = {},
	answers = [],
	questions = [],
}) => {
	return {
		error,
		answers,
		questions,
		type: SET_QUESTIONS,
	};
};

/**
 * Set fetching
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching
 * @returns {Object}
 */
const setIsFetching = (isFetching = false) => {
	return {
		isFetching,
		type: TOGGLE_IS_FETCHING,
	};
};

/**
 * Set disabled
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isDisabled
 * @returns {Object}
 */
const setIsDisabled = (isDisabled = false) => {
	return {
		isDisabled,
		type: TOGGLE_IS_DISABLED,
	};
};

/**
 * Set toggle
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isToggle
 * @returns {Function}
 */
const setToggle = (isToggle = false) => {
	return (dispatch) => {
		dispatch(setIsFetching(isToggle));
		dispatch(setIsDisabled(isToggle));
	}
};

/**
 * Find discipline data
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId discipline ID
 * @returns {Function}
 */
export const findDiscipline = (userId = 0, disciplineId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getDisciplineAPI(userId, disciplineId);

		dispatch(setDiscipline(response));
		dispatch(setToggle(false));
	}
};

/**
 * Set the flag for creating a question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isCreationQuestion Question creation flag
 * @returns {Object}
 */
export const setCreationQuestion = (isCreationQuestion = true) => {
	return {
		isCreationQuestion,
		type: SET_CREATION_QUESTION,
	};
};

/**
 * Set the result of deleting a question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} resultText Query result text
 * @param {Object} error
 * @returns {Object}
 */
export const setDeletedQuestion = ({ error = {}, resultText = '', }) => {
	return {
		error,
		resultText,
		type: DELETE_QUESTION,
	};
};

/**
 * Set the result of editing a question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} resultText Query result text
 * @param {Object} error
 * @returns {Object}
 */
export const setEditedQuestion = ({ error = {}, resultText = '', }) => {
	return {
		error,
		resultText,
		type: EDITE_QUESTION,
	};
};

/**
 * Clear error
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Object}
 */
export const clearError = () => {
	return { type: CLEAR_ERROR };
};

/**
 * Create question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} disciplineId Discipline ID
 * @param {String} question
 * @param {String} answer
 * @returns {Function}
 */
export const createQuestion = (disciplineId = 0, question = '', answer = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getCreationQuestionAPI(disciplineId, question, answer);

		dispatch(setNewQuestion(response));
		dispatch(setToggle(false));
	}
};

/**
 * Search questions or answers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} disciplineId Discipline ID
 * @param {String} request
 * @param {bool} isSearchAnswer Search by answer flag
 * @returns {Function}
 */
export const search = (disciplineId = 0, request = '', isSearchAnswer = false) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getSearchQuestionAPI(disciplineId, request, isSearchAnswer);

		dispatch(setQuestions(response));
		dispatch(setToggle(false));
	}
};

/**
 * Delete question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Function}
 */
export const deleteQuestion = (data) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await deleteQuestionAPI(data);

		dispatch(setDeletedQuestion(response));
		dispatch(setToggle(false));
	}
};

/**
 * Edit question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @param {number} disciplineId Discipline ID
 * @returns {Function}
 */
export const editQuestion = (data = {}, disciplineId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await editQuestionAPI(data, disciplineId);

		dispatch(setEditedQuestion(response));
		dispatch(setToggle(false));
	}
};

export default RepetitionEditQuestionsReducer;
