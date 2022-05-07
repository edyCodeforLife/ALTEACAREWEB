import { memo, useEffect, useState, useRef, useCallback } from "react";
import { ScreenListDoctor } from './screen';
import { chunk, indexOf, debounce, findIndex, isEmpty } from 'lodash';
import update from 'immutability-helper';
import { AlteaCMSService, IAlteaCMSService } from '../../data/business/alteaCMS/alteaCMS';
import { QrsToObj } from '../../data/global/function';
import { getToken } from '../../data/hooks/auth-token';
import { AltAlert } from '../../components/alert/index';

function _ListDoctorPage(props) {

	const [open, setOpen] = useState<any>({
		specialistOpen: true,
		hospitalOpen: true,
		priceOpen: true
	});
	const [dataSpecialist, setDataSpecialist] = useState([]);
	let QrsSpecialist = QrsToObj(window.location.search);
	let qrsData = QrsSpecialist.specialistID;
	let qrsIndex = dataSpecialist.length > 0 ? findIndex(dataSpecialist, { specialization_id: qrsData }) : 0;
	// console.log(qrsIndex)
	const _AlteaCMS: IAlteaCMSService = new AlteaCMSService();
	const userInteraction = useRef(false);
	const [dataSosMed, setDataSosMed] = useState([]);
	const [checkedSpecialist, setCheckedSpecialist] = useState<number[]>([...qrsIndex]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [checkedHospital, setCheckedHospital] = useState<number[]>([]);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [hospitalList, setHospitalList] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [masterDoctorList, setMasterDoctorList] = useState([]);
	const [labelFilter, setLabelFilter] = useState<string>("Urutkan Berdasarkan")
	const [sortQuery, setSortQuery] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const token = getToken();
	let specialistFilterQuery = `${qrsData ? '&specialis.id_in=' + qrsData : ''}`
	let queryListDoctor = `?_limit=100000${specialistFilterQuery}${sortQuery}${searchQuery}`;
	const priceList = ["< 150 ribu", "150 - 300 ribu", "> 300 ribu"];

	const filterList = [
		{
			label: "Harga (Terendah - Tertinggi)",
			sortQuery: "&_sort=price:ASC"
		},
		{
			label: "Harga (Tertinggi - Terendah)",
			sortQuery: "&_sort=price:DESC"
		},
		{
			label: "Pengalaman Praktek (Terlama - Terbaru)",
			sortQuery: "&_sort=work_date:ASC"
		},
		{
			label: "Pengalaman Praktek (Terbaru - Terlama)",
			sortQuery: "&_sort=work_date:DESC"
		}
	]
	const chunkNumber = 5;

	const handleClickFilter = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseFilter = () => {
		setAnchorEl(null);
	};

	const getSosMed = () => {
		_AlteaCMS.GetSosMed({
			Success: (data: any) => {
				setLoading(false)
				setDataSosMed(data.data);
			}
		})
	}

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
	}, [queryListDoctor]);

	const onSearchChange = useCallback(debounce((e) => {
		userInteraction.current = true;
		let query = e.target.value === "" ? "" : `&_q=${e.target.value}`;
		setSearchQuery(query);
	}, 500), []);

	useEffect(() => {
		getSosMed();
		prepareData();
	}, []);

	useEffect(() => {
		userInteraction.current && getDoctorList();
	}, [sortQuery, searchQuery]);


	const handleToggleSpecialist = (value: number) => () => {
		const currentIndex = indexOf(checkedSpecialist, value);
		const newChecked = [...checkedSpecialist];
		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCheckedSpecialist(newChecked);
	};

	const handleToggleHospital = (value: number) => () => {
		const currentIndex = indexOf(checkedHospital, value);
		const newChecked = [...checkedHospital];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCheckedHospital(newChecked);
	};


	const handleClickSideList = (query) => {
		let newData = update(open, query);
		setOpen(newData);
	}

	const handleClickSelected = (item) => {
		userInteraction.current = true;
		setLabelFilter(item.label);
		setSortQuery(item.sortQuery)

	}

	const onChangePage = (e: object, page: number) => {
		setSelectedIndex(page - 1);
		setCurrentPage(page);
	}

	const handleRedirectSpecialist = (id) => {
		props.history.push(`/list?specialistID=${id}`);
		window.location.reload();
	}

	const onChooseScheduleRedirect = (doctorId: string) => {
		if (!doctorId) return;
		if (token) {
			props.history.push(`/detail?doctor_id=${doctorId}`);
		} else {
			props.history.push(`/login?doctor_id=${doctorId}`);
		}
	}

	return (
		<ScreenListDoctor
			open={open}
			onSearchChange={onSearchChange}
			handleClickSideList={handleClickSideList}
			handleToggleSpecialist={handleToggleSpecialist}
			handleToggleHospital={handleToggleHospital}
			checkedHospital={checkedHospital}
			checkedSpecialist={checkedSpecialist}
			dataSpecialist={dataSpecialist}
			hospitalList={hospitalList}
			priceList={priceList}
			masterDoctorList={masterDoctorList}
			doctorList={doctorList}
			datalist={filterList}
			anchorEl={anchorEl}
			handleCloseFilter={handleCloseFilter}
			handleClickFilter={handleClickFilter}
			handleClickSelected={handleClickSelected}
			selectedIndex={selectedIndex}
			chunkNumber={chunkNumber}
			labelName={labelFilter}
			onChangePage={onChangePage}
			currentPage={currentPage}
			loading={loading}
			handleRedirectSpecialist={handleRedirectSpecialist}
			onChooseScheduleRedirect={onChooseScheduleRedirect}
			history={props.history}
			dataSosMed={dataSosMed}
		/>
	)
}
export const ListDoctorPage = memo((_ListDoctorPage));
