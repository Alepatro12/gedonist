/**
 * Get fetching status
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsFetching = (state) => state.repetitionEditQuestions.isFetching;

/**
 * Get creation question flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsCreationQuestion = (state) => state.repetitionEditQuestions.isCreationQuestion;

/**
 * Get show success flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsShowSuccess = (state) => state.repetitionEditQuestions.isShowSuccess;

/**
 * Get result text
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getResultText = (state) => state.repetitionEditQuestions.resultText;

/**
 * Get show error flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {bool}
 */
export const getIsShowError = (state) => state.repetitionEditQuestions.isShowError;

/**
 * Get questions
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getQuestions = (state) => state.repetitionEditQuestions.questions;

/**
 * Get answers
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Array}
 */
export const getAnswers = (state) => state.repetitionEditQuestions.answers;
