import { memo } from "react";
import { GeneralSearchContent } from '../../components/pages-components/general-search/index';

function _ScreenGeneralSearch(props: any) {

	const {
		backToHome,
		onSearchChange,
		searchData,
		loadingSearch,
		redirectTo
	} = props;

	return (
		<div className="loginContainer">
			<GeneralSearchContent
				backToHome={backToHome}
				onSearchChange={onSearchChange}
				searchData={searchData}
				loadingSearch={loadingSearch}
				redirectTo={redirectTo}
				{...props}
			/>
		</div>
	);
}

export const ScreenGeneralSearch = memo(_ScreenGeneralSearch);
