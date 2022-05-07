import { memo } from "react";
import { PaymentContent } from '../../components/pages-components/payment/index';

function _ScreenPaymentPage(props: any) {

	const {
		listStep,
		activeStep,
		backStep,
		appointmentDescription,
		redirectToPaymentMethod
	} = props;

	return (
		<div className="loginContainer">
			<PaymentContent
				listStep={listStep}
				activeStep={activeStep}
				backStep={backStep}
				redirectToPaymentMethod={redirectToPaymentMethod}
				appointmentDescription={appointmentDescription}
				{...props}

			/>
		</div>
	);
}

export const ScreenPaymentPage = memo(_ScreenPaymentPage);
