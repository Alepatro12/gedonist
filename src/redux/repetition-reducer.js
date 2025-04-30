import {
	getQuestionsAPI,
	getDisciplineAPI,
	createSubjectAPI,
	getChangeQuestionAPI,
	getIsEditAvailableAPI,
} from './../api/repetition-discipline';
import { getMenuAPI } from './../api/repetition';

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'repetition/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'repetition/TOGGLE_IS_DISABLED';

/**
 * @const
 * @type {string} Action type - get menu of repetition
 */
const GET_MENU = 'repetition/GET_MENU';

/**
 * @const
 * @type {string} Action type - get info of discipline
 */
const GET_DISCIPLINE = 'repetition/GET_DISCIPLINE';

/**
 * @const
 * @type {string} Action type - get new subject
 */
const GET_NEW_SUBJECT = 'repetition/GET_NEW_SUBJECT';

/**
 * @const
 * @type {string} Action type - get editing availability flag
 */
const GET_EDITING_FLAG = 'repetition/GET_EDITING_FLAG';

/**
 * @const
 * @type {string} Action type - get discipline questions
 */
const GET_QUESTIONS = 'repetition/GET_QUESTIONS';

/**
 * @const
 * @type {string} Action type - skip question
 */
const SKIP_QUESTION = 'repetition/SKIP_QUESTION';

/**
 * @const
 * @type {string} Action type - check answer
 */
const CHECK_ANSWER = 'repetition/CHECK_ANSWER';

/**
 * @const
 * @type {string} Action type - move to next question
 */
const MOVE_TO_NEXT_QUESTION = 'repetition/MOVE_TO_NEXT_QUESTION';

/**
 * @const
 * @type {string} Action type - clear data
 */
const CLEAR_DATA = 'repetition/CLEAR_DATA';

const initialState = {
	name: '',
	menu: [],
	counter: 0,
	ownerName: '',
	questions: [],
	isFinal: false,
	pageNumbers: {},
	disciplineId: 0,
	newSubjectId: 0,
	isFetching: false,
	isDisabled: false,
	isChecking: false,
	currentQuestion: {},
	isEditAvailable: false,
	error: {
		code: 0,
		text: '',
	},
};

/**
 * Reducer the Repetition pages
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const repetitionReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case GET_MENU: {
			return {
				...state,
				menu: [ ...action.menu ],
				ownerName: action.ownerName,
				isMaxSubjects: action.isMaxSubjects,
			};
		}
		case GET_DISCIPLINE: {
			return {
				...state,
				name: action.name,
				error: { ...action.error },
				disciplineId: action.disciplineId,
				isEditAvailable: action.isEditAvailable,
			};
		}
		case GET_NEW_SUBJECT: {
			return {
				...state,
				error: { ...action.error },
				newSubjectId: action.subjectId,
			};
		}
		case GET_EDITING_FLAG: {
			return {
				...state,
				error: { ...action.error },
				isEditAvailable: action.isEditAvailable,
			};
		}
		case GET_QUESTIONS: {
			return {
				...state,
				isFinal: false,
				error: { ...action.error },
				currentQuestion: { ...action.questions.pop() },
				questions: [ ...action.questions ],
				pageNumbers: { ...action.pageNumbers },
			};
		}
		case SKIP_QUESTION: {
			return {
				...state,
				isFinal: !Boolean(state.questions.length),
				currentQuestion: { ...state.questions.pop() },
			};
		}
		case CHECK_ANSWER: {
			return {
				...state,
				isChecking: true,
			};
		}
		case MOVE_TO_NEXT_QUESTION: {
			return {
				...state,
				isChecking: false,
				isFinal: !Boolean(state.questions.length),
				counter: action.isRepeat ? state.counter : ++state.counter,
				currentQuestion: { ...state.questions.pop() },
				error: { ...action.error },
			};
		}
		case CLEAR_DATA: {
			return {
				...state,
				newSubjectId: 0,
				error: initialState.error,
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
 * Set repetition menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of disciplines 
 * @param {Object} error
 * @param {bool} isMaxSubjects Max subjects flag
 * @param {String} ownerName Page owner's name
 * @returns {Object}
 */
const setMenu = (
	{
		menu = [],
		error = {},
		isMaxSubjects = false,
	},
	ownerName = ''
) => {
	return {
		menu,
		error,
		ownerName,
		isMaxSubjects,
		type: GET_MENU,
	};
};

/**
 * Set new subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} error
 * @param {number} subjectId Subject ID
 * @returns {Object}
 */
const setNewSubject = ({
	error = {},
	subjectId = 0,
}) => {
	return {
		error,
		subjectId,
		type: GET_NEW_SUBJECT,
	};
};

/**
 * Set editing availability flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} error
 * @param {bool} isEditAvailable Editing availability flag
 * @returns {Object}
 */
const setIsEditAvailable = ({
	error = {},
	isEditAvailable = false,
}) => {
	return {
		error,
		isEditAvailable,
		type: GET_EDITING_FLAG,
	};
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
 * @param {bool} isEditAvailable Editing availability flag
 * @returns {Object}
 */
const setDiscipline = ({
	name = '',
	error = {},
	disciplineId = 0,
	isEditAvailable = false,
}) => {
	return {
		name,
		error,
		disciplineId,
		isEditAvailable,
		type: GET_DISCIPLINE,
	};
};

/**
 * Set discipline questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} error
 * @param {Array} questions List of questions
 * @param {Object} pageNumbers Page numbers
 * @returns {Object}
 */
const setQuestions = ({
	error = {},
	questions = [],
	pageNumbers = {},
}) => {
	return {
		error,
		questions,
		pageNumbers,
		type: GET_QUESTIONS,
	};
};

/**
 * Set next question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isRepeat Question repeat flag
 * @param {Object} error
 * @returns {Object}
 */
const setNextQuestion = (isRepeat = false, error = {}) => {
	return {
		error,
		isRepeat,
		type: MOVE_TO_NEXT_QUESTION,
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
 * Find menu of repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {String} ownerName Page owner's name
 * @returns {Function}
 */
export const findMenu = (userId = 0, ownerName = '') => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getMenuAPI(userId, ownerName);

		dispatch(setMenu(response, ownerName));
		dispatch(setToggle(false));
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
 * Skip question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Object}
 */
export const skipQuestion = () => {
	return { type: SKIP_QUESTION };
};

/**
 * Check answer
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Object}
 */
export const checkAnswer = () => {
	return { type: CHECK_ANSWER };
};

/**
 * Move to next question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isRepeat Question repeat flag
 * @param {Object} props
 * @returns {Function}
 */
export const moveNextQuestion = ({ isRepeat = false, ...props }) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getChangeQuestionAPI({ isRepeat, ...props });

		dispatch(setNextQuestion(isRepeat, response));
		dispatch(setToggle(false));
	}
};

export default repetitionReducer;

/**
 * Find discipline questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId discipline ID
 * @returns {Function}
 */
export const findQuestions = (userId = 0, disciplineId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getQuestionsAPI(userId, disciplineId);

		dispatch(setQuestions(response));
		dispatch(setToggle(false));
	}
};

/**
 * Find editing availability flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Function}
 */
export const findIsEditAvailable = (data = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getIsEditAvailableAPI(data);

		dispatch(setIsEditAvailable(response));
		dispatch(setToggle(false));
	}
};

/**
 * Create subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Function}
 */
export const createSubject = (data = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await createSubjectAPI(data);

		dispatch(setNewSubject(response));
		dispatch(setToggle(false));
	}
};

/**
 * Clear data
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @returns {Function}
 */
export const clearData = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_DATA });
	}
};
