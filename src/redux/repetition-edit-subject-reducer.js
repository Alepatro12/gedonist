import { renameSubjectAPI, deleteSubjectAPI } from './../api/repetition-edit-subject';

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'repetition-edit-subject/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'repetition-edit-subject/TOGGLE_IS_DISABLED';

/**
 * @const
 * @type {string} Action type - set new subject name
 */
const SET_NEW_SUBJECT_NAME = 'repetition-edit-subject/SET_NEW_SUBJECT_NAME';

/**
 * @const
 * @type {string} Action type - clear data
 */
const CLEAR_DATA = 'repetition-edit-subject/CLEAR_DATA';

/**
 * @const
 * @type {string} Action type - set deleted subject
 */
const SET_DELETED_SUBJECT = 'repetition-edit-subject/SET_DELETED_SUBJECT';

const initialState = {
	isFetching: false,
	isDisabled: false,
	isSubjectRenamed: false,
	isSubjectDeleted: false,
	error: {
		code: 0,
		text: '',
	},
};

/**
 * Reducer the edit subject pages
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const RepetitionEditSubjectReducer = (state = initialState, action = {}) => {
	switch (action.type) {
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
		case SET_NEW_SUBJECT_NAME: {
			return {
				...state,
				error: { ...action.error },
				resultText: action.resultText,
				isSubjectRenamed: !action.error.code,
			};
		}
		case SET_DELETED_SUBJECT: {
			return {
				...state,
				error: { ...action.error },
				resultText: action.resultText,
				isSubjectDeleted: !action.error.code,
			};
		}
		case CLEAR_DATA: {
			return {
				...state,
				isSubjectDeleted: false,
				isSubjectRenamed: false,
			};
		}
		default:
			return state;
	}
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
 * Set new subject name
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} resultText Query result text
 * @param {Object} error
 * @returns {Object}
 */
const setNewSubjectName = ({
	error = {},
	resultText = '',
}) => {
	return {
		error,
		resultText,
		type: SET_NEW_SUBJECT_NAME,
	};
};

/**
 * Set deleted subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} resultText Query result text
 * @param {Object} error
 * @returns {Object}
 */
const setDeletedSubject = ({
	error = {},
	resultText = '',
}) => {
	return {
		error,
		resultText,
		type: SET_DELETED_SUBJECT,
	};
};

/**
 * Rename subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Function}
 */
export const renameSubject = (data = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await renameSubjectAPI(data);

		dispatch(setNewSubjectName(response));
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

/**
 * Delete subject
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} data
 * @returns {Function}
 */
export const deleteSubject = (data = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await deleteSubjectAPI(data);

		dispatch(setDeletedSubject(response));
		dispatch(setToggle(false));
	}
};

export default RepetitionEditSubjectReducer;
