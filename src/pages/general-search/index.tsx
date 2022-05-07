import { memo, useState, useEffect, useCallback, useRef } from "react";
import { ScreenGeneralSearch } from './screen';
import { IAlteaCMSService, AlteaCMSService } from '../../data/business/index';
import { AltAlert } from '../../components/alert/index';
import { debounce } from 'lodash';
import { HOME_URL } from '../../data/global/variables';

function _GeneralSearch(props) {
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [searchQuery, setSearchQuery] = useState("");
	const userSearch = useRef(false);
	const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
	const [searchData, setSearchData] = useState({});

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

	const onSearchChange = useCallback(debounce((e) => {
		e.preventDefault();
		userSearch.current = true;
		const { value } = e.target;
		setSearchQuery(value);
	}, 500), []);

	const backToHome = () => {
		props.history.push(HOME_URL);
	}

	useEffect(() => {
		getGeneralSearch(`is_popular=YES`);
	}, [])

	useEffect(() => {
		const newQuery = searchQuery === "" ? 'is_popular=YES' : `_q=${searchQuery}`;
		userSearch.current && getGeneralSearch(newQuery);
	}, [searchQuery]);

	const redirectTo = (field: string, id: string) => {
		switch (field) {
			case "doctor":
				return props.history.push(`/detail?doctor_id=${id}`);
			case "symtom":
				return props.history.push(`/list`);
			case "specialization":
				return props.history.push(`/mobile-list?specialistID=${id}`)
		}
	}


	return (
		<ScreenGeneralSearch
			backToHome={backToHome}
			onSearchChange={onSearchChange}
			searchData={searchData}
			loadingSearch={loadingSearch}
			redirectTo={redirectTo}
			{...props}
		/>
	)
}
export const GeneralSearch = memo((_GeneralSearch))

