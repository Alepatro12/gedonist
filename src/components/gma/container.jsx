import React from 'react';
import GMA from './index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from './../common/loader/index';
import {
	getUserId,
	getUserType,
	getIsFetching,
	getIsAuthenticate
} from './../../redux/selectors';
import {
	getNominees,
	getCollection,
	getIsMainPage,
	getCollections,
	getNominations,
	getNominationId,
	getCollectionId,
	getWinnerArtist,
	getNominationName,
	getCollectionName,
	getUserCollections,
	getNominationTypeId
} from './../../redux/gma-selectors';
import {
	findWinner,
	backToMain,
	findNominees,
	findNominations
} from './../../redux/gma-reducer';

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
		<GMA {...props}/>
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
		page: 'gma',
		userType: getUserType(state),
		nominees: getNominees(state),
		isAuthenticate: getIsAuthenticate(state),
		collectionId: getCollectionId(state),
		isMainPage: getIsMainPage(state),
		collection: getCollection(state),
		isFetching: getIsFetching(state),
		userId: getUserId(state),
		collections: getCollections(state),
		nominations: getNominations(state),
		winnerArtist: getWinnerArtist(state),
		collectionName: getCollectionName(state),
		userCollections: getUserCollections(state),
		nominationId: getNominationId(state),
		nominationName: getNominationName(state),
		nominationTypeId: getNominationTypeId(state),
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
		findNominees,
		backToMain,
		findWinner,
		findNominations,
	})
) (MusicClassContainer);

export default MusicContainer;