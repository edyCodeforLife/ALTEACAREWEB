import { memo } from "react";
import { DetailConsultationContent } from '../../components/pages-components/detail-consultation/index';

function _DetailMyConsultationScreen(props: any) {

	const {
		handleChangeActiveTab,
		handleChangeIndex,
		value,
		activeStep,
		appointmentDescription,
		backStep,
		redirectToDoctorDetail,
		loading,
		redirectTo,
		fileInputRef,
		handleUploadFiles,
		progressTracker,
		fileSendError,
		isSendingFile,
		deleteDocument,
		fileName,
		deletedId
	} = props;

	return (
		<div className="loginContainer">
			<DetailConsultationContent
				activeStep={activeStep}
				handleUploadFiles={handleUploadFiles}
				backStep={backStep}
				loading={loading}
				redirectToDoctorDetail={redirectToDoctorDetail}
				appointmentDescription={appointmentDescription}
				value={value}
				handleChangeIndex={handleChangeIndex}
				handleChangeActiveTab={handleChangeActiveTab}
				redirectTo={redirectTo}
				fileInputRef={fileInputRef}
				fileName={fileName}
				progressTracker={progressTracker}
				fileSendError={fileSendError}
				isSendingFile={isSendingFile}
				deleteDocument={deleteDocument}
				deletedId={deletedId}
				{...props}
			/>
		</div>
	);
}

export const DetailMyConsultationScreen = memo(_DetailMyConsultationScreen);
