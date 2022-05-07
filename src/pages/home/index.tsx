import { memo, useState, useEffect, useRef } from "react";
import { ScreenHomePage } from './screen';
import { IProfileUserService, ProfileUserService, IAppointmentService, AppointmentService } from '../../data/business/index';
import { AlteaCMSService, IAlteaCMSService } from '../../data/business/alteaCMS/alteaCMS';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';
import { format, startOfTomorrow } from 'date-fns';
import { getToken } from '../../data/hooks/auth-token';

function _HomePage(props) {
	const token = getToken();
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [_, dispatch] = useGlobalState();
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [profileUser, setProfileUser] = useState(null);
	const [dataSpecialist, setDataSpecialist] = useState([]);
	const [loading, setLoading] = useState<boolean>(token ? true : false);
	const anchorRef = useRef(null);
	const [appointmentList, setAppointmentList] = useState([]);
	const [bannerData, setBannerData] = useState([]);

	const handleClick = () => {
		props.history.push("/search");
	};

	const handleChange = (event: any) => {
		console.log('tes')

	}

	const onRedirect = (id) => {
		props.history.push(`/mobile-list?specialistID=${id}`);
	}

	const getSpecialist = () => {
		_CMSService.GetPopularSpecialist({
			Success: (data: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setDataSpecialist(data.data);
			}
		})
	}

	const getProfile = () => {
		_ProfileService.getProfile({
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
				setProfileUser(res.data);
				dispatch({
					type: USER_ACTIONS.CHANGE_USER,
					data: { user: res.data.data },
				});
			}
		});
	}

	const getBanner = () => {
		_CMSService.GetBanners({
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setBannerData(res.data);
			}
		})
	}

	const getAppointmentOngoing = () => {
		const today = format(new Date(), 'yyyy-MM-dd');
		const tommorow = format(startOfTomorrow(), 'yyyy-MM-dd');
		const dummy = {
			schedule_date_start: today,
			schedule_date_end: today,
			sort_by: "createdAt",
			sort_type: "ASC",
			page: 1
		}
		_AppointmentService.listAppointmentOngoing(dummy, {
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setAppointmentList(res.data);
			},
			NotFound: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 250);
				setAppointmentList(res.data);
			}
		})
	}

	const handleClickBox = (id: number, status: string, transaction: any) => {
		if (appointmentList.length > 0) {
			if (status === "NEW" || status === "PROCESS_GP") {
				props.history.push(`/call?appointment_id=${id}&callWith=MA`);
			}

			if (status === "ON_GOING") {
				props.history.push(`/call?appointment_id=${id}&callWith=specialist&activeStep=2`);
			}

			if (
				status === "MEET_SPECIALIST" ||
				status === "PAID" ||
				status === "COMPLETED"
			) {
				props.history.push(`/consultation-detail?activeStep=${status === "COMPLETED" ? 1 : 0}&appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_MEDICAL_RESUME") {
				props.history.push(`/consultation-detail?activeStep=0&appointment_id=${id}&value=1`);
			}

			if (status === "WAITING_FOR_PAYMENT" && !transaction) {
				props.history.push(`/payment?appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_PAYMENT" && transaction && transaction?.type === "MIDTRANS_SNAP") {
				props.history.push(`/payment-method?appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_PAYMENT" && transaction && transaction?.type === "ALTEA_PAYMENT_WEBVIEW") {
				props.history.push(`/altea-payment?appointment_id=${id}`);
			}

		} else {
			return;
		}
	}

	useEffect(() => {
		getProfile();
		getAppointmentOngoing();
		getSpecialist();
		getBanner();
	}, []);

	const handleClickBanner = (url: string) => {
		if (url === undefined || url === null) return;
		const newUrl = url.replace("{email}", profileUser?.email);
		const anchorEl = document.createElement('a');

		anchorEl.href = newUrl;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener';
		setTimeout(() => {
			anchorEl.click();
		});
	}

	return (
		<ScreenHomePage
			dataSpecialist={dataSpecialist}
			loading={loading}
			profileUser={profileUser}
			onRedirect={onRedirect}
			handleClickBox={handleClickBox}
			appointmentList={appointmentList}
			anchorRef={anchorRef}
			handleClick={handleClick}
			handleChange={handleChange}
			bannerData={bannerData}
			handleClickBanner={handleClickBanner}
			{...props}
		/>
	)
}
export const HomePage = memo((_HomePage));
