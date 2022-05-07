import { memo, useState, useEffect } from "react";
import { ScreenPaymentMethod } from './screen';
import { IAlteaCMSService, AlteaCMSService, IAppointmentService, AppointmentService } from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import * as LS from 'local-storage';
import SimpleCryptoJS from 'simple-crypto-js';
import { MIDTRANS_SNAP_CLIENT_KEY, MIDTRANS_SNAP_URL, alteaWebViewURL, SECRET_KEY3 } from '../../data/global/variables';

function _PaymentMethodPage(props) {
	const qrs = QrsToObj(window.location.search);

	const appointment_id = parseInt(qrs.appointment_id);
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [paymentMethod, setPaymentMethod] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getPaymentMethod = () => {
		_CMSService.GetPaymentMethod({
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setPaymentMethod(res.data)
			}
		})
	}

	useEffect(() => {
		if (!appointment_id) {
			props.history.push('/my-consultation');
		} else {
			getPaymentMethod();
			const script = document.createElement('script');
			script.src = MIDTRANS_SNAP_URL;
			script.setAttribute('data-client-key', MIDTRANS_SNAP_CLIENT_KEY);
			script.async = true;
			script.type = "text/javascript";

			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			}
		}
	}, []);

	const handleClickBox = (code: string, provider: string) => {
		const req = {
			appointment_id,
			method: code
		}
		_AppointmentService.appointmentPay(req, {
			Success: (res: any) => {
				if (res?.data.type === "MIDTRANS_SNAP") {
					(window as any).snap.pay(res.data?.token, {
						onSuccess: function (result) {
							AltAlert.show({
								title: "Success",
								subtitle: result.status_message,
								type: 'success',
							});
							setTimeout(() => {
								props.history.push(`/payment-success?appointment_id=${appointment_id}`);
							}, 250);
						},
						onPending: function (result) {
							AltAlert.show({
								title: "Pending",
								subtitle: result.status_message,
								type: 'info',
							});
						},
						onError: function (result) {
							console.log(result)
							AltAlert.show({
								title: "Error",
								subtitle: result.status_message[0],
								type: 'warning',
							});
							setTimeout(() => {
								props.history.push(`/payment?appointment_id=${appointment_id}`);
							}, 250);
						},
						onClose: function () {
							console.log('close')
						},
						language: "id"
					})
				} else {
					if (res?.data.type === "ALTEA_PAYMENT_WEBVIEW") {
						const simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY3);
						const encryptedText = simpleCrypto.encryptObject(res.data);
						LS.set(alteaWebViewURL, encryptedText);
						setTimeout(() => {
							props.history.push(`/altea-payment?appointment_id=${appointment_id}`)
						}, 150);
					} else {
						return;
					}
				}
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
		})
	}

	return (
		<ScreenPaymentMethod
			paymentMethod={paymentMethod}
			handleClickBox={handleClickBox}
			loading={loading}
			{...props}
		/>
	)
}
export const PaymentMethodPage = memo((_PaymentMethodPage));
