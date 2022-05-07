import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexOne, FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import {
	ContainerLogin,
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';

import { CustomFlexOne } from '../list-doctor/searchandfilter/filter/filter';
import { Footer } from '../../footer/footer';
import { CustomFormControl } from '../login/login';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import MaterialIcon from '@material/react-material-icon';
import { PersonalData } from './step2/personal-data';
import { ContactData } from './step1/contact-data';
import { CreatePassword } from './step3/create-password';
import { TermsAndConditions } from './step4/termsandconditions';
import { VerifyOTPRegistration } from './step5/verifyOTP';
import { ChangeEmail } from './step6/changeEmail';
import { ChangePhone } from './step7/changePhone';
import { LastStepRegister } from './step8/lastStep';
import AlteaLogo from '../../../assets/image/alteacare_logo.svg';
import { ImageLogo } from '../../navbar/navbar';
import { isMobile } from '../../../data/global/function';
import { IRegisterProps } from '../../../pages/register/screen';

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	height: calc(100vh - 120px);
	overflow: hidden;
	@media (max-width: 768px) {
		height: ${(props) => props.step === 4 ? '100%' : 'calc(100vh - 50px)'};
	};
`;

const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
`;

export const CustomConLogin = styled(ContainerLogin)`
	position: relative !important;
`

export const HeaderRegister = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 40px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 10px;
`;

export const FlexOneCustom = styled(CustomFlexOne)`
	flex-grow: 0 !important;
	flex: ${(props) => props.flex};
`;

const ContainerContent = styled.div`
	width: auto;
	height: 100%;
	padding-top: ${(props) => props.paddingtop}px;
	padding-left: 20px;
	padding-right: 20px;
	box-sizing: border-box;
	text-align: left;
	position: relative;
`;

const TextStep = styled.div`
	margin-bottom: 15px;
`;

export const TextLabelRegister = styled.div`
	font-style: normal;
	line-height: 17px;
	font-weight: ${(props) => props.fweight};
	font-size: 14px;
	color: #3A3A3C;
`;

export const ContainerMenuList = styled(CustomFormControl)`
	cursor: pointer;
	background: #fff;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	padding: 8px;
	font-size: 16px;
	height: 100%;
`;

export const MaterialCustomIcon = styled(MaterialIcon)`
	color:#C7C9D9 !important;
`;

export const TextLabel = styled.div`
	font-size: 16px;
	color: ${(props) => props.selected === props.placeholder ? '#C7C9D9' : 'black'}!important;
	line-height: 19px;
	text-transform: none;
	font-family: 'Inter Regular', sans-serif;
	cursor: pointer;
	margin-top: 4px;
`;

export const InsideMenuList = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const ContainerErrorMessage = styled.div`
	padding: 3px;
	line-height: 17px;
	justify-content: flex-start;
	display: ${(props) => props.error ? "flex" : "none"};
`;

const ContainerImgLogo = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: 18px;
	box-sizing: border-box;
`;

export const IconContainer = styled(MaterialIcon)`
	font-size: 16px;
	width: 8%;
	color: red;
`;

export const ContainerHeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
`;

export const TextError = styled.span`
	color: red;
	font-size: 12px;
`;

function _RegisterContent(props: IRegisterProps) {
	const {
		dataCountry,
		backStep,
		dataGender,
		genderLabel,
		loading,
		handleClickGender,
		data,
		birthCountryName,
		handleClickCountry,
		onChange,
		onClickShoworValidate,
		errorMessage,
		open,
		handleModal,
		switchStep,
		step,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		isPasswordValid,
		registerUser,
		resendOTP,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle,
		seconds,
		activeCountdown,
		onUpdateEmail,
		termsAndConditionData,
		validateContactData,
		activeFlag,
		onUpdatePhone,
		changeFlag
	} = props;

	const switchRenderContent = (step) => {
		switch (step) {
			case 1:
				return (<ContactData
					{
					...{
						onChange,
						data,
						errorMessage,
						switchStep,
						validateContactData
					}
					}
				/>);
			case 2:
				return (<PersonalData
					{
					...{
						open,
						handleModal,
						data,
						birthCountryName,
						genderLabel,
						onChange,
						errorMessage,
						loading,
						dataCountry,
						handleClickCountry,
						onClickShoworValidate,
						dataGender,
						handleClickGender,
						switchStep
					}
					}
				/>);
			case 3:
				return (<CreatePassword
					{
					...{
						showPassword,
						data,
						onChange,
						errorMessage,
						handleClickShowPassword,
						handleMouseDownPassword,
						isPasswordValid,
						switchStep
					}
					}

				/>);
			case 4:
				return (<TermsAndConditions
					{
					...{
						registerUser,
						termsAndConditionData
					}
					}

				/>)
			case 5:
				return (<VerifyOTPRegistration
					{
					...{
						resendOTP,
						errorMessage,
						onProcess,
						onContinue,
						onChangeCode,
						codeInputHandle,
						activeCountdown,
						seconds,
						onChange,
						data,
						switchStep,
						activeFlag,
						changeFlag
					}
					}
				/>
				)
			case 6:
				return (<ChangeEmail
					{
					...{
						onChange,
						data,
						errorMessage,
						switchStep,
						onUpdateEmail
					}
					}
				/>)
			case 7:
				return (<ChangePhone
					{
					...{
						onChange,
						data,
						errorMessage,
						switchStep,
						onUpdatePhone
					}
					}
				/>)
			case 8:
				return (<LastStepRegister
					{...props}

				/>)
			default:
				return (<PersonalData
					{
					...{
						open,
						handleModal,
						data,
						birthCountryName,
						genderLabel,
						onChange,
						errorMessage,
						loading,
						dataCountry,
						handleClickCountry,
						onClickShoworValidate,
						dataGender,
						handleClickGender,
						switchStep
					}
					}
				/>);
		}
	}

	const switchTitle = (step) => {
		switch (step) {
			case 1:
				return "Daftar";
			case 2:
				return "Daftar";
			case 3:
				return 'Buat Password';
			case 4:
				return null;
			case 5:
				return activeFlag === "email" ? "Verifikasi Email" : "Verifikasi Nomor Ponsel";
			case 6:
				return "Verifikasi Email";
			case 8:
				return "Verifikasi Nomor Ponsel";
			default:
				return "Daftar";
		}
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomCardStyle variant="outlined">
								<ContainerCardContent step={step}>
									<CustomScroll flex="1" heightRelativeToParent={step !== 4 ? '100%' : null}>
										{step !== 8 ?
											step !== 4 ? (
												<CustomFlexRowCenter>
													<HeaderRegister>
														<FlexOneCustom
															style={{ cursor: 'pointer' }}
															onClick={backStep}
															flex={"15% 0 0"}
														>
															<Icon
																className="iconBackArrow"
																icon="arrow_back_ios"
																color="#2C528B"
															/>
														</FlexOneCustom>

														<FlexOneCustom flex={"65% 0 0"}>
															<ContainerHeaderText>
																{switchTitle(step)}
															</ContainerHeaderText>
														</FlexOneCustom>
													</HeaderRegister>
												</CustomFlexRowCenter>
											) : (
												<ContainerImgLogo>
													<ImageLogo
														src={AlteaLogo}
														width={150}
														height={50}
													/>
												</ContainerImgLogo>

											) : null}

										<ContainerContent paddingtop={step === 4 || step === 8 ? 0 : 60}>
											{step <= 3 && (
												<FlexRow>
													<FlexOne>
														<TextStep>
															{step < 1 ? 1 : step}/3
													</TextStep>
													</FlexOne>
												</FlexRow>
											)}
											{switchRenderContent(step)}
										</ContainerContent>
									</CustomScroll>
								</ContainerCardContent>
							</CustomCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{step === 4 && isMobile() ? null : (<Footer />)}
			</CustomConLogin>
		</Fragment>
	)
}

export const RegisterContent = memo(_RegisterContent);

