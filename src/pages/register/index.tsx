import { memo, useRef, useState, useCallback, useEffect } from "react";
import { ScreenRegisterPage } from './screen';
import { validateEmail } from '../../data/global/function';
import {
	IAuthServiceAltea,
	AuthServiceAltea,
	AlteaCMSService,
	IAlteaCMSService
} from '../../data/business/index';
import SimpleCryptoJS from 'simple-crypto-js';
import * as LS from 'local-storage';
import { useIsMounted } from '../../data/hooks/use-is-mounted';
import { AltAlert } from '../../components/alert/index';
import { SECRET_KEY3, temporaryUserData } from '../../data/global/variables';
import { QrsToObj } from '../../data/global/function';

export interface IValueInput {
	first_name: string;
	last_name: string;
	birth_date: string;
	birth_place: string;
	birth_country: string;
	gender: string;
	password: string;
	password_confirmation: string;
	email: string;
	phone: string;
}

export interface IErrorMessage extends IValueInput {
	otp: string
}

export type paramOTP = "email" | "phone";

export interface IGender {
	genderLabel: string;
	value: string
}

function _RegisterPage(props) {
	const _initialStateValue: IValueInput = {
		first_name: "",
		last_name: "",
		birth_date: "",
		birth_place: "",
		birth_country: process.env.ENDPOINT === 'production' ? "60ca0a3da3325900127b785f" : "608fb09e3fd6d20012431700",
		gender: "",
		password: "",
		password_confirmation: "",
		email: "",
		phone: ""
	}

	const _messageError: IErrorMessage = {
		first_name: "",
		last_name: "",
		birth_date: "",
		birth_place: "",
		birth_country: "",
		gender: "",
		password: "",
		password_confirmation: "",
		email: "",
		phone: "",
		otp: ""
	}

	const userInteraction = useRef(false);
	const userNotVerified = useRef(false);
	const isMounted = useIsMounted();
	const qrs = QrsToObj(window.location.search);
	const isVerified = qrs.verified;
	const _service: IAuthServiceAltea = new AuthServiceAltea();
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [dataCountry, setDataCountry] = useState([]);
	const [birthCountryName, setBirthCountryName] = useState("Indonesia");
	const [genderLabel, setGenderLabel] = useState("Pilih Jenis Kelamin")
	const [data, setData] = useState(_initialStateValue);
	const [errorMessage, setErrorMessage] = useState(_messageError);
	const [step, setStep] = useState<number>(isVerified === "no" ? 5 : 1);
	const [loading, setLoading] = useState(true);
	const [activeCountdown, setActiveCountdown] = useState(true);
	const [seconds, setSeconds] = useState(120);
	const [termsAndConditionData, setTermsAndConditionData] = useState(null);
	const [accessToken, setAccessToken] = useState<string>("");
	const [activeFlag, setActiveFlag] = useState("phone");
	const [isPasswordValid, setIsPasswordValid] = useState({
		isSmalCharProvided: false,
		isCapitalCharProvided: false,
		isNumberProvided: false,
		isMinimumEightChar: false
	});
	const [showPassword, setShowPassword] = useState({
		password: false, password_confirmation: false,
	});
	const dataGender: IGender[] = [{
		genderLabel: 'Pria',
		value: 'MALE'
	}, {
		genderLabel: 'Wanita',
		value: 'FEMALE'
	}];

	const [open, setOpen] = useState(false);
	const [otp, setOtp] = useState<string>("");
	const codeInputHandle: { current: { clear: () => void; setError: () => void } } = useRef();
	const OTP_LENGTH = 6;
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

	const backStep = () => {
		setStep(step <= 1 || isVerified === "no" ? props.history.push("/login") : step === 7 ? 5 : step - 1);
	}

	const onChangeCode = (code) => {
		setOtp(code);
	}

	const handleModal = (isOpen) => {
		setOpen(isOpen);
	}

	const prepareData = async () => {
		const promise1 = new Promise(resolve => {
			_CMSService.GetCountry({
				Success: (data: any) => {
					setLoading(false);
					resolve(data.data);
				}
			});
		});

		const promise2 = new Promise(resolve => {
			const queryTC = "?type=TERMS_CONDITION";
			_CMSService.GetBlocks(queryTC, {
				Success: (res: any) => {
					resolve(res.data);
				}
			})
		});

		const results = await Promise.all([promise1, promise2]);
		let getCountry: any = results[0];
		let getTermsAndCondition: any = results[1];
		setDataCountry(getCountry);
		setTermsAndConditionData(getTermsAndCondition);
	}

	const onUpdateEmail = () => {
		const { email } = data;
		let messageError = {};
		const dataEmail = {
			email: data.email,
		}
		_service.checkUser(dataEmail, {
			Success: (res: any) => {
				if (res?.data?.is_email_available) {
					_service.registrationChangeEmail({ email }, accessToken, {
						Success: (data: any) => {
							sendOTP("email");
							setTimeout(() => {
								switchStep(5);
							}, 800);
						},
						ValidationError: (data: any) => {
							messageError["email"] = data.message;
							setErrorMessage({ ...errorMessage, ...messageError })
						},
						ServerError: (data: any) => {
							messageError["email"] = data.message;
							setErrorMessage({ ...errorMessage, ...messageError })
						}
					})
				} else {
					if (!res?.data?.email.is_available) {
						AltAlert.show({
							title: "Info",
							subtitle: res?.data?.email.error,
							type: 'info',
						});
					}
				}
			}
		})
	}

	const onUpdatePhone = () => {
		const { phone } = data;
		let messageError = {};
		const dataPhone = {
			phone: data.phone
		}
		_service.checkUser(dataPhone, {
			Success: (res: any) => {
				if (res?.data?.is_phone_available) {
					_service.registrationChangePhone({ phone }, accessToken, {
						Success: (data: any) => {
							sendOTP("phone");
							setTimeout(() => {
								switchStep(5);
							}, 800);
						},
						ValidationError: (data: any) => {
							messageError["phone"] = data.message;
							setErrorMessage({ ...errorMessage, ...messageError })
						},
						ServerError: (data: any) => {
							messageError["phone"] = data.message;
							setErrorMessage({ ...errorMessage, ...messageError })
						}
					})
				} else {
					if (!res?.data?.phone.is_available) {
						AltAlert.show({
							title: "Info",
							subtitle: res?.data?.phone.error,
							type: 'info',
						});
					}


				}
			}
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

		if (data && data.phone !== "") {
			if (!data.phone.match(regexMinimum)) {
				messageError["phone"] = "Minimum 9 angka";
			} else {
				messageError["phone"] = "";
			}
		}

		if (data && data.email !== "") {
			if (!validateEmail(data.email)) {
				messageError["email"] = "Masukkan Email yang valid";
			} else {
				messageError["email"] = "";
			}
		}

		if (data && data.password !== '') {
			if (!data.password.match(regexSmallChar)) {
				// messageError["password"] = "Harus ada huruf kecil";
				isPasswordValid["isSmalCharProvided"] = false;
			}
			if (!data.password.match(regexCapitalChar)) {
				// messageError["password"] = "Harus ada huruf besar";
				isPasswordValid["isCapitalCharProvided"] = false;
			}
			if (!data.password.match(regexNumberInside)) {
				// messageError["password"] = "Harus ada angka";
				isPasswordValid["isNumberProvided"] = false;
			}
			if (!data.password.match(regexPass)) {
				// messageError["password"] = "Minimal 8 Karakter";
				isPasswordValid["isMinimumEightChar"] = false;
			}
		}

		if (data && data.password_confirmation !== "") {
			if (data.password !== "" && data.password_confirmation !== data.password) {
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
			fieldId === "phone" ||
			fieldId === "email" ||
			fieldId === "password" ||
			fieldId === "password_confirmation"
		) {
			userInteraction.current = true;
		}
		let obj: any = {};
		obj[fieldId] = value;
		setData({ ...data, ...obj })
	}, [data]);

	useEffect(() => {
		prepareData();
	}, []);

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [data]);

	const handleClickCountry = (selected: any) => {
		onChange("birth_country", selected.country_id);
		setBirthCountryName(selected.name);
	}

	const handleClickGender = (selected: any) => {
		onChange("gender", selected.value);
		setGenderLabel(selected.genderLabel)
	}

	const switchStep = (step) => {
		setStep(step);
	}

	const onClickShoworValidate = (e) => {
		e.preventDefault();
		let messageError = {};
		let isShowModal = true;
		if (data.first_name === "") {
			messageError["first_name"] = "Nama depan belum terisi";
			isShowModal = false;
		} else {
			messageError["first_name"] = "";
		}
		if (data.last_name === "") {
			messageError["last_name"] = "Nama belakang belum terisi";
			isShowModal = false;
		} else {
			messageError["last_name"] = "";
		}
		if (data.birth_date === "") {
			messageError["birth_date"] = "Tanggal lahir belum dipilih";
			isShowModal = false;
		} else {
			messageError["birth_date"] = "";
		}
		// if (data.birth_country === "") {
		// 	messageError["birth_country"] = "Negara Kelahiran belum terpilih";
		// 	isShowModal = false;
		// }
		if (data.birth_place === "") {
			messageError["birth_place"] = "Kota kelahiran belum terisi";
			isShowModal = false;
		} else {
			messageError["birth_place"] = "";
		}
		if (data.gender === "") {
			messageError["gender"] = "Jenis kelamin belum terpilih";
			isShowModal = false;
		} else {
			messageError["gender"] = "";
		}
		setErrorMessage({ ...errorMessage, ...messageError });
		handleModal(isShowModal);
	}

	const handleClickShowPassword = (fieldId) => {
		let dataShow = {};
		dataShow[fieldId] = !showPassword[fieldId];
		setShowPassword({ ...showPassword, ...dataShow })
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const sendOTP = (param: paramOTP) => {
		let messageError = {};
		setActiveCountdown(false);
		const email = data?.email;
		const phone = data?.phone;
		// const { email, phone } = data;
		if (param === "email" && data?.email !== "") {
			_service.sendOTPEmailRegister({ email }, {
				Success: (response) => {
					setActiveCountdown(true);
					setSeconds(120);
				},
				ValidationError: (data: any) => {
					messageError["otp"] = data.message;
					setErrorMessage({ ...errorMessage, ...messageError });
					AltAlert.show({
						title: "Info",
						subtitle: data?.message,
						type: 'info',
					});
				}
			});
		} else {
			if (param === "phone" && phone !== "") {
				_service.sendOTPPhoneRegister({ phone }, {
					Success: (response) => {
						setActiveCountdown(true);
						setSeconds(120);
					},
					ValidationError: (data: any) => {
						messageError["otp"] = data.message;
						setErrorMessage({ ...errorMessage, ...messageError });
						AltAlert.show({
							title: "Info",
							subtitle: data?.message,
							type: 'info',
						});
					}
				});
			}
		}
	}

	const resendOTP = (param: paramOTP) => {
		sendOTP(param);
		codeInputHandle.current.clear();
		setErrorMessage({ ...errorMessage, ...{ otp: "" } });
	}

	const registerUser = () => {
		_service.register(data, {
			Success: (res: any) => {
				const simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY3);
				const encryptedText = simpleCrypto.encryptObject(data);
				LS.set(temporaryUserData, encryptedText);
				switchStep(5);
				setAccessToken(res.data.access_token);
				sendOTP("phone");
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
			},
			NotFound: (data: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: data?.message,
					type: 'info',
				});
			}
		})
	}

	const onInputCodeCompleted = (code: string, onSuccess: () => void, onError: () => void) => {
		let messageError = {};
		if (activeFlag === "email") {
			_service.verifyOTPEmailRegister({
				email: data.email,
				otp: code
			}, {
				Success: (data: any) => {
					onSuccess && onSuccess();
					messageError["otp"] = "";
					setActiveCountdown(false);
					AltAlert.show({
						title: "Sukses",
						subtitle: "Verifikasi OTP Berhasil",
						type: 'success',
					});
					setTimeout(() => {
						setStep(8);
					}, 1500);
				},
				ValidationError: (data: any) => {
					onError && onError();
					messageError["otp"] = data.message;
					setErrorMessage({ ...errorMessage, ...messageError });
					AltAlert.show({
						title: "Info",
						subtitle: data?.message,
						type: 'info',
					});
					setActiveCountdown(false)
				},
				ServerError: (data: any) => {
					onError && onError();
					messageError["otp"] = data.message;
					setErrorMessage({ ...errorMessage, ...messageError });
					AltAlert.show({
						title: "Info",
						subtitle: data?.message,
						type: 'info',
					});
					setActiveCountdown(false)
				}
			});
		} else {
			_service.verifyOTPPhoneRegister({
				phone: data.phone,
				otp: code
			}, {
				Success: (res: any) => {
					onSuccess && onSuccess();
					messageError["otp"] = "";
					setActiveCountdown(false);
					AltAlert.show({
						title: "Sukses",
						subtitle: "Verifikasi OTP Berhasil",
						type: 'success',
					});
					setTimeout(() => {
						setStep(8);
					}, 1500);
				},
				ValidationError: (data: any) => {
					onError && onError();
					messageError["otp"] = data.message;
					setErrorMessage({ ...errorMessage, ...messageError });
					AltAlert.show({
						title: "Info",
						subtitle: data?.message,
						type: 'info',
					});
					setActiveCountdown(false)
				},
				ServerError: (data: any) => {
					onError && onError();
					messageError["otp"] = data.message;
					setErrorMessage({ ...errorMessage, ...messageError });
					AltAlert.show({
						title: "Info",
						subtitle: data?.message,
						type: 'info',
					});
					setActiveCountdown(false)
				}
			})
		}

	}

	const validateContactData = () => {
		const dataContact = {
			email: data.email,
			phone: data.phone
		}
		_service.checkUser(dataContact, {
			Success: (res: any) => {
				if (res?.data?.is_email_available && res?.data?.is_phone_available) {
					switchStep(2);
				} else {
					if (!res?.data?.email.is_available) {
						AltAlert.show({
							title: "Info",
							subtitle: res?.data?.email.error,
							type: 'info',
						});
					}

					if (!res?.data?.phone.is_available) {
						AltAlert.show({
							title: "Info",
							subtitle: res?.data?.phone.error,
							type: 'info',
						});
					}
				}
			}
		})
	}

	const changeFlag = () => {
		setActiveFlag(activeFlag === "email" ? "phone" : "email");
	}

	useEffect(() => {
		if (isVerified === "no") {
			userNotVerified.current = true;
			let decryptedText;
			let activeShedule: any = LS.get(temporaryUserData);
			let simpleCrypto = new SimpleCryptoJS(SECRET_KEY3);
			if (activeShedule) {
				decryptedText = simpleCrypto.decryptObject(activeShedule);
			}
			setData(decryptedText);
		}
	}, []);

	useEffect(() => {
		if (isVerified && data?.phone !== "" && data?.email !== "") {
			userNotVerified.current && sendOTP("phone");
		}
	}, [isVerified, data?.phone, data?.email])

	useEffect(() => {
		if (step === 5) {
			if (activeFlag === 'email') {
				sendOTP("email")
			} else {
				sendOTP("phone")
			}
		}
	}, [activeFlag])

	return (
		<ScreenRegisterPage
			onChange={onChange}
			registerUser={registerUser}
			dataCountry={dataCountry}
			handleClickCountry={handleClickCountry}
			birthCountryName={birthCountryName}
			dataGender={dataGender}
			genderLabel={genderLabel}
			handleClickGender={handleClickGender}
			data={data}
			seconds={seconds}
			loading={loading}
			onClickShoworValidate={onClickShoworValidate}
			errorMessage={errorMessage}
			open={open}
			handleModal={handleModal}
			switchStep={switchStep}
			step={step}
			showPassword={showPassword}
			handleClickShowPassword={handleClickShowPassword}
			handleMouseDownPassword={handleMouseDownPassword}
			isPasswordValid={isPasswordValid}
			onInputCodeCompleted={onInputCodeCompleted}
			resendOTP={resendOTP}
			onProcess={onProcess}
			onContinue={onContinue}
			onChangeCode={onChangeCode}
			codeInputHandle={codeInputHandle}
			activeCountdown={activeCountdown}
			onUpdateEmail={onUpdateEmail}
			backStep={backStep}
			termsAndConditionData={termsAndConditionData}
			validateContactData={validateContactData}
			activeFlag={activeFlag}
			onUpdatePhone={onUpdatePhone}
			changeFlag={changeFlag}
			{...props}
		/>
	)
}
export const RegisterPage = memo((_RegisterPage));
