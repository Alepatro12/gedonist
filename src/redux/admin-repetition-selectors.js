/**
 * Get menu of repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getMenu = (state) => state.adminRepetition.menu;

/**
 * Get discipline ID
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {number}
 */
export const getDisciplineId = (state) => state.adminRepetition.disciplineId;

/**
 * Get name of discipline
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getName = (state) => state.adminRepetition.name;

/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsFetching = (state) => state.adminRepetition.isFetching;

/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsCreationQuestion = (state) => state.adminRepetition.isCreationQuestion;

/**
 * Get show success flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsShowSuccess = (state) => state.adminRepetition.isShowSuccess;

/**
 * Get result text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getResultText = (state) => state.adminRepetition.resultText;

/**
 * Get show error flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsShowError = (state) => state.adminRepetition.isShowError;

/**
 * Get questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getQuestions = (state) => state.adminRepetition.questions;

/**
 * Get answers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getAnswers = (state) => state.adminRepetition.answers;
