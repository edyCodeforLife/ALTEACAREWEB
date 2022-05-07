import { memo } from "react";
import { LoginMainContent } from '../../components/pages-components/login/login';
import { ILoginProps } from '../../components/pages-components/login/login';

function _ScreenLoginPage(props: ILoginProps) {

	const {
		handleChange,
		isFromListDoctor,
		onSubmitLogin,
		handleMouseDownPassword,
		handleClickShowPassword,
		values,
		redirectTo,
		loading,
		doctorDetail
	} = props;
	return (
		<div className="loginContainer">
			<LoginMainContent
				handleChange={handleChange}
				handleClickShowPassword={handleClickShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
				values={values}
				onSubmitLogin={onSubmitLogin}
				isFromListDoctor={isFromListDoctor}
				redirectTo={redirectTo}
				loading={loading}
				doctorDetail={doctorDetail}
			/>
		</div>
	);
}

export const ScreenLoginPage = memo(_ScreenLoginPage);
