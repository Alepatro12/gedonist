/**
 * Get text error
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {String}
 */
export const getErrorText = (state) => state.repetitionEditSubject.error.text;

/**
 * Get subject rename success flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Bool}
 */
export const getIsSubjectRenamed = (state) => state.repetitionEditSubject.isSubjectRenamed;

/**
 * Get deleted subject flag
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} state
 * @returns {Bool}
 */
export const getIsSubjectDeleted = (state) => state.repetitionEditSubject.isSubjectDeleted;
