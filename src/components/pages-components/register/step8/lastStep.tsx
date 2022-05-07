import { memo } from 'react';
import { SuccessPage } from '../../../success-page/success-page';

function _LastStepRegister(props: any) {
	return (
		<SuccessPage
			successText={"Registrasi"}
			nextPageText={"login"}
			path={"/login"}
			{...props}
		/>
	);
}

export const LastStepRegister = memo(_LastStepRegister);