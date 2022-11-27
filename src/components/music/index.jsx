import './style.css';
import React, { useRef, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";

const Music = React.memo(({ findPerformers, performers, isFocus, setIsFocus, findPerformer, performer, isAuthenticate, addPerformer, userId, isAddPerformer, findCollection, collection }) => {
	const refSearch = useRef(null);
	const id = useParams().id;

	const search = () => {
		findPerformers(refSearch.current.value);
	};

	const onFocus = () => {
		setIsFocus(true);
	};

	useEffect(() => {
		findPerformer(userId, id);
	}, [id])

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
				<PopUp performers={performers} isFocus={isFocus} setIsFocus={setIsFocus} userId={userId}/>
			</div>
			<input type="button" className="search__input search__input--done" id="search" value="Найти" onClick={ onFocus }/>
		</div>
		{ ((!id && userId) || '') && <Collection userId={userId} findCollection={findCollection} collection={collection}/>}
		{ (id || '') && <Performer performer={performer} isAuthenticate={isAuthenticate} addPerformer={addPerformer} userId={userId} isAddPerformer={isAddPerformer}/> }
	</>;
});

const PopUp = React.memo(({ performers, isFocus, setIsFocus, userId }) => {
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
	})

	const blockPopUp =
		performers.map(performer => {
			const mainName = performer.alias || performer.name || performer.originalName;
			const altName = performer.alias ? performer.name || performer.originalName : performer.originalName;
			const origName = (performer.alias && performer.name) ? performer.originalName : '';
			const typePerformer = performer.typePerformer ? 'music-groups' : 'people';

			return (
				<NavLink to={`/music/${performer.id}`} className="search-result__i" key={performer.id} id={performer.id}>
					<div className="search-result__block">
						<div className="search-result__block-img">
							<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className="search-result__img" alt={mainName} title={mainName}/>
						</div>
						<div>
							<h4 className="search-result__title">{mainName}</h4>
							<div className="search-result__title-original">{altName}{origName ? `, ${origName}` : ''}</div>
						</div>
					</div>
				</NavLink>
			);
		})
	;

	return (
		<div className="search-result js-search-result" hidden={!isFocus || !performers.length}>
			{blockPopUp}
		</div>
	);
});

const Collection = React.memo(({ collection, userId, findCollection }) => {
	useEffect(() => {
		findCollection(userId);
	}, [])

	if (!collection || !collection?.length) {
		return '';
	}

	const blockCollection =
		collection.map(performer => {
			const mainName = performer.alias || performer.name || performer.originalName;
			const typePerformer = performer.typePerformer ? 'music-groups' : 'people';

			return (
				<div className="item" key={performer.id}>
					<NavLink to={`/music/${performer.id}`} className="item__link" key={performer.id} id={performer.id}>
						<div className="item__block">
							<div className="item__shadow">
								<div className="item__image-block">
									<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className="item__image" alt={mainName} title={mainName}/>
								</div>
								<div className="item__title"><span>{mainName}</span></div>
							</div>
						</div>
					</NavLink>
				</div>
			);
		})
	;

	return (
		<div className="item-list">
			{blockCollection}
		</div>
	);
});

const Performer = React.memo(({ performer, isAuthenticate, addPerformer, userId, isAddPerformer }) => {
	const mainName = performer.alias || performer.name || performer.originalName;
	const altName = performer.alias ? performer.name || performer.originalName : performer.originalName;
	const origName = (performer.alias && performer.name) ? performer.originalName : '';
	const region = performer.region && performer.region !== performer.locality ? `, ${performer.region}` : '';
	const country = performer.country?.name && performer.country?.name !== performer.region ? `, ${performer.country?.name}` : '';
	const countryName = performer.country?.name || '';
	const countryId = performer.country?.id || 0;
	const address = `${performer.locality}${region}${country}`;
	const typePerformer = performer.typePerformer ? 'music-groups' : 'people';
	const buttonName = isAddPerformer ? 'Убрать из коллекции' : 'Добавить';

	let genres = '';
	let formerMembers = [];
	let members = [];

	if (performer?.genres && performer.genres.length) {
		performer.genres.map((genre, index) => genres += `${(index || '') && ', '}${genre.name}`);
	}

	if (performer?.members && performer.members.length) {
		performer.members.map(member => {
			return Boolean(member.endYear) ? formerMembers.push(member) : members.push(member);
		});
	}

	const appendPerformer = (event) => {
		addPerformer(userId, event.currentTarget.dataset.id, isAddPerformer);
	};

	return (
		performer.id ?
			<div className={`film`}>
				<div className="cover">
					<div className="book" id={performer.id}>
						<label className="book__page book__page--1 polaroid">
							<div className="poster">
								<div className="book__button book__button--close-two">
									<NavLink to="/music">Закрыть</NavLink>
								</div>
								<div className="poster__shadow">
									<div className="poster__image-block">
										<img src={`./../../img/${typePerformer}/${performer.imageId}.jpg`} className={`poster__image ${ typePerformer === 'people' ? 'poster__image--height' : ''}`} alt={mainName} title={mainName}/>
									</div>
									<div className={`poster__original-title ${ typePerformer === 'people' ? 'poster__original-title--margin' : ''}`}>{mainName}</div>
								</div>
								<div className="book__button">
									{ isAuthenticate ? 
										<span data-id={performer.id} onClick={appendPerformer}>{buttonName}</span>
									:
										<NavLink to="/auth/login">Добавить</NavLink>
									}
								</div>
							</div>
						</label>
						<label className="book__page book__page--4">
							<div className="page__content">
								<div className="book__button book__button--close-one">
									<NavLink to="/music">Закрыть</NavLink>
								</div>
								<h1 className="page__content-title">Информация</h1>
									{ altName &&
										<div className="film__row">
											<div className="film__parametr">Реальное<br/> имя:</div>{altName} { origName && `(${origName})` }
										</div>
									}
									{ performer.birthday &&
										<div className="film__row">
											<div className="film__parametr">Дата<br/> рождения:</div>{performer.birthday} (age {performer.age})
										</div>
									}
									{ performer.dateDeath &&
										<div className="film__row">
											<div className="film__parametr">Дата<br/> смерти:</div>{performer.dateDeath}
										</div>
									}
									{ performer.locality &&
										<div className="film__row">
											<div className="film__parametr">Место<br/> рождения:</div>{address}
											<div className="film__img-country">
												<img src={`./../../img/countries/${countryId}.png`} alt={countryName} title={countryName}/>
											</div>
										</div>
									}
									{ (performer.typePerformer || '') && countryName &&
										<div className="film__row">
											<div className="film__parametr">Страна:</div>{countryName}
											<div className="film__img-country">
												<img src={`./../../img/countries/${countryId}.png`} alt={countryName} title={countryName}/>
											</div>
										</div>
									}
									{ genres &&
										<div className="film__row">
											<div className="film__parametr">Жанр:</div>{genres}
										</div>
									}
									{ performer.dateDebut &&
										<div className="film__row">
											<div className="film__parametr">Сольный<br/> дебют:</div>
											<div>{performer.dateDebut}</div>
										</div>
									}
									{ performer.dateFormation &&
										<div className="film__row">
											<div className="film__parametr">Дебют:</div>{performer.dateFormation} (age {performer.ageGroup})
										</div>
									}
									{ performer.dateDissolution &&
										<div className="film__row">
											<div className="film__parametr">Роспуск:</div>{performer.dateDissolution}
										</div>
									}
									{ performer?.groups && (performer.groups.length || '') &&
										<div className="film__row">
											<div className="film__parametr">Группа:</div>
											<div className="film__value">
												{performer.groups.map((group, index) => {
													let groupBlock = '';

													const groupName = group.alias || group.name;

													if (group.isActive) {
														groupBlock = <NavLink to={`/music/${group.id}`} id={group.id}>{groupName}</NavLink>;
													} else {
														groupBlock = groupName;
													}

													return <div className="film__line" key={index}>
															{groupBlock}{ group.startYear && group.startYear === group.endYear ? `, ${group.startYear}` : group.startYear ? `, ${group.startYear} - ${group.endYear || 'present'}` : '' }
														</div>
													;
												})}
											</div>
										</div>
									}
									{ (members.length || '') &&
										<div className="film__row">
											<div className="film__parametr">Состав<br/> группы:</div>
											<div>
												{members.map((member, index) => {
													let memberBlock = '';
													let separator = '';

													const memberName = member.alias || member.name;

													separator = index ? ', ' : '';

													if (member.isActive) {
														memberBlock = <NavLink to={`/music/${member.performerId}`} id={member.id}>{memberName}</NavLink>;
													} else {
														memberBlock = memberName;
													}

													return <span key={index}>{separator}{memberBlock}</span>;
												})}
											</div>
										</div>
									}
									{ (formerMembers.length || '') &&
										<div className="film__row">
											<div className="film__parametr">Бывшие<br/> участники:</div>
											<div>
												{formerMembers.map((member, index) => {
													let memberBlock = '';
													let separator = '';

													const memberName = member.alias || member.name;

													separator = index ? ', ' : '';

													if (member.isActive) {
														memberBlock = <NavLink to={`/music/${member.performerId}`} id={member.id}>{memberName}</NavLink>;
													} else {
														memberBlock = memberName;
													}

													return <span key={index}>{separator}{memberBlock}</span>;
												})}
											</div>
										</div>
									}
									{ performer?.companies && performer.companies.length &&
										<div className="film__row">
											<div className="film__parametr">Агентство:</div>
											<div className="film__value">
												{performer.companies.map((company, index) => {
													return <div className="film__line" key={index}>
														{company.name}{ company.startYear && company.startYear === company.endYear ? `, ${company.startYear}` : company.startYear ? `, ${company.startYear} - ${company.endYear || 'present'}` : '' }
													</div>
													
												})}
											</div>
										</div>
									}
									{ performer.fandomName &&
										<div className="film__row">
											<div className="film__parametr">Фэндом:</div>{performer.fandomName}
										</div>
									}
									{(
										performer.youtubeUrl
										|| performer.instagramUrl
										|| performer.twitterUrl
									) &&
										<div className="film__row">
											<div className="film__parametr">Официальные<br/> ссылки:</div>
											<div className="film__block-links">
												{ performer.youtubeUrl &&
													<div className="film__block-link">
														<a href={performer.youtubeUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/youtube.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.instagramUrl &&
													<div className="film__block-link">
														<a href={performer.instagramUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/instagram.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.twitterUrl &&
													<div className="film__block-link">
														<a href={performer.twitterUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/twitter.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.facebookUrl &&
													<div className="film__block-link">
														<a href={performer.facebookUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/facebook.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.weiboUrl &&
													<div className="film__block-link">
														<a href={performer.weiboUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/weibo.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.tiktokUrl &&
													<div className="film__block-link">
														<a href={performer.tiktokUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/tiktok.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
												{ performer.vliveUrl &&
													<div className="film__block-link">
														<a href={performer.vliveUrl} className="film__link" target="_blank" rel="noopener noreferrer">
															<img src="./../../img/links/vlive.png" alt={mainName} title={mainName}/>
														</a>
													</div>
												}
											</div>
										</div>
									}
							</div>
						</label>
					</div>
				</div>
			</div>
		: ''
	);
});

export default Music; 