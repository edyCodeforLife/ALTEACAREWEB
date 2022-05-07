import { IDoctorSpecialist } from '../services/alteaCMS/IAlteaCMS';

export const DOCTOR_ACTIONS = {
	CHANGE_DOCTOR: 'CHANGE_DOCTOR',
	CHANGE_SPECIALIST: 'CHANGE_SPECIALIST',
};

export interface IDoctorState {
	doctor: any;
	specialist: IDoctorSpecialist[]
}

export interface IDoctorAction {
	type: 'CHANGE_DOCTOR' | 'CHANGE_SPECIALIST';
	data: IDoctorState;
}

export const doctorReducer = (state: IDoctorState, action: IDoctorAction): IDoctorState => {
	switch (action.type) {
		case DOCTOR_ACTIONS.CHANGE_DOCTOR:
			return {
				...state,
				doctor: action.data.doctor
			};
		case DOCTOR_ACTIONS.CHANGE_SPECIALIST:
			return {
				...state,
				specialist: action.data.specialist
			};
		default:
			return state;
	}
};
