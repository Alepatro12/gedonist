import './../../auth/style.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nameCollection } from './../../../utils/index';

const ChangeCollection = React.memo(({
	changeCollection,
	errorText,
	isDisabled,
	userId,
	collectionId
}) => {
	const onSubmit = (formData) => {
		changeCollection(formData.name, userId, collectionId);
	}

	return (
		<div className="center">
			<div className="authentication">
				<div className="authentication__title">Редактирование коллекции</div><br/>
				<ChangeCollectionForm
					onSubmit={onSubmit}
					errorText={errorText}
					isDisabled={isDisabled}
				/>
			</div> 
		</div>
	);
});

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

const ChangeCollectionForm = React.memo(({ onSubmit, errorText, isDisabled }) => {
	return (
		<Formik
			initialValues = {{ name: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="authentication__input" name="name" placeholder="Название коллекции"/>
					<ErrorMessage name="name" component="div" className="authentication__error"/><br/>
					<button type="submit" className="authentication__button authentication__button--primary" id="change-collection" disabled={isDisabled}>Сохранить</button>
					{ errorText && 
						<div className="authentication__error">{errorText}</div>
					}
					<br/>
					<div className="authentication__button authentication__button--default">
						<NavLink to="/auth/authenticate" className="authentication__link">Отмена</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	)
});

export default ChangeCollection;