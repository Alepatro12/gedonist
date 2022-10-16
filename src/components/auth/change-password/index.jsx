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
		<div className="center">
			<div className="authentication">
				<div className="authentication__title">Забыли пароль?</div><br/>
				<div className="authentication__title authentication__title--subtext">Введите ваш E-mail для получения нового пароля</div> 
				<ChangePasswordForm
					onSubmit={onSubmit}
					errorText={errorText}
					isDisabled={isDisabled}
				/>
			</div>
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
					<Field type="text" className="authentication__input" name="email" placeholder="E-mail"/>
					<ErrorMessage name="email" component="div" className="authentication__error"/><br/>
					<button type="submit" className="authentication__button authentication__button--primary" id="change-password" disabled={isDisabled}>Подтвердить</button>
					{ errorText && 
						<div className="authentication__error">{errorText}</div>
					}
					<br/>
					<div className="authentication__button authentication__button--default">
						<NavLink to="/auth/login" className="authentication__link">Назад</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	);
});

export default ChangePassword;