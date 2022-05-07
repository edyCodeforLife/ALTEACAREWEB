import { memo } from "react";
import { PaymentMethodContent } from '../../components/pages-components/payment-method/payment-method';

function _ScreenPaymentMethod(props: any) {

	const {
		paymentMethod,
		handleClickBox,
		loading
	} = props;

	return (
		<div className="loginContainer">
			<PaymentMethodContent
				paymentMethod={paymentMethod}
				handleClickBox={handleClickBox}
				loading={loading}
				{...props}
			/>
		</div>
	);
}

export const ScreenPaymentMethod = memo(_ScreenPaymentMethod);
