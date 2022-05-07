import { memo } from "react";
import { ProfileContent } from '../../components/pages-components/profile/profile';

function _ScreenProfilePage(props: any) {

	const {
		profileUser,
		loading,
		handleClickField
	} = props;

	return (
		<div className="loginContainer">
			<ProfileContent
				profileUser={profileUser}
				loading={loading}
				handleClickField={handleClickField}
				{...props}
			/>
		</div>
	);
}

export const ScreenProfilePage = memo(_ScreenProfilePage);
