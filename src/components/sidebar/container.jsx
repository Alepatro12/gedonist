import React from 'react';
import Menu from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getIsFetching, getMenu } from './../../redux/selectors';
import { backToMain } from './../../redux/music-reducer';

const MenuClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching}/>
		<Menu {...props}/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		menu: getMenu(state),
	}
}

const MenuContainer = connect(mapStateToProps, { backToMain }) (MenuClassContainer);

export default MenuContainer;