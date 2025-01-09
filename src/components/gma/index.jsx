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
	const winnerId = Object.keys(props.winnerArtist).length ? props.winnerArtist.artistId : 0;

	useLayoutEffect(() => {
		const params = new URLSearchParams(location.search);
		const newNominationId = Number(params.get('nomination'));

		if (newNominationId) {
			findNominees(newNominationId, year);
		} else {
			findNominations();
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search, winnerId]);

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
	userType,
	nominees,
	findWinner,
	nominations,
	collectionName,
	nominationId,
	winnerArtist,
	nominationName,
	nominationTypeId,
}) => {
	const elements = nominationId ? nominees : nominations;
	const nominationTypeName = nominationTypeId === '2' ? 'album' : 'artist';

	return <>
		<div>
			{ nominationId ?
				<div className="gma-collection-header">
					<span>{nominationName}</span>
					<div className="gma-collection-header__change">
						<NavLink to="/gma/2024" className="gma-collection-header__link">Назад</NavLink>
					</div>
				</div>
			: <></> }
			{nominationId && <CollectionWinner elements={elements} nominationId={nominationId} nominationName={nominationName} nominationTypeId={nominationTypeId} collectionName={collectionName} nominationTypeName={nominationTypeName}/>}
			{/* <WinnerArtist winner={winnerArtist} nominationTypeId={nominationTypeId} nominationTypeName={nominationTypeName}/> */}
			<Collection elements={elements} nominationId={nominationId} nominationName={nominationName} nominationTypeId={nominationTypeId} collectionName={collectionName} nominationTypeName={nominationTypeName}/>
			{!nominationId && <CollectionWinnerCommon elements={elements} nominationId={nominationId} nominationName={nominationName} nominationTypeId={nominationTypeId} collectionName={collectionName} nominationTypeName={nominationTypeName}/>}
			<AdminButton userType={userType} nominationId={nominationId} findWinner={findWinner}/>
		</div>
	</>;
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
	nominationTypeId,
	nominationTypeName,
}) => {
	let blockNominations = '';
	let blockMainNominations = '';

	if (elements && elements.length) {
		blockMainNominations =
			elements.map(element => {
				if (element.priority !== '1' || element.isShowWinners) {
					return <></>;
				}

				return <NominationBlock element={element}></NominationBlock>;
			})
		;
	}

	if (elements && elements.length) {
		blockNominations =
			elements.map(element => {
				if (element.priority === '1' || element.isShowWinners) {
					return <></>;
				}

				return <NominationBlock element={element} nominationTypeName={nominationTypeName} nominationId={nominationId} nominationTypeId={nominationTypeId}></NominationBlock>;
			})
		;
	}

	return <>
		<div className="gma-item-list gma-item-list--center">
			{blockMainNominations}
		</div>
		<div className="gma-item-list">
			{blockNominations}
		</div>
	</>;
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
			let songName = '';
			let artistName = '';
			let featArtists = '';
			let fullParticipationArtists = '';

			if (element.featArtists) {
				element.featArtists.forEach((featArtist) => {
					if (featArtist.type === '2') {
						fullParticipationArtists += fullParticipationArtists ? `, ${featArtist.name}` : featArtist.name;
					} else {
						featArtists += featArtists ? `, ${featArtist.name}` : featArtist.name;
					}
				});
			}

			songName = `${element.songName}${ featArtists ? `(feat. ${featArtists})` : '' }`;
			artistName = `${element.artistName}${ fullParticipationArtists ? `, ${fullParticipationArtists}` : '' }`;

			id = element.songId;
			name = `${artistName} — ${songName}`;
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
							src={`./../../img/gma/${nominationTypeName}/${imageId ? imageId : 'default'}.avif`}
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

/**
 * Get admin button
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const AdminButton = React.memo(({
	userType = 0,
	nominationId = 0,
	findWinner = () => {}
}) => {
	if (!nominationId || userType !== 2) {
		return <></>;
	}

	const showWinner = () => {
		findWinner(nominationId);
		window.scrollTo(0, 0);
	}

	return <>
		<div className="gma__center">
			<div
				className={`btn btn-target`}
				onClick={ showWinner }
			>Объявить победителя</div>
		</div>
	</>;
});

/**
 * Get admin button
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const WinnerArtist = React.memo(({
	winner = [],
	nominationTypeId = 0,
	nominationTypeName = '',
}) => {
	if (!Object.keys(winner).length || !nominationTypeId) {
		return <></>;
	}

	let id = 0;
	let name = '';
	let imageId = 0;

	switch(nominationTypeId) {
		case '0':
			id = winner.artistId;
			name = winner.artistName;
			imageId = winner.imageId;
			break;
		case '1':
			let songName = '';
			let artistName = '';
			let featArtists = '';
			let fullParticipationArtists = '';

			if (winner.featArtists) {
				winner.featArtists.forEach((featArtist) => {
					if (featArtist.type === '2') {
						fullParticipationArtists += fullParticipationArtists ? `, ${featArtist.name}` : featArtist.name;
					} else {
						featArtists += featArtists ? `, ${featArtist.name}` : featArtist.name;
					}
				});
			}

			songName = `${winner.songName}${ featArtists ? `(feat. ${featArtists})` : '' }`;
			artistName = `${winner.artistName}${ fullParticipationArtists ? `, ${fullParticipationArtists}` : '' }`;

			id = winner.songId;
			name = `${artistName} — ${songName}`;
			imageId = winner.imageId;
			break;
		case '2':
			id = winner.albumId;
			name = `${winner.artistName} — ${winner.albumName}`;
			imageId = winner.albumImageId;
			break;
		default:
			id = winner.id;
			name = winner.name;
			imageId = winner.imageId;
	}

	const emptyClass = imageId ? '' : ' gma-item__image-block--empty';

	return <>
		<div className="gma__center">
			<div className="gma-item" key={id}>
				<div className="gma-item__block">
					<div className="gma-item__shadow">
						<div className={`gma-item__image-block${emptyClass}`}>
							<LazyLoadImage
								className="gma-item__image"
								effect="blur"
								src={`./../../img/gma/${nominationTypeName}/${imageId ? imageId : 'default'}.avif`}
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
		</div>
	</>;
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
const CollectionWinner = React.memo(({
	elements,
	nominationId,
	nominationTypeId,
	nominationTypeName,
}) => {
	let blockNominations = '';

	if (elements && elements.length) {
		blockNominations =
			elements.map(element => {
				if (element.isShow !== '1') {
					return <></>;
				}

				return <NominationWinnerBlock element={element} nominationTypeName={nominationTypeName} nominationId={nominationId} nominationTypeId={nominationTypeId}></NominationWinnerBlock>;
			})
		;
	}

	return <>
		<div className="gma-item-list gma-item-list--center">
			{blockNominations}
		</div>
	</>;
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
const NominationWinnerBlock = React.memo(({
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
			let songName = '';
			let artistName = '';
			let featArtists = '';
			let fullParticipationArtists = '';

			if (element.featArtists) {
				element.featArtists.forEach((featArtist) => {
					if (featArtist.type === '2') {
						fullParticipationArtists += fullParticipationArtists ? `, ${featArtist.name}` : featArtist.name;
					} else {
						featArtists += featArtists ? `, ${featArtist.name}` : featArtist.name;
					}
				});
			}

			songName = `${element.songName}${ featArtists ? `(feat. ${featArtists})` : '' }`;
			artistName = `${element.artistName}${ fullParticipationArtists ? `, ${fullParticipationArtists}` : '' }`;

			id = element.songId;
			name = `${artistName} — ${songName}`;
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
							src={`./../../img/gma/${nominationTypeName}/${imageId ? imageId : 'default'}.avif`}
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

/**
 * Get user collection
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const CollectionWinnerCommon = React.memo(({elements}) => {
	let blockNominations = '';

	if (elements && elements.length) {
		blockNominations =
			elements.map(element => {
				if (!element.isShowWinners) {
					return <></>;
				}

				const nominationId = element.id;
				const nominationName = element.name;
				const nominationTypeId = element.typeId;
				const nominationTypeName = nominationTypeId === '2' ? 'album' : 'artist';

				const winnersBlock =
					element.winners.map(winner => <NominationBlock element={winner} nominationTypeName={nominationTypeName} nominationId={nominationId} nominationTypeId={element.typeId}></NominationBlock>)
				;

				return <div>
					<div className="gma-collection-header">
						<span>{nominationName}</span>
					</div>
					<div className="gma-item-list">
						{winnersBlock}
					</div>
				</div>;
			})
		;
	}

	return <>
		<div>
			{blockNominations}
		</div>
	</>;
});

export default GMA;