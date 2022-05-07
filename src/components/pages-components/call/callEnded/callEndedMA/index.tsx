import { memo, useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { CustomFlexRowCenter } from '../../index';
import {
	IAppointmentService,
	AppointmentService
} from '../../../../../data/business/index';
import { LabelText } from '../../../create-consultation/index';
import { QrsToObj } from '../../../../../data/global/function';
import CallMa from '../../../../../assets/image/callMA.png';
import { Flex } from '../../../../basic-elements/flex';
import { CustomImageLogo, CustomFlex, ContainerTitle, ContainerDescription } from '../../loading-call/loading-MA';
import { ContainerBtn, BtnSubmit } from '../../../login/login';
import { ContainerBtnNext } from '../../../create-consultation/index'

export const TimerStyle = styled.div`
	color: #2C528B;
	margin-top: 25px;
`;

const ContainerImg = styled.div`
	background: #fff;
    width: 150px;
    height: 150px;
	bottom: 30%;
    position: relative;
	margin: 0 auto;
	border-radius: 100%;
    border: solid 5px #fff;
`;

const ImageAdjust = styled(CustomImageLogo)`
	opacity: .5;
`;

export const ContainerEndBtn = styled(ContainerBtnNext)`
	position: absolute;
	padding: 0px;
	bottom: 0;
`;

const EndCallContainer = styled(props => <CustomFlexRowCenter {...props} />)`
	box-sizing: border-box;
`;

export const BtnPayment = styled.button`
	margin-top: 10px;
	background: ${(props) => props.status === "PROCESS_GP" ? "#C7C9D9" : "#61C7B5"};
	cursor: pointer;
	border-radius: 8px;
	border: none;
	padding: 20px;
	font-weight: 600;
	color: #FFFFFF;
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: white;
	}
`;

function _CallEndedMA(props: any) {
	const { timerLastTime, redirectToMyConsultation, redirectToPaymentPage } = props;
	const qrs = QrsToObj(window.location.search);
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [appointmentDescription, setAppointmentDescription] = useState<any>({});

	const getAppointmentDetailDescription = () => {
		_AppointmentService.appointmentDescription(qrs.appointment_id, {
			Success: (data: any) => {
				setAppointmentDescription(data.data);
			}
		})
	}

	useEffect(() => {
		if (appointmentDescription === "") {
			getAppointmentDetailDescription();
		}
	}, [])

	useEffect(() => {
		getAppointmentDetailDescription();
		const interval = setInterval(() => {
			getAppointmentDetailDescription();
		}, 10000);

		return () => {
			clearInterval(interval)
		}
	}, []);

	const status = appointmentDescription && appointmentDescription["status"];

	return (

		<EndCallContainer>
			<CustomFlex>
				<ContainerTitle>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={400}
					>
						Panggilan Berakhir
					</LabelText>
					<TimerStyle>
						{timerLastTime}
					</TimerStyle>
				</ContainerTitle>

				<Flex>
					<ContainerImg>
						<ImageAdjust
							src={CallMa}
							height={150}
							width={150}
						/>
					</ContainerImg>
				</Flex>

				<ContainerDescription>
					<LabelText
						color={status === "PROCESS_GP" || status === "WAITING_FOR_PAYMENT" ? "#2C528B" : "#FF5C5C"}
						fsize={14}
						fweight={480}
						talign={"center"}
						lheight={1.6}
					>
						{status === "PROCESS_GP" &&
							"Konfirmasi rencana telekonsultasi Anda telah selesai. Mohon menunggu, link pembayaran Anda sedang diproses. Segera selesaikan pembayaran telekonsultasi Anda paling lambat 1 jam sebelum telekonsultasi dimulai."
						}

						{status === "CANCELED_BY_GP" &&
							"Maaf, konsultasi Anda telah dibatalkan"
						}

						{status === "CANCELED_BY_SYSTEM" &&
							"Maaf, konsultasi Anda telah dibatalkan"
						}

						{status === "WAITING_FOR_PAYMENT" &&
							(
								<Fragment>
									<span>
										Rencana telekonsultasi telah terkonfirmasi. Segera selesaikan pembayaran
									</span>
									<LabelText
										color={'#2C528B'}
										fsize={14}
										fweight={600}
									>
										paling lambat 1 jam sebelum telekonsultasi dimulai.
									</LabelText>
								</Fragment>
							)
						}
					</LabelText>
				</ContainerDescription>

				<ContainerEndBtn>
					<ContainerBtn>
						{(status === "PROCESS_GP" || status === "CANCELED_BY_GP" || status === "CANCELED_BY_SYSTEM") && (
							<BtnSubmit
								onClick={redirectToMyConsultation}
								// disabled={loading || selectedScheduleUser.code === ""}
								minwidth="100%"
							>
								Lihat Konsultasi saya
							</BtnSubmit>
						)}

						{(status === "PROCESS_GP" || status === "WAITING_FOR_PAYMENT") && (
							<BtnPayment
								onClick={() => {
									status === "WAITING_FOR_PAYMENT" ?
										redirectToPaymentPage(appointmentDescription?.id) :
										null
								}}
								status={status}
								minwidth="100%"
							>
								Pembayaran
							</BtnPayment>
						)}
					</ContainerBtn>
				</ContainerEndBtn>
			</CustomFlex>
		</EndCallContainer>

	);
}

export const CallEndedMA = memo(_CallEndedMA);