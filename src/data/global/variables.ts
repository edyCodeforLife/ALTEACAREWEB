export const AUTH_TOKEN_NAME = 'altea-usr';
export const cookiesNewName = 'alt_new_token';
export const LOGIN_URL = '/login';
export const HOME_URL = '/';
export const LANDING_URL = '/landing';
export const PUBLIC_URL = [LOGIN_URL, '/forgot-password', '/list', LANDING_URL, '/register', '/blocks'];
export const globalColorDefault = '#1832AB';
export const activeLSUserSchedule = 'memsdsafsafjdsajdd';
export const activeLSCurrentAppointment = "sfadnrdscafsgdxosdjfs";
export const temporaryUserData = "dasnkadaudsadnadasdad";
export const alteaWebViewURL = 'damdsaAdadBdsadZ23Adadl';
export const SECRET_KEY = 'UYGHJKSNDHKSDHguyaiksdjbd';
export const SECRET_KEY2 = 'qwertyuisdfghjertyuio';
export const SECRET_KEY3 = 'asdadadadasdadqe123123e';
export const MIDTRANS_SNAP_CLIENT_KEY = process.env.ENDPOINT === 'production' ? 'Mid-client-4I5ghLJtXNmU6ZHA' : 'SB-Mid-client-dDCkEJkkaPyNfOb3';
// export const Socket_URL = process.env.ENDPOINT === 'production' ? 'https://socket.alteacare.com/' : 'https://staging-socket.alteacare.com/';
export const Socket_URL = () => {
	switch (process.env.ENDPOINT) {
		case "production":
			return 'https://socket.alteacare.com/';
		case "staging":
			return 'https://staging-socket.alteacare.com/';
		case "development":
			return 'https://dev-socket.alteacare.com/';
	}
}
export const MIDTRANS_SNAP_URL = process.env.ENDPOINT === 'production' ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js';