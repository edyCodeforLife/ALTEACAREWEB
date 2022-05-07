import { useEffect, Fragment, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { PUBLIC_URL, LOGIN_URL, LANDING_URL, HOME_URL } from '../../data/global/variables';
import { getToken } from '../../data/hooks/auth-token';

function _NavListener(props) {
	let currentHistory = props.history;
	let currentUrl = currentHistory.location.pathname;
	const navigatorChanged = () => {
		// check user authentication
		let token = getToken();

		if (!token) {
			if (
				PUBLIC_URL.indexOf(currentUrl) < 0
			) {
				setTimeout(() => {
					currentHistory.replace(LANDING_URL);
					window.location.reload();
				});
			}
			return;
		} else {
			if (PUBLIC_URL.indexOf(currentUrl) === 0 ||
				PUBLIC_URL.indexOf(currentUrl) === 4) {
				setTimeout(() => {
					currentHistory.push(HOME_URL);
				});
			}
		}

		if (currentHistory.location.pathname === LANDING_URL) {
			currentHistory.push(LANDING_URL);
		} else {
			console.log("mantul")
		}

		// console.log('navigate changed');
	}

	useEffect(() => {
		navigatorChanged()
	}, [currentUrl]);


	return <Fragment>{props.children}</Fragment>;
}

export const NavListener = memo(withRouter(_NavListener));

