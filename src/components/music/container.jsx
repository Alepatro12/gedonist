import React from 'react';
import Music from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import {
	getUserId,
	getIsFetching,
	getIsAuthenticate
} from './../../redux/selectors';
import {
	getPerformer,
	getCollection,
	getPerformers,
	getMusicFocus,
	getIsMainPage,
	getIsAddPerformer,
	getPerformersStorage,
	getIsAddPerformerStorage,
	getSearchPerformersStorage
} from './../../redux/music-selectors';
import {
	setIsFocus,
	backToMain,
	addPerformer,
	findPerformer,
	findPerformers,
	findCollection,
	findIsAddPerformer,
	findPerformerFromStorage,
	getPerformersFromStorage
} from './../../redux/music-reducer';

/**
 * Get the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const MusicClassContainer = React.memo(({
	isFetching,
	...props
}) => {
	return <>
		<Loader isFetching={isFetching}/>
		<Music {...props}/>
	</>;
});

/**
 * Get parameters for the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @returns {Object}
 */
const mapStateToProps = (state) => {
	return {
		isAddPerformer: getIsAddPerformer(state),
		isAuthenticate: getIsAuthenticate(state),
		isMainPage: getIsMainPage(state),
		collection: getCollection(state),
		isFetching: getIsFetching(state),
		performers: getPerformers(state),
		performer: getPerformer(state),
		isFocus: getMusicFocus(state),
		userId: getUserId(state),
		performersStorage: getPerformersStorage(state),
		isAddPerformerStorage: getIsAddPerformerStorage(state),
		searchPerformersStorage: getSearchPerformersStorage(state)
	};
}

/**
 * Pass parameters to the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 */
const MusicContainer = connect(mapStateToProps, {
	findCollection,
	findPerformers,
	findPerformer,
	addPerformer,
	backToMain,
	setIsFocus,
	findIsAddPerformer,
	findPerformerFromStorage,
	getPerformersFromStorage
}) (MusicClassContainer);

export default MusicContainer;