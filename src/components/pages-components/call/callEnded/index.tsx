import { memo, Fragment } from 'react';
import { CallEndedMA } from './callEndedMA/index';
import { CallEndedSpecialist } from './callEndedSpecialist/index';

function _CallEnded(props: any) {
	const { timerLastTime, redirectToMyConsultation, redirectToPaymentPage, method, handleModal, redirectToDetailConsultation, appointmentDescription } = props;

	return (
		<Fragment>
			{method === 'CALL_MA' ? (
				<CallEndedMA
					timerLastTime={timerLastTime}
					redirectToMyConsultation={redirectToMyConsultation}
					redirectToPaymentPage={redirectToPaymentPage}
					{...props}
				/>
			) : (
				<CallEndedSpecialist
					timerLastTime={timerLastTime}
					appointmentDescription={appointmentDescription}
					handleModal={handleModal}
					redirectToDetailConsultation={redirectToDetailConsultation}
					{...props}
				/>
			)}

		</Fragment>

	);
}

export const CallEnded = memo(_CallEnded);