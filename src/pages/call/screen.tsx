import { memo } from "react";
import { CallContent } from '../../components/pages-components/call/index';

function _ScreenCall(props: any) {

	const { activeStepCall, redirectToPaymentPage, setLastTime, method, loading, openModalMedicine, handleModalMedicine, redirectToDetailConsultation, appointmentDescription, redirectToMyConsultation, timerLastTime, appointmentDetail, handleOutRoom } = props;
	return (
		<div className="loginContainer">
			<CallContent
				activeStepCall={activeStepCall}
				redirectToPaymentPage={redirectToPaymentPage}
				appointmentDetail={appointmentDetail}
				handleOutRoom={handleOutRoom}
				setLastTime={setLastTime}
				method={method}
				appointmentDescription={appointmentDescription}
				timerLastTime={timerLastTime}
				redirectToMyConsultation={redirectToMyConsultation}
				redirectToDetailConsultation={redirectToDetailConsultation}
				openModalMedicine={openModalMedicine}
				handleModalMedicine={handleModalMedicine}
				{...props}
			/>
		</div>
	);
}

export const ScreenCall = memo(_ScreenCall);
