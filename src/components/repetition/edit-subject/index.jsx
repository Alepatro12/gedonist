import './style.css';

import { useParams } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';

/**
 * Render the subject edit page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {number} userId
 * @param {number} disciplineId Discipline ID
 * @param {Function} findDiscipline Search for discipline data
 * @returns {HTMLElement}
 */
const EditSubject = React.memo(({
	userId = 0,
	disciplineId = 0,
	findDiscipline = () => {},
	...props
}) => {
	const { ownerName = '', subjectId = 0 } = useParams();

	useLayoutEffect(() => {
		if (!ownerName || !subjectId) {
			return;
		}

		findDiscipline(userId, subjectId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ownerName, subjectId]);

	return disciplineId
		? <EditSubjectBlock userId={userId} disciplineId={disciplineId} {...props}/>
		: <></>;
});

/**
 * Get subject edit block
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @returns {HTMLElement}
 */
const EditSubjectBlock = React.memo(({
	name = '',
}) => {
	return <div className="repetition-edit-subject">
		<h1 className="repetition-edit-subject__title">{ name }</h1>
	</div>;
});

export default EditSubject; 
