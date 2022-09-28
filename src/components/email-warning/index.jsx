import './style.css';
import React from 'react';

const WarningEmail = React.memo(({ isAuthenticate, emailStatus, isChangePassword }) => {
	const infoText = isChangePassword ? 'изменения пароля' : 'почты';

	return <>
		{ (!emailStatus && isAuthenticate) || isChangePassword ?
			<div className="email-warning">
				Мы отправили вам письмо для подтверждения {infoText}. Если письма нет в папке "Входящие", проверьте папки Спам, рассылки и промо-акции
			</div>
			: ''
		}
	</>
});

export default WarningEmail;