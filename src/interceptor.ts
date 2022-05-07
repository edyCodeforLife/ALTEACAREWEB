import { DataService } from './data/services/config';
import { setToken, removeToken, getToken } from './data/hooks/auth-token';
import { LOGIN_URL, LANDING_URL } from './data/global/variables';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class AppSingletonClass {
	private static instance: AppSingletonClass;
	private appInitialize: boolean = false;
	private masterDataInitialize: boolean = false;

	private constructor() { }

	get isInitialize() {
		return this.appInitialize;
	}

	get isMasterDataInitialize() {
		return this.masterDataInitialize;
	}

	static getInstance(): AppSingletonClass {
		if (!AppSingletonClass.instance) {
			AppSingletonClass.instance = new AppSingletonClass();
		}
		return AppSingletonClass.instance;
	}

	setInitialize() {
		this.appInitialize = true;
	}

	setMasterDataInitialize() {
		this.masterDataInitialize = true;
	}
}

const appSingletonInstance = AppSingletonClass.getInstance();

// axios interceptors
let quiting = false;
// console.log(quiting);

if (!appSingletonInstance.isInitialize) {

	DataService.interceptors.request.use(
		function (config) {
			const token = getToken();

			if (token) {
				config.headers = { Authorization: `Bearer ${token}` }
				setToken(token);
			}
			return config;
		},
		function (error) {
			console.log('interceptor error cuy');
			return Promise.reject(error);
		}
	);

	DataService.interceptors.response.use(
		function (response) {
			return response
		},
		error => {
			// Do something with response error
			if (error.response.status === 401) {
				// let errObj = JSON.parse(JSON.stringify(error));
				// if ((errObj as any).response.status === 401) {
				// handle this
				console.log('Quiting application as token is expired');

				removeToken()

				Cookies.set('isAlteaLoggedIn', 'no');
				Cookies.set('isAlteaLoggedIn', 'no', { domain: 'localhost' });

				if (!quiting) {
					quiting = true;
					// window.location.href = window.location.pathname;
					if (history) {
						//prevents browser from storing history with each change:
						quiting = false;
						if (window.location.pathname !== LANDING_URL) {
							history.replace(LANDING_URL);
							window.location.reload();
						}
					}
				}
			}
			return Promise.reject(error);
		}
	);
	appSingletonInstance.setInitialize();
}

