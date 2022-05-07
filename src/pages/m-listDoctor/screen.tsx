import { memo } from "react";
import { MobileListDoctor } from '../../components/pages-components/list-doctor/mobileListDoctor/index';
import { isMobile } from "../../data/global/function";

function _ScreenMobileListDoctor(props: any) {

	const { doctorList, onChooseScheduleRedirect, selectedIndex, onChangePage, currentPage, onSearchChange, loading, dataSpecialist, hospitalList, masterDoctorList } = props;

	return (
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
				useFooter={!isMobile()}
				isMobileLayout={true}
				onChooseScheduleRedirect={onChooseScheduleRedirect}
				{...props}
			/>
		</div>
	);
}

export const ScreenMobileListDoctor = memo(_ScreenMobileListDoctor);
