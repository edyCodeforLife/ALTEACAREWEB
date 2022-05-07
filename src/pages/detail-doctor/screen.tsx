import { memo } from "react";
import { DetailDoctorContent } from '../../components/pages-components/detail-doctor/detail';

function _ScreenDetailPage(props: any) {

	const { doctorDetail, dataTermsRefundCancel, open, onClickSetSchedule, handleScheduleTime, handleActiveCalendar, activeCalendarDate, onChange, handleModal, loading, selectedScheduleUser, onRedirect, doctorSchedule, onClickDaySchedule, selectedDate, redirectTo } = props;

	return (
		<div className="loginContainer">
			<DetailDoctorContent
				doctorDetail={doctorDetail}
				isForMobileLayout={true}
				onClickDaySchedule={onClickDaySchedule}
				selectedDate={selectedDate}
				doctorSchedule={doctorSchedule}
				loading={loading}
				handleModal={handleModal}
				open={open}
				redirectTo={redirectTo}
				onChange={onChange}
				handleActiveCalendar={handleActiveCalendar}
				activeCalendarDate={activeCalendarDate}
				handleScheduleTime={handleScheduleTime}
				onClickSetSchedule={onClickSetSchedule}
				selectedScheduleUser={selectedScheduleUser}
				dataTermsRefundCancel={dataTermsRefundCancel}
				{...props}
			/>
		</div>
	);
}

export const ScreenDetailPage = memo(_ScreenDetailPage);
