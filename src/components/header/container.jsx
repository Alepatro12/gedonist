import React from 'react';
import Header from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getLogout } from './../../redux/account-data-reducer';
import { getIsAuthenticate, getIsFetching, getIsDisabled, getUserName } from './../../redux/selectors';

const HeaderClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Header
			isAuthenticate={props.isAuthenticate}
			isDisabled={props.isDisabled}
			getLogout={props.getLogout}
			userName={props.userName}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isAuthenticate: getIsAuthenticate(state),
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		userName: getUserName(state)
	}
}

const HeaderContainer = connect(mapStateToProps, {
	getLogout,
}) (HeaderClassContainer);

export default HeaderContainer;