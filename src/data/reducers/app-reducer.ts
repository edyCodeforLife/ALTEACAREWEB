

export const APP_ACTIONS = {
	CHANGE_TOKEN: 'CHANGE_TOKEN',
	CHANGE_ISMOUNTED: 'CHANGE_ISMOUNTED',
	CHANGE_CONNECTION: 'CHANGE_CONNECTION',
	CHANGE_EMAIL: 'CHANGE_EMAIL',
	CHANGE_PHONE: 'CHANGE_PHONE'
};

export interface IAppState {
	token?: string;
	isMounted?: boolean;
	connection?: any;
	newEmail: string;
	newPhone: string;
}

export interface IAppAction {
	type: 'CHANGE_TOKEN' | 'CHANGE_ISMOUNTED' | 'CHANGE_CONNECTION' | 'CHANGE_EMAIL' | 'CHANGE_PHONE';
	data: IAppState;
}

export const appReducer = (state: IAppState, action: IAppAction): IAppState => {
	switch (action.type) {
		case APP_ACTIONS.CHANGE_TOKEN:
			return {
				...state,
				token: action.data.token
			};
		case APP_ACTIONS.CHANGE_ISMOUNTED:
			return {
				...state,
				isMounted: action.data.isMounted
			};
		case APP_ACTIONS.CHANGE_CONNECTION:
			return {
				...state,
				connection: action.data.connection
			};
		case APP_ACTIONS.CHANGE_EMAIL:
			return {
				...state,
				newEmail: action.data.newEmail
			};
		case APP_ACTIONS.CHANGE_PHONE:
			return {
				...state,
				newPhone: action.data.newPhone
			};
		default:
			return state;
	}
};
