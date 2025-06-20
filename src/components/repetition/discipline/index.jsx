import './style.css';
import React, { useLayoutEffect } from 'react';
import { isMobile } from '../../../utils/utils';
import { NavLink, useParams } from 'react-router-dom';

/**
 * Render the discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {Object} currentQuestion Current question data
 * @param {Function} findQuestions Search for discipline questions
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const RepetitionDiscipline = React.memo(({
	userId = 0,
	disciplineId = 0,
	currentQuestion = {},
	findQuestions = () => {},
	findDiscipline = () => {},
	...props
}) => {
	const { ownerName = '', subjectId = 0 } = useParams();

	useLayoutEffect(() => {
		if (!ownerName || !subjectId) {
			return <></>;
		}

		if (disciplineId && disciplineId === Number(subjectId)) {
			findQuestions(userId, disciplineId);
		} else {
			findDiscipline(userId, subjectId);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ownerName, subjectId, disciplineId]);

	if (!disciplineId) {
		return <></>;
	}

	return <RepetitionDisciplineBlock
		userId={userId}
		ownerName={ownerName}
		disciplineId={disciplineId}
		currentQuestion={currentQuestion}
		{...props}
	/>;
});

/**
 * Get a block of information about a discipline repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {number} counter Counter of correct answers
 * @param {String} ownerName Page owner's name
 * @param {bool} isFinal End of repeat flag
 * @param {number} disciplineId Discipline ID
 * @param {Object} pageNumbers Page numbers
 * @param {bool} isChecking Response check flag
 * @param {Object} currentQuestion Current question data
 * @returns {HTMLElement}
 */
const RepetitionDisciplineBlock = React.memo(({
	name = '',
	counter = 0,
	ownerName = '',
	isFinal = false,
	disciplineId = 0,
	pageNumbers = {},
	isChecking = false,
	currentQuestion = {},
	...props
}) => {
	const hasQuestion = currentQuestion?.question;
	let firstPage = disciplineId;
	firstPage = firstPage % 2 ? firstPage : ++firstPage;

	return <>
		<div className="repetition-discipline">
			<div className="repetition-discipline__block">
				<div className="repetition-discipline__page repetition-discipline__page--first">
					<div className="repetition-discipline__button repetition-discipline__button--close-two">
						<NavLink to={`/repetition/menu/${ownerName}`} className="repetition-discipline__button-link">Меню</NavLink>
					</div>
					<div className="repetition-discipline__title">{ name }</div>
					<div className="repetition-discipline__counter">{ counter }</div>
					<div className={`repetition-discipline__question ${ hasQuestion ? '' : 'repetition-discipline__question--final' }`}>
						{ hasQuestion && currentQuestion.question }
						{ isFinal && 'Вы всё повторили, хорошего дня' }
						{ !hasQuestion && !isFinal && 'Вопросы ещё не были добавлены' }
					</div>
					{ hasQuestion
						? <ButtonBlock
							isChecking={isChecking}
							questionAnswerId={currentQuestion.qa_id}
							{...props}
						/>
						: <></>
					}
					{ !hasQuestion && !isFinal
						? <AddQuestionBtn
							ownerName={ownerName}
							disciplineId={disciplineId}
						/> : <></>
					}
					<div className="repetition-discipline__page-number-first">{ firstPage }</div>
				</div>
				<div className="repetition-discipline__page repetition-discipline__page--second">
					<div className="repetition-discipline__content">
						<div className="repetition-discipline__button repetition-discipline__button--close-one">
							<NavLink to={`/repetition/menu/${ownerName}`} className="repetition-discipline__button-link">Меню</NavLink>
						</div>
						<div className={`repetition-discipline__answer ${ isChecking ? '' : 'hidden' }`}>{ currentQuestion.answer }</div>
						<div className="repetition-discipline__page-number-second">{ isMobile() ? firstPage : ++firstPage }</div>
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
 * @param {number} questionAnswerId Question ID
 * @param {number} disciplineId Discipline ID
 * @param {bool} isChecking Response check flag
 * @param {Function} checkAnswer Response check function
 * @param {Function} skipQuestion Skip question function
 * @param {Function} moveNextQuestion Move to next question function
 * @returns {HTMLElement}
 */
const ButtonBlock = React.memo(({
	userId = 0,
	questionAnswerId = 0,
	disciplineId = 0,
	isChecking = false,
	checkAnswer = () => {},
	skipQuestion = () => {},
	moveNextQuestion = () => {},
}) => {
	const repeatQuestion = () => moveNextQuestion({ isRepeat: true, userId, disciplineId, questionAnswerId });
	const getNextQuestion = () => moveNextQuestion({ isRepeat: false, userId, disciplineId, questionAnswerId });

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

/**
 * Get add question button
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} ownerName Page owner's name
 * @param {number} disciplineId Discipline ID
 * @returns {HTMLElement}
 */
const AddQuestionBtn = React.memo(({
	ownerName = '',
	disciplineId = 0,
}) => {
	return <div className="repetition-discipline__add-question-btn">
			<NavLink to={`/repetition/edit-questions/${ownerName}/${disciplineId}`} className="btn-link">Добавить</NavLink>
	</div>;
});

export default RepetitionDiscipline; 
