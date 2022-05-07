import { memo } from "react";
import { HomeContent } from '../../components/pages-components/home/home';

function _ScreenHomePage(props: any) {

	const { profileUser, handleClickBanner, loading, bannerData, anchorRef, handleClick, handleChange, dataSpecialist, onRedirect, appointmentList, handleClickBox } = props;

	return (
		<div className="loginContainer">
			<HomeContent
				profileUser={profileUser}
				dataSpecialist={dataSpecialist}
				loading={loading}
				handleClickBanner={handleClickBanner}
				onRedirect={onRedirect}
				appointmentList={appointmentList}
				handleClickBox={handleClickBox}
				anchorRef={anchorRef}
				handleClick={handleClick}
				handleChange={handleChange}
				bannerData={bannerData}
				{...props}
			/>
		</div>
	);
}

export const ScreenHomePage = memo(_ScreenHomePage);
