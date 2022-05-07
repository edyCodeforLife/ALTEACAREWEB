import { memo } from "react";
import { VerifyChangeDataContent } from '../../components/pages-components/verify-change-data/index';

function _ScreenVerifyChangeDataPage(props: any) {

	const {
		dataType,
		backStep,
		onVerifyEmail,
		data,
		errorMessage,
		onChange,
		isDisabled,
		handleKeyEnter,
		onVerifyPhone
	} = props;

	return (
		<div className="loginContainer">
			<VerifyChangeDataContent
				dataType={dataType}
				data={data}
				backStep={backStep}
				isDisabled={isDisabled}
				onChange={onChange}
				onVerifyEmail={onVerifyEmail}
				onVerifyPhone={onVerifyPhone}
				errorMessage={errorMessage}
				handleKeyEnter={handleKeyEnter}
				{...props}
			/>
		</div>
	);
}

export const ScreenVerifyChangeDataPage = memo(_ScreenVerifyChangeDataPage);
