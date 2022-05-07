import { createContext, useContext, useReducer } from 'react';
import { IUserState, IUserAction } from './reducers/user-reducer';
import { IAppState, IAppAction } from './reducers/app-reducer';
import { IDoctorState } from './reducers/doctor-reducer';

interface IInitialState {
	user: IUserState;
	application: IAppState;
	doctor: IDoctorState;
}

export const StateContext = createContext({});
export const StateProvider = (
	{ reducer, initialState, children }:
		{ reducer: any, initialState: IInitialState, children?: any }
) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useGlobalState = (): any => useContext(StateContext);