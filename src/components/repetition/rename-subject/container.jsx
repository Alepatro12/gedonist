import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import RenameSubject from './index';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import { findDiscipline } from './../../../redux/repetition-reducer';
import { renameSubject, clearData } from './../../../redux/repetition-edit-subject-reducer';
import { getName, getDisciplineId, getIsEditAvailable } from './../../../redux/repetition-selectors';
import { getErrorText, getIsSubjectRenamed } from './../../../redux/repetition-edit-subject-selectors';

/**
 * Get the subject rename page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const RepetitionRenameSubjectClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<RenameSubject {...props}/>
	</>;
});

/**
 * Get parameters for the subject rename page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition-rename-subject',
		name: getName(state),
		userId: getUserId(state),
		errorText: getErrorText(state),
		disciplineId: getDisciplineId(state),
		isEditAvailable: getIsEditAvailable(state),
		isSubjectRenamed: getIsSubjectRenamed(state),
	};
}

/**
 * Pass parameters to the subject rename page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const RepetitionRenameSubject = compose(
	connect(mapStateToProps, {
		clearData,
		renameSubject,
		findDiscipline,
	})
) (RepetitionRenameSubjectClassContainer);

export default RepetitionRenameSubject;
