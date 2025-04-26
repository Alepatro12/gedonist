import './style.css';

import React, { useLayoutEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

/**
 * Render the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {bool} isEditAvailable Ewditing availability flag
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const EditSubject = React.memo(({
	userId = 0,
	disciplineId = 0,
	isEditAvailable = false,
	findDiscipline = () => {},
	...props
}) => {
	const { ownerName = '', subjectId = 0 } = useParams();

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

	return <EditSubjectBlock
		userId={userId}
		ownerName={ownerName}
		disciplineId={disciplineId}
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
 * @param {number} disciplineId Discipline ID
 * @returns {HTMLElement}
 */
const EditSubjectBlock = React.memo(({
	name = '',
	ownerName = '',
	disciplineId = 0,
}) => {
	return <div className="repetition-edit-subject">
		<h1 className="repetition-edit-subject__title">{ name }</h1>
		<div className="repetition-edit-subject__block">
			<NavLink
				className="btn btn-target"
				to={`/repetition/rename-subject/${ownerName}/${disciplineId}`}
			>Переименовать</NavLink>
		</div>
	</div>;
});

export default EditSubject; 
