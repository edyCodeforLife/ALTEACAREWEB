import { Fragment, memo, useState, useRef } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { CodeInput } from '../../../otp/otp';
import { ContainerErrorMessage, IconContainer, TextError } from '../../register/register';
import { CountDown } from '../../../countdown/countdown';
import { IStateForgotPassword } from '../../../../pages/forgot-password/index';

const ContainerOTP = styled.div`
	box-sizing: border-box;
	padding: 50px 20px;
`;

const CustomContainerErrMessage = styled(props => <ContainerErrorMessage {...props} />)`
	justify-content: center !important;
`;

const DescText = styled.div`
	font-size: 14px;
	color: #3A3A3C;
	font-weight: bold;
	line-height: 1.4;
`;

const NormalFont = styled.span`
	font-weight: 400;
	margin-left: 5px;
`;

const ContainerCodeInput = styled(FlexRow)`
	margin-top: 30px;
	margin-bottom: 10px;
`;

const TextLabel = styled.div`
	font-weight: normal;
	font-size: 15px;
	text-align: center;
	color: ${(props) => props.color};
	text-decoration-line: ${(props) => props.textdecoration};
`;

const ContainerChangeEmailTxt = styled(FlexRowCenter)`
	margin: 30px 0px;
	cursor: ${(props) => props.pointeractive ? 'pointer' : 'normal'};
`;

const CustomSpan = styled.span`
	color: #06C270;
	margin-left: 5px;
	cursor: pointer
`;

export interface IVerifyOTPProps {
	resendOTP(): void;
	onProcess: boolean;
	onContinue(code: string): void;
	onChangeCode(code: string): void;
	codeInputHandle: any;
	activeCountdown: boolean;
	seconds: number;
	switchStep(step: number): void;
	data: IStateForgotPassword;
	errorMessage: IStateForgotPassword;
	reqForgotPassword: any;
}

function _Step2(props: IVerifyOTPProps) {
	const {
		errorMessage,
		switchStep,
		data,
		seconds,
		activeCountdown,
		resendOTP,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle,
		reqForgotPassword
	} = props;

	return (
		<Fragment>
			<ContainerOTP>
				<FlexRow>
					<DescText>
						Masukkan kode verifikasi yang telah dikirim ke {" "}
						<NormalFont>{reqForgotPassword.username}</NormalFont>
					</DescText>
				</FlexRow>

				<ContainerCodeInput>
					<CodeInput
						disabled={onProcess}
						dimension={36}
						onComplete={code => {
							onContinue(code);
						}}
						onCodeChanged={code => {
							onChangeCode(code)
						}}
						handleRef={codeInputHandle}
						onlyNumber={true}
					/>
				</ContainerCodeInput>
				<CustomContainerErrMessage error={errorMessage && errorMessage["otp"] !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage["otp"]}</TextError>
				</CustomContainerErrMessage>

				{activeCountdown && (
					<CountDown
						talign="center"
						color={"#3E8CB9"}
						seconds={seconds}
					/>
				)}

				<ContainerChangeEmailTxt>
					<TextLabel color={"#3A3A3C"}>
						Tidak menerima kode verifikasi ?
					</TextLabel>
				</ContainerChangeEmailTxt>

				<ContainerChangeEmailTxt>
					<TextLabel color={"#06C270"} onClick={() => { resendOTP(); }}>
						Kirim Ulang
					</TextLabel>
				</ContainerChangeEmailTxt>
			</ContainerOTP>
		</Fragment>
	);
}

export const Step2 = memo(_Step2);