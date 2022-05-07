import { memo } from "react";
import { CreateConsultationContent } from '../../components/pages-components/create-consultation/index';

function _ScreenCreateConsultation(props: any) {

	const { listStep, loading, onClickChangeDoctor, doLogout, profileUser, activeStep, scheduleDoctor, backStep, onChangeRadio, mediaValue, onHandleAppointment, onNextToReviewConsultation, onFinishReviewConsultation, handleModal, open } = props;
	return (
		<div className="loginContainer">
			<CreateConsultationContent
				listStep={listStep}
				activeStep={activeStep}
				scheduleDoctor={scheduleDoctor}
				backStep={backStep}
				mediaValue={mediaValue}
				onChangeRadio={onChangeRadio}
				loading={loading}
				profileUser={profileUser}
				doLogout={doLogout}
				onClickChangeDoctor={onClickChangeDoctor}
				onNextToReviewConsultation={onNextToReviewConsultation}
				onFinishReviewConsultation={onFinishReviewConsultation}
				handleModal={handleModal}
				open={open}
				onHandleAppointment={onHandleAppointment}
				{...props}
			/>
		</div>
	);
}

export const ScreenCreateConsultation = memo(_ScreenCreateConsultation);
