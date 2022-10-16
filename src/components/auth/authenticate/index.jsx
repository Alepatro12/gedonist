import './../style.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login, email, password } from './../../../utils/index';

const Registration = React.memo(({ errorText, isDisabled, getRegistration }) => {
	const onSubmit = (formData) => {
		getRegistration(formData.name, formData.email, formData.password, formData.passwordValid);
	}

	return (
		<div className="center">
			<div className="authentication">
				<div className="authentication__title">Регистрация</div><br/>
				<RegistrationForm
					onSubmit={onSubmit}
					errorText={errorText}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
});

const validateForm = (formData) => {
	const errorName = login(formData.name);
	const errorEmail = email(formData.email);
	const errorPassword = password(formData.password);
	const isPasswordsMatch = formData.passwordValid !== formData.password ? 'Пароли не совпадают' : '';
	const errorPasswordText = password(formData.passwordValid);
	const errorPasswordValid = errorPasswordText || isPasswordsMatch;
	let errors = {};

	if (errorName || errorEmail || errorPassword || errorPasswordValid) {
		errors = {
			name: errorName,
			email: errorEmail,
			password: errorPassword,
			passwordValid: errorPasswordValid
		};
	}

	return errors;
};

const RegistrationForm = React.memo(({ onSubmit, errorText, isDisabled}) => {
	return (
		<Formik
			initialValues = {{ name: '', password: '', email: '', passwordValid: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="authentication__input" name="name" placeholder="Логин"/>
					<ErrorMessage name="name" component="div" className="authentication__error"/><br/>
					<Field type="text" className="authentication__input" name="email" placeholder="E-mail"/>
					<ErrorMessage name="email" component="div" className="authentication__error"/><br/>
					<Field type="password" className="authentication__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="authentication__error"/><br/>
					<Field type="password" className="authentication__input" name="passwordValid" placeholder="Подтверждение пароля"/>
					<ErrorMessage name="passwordValid" component="div" className="authentication__error"/><br/>
					<button type="submit" className="authentication__button authentication__button--primary" id="registration" disabled={isDisabled}>Регистрация</button>
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

export default Registration;