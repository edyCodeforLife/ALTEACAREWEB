import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../../basic-elements/flex/index';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';

import { CustomConLogin } from '../register/register';
import { isMobile } from '../../../data/global/function';
import { CancelDetailContent } from './cancel-detail/cancel';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { DetailConsultationWithTabs } from './tab-detail-consultation/index';

function _DetailConsultationContent(props: any) {

	const {
		activeStep,
		appointmentDescription,
		backStep,
		redirectToDoctorDetail,
		value,
		handleChangeIndex,
		handleChangeActiveTab,
		loading,
		redirectTo,
		fileInputRef,
		handleUploadFiles,
		progressTracker,
		fileSendError,
		isSendingFile,
		fileName,
		deleteDocument,
		deletedId
	} = props;

	const switchRender = (activeStepDetail) => {
		switch (activeStepDetail) {
			case 0:
				return (
					<DetailConsultationWithTabs
						appointmentDescription={appointmentDescription}
						backStep={backStep}
						value={value}
						handleChangeIndex={handleChangeIndex}
						handleChangeActiveTab={handleChangeActiveTab}
						loading={loading}
						redirectTo={redirectTo}
						fileInputRef={fileInputRef}
						handleUploadFiles={handleUploadFiles}
						progressTracker={progressTracker}
						fileSendError={fileSendError}
						isSendingFile={isSendingFile}
						fileName={fileName}
						deleteDocument={deleteDocument}
						deletedId={deletedId}
						activeStepDetail={activeStepDetail}
						{...props}
					/>
				)
			case 1:
				return (
					<DetailConsultationWithTabs
						appointmentDescription={appointmentDescription}
						backStep={backStep}
						value={value}
						handleChangeIndex={handleChangeIndex}
						handleChangeActiveTab={handleChangeActiveTab}
						loading={loading}
						redirectTo={redirectTo}
						fileInputRef={fileInputRef}
						handleUploadFiles={handleUploadFiles}
						progressTracker={progressTracker}
						fileSendError={fileSendError}
						fileName={fileName}
						isSendingFile={isSendingFile}
						deleteDocument={deleteDocument}
						deletedId={deletedId}
						activeStepDetail={activeStepDetail}
						{...props}
					/>
				)
			case 2:
				return (
					<CancelDetailContent
						appointmentDescription={appointmentDescription}
						backStep={backStep}
						redirectToDoctorDetail={redirectToDoctorDetail}
						{...props}
					/>
				)
			default:
				return (
					<DetailConsultationWithTabs
						appointmentDescription={appointmentDescription}
						backStep={backStep}
						value={value}
						handleChangeIndex={handleChangeIndex}
						handleChangeActiveTab={handleChangeActiveTab}
						loading={loading}
						redirectTo={redirectTo}
						fileInputRef={fileInputRef}
						handleUploadFiles={handleUploadFiles}
						progressTracker={progressTracker}
						fileSendError={fileSendError}
						isSendingFile={isSendingFile}
						fileName={fileName}
						deleteDocument={deleteDocument}
						deletedId={deletedId}
						activeStepDetail={activeStepDetail}
						{...props}
					/>
				)

		}
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									{switchRender(activeStep)}
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
		</Fragment>
	)
}

export const DetailConsultationContent = memo(_DetailConsultationContent);

