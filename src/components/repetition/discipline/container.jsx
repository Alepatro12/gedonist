import React from 'react';
import Repetition from './index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import {
	getName,
	getIsFinal,
	getCounter,
	getIsChecking,
	getPageNumbers,
	getDisciplineId,
	getCurrentQuestion,
} from './../../../redux/repetition-selectors';
import {
	checkAnswer,
	skipQuestion,
	findQuestions,
	findDiscipline,
	moveNextQuestion,
} from './../../../redux/repetition-reducer';

/**
 * Get the discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const RepetitionDisciplineClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<Repetition {...props}/>
	</>;
});

/**
 * Get parameters for the discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition-subject',
		name: getName(state),
		userId: getUserId(state),
		counter: getCounter(state),
		isFinal: getIsFinal(state),
		isChecking: getIsChecking(state),
		pageNumbers: getPageNumbers(state),
		disciplineId: getDisciplineId(state),
		currentQuestion: getCurrentQuestion(state),
	};
}

/**
 * Pass parameters to the discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const RepetitionDisciplineContainer = compose(
	connect(mapStateToProps, {
		checkAnswer,
		skipQuestion,
		findQuestions,
		findDiscipline,
		moveNextQuestion,
	})
) (RepetitionDisciplineClassContainer);

export default RepetitionDisciplineContainer;
