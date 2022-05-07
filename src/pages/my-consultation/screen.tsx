import { memo } from "react";
import { MyConsultationContent } from '../../components/pages-components/my-consultation/index';

function _ScreenMyConsultation(props: any) {

	const {
		handleChangeActiveTab,
		activeFilterPeriod,
		handleSelectedPeriodFilter,
		tabValue,
		handleChangeIndex,
		activeAppointmentList,
		loading,
		searchQuery,
		handleChange,
		sortOption,
		onChangeRadio,
		changeSort,
		handleClickBox
	} = props;

	return (
		<div className="loginContainer">
			<MyConsultationContent
				handleChangeActiveTab={handleChangeActiveTab}
				handleChangeIndex={handleChangeIndex}
				tabValue={tabValue}
				activeAppointmentList={activeAppointmentList}
				loading={loading}
				handleSelectedPeriodFilter={handleSelectedPeriodFilter}
				activeFilterPeriod={activeFilterPeriod}
				searchQuery={searchQuery}
				handleChange={handleChange}
				onChangeRadio={onChangeRadio}
				sortOption={sortOption}
				changeSort={changeSort}
				handleClickBox={handleClickBox}
				{...props}
			/>
		</div>
	);
}

export const ScreenMyConsultation = memo(_ScreenMyConsultation);
