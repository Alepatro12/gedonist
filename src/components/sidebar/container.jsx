import React from 'react';
import Menu from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import {
	getMenu,
	getUserId,
	getUserName,
	getUserType,
	getIsFetching,
} from './../../redux/selectors';
import { findMenu } from './../../redux/menu-reducer';
import { backToMain } from './../../redux/music-reducer';

const MenuClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching}/>
		<Menu {...props}/>
	</>
});

const mapStateToProps = (state) => {
	return {
		menu: getMenu(state),
		userId: getUserId(state),
		userName: getUserName(state),
		userType: getUserType(state),
		isFetching: getIsFetching(state),
	}
}

const MenuContainer = connect(
	mapStateToProps, {
		findMenu,
		backToMain,
	}
) (MenuClassContainer);

export default MenuContainer;
