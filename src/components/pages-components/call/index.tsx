import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import { isMobile } from '../../../data/global/function';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';
import { Radio, FormControlLabel } from '@material-ui/core';
import { Footer } from '../../footer/footer';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { CustomConLogin } from '../register/register';
import { LoadingCall } from './loading-call/index';
import { CallEnded } from './callEnded/index';
import { Room } from './room/index';
import { FlexRowSpaceBetween } from '../home/appointment-carousel/appointment-box';
import { ModalInfoMedicine } from './modal-info-medicine/index';

export const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
	padding: 20px;
	height: 100%;
`;

export const ContainerMargin = styled.div`
	margin: ${(props) => props.margin};
`;

export const HomeCardStyle = styled(CustomCardStyle)`
	min-height: 85vh;
`;

export const ContainerCardContent = styled(NewCardContent)`
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

const ContainerContent = styled.div`
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
const HeaderConsultation = styled.div`
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
	padding: 10px 30px;
`;

export const ContainerMediaChoice = styled.div`
	padding: 20px;
`;

export const LabelText = styled.div`
	color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	font-weight: ${(props) => props.fweight};
	margin: ${(props) => props.margin};
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

function _CallContent(props: any) {
	const {
		activeStepCall,
		appointmentDetail,
		loading,
		redirectToMyConsultation,
		redirectToPaymentPage,
		handleOutRoom,
		timerLastTime,
		setLastTime,
		method,
		appointmentDescription,
		redirectToDetailConsultation,
		openModalMedicine,
		handleModalMedicine
	} = props;

	const switchRender = (activeStepCall) => {
		switch (activeStepCall) {
			case 1:
				return (
					<LoadingCall
						appointmentDescription={appointmentDescription}
						method={method} {...props}
					/>)
			case 2:
				return (
					<Room
						handleOutRoom={handleOutRoom}
						appointmentDetail={appointmentDetail}
						appointmentDescription={appointmentDescription}
						setLastTime={setLastTime}
						method={method}
						{...props}
					/>
				)
			case 3:
				return (
					<CallEnded
						method={method}
						appointmentDescription={appointmentDescription}
						timerLastTime={timerLastTime}
						redirectToMyConsultation={redirectToMyConsultation}
						redirectToDetailConsultation={redirectToDetailConsultation}
						handleModal={handleModalMedicine}
						redirectToPaymentPage={redirectToPaymentPage}
						{...props}
					/>
				)
			default:
				return <LoadingCall
					appointmentDescription={appointmentDescription}
					method={method} {...props}
				/>
		}
	}


	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant={activeStepCall === 2 ? "elevation" : "outlined"}>
								<ContainerCardContent>
									{switchRender(activeStepCall)}
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				<ModalInfoMedicine
					open={openModalMedicine}
					handleModal={handleModalMedicine}
				/>
				{!isMobile() && <Footer />}
			</CustomConLogin>
		</Fragment>
	)
}

export const CallContent = memo(_CallContent);

