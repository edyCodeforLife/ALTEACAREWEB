import { memo, useRef, useState, useCallback, useEffect } from "react";
import { ScreenMobileListDoctor } from './screen';
import { AlteaCMSService, IAlteaCMSService } from '../../data/business/alteaCMS/alteaCMS';
import { QrsToObj } from '../../data/global/function';
import { getToken } from '../../data/hooks/auth-token';
import { chunk, debounce } from 'lodash';
import { AltAlert } from '../../components/alert/index';

function _MobileListDoctorPage(props) {
	const _AlteaCMS: IAlteaCMSService = new AlteaCMSService();
	const userInteraction = useRef(false);
	let QrsSpecialist = QrsToObj(window.location.search);
	let qrsData = QrsSpecialist.specialistID;
	const [loading, setLoading] = useState<boolean>(true);
	const [masterDoctorList, setMasterDoctorList] = useState([]);
	const [hospitalList, setHospitalList] = useState([]);
	const [sortQuery, setSortQuery] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [doctorList, setDoctorList] = useState([]);
	const [dataSpecialist, setDataSpecialist] = useState([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const token = getToken();
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const chunkNumber = 5;
	let specialistFilterQuery = `${qrsData ? '&specialis.id_in=' + qrsData : ''}`
	let queryListDoctor = `?_limit=100000${specialistFilterQuery}${sortQuery}${searchQuery}`;

	const prepareData = async () => {
		const promise1 = new Promise(resolve => {
			_AlteaCMS.GetDoctorSpecialist({
				Success: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 250);
					resolve(data.data)
				}
			})
		});

		const promise2 = new Promise(resolve => {
			_AlteaCMS.GetHospital({
				Success: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 250);
					resolve(data.data);
				}
			})
		});

		const promise3 = new Promise(resolve => {
			_AlteaCMS.GetDoctorList(queryListDoctor, {
				Success: (data: any) => {
					setTimeout(() => {
						setLoading(false);
					}, 250);
					resolve(data.data);
				},
				NotFound: (res: any) => {
					AltAlert.show({
						title: "Error",
						subtitle: res.message,
						type: 'warning',
					});
				}
			})
		})

		const results = await Promise.all([promise1, promise2, promise3]);
		let doctorSpecialist: any = results[0];
		let hospitalList: any = results[1];
		let doctorList: any = results[2]

		setDataSpecialist(doctorSpecialist);
		setHospitalList(hospitalList);
		setMasterDoctorList(doctorList);
		setDoctorList(chunk(doctorList, chunkNumber));
	}

	const getDoctorList = useCallback(() => {
		_AlteaCMS.GetDoctorList(queryListDoctor, {
			Success: (data: any) => {
				setLoading(false);
				setMasterDoctorList(data.data);
				setDoctorList(chunk(data.data, chunkNumber))
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			}
		})
	}, [queryListDoctor])

	const onChangePage = (e: object, page: number) => {
		setSelectedIndex(page - 1);
		setCurrentPage(page);
	}

	const onChooseScheduleRedirect = (doctorId: string) => {
		if (!doctorId) return;
		if (token) {
			props.history.push(`/detail?doctor_id=${doctorId}`);
		} else {
			props.history.push(`/login?doctor_id=${doctorId}`);
		}
	}

	const onSearchChange = useCallback(debounce((e) => {
		userInteraction.current = true;
		let query = e.target.value === "" ? "" : `&_q=${e.target.value}`;
		setSearchQuery(query);
	}, 250), []);

	useEffect(() => {
		userInteraction.current && getDoctorList();
	}, [sortQuery, searchQuery]);

	useEffect(() => {
		prepareData();
	}, []);

	return (
		<ScreenMobileListDoctor
			loading={loading}
			doctorList={doctorList}
			dataSpecialist={dataSpecialist}
			hospitalList={hospitalList}
			masterDoctorList={masterDoctorList}
			selectedIndex={selectedIndex}
			onSearchChange={onSearchChange}
			currentPage={currentPage}
			onChangePage={onChangePage}
			onChooseScheduleRedirect={onChooseScheduleRedirect}
			{...props}
		/>
	)
}
export const MobileListDoctorPage = memo((_MobileListDoctorPage));
