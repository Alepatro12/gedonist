/**
 * Get menu of repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getMenu = (state) => state.repetition.menu;

/**
 * Get discipline ID
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getDisciplineId = (state) => state.repetition.disciplineId;

/**
 * Get name of discipline
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getName = (state) => state.repetition.name;

/**
 * Get page numbers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getPageNumbers = (state) => state.repetition.pageNumbers;

/**
 * Get information on current question
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCurrentQuestion = (state) => state.repetition.currentQuestion;

/**
 * Get check flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getIsChecking = (state) => state.repetition.isChecking;

/**
 * Get counter of correct answers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getCounter = (state) => state.repetition.counter;

/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {boolean}
 */
export const getIsFetching = (state) => state.repetition.isFetching;
