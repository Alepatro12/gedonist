import {
	getDisciplineAPI,
	getChangeQuestionAPI,
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
 * @type {string} Action type - get discipline ID
 */
const GET_DISCIPLINE_ID = 'repetition/GET_DISCIPLINE_ID';

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

const initialState = {
	name: '',
	menu: [],
	counter: 0,
	questions: [],
	pageNumbers: {},
	disciplineId: 0,
	isFetching: false,
	isDisabled: false,
	isChecking: false,
	currentQuestion: {},
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
			};
		}
		case GET_DISCIPLINE: {
			return {
				...state,
				counter: 0,
				name: action.name,
				error: { ...action.error },
				disciplineId: action.disciplineId,
				currentQuestion: { ...action.questions.pop() },
				questions: [ ...action.questions ],
				pageNumbers: { ...action.pageNumbers },
			};
		}
		case SKIP_QUESTION: {
			return {
				...state,
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
				counter: action.isRepeat ? state.counter : ++state.counter,
				currentQuestion: { ...state.questions.pop() },
				error: { ...action.error },
			};
		}
		case GET_DISCIPLINE_ID: {
			return {
				...state,
				disciplineId: action.disciplineId,
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
 * @returns {Object}
 */
const setMenu = ({ menu = [], error = {} }) => {
	return {
		menu,
		error,
		type: GET_MENU,
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
 * @param {Array} questions List of questions
 * @param {Object} pageNumbers Page numbers
 * @param {number} disciplineId Discipline ID
 * @returns {Object}
 */
const setDiscipline = ({
	name = '',
	error = {},
	questions = [],
	pageNumbers = {},
	disciplineId = 0,
}) => {
	return {
		name,
		error,
		questions,
		pageNumbers,
		disciplineId,
		type: GET_DISCIPLINE,
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
 * @returns {Function}
 */
export const findMenu = (userId = 0) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getMenuAPI(userId);

		dispatch(setMenu(response));
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
 * Set discipline ID
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} disciplineId discipline ID
 * @returns {Object}
 */
export const setDisciplineId = (disciplineId = 0) => {
	return {
		disciplineId,
		type: GET_DISCIPLINE_ID,
	};
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
 * @param {number} priority Prioritize the importance of repetition
 * @param {bool} isRepeat Question repeat flag
 * @returns {Function}
 */
export const moveNextQuestion = ({
	priority = 0,
	isRepeat = false,
	...props
}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = isRepeat || priority
			? await getChangeQuestionAPI({ isRepeat, priority, ...props })
			: {};

		dispatch(setNextQuestion(isRepeat, response));
		dispatch(setToggle(false));
	}
};

export default repetitionReducer;
