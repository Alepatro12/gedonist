import React from 'react';
import { compose } from 'redux';
import AdminRepetition from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getUserId } from './../../redux/selectors';
import { findMenu } from './../../redux/admin-repetition-reducer';
import { getMenu, getIsFetching } from './../../redux/admin-repetition-selectors';

/**
 * Get the admin repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const AdminRepetitionClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<AdminRepetition {...props}/>
	</>;
});

/**
 * Get parameters for the admin repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'admin-repetition',
		menu: getMenu(state),
		userId: getUserId(state),
		isFetching: getIsFetching(state),
	};
}

/**
 * Pass parameters to the admin repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const AdminRepetitionContainer = compose(
	connect(mapStateToProps, { findMenu })
) (AdminRepetitionClassContainer);

export default AdminRepetitionContainer;
