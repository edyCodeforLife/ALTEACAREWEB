import { memo, useEffect, useState, useCallback, useRef, MouseEvent, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import { ScreenLandingPage } from './screen';
import { AlteaCMSService, IAlteaCMSService } from '../../data/business/alteaCMS/alteaCMS';
import { debounce } from 'lodash';
import { AltAlert } from '../../components/alert/index';
import { getToken } from '../../data/hooks/auth-token';
import { filter } from 'lodash';

function _LandingPage(props) {
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [dataSpecialist, setDataSpecialist] = useState([]);
	const [dataPopularSpecialist, setDataPopularSpecialist] = useState([]);
	const [dataSosMed, setDataSosMed] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
	// const [isFocus, setIsFocus] = useState(false);
	const [searchData, setSearchData] = useState({});
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const prevOpen = useRef(open);
	const [searchQuery, setSearchQuery] = useState("");
	const userSearch = useRef(false);
	const token = getToken();
	const onRedirect = (id) => {
		props.history.push(`/list?specialistID=${id}`);
	}

	const getSpecialist = () => {
		_CMSService.GetDoctorSpecialist({
			Success: (data: any) => {
				setLoading(false)
				setDataSpecialist(data.data);
				const sortedData = filter(data.data, (o) => { return o.is_popular });
				setDataPopularSpecialist(sortedData);
			}
		})
	}

	const getSosMed = () => {
		_CMSService.GetSosMed({
			Success: (data: any) => {
				setLoading(false)
				setDataSosMed(data.data);
			}
		})
	}

	const getGeneralSearch = (query: string) => {
		setLoadingSearch(true);
		_CMSService.GeneralSearch(query, {
			Success: (res: any) => {
				setLoadingSearch(false);
				setSearchData(res?.data);
			},
			NotFound: (res: any) => {
				setLoadingSearch(false);
				AltAlert.show({
					title: "Info",
					subtitle: res.message,
					type: 'info',
				});
			},
			ValidationError: (res: any) => {
				setLoadingSearch(false);
				AltAlert.show({
					title: "Info",
					subtitle: res.message,
					type: 'info',
				});
			},
			ServerError: (res: any) => {
				setLoadingSearch(false);
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
		})
	}

	useEffect(() => {
		getSpecialist();
		getSosMed();
	}, []);

	const handleClose = (event: MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}
		setOpen(false);
	};

	function handleListKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// const onfocus = () => {
	// 	setIsFocus(true);
	// }

	// const onblur = () => {
	// 	setIsFocus(false);
	// }

	const handleChange = useCallback(debounce((e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		userSearch.current = true;
		const { value } = e.target;
		setSearchQuery(value);

		setOpen(true)

	}, 500), []);

	useEffect(() => {
		userSearch.current && getGeneralSearch(`_q=${searchQuery}`);
	}, [searchQuery])

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}
		prevOpen.current = open;
	}, [open]);

	const redirectTo = (field: string, id: string) => {
		switch (field) {
			case "doctor":
				return token ? props.history.push(`/detail?doctor_id=${id}`) : props.history.push(`/login?doctor_id=${id}`)
			case "symtom":
				return props.history.push(`/list`);
		}
	}

	return (
		<ScreenLandingPage
			dataSpecialist={dataSpecialist}
			dataPopularSpecialist={dataPopularSpecialist}
			onRedirect={onRedirect}
			loading={loading}
			loadingSearch={loadingSearch}
			handleRedirectSpecialist={onRedirect}
			history={history}
			searchData={searchData}
			dataSosMed={dataSosMed}
			// onfocus={onfocus}
			// onblur={onblur}
			open={open}
			anchorRef={anchorRef}
			handleClose={handleClose}
			handleListKeyDown={handleListKeyDown}
			handleChange={handleChange}
			searchQuery={searchQuery}
			redirectTo={redirectTo}
			{...props}
		/>
	)
}
export const LandingPage = memo((_LandingPage));
