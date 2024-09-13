import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AdminRepetitionDiscipline from './index';
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
} from './../../../redux/admin-repetition-reducer';
import {
	getName,
	getAnswers,
	getQuestions,
	getResultText,
	getIsShowError,
	getDisciplineId,
	getIsShowSuccess,
	getIsCreationQuestion,
} from './../../../redux/admin-repetition-selectors';

/**
 * Get the admin discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const AdminRepetitionDisciplineClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<AdminRepetitionDiscipline {...props}/>
	</>;
});

/**
 * Get parameters for the admin discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'admin-repetition-discipline',
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
 * Pass parameters to the admin discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const AdminRepetitionDisciplineContainer = compose(
	connect(mapStateToProps, {
		search,
		clearError,
		editQuestion,
		deleteQuestion,
		createQuestion,
		findDiscipline,
		setCreationQuestion,
	})
) (AdminRepetitionDisciplineClassContainer);

export default AdminRepetitionDisciplineContainer;
