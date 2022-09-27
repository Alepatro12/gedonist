import React from 'react';
import Registration from './index';
import { connect } from 'react-redux';
import Loader from './../../common/loader/index';
import { getNewPassword } from './../../../redux/account-data-reducer';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';
import { getIsFetching, getIsDisabled, getNewPasswordError } from './../../../redux/selectors';
import { compose } from 'redux';

const NewPasswordContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Registration
			errorText={props.errorText}
			isDisabled={props.isDisabled}
			getNewPassword={props.getNewPassword}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		errorText: getNewPasswordError(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		getNewPassword
	}),
	withAuthRedirect
) (NewPasswordContainer);