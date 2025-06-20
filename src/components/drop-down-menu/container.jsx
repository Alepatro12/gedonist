import React from 'react';
import { connect } from 'react-redux';

import DropDownMenu from './index';
import Loader from './../common/loader/index';
import { getIsFetching, getSubMenu } from './../../redux/selectors';

const DropDownMenuClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching}/>
		<DropDownMenu {...props}/>
	</>
});

const mapStateToProps = (state) => {
	return {
		subMenu: getSubMenu(state),
		isFetching: getIsFetching(state),
	}
}

const DropDownMenuContainer = connect(mapStateToProps, {}) (DropDownMenuClassContainer);

export default DropDownMenuContainer;
