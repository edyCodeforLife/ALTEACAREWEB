import ReactDOM from "react-dom";
import App from "./app";
import { Router } from 'react-router-dom';
import 'regenerator-runtime/runtime'
import { createBrowserHistory } from 'history';
import { StateProvider } from './data/states';
import { initialState } from './data/initial-states';
import { IUserState, userReducer } from "./data/reducers/user-reducer";
import { IAppState, appReducer } from "./data/reducers/app-reducer";
import { IDoctorState, doctorReducer } from './data/reducers/doctor-reducer';
import './interceptor.ts'

const mainReducer = ({ user, application, doctor }: { user: IUserState, application: IAppState, doctor: IDoctorState }, action: any) => ({
    user: userReducer(user, action),
    application: appReducer(application, action),
    doctor: doctorReducer(doctor, action)
});

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <StateProvider initialState={initialState} reducer={mainReducer}>
            <App />
        </StateProvider>
    </Router>,
    document.getElementById("app")
);