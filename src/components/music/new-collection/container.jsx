import React from 'react';
import NewCollection from './index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from './../../common/loader/index';
import {
	getUserId,
	getUserName,
	getIsAuthenticate
} from './../../../redux/selectors';
import { createCollection } from './../../../redux/music-reducer';
import {
	getPerformer,
	getIsFetching,
	getIsDisabled,
	getCollectionError
} from './../../../redux/music-selectors';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';

const NewCollectionContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<NewCollection
			userId={props.userId}
			performer={props.performer}
			isAuthenticate={props.isAuthenticate}
			createCollection={props.createCollection}
			errorText={props.errorText}
			isDisabled={props.isDisabled}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		page: 'music',
		userId: getUserId(state),
		userName: getUserName(state),
		performer: getPerformer(state),
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		errorText: getCollectionError(state),
		isAuthenticate: getIsAuthenticate(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		createCollection
	}),
	withAuthRedirect
) (NewCollectionContainer);