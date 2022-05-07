import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ScreenVerifyChangeDataPage } from './screen';
import { IAuthServiceAltea, AuthServiceAltea } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { validateEmail } from '../../data/global/function';
import { clone } from 'lodash';
import { useGlobalState } from '../../data/states';
import { APP_ACTIONS } from '../../data/reducers/app-reducer';

function _VerifyChangeDataPage(props) {
	const _initialStateValue = {
		email: "",
		phone: "",
	}
	const qrs = QrsToObj(window.location.search);
	const dataType = qrs.type;
	const [data, setData] = useState(_initialStateValue);
	const [errorMessage, setErrorMessage] = useState(clone(_initialStateValue));
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea();
	const [currentField, setCurrentField] = useState("");
	const userInteraction = useRef(false);
	const [_, dispatch] = useGlobalState();
	const [isDisabled, setIsDisabled] = useState(true);

	const onChange = useCallback((fieldId: string, value: any, error?: any) => {
		if (
			fieldId === "email" ||
			fieldId === "phone"
		) {
			userInteraction.current = true;
		}
		let obj: any = {};
		obj[fieldId] = value;
		setData({ ...data, ...obj });
		setCurrentField(fieldId)
	}, [data]);

	const validationChangeInput = () => {
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
		let messageError = {};

		if (currentField === "phone") {
			if (data && data.phone !== "") {
				if (!data.phone.match(regexMinimum)) {
					messageError["phone"] = "Minimum 9 angka";
				} else {
					messageError["phone"] = "";
				}
			}
		}

		if (currentField === "email") {
			if (data.email === "") {
				messageError["email"] = "Email belum terisi";
			} else {
				if (data && data.email !== "") {
					if (!validateEmail(data.email)) {
						messageError["email"] = "Masukkan Email yang valid";
					} else {
						messageError["email"] = "";
					}
				}
			}
		}
		setErrorMessage({ ...errorMessage, ...messageError });
	}

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [data]);

	useEffect(() => {
		if (!dataType) {
			props.history.push('/change-profile?type=changeProfile');
		}
	}, []);

	useEffect(() => {
		if (
			data?.email !== "" ||
			data?.phone !== "") {
			setIsDisabled(false);
		}
	}, [data])

	const backStep = (path) => {
		props.history.push(path)
	}

	const handleKeyEnter = (e) => {
		if (!isDisabled) {
			if (e.key === "Enter") {
				if (dataType === "email") {
					onVerifyEmail();
				} else {
					onVerifyPhone();
				}
			}
		}
	}

	const onVerifyPhone = () => {
		const phone = data?.phone;
		if (phone) {
			_AuthService.sendOTPChangePhone({ phone }, {
				Success: (res: any) => {
					dispatch({
						type: APP_ACTIONS.CHANGE_PHONE,
						data: { newPhone: phone }
					});
					AltAlert.show({
						title: "Terkirim",
						subtitle: "Kode OTP telah terkirim ke nomor handphone anda yang baru",
						type: 'success',
					});
					setTimeout(() => {
						props.history.push(`/otp?type=${dataType}`);
					}, 250);
				},
				NotFound: (res: any) => {
					AltAlert.show({
						title: "Info",
						subtitle: res.message,
						type: 'info',
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
	}

	const onVerifyEmail = () => {
		const email = data?.email;
		if (email) {
			_AuthService.sendOTPChangeEmail({ email }, {
				Success: (res: any) => {
					dispatch({
						type: APP_ACTIONS.CHANGE_EMAIL,
						data: { newEmail: email }
					});
					AltAlert.show({
						title: "Terkirim",
						subtitle: "Kode OTP telah terkirim ke email anda yang baru",
						type: 'success',
					});
					setTimeout(() => {
						props.history.push(`/otp?type=${dataType}`);
					}, 250);
				},
				NotFound: (res: any) => {
					AltAlert.show({
						title: "Info",
						subtitle: res.message,
						type: 'info',
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

	}

	return (
		<ScreenVerifyChangeDataPage
			dataType={dataType}
			isDisabled={isDisabled}
			data={data}
			onChange={onChange}
			backStep={backStep}
			errorMessage={errorMessage}
			handleKeyEnter={handleKeyEnter}
			onVerifyEmail={onVerifyEmail}
			onVerifyPhone={onVerifyPhone}
			{...props}
		/>
	)
}
export const VerifyChangeDataPage = memo((_VerifyChangeDataPage))

