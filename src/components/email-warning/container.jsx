import React from 'react';
import WarningEmail from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getIsAuthenticate, getIsFetching, getEmailStatus, getIsChangePassword } from './../../redux/selectors';

const EmailWarningClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<WarningEmail
			emailStatus={props.emailStatus}
			isAuthenticate={props.isAuthenticate}
			isChangePassword={props.isChangePassword}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		emailStatus: getEmailStatus(state),
		isAuthenticate: getIsAuthenticate(state),
		isChangePassword: getIsChangePassword(state),
	}
}

const EmailWarningContainer = connect(mapStateToProps, {}) (EmailWarningClassContainer);

export default EmailWarningContainer;