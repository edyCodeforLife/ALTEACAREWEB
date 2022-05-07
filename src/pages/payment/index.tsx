import { memo, useState, useEffect } from "react";
import { ScreenPaymentPage } from './screen';
import { IAppointmentService, AppointmentService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { HOME_URL } from '../../data/global/variables';

function _PaymentPage(props) {
	const qrs = QrsToObj(window.location.search);
	const listStep = ["Pilih Spesialis", "Buat Konsultasi", "Konfirmasi", "Bayar", "Telekonsultasi"]
	const activeStep = 3;
	const appointment_id = parseInt(qrs.appointment_id);
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [appointmentDescription, setAppointmentDescription] = useState({});

	const backStep = () => {
		props.history.push(HOME_URL);
	}

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

	const redirectToPaymentMethod = () => {
		props.history.push(`/payment-method?appointment_id=${appointment_id}`);
	}

	useEffect(() => {
		if (!appointment_id) {
			props.history.push('/my-consultation');
		} else {
			getAppointmentDetailDescription();
		}
	}, []);

	return (
		<ScreenPaymentPage
			listStep={listStep}
			activeStep={activeStep}
			backStep={backStep}
			redirectToPaymentMethod={redirectToPaymentMethod}
			appointmentDescription={appointmentDescription}
			{...props}
		/>
	)
}
export const PaymentPage = memo((_PaymentPage));
