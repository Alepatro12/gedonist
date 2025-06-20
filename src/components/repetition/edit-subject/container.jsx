import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import EditSubject from './index';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import { findDiscipline } from './../../../redux/repetition-reducer';
import { showPopUp } from './../../../redux/pop-up-notification-reducer';
import { deleteSubject, clearData } from './../../../redux/repetition-edit-subject-reducer';
import { getName, getDisciplineId, getIsEditAvailable } from './../../../redux/repetition-selectors';
import { getErrorText, getIsSubjectDeleted } from './../../../redux/repetition-edit-subject-selectors';

/**
 * Get the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const EditSubjectClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<EditSubject {...props}/>
	</>;
});

/**
 * Get parameters for the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition-edit-subject',
		name: getName(state),
		userId: getUserId(state),
		errorText: getErrorText(state),
		disciplineId: getDisciplineId(state),
		isEditAvailable: getIsEditAvailable(state),
		isSubjectDeleted: getIsSubjectDeleted(state),
	};
}

/**
 * Pass parameters to the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const EditSubjectContainer = compose(
	connect(mapStateToProps, {
		showPopUp,
		clearData,
		deleteSubject,
		findDiscipline,
	})
) (EditSubjectClassContainer);

export default EditSubjectContainer;
