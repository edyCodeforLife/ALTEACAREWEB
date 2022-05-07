import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ScreenChangePassword } from './screen';
import { AuthServiceAltea, IAuthServiceAltea } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { clone } from 'lodash';

function _ChangePasswordPage(props) {
	const _initialStateValue = {
		password: "",
		password_confirmation: "",
	}
	const qrs = QrsToObj(window.location.search);
	const qrsStep = qrs.step;
	const userInteraction = useRef(false);
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea()
	const [showPasswordStep1, setShowPasswordStep1] = useState(false);
	const [passwordStep1, setPasswordStep1] = useState("");
	const [passwordData, setPasswordData] = useState(_initialStateValue);
	const [errorMessage, setErrorMessage] = useState(clone(_initialStateValue));
	const [isPasswordValid, setIsPasswordValid] = useState({
		isSmalCharProvided: false,
		isCapitalCharProvided: false,
		isNumberProvided: false,
		isMinimumEightChar: false
	});
	const [showPassword, setShowPassword] = useState({
		password: false, password_confirmation: false,
	});

	const handleClickShowPasswordStep1 = () => {
		setShowPasswordStep1(!showPasswordStep1)
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (!qrsStep) {
			props.history.push('/change-profile?type=settings');
		}
	}, []);

	const handleClickShowPassword = (fieldId) => {
		let dataShow = {};
		dataShow[fieldId] = !showPassword[fieldId];
		setShowPassword({ ...showPassword, ...dataShow })
	};


	const onChangeCheckPassword = (value) => {
		setPasswordStep1(value);
	}

	const backStep = (path) => {
		props.history.push(path)
	}

	const handleKeyEnter = (e) => {
		console.log(e)
	}

	const checkPassword = () => {
		if (passwordStep1 === "") return;
		const password = {
			password: passwordStep1
		}
		_AuthService.checkPassword(password, {
			Success: (res: any) => {
				props.history.push('/change-password?step=step2');
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	const validationChangeInput = () => {
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
		const regexSmallChar = ".*[a-z]+.*";
		const regexCapitalChar = ".*[A-Z]+.*";
		const regexNumberInside = ".*[0-9]+.*";
		const regexPass = "^[a-zA-Z0-9\s,-]{8,}"
		let messageError = {};
		let isPasswordValid = {
			isSmalCharProvided: true,
			isCapitalCharProvided: true,
			isNumberProvided: true,
			isMinimumEightChar: true
		}

		if (passwordData && passwordData.password !== '') {
			if (!passwordData.password.match(regexSmallChar)) {
				// messageError["password"] = "Harus ada huruf kecil";
				isPasswordValid["isSmalCharProvided"] = false;
			}
			if (!passwordData.password.match(regexCapitalChar)) {
				// messageError["password"] = "Harus ada huruf besar";
				isPasswordValid["isCapitalCharProvided"] = false;
			}
			if (!passwordData.password.match(regexNumberInside)) {
				// messageError["password"] = "Harus ada angka";
				isPasswordValid["isNumberProvided"] = false;
			}
			if (!passwordData.password.match(regexPass)) {
				// messageError["password"] = "Minimal 8 Karakter";
				isPasswordValid["isMinimumEightChar"] = false;
			}
		}

		if (passwordData && passwordData.password_confirmation !== "") {
			if (passwordData.password !== "" && passwordData.password_confirmation !== passwordData.password) {
				messageError["password_confirmation"] = "Password tidak sama";
			} else {
				messageError["password_confirmation"] = "";
			}
		}

		setErrorMessage({ ...errorMessage, ...messageError });
		setIsPasswordValid({ ...isPasswordValid, ...isPasswordValid })
	}

	const onChange = useCallback((fieldId: string, value: any, error?: any) => {
		if (
			fieldId === "password" ||
			fieldId === "password_confirmation"
		) {
			userInteraction.current = true;
		}
		let obj: any = {};
		obj[fieldId] = value;
		setPasswordData({ ...passwordData, ...obj })
	}, [passwordData]);

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [passwordData]);

	const changePassword = () => {
		const { password, password_confirmation } = passwordData;
		_AuthService.changePassword({
			password,
			password_confirmation,
		}, {
			Success: (res: any) => {
				setTimeout(() => {
					AltAlert.show({
						title: "Success",
						subtitle: "Berhasil mengubah Password",
						type: 'success',
					});
				}, 550);
				props.history.push('/change-profile?type=settings');
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	return (
		<ScreenChangePassword
			qrsStep={qrsStep}
			handleKeyEnter={handleKeyEnter}
			backStep={backStep}
			passwordStep1={passwordStep1}
			checkPassword={checkPassword}
			showPassword={showPassword}
			showPasswordStep1={showPasswordStep1}
			handleMouseDownPassword={handleMouseDownPassword}
			handleClickShowPasswordStep1={handleClickShowPasswordStep1}
			onChangeCheckPassword={onChangeCheckPassword}
			handleClickShowPassword={handleClickShowPassword}
			isPasswordValid={isPasswordValid}
			passwordData={passwordData}
			onChange={onChange}
			changePassword={changePassword}
			errorMessage={errorMessage}
			{...props}
		/>
	)
}
export const ChangePasswordPage = memo((_ChangePasswordPage))
