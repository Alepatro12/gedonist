import './style.css';

import React, { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import { nameCollection } from './../../../utils/index';

/**
 * Render the renaming subject page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {string} name Subject name
 * @param {number} userId
 * @param {Function} clearData Clear data
 * @param {number} disciplineId Discipline ID
 * @param {bool} isEditAvailable Ewditing availability flag
 * @param {bool} isSubjectRenamed Subject rename success flag
 * @param {Function} renameSubject Rename subject
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const RenameSubject = React.memo(({
	name = '',
	userId = 0,
	disciplineId = 0,
	clearData = () => {},
	isEditAvailable = false,
	isSubjectRenamed = false,
	renameSubject = () => {},
	findDiscipline = () => {},
	...props
}) => {
	const navigate = useNavigate();
	const { ownerName = '', subjectId = 0 } = useParams();

	useEffect(() => {
		if (ownerName && disciplineId && isSubjectRenamed) {
			clearData();
			navigate(`/repetition/menu/${ownerName}`);
		}
	}, [isSubjectRenamed, navigate, ownerName, disciplineId, clearData]);

	useLayoutEffect(() => {
		if (!ownerName || !subjectId) {
			return <></>;
		}

		findDiscipline(userId, subjectId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ownerName, subjectId]);

	if (!isEditAvailable || !disciplineId) {
		return <></>;
	}

	const onSubmit = (formData) => renameSubject({
		userId,
		name: formData.name,
		subjectId: disciplineId,
	});

	return <div className="rename-subject">
		<div className="rename-subject__block">
			<h1 className="rename-subject__title">{ name }</h1><br/>
			<RenameSubjectForm
				onSubmit = {onSubmit}
				ownerName = {ownerName}
				subjectId = {disciplineId}
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
 * Get the renaming subject form
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} subjectId Subject ID
 * @param {string} errorText
 * @param {string} ownerName Page owner name
 * @param {bool} isDisabled Flag indicating that data cannot be submit
 * @param {Function} onSubmit Submit data
 * @returns {HTMLElement}
 */
const RenameSubjectForm = React.memo(({
	subjectId = 0,
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
				<Form className="rename-subject__form">
					<Field type="text" className="input rename-subject__input" name="name" placeholder="Новое название темы"/>
					<ErrorMessage name="name" component="div" className="alert alert-error pointer"/><br/>
					<div className="rename-subject__btn">
						<button type="submit" className="btn btn-target rename-subject__btn-primary" disabled={isDisabled}>Сохранить</button>
						{ errorText && 
							<div className="alert alert-error pointer">{errorText}</div>
						}
					</div>
					<div className="btn btn-target btn-target-second">
						<NavLink to={`/repetition/edit-subject/${ownerName}/${subjectId}`} className="rename-subject__link">Отмена</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	)
});

export default RenameSubject;