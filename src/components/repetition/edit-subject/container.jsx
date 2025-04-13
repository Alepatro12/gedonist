import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import EditSubject from './index';
import Loader from './../../common/loader/index';
import { getUserId } from './../../../redux/selectors';
import {
	findDiscipline,
} from './../../../redux/repetition-edit-questions-reducer';
import {
	getName,
	getDisciplineId,
} from './../../../redux/repetition-edit-questions-selectors';

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
		disciplineId: getDisciplineId(state),
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
		findDiscipline,
	})
) (EditSubjectClassContainer);

export default EditSubjectContainer;
