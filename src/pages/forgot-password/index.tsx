import { memo, useRef, useState, useEffect, useCallback } from "react";
import { ScreenForgotPassword } from './screen';
import { validateEmail } from '../../data/global/function';
import { IAuthServiceAltea, AuthServiceAltea } from '../../data/business/index';
import { AltAlert } from '../../components/alert/index';

export interface IStateForgotPassword {
	username: string;
	otp: string;
	newPassword: string;
	newPassword_confirmation: string;
}

function _ForgotPassword(props) {

	const _initialStateValue: IStateForgotPassword = {
		username: "",
		otp: "",
		newPassword: "",
		newPassword_confirmation: ""
	}

	const _messageError: IStateForgotPassword = {
		username: "",
		otp: "",
		newPassword: "",
		newPassword_confirmation: ""
	}

	const userInteraction = useRef(false);
	const [activeCountdown, setActiveCountdown] = useState(true);
	const _service: IAuthServiceAltea = new AuthServiceAltea();
	const [step, setStep] = useState<number>(1);
	const [errorMessage, setErrorMessage] = useState(_messageError);
	const [data, setData] = useState(_initialStateValue);
	const [otp, setOtp] = useState<string>("");
	const [seconds, setSeconds] = useState(120);
	const codeInputHandle: { current: { clear: () => void; setError: () => void } } = useRef();
	const OTP_LENGTH = 6;
	const [accessToken, setAccessToken] = useState<string>("");
	const [reqForgotPassword, setReqForgotPassword] = useState(null);
	const [showPassword, setShowPassword] = useState({
		newPassword: false, newPassword_confirmation: "",
	});
	const [isPasswordValid, setIsPasswordValid] = useState({
		isSmalCharProvided: false,
		isCapitalCharProvided: false,
		isNumberProvided: false,
		isMinimumEightChar: false
	});
	const [onProcess, setOnProcess] = useState<boolean>(false);
	const onContinue =
		(code: string = otp) => {
			!onProcess &&
				code &&
				code.length === OTP_LENGTH &&
				(() => {
					setOnProcess(true);
					onInputCodeCompleted(
						code,
						() => {
							setOnProcess(false);
						},
						() => {
							setOnProcess(false);
							codeInputHandle.current.setError();
						}
					);
				})();
		}
	const switchStep = (step) => {
		setStep(step);
	}

	const onChange = (fieldId: string, value: any, error?: any) => {
		userInteraction.current = true;
		let obj: any = {};
		obj[fieldId] = value;
		setData({ ...data, ...obj })
	}

	const handleClickShowPassword = (fieldId) => {
		let dataShow = {};
		dataShow[fieldId] = !showPassword[fieldId];
		setShowPassword({ ...showPassword, ...dataShow })
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const requestForgotPassword = () => {
		let messageError = {};
		setActiveCountdown(false);
		const { username } = data;
		_service.requestForgotPassword({ username }, {
			Success: (data: any) => {
				setOnProcess(false);
				setActiveCountdown(true);
				setReqForgotPassword(data?.data)
				setSeconds(120);
				setStep(2);
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
				messageError["username"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
				messageError["username"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })
			}
		})
	}

	const backStep = () => {
		setStep(step <= 1 ? props.history.push('/login') : step - 1);
	}

	const validationChangeInput = () => {
		const regexSmallChar = ".*[a-z]+.*";
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
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

		if (data && data.username !== "") {
			if (!validateEmail(data.username) && !data.username.match(regexMinimum)) {
				messageError["username"] = "Email atau nomor ponsel tidak valid";
			} else {
				messageError["username"] = "";
			}
		} else {
			messageError["username"] = "";
		}

		if (data && data.newPassword !== '') {
			if (!data.newPassword.match(regexSmallChar)) {
				// messageError["password"] = "Harus ada huruf kecil";
				isPasswordValid["isSmalCharProvided"] = false;
			}
			if (!data.newPassword.match(regexCapitalChar)) {
				// messageError["password"] = "Harus ada huruf besar";
				isPasswordValid["isCapitalCharProvided"] = false;
			}
			if (!data.newPassword.match(regexNumberInside)) {
				// messageError["password"] = "Harus ada angka";
				isPasswordValid["isNumberProvided"] = false;
			}
			if (!data.newPassword.match(regexPass)) {
				// messageError["password"] = "Minimal 8 Karakter";
				isPasswordValid["isMinimumEightChar"] = false;
			}
		}

		if (data && data.newPassword_confirmation !== "") {
			if (data.newPassword !== "" && data.newPassword_confirmation !== data.newPassword) {
				messageError["newPassword_confirmation"] = "Password tidak sama";
			} else {
				messageError["newPassword_confirmation"] = "";
			}
		}

		setErrorMessage({ ...errorMessage, ...messageError });
		setIsPasswordValid({ ...isPasswordValid, ...isPasswordValid })
	}

	const resendOTP = () => {
		requestForgotPassword();
		codeInputHandle.current.clear();
		setErrorMessage({ ...errorMessage, ...{ otp: "" } });
	}

	const onInputCodeCompleted = (code: string, onSuccess: () => void, onError: () => void) => {
		let messageError = {};
		_service.verifyOTPForgotPassword({
			username: data.username,
			otp: code
		}, {
			Success: (data: any) => {
				onSuccess && onSuccess();
				messageError["otp"] = "";
				setAccessToken(data.data.access_token);
				setActiveCountdown(false);
				AltAlert.show({
					title: "Sukses",
					subtitle: "Verifikasi OTP Berhasil",
					type: 'success',
				});
				setTimeout(() => {
					setStep(3);
				}, 1500);
			},
			ValidationError: (data: any) => {
				onError && onError();
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
				messageError["otp"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })
				setActiveCountdown(false)
			},
			ServerError: (data: any) => {
				onError && onError();
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
				messageError["otp"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })
				setActiveCountdown(false)
			}
		});
	}

	const changePassword = () => {
		const { newPassword, newPassword_confirmation } = data;
		let messageError = {};
		_service.changePassword({
			password: newPassword,
			password_confirmation: newPassword_confirmation
		}, {
			Success: (data: any) => {
				messageError["newPassword"] = "";
				setStep(4);
			},
			ValidationError: (data: any) => {
				messageError["newPassword"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })

			},
			// handle401: (data: any) => {
			// 	messageError["newPassword"] = data.message;
			// 	setErrorMessage({ ...errorMessage, ...messageError })
			// },
			ServerError: (data: any) => {
				messageError["newPassword"] = data.message;
				setErrorMessage({ ...errorMessage, ...messageError })
			}
		}, accessToken)
	}

	const onChangeCode = (code) => {
		setOtp(code);
	}

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [data]);

	return (
		<ScreenForgotPassword
			switchStep={switchStep}
			step={step}
			data={data}
			errorMessage={errorMessage}
			onChange={onChange}
			requestForgotPassword={requestForgotPassword}
			resendOTP={resendOTP}
			onProcess={onProcess}
			onContinue={onContinue}
			onChangeCode={onChangeCode}
			codeInputHandle={codeInputHandle}
			activeCountdown={activeCountdown}
			seconds={seconds}
			backStep={backStep}
			showPassword={showPassword}
			isPasswordValid={isPasswordValid}
			handleClickShowPassword={handleClickShowPassword}
			handleMouseDownPassword={handleMouseDownPassword}
			changePassword={changePassword}
			reqForgotPassword={reqForgotPassword}
			{...props}
		/>
	)
}
export const ForgotPassword = memo((_ForgotPassword));
