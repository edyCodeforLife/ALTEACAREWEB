import { IAppState } from './reducers/app-reducer';
import { IDoctorState } from './reducers/doctor-reducer';
import { IUserState } from './reducers/user-reducer';

export const initialState: {
	user: IUserState;
	application: IAppState;
	doctor: IDoctorState;
} = {
	user: {
		user: {},
		schedule: {},
		appointment: {}
	},
	application: {
		token: "",
		isMounted: false,
		connection: null,
		newEmail: "",
		newPhone: ""
	},
	doctor: {
		doctor: {},
		specialist: [],
	}
};