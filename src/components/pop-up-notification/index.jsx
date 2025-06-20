import './style.css';

import React from 'react';

/**
 * Render the pop up notification
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} url Request URL
 * @param {Object} data Data for request
 * @param {Number} lifeTime Popup lifetime
 * @param {Boolean} isShow Showing pop up flag
 * @param {Function} clearData Clear data
 * @param {Function} sendRequest
 * @returns {HTMLElement}
 */
const PopUpNotification = React.memo(({
	url = '',
	data = {},
	lifeTime = 0,
	isShow = false,
	clearData = () => {},
	sendRequest = () => {},
	...props
}) => {
	if (!lifeTime || !url || !isShow) {
		return <></>;
	}

	const timerId = setTimeout(() => clearData(), lifeTime);

	const startSendingRequest = () => {
		if (!url || !Object.keys(data).length) {
			return false;
		}

		clearTimeout(timerId);
		sendRequest(url, data);
	}

	return <NotificationBlock
		clearData={clearData}
		startSendingRequest={startSendingRequest}
		{...props}
	/>;
});

/**
 * Get the pop up notification block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} text
 * @param {Function} clearData Clear data
 * @param {Function} startSendingRequest Start sending request
 * @returns {HTMLElement}
 */
const NotificationBlock = React.memo(({
	text = '',
	clearData = () => {},
	startSendingRequest = () => {}
}) => {
	return <div className="pop-up-notification">
			<div className="pop-up-notification__text btn-link" onClick={startSendingRequest}>{text}</div>
			<button className="btn-close" onClick={clearData}></button>
		</div>
	;
});

export default PopUpNotification;
