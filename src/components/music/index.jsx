import './style.css';
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { NavLink } from "react-router-dom";

/**
 * Render the Music page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const Music = React.memo(({
	userId,
	performer,
	isMainPage,
	setIsFocus,
	findPerformer,
	findPerformers,
	isAuthenticate,
	performersStorage,
	findIsAddPerformer,
	isAddPerformerStorage,
	searchPerformersStorage,
	getPerformersFromStorage,
	findPerformerFromStorage,
	...props
}) => {
	const refSearch = useRef(null);

	const search = () => {
		const searchStr = refSearch.current.value;

		if (!searchStr) {
			return false;
		}

		if (Object.prototype.hasOwnProperty.call(searchPerformersStorage, searchStr)) {
			getPerformersFromStorage(searchStr);
		} else {
			findPerformers(searchStr);
		}
	};

	const onFocus = () => {
		setIsFocus(true);
	};

	useLayoutEffect(() => {
		const searchStr = props.location.search;
		const nameParametr = '?performer=';
		const performerIdPosition = searchStr.indexOf('?performer=');

		if (performerIdPosition !== -1 && !performer?.id) {
			const newPerformerId = Number(searchStr.slice(nameParametr.length));

			findPerformer(userId, newPerformerId);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticate]);

	const searchPerformer = (event) => {
		const performerId = Number(event.target.id);
		const performerData = performersStorage.length ?
			performersStorage.filter((performer) => Number(performer.id) === performerId)
			: [];
		const isAddPerformerArr = isAddPerformerStorage && isAddPerformerStorage.length ?
			isAddPerformerStorage.filter((performer) => Number(performer[0]) === performerId)
			: [];

		if (performerData.length && isAddPerformerArr.length) {
			const isAddPerformer = isAddPerformerArr[0][1];

			findPerformerFromStorage(userId, performerId, isAddPerformer);
		} else if (performerData.length && !isAddPerformerArr.length) {
			findIsAddPerformer(userId, performerId);
		} else {
			findPerformer(userId, performerId);
		}
	};

	return <>
		<div className="search">
			<div className="search__block">
				<input
					type="text"
					className="search__input"
					placeholder="Поиск исполнителя"
					ref={ refSearch }
					id="search-performers"
					name="search-movie"
					required
					autoComplete="off"
					onChange={ search }
					onFocus={ onFocus }
				/>
				<PopUp setIsFocus={setIsFocus} searchPerformer={searchPerformer} {...props}/>
			</div>
			<input type="button" className="search__button" id="search" value="Найти" onClick={ onFocus }/>
		</div>
		{((!isMainPage && performer?.id) || '') && <Performer userId={userId} performer={performer} setIsFocus={setIsFocus} isAuthenticate={isAuthenticate} searchPerformer={searchPerformer} {...props}/>}
		{((isMainPage && userId) || '') && <Collection userId={userId} searchPerformer={searchPerformer} {...props}/>}
		
	</>;
});

/**
 * Get a list of search results
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const PopUp = React.memo(({
	isFocus,
	performers,
	setIsFocus,
	searchPerformer
}) => {
	const handleClickOutside = (event) => {
		if (
			event.target.nodeName !== 'INPUT'
			&& !event.target.classList.contains('js-search-result')
		) {
			setIsFocus(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	const blockPopUp =
		performers.map(performer => {
			const mainName = performer.alias || performer.name || performer.originalName;
			const altName = performer.alias ? performer.name || performer.originalName : performer.originalName;
			const origName = (performer.alias && performer.name) ? performer.originalName : '';
			const typePerformer = performer.typePerformer ? 'music-groups' : 'people';

			return (
				<div className="popup__block" key={performer.id}>
					<NavLink to={`/music?performer=${performer.id}`} className="popup__link" id={performer.id} onClick={ searchPerformer }></NavLink>
					<div className="popup__block-img">
						<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className="popup__img" alt={mainName} title={mainName}/>
					</div>
					<div>
						<h4 className="popup__title">{mainName}</h4>
						<div className="popup__title-original">{altName}{origName ? `, ${origName}` : ''}</div>
					</div>
				</div>
			);
		});
	;

	return <>
		<div className="popup js-search-result" hidden={!isFocus || !performers.length}>
			{blockPopUp}
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
	userId,
	collection,
	findCollection,
	searchPerformer
}) => {
	useLayoutEffect(() => {
		if (!collection || !collection[userId]?.length) {
			findCollection(userId);
		}
	});

	if (!collection || !collection[userId]?.length) {
		return <></>;
	}

	const blockCollection =
		collection[userId].map(performer => {
			const mainName = performer.alias || performer.name || performer.originalName;
			const typePerformer = performer.typePerformer ? 'music-groups' : 'people';

			return (
				<div className="item" key={performer.id}>
					<div className="item__block">
						<NavLink to={`/music?performer=${performer.id}`} className="item__link" key={performer.id} id={performer.id} onClick={ searchPerformer }></NavLink>
						<div className="item__shadow">
							<div className="item__image-block">
								<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className="item__image" alt={mainName} title={mainName}/>
							</div>
							<div className="item__title"><span>{mainName}</span></div>
						</div>
					</div>
				</div>
			);
		})
	;

	return <>
		<div className="item-list">
			{blockCollection}
		</div>
	</>;
});

/**
 * Get a block of information about a music artist
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} props
 * @returns {HTMLElement}
 */
const Performer = React.memo(({
	userId,
	performer,
	backToMain,
	setIsFocus,
	addPerformer,
	isAuthenticate,
	isAddPerformer,
	searchPerformer
}) => {
	const mainName = performer.alias || performer.name || performer.originalName;
	const typePerformer = performer.typePerformer ? 'music-groups' : 'people';
	const buttonName = isAddPerformer ? 'Убрать из коллекции' : 'Добавить';

	useEffect(() => {
		setIsFocus(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [performer.id]);

	const appendPerformer = (event) => {
		addPerformer(userId, Number(event.currentTarget.dataset.id), isAddPerformer);
	};

	return <>
		<div className="block-information">
			<div className="block-information__block" id={performer.id}>
				<div className="block-information__page block-information__page--1">
					<div className="poster">
						<div className="block-information__button block-information__button--close-two">
							<NavLink to="/music" className="block-information__button-link">Закрыть</NavLink>
						</div>

						<div className="poster__shadow">
							<div className="poster__image-block">
								<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className={`poster__image ${ typePerformer === 'people' ? 'poster__image--height' : ''}`} alt={mainName} title={mainName}/>
							</div>
							<div className={`poster__original-title ${ typePerformer === 'people' ? 'poster__original-title--margin' : ''}`}>{mainName}</div>
						</div>

						<div className="block-information__button">
							{ isAuthenticate ? 
								<span data-id={performer.id} onClick={appendPerformer}>{buttonName}</span>
							:
								<NavLink to="/auth/login" className="block-information__button-link">Добавить</NavLink>
							}
						</div>
					</div>
				</div>
				<div className="block-information__page">
					<div className="block-information__content">
						<div className="block-information__button block-information__button--close-one">
							<NavLink to="/music" onClick={ backToMain } className="block-information__button-link">Закрыть</NavLink>
						</div>
						<h1 className="block-information__title">Информация</h1>
						<NameSection name={performer.name} alias={performer.alias} originalName={performer.originalName}/>
						<BirthdaySection age={performer.age} birthday={performer.birthday}/>
						<DateDeathSection dateDeath={performer.dateDeath}/>
						<LocalitySection locality={performer.locality} region={performer.region} country={performer.country?.name} countryId={performer.country?.id}/>
						<CountrySection typePerformer={performer.typePerformer} country={performer.country?.name} countryId={performer.country?.id}/>
						<GenresSection genres={performer.genres}/>
						<DateDebutSection dateDebut={performer.dateDebut}/>
						<DateFormationSection age={performer.ageGroup} dateFormation={performer.dateFormation}/>
						<DateDissolutionSection dateDissolution={performer.dateDissolution}/>
						<GroupSection groups={performer.groups} searchPerformer={searchPerformer}/>
						<MemberSection membersArr={performer.members} searchPerformer={searchPerformer}/>
						<CompanySection companies={performer.companies}/>
						<FandomNameSection fandomName={performer.fandomName}/>
						<LinksSection links={performer.links} artistName={mainName}/>
					</div>
				</div>
			</div>
		</div>
	</>;
});

/**
 * Get info section block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} title Section title
 * @param {String} content Section content
 * @returns {HTMLElement}
 */
const SectionBlock = React.memo(({title = '', content = ''}) => {
	return <div className="block-information__row">
		<div className="block-information__parametr">{title}:</div>{content}
	</div>;
});

/**
 * Get a block of information about the name
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name
 * @param {String} alias
 * @param {String} originalName
 * @returns {HTMLElement}
 */
const NameSection = React.memo(({name = '', alias = '', originalName = ''}) => {
	const altName = alias ? name || originalName : originalName;
	const origName = (alias && name) ? originalName : '';

	let content = origName ? `(${origName})` : '';
	content = `${altName} ${content}`;

	return altName ?
		<SectionBlock title="Реальное имя" content={content}/>
	: <></>;
});

/**
 * Get a block of information about birthday
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} age
 * @param {String} birthday
 * @returns {HTMLElement}
 */
const BirthdaySection = React.memo(({age = '', birthday = ''}) => {
	const content = `${birthday} (age ${age})`;

	return birthday && age ?
		<SectionBlock title="Дата рождения" content={content}/>
	: <></>;
});

/**
 * Get a block of information about date of death
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} dateDeath
 * @returns {HTMLElement}
 */
const DateDeathSection = React.memo(({dateDeath = ''}) => dateDeath ? <SectionBlock title="Дата смерти" content={dateDeath}/> : <></>);

/**
 * Get a block of information about genres
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} genres
 * @returns {HTMLElement}
 */
const GenresSection = React.memo(({genres = []}) => {
	let content = '';

	if (genres && genres.length) {
		genres.map((genre, index) => content += `${(index || '') && ', '}${genre.name}`);
	}

	return content ?
		<SectionBlock title="Жанр" content={content}/>
	: <></>;
});

/**
 * Get a block of information about date of debut
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} dateDebut
 * @returns {HTMLElement}
 */
const DateDebutSection = React.memo(({dateDebut = ''}) => dateDebut ? <SectionBlock title="Сольный дебют" content={dateDebut}/> : <></>);

/**
 * Get a block of information about date of formation
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} age
 * @param {String} dateFormation
 * @returns {HTMLElement}
 */
const DateFormationSection = React.memo(({age = '', dateFormation = ''}) => {
	const content = `${dateFormation} (age ${age})`;

	return dateFormation && age ?
		<SectionBlock title="Дебют" content={content}/>
	: <></>;
});

/**
 * Get a block of information about date of dissolution
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} dateDissolution
 * @returns {HTMLElement}
 */
const DateDissolutionSection = React.memo(({dateDissolution = ''}) => dateDissolution ? <SectionBlock title="Роспуск" content={dateDissolution}/> : <></>);

/**
 * Get a block of information about the fandom name
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} fandomName
 * @returns {HTMLElement}
 */
const FandomNameSection = React.memo(({fandomName = ''}) => fandomName ? <SectionBlock title="Фэндом" content={fandomName}/> : <></>);

/**
 * Get info geo-section block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} title
 * @param {String} address
 * @param {String} countryName
 * @param {number} countryId
 * @returns {HTMLElement}
 */
const GeoSectionBlock = React.memo(({
	title = '',
	address = '',
	countryName = '',
	countryId = 0
}) => {
	return <div className="block-information__row">
		<div className="block-information__parametr">{title}:</div>{address || countryName}
		<div className="block-information__img-country">
			<img src={`./../../img/countries/${countryId}.png`} alt={countryName} title={countryName}/>
		</div>
	</div>;
});

/**
 * Get a block of information about the place of birth
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} locality
 * @param {String} region
 * @param {String} country
 * @param {number} countryId
 * @returns {HTMLElement}
 */
const LocalitySection = React.memo(({
	locality = '',
	region = '',
	country = '',
	countryId = 0
}) => {
	const regionName = region && region !== locality ? `, ${region}` : '';
	const countryName = country && country !== regionName ? `, ${country}` : '';
	const address = `${locality}${regionName}${countryName}`;

	return locality ?
		<GeoSectionBlock title="Место рождения" address={address} countryName={countryName} countryId={countryId}/>
	: <></>;
});

/**
 * Get a block of information about country
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} country
 * @param {number} countryId
 * @param {number} typePerformer 0 - solo artist, 1 - group
 * @returns {HTMLElement}
 */
const CountrySection = React.memo(({
	country = '',
	countryId = 0,
	typePerformer = 0
}) => {
	return typePerformer && country ?
		<GeoSectionBlock title="Страна" countryName={country} countryId={countryId}/>
	: <></>;
});

/**
 * Get info list-section block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} title
 * @param {Array} artists
 * @param {boolean} isOrganization
 * @param {Function} searchPerformer
 * @returns {HTMLElement}
 */
const ListSectionBlock = React.memo(({
	title = '',
	artists = [],
	isOrganization = false,
	searchPerformer
}) => {
	return <div className="block-information__row">
		<div className="block-information__parametr">{title}:</div>
		<div>
			{artists.map((artist, index) => {
				let artistBlock = '';
				let separator = '';

				const artistName = artist.alias || artist.name;

				separator = index ? ', ' : '';

				if (artist.isActive) {
					artistBlock = <NavLink to={`/music?performer=${artist.performerId}`} id={artist.performerId} onClick={ searchPerformer }>{artistName}</NavLink>;
				} else {
					artistBlock = artistName;
				}

				return isOrganization ?
					<div className="block-information__line" key={index}>
						{artistBlock}{ artist.startYear && artist.startYear === artist.endYear ? `, ${artist.startYear}` : artist.startYear ? `, ${artist.startYear} - ${artist.endYear || 'present'}` : '' }
					</div>
				:
					<span key={index}>{separator}{artistBlock}</span>
				;
			})}
		</div>
	</div>;
});

/**
 * Get a block of information about members
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} membersArr
 * @param {Function} searchPerformer
 * @returns {HTMLElement}
 */
const MemberSection = React.memo(({membersArr = [], searchPerformer}) => {
	if (!membersArr || !membersArr.length) {
		return <></>;
	}

	let formerMembers = [];
	let members = [];

	membersArr.map(member => {
		return Boolean(member.endYear) ? formerMembers.push(member) : members.push(member);
	});

	return <>
		<ListSectionBlock title="Состав группы" artists={members} isOrganization={false} searchPerformer={searchPerformer}/>
		<ListSectionBlock title="Бывшие участники" artists={formerMembers} isOrganization={false} searchPerformer={searchPerformer}/>
	</>;
});

/**
 * Get a block of information about groups
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} groups
 * @param {Function} searchPerformer
 * @returns {HTMLElement}
 */
const GroupSection = React.memo(({groups = [], searchPerformer}) => {
	return groups && groups.length ?
		<ListSectionBlock title="Группа" artists={groups} isOrganization={true} searchPerformer={searchPerformer}/>
	: <></>;
});

/**
 * Get a block of information about companies
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} companies
 * @returns {HTMLElement}
 */
const CompanySection = React.memo(({companies = []}) => {
	return companies && companies.length ?
		<ListSectionBlock title="Агентство" artists={companies} isOrganization={true}/>
	: <></>;
});

/**
 * Get info link-section block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} title
 * @param {Array} links
 * @param {String} artistName
 * @returns {HTMLElement}
 */
const LinksSectionBlock = React.memo(({
	title = '',
	links = [],
	artistName = ''
}) => {
	return <div className="block-information__row">
		<div className="block-information__parametr">{title}:</div>
		<div className="block-information__block-links">
			{links.map((link, index) => {
				return <div className="block-information__block-link" key={index}>
					<a href={link.url} className="block-information__link" target="_blank" rel="noopener noreferrer">
						<img src={`./../../img/links/${link.name}.png`} alt={artistName} title={artistName}/>
					</a>
				</div>;
			})}
		</div>
	</div>
});

/**
 * Get a block of information about social media links
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} links
 * @param {String} artistName
 * @returns {HTMLElement}
 */
const LinksSection = React.memo(({links = [], artistName = ''}) => {
	return links && links.length ?
		<LinksSectionBlock title="Официальные ссылки" links={links} artistName={artistName}/>
	: <></>;
});

export default Music; 