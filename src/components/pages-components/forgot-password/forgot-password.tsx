import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Flex, { FlexRowCenter } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import {
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
import { CustomConLogin } from '../register/register';
import { Step1 } from './step1/step1';
import { Step2 } from './step2/step2';
import { Step3 } from './step3/step3';
import { Step4 } from './step4/step4';
import { IForgotPassword } from '../../../pages/forgot-password/screen';
import { ContainerHeaderText } from '../register/register';

const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
`;

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	height: calc(100vh - 120px);
	overflow: hidden;
	@media (max-width: 768px) {
		height: calc(100vh - 50px);
	};
`;

const HeaderForgotPassword = styled.div`
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

const FlexOneCustom = styled(CustomFlexOne)`
	flex-grow: 0 !important;
	flex: ${(props) => props.flex};
`;

const ContainerContent = styled.div`
	width: auto;
	height: 100%;
	padding-top: ${(props => props.activeStep === 4 ? 0 : 80)}px;
	padding-left: 20px;
	padding-right: 20px;
	box-sizing: border-box;
	text-align: left;
	position: relative;
`;

function _ForgotPasswordContent(props: IForgotPassword) {
	const {
		step,
		switchStep,
		onChange,
		errorMessage,
		data,
		requestForgotPassword,
		resendOTP,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle,
		activeCountdown,
		seconds,
		backStep,
		showPassword,
		isPasswordValid,
		handleClickShowPassword,
		handleMouseDownPassword,
		changePassword,
		reqForgotPassword
	} = props;

	const switchRenderContent = (step) => {
		switch (step) {
			case 1:
				return (<Step1
					{
					...{
						requestForgotPassword,
						data,
						onChange,
						errorMessage

					}
					}

				/>);
			case 2:
				return (<Step2
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
						reqForgotPassword
					}
					}
				/>);
			case 3:
				return (<Step3
					{
					...{
						showPassword,
						isPasswordValid,
						handleClickShowPassword,
						handleMouseDownPassword,
						data,
						onChange,
						errorMessage,
						changePassword
					}
					}
				/>);
			case 4:
				return (<Step4
					{...props}
				/>);
			default:
				return (<Step1
					{
					...{
						requestForgotPassword,
						data,
						onChange,
						errorMessage

					}
					}
				/>);
		}
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomCardStyle variant="outlined">
								<ContainerCardContent>
									<CustomScroll flex="1" heightRelativeToParent={'100%'}>
										{step !== 4 && (
											<CustomFlexRowCenter>
												<HeaderForgotPassword>
													<FlexOneCustom
														style={{ cursor: 'pointer' }}
														flex={"15% 0 0"}
														onClick={backStep}
													>
														<Icon
															className="iconBackArrow"
															icon="arrow_back_ios"
															color="#2C528B"
														/>
													</FlexOneCustom>

													<FlexOneCustom flex={"65% 0 0"}>
														<ContainerHeaderText>
															Atur Ulang Kata Sandi
													</ContainerHeaderText>
													</FlexOneCustom>
												</HeaderForgotPassword>
											</CustomFlexRowCenter>
										)}
										<ContainerContent activeStep={step}>
											{switchRenderContent(step)}
										</ContainerContent>
									</CustomScroll>
								</ContainerCardContent>
							</CustomCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				<Footer />
			</CustomConLogin>
		</Fragment>
	)
}

export const ForgotPasswordContent = memo(_ForgotPasswordContent);

