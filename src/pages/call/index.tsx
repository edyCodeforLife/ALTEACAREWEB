import { memo, useState, useEffect, useRef } from "react";
import { ScreenCall } from './screen';
import { AltAlert } from '../../components/alert/index';
import {
	IAppointmentService,
	AppointmentService
} from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import useHubConnection from '../../data/hooks/use-socket-connection';
import { parse } from "date-fns/esm";

function _CallPage(props) {
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const _connectionSocket = useRef(false);
	const [buildConnection] = useHubConnection();
	const qrs = QrsToObj(window.location.search);
	const appointment_id = parseInt(qrs.appointment_id);
	const [activeStepCall, setActiveStepCall] = useState(qrs.activeStep ? parseInt(qrs.activeStep) : 1);
	const [RTConnection, setRTConnection] = useState(null);
	const [appointmentDetail, setAppointmentDetail] = useState({});
	const [timerLastTime, setTimerLastTime] = useState<string>("");
	const [openModalMedicine, setOpenModalMedicine] = useState<boolean>(false);
	const method = qrs.callWith === "MA" ? "CALL_MA" : "CONSULTATION_CALL";
	const channel = qrs.callWith === "MA" ? "CALL_MA_ANSWERED" : "CONSULTATION_STARTED";
	const [appointmentDescription, setAppointmentDescription] = useState(null);

	const getAppointmentDetailDescription = () => {
		_AppointmentService.appointmentDescription(appointment_id, {
			Success: (data: any) => {
				setAppointmentDescription(data.data);
			}
		})
	}

	const getDetail = () => {
		_AppointmentService.appointmentDetail(appointment_id, {
			Success: (res: any) => {
				setAppointmentDetail(res.data);
				_connectionSocket.current = true;
				setRTConnection(buildConnection({
					method: method,
					appointmentId: appointment_id
				}, true))
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

	const connectChannel = () => {
		if (RTConnection) {
			RTConnection.on(channel, (data) => {
				if (data) {
					setActiveStepCall(2);
					RTConnection.disconnect();
					setRTConnection(null);
				}
			});

			RTConnection.on("connect_error", (err) => {
				console.log(err.message)
			});

			RTConnection.on("socket_error", (err) => {
				console.log(err.message)
			});
		}
	}

	useEffect(() => {
		getDetail();
		getAppointmentDetailDescription();
	}, []);

	useEffect(() => {
		if (RTConnection) {
			return () => {
				RTConnection.disconnect();
				setRTConnection(null);
			}
		}
	}, [RTConnection])

	// console.log(RTConnection)

	useEffect(() => {
		_connectionSocket.current && connectChannel();
	}, [RTConnection]);

	const handleOutRoom = (activeStep) => {
		setActiveStepCall(activeStep)
	}

	const setLastTime = (lastTime) => {
		setTimerLastTime(lastTime);
	}

	const redirectToMyConsultation = () => {
		props.history.push("/my-consultation");
	}

	const redirectToDetailConsultation = (id) => {
		props.history.push(`/consultation-detail?activeStep=0&appointment_id=${id}&value=1`)
	}

	const handleModalMedicine = (isOpen: boolean) => {
		setOpenModalMedicine(isOpen);
	}

	const redirectToPaymentPage = (id) => {
		props.history.push(`/payment?appointment_id=${id}`);
	}

	return (
		<ScreenCall
			activeStepCall={activeStepCall}
			appointmentDetail={appointmentDetail}
			handleOutRoom={handleOutRoom}
			setLastTime={setLastTime}
			timerLastTime={timerLastTime}
			method={method}
			redirectToMyConsultation={redirectToMyConsultation}
			appointmentDescription={appointmentDescription}
			redirectToDetailConsultation={redirectToDetailConsultation}
			openModalMedicine={openModalMedicine}
			handleModalMedicine={handleModalMedicine}
			redirectToPaymentPage={redirectToPaymentPage}
			{...props}
		/>
	)
}
export const CallPage = memo((_CallPage));
