import React from 'react';
import Login from './index';
import { connect } from 'react-redux';
import Loader from './../../common/loader/index';
import { getLogin } from './../../../redux/account-data-reducer';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';
import { getIsFetching, getIsDisabled, getLoginError } from './../../../redux/selectors';
import { compose } from 'redux';

const LoginContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Login
			getLogin={props.getLogin}
			errorText={props.errorText}
			isDisabled={props.isDisabled}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		errorText: getLoginError(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		getLogin
	}),
	withAuthRedirect
) (LoginContainer);