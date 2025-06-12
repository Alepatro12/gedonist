import { getMenuAPI } from './../api/menu';

/**
 * @const
 * @type {string} Action type - toggle is fetching
 */
const TOGGLE_IS_FETCHING = 'menu/TOGGLE_IS_FETCHING';

/**
 * @const
 * @type {string} Action type - toggle is disabled
 */
const TOGGLE_IS_DISABLED = 'menu/TOGGLE_IS_DISABLED';

/**
 * @const
 * @type {string} Action type - get menu
 */
const GET_MENU = 'menu/GET_MENU';

/**
 * @const
 * @type {Object} Initial state
 */
const initialState = {
	menu: [],
	subMenu: [],
	isFetching: false,
	isDisabled: false,
	error: {
		code: 0,
		text: '',
	},
};

/**
 * Reducer the Sidebar
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state Old state
 * @param {Object} action New date
 * @returns {Object} New state
 */
const menuReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case GET_MENU: {
			return {
				...state,
				menu: [ ...action.menu ],
				error: { ...action.error },
				subMenu: [ ...action.subMenu ],
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
 * Set menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of menu
 * @param {Array} subMenu List of sub menu
 * @param {Object} error
 * @returns {Object}
 */
const setMenu = ({ menu = [], subMenu = [], error = {} }) => {
	return {
		menu,
		error,
		subMenu,
		type: GET_MENU,
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
	};
};

/**
 * Find menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} parameters
 * @returns {Function}
 */
export const findMenu = (parameters = {}) => {
	return async (dispatch) => {
		dispatch(setToggle(true));

		const response = await getMenuAPI(parameters);

		dispatch(setMenu(response));
		dispatch(setToggle(false));
	};
};

export default menuReducer;
