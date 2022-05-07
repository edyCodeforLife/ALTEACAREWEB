import { memo, useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { CustomFlexRowCenter } from '../../index';
import { LabelText } from '../../../create-consultation/index';
import EmptyDoctorImage from '../../../../../assets/image/icons/empty_spesialis.svg';
import { Flex } from '../../../../basic-elements/flex';
import { CustomImageLogo, CustomFlex, ContainerTitle, ContainerDescription } from '../../loading-call/loading-MA';
import { ContainerBtn, BtnSubmit } from '../../../login/login';
import { ContainerBtnNext } from '../../../create-consultation/index'

export const TimerStyle = styled.div`
	color: #2C528B;
	margin-top: 25px;
`;

const ContainerImg = styled.div`
	background: transparent;
    width: 200px;
    height: 200px;
    position: relative;
`;

const ImageAdjust = styled(CustomImageLogo)`
	opacity: 1;
`;

export const ContainerEndBtn = styled(ContainerBtnNext)`
	position: relative;
	padding: 0px;
	margin-top: 20px;
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

const ContainerInfo = styled.div`
	margin-top: 20px;
	cursor: pointer;
`;

const AdviseContainer = styled.div`
	position: absolute;
	bottom: 0;
`;

function _CallEndedSpecialist(props: any) {
	const { appointmentDescription, timerLastTime, handleModal, redirectToDetailConsultation } = props;

	return (

		<EndCallContainer>
			<CustomFlex>
				<ContainerTitle>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={400}
					>
						Telekonsultasi Berakhir
					</LabelText>
					<TimerStyle>
						{timerLastTime}
					</TimerStyle>
				</ContainerTitle>

				<Flex>
					<ContainerImg>
						<ImageAdjust
							src={appointmentDescription?.doctor.photo.url ?? EmptyDoctorImage}
							height={200}
							width={200}
						/>
					</ContainerImg>
				</Flex>

				<ContainerDescription>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={480}
						talign={"center"}
						lheight={1.6}
					>
						Untuk melihat ringkasan medis, silahkan Buka
						<LabelText
							color={"#2C528B"}
							fweight={680}
						>
							Catatan Dokter
						</LabelText>
					</LabelText>
				</ContainerDescription>

				<ContainerEndBtn>
					<ContainerBtn>
						<BtnSubmit
							onClick={() => redirectToDetailConsultation(appointmentDescription?.id)}
							// disabled={loading || selectedScheduleUser.code === ""}
							minwidth="100%"
						>
							Lihat Catatan Dokter
						</BtnSubmit>
					</ContainerBtn>
				</ContainerEndBtn>

				<ContainerInfo onClick={() => handleModal(true)}>
					<LabelText
						fsize={14}
						color={"#61C7B5"}
						fweight={680}
						style={{ borderBottom: '3px solid #61C7B5' }}
					>
						Info Pemesanan Obat
					</LabelText>
				</ContainerInfo>

				<AdviseContainer>
					<LabelText
						fsize={12}
						color={"#6B7588"}
						fweight={480}
					>
						Selain ikuti anjuran dokter, jangan lupa tebus resep obat Anda.
					</LabelText>
				</AdviseContainer>

			</CustomFlex>
		</EndCallContainer>

	);
}

export const CallEndedSpecialist = memo(_CallEndedSpecialist);