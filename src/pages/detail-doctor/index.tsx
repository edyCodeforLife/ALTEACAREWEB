import { memo, useRef, useState, useCallback, useEffect } from "react";
import { ScreenDetailPage } from './screen';
import { isEmpty, merge } from 'lodash';
import { QrsToObj } from '../../data/global/function';
import { IAlteaCMSService, AlteaCMSService } from '../../data/business/index';
import { format } from 'date-fns';
import SimpleCryptoJS from 'simple-crypto-js';
import * as LS from 'local-storage';
import { AltAlert } from '../../components/alert/index';
import { IDataSchedule } from '../../data/services/alteaCMS/IAlteaCMS';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';
import { SECRET_KEY3, activeLSUserSchedule } from '../../data/global/variables';

export const initialSchedule: IDataSchedule = {
	code: "",
	date: "",
	start_time: "",
	end_time: ""
}

function _DetailPage(props) {

	const userInteraction = useRef(false);
	const activeCalendarUser = useRef(false);
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [_, dispatch] = useGlobalState();
	let qrsDoctor = QrsToObj(window.location.search);
	const [doctorDetail, setDoctorDetail] = useState({});
	const [open, setOpen] = useState({
		modalDatePicker: false,
		modalScheduleTime: false
	});
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [doctorSchedule, setDoctorSchedule] = useState([]);
	const [activeCalendarDate, setActiveCalendarDate] = useState(false);
	const [selectedScheduleUser, setSelectedScheduleUser] = useState<IDataSchedule>(initialSchedule);
	const checkQrs = isEmpty(qrsDoctor);
	const [loading, setLoading] = useState(true);
	const [dataTermsRefundCancel, setDataTermsRefundCancel] = useState('');

	const getDoctorDetail = () => {
		setLoading(true);
		if (!checkQrs) {
			_CMSService.GetDoctorDetail(qrsDoctor.doctor_id, {
				Success: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 200);
					setDoctorDetail(data.data);
				}
			})
		} else {
			props.history.push("/mobile-list");
		}
	}

	const getBlocks = () => {
		const queryTC = "?type=TERM_REFUND_CANCEL";
		_CMSService.GetBlocks(queryTC, {
			Success: (res: any) => {
				setDataTermsRefundCancel(res.data);
			}
		})
	}

	const onClickDaySchedule = (date) => {
		userInteraction.current = true;
		setSelectedDate(date);
	}

	const getSchedule = () => {
		setLoading(true);
		if (!checkQrs) {
			const formattedDate = format(selectedDate, 'yyyy-MM-dd');
			_CMSService.GetDoctorSchedule(qrsDoctor.doctor_id, formattedDate, {
				Success: (res: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 200);
					setDoctorSchedule(res.data);
				},
				NotFound: (res: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 200);
					// AltAlert.show({
					// 	title: "Error",
					// 	subtitle: res.message,
					// 	type: 'warning',
					// });
					setDoctorSchedule([]);
				},
				ValidationError: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 200);
					AltAlert.show({
						title: "Error",
						subtitle: data.message,
						type: 'warning',
					});

				},
				ServerError: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 250);
					AltAlert.show({
						title: "Error",
						subtitle: data.message,
						type: 'warning',
					});
				}
			})
		}
	}

	const onChange = useCallback((fieldId: string, value: any, error?: any) => {
		if (fieldId === 'doctor_schedule') {
			userInteraction.current = false;
			let date = new Date(value);
			setSelectedDate(date);
		}
	}, [selectedDate]);

	const handleActiveCalendar = (isActive: boolean) => {
		activeCalendarUser.current = true;
		setActiveCalendarDate(isActive)
	}

	const handleModal = (fieldId: string, isOpen: boolean) => {
		let dataShow = {};
		dataShow[fieldId] = isOpen;
		setOpen({ ...open, ...dataShow })
	}

	const backToInitialSchedule = () => {
		if (!activeCalendarDate) setSelectedDate(new Date());
	}

	const handleScheduleTime = (fieldId: string, isOpen: boolean, selectedDate: Date) => {
		userInteraction.current = true;
		let date = new Date(selectedDate);
		setSelectedDate(date);
		handleModal(fieldId, isOpen);
	}

	const onClickSetSchedule = (item: IDataSchedule) => {
		setSelectedScheduleUser(selectedScheduleUser === item ? initialSchedule : item);
	}

	const redirectTo = () => {
		let newObj = {};
		if (!isEmpty(doctorDetail)) {
			newObj = merge(doctorDetail, selectedScheduleUser);
		}
		const simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY3);
		const encryptedText = simpleCrypto.encryptObject(newObj);
		LS.set(activeLSUserSchedule, encryptedText);
		dispatch({
			type: USER_ACTIONS.CHANGE_SCHEDULE,
			data: { schedule: newObj },
		});
		setTimeout(() => {
			props.history.push("/create-consultation");
		}, 250);
	}

	useEffect(() => {
		activeCalendarUser.current && backToInitialSchedule();
	}, [activeCalendarDate])

	useEffect(() => {
		userInteraction.current && getSchedule();
	}, [selectedDate])

	useEffect(() => {
		getDoctorDetail();
		getSchedule();
		getBlocks();
	}, []);


	return (
		<ScreenDetailPage
			doctorDetail={doctorDetail}
			onClickDaySchedule={onClickDaySchedule}
			selectedDate={selectedDate}
			doctorSchedule={doctorSchedule}
			loading={loading}
			handleModal={handleModal}
			open={open}
			onChange={onChange}
			handleActiveCalendar={handleActiveCalendar}
			activeCalendarDate={activeCalendarDate}
			getSchedule={getSchedule}
			handleScheduleTime={handleScheduleTime}
			onClickSetSchedule={onClickSetSchedule}
			redirectTo={redirectTo}
			selectedScheduleUser={selectedScheduleUser}
			dataTermsRefundCancel={dataTermsRefundCancel}
			{...props}
		/>
	)
}
export const DetailPage = memo((_DetailPage));
