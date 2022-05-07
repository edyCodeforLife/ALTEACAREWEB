

export const USER_ACTIONS = {
	CHANGE_USER: 'CHANGE_USER',
	CHANGE_SCHEDULE: 'CHANGE_SCHEDULE',
	CHANGE_APPOINTMENT: 'CHANGE_APPOINTMENT'
};

export interface IUserState {
	user: any;
	schedule: any;
	appointment: any;
}

export interface IUserAction {
	type: 'CHANGE_USER' | 'CHANGE_SCHEDULE' | 'CHANGE_APPOINTMENT';
	data: IUserState;
}

export const userReducer = (state: IUserState, action: IUserAction): IUserState => {
	switch (action.type) {
		case USER_ACTIONS.CHANGE_USER:
			return {
				...state,
				user: action.data.user
			};
		case USER_ACTIONS.CHANGE_SCHEDULE:
			return {
				...state,
				user: action.data.schedule
			};
		case USER_ACTIONS.CHANGE_APPOINTMENT:
			return {
				...state,
				user: action.data.appointment
			};
		default:
			return state;
	}
};
