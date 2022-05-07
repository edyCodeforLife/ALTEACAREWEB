import { memo, useState, useEffect } from "react";
import { ScreenSpecialistPage } from './screen';
import { IAlteaCMSService, AlteaCMSService } from '../../data/business/index';

function _SpecialistPage(props) {
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [loading, setLoading] = useState<boolean>(true);
	const [dataSpecialist, setDataSpecialist] = useState([]);

	const getSpecialist = () => {
		_CMSService.GetDoctorSpecialist({
			Success: (data: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setDataSpecialist(data.data);
			}
		})
	}

	useEffect(() => {
		getSpecialist();
	}, []);

	const onRedirect = (specialist_id: string) => {
		if (!specialist_id) return;
		props.history.push(`/mobile-list?specialistID=${specialist_id}`);
	}

	return (
		<ScreenSpecialistPage
			loading={loading}
			dataSpecialist={dataSpecialist}
			onRedirect={onRedirect}
			{...props}
		/>
	)
}
export const SpecialistPage = memo((_SpecialistPage));
