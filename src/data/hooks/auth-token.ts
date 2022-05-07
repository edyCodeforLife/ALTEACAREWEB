
import { AUTH_TOKEN_NAME } from '../global/variables';
import SimpleCryptoJS from 'simple-crypto-js';

const cryptrInstance = new SimpleCryptoJS('alteapatientwebappsmodule');
import Cookies from 'js-cookie';

export const getToken = (): string | null => {
	const cToken = Cookies.get(AUTH_TOKEN_NAME);
	const decrypted =
		cToken && cToken !== ''
			? cryptrInstance && cryptrInstance.decrypt
				? cryptrInstance.decrypt(cToken)
				: cToken
			: null;

	return decrypted;
};

export const setToken = (token: string | any, _expired?: Date): void => {
	// let inMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
	if (!token) return;
	const encrypted =
		cryptrInstance && cryptrInstance.encrypt
			? cryptrInstance && cryptrInstance.encrypt(token)
			: token;

	// const expired = _expired ? _expired : new Date();
	// if (!_expired) expired.setHours(expired.getHours() + 1);
	Cookies.set(AUTH_TOKEN_NAME, encrypted);
};

export const removeToken = (): void => {
	try {
		Cookies.remove(AUTH_TOKEN_NAME);
	} catch (e) {
		console.log(e);
	}
};
