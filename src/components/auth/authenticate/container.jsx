import React from 'react';
import Registration from './index';
import { connect } from 'react-redux';
import Loader from './../../common/loader/index';
import { getRegistration } from './../../../redux/account-data-reducer';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';
import { getIsFetching, getIsDisabled, getRegistrationError } from './../../../redux/selectors';
import { compose } from 'redux';

const RegistrationContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Registration
			errorText={props.errorText}
			isDisabled={props.isDisabled}
			getRegistration={props.getRegistration}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		errorText: getRegistrationError(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		getRegistration
	}),
	withAuthRedirect
) (RegistrationContainer);