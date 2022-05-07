import { memo, useState, useEffect, useRef, ChangeEvent } from "react";
import { ScreenChangeProfilePage } from './screen';
import {
	IAlteaCMSService,
	AlteaCMSService,
	IProfileUserService,
	ProfileUserService,
	IAuthServiceAltea,
	AuthServiceAltea
} from '../../data/business/index';
import { QrsToObj } from '../../data/global/function';
import { AltAlert } from '../../components/alert/index';
import { useGlobalState } from '../../data/states';
import { USER_ACTIONS } from '../../data/reducers/user-reducer';

function _ChangeProfilePage(props) {
	const qrs = QrsToObj(window.location.search);
	const dataType = qrs.type;
	const fileInputRef = useRef<HTMLInputElement>(null);
	const userInteraction = useRef(false);
	const _ProfileService: IProfileUserService = new ProfileUserService();
	const [profileUser, setProfileUser] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const _CMSService: IAlteaCMSService = new AlteaCMSService();
	const [activeFieldName, setActiveFieldName] = useState("");
	const [_, dispatch] = useGlobalState();
	const _AuthService: IAuthServiceAltea = new AuthServiceAltea();
	const [toggleActivation, setToggleActivation] = useState(false)
	const [isSendingFile, setIsSendingFile] = useState(false);
	const [fileSendError, setFileSendError] = useState<string | null>(null);

	const getProfile = () => {
		_ProfileService.getProfile({
			Success: (res: any) => {
				setProfileUser(res.data);
				dispatch({
					type: USER_ACTIONS.CHANGE_USER,
					data: { user: res.data.data },
				});
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: res.message,
					type: 'warning',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		});
	}

	const switchAPI = (type: string) => {
		switch (type) {
			case 'changeProfile':
				return getProfile();
			case 'settings':
				return null;
		}
	}

	const onChangeProfileField = (fieldName: string) => {
		userInteraction.current = true;
		setActiveFieldName(fieldName);
		setToggleActivation(!toggleActivation);
	}

	useEffect(() => {
		userInteraction.current && handleInteraction();
	}, [toggleActivation]);

	const handleInteraction = () => {
		if (activeFieldName === "avatar" || activeFieldName === "profile") {
			handleModal(true);
		}

		if (activeFieldName === "phone" || activeFieldName === "email") {
			props.history.push(`/verify?type=${activeFieldName}`);
		}
	}

	useEffect(() => {
		if (!dataType) {
			props.history.push('/profile');
		} else {
			switchAPI(dataType)
		}
	}, []);

	const backStep = (path) => {
		props.history.push(path)
	}

	const redirectChangePassword = (step) => {
		props.history.push(`/change-password?step=${step}`);
	}

	const handleModal = (isOpen: boolean) => {
		setOpenModal(isOpen);
	}

	const redirectTo = (pathName) => {
		props.history.push(pathName)
	}

	const updateAvatar = (fileId) => {
		const avatar = {
			avatar: fileId
		}
		_AuthService.updateAvatar(avatar, {
			Success: (res: any) => {
				getProfile();
				setTimeout(() => {
					handleModal(false);
				}, 250);
				AltAlert.show({
					title: "Success",
					subtitle: "Foto Profile berhasil di update",
					type: 'success',
				});
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: res.message,
					type: 'info',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	const handleUploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			let max = 10;
			let { size, name } = file;
			let sizeInMb = size / 1024 / 1024;
			if (sizeInMb > max) {
				AltAlert.show({
					title: "Ukuran File melebihi batas",
					subtitle: "Maksimal ukuran file yang di upload adalah 10 MB",
					type: 'warning',
				});
				return;
			}
			let formData = new FormData();
			formData.append('files', file);
			const fr = new FileReader();
			setIsSendingFile(true);
			setFileSendError(null);
			fr.onload = function () {
				_CMSService.UploadDocumentFiles(formData, {
					Success: (res: any) => {
						setIsSendingFile(false);
						updateAvatar(res.data?.id);
					},
					NotFound: (res: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: res.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
					ValidationError: (data: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: data.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
					handleLargePayload: (data: any) => {
						setFileSendError('File size is too large. Maximum file size is 10MB.');
					},
					ServerError: (data: any) => {
						AltAlert.show({
							title: "Error",
							subtitle: data.message,
							type: 'warning',
						});
						setFileSendError('There was a problem uploading the file. Please try again.');
						setIsSendingFile(false);
					},
				})
			}
			fr.readAsDataURL(file);
		}
	}

	const deleteProfilePics = () => {
		_AuthService.deleteAvatar({
			Success: (res: any) => {
				getProfile();
				setTimeout(() => {
					handleModal(false);
				}, 250);
				AltAlert.show({
					title: "Success",
					subtitle: "Foto Profil berhasil dihapus",
					type: 'success',
				});
			},
			NotFound: (res: any) => {
				AltAlert.show({
					title: "Info",
					subtitle: res.message,
					type: 'info',
				});
			},
			ValidationError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
			ServerError: (data: any) => {
				AltAlert.show({
					title: "Error",
					subtitle: data.message,
					type: 'warning',
				});
			},
		})
	}

	return (
		<ScreenChangeProfilePage
			profileUser={profileUser}
			backStep={backStep}
			onChangeProfileField={onChangeProfileField}
			dataType={dataType}
			redirectChangePassword={redirectChangePassword}
			openModal={openModal}
			handleModal={handleModal}
			activeFieldName={activeFieldName}
			redirectTo={redirectTo}
			handleUploadFiles={handleUploadFiles}
			fileInputRef={fileInputRef}
			deleteProfilePics={deleteProfilePics}
			{...props}
		/>
	)
}
export const ChangeProfilePage = memo((_ChangeProfilePage))
