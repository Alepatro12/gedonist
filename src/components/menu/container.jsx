import React from 'react';
import Menu from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getIsFetching, getMenu } from './../../redux/selectors';

const MenuClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Menu menu={props.menu} />
	</>
});

const mapStateToProps = (state) => {
	return {
		isFetching: getIsFetching(state),
		menu: getMenu(state),
	}
}

const MenuContainer = connect(mapStateToProps, {}) (MenuClassContainer);

export default MenuContainer;