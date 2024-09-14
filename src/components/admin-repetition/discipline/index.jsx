import './style.css';
import PopUp from './../../common/pop-up';
import { useLocation } from 'react-router-dom';
import React, { useLayoutEffect, useEffect } from 'react';

/**
 * Render the admin discipline repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const AdminRepetitionDiscipline = React.memo(({
	userId = 0,
	disciplineId = 0,
	findDiscipline = () => {},
	...props
}) => {
	const location = useLocation();

	useLayoutEffect(() => {
		const disciplineName = location.pathname.replace(/\/admin-panel\/repetition\//, '');
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
 * Get a discipline editing block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {bool} isShowSuccess Success response flag
 * @param {String} resultText Query result text
 * @param {number} disciplineId Discipline ID
 * @param {Function} search Search by entered data
 * @param {Function} clearError Clearing the error notification
 * @param {Function} editQuestion Request to edit question
 * @param {Function} createQuestion Request to create question
 * @param {Function} deleteQuestion Request to delete question
 * @param {bool} isCreationQuestion Question creation flag
 * @param {Function} setCreationQuestion Request to start creating a question
 * @returns {HTMLElement}
 */
const RepetitionDisciplineBlock = React.memo(({
	name = '',
	resultText = '',
	disciplineId = 0,
	search = () => {},
	isShowSuccess = false,
	clearError = () => {},
	editQuestion = () => {},
	createQuestion = () => {},
	deleteQuestion = () => {},
	isCreationQuestion = false,
	setCreationQuestion = () => {},
	...props
}) => {
	const [question, setQusetion] = React.useState({});
	const [isFocusQuestion, setFocusQuestion] = React.useState(false);
	const [isFocusAnswer, setFocusAnswer] = React.useState(false);

	useEffect(() => {
		if (isShowSuccess) {
			setQusetion({});
		}
	}, [isShowSuccess]);

	const clearFields = () => {
		setQusetion({});
		clearError();
	};

	const startSetCreationQuestion = () => {
		setQusetion({});
		setCreationQuestion();
	};

	const startCreationQuestion = () => {
		if (!question.question || !question.answer) {
			return;
		}

		createQuestion(disciplineId, question.question, question.answer);
	};

	const searchQuestion = (event) => {
		const question = event.currentTarget.value;

		setFocusAnswer(false);
		setFocusQuestion(Boolean(question));

		if (!question) {
			return;
		}

		search(disciplineId, question);
	};

	const searchAnswer = (event) => {
		const answer = event.currentTarget.value;

		setFocusAnswer(Boolean(answer));
		setFocusQuestion(false);

		if (!answer) {
			return;
		}

		search(disciplineId, answer, true);
	};

	const onFocus = (event) => {
		const isQuestion = event.currentTarget.id === 'search-question';

		setFocusAnswer(!isQuestion);
		setFocusQuestion(isQuestion);
	};

	const hideFocus = () => {
		setFocusAnswer(false);
		setFocusQuestion(false);
	};

	const selectOption = ({
		id = 0,
		question = '',
		answer = '',
		record = '',
	} = {}) => {
		if ((!question && !answer) || !id) {
			return;
		}

		const valueQuestion = question || record;
		const valueAnswer = answer || record;

		setQusetion(() => ({
			id,
			answer: valueAnswer,
			question: valueQuestion,
		}));
		setCreationQuestion(false);
	};

	const handleChange = (event) => {
		setQusetion((prev) => ({...prev, [event.target.name]: event.target.value}));
	};

	const startDeleteQuestion = () => {

		if (!question.id) {
			return;
		}

		deleteQuestion(question.id, disciplineId);
	};

	const startEditQuestion = () => {

		if (!question.id || !question.answer || !question.question) {
			return;
		}

		editQuestion(question, disciplineId);
	};

	return <>
		<div className="admin-repetition-discipline">
			<h1 className="admin-repetition-discipline__title">{ name }</h1>
			<div className="admin-repetition-discipline__block">
				<div className="admin-repetition-discipline__filters">
					<button className="btn admin-repetition-discipline__btn" onClick={ startSetCreationQuestion }>Создать вопрос</button>
					<div>
						<SearchInput
							id="question"
							onFocus={ onFocus }
							placeholder="вопроса"
							search={ searchQuestion }
						/>
						<PopUp
							hideFocus={ hideFocus }
							isFocus={isFocusQuestion}
							results={props.questions}
							selectOption={ selectOption }
						/>
					</div>
					<div>
						<SearchInput
							id="answer"
							onFocus={ onFocus }
							placeholder="ответа"
							search={ searchAnswer }
						/>
						<PopUp
							hideFocus={ hideFocus }
							isFocus={isFocusAnswer}
							results={props.answers}
							selectOption={ selectOption }
						/>
					</div>
				</div>
				{(isCreationQuestion || question?.id) &&
					<div className="admin-repetition-discipline__edit-block">
						<QuestionEditingBlock
							answer={question?.answer}
							question={question?.question}
							handleChange={ handleChange }
						/>
					</div>
				}
				{isShowSuccess && resultText &&
					<ResultBlock resultText={resultText} isSuccess={true}/>
				}
			</div>
			{(isCreationQuestion || question?.id) &&
				<ButtonBlock
					resultText={resultText}
					isCreationQuestion={isCreationQuestion}
					startSecondAction={ isCreationQuestion ? clearFields : startDeleteQuestion }
					startPrimaryAction={ isCreationQuestion ? startCreationQuestion: startEditQuestion }
					{...props}
				/>
			}
		</div>
	</>;
});

/**
 * Get buttons block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isShowError Error response flag
 * @param {String} resultText Query result text
 * @param {Function} startSecondAction Untargeted request
 * @param {Function} startPrimaryAction Targeted request
 * @param {bool} isCreationQuestion Question creation flag
 * @returns {HTMLElement}
 */
const ButtonBlock = React.memo(({
	resultText = '',
	isShowError = false,
	isCreationQuestion = false,
	startSecondAction = () => {},
	startPrimaryAction = () => {},
}) => {
	return <>
		<div className="admin-repetition-discipline__buttons-block">
			<Button
				name={ isCreationQuestion ? 'Очистить' : 'Удалить' }
				startAction={ startSecondAction }
			/>
			<div>
				<Button
					isPrimary={true}
					name={ isCreationQuestion ? 'Добавить' : 'Изменить' }
					startAction={ startPrimaryAction }
				/>
				{isShowError && resultText &&
					<ResultBlock resultText={resultText}/>
				}
			</div>
		</div>
	</>;
});

/**
 * Get button
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Button name
 * @param {bool} isPrimary Primary button flag
 * @param {Function} startAction Button action
 * @returns {HTMLElement}
 */
const Button = React.memo(({
	name = '',
	isPrimary = false,
	startAction = () => {},
}) => {
	return <>
		<div
			className={`btn btn-target admin-repetition-discipline__btn-target ${isPrimary ? '' : 'btn-target-second' }`}
			onClick={ startAction }
		>{ name }</div>
	</>;
});

/**
 * Get search input
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} id Input ID
 * @param {String} placeholder Input placeholder
 * @param {Function} search Search by entered data
 * @param {Function} onFocus Focus on the field
 * @returns {HTMLElement}
 */
const SearchInput = React.memo(({
	id = '',
	placeholder = '',
	search = () => {},
	onFocus = () => {},
}) => {
	return <>
		<input
			type="text"
			autoComplete="off"
			id={`search-${id}`}
			placeholder={`Поиск ${placeholder}`}
			className="input admin-repetition-discipline__input"
			onChange={ search }
			onFocus={ onFocus }
		></input>
	</>;
});

/**
 * Get a result block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isSuccess Success response flag
 * @param {String} resultText Query result text
 * @returns {HTMLElement}
 */
const ResultBlock = React.memo(({
	resultText = '',
	isSuccess = false,
}) => {
	return <>
		<div className={`alert alert-${ isSuccess ? 'success' : 'error pointer' } admin-repetition-discipline__result`}>
			{ resultText }
		</div>
	</>;
});

/**
 * Get a question editing block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} answer
 * @param {String} question
 * @param {Function} handleChange Fixing changes to the question
 * @returns {HTMLElement}
 */
const QuestionEditingBlock = React.memo(({
	answer = '',
	question = '',
	handleChange = () => {},
}) => {
	return <>
		<Textarea
			id="question"
			placeholder="вопрос"
			value={question}
			handleChange={ handleChange }
		/>
		<Textarea
			id="answer"
			placeholder="ответ"
			value={answer}
			handleChange={ handleChange }
		/>
	</>;
});

/**
 * Get a textarea
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} id Input ID
 * @param {String} value Input value
 * @param {String} placeholder Input placeholder
 * @param {Function} handleChange Fixing changes to the question
 * @returns {HTMLElement}
 */
const Textarea = React.memo(({
	id = '',
	value = '',
	placeholder = '',
	handleChange = () => {},
}) => {
	return <>
		<textarea
			id={`textarea-${id}`}
			className="input scroll admin-repetition-discipline__textarea"
			placeholder={`Введите ${placeholder}`}
			name={id}
			value={ value }
			onChange = { handleChange }
		></textarea>
	</>;
});

export default AdminRepetitionDiscipline; 
