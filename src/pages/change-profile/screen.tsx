import { memo } from "react";
import { ChangeProfileContent } from '../../components/pages-components/change-profile/index';

function _ScreenChangeProfilePage(props: any) {

	const {
		profileUser,
		dataType,
		backStep,
		redirectChangePassword,
		onChangeProfileField,
		openModal,
		handleModal,
		activeFieldName,
		redirectTo,
		handleUploadFiles,
		fileInputRef,
		deleteProfilePics
	} = props;

	return (
		<div className="loginContainer">
			<ChangeProfileContent
				profileUser={profileUser}
				backStep={backStep}
				dataType={dataType}
				redirectChangePassword={redirectChangePassword}
				onChangeProfileField={onChangeProfileField}
				openModal={openModal}
				handleModal={handleModal}
				activeFieldName={activeFieldName}
				redirectTo={redirectTo}
				handleUploadFiles={handleUploadFiles}
				fileInputRef={fileInputRef}
				deleteProfilePics={deleteProfilePics}
				{...props}
			/>
		</div>
	);
}

export const ScreenChangeProfilePage = memo(_ScreenChangeProfilePage);
