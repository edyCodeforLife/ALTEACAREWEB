import { Fragment, memo, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import { NavBar } from "../../components/navbar/navbar";
import { MainLandingContent } from '../../components/pages-components/landing/main';
import { Footer } from "../../components/footer/footer";
import { SectionFooter } from "../../components/footer/section-footer";
import { MobileView } from '../../components/pages-components/landing/mobile-view/mobile-landing';
import { isMobile } from '../../data/global/function';
import { IDoctorSpecialist, IDataGeneralSearch, IDataSosMed } from '../../data/services/alteaCMS/IAlteaCMS';

interface ILandingScreen {
	onRedirect(): void;
	dataSpecialist: IDoctorSpecialist[];
	dataPopularSpecialist: IDoctorSpecialist[];
	loading: boolean;
	loadingSearch: boolean;
	handleRedirectSpecialist(): void;
	history: any;
	open?: boolean;
	anchorRef?: any;
	handleClose?(event: MouseEvent<EventTarget>): void;
	handleListKeyDown?(event: KeyboardEvent): void;
	handleChange?(event: ChangeEvent): void;
	searchData?: IDataGeneralSearch;
	redirectTo(field: string, id: string): void;
	dataSosMed: IDataSosMed[];
}

function _ScreenLandingPage(props: ILandingScreen) {
	const { onRedirect, dataPopularSpecialist, redirectTo, dataSosMed, loadingSearch, handleChange, searchData, dataSpecialist, history, loading, handleRedirectSpecialist, open, anchorRef, handleListKeyDown, handleClose } = props;

	const RenderWebView = () => {
		return (
			<Fragment>
				<NavBar
					handleRedirectSpecialist={handleRedirectSpecialist}
					dataSpecialist={dataSpecialist}
					history={history}
				/>
				<MainLandingContent
					loading={loading}
					onRedirect={onRedirect}
					dataPopularSpecialist={dataPopularSpecialist}
					open={open}
					anchorRef={anchorRef}
					handleClose={handleClose}
					handleListKeyDown={handleListKeyDown}
					handleChange={handleChange}
					searchData={searchData}
					loadingSearch={loadingSearch}
					redirectTo={redirectTo}
				/>
				<SectionFooter dataSosMed={dataSosMed} />
				<Footer />
			</Fragment>
		)
	}
	return (
		<div className="homeContainer">
			{isMobile() ? (
				<MobileView
					loading={loading}
					onRedirect={onRedirect}
					dataPopularSpecialist={dataPopularSpecialist}
					open={open}
					anchorRef={anchorRef}
					handleClose={handleClose}
					handleListKeyDown={handleListKeyDown}
					handleChange={handleChange}
					searchData={searchData}
					loadingSearch={loadingSearch}
					redirectTo={redirectTo}
					{...props}
				/>
			) : (
				<RenderWebView />
			)}

		</div>
	);
}

export const ScreenLandingPage = memo(_ScreenLandingPage);
