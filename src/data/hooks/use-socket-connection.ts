import { useCallback } from 'react'
import { Socket_URL } from '../global/variables';
import { useGlobalState } from "../states";
import { APP_ACTIONS } from "../reducers/app-reducer";
import { io } from 'socket.io-client';
import { getToken } from '../hooks/auth-token';

export interface IConnectionQuery {
	method: string;
	appointmentId?: any;
}

export default () => {
	const token = getToken();
	const [{
		application: { connection }
	}, dispatch] = useGlobalState();

	const buildConnection = useCallback((query: any, autoConnect?: boolean) => {
		if (!connection) {
			const RTconnection = io(Socket_URL(), {
				auth: { token: `Bearer ${token}` },
				query,
				autoConnect
			});
			// dispatchConnection(RTconnection);

			return RTconnection;
		}
	}, []
	);

	// const dispatchConnection = useCallback((connection: any) => {
	// 	dispatch({
	// 		type: APP_ACTIONS.CHANGE_CONNECTION,
	// 		data: { connection }
	// 	});
	// }, []);



	return [buildConnection]
}