import { memo, useRef, useState, ChangeEvent, useEffect } from "react";
import { ScreenLoginPage } from './screen';
import { Ivalues } from '../../components/pages-components/login/login';
import { validateEmail, QrsToObj } from '../../data/global/function';
import update from 'immutability-helper';
import { DataService } from '../../data/services/config';
import { IAuthServiceAltea, AuthServiceAltea, IAlteaCMSService, AlteaCMSService } from '../../data/business/index';
import { isEmpty } from 'lodash';
import { AltAlert } from '../../components/alert/index';
import { setToken, getToken } from '../../data/hooks/auth-token';
import Cookies from 'js-cookie';
import { HOME_URL } from '../../data/global/variables';

function _LoginPage(props) {
	const userInteraction = useRef(false);
	const _service: IAuthServiceAltea = new AuthServiceAltea();
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [doctorDetail, setDoctorDetail] = useState({});
	const token = getToken();
	const [loading, setLoading] = useState(false);
	let qrsDoctor = QrsToObj(window.location.search);
	let doctor_id = qrsDoctor?.doctor_id;
	const checkQrs = isEmpty(qrsDoctor);
	const initialState = {
		username: '',
		errorMessage: {
			username: "",
			password: ""
		},
		password: '',
		showPassword: false,
	}

	const [values, setValues] = useState<Ivalues>(initialState);

	// const debounceValue = useCallback(debounce((value) => {
	// 	return value;
	// }, 550), []);

	// function debounce_leading(func, timeout = 300) {
	// 	let timer;
	// 	return (...args) => {
	// 		if (!timer) {
	// 			func.apply(this, args);
	// 		}
	// 		clearTimeout(timer);
	// 		timer = setTimeout(() => {
	// 			timer = undefined;
	// 		}, timeout);
	// 	};
	// }

	const getDoctorDetail = () => {
		if (!checkQrs && !token) {
			_CMSService.GetDoctorDetail(qrsDoctor.doctor_id, {
				Success: (data: any) => {
					setDoctorDetail(data.data);
				}
			})
		}
	}

	useEffect(() => {
		getDoctorDetail();
	}, [])

	const validationInput = () => {
		let messageErrorUsername = "";
		let messageErrorPassword = "";
		let query: any = {};
		const regexSmallChar = ".*[a-z]+.*";
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
		const regexCapitalChar = ".*[A-Z]+.*";
		const regexNumberInside = ".*[0-9]+.*";
		const regexPass = "^[a-zA-Z0-9\s,-]{8,}"


		if (values && values.username !== "") {
			if (!validateEmail(values.username) && !values.username.match(regexMinimum)) {
				messageErrorUsername = "Email atau nomor ponsel tidak valid";
			} else {
				messageErrorUsername = "";
			}
		} else {
			messageErrorUsername = "";
		}

		if (values && values.password !== '') {
			if (!values.password.match(regexSmallChar)) {
				messageErrorPassword = "Harus ada huruf kecil"
			} else if (!values.password.match(regexCapitalChar)) {
				messageErrorPassword = "Harus ada huruf besar"
			} else if (!values.password.match(regexNumberInside)) {
				messageErrorPassword = "Harus ada angka"
			} else if (!values.password.match(regexPass)) {
				messageErrorPassword = "Minimal 8 Karakter"
			}
		}

		query["errorMessage"] = {
			username: {
				$set: messageErrorUsername
			},
			password: {
				$set: messageErrorPassword
			}
		}

		let newData = update(values, query);

		setValues(newData);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>, prop: keyof Ivalues) => {
		const value = event && event.target && event.target.value;
		userInteraction.current = true;
		setValues({ ...values, [prop]: value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const onSubmitLogin = () => {
		let query: any = {};
		setLoading(true);
		const dataLogin = {
			username: values.username,
			password: values.password,
		}
		_service.loginService(dataLogin, {
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				if (!res.data?.is_verified) {
					props.history.push("/register?verified=no");
				} else {
					Cookies.set('isAlteaLoggedIn', 'yes');
					Cookies.set('isAlteaLoggedIn', 'yes', { domain: 'localhost' });
					setToken(res.data.access_token);
					DataService.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
					setTimeout(() => {
						if (doctor_id) {
							props.history.push(`/detail?doctor_id=${doctor_id}`);
						} else {
							props.history.push("/register");
						}
					}, 300);
				}
			},
			ValidationError: (data: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});

			},
			ServerError: (data: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			}
		});
	}

	const redirectTo = (path) => {
		props.history.push(path);
	}

	useEffect(() => {
		userInteraction.current && validationInput();
	}, [values]);

	return (
		<ScreenLoginPage
			handleChange={handleChange}
			handleClickShowPassword={handleClickShowPassword}
			handleMouseDownPassword={handleMouseDownPassword}
			values={values}
			onSubmitLogin={onSubmitLogin}
			isFromListDoctor={!checkQrs}
			redirectTo={redirectTo}
			loading={loading}
			doctorDetail={doctorDetail}
			{...props}
		/>
	)
}
export const LoginPage = memo((_LoginPage));
