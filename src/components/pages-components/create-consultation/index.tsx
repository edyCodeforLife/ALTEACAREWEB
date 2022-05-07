import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import { isMobile } from '../../../data/global/function';
import {
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';
import { Radio, FormControlLabel } from '@material-ui/core';
import { Footer } from '../../footer/footer';
import { ContainerBtn, BtnSubmit } from '../login/login';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { CustomConLogin } from '../register/register';
import { FlexOneCustom, ContainerHeaderText } from '../register/register';
import { HorizontalStepper } from '../../stepper/horizontal-stepper/index';
import { FlexRowSpaceBetween } from '../home/appointment-carousel/appointment-box';
import { ModalConfirmAppointment } from './modal-confirm/index';
import { MakeConsultation } from './step1/make-consultation';
import { ReviewConsultation } from './step2/review-consultation';

export const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
`;

export const ContainerMargin = styled.div`
	margin: ${(props) => props.margin};
`;

const HomeCardStyle = styled(CustomCardStyle)`
	min-height: 85vh;
`;

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	// height: calc(100vh - 120px);
	height: 100%;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		height:100vh
	};
`;

export const AgeDesc = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	color: #2C528B;
`;

export const ContainerCustomSkeleton = styled(FlexRow)`
	padding: ${(props) => props.loading ? '0px' : '0px 10px'};
	justify-content: space-between;
	width: ${props => props.width};
`;

export const ContainerContent = styled.div`
	width: auto;
	height: calc(100vh - 180px);
	padding-top: 50px;
	box-sizing: border-box;
	text-align: left;
	position: relative;
	@media (max-width: 768px) {
		height: ${(props) => props.mheight};
	};

`;

export const TextLabel = styled.div`
	font-style: normal;
	text-align: ${(props) => props.talign};
	font-weight: ${(props) => props.fweight};
	font-size: ${(props) => props.fsize}px;
	display: flex;
	align-items: center;
	color: ${(props) => props.color};
	white-space: pre-line;
	line-height: 1.6;
	margin: ${props => props.margin};
	cursor: ${(props) => props.cursor};
`;

export const ContainerBtnNext = styled(FlexRow)`
	position: absolute;
	bottom: 0;
	background: #D8ECF5;
	box-sizing: border-box;
	min-height: 50px;
	width: 100%;
	left: 0;
	right: 0;
	z-index: 999;
	padding: 10px 25px;
	align-items: center;
`;
export const HeaderConsultation = styled.div`
	background: #FFFFFF;
	// box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 40px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 10px;
`;

export const ContainerFlexRow = styled(FlexRow)`
	flex-wrap: wrap;
`;

export const BoxTimeSchedule = styled.div`
	background: ${(props) => props.selected ? '#61C7B5' : '#FFFFFF'};
	border: 1px solid #61C7B5;
	box-sizing: border-box;
	border-radius: 4px;
	color: ${(props) => props.selected ? '#FFFFFF' : '#61C7B5'};
	padding: 6px;
	font-size: ${(props) => props.fsize}px;
	margin: 3px;
	text-align: center;
	cursor: pointer;
`;

export const ContainerSpinner = styled(FlexRowCenter)`
	padding: 20px;
	width: 100%;
`;

export const ContainerPriceConsult = styled(FlexRowSpaceBetween)`
	background: #D6EDF6;
	padding: 10px 20px;
	margin-top: 5px;
	box-sizing: border-box;
`;

export const ContainerStepper = styled.div`
	background: #D6EDF6;
`;

export const ContainerConsultationContent = styled(FlexRow)`
	padding: 10px 20px;
`;

export const ContainerMediaChoice = styled.div`
	padding: 20px;
`;

export const LabelText = styled.div`
	color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	font-weight: ${(props) => props.fweight};
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.talign};
	line-height: ${(props) => props.lheight};
	white-space:${(props) => props.wspace};
	cursor: ${(props) => props.cursor};
`;

export const CustomRadioBtn = styled(Radio)`
	&.MuiRadio-colorSecondary.Mui-checked {
		color: #2C528B;
	}
`;

export const CustomFormControlLabel = styled(FormControlLabel)`
	&.MuiFormControlLabel-root {
		color: #2C528B;
	}
`;

export const CustomSpan = styled.span`
	margin-left: 4px;
	color: ${(props) => props.color};
	cursor: ${(props) => props.cursor};
`;

export const ContainerDataPatient = styled.div`
	padding: 5px 20px;
	border: 1px solid rgba(0,0,0, .03);
	border-bottom: none;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
`;

export const BtnGeneral = styled.button`
	margin-top: 10px;
	background: white;
	cursor: pointer;
	border-radius: 8px;
	border: 1px solid #61C7B5;
	padding: 20px;
	font-weight: 600;
	color: #3E8CB9;
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: white;
	}
`;

function _CreateConsultationContent(props: any) {
	const {
		listStep,
		activeStep,
		loading,
		profileUser,
		scheduleDoctor,
		backStep,
		mediaValue,
		onChangeRadio,
		doLogout,
		onClickChangeDoctor,
		onNextToReviewConsultation,
		onFinishReviewConsultation,
		handleModal,
		open,
		onHandleAppointment
	} = props;

	const fullName = profileUser?.first_name + " " + profileUser?.last_name;

	const renderCurrentStep = (currentStep) => {
		switch (currentStep) {
			case 1:
				return (
					<MakeConsultation
						{
						...{
							scheduleDoctor,
							profileUser,
							fullName,
							loading,
							doLogout,
							onClickChangeDoctor,
							mediaValue,
							onChangeRadio,
							activeStep
						}
						}

					/>
				)
			case 2:
				return (
					<ReviewConsultation
						{
						...{
							scheduleDoctor,
							profileUser,
							fullName,
							loading,
							doLogout,
							activeStep,
							onClickChangeDoctor,
							mediaValue
						}
						}
					/>
				)
			default:
				return (
					<MakeConsultation
						{
						...{
							scheduleDoctor,
							profileUser,
							fullName,
							loading,
							activeStep,
							doLogout,
							onClickChangeDoctor,
							mediaValue,
							onChangeRadio
						}
						}

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
									<CustomFlexRowCenter>
										<HeaderConsultation>
											<FlexOneCustom
												style={{ cursor: 'pointer' }}
												flex={"15% 0 0"}
												onClick={backStep}
											>
												<Icon
													className="iconBackArrow"
													icon="arrow_back_ios"
													color="#2C528B"
												/>
											</FlexOneCustom>

											<FlexOneCustom flex={"65% 0 0"}>
												<ContainerHeaderText>
													{activeStep === 1 ? "Buat Konsultasi" : "Konsultasi Review"}
												</ContainerHeaderText>
											</FlexOneCustom>
										</HeaderConsultation>
									</CustomFlexRowCenter>
									<ContainerContent mheight={`calc(100vh - ${activeStep === 1 ? "100px" : "150px"})`}>
										<HorizontalStepper
											activestepcolor={"#2C528B"}
											completestepcolor={"#3E8CB9"}
											background={"#D6EDF6"}
											listStep={listStep}
											activeStep={activeStep}
											width={isMobile() ? "155vw" : "540px"}
											right={activeStep === 2 ? "170px" : "0px"}
										/>
										<CustomScroll flex="1" heightRelativeToParent={'calc(100% - 20px)'}>
											{renderCurrentStep(activeStep)}
										</CustomScroll>
									</ContainerContent>

									<ContainerBtnNext>
										<ContainerBtn>
											<BtnSubmit
												onClick={activeStep === 1 ?
													onNextToReviewConsultation :
													onFinishReviewConsultation}
												// disabled={loading || selectedScheduleUser.code === ""}
												minwidth="100%"
											>
												{activeStep === 1 ? "Buat Janji Konsultasi" : "Benar, Lanjutkan"}
											</BtnSubmit>
											{activeStep === 2 && (
												<BtnGeneral
													onClick={doLogout}
													minwidth="100%">
													Ubah Pasien
												</BtnGeneral>
											)}
										</ContainerBtn>
									</ContainerBtnNext>
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
			<ModalConfirmAppointment
				onHandleAppointment={onHandleAppointment}
				open={open}
				handleModal={handleModal}
			/>
		</Fragment>
	)
}

export const CreateConsultationContent = memo(_CreateConsultationContent);

