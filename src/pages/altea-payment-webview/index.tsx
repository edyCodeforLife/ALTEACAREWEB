import { memo, useEffect, useState } from "react";
import { ScreenAlteaPaymentWebView } from './screen';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import * as LS from 'local-storage';
import { getToken } from '../../data/hooks/auth-token';
import SimpleCryptoJS from 'simple-crypto-js';
import { IAppointmentService, AppointmentService } from '../../data/business/index';
import { LANDING_URL } from '../../data/global/variables';
import { alteaWebViewURL, SECRET_KEY3 } from '../../data/global/variables';

function _AlteaPaymentWebView(props) {
	const qrs = QrsToObj(window.location.search);
	const appointment_id = parseInt(qrs.appointment_id);
	const [selectedPaymentObj, setSelectedPayment] = useState<any>(null);
	const [webviewURL, setWebviewURL] = useState<string>("");
	const token = getToken();
	const _AppointmentService: IAppointmentService = new AppointmentService();

	const onCheckPaymentStatus = () => {
		_AppointmentService.appointmentDescription(appointment_id, {
			Success: (res: any) => {
				if (res.data?.status === "PAID") {
					AltAlert.show({
						title: "Berhasil",
						subtitle: "Pembayaran Berhasil",
						type: 'success',
					});
					setTimeout(() => {
						props.history.push(`/payment-success?appointment_id=${appointment_id}`);
					}, 250);
				} else {
					AltAlert.show({
						title: "INFO",
						subtitle: "Mohon lakukan pembayaran terlebih dahulu.",
						type: 'info',
					});
				}
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

	useEffect(() => {
		let decryptedText;
		const paymentObjEncrypted: any = LS.get(alteaWebViewURL);
		let simpleCrypto = new SimpleCryptoJS(SECRET_KEY3);
		if (paymentObjEncrypted) {
			decryptedText = simpleCrypto.decryptObject(paymentObjEncrypted);
		}
		setSelectedPayment(decryptedText)
	}, []);


	useEffect(() => {
		if (selectedPaymentObj) {
			const urlWebView = selectedPaymentObj.payment_url.replace("{{REPLACE_THIS_TO_BEARER_USER}}", getToken());
			setWebviewURL(urlWebView);
		}
	}, [selectedPaymentObj]);

	useEffect(() => {
		if (!token) {
			props.history.replace(LANDING_URL);
			window.location.reload();
		}
	}, [token]);

	return (
		<ScreenAlteaPaymentWebView
			selectedPaymentObj={selectedPaymentObj}
			webviewURL={webviewURL}
			onCheckPaymentStatus={onCheckPaymentStatus}
			{...props}
		/>
	)
}
export const AlteaPaymentWebView = memo((_AlteaPaymentWebView));
