import { memo } from "react";
import { OTPContent } from '../../components/pages-components/otp/index';

function _ScreenOTPPage(props: any) {

	const {
		dataType,
		backStep,
		errorMessage,
		profileUser,
		seconds,
		activeCountdown,
		onProcess,
		onContinue,
		onChangeCode,
		codeInputHandle
	} = props;

	return (
		<div className="loginContainer">
			<OTPContent
				dataType={dataType}
				profileUser={profileUser}
				errorMessage={errorMessage}
				backStep={backStep}
				seconds={seconds}
				activeCountdown={activeCountdown}
				onProcess={onProcess}
				onContinue={onContinue}
				onChangeCode={onChangeCode}
				codeInputHandle={codeInputHandle}
				{...props}
			/>
		</div>
	);
}

export const ScreenOTPPage = memo(_ScreenOTPPage);
