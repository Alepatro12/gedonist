import './../style.css';
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { password } from './../../../utils/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const NewPassword = React.memo(({ errorText, isDisabled, getNewPassword }) => {
	const onSubmit = (formData, token, email) => {
		getNewPassword(formData.password, formData.passwordValid, token, email);
	}

	return (
		<div className="modal">
			<div className="modal__title">Восстановление пароля</div><br/>
			<div className="modal__title modal__title--subtext">Введите новый пароль</div> 
			<NewPasswordForm
				onSubmit={onSubmit}
				errorText={errorText}
				isDisabled={isDisabled}
			/>
		</div> 
	);
});

const validateForm = (formData) => {
	const errorPassword = password(formData.password);
	const isPasswordsMatch = formData.passwordValid !== formData.password ? 'Пароли не совпадают' : '';
	const errorPasswordText = password(formData.passwordValid);
	const errorPasswordValid = errorPasswordText || isPasswordsMatch;
	let errors = {};

	if (errorPassword || errorPasswordValid) {
		errors = {
			password: errorPassword,
			passwordValid: errorPasswordValid
		};
	}

	return errors;
};

const NewPasswordForm = React.memo(({ onSubmit, errorText, isDisabled }) => {
	let [params, ] = useState(new URLSearchParams(useLocation().search));

	return (
		<Formik
			initialValues = {{ password: '', passwordValid: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData, params.get('token-password'), params.get('email'))}
		>
			{() => (
				<Form>
					<Field type="password" className="modal__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="modal__error"/><br/>
					<Field type="password" className="modal__input" name="passwordValid" placeholder="Подтверждение пароля"/>
					<ErrorMessage name="passwordValid" component="div" className="modal__error"/><br/>
					<button type="submit" className="modal__button modal__button--primary" id="new-password" disabled={isDisabled}>Подтвердить</button>
					{ errorText && 
						<div className="modal__error">{errorText}</div>
					}
				</Form>
			)}
		</Formik>
	);
});

export default NewPassword;