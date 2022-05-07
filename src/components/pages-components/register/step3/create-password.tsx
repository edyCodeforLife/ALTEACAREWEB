import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	TextLabelRegister,
} from '../register';
import {
	CustomFlexRow,
	Icon
}
	from '../../../basic-elements/mobile-container/index';
import { MaterialCustomIcon } from '../../../../components/basic-elements/icon/material-icon';
import { ContainerErrorMessage, IconContainer, TextError } from '../register';
import { IContactDataProps } from '../step1/contact-data';

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	bottom: 0;
	width: 90%;
`;

export const TextLabel = styled.div`
	color: #8F90A6;
	font-size: 12px;
	margin-left: ${(props) => props.activeChecked ? '0px' : '25px'};
`;

export const ContainerCheckValidation = styled.div`
	width: 100%;
	padding: 5px;
`;

export const InsideCheckValueContainer = styled(CustomFlexRow)`
	justify-content: flex-start;
`;

export interface ICreatePasswordProps extends IContactDataProps {
	showPassword: boolean;
	isPasswordValid: object;
	handleClickShowPassword(fieldId: string): void;
	handleMouseDownPassword(): void;
}

function _CreatePassword(props: any) {
	const { showPassword, switchStep, isPasswordValid, errorMessage, onChange, data, handleClickShowPassword, handleMouseDownPassword } = props;
	const isValid = data.password !== "" && data.password_confirmation !== "" && errorMessage && errorMessage.password === "" && errorMessage.password_confirmation === "";

	const handleKeyEnter = (e) => {
		if (isValid) {
			if (e.key === "Enter") {
				switchStep(4);
			}
		}
	}

	return (
		<Fragment>
			<FlexRow>
				<FlexOne>
					<TextLabelRegister fweight="bold">
						Buat Password
					</TextLabelRegister>
				</FlexOne>
			</FlexRow>
			<FlexRow>
				<FlexOne>
					<TextLabelRegister fweight="normal">
						Password digunakan untuk masuk ke aplikasi
					</TextLabelRegister>
				</FlexOne>
			</FlexRow>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Masukkan Password"
						variant="outlined"
						value={data.password}
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
					{/* <ContainerErrorMessage error={errorMessage && errorMessage["password"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["password"]}</TextError>
					</ContainerErrorMessage> */}
				</CustomFormControl>
			</CustomFlexRow>


			{data.password !== "" && (
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
						value={data.password_confirmation}
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
			</CustomFlexRow>

			<CustomContainerBtn>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							disabled={!isValid}
							onKeyPress={handleKeyEnter}
							onClick={() => { switchStep(4); }}
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

export const CreatePassword = memo(_CreatePassword);