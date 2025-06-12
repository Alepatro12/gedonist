import React from 'react';
import { connect } from 'react-redux';

import PopUpNotification from './index';
import Loader from './../common/loader/index';
import {
	clearData,
	sendRequest,
} from './../../redux/pop-up-notification-reducer';
import {
	getURL,
	getText,
	getData,
	getIsShow,
	getLifeTime,
	getIsFetching,
} from './../../redux/pop-up-notification-selectors';

/**
 * Get the pop up notification
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const PopUpNotificationClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<PopUpNotification {...props}/>
	</>
});

/**
 * Get parameters for the pop up notification
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state) => {
	return {
		url: getURL(state),
		text: getText(state),
		data: getData(state),
		isShow: getIsShow(state),
		lifeTime: getLifeTime(state),
		isFetching: getIsFetching(state),
	}
}

/**
 * Pass parameters to the pop up notification
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {HTMLElement}
 */
const PopUpNotificationContainer = connect(
	mapStateToProps, {
		clearData,
		sendRequest,
	}
) (PopUpNotificationClassContainer);

export default PopUpNotificationContainer;