import { memo, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Radio, Fade, Backdrop, Modal } from '@material-ui/core'
import { FlexRow, Flex, FlexRowCenter } from '../../../basic-elements/flex';
import { RadioGroup } from '@material-ui/core';
import { LabelText, CustomFormControlLabel } from '../../create-consultation/index';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../login/login';

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
	width: 270px;
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

export const CustomBtn = styled(BtnSubmit)`
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

interface IModalProps {
	open: boolean;
	handleModal(open: boolean): void;
	onChangeRadio(e: ChangeEvent): void;
	sortOption: string;
	changeSort(): void;
}

function _ModalSort(props: IModalProps) {
	const { open, handleModal, onChangeRadio, sortOption, changeSort } = props;

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
							<FlexRow>
								<LabelText
									color={"#2C528B"}
									fsize={14}
									fweight={600}
									margin={"0px 0px 10px 0px"}
								>
									Urutkan
								</LabelText>
							</FlexRow>
							<RadioGroup
								aria-label="consultation_method"
								name="consultation"
								value={sortOption}
								onChange={onChangeRadio}
							>
								<CustomFormControlLabel
									value="NEWEST"
									control={<CustomRadioBtn />}
									label={(
										<FlexRow>
											<LabelText
												color={"#3A3A3C"}
												fsize={14}
												fweight={400}
												margin={"0px 0px 0px 5px"}
											>
												Paling Terbaru
											</LabelText>
										</FlexRow>)}
								/>
								<CustomFormControlLabel
									value="OLDEST"
									control={<CustomRadioBtn />}
									label={(
										<FlexRow>
											<LabelText
												color={"#3A3A3C"}
												fsize={14}
												fweight={400}
												margin={"0px 0px 0px 5px"}
											>
												Paling Terlama
											</LabelText>
										</FlexRow>)}
								/>
							</RadioGroup>
							<FlexRowCenter>
								<CustomFormControl minwidth="100%" talign="center">
									<ContainerBtn>
										<CustomBtn
											onClick={() => { changeSort(); handleModal(false) }}
											bground="#61C7B5"
											color="#fff"
										>
											Pilih
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

export const ModalSort = memo(_ModalSort);