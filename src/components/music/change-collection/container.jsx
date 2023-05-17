import React from 'react';
import ChangeCollection from './index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from './../../common/loader/index';
import {
	getUserId,
	getUserName,
	getIsAuthenticate
} from './../../../redux/selectors';
import { changeCollection } from './../../../redux/music-reducer';
import {
	getPerformer,
	getIsFetching,
	getIsDisabled,
	getCollectionId,
	getCollectionError
} from './../../../redux/music-selectors';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';

const ChangeCollectionContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<ChangeCollection
			userId={props.userId}
			collectionId={props.collectionId}
			isAuthenticate={props.isAuthenticate}
			changeCollection={props.changeCollection}
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
		collectionId: getCollectionId(state),
		isAuthenticate: getIsAuthenticate(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		changeCollection
	}),
	withAuthRedirect
) (ChangeCollectionContainer);