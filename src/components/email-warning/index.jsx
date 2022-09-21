import './style.css';
import React from 'react';

const WarningEmail = React.memo(({ isAuthenticate, emailStatus }) => {
	return <>
		{ !emailStatus && isAuthenticate ?
			<div class="email-warning">
				Мы отправили вам письмо для подтверждения почты. Если письма нет в папке "Входящие", проверьте папки Спам, рассылки и промо-акции
			</div>
			: ''
		}
	</>
});

export default WarningEmail;