import { memo } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Tab, Tabs, AppBar } from '@material-ui/core';
import styled from 'styled-components';
import { map } from 'lodash';
import CustomScroll from 'react-custom-scroll';
import { FlexRowCenter } from '../../../../basic-elements/flex';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../../login/login';
import { PatientDataContent } from './patient-data/patient-data';
import { MedicalResume } from './medical-resume/medical-resume';
import { MedicalDocument } from './medical-document/medical-document';
import { ConsultationFees } from './consultation-fees/fees';

const ContainerFullWidth = styled.div`
	position: relative;
	width: 100%;
	box-sizing: border-box;
	height: calc(100% - 50px);
	margin-top:50px;
`;

export const NewFormControl = styled(CustomFormControl)`
	margin-top: 0px;
	box-sizing:border-box;
`;

export const BtnCustom = styled(BtnSubmit)`
	min-width: 340px;
	cursor: ${(props) => props.cursor};
	background: ${(props) => props.bground};
	padding: 15px;
		@media (max-width: 768px) {
			min-width: calc(100% - 60px);
		}
`;

const CustomTab = styled(Tab)`
	min-width: 0px;
	padding: 2px 6px;
	& .MuiTab-wrapper {
		font-size: 12px;
	}
	@media (max-width: 320px) {
		& .MuiTab-wrapper {
			font-size: 10px;
		}
	}
`;

export const NewFlexRowCenter = styled(FlexRowCenter)`
	background-color: #fff;
	z-index: 999;
	padding: 12px 0px;
	position: absolute;
	width: 100%;
	bottom: 0;
	@media (max-height: 568px) {
		margin-top: 100px;
	};
`;

const CustomSwipeView = styled(SwipeableViews)`
	height: 100%;
	box-sizing: border-box;
	& .react-swipeable-view-container {
		height: 100%;
	}
`;

const MainTabs = styled(Tabs)`
	background: #FFFFFF;
	color: #61C7B5;
	& .MuiTabs-indicator {
		background-color: #61C7B5 !important;
	}
	& .MuiTabs-flexContainer {
		justify-content: center;
	}

`;

const ContainerTabs = styled(AppBar)`
	color: white;
	background: #FFFFFF;
	box-shadow: none;
	position: absolute;
`;

const CustomTabPanel = styled(TabPanel)`
	height: 100%;
`;

const ContainerCardList = styled.div`
	height: ${(props) => props.activeValueTab === 0 ? 'calc(100vh - 240px)' : 'calc(100vh - 170px)'} ;
	box-sizing: border-box;
	padding-top: 48px;
	@media (max-width: 768px) {
		height: ${(props) => props.activeValueTab === 0 ? props.mheight : '100%'};
	};
`;

const CustomBox = styled(Box)`
	// padding: 2px 4px;
	height: 100%;
`;

const ContainerContentTab = styled.div`
	height: 100%;
`;

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scroll-force-tabpanel-${index}`}
			aria-labelledby={`scroll-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<CustomBox>
					<Typography component={'span'}>{children}</Typography>
				</CustomBox>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

function _DetailTabs(props: any) {
	const theme = useTheme();
	const {
		value,
		deleteDocument,
		handleChangeActiveTab,
		handleChangeIndex,
		appointmentDescription,
		loading,
		redirectTo,
		fileInputRef,
		handleUploadFiles,
		progressTracker,
		fileSendError,
		isSendingFile,
		deletedId,
		fileName,
		activeStepDetail
	} = props;
	const arrIdx = [0, 1, 2, 3];
	const status = appointmentDescription?.status

	const textData = {
		MEET_SPECIALIST: {
			isDisable: false,
			bgcolor: "#2C528B",
			text: "Temui Dokter"
		},
		PAID: {
			isDisable: true,
			bgcolor: "#C7C9D9",
			text: "Konsultasi akan tersedia sesuai jadwal"
		},
		COMPLETED: {
			isDisable: false,
			bgcolor: "#61C7B5",
			text: "Jadwalkan Ulang"
		},
		WAITING_FOR_MEDICAL_RESUME: {
			isDisable: false,
			bgcolor: "#61C7B5",
			text: "Jadwalkan Ulang"
		}

	}

	const switchRenderDetail = () => {
		switch (value) {
			case 0:
				return (
					<PatientDataContent
						loading={loading}
						handleUploadFiles={handleUploadFiles}
						appointmentDescription={appointmentDescription}
						fileInputRef={fileInputRef}
						progressTracker={progressTracker}
						fileSendError={fileSendError}
						isSendingFile={isSendingFile}
						fileName={fileName}
						deleteDocument={deleteDocument}
						deletedId={deletedId}
						activeStepDetail={activeStepDetail}
					/>
				)
			case 1:
				return (
					<MedicalResume
						appointmentDescription={appointmentDescription}
						{...props}
					/>
				)
			case 2:
				return (
					<MedicalDocument
						appointmentDescription={appointmentDescription}
						{...props}
					/>
				)
			case 3:
				return (
					<ConsultationFees
						appointmentDescription={appointmentDescription}
						{...props}
					/>
				)
			default:
				return (
					<PatientDataContent
						loading={loading}
						handleUploadFiles={handleUploadFiles}
						appointmentDescription={appointmentDescription}
						fileInputRef={fileInputRef}
						progressTracker={progressTracker}
						fileSendError={fileSendError}
						isSendingFile={isSendingFile}
						fileName={fileName}
						deleteDocument={deleteDocument}
						deletedId={deletedId}
						activeStepDetail={activeStepDetail}
					/>
				)
		}
	}

	return (
		<ContainerFullWidth>
			<ContainerTabs>
				<MainTabs
					value={value}
					onChange={handleChangeActiveTab}
					variant="scrollable"
					scrollButtons="off"
					aria-label="scrollable auto tabs example"
				>
					<CustomTab label="Data Pasien" {...a11yProps(0)} />
					<CustomTab label="Catatan Dokter" {...a11yProps(1)} />
					<CustomTab label="Dokumen Medis" {...a11yProps(2)} />
					<CustomTab label="Biaya" {...a11yProps(2)} />

				</MainTabs>
			</ContainerTabs>

			<CustomSwipeView
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				springConfig={{ duration: '1s', delay: '0.5s' }}
				onChangeIndex={handleChangeIndex}
			>
				{map(arrIdx, (item, idx) => (
					<ContainerCardList key={idx} activeValueTab={value} mheight={"calc(100vh - 140px)"}>
						<CustomScroll flex="1" heightRelativeToParent={'100%'}>
							<CustomTabPanel key={idx} value={value} index={item} dir={theme.direction}>
								<ContainerContentTab>
									{switchRenderDetail()}
								</ContainerContentTab>

							</CustomTabPanel>
							{value === 0 && (
								<NewFlexRowCenter>
									<NewFormControl minwidth="100%" talign="center">
										<ContainerBtn>
											<BtnCustom
												cursor={status === "PAID" ? "not-allowed" : "pointer"}
												disabled={textData[`${status}`]?.isDisable}
												onClick={() => { redirectTo(status, appointmentDescription.doctor?.id) }}
												bground={textData[`${status}`]?.bgcolor}
											>
												{textData[`${status}`]?.text}
											</BtnCustom>
										</ContainerBtn>
									</NewFormControl>
								</NewFlexRowCenter>
							)}

						</CustomScroll>
					</ContainerCardList>

				))}
			</CustomSwipeView>
		</ContainerFullWidth>
	);
}

export const DetailTabs = memo(_DetailTabs);