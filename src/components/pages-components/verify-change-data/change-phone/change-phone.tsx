import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { FlexOneCustom } from '../../register/register';
import { CustomFormControl } from '../../login/login';
import { Flex } from '../../../basic-elements/flex';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomScroll from 'react-custom-scroll';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { TextareaAutosize } from '@material-ui/core';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';
import {
	ContainerErrorMessage,
	IconContainer,
	TextError,
} from '../../register/register';

import { FlexOne, FlexRow } from '../../../basic-elements/flex';
import { LabelText } from '../../create-consultation';

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 300px);
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 110px);
	};
`;

const FormControl = styled(CustomFormControl)`
	padding: 5px 20px;
	box-sizing: border-box;
`;

export const CustomTextField = styled(TextField)`
	background: #fff !important;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	color:#C7C9D9 !important;
	.MuiOutlinedInput-root {
		fieldset {
			border-color: #61C7B5 !important;
		}
		&:hover fieldset {
			border-color: #61C7B5 !important;
		}
		&.focused fieldset {
			border-color: #61C7B5 !important;
		}
  	}
	.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: #61C7B5 !important;
	}
	.MuiInputLabel-outlined {
		color: #C7C9D9 !important;
	};
	.MuiFormLabel-root.Mui-focused {
		color: #61C7B5 !important;
	}

	.MuiFormLabel-root.Mui-error {
		color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
	}
	.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
		border-color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
	}
`;

export const CustomFlexOne = styled(FlexOne)`
	text-align: ${props => props.textAlign};
	flex: ${(props => props.flex)};
`;

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 10px 20px;
	box-sizing: border-box;
`;

function _ChangePhone(props: any) {
	const {
		backStep,
		onChange,
		data,
		handleKeyEnter,
		onVerifyPhone,
		errorMessage,
		isDisabled
	} = props;

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/change-profile?type=changeProfile')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Verifikasi Nomor Telepon
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<LabelText
						color={"#3A3A3C"}
						fsize={14}
						margin={"15px 20px 0px"}
						fweight={600}
					>
						Ubah Data Kontak
					</LabelText>
					<CustomScroll flex="1" heightRelativeToParent={'calc(100vh - 20px)'}>
						<FormControl minwidth="100%">
							<CustomTextField
								label="Nomor Telepon"
								variant="outlined"
								value={data?.phone}
								onKeyPress={handleKeyEnter}
								type="number"
								onInput={(e) => {
									e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
								}}
								onChange={(e) => { e.persist(); onChange('phone', e.target.value); }}
								min={9}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<div>+62</div>
										</InputAdornment>
									)
								}}
							/>

							<ContainerErrorMessage error={errorMessage && errorMessage["phone"] !== ""}>
								<IconContainer icon={"error_outline_rounded"} />
								<TextError>{errorMessage["phone"]}</TextError>
							</ContainerErrorMessage>
						</FormControl>

						<CustomContainerBtn>
							<CustomFormControl minwidth="100%" talign="center">
								<ContainerBtn>
									<BtnSubmit
										onKeyPress={handleKeyEnter}
										disabled={isDisabled}
										onClick={onVerifyPhone}
										minwidth="100%"
									>
										Verifikasi
								</BtnSubmit>
								</ContainerBtn>
							</CustomFormControl>
						</CustomContainerBtn>
					</CustomScroll>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const ChangePhone = memo(_ChangePhone);