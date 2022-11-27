import React from 'react';
import Music from './index';
import { connect } from 'react-redux';
import Loader from './../common/loader/index';
import { getIsFetching, getPerformers, getMusicFocus, getPerformer, getIsAuthenticate, getUserId, getIsAddPerformer, getCollection } from './../../redux/selectors';
import { findPerformers, setIsFocus, findPerformer, addPerformer, findCollection } from './../../redux/music-reducer';


const MusicClassContainer = React.memo(props => {
	return <>
		<Loader isFetching={props.isFetching} />
		<Music
			findCollection={props.findCollection}
			isAddPerformer={props.isAddPerformer}
			isAuthenticate={props.isAuthenticate}
			findPerformers={props.findPerformers}
			findPerformer={props.findPerformer}
			addPerformer={props.addPerformer}
			setIsFocus={props.setIsFocus}
			collection={props.collection}
			performers={props.performers}
			performer={props.performer}
			isFocus={props.isFocus}
			userId={props.userId}
		/>
	</>
});

const mapStateToProps = (state) => {
	return {
		isAddPerformer: getIsAddPerformer(state),
		isAuthenticate: getIsAuthenticate(state),
		collection: getCollection(state),
		isFetching: getIsFetching(state),
		performers: getPerformers(state),
		performer: getPerformer(state),
		isFocus: getMusicFocus(state),
		userId: getUserId(state),
	}
}

const MusicContainer = connect(mapStateToProps, {
	findCollection,
	findPerformers,
	findPerformer,
	addPerformer,
	setIsFocus,
}) (MusicClassContainer);

export default MusicContainer;