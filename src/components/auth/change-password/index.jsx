import './../style.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { email } from './../../../utils/index';

const ChangePassword = React.memo(({ errorText, isDisabled, getChangePassword }) => {
	const onSubmit = (formData) => {
		getChangePassword(formData.email);
	}

	return (
		<div className="modal">
			<div className="modal__title">Забыли пароль?</div><br/>
			<div className="modal__title modal__title--subtext">Введите ваш E-mail для получения нового пароля</div> 
			<ChangePasswordForm
				onSubmit={onSubmit}
				errorText={errorText}
				isDisabled={isDisabled}
			/>
		</div> 
	);
});

const validateForm = (formData) => {
	const errorEmail = email(formData.email);
	let errors = {};

	if (errorEmail) {
		errors = {
			email: errorEmail,
		};
	}

	return errors;
};

const ChangePasswordForm = React.memo(({ onSubmit, errorText, isDisabled }) => {
	return (
		<Formik
			initialValues = {{ email: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="modal__input" name="email" placeholder="E-mail"/>
					<ErrorMessage name="email" component="div" className="modal__error"/><br/>
					<button type="submit" className="modal__button modal__button--primary" id="change-password" disabled={isDisabled}>Подтвердить</button>
					{ errorText && 
						<div className="modal__error">{errorText}</div>
					}
					<br/>
					<div className="modal__button modal__button--default">
						<NavLink to="/auth/login" className="modal__link">Назад</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	);
});

export default ChangePassword;