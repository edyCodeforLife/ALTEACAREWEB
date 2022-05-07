import { memo, useState, ChangeEvent, useEffect, useCallback } from "react";
import { ScreenCreateConsultation } from './screen';
import { removeToken } from '../../data/hooks/auth-token';
import Cookies from 'js-cookie';
import SimpleCryptoJS from 'simple-crypto-js';
import * as LS from 'local-storage';
import { SECRET_KEY2, SECRET_KEY3, activeLSUserSchedule, activeLSCurrentAppointment, LANDING_URL, LOGIN_URL } from '../../data/global/variables';
import {
	IProfileUserService,
	ProfileUserService,
	IAuthServiceAltea,
	AuthServiceAltea,
	IAppointmentService,
	AppointmentService
} from '../../data/business/index';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';
import { AltAlert } from '../../components/alert/index';

export const listStep = ["Pilih Spesialis", "Buat Konsultasi", "Konfirmasi", "Bayar"]

function _CreateConsultationPage(props) {
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea();
	const _AppointmentService: IAppointmentService = new AppointmentService();
	// const dataSchedule = new SimpleCryptoJS(SECRET_KEY3).decryptObject(LS.get(activeLSUserSchedule));
	const [activeStep, setActiveStep] = useState(1);
	const [scheduleDoctor, setScheduleDoctor] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const [profileUser, setProfileUser] = useState({});
	const [mediaValue, setMediaValue] = useState('VIDEO_CALL');
	const [open, setOpen] = useState(false);
	const [_, dispatch] = useGlobalState();


	const getInitializeData = () => {
		let decryptedText: any = {
			about: "",
			about_preview: "",
			experience: "",
			hospital: [],
			is_popular: false,
			name: "",
			overview: "",
			photo: {},
			price: {},
			sip: "",
			slug: "",
			specialization: "",
			code: "",
			date: "",
			doctor_id: "",
			end_time: "",
			start_time: "",
			consultation_method: ""
		};
		let activeShedule: any = LS.get(activeLSUserSchedule);
		let simpleCrypto = new SimpleCryptoJS(SECRET_KEY3);
		if (activeShedule) {
			decryptedText = simpleCrypto.decryptObject(activeShedule);
			setScheduleDoctor(decryptedText);
		} else {
			props.history.push("/mobile-list");
		}
		_ProfileService.getProfile({
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setProfileUser(res.data);
				dispatch({
					type: USER_ACTIONS.CHANGE_USER,
					data: { user: res.data.data },
				});
			}
		});
	}

	const handleModal = (isOpen) => {
		setOpen(isOpen);
	}

	useEffect(() => {
		getInitializeData();
	}, [activeStep]);

	const backStep = () => {
		if (activeStep === 1) {
			props.history.push(`/detail?doctor_id=${scheduleDoctor?.doctor_id}`);
		} else {
			setActiveStep(1);
		}
	}

	const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
		setMediaValue((event.target as HTMLInputElement).value);
	}

	const doLogout = () => {
		_AuthService.Logout({
			Success: () => {
				removeToken()
				Cookies.set('isAlteaLoggedIn', 'no');
				Cookies.set('isAlteaLoggedIn', 'no', { domain: 'localhost' });
				LS.remove(activeLSUserSchedule)
				setTimeout(() => {
					props.history.push(LOGIN_URL);
					// props.history.push(`/login?doctor_id=${scheduleDoctor?.doctor_id}`);
				});
			}
		})
	}

	const onClickChangeDoctor = () => {
		props.history.push("/mobile-list");
	}

	const onNextToReviewConsultation = () => {
		setActiveStep(2);
	}

	const onFinishReviewConsultation = () => {
		handleModal(true);
	}

	const onHandleAppointment = () => {
		const schedule = {
			code: scheduleDoctor.code,
			date: scheduleDoctor.date,
			time_start: scheduleDoctor.start_time,
			time_end: scheduleDoctor.end_time
		}
		const data = {
			doctor_id: scheduleDoctor.doctor_id,
			symptom_note: "",
			consultation_method: mediaValue,
			next_step: "ASK_MA",
			refference_appointment_id: "",
			schedules: [schedule],
			document_resume: []
		}
		_AppointmentService.createAppointment(data, {
			Success: (res: any) => {
				const simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY2);
				const encryptedText = simpleCrypto.encryptObject(res.data);
				LS.set(activeLSCurrentAppointment, encryptedText);
				dispatch({
					type: USER_ACTIONS.CHANGE_APPOINTMENT,
					data: { schedule: res.data }
				});
				props.history.push(`/call?appointment_id=${res.data?.appointment_id}&callWith=MA`)
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
			}
		})
	}

	return (
		<ScreenCreateConsultation
			listStep={listStep}
			activeStep={activeStep}
			scheduleDoctor={scheduleDoctor}
			backStep={backStep}
			mediaValue={mediaValue}
			onChangeRadio={onChangeRadio}
			loading={loading}
			profileUser={profileUser}
			doLogout={doLogout}
			onClickChangeDoctor={onClickChangeDoctor}
			onNextToReviewConsultation={onNextToReviewConsultation}
			onFinishReviewConsultation={onFinishReviewConsultation}
			handleModal={handleModal}
			open={open}
			onHandleAppointment={onHandleAppointment}
			{...props}
		/>
	)
}
export const CreateConsultationPage = memo((_CreateConsultationPage));
