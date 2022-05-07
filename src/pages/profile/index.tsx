import { memo, useState, useEffect } from "react";
import { ScreenProfilePage } from './screen';
import { IAuthServiceAltea, AuthServiceAltea, IProfileUserService, ProfileUserService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';
import Cookies from 'js-cookie';
import { removeToken } from '../../data/hooks/auth-token';
import * as LS from 'local-storage';
import { activeLSUserSchedule, LANDING_URL } from '../../data/global/variables';

function _ProfilePage(props) {
	const qrs = QrsToObj(window.location.search);
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea();
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const [_, dispatch] = useGlobalState();
	const [loading, setLoading] = useState(true);

	const [profileUser, setProfileUser] = useState({});

	const getProfile = () => {
		_ProfileService.getProfile({
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				setProfileUser(res?.data);
				dispatch({
					type: USER_ACTIONS.CHANGE_USER,
					data: { user: res?.data.data },
				});
			}
		});
	}

	const doLogout = () => {
		_AuthService.Logout({
			Success: () => {
				removeToken()
				Cookies.set('isAlteaLoggedIn', 'no');
				Cookies.set('isAlteaLoggedIn', 'no', { domain: 'localhost' });
				LS.remove(activeLSUserSchedule)
				setTimeout(() => {
					props.history.push(LANDING_URL);
				});
			}
		})
	}

	const handleClickField = (field: string): void => {
		if (field === "logout") {
			doLogout();
		}

		if (field === "changeProfile" || field === "settings") {
			props.history.push(`/change-profile?type=${field}`);
		}

		if (field === "FAQ" || field === "termscondition" || field === "contact") {
			props.history.push(`/blocks?type=${field}`);
		}
	}

	useEffect(() => {
		getProfile();
	}, [])

	return (
		<ScreenProfilePage
			profileUser={profileUser}
			loading={loading}
			handleClickField={handleClickField}
			{...props}
		/>
	)
}
export const ProfilePage = memo((_ProfilePage));
