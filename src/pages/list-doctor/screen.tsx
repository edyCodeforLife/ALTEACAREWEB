import { Fragment, memo } from "react";
import { IOpen } from '../../components/pages-components/list-doctor/side-list/card';
import { NavBar } from "../../components/navbar/navbar";
import { ContainerContentListDoc } from '../../components/pages-components/list-doctor/content-list';
import { Footer } from "../../components/footer/footer";
import { SectionFooter } from "../../components/footer/section-footer";
import { IDoctorSpecialist, IHospitalList, IDoctorList, IDataSosMed } from '../../data/services/alteaCMS/IAlteaCMS';
import { isMobile } from '../../data/global/function';
import { MobileListDoctor } from '../../components/pages-components/list-doctor/mobileListDoctor/index';

interface IContentList {
	open: IOpen;
	handleClickSideList(query): void;
	handleToggleSpecialist(value: number): void;
	handleToggleHospital(value: number): void;
	checkedSpecialist: number[];
	checkedHospital: number[];
	dataSpecialist: IDoctorSpecialist[];
	hospitalList: IHospitalList[];
	masterDoctorList: IDoctorList[];
	doctorList: IDoctorList[];
	priceList: string[];
	datalist: any[];
	anchorEl: null | HTMLElement;
	handleClickFilter(event: React.MouseEvent<HTMLElement>): void;
	handleCloseFilter(): void;
	labelName: string;
	selectedIndex: number;
	chunkNumber: number;
	currentPage: number;
	loading: boolean;
	onChangePage(e: object, page: number): void;
	handleRedirectSpecialist(id: any): void;
	handleClickSelected(item: any): void;
	onSearchChange(): void;
	onChooseScheduleRedirect(doctorId: string): void;
	history: any;
	dataSosMed: IDataSosMed[];
}

function _ScreenListDoctor(props: IContentList) {
	const {
		datalist,
		history,
		onSearchChange,
		onChooseScheduleRedirect,
		handleRedirectSpecialist,
		currentPage,
		chunkNumber,
		selectedIndex,
		masterDoctorList,
		doctorList,
		anchorEl,
		handleClickFilter,
		handleCloseFilter,
		labelName,
		open,
		priceList,
		handleClickSideList,
		handleToggleSpecialist,
		handleToggleHospital,
		checkedHospital,
		checkedSpecialist,
		dataSpecialist,
		hospitalList,
		onChangePage,
		loading,
		handleClickSelected,
		dataSosMed
	} = props;

	return (
		<Fragment>
			{isMobile() ? (
				<div className="loginContainer">
					<MobileListDoctor
						loading={loading}
						doctorList={doctorList}
						dataSpecialist={dataSpecialist}
						hospitalList={hospitalList}
						masterDoctorList={masterDoctorList}
						selectedIndex={selectedIndex}
						onSearchChange={onSearchChange}
						currentPage={currentPage}
						onChangePage={onChangePage}
						useFooter={true}
						isMobileLayout={false}
						{...props}
					/>
				</div>
			) : (
				<div className="homeContainer listContainer">
					<NavBar handleRedirectSpecialist={handleRedirectSpecialist} dataSpecialist={dataSpecialist} history={history} />
					<ContainerContentListDoc
						dataSpecialist={dataSpecialist}
						onSearchChange={onSearchChange}
						hospitalList={hospitalList}
						handleClickSideList={handleClickSideList}
						open={open}
						handleToggleHospital={handleToggleHospital}
						handleToggleSpecialist={handleToggleSpecialist}
						checkedHospital={checkedHospital}
						checkedSpecialist={checkedSpecialist}
						priceList={priceList}
						datalist={datalist}
						doctorList={doctorList}
						anchorEl={anchorEl}
						handleCloseFilter={handleCloseFilter}
						handleClickFilter={handleClickFilter}
						labelName={labelName}
						masterDoctorList={masterDoctorList}
						selectedIndex={selectedIndex}
						chunkNumber={chunkNumber}
						onChangePage={onChangePage}
						currentPage={currentPage}
						loading={loading}
						handleClickSelected={handleClickSelected}
						onChooseScheduleRedirect={onChooseScheduleRedirect}
					/>
					<SectionFooter dataSosMed={dataSosMed} />
					<Footer />
				</div>
			)}
		</Fragment>

	);
}
export const ScreenListDoctor = memo(_ScreenListDoctor);
