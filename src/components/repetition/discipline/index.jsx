import './style.css';
import React, { useLayoutEffect } from 'react';
import { isMobile } from '../../../utils/utils';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * Render the discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const RepetitionDiscipline = React.memo(({
	userId = 0,
	disciplineId = 0,
	findDiscipline = () => {},
	...props
}) => {
	const location = useLocation();

	useLayoutEffect(() => {
		const disciplineName = location.pathname.replace(/\/repetition\//, '');
		let disciplineId = 0;

		switch(disciplineName) {
			case 'javascript':
				disciplineId = 1;
				break;
			case 'english-grammar':
				disciplineId = 2;
				break;
			default:
				disciplineId = 0;
				break;
		}


		findDiscipline(userId, disciplineId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return disciplineId
		? <RepetitionDisciplineBlock userId={userId} disciplineId={disciplineId} {...props}/>
		: <></>;
});

/**
 * Get a block of information about a discipline repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {number} counter Counter of correct answers
 * @param {bool} isChecking Response check flag
 * @param {Object} pageNumbers Page numbers
 * @param {Object} currentQuestion Current question data
 * @returns {HTMLElement}
 */
const RepetitionDisciplineBlock = React.memo(({
	name = '',
	counter = 0,
	pageNumbers = {},
	isChecking = false,
	currentQuestion = {},
	...props
}) => {
	const hasQuestion = currentQuestion?.question;

	return <>
		<div className="repetition-discipline">
			<div className="repetition-discipline__block">
				<div className="repetition-discipline__page repetition-discipline__page--first">
					<div className="repetition-discipline__button repetition-discipline__button--close-two">
						<NavLink to="/repetition" className="repetition-discipline__button-link">Меню</NavLink>
					</div>
					<div className="repetition-discipline__title">{ name }</div>
					<div className="repetition-discipline__counter">{ counter }</div>
					<div className={`repetition-discipline__question ${ hasQuestion ? '' : 'repetition-discipline__question--final' }`}>
						{ hasQuestion
							? currentQuestion.question
							: 'Вы всё повторили, хорошего дня'
						}
					</div>
					{ hasQuestion
						? <ButtonBlock
							isChecking={isChecking}
							questionId={currentQuestion.id}
							priority={Number(currentQuestion.priority)}
							{...props}
						/>
						: <></>
					}
					<div className="repetition-discipline__page-number-first">{ pageNumbers?.first || 2 }</div>
				</div>
				<div className="repetition-discipline__page repetition-discipline__page--second">
					<div className="repetition-discipline__content">
						<div className="repetition-discipline__button repetition-discipline__button--close-one">
							<NavLink to="/repetition" className="repetition-discipline__button-link">Меню</NavLink>
						</div>
						<div className={`repetition-discipline__answer ${ isChecking ? '' : 'hidden' }`}>{ currentQuestion.answer }</div>
						<div className="repetition-discipline__page-number-second">{ isMobile() ? pageNumbers?.first || 2 : pageNumbers?.second || 3 }</div>
					</div>
				</div>
			</div>
		</div>
	</>;
});

/**
 * Get buttons block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} priority Prioritize the importance of repetition
 * @param {bool} isChecking Response check flag
 * @param {number} questionId Question ID
 * @param {number} disciplineId Discipline ID
 * @param {Function} checkAnswer Response check function
 * @param {Function} skipQuestion Skip question function
 * @param {Function} moveNextQuestion Move to next question function
 * @returns {HTMLElement}
 */
const ButtonBlock = React.memo(({
	userId = 0,
	priority = 0,
	questionId = 0,
	disciplineId = 0,
	isChecking = false,
	checkAnswer = () => {},
	skipQuestion = () => {},
	moveNextQuestion = () => {},
}) => {
	const repeatQuestion = () => moveNextQuestion({ isRepeat: true, userId, disciplineId, questionId, priority });
	const getNextQuestion = () => moveNextQuestion({ isRepeat: false, userId, disciplineId, questionId, priority });

	return <>
		<div className="repetition-discipline__buttons-block">
			<div
				className="repetition-discipline__button"
				onClick={ isChecking ? repeatQuestion : skipQuestion }
			>{ isChecking ? 'Повторить' : 'Пропустить' }</div>
			<div
				className="repetition-discipline__button"
				onClick={ isChecking ? getNextQuestion : checkAnswer }
			>{ isChecking ? 'Далее' : 'Проверить' }</div>
		</div>
	</>;
});

export default RepetitionDiscipline; 
