import { memo } from "react";
import { ForgotPasswordContent } from '../../components/pages-components/forgot-password/forgot-password';
import { IStateForgotPassword } from './index';

export interface IForgotPassword {
	step: number;
	switchStep(step: number): void;
	data: IStateForgotPassword;
	errorMessage: IStateForgotPassword;
	onChange(fieldId: string, value: any, error?: any): void;
	requestForgotPassword(): void;
	resendOTP(): void;
	onProcess: boolean;
	onContinue(code: string): void;
	onChangeCode(code: any): void;
	codeInputHandle: any;
	activeCountdown: boolean;
	seconds: number;
	backStep(): void;
	showPassword: object;
	handleClickShowPassword(fieldId: string): void;
	handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>): void;
	isPasswordValid: object;
	changePassword(): void;
	reqForgotPassword: any;
}

function _ScreenForgotPassword(props: IForgotPassword) {

	const {
		step,
		switchStep,
		data,
		errorMessage,
		onChange,
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
	return (
		<div className="loginContainer">
			<ForgotPasswordContent
				step={step}
				switchStep={switchStep}
				data={data}
				errorMessage={errorMessage}
				onChange={onChange}
				requestForgotPassword={requestForgotPassword}
				resendOTP={resendOTP}
				onProcess={onProcess}
				onContinue={onContinue}
				onChangeCode={onChangeCode}
				codeInputHandle={codeInputHandle}
				activeCountdown={activeCountdown}
				seconds={seconds}
				backStep={backStep}
				showPassword={showPassword}
				isPasswordValid={isPasswordValid}
				handleClickShowPassword={handleClickShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
				changePassword={changePassword}
				reqForgotPassword={reqForgotPassword}
				{...props}
			/>
		</div>
	);
}

export const ScreenForgotPassword = memo(_ScreenForgotPassword);
