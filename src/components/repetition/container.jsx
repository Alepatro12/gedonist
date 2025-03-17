import React from 'react';
import { compose } from 'redux';
import Repetition from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getUserId } from './../../redux/selectors';
import { findMenu } from './../../redux/repetition-reducer';
import { getMenu, getIsFetching, getOwnerName } from './../../redux/repetition-selectors';

/**
 * Get the Repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFetching Loader show flag
 * @param {Object} props
 * @returns {HTMLElement}
 */
const RepetitionClassContainer = React.memo(({
	isFetching = false,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<Repetition {...props}/>
	</>;
});

/**
 * Get parameters for the Repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state = {}) => {
	return {
		page: 'repetition',
		menu: getMenu(state),
		userId: getUserId(state),
		ownerName: getOwnerName(state),
		isFetching: getIsFetching(state),
	};
}

/**
 * Pass parameters to the Repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const RepetitionContainer = compose(
	connect(mapStateToProps, { findMenu })
) (RepetitionClassContainer);

export default RepetitionContainer;
