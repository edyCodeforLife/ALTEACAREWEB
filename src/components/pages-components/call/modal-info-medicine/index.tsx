import { memo } from 'react';
import styled from 'styled-components';
import { Radio, Fade, Backdrop, Modal } from '@material-ui/core'
import { Flex, FlexRow, FlexRowCenter } from '../../../basic-elements/flex';
import { LabelText } from '../../create-consultation/index';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../login/login';
import { dataFlowMedicineDelivery, IDataFlowMedicine } from './medicine-data';
import { ImageLogo } from '../../../navbar/navbar';
import { map } from 'lodash';

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
	width: 300px;
	height: auto;
	padding: 20px;
	border-radius: 10px;
`;

const CustomBtn = styled(BtnSubmit)`
	padding: 10px;
	width: 100%;
	background: ${(props) => props.bground};
	color: ${(props) => props.color};
	border: ${(props) => props.border};
`;

export const CustomRadioBtn = styled(Radio)`
	&.MuiRadio-colorSecondary.Mui-checked {
		color: #61C7B5;
	}
`;

export const ContainerDescription = styled.div`
	box-sizing: border-box;
	padding: 15px;
	width: 100%;
	white-space: pre-line;
	font-size: 14px;
	text-align: left;
	color: #6B7588;
	line-height: 1.2;
`;

interface IModalProps {
	open: boolean;
	handleModal(open: boolean): void;
}

function _ModalInfoMedicine(props: IModalProps) {
	const { open, handleModal } = props;

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
						<Flex>
							<FlexRowCenter>
								<LabelText
									color={"#2C528B"}
									fsize={14}
									fweight={600}
									margin={"0px 0px 10px 0px"}
								>
									Info Pemesanan Obat
								</LabelText>
							</FlexRowCenter>

							{map(dataFlowMedicineDelivery, (item: IDataFlowMedicine, idx: number) => {
								return (
									<FlexRow key={idx}>
										<ImageLogo
											src={item.imagePath}
											width={80}
											height={80}
										/>
										<ContainerDescription>
											{item.description}
										</ContainerDescription>
									</FlexRow>)
							})}

							<FlexRowCenter>
								<CustomFormControl minwidth="100%" talign="center">
									<ContainerBtn>
										<CustomBtn
											onClick={() => { handleModal(false) }}
											bground="#61C7B5"
											color="#fff"
										>
											Ya, Saya Mengerti
										</CustomBtn>
									</ContainerBtn>
								</CustomFormControl>
							</FlexRowCenter>
						</Flex>
					</InsideModal>
				</Fade>
			</CustomModal>
		</div>
	);
}

export const ModalInfoMedicine = memo(_ModalInfoMedicine);