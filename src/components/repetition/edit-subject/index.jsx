import './style.css';

import React, { useLayoutEffect, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

/**
 * Render the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {Function} clearData Clear data
 * @param {Function} showPopUp Show pop up
 * @param {bool} isEditAvailable Ewditing availability flag
 * @param {bool} isSubjectDeleted Deleted subject flag
 * @param {Function} deleteSubject Delete subject
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const EditSubject = React.memo(({
	userId = 0,
	disciplineId = 0,
	clearData = () => {},
	showPopUp = () => {},
	isEditAvailable = false,
	isSubjectDeleted = false,
	deleteSubject = () => {},
	findDiscipline = () => {},
	...props
}) => {
	const navigate = useNavigate();
	const { ownerName = '', subjectId = 0 } = useParams();

	useEffect(() => {
		if (ownerName && isSubjectDeleted) {
			showPopUp(
				'repetition/edit-subject-controller.php',
				'Восстановить тему',
				{
					userId,
					isRestoreSubject: true,
					subjectId: disciplineId,
				}
			);
			clearData();
			navigate(`/repetition/menu/${ownerName}`);
		}
	}, [isSubjectDeleted, navigate, ownerName, clearData, showPopUp, userId, disciplineId]);

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

	const startDeletingSubject = () => {
		if (!userId || !isEditAvailable || !disciplineId) {
			return;
		}

		deleteSubject({userId, subjectId: disciplineId});
	};

	return <EditSubjectBlock
		userId={userId}
		ownerName={ownerName}
		disciplineId={disciplineId}
		startDeletingSubject={startDeletingSubject}
		{...props}
	/>;
});

/**
 * Get subject edit block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {String} ownerName Page owner name
 * @param {string} errorText
 * @param {number} disciplineId Discipline ID
 * @param {Function} startDeletingSubject Start deleting subject
 * @returns {HTMLElement}
 */
const EditSubjectBlock = React.memo(({
	name = '',
	ownerName = '',
	errorText = '',
	disciplineId = 0,
	startDeletingSubject = () => {},
}) => {
	return <div className="repetition-edit-subject">
		<h1 className="repetition-edit-subject__title">{ name }</h1>
		<div className="repetition-edit-subject__block">
			<NavLink
				className="btn btn-target"
				to={`/repetition/rename-subject/${ownerName}/${disciplineId}`}
			>Переименовать</NavLink>
			<div>
				<div
					onClick={ startDeletingSubject }
					className="btn btn-target btn-target-second repetition-edit-subject__btn"
				>Удалить</div>
				{ errorText && 
					<div className="alert alert-error pointer">{errorText}</div>
				}
			</div>
		</div>
	</div>;
});

export default EditSubject; 
