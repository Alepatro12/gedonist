import './style.css';
import React, { useLayoutEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * Render the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const GMA = React.memo(({
	isMainPage,
	backToMain,
	findNominations,
	isAuthenticate,
	findNominees,
	...props
}) => {
	const location = useLocation();
	const year = location.pathname.replace(/\/gma\//, '');

	useLayoutEffect(() => {
		const params = new URLSearchParams(location.search);
		const newNominationId = Number(params.get('nomination'));

		if (newNominationId) {
			findNominees(newNominationId, year);
		} else {
			findNominations();
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	return <Collections {...props}/>;
});

/**
 * Get user collections
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const Collections = React.memo(({
	nominees,
	nominations,
	collectionName,
	nominationId,
	nominationName,
	nominationTypeId,
}) => {
	const elements = nominationId ? nominees : nominations;
	const nominationTypeName = nominationTypeId === '2' ? 'album' : 'artist';

	return <Collection elements={elements} nominationId={nominationId} nominationName={nominationName} nominationTypeName={nominationTypeName} nominationTypeId={nominationTypeId} collectionName={collectionName}/>;
});

/**
 * Get user collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const Collection = React.memo(({
	elements,
	nominationId,
	nominationName,
	nominationTypeId,
	nominationTypeName,
}) => {
	let blockNominations = '';
	let blockMainNominations = '';

	if (elements && elements.length) {
		blockMainNominations =
			elements.map(element => {
				if (element.priority !== '1') {
					return <></>;
				}

				return <NominationBlock element={element}></NominationBlock>;
			})
		;
	}

	if (elements && elements.length) {
		blockNominations =
			elements.map(element => {
				if (element.priority === '1') {
					return <></>;
				}

				return <NominationBlock element={element} nominationTypeName={nominationTypeName} nominationId={nominationId} nominationTypeId={nominationTypeId}></NominationBlock>;
			})
		;
	}

	return <div>
		{ nominationId ?
			<div className="gma-collection-header">
				<span>{nominationName}</span>
				<div className="gma-collection-header__change">
					<NavLink to="/gma/2024" className="gma-collection-header__link">Назад</NavLink>
				</div>
			</div>
		: <></> }
		<div className="gma-item-list gma-item-list--center">
			{blockMainNominations}
		</div>
		<div className="gma-item-list">
			{blockNominations}
		</div>
	</div>;
});

/**
 * Get a block of information about genres
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} genres
 * @returns {HTMLElement}
 */
const NominationBlock = React.memo(({
	element = {},
	nominationId = 0,
	nominationTypeId = 0,
	nominationTypeName = 'artist',
}) => {
	let id = 0;
	let name = '';
	let imageId = 0;

	switch(nominationTypeId) {
		case 0:
			id = element.id;
			name = element.name;
			imageId = element.imageId;
			break;
		case '0':
			id = element.artistId;
			name = element.artistName;
			imageId = element.imageId;
			break;
		case '1':
			id = element.songId;
			name = `${element.artistName} — ${element.songName}${ element.featArtists ? `(feat. ${element.featArtists})` : '' }`;
			imageId = element.imageId;
			break;
		case '2':
			id = element.albumId;
			name = `${element.artistName} — ${element.albumName}`;
			imageId = element.albumImageId;
			break;
		default:
			id = element.id;
			name = element.name;
			imageId = element.imageId;
	}
	if (nominationTypeId === 0) {
		id = element.id;
		name = element.name;
		imageId = element.imageId;
	}

	const emptyClass = imageId ? '' : ' gma-item__image-block--empty';

	return <>
		<div className="gma-item" key={id}>
			<div className="gma-item__block">
				{ !nominationId &&
					<NavLink to={`/gma/2024?nomination=${id}`} className="gma-item__link"></NavLink>
				}
				<div className="gma-item__shadow">
					<div className={`gma-item__image-block${emptyClass}`}>
						<LazyLoadImage
							className="gma-item__image"
							effect="blur"
							src={`./../../img/gma/${nominationTypeName}/${imageId ? imageId : 'default'}.jpg`}
							alt={name}
							title={name}
							width="100%"
							height="100%"
						/>
					</div>
					<div className="gma-item__title"><span>{name}</span></div>
				</div>
			</div>
		</div>
	</>;
});

export default GMA; 