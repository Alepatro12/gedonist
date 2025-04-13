import {} from './../api/repetition-edit-subject';

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

const initialState = {
	isFetching: false,
	isDisabled: false,
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

export default RepetitionEditSubjectReducer;
