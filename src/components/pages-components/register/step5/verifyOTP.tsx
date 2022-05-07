import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { CodeInput } from '../../../otp/otp';
import { ContainerErrorMessage, IconContainer, TextError } from '../register';
import { CountDown } from '../../../countdown/countdown';
import { IContactDataProps } from '../step1/contact-data';
import { ChangeProfileContent } from '../../change-profile';
import { ChangeProfilePage } from '../../../../pages';

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

export interface IVerifyOTPProps extends IContactDataProps {
	resendOTP(): void;
	onProcess: boolean;
	onContinue(code: string): void;
	onChangeCode(code: string): void;
	codeInputHandle: any;
	activeCountdown: boolean;
	seconds: number;
	switchStep(step: number): void;
	activeFlag: string;
	changeFlag(): void;
}

function _VerifyOTPRegistration(props: IVerifyOTPProps) {
	const {
		errorMessage,
		switchStep,
		data,
		seconds,
		activeCountdown,
		changeFlag,
		resendOTP,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle,
		activeFlag
	} = props;

	return (
		<Fragment>
			<ContainerOTP>
				<FlexRow>
					<DescText>
						Kode verifikasi telah dikirim via {" "}
						{activeFlag === "email" ? "alamat email" : "SMS"} ke
						<NormalFont>{activeFlag === "email" ? data?.email : `+62${data?.phone}`}</NormalFont>
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
				{/* <CustomContainerErrMessage error={errorMessage && errorMessage["otp"] !== ""}>
					<IconContainer icon={"error_outline_rounded"} />
					<TextError>{errorMessage["otp"]}</TextError>
				</CustomContainerErrMessage> */}

				{activeCountdown && (
					<CountDown
						talign="center"
						color={"#3E8CB9"}
						seconds={seconds}
					/>
				)}

				{/* <ContainerChangeEmailTxt>
					<TextLabel color={"#3A3A3C"}>
						Tidak menerima email ?
						<CustomSpan onClick={() => { resendOTP(); }}>
							Kirim Ulang
						</CustomSpan>
					</TextLabel>
				</ContainerChangeEmailTxt> */}

				<ContainerChangeEmailTxt pointeractive onClick={() => activeFlag === "email" ? switchStep(6) : switchStep(7)}>
					<TextLabel color={"#3868B0"} textdecoration={"underline"}>
						Ubah {" "} {activeFlag === "email" ? "alamat email" : "nomor ponsel"}
					</TextLabel>
				</ContainerChangeEmailTxt>

				<ContainerChangeEmailTxt pointeractive onClick={() => changeFlag()}>
					<TextLabel color={"#61C7B5"}>
						Kirim Kode Verifikasi Via {" "} {activeFlag === "email" ? "SMS" : "Alamat Email"}
					</TextLabel>
				</ContainerChangeEmailTxt>
			</ContainerOTP>
		</Fragment>
	);
}

export const VerifyOTPRegistration = memo(_VerifyOTPRegistration);