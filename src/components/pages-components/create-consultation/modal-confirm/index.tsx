import { memo } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexRowCenter, Flex } from '../../../basic-elements/flex';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { ImageLogo } from '../../../navbar/navbar';
import CallMa from '../../../../assets/image/callMA.png';
import { FlexMTop } from '../../detail-doctor/detail';

const CustomModal = styled(Modal)`
	display: flex;
    align-items: center;
    justify-content: center;
	outline: none;
	border: none;
`;

const InsideModal = styled.div`
	background: #fff;
	max-width: 300px;
	height: auto;
	padding: 20px;
	border-radius: 10px;
`;

const TextTitle = styled.div`
	color: #333333;
	text-align: center;
	font-weight: 600;
	font-size: 14px;
	margin-bottom: 20px;
`;

const DescriptionText = styled.div`
	font-weight: normal;
	font-size: 14px;
	white-space: pre-line;
	color: #828282;
	line-height: 1.6;
	margin-bottom: 10px;
`;

const TextLabel = styled.div`
	font-weight: normal;
	font-size: 14px;
	color: ${(props) => props.isSection ? '#6B7588' : '#3A3A3C'} ;
	padding: 5px 0px;
	margin-left: ${(props) => props.mleft}px;
`;

const CustomBtn = styled(BtnSubmit)`
	padding: 10px;
	width: 100%;
	background: ${(props) => props.bground};
	color: ${(props) => props.color};
	border: ${(props) => props.border};
`;

const ContainerFlex = styled(Flex)`
	margin-top: 20px;
`;

const CustomParagraph = styled.div`
	text-align: center;
	color: #8F90A6;
	font-weight: ${(props) => props.fweight};
	font-size: 14px;
	line-height: 1.6;
`;

const ContentInside = styled.div`
	text-align: center;
	width: 100%;
	box-sizing: border-box;
`;

interface IModalProps {
	open: boolean;
	handleModal(open: boolean): void;
	onHandleAppointment(): void
}

function _ModalConfirmAppointment(props: IModalProps) {
	const { open, handleModal, onHandleAppointment } = props;

	return (
		<CustomModal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={() => handleModal(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<InsideModal>
					<ContentInside>
						<FlexRowCenter>
							<ImageLogo
								src={CallMa}
								height={194}
								width={194}
							/>
						</FlexRowCenter>

						<ContainerFlex>
							<CustomParagraph>
								Anda akan terhubung dengan Medical Advisor AlteaCare untuk verifikasi identitas diri dan konfirmasi rencana telekonsultasi.
							</CustomParagraph>
							<CustomParagraph fweight={"bold"}>
								Persiapkan KTP dan hasil pemeriksaan penunjang (laboratorium, radiologi, dll) yang berkaitan dengan keluhan Anda saat ini.
							</CustomParagraph>
						</ContainerFlex>

						<ContainerFlex>
							<CustomParagraph>
								Pastikan ketersediaan baterai dan Koneksi Internet Anda agar proses ini dapat berjalan dengan lancar.
							</CustomParagraph>
							<CustomParagraph fweight={"bold"}>
								Layanan Medical Advisor ini GRATIS
							</CustomParagraph>
						</ContainerFlex>

						<FlexMTop mtop={20}>
							<ContainerBtn>
								<BtnSubmit
									minwidth="100%"
									onClick={onHandleAppointment}
								>
									Saya Mengerti, Sambungkan
								</BtnSubmit>
							</ContainerBtn>
						</FlexMTop>
					</ContentInside>
				</InsideModal>
			</Fade>
		</CustomModal>
	);
}

export const ModalConfirmAppointment = memo(_ModalConfirmAppointment);