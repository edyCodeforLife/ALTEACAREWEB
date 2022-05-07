import { memo, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { MobileNavBar } from '../../../navbar/mobile-navbar';
import { ContentMobileView } from './mobile-content/content';
import { IDoctorSpecialist, IDataGeneralSearch } from '../../../../data/services/alteaCMS/IAlteaCMS';

export interface IMainLandingContent {
	onRedirect(): void;
	dataPopularSpecialist: IDoctorSpecialist[];
	loading: boolean;
	loadingSearch: boolean;
	history: any;
	open?: boolean;
	anchorRef?: any;
	handleClose?(event: MouseEvent<EventTarget>): void;
	handleListKeyDown?(event: KeyboardEvent): void;
	handleChange?(event: ChangeEvent): void;
	searchData?: IDataGeneralSearch;
	redirectTo(field: string, id: string): void;
}

function _MobileView(props: IMainLandingContent) {
	const { onRedirect, redirectTo, loadingSearch, handleChange, dataPopularSpecialist, searchData, loading, open, handleClose, handleListKeyDown, anchorRef } = props;
	return (
		<div>
			<MobileNavBar {...props} />
			<ContentMobileView
				onRedirect={onRedirect}
				dataPopularSpecialist={dataPopularSpecialist}
				loading={loading}
				open={open}
				handleChange={handleChange}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				searchData={searchData}
				loadingSearch={loadingSearch}
				redirectTo={redirectTo}
				{...props}
			/>
		</div>
	)

}

export const MobileView = memo(_MobileView);