import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexOneCustom } from '../../register/register';
import { Flex } from '../../../basic-elements/flex';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import { LabelText } from '../../create-consultation';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MaterialCustomIcon } from '../../../basic-elements/icon/material-icon';
import {
	CustomFlexRow,
	Icon
}
	from '../../../basic-elements/mobile-container/index';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { TextLabel, ContainerCheckValidation, InsideCheckValueContainer } from '../../register/step3/create-password';
import { ContainerErrorMessage, IconContainer, TextError } from '../../register/register';

const ContainerInside = styled(Flex)`
	margin-top: 80px;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-start;
`;

const ContainerFlex = styled(Flex)`
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 20px;
`;

const ContainerBtnCustom = styled(ContainerBtn)`
	box-sizing: border-box;
	padding: 10px 20px;
	position: absolute;
	bottom: 0;
`;

const ValidationContainer = styled(ContainerCheckValidation)`
	padding: 0px 20px;
`;

const ContainerInputPassword = styled(CustomFlexRow)`
	padding: 0px 20px;
`;

const CustomBtnSubmit = styled(BtnSubmit)`
	background: ${(props) => props.isDisabled ? "#C7C9D9" : "#61C7B5"};
	cursor: ${(props) => props.isDisabled ? "not-allowed" : "pointer"};
`;

function _UpdatePassword(props: any) {
	const {
		backStep,
		handleClickShowPassword,
		isPasswordValid,
		showPassword,
		handleMouseDownPassword,
		passwordData,
		handleKeyEnter,
		changePassword,
		errorMessage,
		onChange
	} = props;
	const isValid = passwordData.password !== "" && passwordData.password_confirmation !== "" && errorMessage && errorMessage.password === "" && errorMessage.password_confirmation === "";

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/change-password?step=step1')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Ubah Kata Sandi
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<ContainerFlex>
						<LabelText
							talign={"left"}
							fsize={14}
							fweight={600}
							margin={"5px 0px"}
						>
							Buat Sandi
						</LabelText>
						<LabelText
							talign={"left"}
							color={"#8F90A6"}
							fsize={14}
						>
							Kata Sandi digunakan untuk masuk ke aplikasi
						</LabelText>
					</ContainerFlex>

					<ContainerInputPassword>
						<CustomFormControl minwidth="100%">
							<LabelText
								talign={"left"}
								fsize={14}
								fweight={600}
								margin={"8px 0px"}
							>
								Masukkan Sandi
							</LabelText>
							<CustomTextField
								label="Masukkan Password"
								variant="outlined"
								value={passwordData.password}
								onKeyPress={handleKeyEnter}
								onChange={(e) => { e.persist(); onChange('password', e.target.value); }}
								type={showPassword.password ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => handleClickShowPassword("password")}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword.password ?
													<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
													:
													<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</CustomFormControl>
					</ContainerInputPassword>
					{passwordData.password !== "" && (
						<ValidationContainer>
							<InsideCheckValueContainer>
								{isPasswordValid.isMinimumEightChar && (
									<MaterialCustomIcon
										color="#61C7B5"
										icon="check_icon"
										width={25}
										fsize={18}
									/>
								)}
								<TextLabel
									activeChecked={isPasswordValid.isMinimumEightChar}>
									minimal 8 karakter
								</TextLabel>
							</InsideCheckValueContainer>

							<InsideCheckValueContainer>
								{isPasswordValid.isCapitalCharProvided && (
									<MaterialCustomIcon
										color="#61C7B5"
										icon="check_icon"
										width={25}
										fsize={18}
									/>
								)}
								<TextLabel
									activeChecked={isPasswordValid.isCapitalCharProvided}
								>
									Huruf Kapital
								</TextLabel>
							</InsideCheckValueContainer>

							<InsideCheckValueContainer>
								{isPasswordValid.isNumberProvided && (
									<MaterialCustomIcon
										color="#61C7B5"
										icon="check_icon"
										width={25}
										fsize={18}
									/>
								)}
								<TextLabel
									activeChecked={isPasswordValid.isNumberProvided}
								>
									Angka
								</TextLabel>
							</InsideCheckValueContainer>

							<InsideCheckValueContainer>
								{isPasswordValid.isSmalCharProvided && (
									<MaterialCustomIcon
										color="#61C7B5"
										icon="check_icon"
										width={25}
										fsize={18}
									/>
								)}
								<TextLabel
									activeChecked={isPasswordValid.isSmalCharProvided}
								>
									Huruf Kecil
								</TextLabel>
							</InsideCheckValueContainer>
						</ValidationContainer>
					)}

					<ContainerInputPassword>
						<CustomFormControl minwidth="100%">
							<CustomTextField
								label="Masukkan Kembali Password"
								variant="outlined"
								onKeyPress={handleKeyEnter}
								value={passwordData.password_confirmation}
								onChange={(e) => { e.persist(); onChange('password_confirmation', e.target.value); }}
								type={showPassword.password_confirmation ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => handleClickShowPassword("password_confirmation")}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword.password_confirmation ?
													<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
													:
													<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<ContainerErrorMessage error={errorMessage && errorMessage["password_confirmation"] !== ""}>
								<IconContainer icon={"error_outline_rounded"} />
								<TextError>{errorMessage["password_confirmation"]}</TextError>
							</ContainerErrorMessage>
						</CustomFormControl>
					</ContainerInputPassword>

					<ContainerBtnCustom>
						<CustomBtnSubmit
							disabled={!isValid}
							isDisabled={!isValid}
							onClick={changePassword}
							minwidth={"100%"}
						>
							Lanjutkan
						</CustomBtnSubmit>
					</ContainerBtnCustom>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const UpdatePassword = memo(_UpdatePassword);