import './../style.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login, email, password } from './../../../utils/index';

const Registration = React.memo(({ getRegistration }) => {
	const onSubmit = (formData) => {
		getRegistration(formData.name, formData.email, formData.password, formData.passwordValid);
	}

	return (
		<div className="modal">
			<div className="modal__title">Регистрация</div><br/>
			<RegistrationForm onSubmit={ onSubmit }/>
		</div> 
	);
});

const validateForm = (formData) => {
	const errorName = login(formData.name);
	const errorEmail = email(formData.email);
	const errorPassword = password(formData.password);
	const errorPasswordValid = password(formData.passwordValid);
	let errors = {};

	if (errorName || errorPassword) {
		errors = {
			name: errorName,
			email: errorEmail,
			password: errorPassword,
			passwordValid: errorPasswordValid
		}
	}

	return errors;
};

const RegistrationForm = React.memo((props) => {
	return (
		<Formik
			initialValues = {{ name: '', password: '', email: '', passwordValid: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => props.onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="modal__input" name="name" placeholder="Имя"/>
					<ErrorMessage name="name" component="div" className="modal__error"/><br/>
					<Field type="text" className="modal__input" name="email" placeholder="E-mail"/>
					<ErrorMessage name="email" component="div" className="modal__error"/><br/>
					<Field type="password" className="modal__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="modal__error"/><br/>
					<Field type="password" className="modal__input" name="passwordValid" placeholder="Подтверждение пароля"/>
					<ErrorMessage name="passwordValid" component="div" className="modal__error"/><br/>
					<button type="submit" className="modal__button modal__button--primary" id="registration">Регистрация</button><br/>
					<div className="modal__button modal__button--default">
						<NavLink to="/auth/login" className="modal__link">Назад</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	);
});

export default Registration;