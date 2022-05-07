import { memo } from "react";
import { SpecialistContent } from '../../components/pages-components/specialist/index';
import { IDoctorSpecialist } from '../../data/services/alteaCMS/IAlteaCMS';

export interface ISpecialistProps {
	loading: boolean;
	dataSpecialist: IDoctorSpecialist[];
	onRedirect(specialist_id: string): void;
}

function _ScreenSpecialistPage(props: ISpecialistProps) {

	const {
		loading,
		dataSpecialist,
		onRedirect
	} = props;

	return (
		<div className="loginContainer">
			<SpecialistContent
				loading={loading}
				dataSpecialist={dataSpecialist}
				onRedirect={onRedirect}
				{...props}
			/>
		</div>
	);
}

export const ScreenSpecialistPage = memo(_ScreenSpecialistPage);
