import React from 'react';
import WarningEmail from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getIsAuthenticate, getIsFetching, getEmailStatus } from './../../redux/selectors';

const EmailWarningClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<WarningEmail
			isAuthenticate={props.isAuthenticate}
			emailStatus={props.emailStatus}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isAuthenticate: getIsAuthenticate(state),
		emailStatus: getEmailStatus(state),
		isFetching: getIsFetching(state),
	}
}

const EmailWarningContainer = connect(mapStateToProps, {}) (EmailWarningClassContainer);

export default EmailWarningContainer;