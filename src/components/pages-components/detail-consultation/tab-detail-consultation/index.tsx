import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { CustomFlexRowCenter } from '../../create-consultation/index';
import { FlexOneCustom, ContainerHeaderText } from '../../register/register';
import { DetailTabs } from './tabs/tabs';

export const HeaderDetailConsultation = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 60px;
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 0px;
`;

export const FlexRowCenterDetail = styled(CustomFlexRowCenter)`
	height: 100%;
	align-items: flex-start;
`;

export const HeaderText = styled(ContainerHeaderText)`
	font-size: 18px;
`;

function _DetailConsultationWithTabs(props: any) {
	const {
		appointmentDescription,
		backStep,
		redirectTo,
		handleChangeActiveTab,
		value,
		handleChangeIndex,
		loading,
		fileInputRef,
		handleUploadFiles,
		progressTracker,
		fileSendError,
		deletedId,
		isSendingFile,
		deleteDocument,
		fileName,
		activeStepDetail

	} = props;

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"20% 0 0"}
						onClick={() => backStep()}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Detail Telekonsultasi
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<DetailTabs
					value={value}
					appointmentDescription={appointmentDescription}
					handleChangeActiveTab={handleChangeActiveTab}
					handleChangeIndex={handleChangeIndex}
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
				/>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const DetailConsultationWithTabs = memo(_DetailConsultationWithTabs);