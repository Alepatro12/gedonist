import './style.css';

import React, { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import { nameCollection } from './../../../utils/index';

/**
 * Render the creation subject page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} subjectId Subject ID
 * @param {Function} clearData Clear data
 * @param {bool} isEditAvailable Ewditing availability flag
 * @param {Function} createSubject Create subject
 * @param {Function} findIsEditAvailable Search editing availability flag
 * @returns {HTMLElement}
 */
const CreateSubject = React.memo(({
	userId = 0,
	subjectId = 0,
	clearData = () => {},
	isEditAvailable = false,
	createSubject = () => {},
	findIsEditAvailable = () => {},
	...props
}) => {
	const navigate = useNavigate();
	const { ownerName = '' } = useParams();

	useEffect(() => {
		if (ownerName && subjectId) {
			clearData();
			navigate(`/repetition/edit-questions/${ownerName}/${subjectId}`);
		}
	}, [subjectId, navigate, ownerName, clearData]);

	useLayoutEffect(() => {
		if (!userId || !ownerName) {
			return <></>;
		}

		findIsEditAvailable({ userId, ownerName });
	}, [userId, ownerName, findIsEditAvailable]);

	if (!isEditAvailable) {
		return <></>;
	}

	const onSubmit = (formData) => createSubject({
		userId,
		ownerName,
		name: formData.name,
	});

	return <div className="create-subject">
		<div className="create-subject__block">
			<h1 className="create-subject__title">Новая тема</h1><br/>
			<CreateSubjectForm
				onSubmit = {onSubmit}
				ownerName = {ownerName}
				{...props}
			/>
		</div> 
	</div>;
});

/**
 * Validate form
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Object} formData
 * @returns {Object}
 */
const validateForm = (formData) => {
	const errorName = nameCollection(formData.name);
	let errors = {};

	if (errorName) {
		errors = {
			name: errorName,
		};
	}

	return errors;
};

/**
 * Get the creation subject form
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} errorText
 * @param {string} ownerName Page owner name
 * @param {bool} isDisabled Flag indicating that data cannot be submit
 * @param {Function} onSubmit Submit data
 * @returns {HTMLElement}
 */
const CreateSubjectForm = React.memo(({
	errorText = '',
	ownerName = '',
	isDisabled = false,
	onSubmit = () => {},
}) => {
	return (
		<Formik
			initialValues = {{ name: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form className="create-subject__form">
					<Field type="text" className="input create-subject__input" name="name" placeholder="Название темы"/>
					<ErrorMessage name="name" component="div" className="alert alert-error pointer"/><br/>
					<div className="create-subject__btn">
						<button type="submit" className="btn btn-target create-subject__btn-primary" disabled={isDisabled}>Создать</button>
						{ errorText && 
							<div className="alert alert-error pointer">{errorText}</div>
						}
					</div>
					<div className="btn btn-target btn-target-second">
						<NavLink to={`/repetition/menu/${ownerName}`} className="create-subject__link">Отмена</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	)
});

export default CreateSubject;