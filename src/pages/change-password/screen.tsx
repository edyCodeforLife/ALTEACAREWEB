import { memo } from "react";
import { ChangePasswordContent } from '../../components/pages-components/change-password/index';

function _ScreenChangePassword(props: any) {

	const {
		profileUser,
		qrsStep,
		backStep,
		passwordStep1,
		handleMouseDownPassword,
		handleClickShowPasswordStep1,
		showPasswordStep1,
		onChangeCheckPassword,
		handleKeyEnter,
		checkPassword,
		handleClickShowPassword,
		isPasswordValid,
		passwordData,
		showPassword,
		onChange,
		errorMessage,
		changePassword
	} = props;

	return (
		<div className="loginContainer">
			<ChangePasswordContent
				qrsStep={qrsStep}
				checkPassword={checkPassword}
				passwordStep1={passwordStep1}
				handleKeyEnter={handleKeyEnter}
				onChangeCheckPassword={onChangeCheckPassword}
				backStep={backStep}
				showPassword={showPassword}
				showPasswordStep1={showPasswordStep1}
				handleMouseDownPassword={handleMouseDownPassword}
				handleClickShowPasswordStep1={handleClickShowPasswordStep1}
				handleClickShowPassword={handleClickShowPassword}
				isPasswordValid={isPasswordValid}
				passwordData={passwordData}
				onChange={onChange}
				changePassword={changePassword}
				errorMessage={errorMessage}
				{...props}
			/>
		</div>
	);
}

export const ScreenChangePassword = memo(_ScreenChangePassword);
