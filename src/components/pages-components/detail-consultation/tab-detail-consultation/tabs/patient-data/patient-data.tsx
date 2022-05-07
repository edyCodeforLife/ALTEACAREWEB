import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { CustomFlexRowCenter } from '../../../../create-consultation/index';
import { BoxDoctor } from '../../../box-card/box';
import { FlexCenter, FlexRow, Flex } from '../../../../../basic-elements/flex/index';
import { ContainerMessage } from '../../../cancel-detail/cancel';
import { PatientProfile } from './patient-profile/patient-profile';
import { FlexRowSpaceBetween } from '../../../../home/appointment-carousel/appointment-box';
import { LabelText } from '../../../../create-consultation/index';
import { Button, LinearProgress, LinearProgressProps, Box, Typography } from '@material-ui/core';
import {
	Icon,
}
	from '../../../../../basic-elements/mobile-container/index';
import { ALLOWED_FILE_TYPES } from '../../../../call/chat/InputChat/input-chat';
import { map, filter } from 'lodash';
import { Loading } from '../../../../../loading/index';

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

const CustomBtn = styled(Button)`
	background: transparent;
	min-width: 30px;
		&:disabled: {
			background: 'none',
			& path: {
				fill: '#d8d8d8',
			};
		};
`;

const FlexRowCenterDetail = styled(CustomFlexRowCenter)`
	height: 100%;
	align-items: flex-start;
`;

const ContainerBoxDoctor = styled(FlexCenter)`
	box-sizing: border-box;
	position: relative;
	width: 100%;
`;

export const ContainerPatientProfile = styled.div`
	position: relative;
	box-sizing: border-box;
	min-width: 10px;
	text-align: center;
    padding: 14px;
    width: calc(100% - 20px);
    border-radius: 8px;
	background: #fff;
	box-shadow: 0px 2px 3px rgb(0 0 0 / 10%);
		@media (max-width: 768px) {
			width: calc(100% - 43px);
		}

`;

const CustomLinearBar = styled(LinearProgress)`
	width: 100%;
	position: relative;
	& .MuiLinearProgress-barColorPrimary {
		background-color: #61C7B5;
	}
`;

const SpanText = styled.span`
	color: #8F90A6;
	font-size: 12px;
	margin-left: 5px;
`;

const UploadFileContainer = styled(FlexRowSpaceBetween)`
	padding: 10px 20px;
	box-sizing: border-box;
	background-color: #fff;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-bottom: none;
	border-left: none;
	border-right: none;
`;

const CustomBox = styled(Box)`
	width: 50%;
	margin-left: 10px;
`;

const ContainerListUpload = styled.div`
	margin-top: 20px;
	width: 100%;
`;

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
	return (
		<CustomBox display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<CustomLinearBar variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</CustomBox>
	);
}

const ContainerData = styled(FlexRow)`
	justify-content: space-around;
	text-align: right;
`;

export const CustomFlexLeft = styled(Flex)`
	align-items: flex-start;
	justify-content: flex-start;
`;

function _PatientDataContent(props: any) {
	const {
		appointmentDescription,
		handleUploadFiles,
		loading,
		fileInputRef,
		progressTracker,
		fileSendError,
		isSendingFile,
		fileName,
		deleteDocument,
		deletedId,
		activeStepDetail
	} = props;

	const fullName = appointmentDescription.patient?.first_name + " " + appointmentDescription.patient?.last_name;
	const uploadedByUser = filter(appointmentDescription?.medical_document, (item) => {
		return item?.upload_by_user === 1;
	});

	const openLink = (link) => {
		const anchorEl = document.createElement('a');

		anchorEl.href = link;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener';
		setTimeout(() => {
			anchorEl.click();
		});
	}

	return (
		<Fragment>
			<FlexCenter>
				<ContainerBoxDoctor>
					<BoxDoctor
						appointmentDescription={appointmentDescription}
					/>
				</ContainerBoxDoctor>
				{activeStepDetail === 0 && (
					<Fragment>
						<ContainerListUpload>
							{map(uploadedByUser, (item, idx) => {
								return (
									<UploadFileContainer key={idx}>
										<LabelText
											style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
											fsize={12}
											color={"#000000"}
										>
											{item.original_name}
										</LabelText>

										<ContainerData>
											<LabelText
												fsize={12}
												color={"#8F90A6"}
											>
												{item.size}
											</LabelText>

											<LabelText
												style={{ cursor: 'pointer' }}
												margin={"0px 5px"}
												fsize={14}
												color={"#61C7B5"}
												onClick={() => { openLink(item?.url) }}
											>
												Lihat
											</LabelText>

											<LabelText
												style={{ cursor: 'pointer' }}
												fsize={14}
												color={"#ED2323"}
												onClick={() => { deleteDocument(item?.id) }}
											>
												Hapus
											</LabelText>
											{loading && (deletedId === item?.id) && (
												<Loading size={20} color={"#61C7B5"} />
											)}
										</ContainerData>
									</UploadFileContainer>
								)
							})
							}
						</ContainerListUpload>

						{isSendingFile && (
							<UploadFileContainer>
								<LabelText
									style={{ wordBreak: 'break-all', textAlign: 'left' }}
									fsize={12}
									color={"#000000"}
								>
									{fileName}
								</LabelText>

								<LinearProgressWithLabel value={progressTracker} />
							</UploadFileContainer>
						)}

						<UploadFileContainer>
							<CustomFlexLeft>
								<LabelText
									fsize={12}
									color={"#000000"}

								>
									Unggah Berkas (opsional)
									<SpanText>
										Max 10MB
									</SpanText>
								</LabelText>
								<LabelText
									fsize={10}
									color={"#8F90A6"}
								>
									Pemeriksaan Penunjang
								</LabelText>
							</CustomFlexLeft>


							<CustomBtn onClick={() => fileInputRef.current?.click()} >
								<input
									ref={fileInputRef}
									type="file"
									style={{ display: 'none' }}
									onChange={handleUploadFiles}
									value={''}
									accept={ALLOWED_FILE_TYPES}
								/>
								<Icon
									style={{ width: 24 }}
									icon={"attach_file_icon"}
									color={"#61C7B5"}
								/>
								<LabelText fsize={12} color={"#61C7B5"}>
									Unggah
								</LabelText>
							</CustomBtn>
						</UploadFileContainer>
					</Fragment>
				)}

				<ContainerMessage lheight={600} color={'#8F90A6'}>
					Data Pasien
				</ContainerMessage>

				<ContainerPatientProfile>
					<PatientProfile
						item={appointmentDescription}
						fullName={fullName}
						loading={loading}
					/>
				</ContainerPatientProfile>
			</FlexCenter>
		</Fragment>
	);
}

export const PatientDataContent = memo(_PatientDataContent);