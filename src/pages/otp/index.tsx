import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ScreenOTPPage } from './screen';
import { IProfileUserService, ProfileUserService, AuthServiceAltea, IAuthServiceAltea } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';

function _OTPPage(props) {
	const [{ application: { newEmail, newPhone } }, dispatch] = useGlobalState();
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const [profileUser, setProfileUser] = useState<any>({});
	const qrs = QrsToObj(window.location.search);
	const dataType = qrs.type;
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea();
	const [otp, setOtp] = useState<string>("");
	const codeInputHandle: { current: { clear: () => void; setError: () => void } } = useRef();
	const OTP_LENGTH = 6;
	const [errorMessage, setErrorMessage] = useState("");
	const [activeCountdown, setActiveCountdown] = useState(true);
	const seconds = 120;
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

	const getProfile = () => {
		_ProfileService.getProfile({
			Success: (res: any) => {
				setProfileUser(res.data);
				dispatch({
					type: USER_ACTIONS.CHANGE_USER,
					data: { user: res.data.data },
				});
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
		});
	}

	console.log(newEmail)

	const onChangeCode = (code) => {
		setOtp(code);
	}

	useEffect(() => {
		if (!dataType) {
			props.history.push(`/verify?type=${dataType}`);
		} else {
			getProfile();
		}
	}, []);

	const changeEmail = (code: string, onSuccess: () => void, onError: () => void) => {
		_AuthService.changeEmail({
			email: newEmail,
			otp: code
		}, {
			Success: (data: any) => {
				onSuccess && onSuccess();
				setErrorMessage("")
				setActiveCountdown(false);
				AltAlert.show({
					title: "Success",
					subtitle: "Email berhasil diubah",
					type: 'success',
				});
				setTimeout(() => {
					props.history.push("/change-profile?type=changeProfile")
				}, 250);

			},
			ValidationError: (data: any) => {
				onError && onError();
				setErrorMessage(data?.message)
				setActiveCountdown(false)
			},
			ServerError: (data: any) => {
				onError && onError();
				setErrorMessage(data?.message)
				setActiveCountdown(false)
			}
		});
	}

	const changePhone = (code: string, onSuccess: () => void, onError: () => void) => {
		_AuthService.changePhone({
			phone: newPhone,
			otp: code
		}, {
			Success: (data: any) => {
				onSuccess && onSuccess();
				setErrorMessage("")
				setActiveCountdown(false);
				AltAlert.show({
					title: "Success",
					subtitle: "Nomor telepon berhasil diubah",
					type: 'success',
				});
				setTimeout(() => {
					props.history.push("/change-profile?type=changeProfile")
				}, 250);
			},
			ValidationError: (data: any) => {
				onError && onError();
				setErrorMessage(data?.message)
				setActiveCountdown(false)
			},
			ServerError: (data: any) => {
				onError && onError();
				setErrorMessage(data?.message)
				setActiveCountdown(false)
			}
		});
	}

	const onInputCodeCompleted = (code: string, onSuccess: () => void, onError: () => void) => {
		switch (dataType) {
			case "email":
				return changeEmail(code, onSuccess, onError);
			case "phone":
				return changePhone(code, onSuccess, onError);
		}

	}

	const backStep = () => {
		props.history.push(`/verify?type=${dataType}`);
	}

	return (
		<ScreenOTPPage
			dataType={dataType}
			profileUser={profileUser}
			errorMessage={errorMessage}
			backStep={backStep}
			seconds={seconds}
			activeCountdown={activeCountdown}
			onProcess={onProcess}
			onContinue={onContinue}
			onChangeCode={onChangeCode}
			codeInputHandle={codeInputHandle}
			{...props}
		/>
	)
}
export const OTPPage = memo((_OTPPage))

