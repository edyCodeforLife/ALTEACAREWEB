import { memo } from 'react';
import { SuccessPage } from '../../../success-page/success-page';

function _Step4(props: any) {
	return (
		<SuccessPage
			successText={"pergantian password"}
			nextPageText={"login"}
			path={"/login"}
			{...props}
		/>
	);
}

export const Step4 = memo(_Step4);