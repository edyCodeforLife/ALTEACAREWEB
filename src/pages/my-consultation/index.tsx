import { memo, useState, ChangeEvent, useEffect, useCallback, useRef } from "react";
import { ScreenMyConsultation } from './screen';
import { format, startOfTomorrow } from 'date-fns';
import { IAppointmentService, AppointmentService } from '../../data/business/index';
import { addDaystoCurrentDate } from '../../data/global/function';
import { filter, clone, sortBy, lowerCase } from 'lodash';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';

function _MyConsultation(props) {
	const qrs = QrsToObj(window.location.search);
	const activeStep = parseInt(qrs.activeStep);
	const [tabValue, setTabValue] = useState(activeStep ? activeStep : 0);
	const _AppointmentService: IAppointmentService = new AppointmentService();
	const [activeAppointmentList, setActiveAppointmentList] = useState([]);
	const [masterActiveAppointmentList, setMasterActiveAppointmentList] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [activeFilterPeriod, setActiveFilterPeriod] = useState("Hari Ini");
	const _appointmentPeriodChange = useRef(false);
	const today = format(new Date(), 'yyyy-MM-dd');
	const tommorow = format(startOfTomorrow(), 'yyyy-MM-dd');
	const [searchQuery, setSearchQuery] = useState('');
	const isValidQuery = /\S/.test(searchQuery);
	const userInteraction = useRef(false);
	const [sortOption, setSortOption] = useState('NEWEST');

	const handleChangeActiveTab = (event: ChangeEvent<{}>, newValue: number) => {
		setTabValue(newValue);
	}

	const handleChangeIndex = (index: number) => {
		setTabValue(index);
	}

	const postAppointmentOngoing = (schedule_date_start, schedule_date_end) => {
		const dummy = {
			schedule_date_start: schedule_date_start,
			schedule_date_end: schedule_date_end,
			sort_by: "createdAt",
			sort_type: "ASC",
		}
		_AppointmentService.listAppointmentOngoing(dummy, {
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			NotFound: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			ValidationError: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
		})
	}

	const postAppointmentHistory = () => {
		const dummy = {
			sort_by: "createdAt",
			sort_type: "DESC",
			page: 1
		}
		_AppointmentService.listAppointmentHistory(dummy, {
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			NotFound: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			ValidationError: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
		})
	}

	const postAppointmentCancelled = () => {
		const dummy = {
			sort_by: "createdAt",
			sort_type: "DESC",
			page: 1
		}
		_AppointmentService.listAppointmentCancelled(dummy, {
			Success: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			NotFound: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
			},
			ValidationError: (res: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 150);
				setMasterActiveAppointmentList(res.data);
				setActiveAppointmentList(res.data);
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
		})
	}

	const switchListAppointmentAPI = () => {
		switch (tabValue) {
			case 0:
				return postAppointmentOngoing(today, today);
			case 1:
				return postAppointmentHistory();
			case 2:
				return postAppointmentCancelled();
			default:
				return postAppointmentOngoing(today, today);
		}
	}

	useEffect(() => {
		switchListAppointmentAPI();
	}, [tabValue]);


	const handleSelectedPeriodFilter = (selected: string, index: number) => {
		setActiveFilterPeriod(selected);
		_appointmentPeriodChange.current = true;
	}

	useEffect(() => {
		if (tabValue === 0) {
			switch (activeFilterPeriod) {
				case 'Hari Ini':
					return postAppointmentOngoing(today, today);
				case 'Minggu Ini':
					return postAppointmentOngoing(tommorow, addDaystoCurrentDate(7));
				case 'Hari Lain':
					return postAppointmentOngoing(addDaystoCurrentDate(7), addDaystoCurrentDate(30));
			}
		}
	}, [activeFilterPeriod])

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		userInteraction.current = true;
		setSearchQuery(event.target.value);
	}

	const filterSearch = () => {
		if (masterActiveAppointmentList && masterActiveAppointmentList.length > 0) {
			const cloneListAppointment = clone(masterActiveAppointmentList);
			let filteredData = filter(cloneListAppointment, (item) => {
				let doctorName = item.doctor?.name ?? true;
				let hospitalName = item.doctor?.hospital?.name ?? true;
				let specialist = item.doctor?.specialist?.name ?? true;
				let dataSearch = [doctorName, hospitalName, specialist];
				return lowerCase(dataSearch).includes(searchQuery.toLowerCase());
			});
			setActiveAppointmentList(filteredData);
		}
	}

	useEffect(() => {
		if (searchQuery === "") {
			switchListAppointmentAPI()
		} else {
			userInteraction.current && filterSearch();
		}
	}, [searchQuery, sortOption]);

	const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
		setSortOption((event.target as HTMLInputElement).value);
	}

	const changeSort = () => {
		const sort = sortBy(activeAppointmentList, (o) => {
			if (sortOption === "NEWEST") {
				return !o.created;
			} else {
				return o.created;
			}
		});
		setActiveAppointmentList(sort);
	}

	const handleClickBox = (id: number, status: string, transaction: any) => {
		if (activeAppointmentList.length > 0) {
			if (status === "NEW" || status === "PROCESS_GP") {
				props.history.push(`/call?appointment_id=${id}&callWith=MA`);
			}

			if (status === "ON_GOING") {
				props.history.push(`/call?appointment_id=${id}&callWith=specialist&activeStep=2`);
			}

			if (
				status === "CANCELED_BY_SYSTEM" ||
				status === "CANCELED_BY_GP" ||
				status === "CANCELED_BY_USER" ||
				status === "MEET_SPECIALIST" ||
				status === "PAID" ||
				status === "COMPLETED"
			) {
				props.history.push(`/consultation-detail?activeStep=${tabValue}&appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_MEDICAL_RESUME") {
				props.history.push(`/consultation-detail?activeStep=${tabValue}&appointment_id=${id}&value=1`);
			}

			if (status === "WAITING_FOR_PAYMENT" && !transaction) {
				props.history.push(`/payment?appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_PAYMENT" && transaction) {
				props.history.push(`/payment-method?appointment_id=${id}`);
			}

			if (status === "WAITING_FOR_PAYMENT" && transaction) {
				props.history.push(`/payment-method?appointment_id=${id}`);
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

	return (
		<ScreenMyConsultation
			handleChangeActiveTab={handleChangeActiveTab}
			tabValue={tabValue}
			activeAppointmentList={activeAppointmentList}
			loading={loading}
			handleChangeIndex={handleChangeIndex}
			handleSelectedPeriodFilter={handleSelectedPeriodFilter}
			activeFilterPeriod={activeFilterPeriod}
			searchQuery={searchQuery}
			handleChange={handleChange}
			onChangeRadio={onChangeRadio}
			sortOption={sortOption}
			changeSort={changeSort}
			handleClickBox={handleClickBox}
			{...props}
		/>
	)
}
export const MyConsultation = memo((_MyConsultation));
