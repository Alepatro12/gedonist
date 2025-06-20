import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CreateSubject from './index';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import {
	clearData,
	createSubject,
	findIsEditAvailable,
} from './../../../redux/repetition-reducer';
import {
	getErrorText,
	getNewSubjectId,
	getIsEditAvailable,
} from './../../../redux/repetition-selectors';

/**
 * Get the subject create page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const RepetitionCreateSubjectClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<CreateSubject {...props}/>
	</>;
});

/**
 * Get parameters for the subject create page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition-create-subject',
		userId: getUserId(state),
		errorText: getErrorText(state),
		subjectId: getNewSubjectId(state),
		isEditAvailable: getIsEditAvailable(state),
	};
}

/**
 * Pass parameters to the subject create page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const RepetitionCreateSubject = compose(
	connect(mapStateToProps, {
		clearData,
		createSubject,
		findIsEditAvailable,
	})
) (RepetitionCreateSubjectClassContainer);

export default RepetitionCreateSubject;
