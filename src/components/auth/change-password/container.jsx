import React from 'react';
import ChangePassword from './index';
import { connect } from 'react-redux';
import Loader from './../../common/loader/index';
import { getChangePassword } from './../../../redux/account-data-reducer';
import { withAuthRedirect } from './../../../hoc/withAuthRedirectComponent';
import { getIsFetching, getIsDisabled, getChangePasswordError } from './../../../redux/selectors';
import { compose } from 'redux';

const ChangePasswordContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<ChangePassword
			errorText={props.errorText}
			isDisabled={props.isDisabled}
			getChangePassword={props.getChangePassword}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		isDisabled: getIsDisabled(state),
		errorText: getChangePasswordError(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		getChangePassword
	}),
	withAuthRedirect
) (ChangePasswordContainer);