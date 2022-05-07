import { Fragment, memo, useState } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	TextTitle,
} from '../step1/step1';
import {
	CustomFlexRow,
	Icon
}
	from '../../../basic-elements/mobile-container/index';
import { IValueInput } from '../../../../pages/register/index';
import { MaterialCustomIcon } from '../../../../components/basic-elements/icon/material-icon';
import { ContainerErrorMessage, IconContainer, TextError } from '../../register/register';
import { IStateForgotPassword } from '../../../../pages/forgot-password/index';

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	bottom: 0;
	width: 90%;
`;

const TextLabel = styled.div`
	color: #8F90A6;
	font-size: 12px;
	margin-left: ${(props) => props.activeChecked ? '0px' : '25px'};
`;

const ContainerCheckValidation = styled.div`
	width: 100%;
	padding: 5px;
`;

const InsideCheckValueContainer = styled(CustomFlexRow)`
	justify-content: flex-start;
`;

export interface ICreatePasswordProps {
	showPassword: boolean;
	isPasswordValid: object;
	handleClickShowPassword(fieldId: string): void;
	handleMouseDownPassword(): void;
	data: IStateForgotPassword;
	onChange(fieldId: string, value: any, error?: any): void;
	errorMessage: IStateForgotPassword;
	changePassword(): void;
}

function _Step3(props: any) {
	const { showPassword, changePassword, isPasswordValid, errorMessage, onChange, data, handleClickShowPassword, handleMouseDownPassword } = props;
	const isValid = data.newPassword !== "" && data.newPassword_confirmation !== "" && errorMessage && errorMessage.newPassword === "" && errorMessage.newPassword_confirmation === "";

	const handleKeyEnter = (e) => {
		if (isValid) {
			if (e.key === "Enter") {
				changePassword();
			}
		}
	}

	return (
		<Fragment>
			<FlexRow>
				<FlexOne>
					<TextTitle fweight="bold">
						Buat Ulang Kata Sandi
					</TextTitle>
				</FlexOne>
			</FlexRow>
			<FlexRow>
				<FlexOne>
					<TextTitle fweight="normal">
						Kami tidak menyarankan untuk menggunakan tanggal lahir sebagai kata sandi
					</TextTitle>
				</FlexOne>
			</FlexRow>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Masukkan Password"
						variant="outlined"
						value={data.newPassword}
						onKeyPress={handleKeyEnter}
						onChange={(e) => { e.persist(); onChange('newPassword', e.target.value); }}
						type={showPassword.newPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => handleClickShowPassword("newPassword")}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword.newPassword ?
											<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
											:
											<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<ContainerErrorMessage error={errorMessage && errorMessage["newPassword"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["newPassword"]}</TextError>
					</ContainerErrorMessage>
				</CustomFormControl>
			</CustomFlexRow>


			{data.newPassword !== "" && (
				<ContainerCheckValidation>

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
				</ContainerCheckValidation>
			)}

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Masukkan Kembali Password"
						variant="outlined"
						onKeyPress={handleKeyEnter}
						value={data.newPassword_confirmation}
						onChange={(e) => { e.persist(); onChange('newPassword_confirmation', e.target.value); }}
						type={showPassword.newPassword_confirmation ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => handleClickShowPassword("newPassword_confirmation")}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword.newPassword_confirmation ?
											<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
											:
											<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<ContainerErrorMessage error={errorMessage && errorMessage["newPassword_confirmation"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["newPassword_confirmation"]}</TextError>
					</ContainerErrorMessage>
				</CustomFormControl>
			</CustomFlexRow>

			<CustomContainerBtn>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							disabled={!isValid}
							onKeyPress={handleKeyEnter}
							onClick={() => { changePassword(); }}
							minwidth="100%"
						>
							Lanjutkan
						</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomContainerBtn>
		</Fragment>
	);
}

export const Step3 = memo(_Step3);