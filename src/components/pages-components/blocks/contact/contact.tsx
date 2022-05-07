import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { FlexOneCustom } from '../../register/register';
import { CustomFormControl } from '../../login/login';
import { map } from 'lodash';
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

import { MenuListItem } from '../../../basic-elements/menu-list/list-menu';
import MaterialIcon from '@material/react-material-icon';
import { FlexOne, FlexRow } from '../../../basic-elements/flex';
import { LabelText } from '../../create-consultation';
import { ImageLogo } from '../../../navbar/navbar';
import CallCenter from '../../../../assets/image/icons/call_center.svg'
import { FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';

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

const TextBox = styled(TextareaAutosize)`
	background: #fff !important;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	min-height: 100px;
	padding: 10px;
	color: black !important;
	border-radius: 5px !important;
	border-color: #61C7B5 !important;
	&:focus {
		border-color: #61C7B5 !important;
	}

`;

const ContainerFilter = styled.div`
	background: #FFFFFF;
	padding: 0px 5px;
	border: 1px solid #61C7B5;
	box-sizing: border-box;
	border-radius: 5px;
	width: 100%;
	margin-top: 0px;
`;

const TextLabel = styled.div`
	font-size: 14px;
	color: #3A3A3C;
`;

const FlexRowFullWidth = styled(FlexRow)`
	width: 100%;
	padding: 8px 0px;
	justify-content: space-between;
`;

export const CustomFlexOne = styled(FlexOne)`
	text-align: ${props => props.textAlign};
	flex: ${(props => props.flex)};
`;

const CustomContainerBtn = styled(CustomFlexRow)`
	position: relative;
	width: 100%;
	padding: 0px 20px;
	box-sizing: border-box;
`;

const ContainerInfo = styled(Flex)`
	background: #fff;
	position: absolute;
	justify-content: flex-start;
	align-items: flex-start;
	bottom: 0;
	padding: 20px;
	width: 100%;
	z-index: 999;
	box-sizing: border-box;
`;

const ContainerPhoneInfo = styled(FlexRow)`
	width: 100%;
	text-align: left;
`;

const ContainerBoxPhone = styled(FlexRow)`
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #61C7B5;
	cursor: pointer;
`;


function _ContactInside(props: any) {
	const {
		centralInformation,
		backStep,
		messageType,
		onChange,
		dataContact,
		handleKeyEnter,
		datalist,
		anchorEl,
		handleclose,
		handleclick,
		handleClickSelected,
		labelName,
		isDisabled,
		onSendMessage,
		errorMessage
	} = props;

	const onClickWa = () => {

		const anchorEl = document.createElement('a');
		const phoneNumber = centralInformation?.content?.phone.split("+")[1];
		const url = `https://wa.me/${phoneNumber}`
		anchorEl.href = url;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener';
		// setTimeout is needed in order to open files in iOS Safari.
		setTimeout(() => {
			anchorEl.click();
		});
	};

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/profile')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Kontak AlteaCare
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<CustomScroll flex="1" heightRelativeToParent={'calc(100vh - 20px)'}>
						<FormControl minwidth="100%">
							<CustomTextField
								label="Isi Nama Anda"
								value={dataContact?.name}
								onKeyPress={handleKeyEnter}
								variant="outlined"
								errorColor={errorMessage?.name === ""}
								onChange={
									(e) => {
										e.persist();
										onChange("name", e.target.value)
									}}
								type="text"
							/>
							<ContainerErrorMessage error={errorMessage?.name !== ""}>
								<IconContainer icon={"error_outline_rounded"} />
								<TextError>{errorMessage["name"]}</TextError>
							</ContainerErrorMessage>
						</FormControl>

						<FormControl minwidth="100%">
							<CustomTextField
								label="Email"
								onKeyPress={handleKeyEnter}
								variant="outlined"
								value={dataContact?.email}
								type="text"
								onChange={(e) => { e.persist(); onChange('email', e.target.value); }}
							/>
							<ContainerErrorMessage error={errorMessage && errorMessage["email"] !== ""}>
								<IconContainer icon={"error_outline_rounded"} />
								<TextError>{errorMessage["email"]}</TextError>
							</ContainerErrorMessage>
						</FormControl>

						<FormControl minwidth="100%">
							<CustomTextField
								label="Nomor Telepon"
								variant="outlined"
								value={dataContact?.phone}
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

						<FormControl minwidth="100%">
							<ContainerFilter>
								<MenuListItem
									datalist={datalist}
									anchorEl={anchorEl}
									handleclose={handleclose}
									handleclick={handleclick}
									handleClickSelected={handleClickSelected}
									fieldName={"name"}
									minWidthListItem={320}
									{...props}
								>
									<FlexRowFullWidth>
										<CustomFlexOne textAlign={'left'}>
											<TextLabel>{labelName}</TextLabel>
										</CustomFlexOne>

										<CustomFlexOne flex={0} textAlign={'right'}>
											<MaterialIcon icon={'keyboard_arrow_down'} />
										</CustomFlexOne>
									</FlexRowFullWidth>
								</MenuListItem>
							</ContainerFilter>
						</FormControl>

						<FormControl minwidth="100%">
							<TextBox
								placeholder="Tulis Pesan disini"
								value={dataContact?.message}
								variant="outlined"
								onKeyPress={handleKeyEnter}
								onChange={
									(e) => {
										e.persist();
										onChange("message", e.target.value)
									}}
								type="text"
							/>
							<ContainerErrorMessage error={errorMessage?.message !== ""}>
								<IconContainer icon={"error_outline_rounded"} />
								<TextError>{errorMessage["message"]}</TextError>
							</ContainerErrorMessage>
						</FormControl>

						<CustomContainerBtn>
							<CustomFormControl minwidth="100%" talign="center">
								<ContainerBtn>
									<BtnSubmit
										onKeyPress={handleKeyEnter}
										disabled={isDisabled}
										onClick={onSendMessage}
										minwidth="100%"
									>
										Kirim Pesan
								</BtnSubmit>
								</ContainerBtn>
							</CustomFormControl>
						</CustomContainerBtn>
						<ContainerInfo>
							<LabelText
								fsize={14}
								color={"#2C528B"}
								fweight={600}
							>
								{centralInformation?.title}
							</LabelText>

							<LabelText
								fsize={14}
								color={"#3E8CB9"}
								margin={"5px 0px"}
							>
								Alamat Email: {centralInformation?.content?.email}
							</LabelText>

							<FlexRowSpaceBetween>
								<ContainerPhoneInfo>
									<ImageLogo
										src={CallCenter}
									/>
									<LabelText
										fsize={14}
										margin={"0px 5px"}
										lheight={1.4}
										color={"#3E8CB9"}
									>
										Hubungi Via WhatsApp {centralInformation?.content?.phone}
									</LabelText>
								</ContainerPhoneInfo>

								<ContainerBoxPhone onClick={onClickWa}>
									<Icon style={{ marginRight: 10 }} icon={"phone"} fsize={25} color={"#61C7B5"} />
									<LabelText
										fsize={14}
										color={"#61C7B5"}
									>
										Telepon
									</LabelText>
								</ContainerBoxPhone>

							</FlexRowSpaceBetween>
						</ContainerInfo>
					</CustomScroll>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const ContactInside = memo(_ContactInside);