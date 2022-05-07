import { memo } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexRowCenter, FlexRow, FlexOne } from '../../../basic-elements/flex';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../login/login';
import { IValueInput } from '../../../../pages/register/index';
import { formattedDate } from '../../../../data/global/function';

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

interface IModalProps {
	open: boolean;
	handleModal(open: boolean): void;
	data: IValueInput;
	birthCountryName: string;
	genderLabel: string;
	switchStep(step: number): void;
}

function _ModalPersonalData(props: IModalProps) {
	const { open, switchStep, handleModal, data, birthCountryName, genderLabel } = props;

	return (
		<div>
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
						<TextTitle id="transition-modal-title">Personal data review</TextTitle>
						<DescriptionText id="transition-modal-description">
							Personal data tidak dapat diubah, pastikan data yang telah di isi sudah benar. perubahan personal dapat diajukan dengan menghubungi customer service AlteaCare.
						</DescriptionText>

						<FlexRow>
							<FlexOne>
								<TextLabel isSection>
									Nama Lengkap
								</TextLabel>

							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel mleft={15}>
									{data.first_name} {" "} {data.last_name}
								</TextLabel>
							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel isSection>
									Tanggal Lahir
								</TextLabel>

							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel mleft={15}>
									{formattedDate(data.birth_date, "idn")}
								</TextLabel>
							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel isSection>
									Tempat Lahir
								</TextLabel>

							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel mleft={15}>
									{birthCountryName}, {data.birth_place}
								</TextLabel>
							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel isSection>
									Jenis Kelamin
								</TextLabel>

							</FlexOne>
						</FlexRow>

						<FlexRow>
							<FlexOne>
								<TextLabel mleft={15}>
									{genderLabel}
								</TextLabel>
							</FlexOne>
						</FlexRow>

						<FlexRowCenter>
							<CustomFormControl minwidth="100%" talign="center">
								<ContainerBtn>
									<CustomBtn
										onClick={() => { switchStep(3); handleModal(false); }}
										bground="#61C7B5"
										color="#fff"
									>
										Lanjutkan
									</CustomBtn>
								</ContainerBtn>
							</CustomFormControl>
						</FlexRowCenter>

						<FlexRowCenter>
							<CustomFormControl minwidth="100%" talign="center">
								<ContainerBtn>
									<CustomBtn
										onClick={() => handleModal(false)}
										bground="#fff"
										color="#61C7B5"
										border="1px solid #61C7B5"
									>
										Ubah Data Personal
									</CustomBtn>
								</ContainerBtn>
							</CustomFormControl>
						</FlexRowCenter>
					</InsideModal>
				</Fade>
			</CustomModal>
		</div>
	);
}

export const ModalPersonalData = memo(_ModalPersonalData);