import React from 'react';
import Music from './index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from './../common/loader/index';
import {
	getUserId,
	getUserName,
	getIsFetching,
	getIsAuthenticate
} from './../../redux/selectors';
import {
	getPerformer,
	getCollection,
	getPerformers,
	getMusicFocus,
	getIsMainPage,
	getCollections,
	getCollectionId,
	getCollectionName,
	getIsAddPerformer,
	getUserCollections,
	getCountCollections,
	getCollectionUserId,
	getPerformersStorage,
	getIsAddPerformerStorage,
	getSearchPerformersStorage,
	getIsShowModalUserCollections
} from './../../redux/music-selectors';
import {
	setIsFocus,
	backToMain,
	addPerformer,
	findPerformer,
	findPerformers,
	findCollections,
	deleteCollection,
	findIsAddPerformer,
	findUserCollections,
	findCollectionElements,
	findPerformerFromStorage,
	getPerformersFromStorage,
	setIsShowModalUserCollections
} from './../../redux/music-reducer';
import { withAuthRedirect } from './../../hoc/withAuthRedirectComponent';

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
		page: 'music-page',
		isAddPerformer: getIsAddPerformer(state),
		isAuthenticate: getIsAuthenticate(state),
		collectionId: getCollectionId(state),
		isMainPage: getIsMainPage(state),
		collection: getCollection(state),
		isFetching: getIsFetching(state),
		performers: getPerformers(state),
		performer: getPerformer(state),
		isFocus: getMusicFocus(state),
		userId: getUserId(state),
		userRealName: getUserName(state),
		collections: getCollections(state),
		collectionName: getCollectionName(state),
		userCollections: getUserCollections(state),
		countCollection: getCountCollections(state),
		collectionUserId: getCollectionUserId(state),
		performersStorage: getPerformersStorage(state),
		isAddPerformerStorage: getIsAddPerformerStorage(state),
		searchPerformersStorage: getSearchPerformersStorage(state),
		isShowModalUserCollections: getIsShowModalUserCollections(state)
	};
}

/**
 * Pass parameters to the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 */
const MusicContainer = compose(
	connect(mapStateToProps, {
		findCollections,
		findPerformers,
		findPerformer,
		addPerformer,
		backToMain,
		setIsFocus,
		deleteCollection,
		findIsAddPerformer,
		findUserCollections,
		findCollectionElements,
		findPerformerFromStorage,
		getPerformersFromStorage,
		setIsShowModalUserCollections
	}),
	withAuthRedirect
) (MusicClassContainer);

export default MusicContainer;