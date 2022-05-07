import { memo } from "react";
import { PaymentSuccessContent } from '../../components/pages-components/payment-success/index';

function _ScreenPaymentSuccess(props: any) {

	const {
		listStep,
		activeStep,
		redirectTo,
		appointmentDescription,
	} = props;

	return (
		<div className="loginContainer">
			<PaymentSuccessContent
				appointmentDescription={appointmentDescription}
				listStep={listStep}
				activeStep={activeStep}
				redirectTo={redirectTo}
				{...props}

			/>
		</div>
	);
}

export const ScreenPaymentSuccess = memo(_ScreenPaymentSuccess);
