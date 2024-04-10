/**
 * Определяет по строке userAgent является ли устройство мобильным
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 * 
 * @param {String} userAgent Собственный userAgent (navigator is default)
 * @returns {bool}
 */
export function isMobile(userAgent = navigator.userAgent) {
	if (userAgent && (typeof(userAgent) !== 'string')) {
		return false;
	}

	const MOBILE = [
		'iphone',
		'ipad',
		'android',
		'blackberry',
		'nokia',
		'opera mini',
		'windows mobile',
		'windows phone',
		'iemobile',
	];
	let isMobile = false;

	if (sessionStorage.desktop) {
		isMobile = false;
	} else if (localStorage.mobile) {
		isMobile = true;
	}

	for (const deviceName in MOBILE) {
		if (userAgent.toLowerCase().includes(MOBILE[deviceName])) {
			isMobile = true;
		}
	}

	if (!isMobile) {
		isMobile = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
	}

	return isMobile;
}
