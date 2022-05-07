import { memo, useState, useEffect } from "react";
import { ScreenPaymentSuccess } from './screen';
import { IAppointmentService, AppointmentService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';

function _PaymentSuccessPage(props) {
	const qrs = QrsToObj(window.location.search);
	const listStep = ["Pilih Spesialis", "Buat Konsultasi", "Konfirmasi", "Bayar", "Telekonsultasi Dibuat"]
	const activeStep = 4;
	const appointment_id = parseInt(qrs.appointment_id);
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [appointmentDescription, setAppointmentDescription] = useState({});

	const getAppointmentDetailDescription = () => {
		_AppointmentService.appointmentDescription(appointment_id, {
			Success: (data: any) => {
				setAppointmentDescription(data.data);
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

	const redirectTo = (path) => {
		props.history.push(path);
	}

	useEffect(() => {
		if (!appointment_id) {
			props.history.push('/my-consultation');
		} else {
			getAppointmentDetailDescription();
		}
	}, []);

	return (
		<ScreenPaymentSuccess
			listStep={listStep}
			activeStep={activeStep}
			redirectTo={redirectTo}
			appointmentDescription={appointmentDescription}
			{...props}
		/>
	)
}
export const PaymentSuccessPage = memo((_PaymentSuccessPage));
