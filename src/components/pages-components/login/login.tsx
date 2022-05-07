import { memo, ChangeEvent, MouseEvent, Fragment } from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { ImageLogo } from '../../navbar/navbar';
import { FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import { Spinner } from '../../spinner/index';
import { IDataDoctorDetail } from '../../../data/services/alteaCMS/IAlteaCMS';
import {
	ContainerLogin,
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	ContainerLogo,
	CustomFlexRow,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Footer } from '../../footer/footer';
import LogoAltea from '../../../assets/image/alteacare_logo.svg';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { isMobile } from '../../../data/global/function';

// const CustomInput = styled(Input)`
// 	background: #fff;
// 	border: 1px solid #DDE5E9;
// 	box-sizing: border-box;
// 	border-radius: 5px;
// 	padding: 8px;
// 	z-index: 5;
// 	&.MuiInput-underline:hover:not(.Mui-disabled):before {
// 		border-bottom: none !important;
// 	}
// 	&.MuiInput-underline:before {
// 	border-bottom: none !important;
// 	}

// 	&.MuiInput-underline:after {
// 		border-bottom: none !important;
// 	}
// `;

// const CustomInputLabel = styled(InputLabel)`
// 	padding: 10px;
// 	color:#C7C9D9;
// 	z-index: 999;
// 	&.MuiInputLabel-shrink {
// 		transform: translate(0, -5.5px) scale(0.75);
// 		transform-origin: top left;
// 		padding-left: 3px;
// 	}
// 	&.MuiFormLabel-root.Mui-focused {
//     	color: #C7C9D9 !important
// 	}
// `;

export const CustomFormControl = styled(FormControl)`
	min-width: ${(props) => props.minwidth};
	margin-top: 20px;
	text-align: ${(props) => props.talign};
`;

export const CustomTextField = styled(TextField)`
	background: #fff !important;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	color:#C7C9D9 !important;
	.MuiOutlinedInput-root {
		fieldset {
			border-color: transparent !important;
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

const FlexRowRight = styled(FlexRow)`
	justify-content: flex-end;
	padding: 15px;
`;

const ContainerForgotPassword = styled.div`
	text-align: right;
	color: #3868B0;
	cursor: pointer;
`;

export const ContainerBtn = styled.div`
	width: 100%;
	height: auto;
`;

export const BtnSubmit = styled.button`
	background: #61C7B5;
	cursor: pointer;
	border-radius: 8px;
	padding: 20px;
	color: #fff;
	border: none;
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	}
`;

const ContainerRedirectRegister = styled.div`
	font-size: 14px;
	color: #3A3A3C;
	margin-top: 14px;
`;

const CustomContRedirectReg = styled(ContainerRedirectRegister)`
	font-size: 16px !important;
	margin: 20px !important;
`;

const RedirectRegister = styled.span`
	color: #3868B0;;
	margin-left: 5px;
	font-weight: bold;
	cursor: ${(props) => props.cursor}
`;

const CustomRowforHelpContainer = styled(FlexRowCenter)`
	margin-top: ${(props) => isMobile() ? 0 : props.isFromListDoctor}px;
`;

const ContainerText = styled.div`
	font-weight: ${(props) => props.fWeight};
	font-size: ${(props) => props.fSize}px;
	color: ${(props) => props.color};
	margin: ${(props) => props.margin}
`;

const ContainerSpinner = styled.div`
	position: absolute;
	right: 70px;
	top: 40%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

interface errorMessage {
	username: string;
	password: string;
}

export interface Ivalues {
	username: string;
	errorMessage: errorMessage;
	password: string;
	showPassword: boolean
}

export interface ILoginProps {
	handleChange(e: ChangeEvent<HTMLInputElement>, key: string): void;
	handleClickShowPassword(): void;
	handleMouseDownPassword(evt: MouseEvent<HTMLButtonElement>): void
	values: Ivalues;
	onSubmitLogin(): void;
	isFromListDoctor: boolean;
	redirectTo(path: string): void;
	loading: boolean;
	doctorDetail: IDataDoctorDetail;
}

function _LoginMainContent(props: ILoginProps) {

	const {
		values,
		redirectTo,
		isFromListDoctor,
		onSubmitLogin,
		handleChange,
		handleClickShowPassword,
		handleMouseDownPassword,
		loading,
		doctorDetail
	} = props;

	const isEmptyValue = values && (values.username === "" || values.password === "");
	const isInvalidUsername = values && values.errorMessage && values.errorMessage.username !== "";
	const isInvalidPassword = values && values.errorMessage && values.errorMessage.password !== "";
	const handleKeyEnter = (e) => {
		if (!isEmptyValue && !isInvalidUsername && !isInvalidPassword) {
			if (e.key === "Enter") {
				onSubmitLogin();
			}
		}
	}

	return (
		<Fragment>
			<ContainerLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomCardStyle variant="outlined">
								<NewCardContent>
									<CustomFlexRow>
										<ContainerLogo marginTop={isFromListDoctor ? 50 : 125}>
											{isFromListDoctor ?
												(
													<ImageLogo src={doctorDetail.photo?.url} height={180} width={180} />
												) : (
													<ImageLogo height={80} width={220} src={LogoAltea} />
												)}

										</ContainerLogo>
									</CustomFlexRow>

									{isFromListDoctor && (
										<Fragment>
											<CustomFlexRow>
												<ContainerText
													fWeight={"bold"}
													fSize={16}
													color={"#3A3A3C"}
													margin={"10px 0px 0px 0px"}
												>
													{doctorDetail?.name}
												</ContainerText>
											</CustomFlexRow>
											<CustomFlexRow>
												<CustomContRedirectReg>
													Belum Punya akun?
													<RedirectRegister
														cursor={"pointer"}
														onClick={() => redirectTo("/register")}
													>
														Daftar
													</RedirectRegister>
												</CustomContRedirectReg>
											</CustomFlexRow>
											<CustomFlexRow>
												<ContainerText
													fWeight={300}
													fSize={12}
													color={"#000000"}
												>
													Masuk untuk berkonsultasi dengan dokter spesialis
												</ContainerText>
											</CustomFlexRow>
										</Fragment>
									)}

									<form noValidate autoComplete="off">
										<CustomFlexRow>
											<CustomFormControl minwidth="90%">
												<CustomTextField
													errorColor={isInvalidUsername}
													label="Alamat Email/Nomor Ponsel"
													variant="outlined"
													onKeyPress={handleKeyEnter}
													value={values.username}
													type="text"
													error={isInvalidUsername}
													helperText={values &&
														values.errorMessage &&
														values.errorMessage.username
													}
													onChange={(e) => { e.persist(); handleChange(e, "username"); }}

												/>
											</CustomFormControl>
										</CustomFlexRow>

										<CustomFlexRow>
											<CustomFormControl minwidth="90%">
												<CustomTextField
													label="Kata Sandi"
													variant="outlined"
													onKeyPress={handleKeyEnter}
													errorColor={isInvalidPassword}
													value={values.password}
													error={isInvalidPassword}
													helperText={values &&
														values.errorMessage &&
														values.errorMessage.password}
													onChange={(e) => { e.persist(); handleChange(e, 'password'); }}
													type={values.showPassword ? 'text' : 'password'}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={handleClickShowPassword}
																	onMouseDown={handleMouseDownPassword}
																>
																	{values.showPassword ?
																		<Icon className="visibility_color" icon={'visibility'} id={'iconRef'} />
																		:
																		<Icon className="visibility_color" icon={'visibility_off'} id={'iconRef'} />}
																</IconButton>
															</InputAdornment>
														)
													}}
												/>
											</CustomFormControl>
										</CustomFlexRow>
									</form>

									<FlexRowRight>
										<ContainerForgotPassword
											onClick={() => redirectTo("/forgot-password")}
										>
											Lupa Kata sandi ?
										</ContainerForgotPassword>
									</FlexRowRight>

									<CustomFlexRow>
										<ContainerBtn>
											<BtnSubmit
												minwidth="90%"
												disabled={loading || isEmptyValue || isInvalidUsername || isInvalidPassword}
												onClick={onSubmitLogin}
											>
												Login
												{loading ? (
													<ContainerSpinner>
														<Spinner small color={"#61C7B5"} />
													</ContainerSpinner>
												) : null}
											</BtnSubmit>
										</ContainerBtn>
									</CustomFlexRow>

									{!isFromListDoctor && (
										<CustomFlexRow>
											<ContainerRedirectRegister>
												Belum Punya akun?
												<RedirectRegister
													cursor={"pointer"}
													onClick={() => redirectTo("/register")}
												>
													Daftar
												</RedirectRegister>
											</ContainerRedirectRegister>
										</CustomFlexRow>
									)}

									<CustomRowforHelpContainer
										isFromListDoctor={isFromListDoctor ? 0 : 100}
									>
										<ContainerRedirectRegister>
											Butuh Bantuan ?
										<RedirectRegister
												cursor={"pointer"}
												onClick={() => redirectTo("/blocks?type=contact")}
											>
												Hubungi Call Center AlteaCare
										</RedirectRegister>
										</ContainerRedirectRegister>
									</CustomRowforHelpContainer>

									<CustomFlexRow>
									</CustomFlexRow>
								</NewCardContent>
							</CustomCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</ContainerLogin>
		</Fragment >

	)
}

export const LoginMainContent = memo(_LoginMainContent);