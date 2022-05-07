import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { CodeInput } from '../../../otp/otp';
import { ContainerErrorMessage, IconContainer, TextError } from '../../register/register';
import { CountDown } from '../../../countdown/countdown';
import { HeaderDetailConsultation, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import { FlexOneCustom } from '../../register/register';
import { Icon } from '../../../basic-elements/mobile-container';

const ContainerOTP = styled.div`
	box-sizing: border-box;
	padding: 50px 20px;
`;

const CustomContainerErrMessage = styled(props => <ContainerErrorMessage {...props} />)`
	justify-content: center !important;
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

export interface IVerifyOTPProps {
	errorMessage: any;
	onProcess: boolean;
	dataType: string;
	onContinue(code: string): void;
	onChangeCode(code: string): void;
	codeInputHandle: any;
	activeCountdown: boolean;
	seconds: number;
	backStep(): void;
}

function _OTPCode(props: IVerifyOTPProps) {
	const {
		errorMessage,
		backStep,
		dataType,
		seconds,
		activeCountdown,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle
	} = props;

	const switchText = (type: string) => {
		switch (type) {
			case "email":
				return "Email";
			case "phone":
				return "Telepon";
		}
	}

	return (
		<Fragment>
			<ContainerOTP>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep()}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Verifikasi {switchText(dataType)}
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>

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
				<CustomContainerErrMessage error={errorMessage && errorMessage !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage}</TextError>
				</CustomContainerErrMessage>

				{activeCountdown && (
					<CountDown
						talign="center"
						color={"#3E8CB9"}
						seconds={seconds}
					/>
				)}

				<ContainerChangeEmailTxt pointeractive onClick={backStep}>
					<TextLabel color={"#3868B0"} textdecoration={"underline"}>
						Ubah {switchText(dataType)}
					</TextLabel>
				</ContainerChangeEmailTxt>
			</ContainerOTP>
		</Fragment>
	);
}

export const OTPCode = memo(_OTPCode);