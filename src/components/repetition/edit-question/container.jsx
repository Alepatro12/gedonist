import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import RepetitionEditQuestion from './index';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import {
	search,
	clearError,
	editQuestion,
	deleteQuestion,
	createQuestion,
	findDiscipline,
	setCreationQuestion,
} from './../../../redux/repetition-edit-questions-reducer';
import {
	getName,
	getAnswers,
	getQuestions,
	getResultText,
	getIsShowError,
	getDisciplineId,
	getIsShowSuccess,
	getIsCreationQuestion,
} from './../../../redux/repetition-edit-questions-selectors';

/**
 * Get the edit question discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const RepetitionEditQuestionClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<RepetitionEditQuestion {...props}/>
	</>;
});

/**
 * Get parameters for the edit question discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition-edit-question',
		name: getName(state),
		userId: getUserId(state),
		answers: getAnswers(state),
		questions: getQuestions(state),
		resultText: getResultText(state),
		isShowError: getIsShowError(state),
		disciplineId: getDisciplineId(state),
		isShowSuccess: getIsShowSuccess(state),
		isCreationQuestion: getIsCreationQuestion(state),
	};
}

/**
 * Pass parameters to the edit question discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const RepetitionEditQuestionContainer = compose(
	connect(mapStateToProps, {
		search,
		clearError,
		editQuestion,
		deleteQuestion,
		createQuestion,
		findDiscipline,
		setCreationQuestion,
	})
) (RepetitionEditQuestionClassContainer);

export default RepetitionEditQuestionContainer;
