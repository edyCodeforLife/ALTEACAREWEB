import { memo } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexCenter } from '../../../../basic-elements/flex';
import { BtnSubmit } from '../../../login/login';
import { BtnGeneral, LabelText } from '../../../create-consultation';
import { ImageLogo } from '../../../../navbar/navbar';
import CSIMage from '../../../../../assets/image/image_customer_service.png';

const CustomModal = styled(Modal)`
	display: flex;
    align-items: center;
    justify-content: center;
	outline: none;
	border: none;
`;

const InsideModal = styled.div`
	background: #fff;
	max-width: 300px;
	height: auto;
	padding: 20px;
	border-radius: 10px;
	width: 300px;
`;

const TextTitle = styled.div`
	color: #333333;
	text-align: center;
	font-weight: 600;
	font-size: 14px;
	margin-bottom: 20px;
`;

const DescriptionText = styled.div`
	font-weight: normal;
	font-size: 14px;
	white-space: pre-line;
	color: #828282;
	line-height: 1.6;
	margin-bottom: 10px;
`;

const TextLabel = styled.div`
	font-weight: normal;
	font-size: 14px;
	color: ${(props) => props.isSection ? '#6B7588' : '#3A3A3C'} ;
	padding: 5px 0px;
	margin-left: ${(props) => props.mleft}px;
`;

const CustomBtn = styled(BtnSubmit)`
	padding: 10px;
	width: 100%;
	background: ${(props) => props.bground};
	color: ${(props) => props.color};
	border: ${(props) => props.border};
`;

export const CustomImageLogo = styled(ImageLogo)`
	border-radius: 100%;
	position: relative;
	margin: 10px 0px;
`;

export const BTNCustom = styled(BtnGeneral)`
	border: 1px solid #61C7B5;
	background: #fff;
	width: 100%;
	color: #61C7B5;
`;

export const ALLOWED_FILE_TYPES =
	'image/*, .svg';


interface IModalProps {
	openModal: boolean;
	activeFieldName: string;
	redirectTo(pathName: string): void;
	handleModal(open: boolean): void;
	fileInputRef: any;
	handleUploadFiles(): void;
	deleteProfilePics(): void;
}

function _ModalProfile(props: IModalProps) {
	const { redirectTo, deleteProfilePics, openModal, handleModal, activeFieldName, fileInputRef, handleUploadFiles } = props;

	const renderModalChangePersonalData = () => {
		return (
			<FlexCenter>
				<LabelText
					color={"#333333"}
					fsize={14}
					fweight={580}
				>
					Ubah Data pribadi
				</LabelText>

				<CustomImageLogo
					src={CSIMage}

				/>

				<LabelText
					color={"#828282"}
					fsize={14}
					talign={"center"}
					lheight={1.4}
				>
					Data pribadi tidak dapat diubah. Untuk mengubahnya silakan hubungi Layanan Pelanggan AlteaCare
				</LabelText>

				<BTNCustom onClick={() => redirectTo('/blocks?type=contact')}>
					Hubungi Customer Service
				</BTNCustom>
			</FlexCenter>

		)
	}

	const renderUpdateAvatar = () => {
		return (
			<FlexCenter>
				<LabelText
					color={"#333333"}
					fsize={14}
					fweight={580}
					talign={"left"}
				>
					Unggah Foto Profile
				</LabelText>

				<BTNCustom onClick={() => fileInputRef.current?.click()}>
					<input
						ref={fileInputRef}
						type="file"
						style={{ display: 'none' }}
						onChange={handleUploadFiles}
						value={''}
						accept={ALLOWED_FILE_TYPES}
					/>
					Buka File
				</BTNCustom>

				<LabelText
					cursor={"pointer"}
					color={"#FF5C5C"}
					fsize={14}
					fweight={600}
					onClick={deleteProfilePics}
					talign={"center"}
					margin={"10px 0px"}
				>
					Hapus Foto
				</LabelText>

			</FlexCenter>

		)
	}

	const switchInsideContent = (type) => {
		switch (type) {
			case "avatar":
				return renderUpdateAvatar();
			case "profile":
				return renderModalChangePersonalData();
		}
	}

	return (
		<div>
			<CustomModal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openModal}
				onClose={() => handleModal(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModal}>
					<InsideModal>
						{switchInsideContent(activeFieldName)}
					</InsideModal>
				</Fade>
			</CustomModal>
		</div>
	);
}

export const ModalProfile = memo(_ModalProfile);