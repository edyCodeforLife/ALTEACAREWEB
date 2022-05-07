import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { FlexOneCustom } from '../../register/register';
import { FlexCenter, FlexRow } from '../../../basic-elements/flex';
import CustomScroll from 'react-custom-scroll';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import { LabelText } from '../../create-consultation';
import { ContainerInsideContent, ContainerProfile } from '../../profile/profile';
import { Avatar } from '../../../avatar/avatar';
import { getInitials } from '../../../../data/global/function';
import Person from '../../../../assets/image/icons/icon_person.png';
import { ImageLogo } from '../../../navbar/navbar';
import CameraRoundIcon from '../../../../assets/image/icons/camera_round_icon.png';
import { ClickLabel } from '../settings/settings';
import { ContainerPatientProfile } from '../../detail-consultation/tab-detail-consultation/tabs/patient-data/patient-data';
import { UserProfile } from './profile/profile';
import { ModalProfile } from '../update-profile/modal/modal-profile';

const ContainerInside = styled(FlexCenter)`
	margin-top: 60px;
	height: calc(100vh - 180px);
	box-sizing: border-box;
	width: 100%;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

export const ContainerGrey = styled(FlexRow)`
	background: #EBEBF0;
	padding: 10px 20px;
`;

const ContainerUserProfile = styled(ContainerPatientProfile)`
	width: 100%;
	box-shadow: unset;
`;

function _UpdateProfile(props: any) {
	const {
		profileUser,
		backStep,
		handleUploadFiles,
		fileInputRef,
		onChangeProfileField,
		loading,
		openModal,
		handleModal,
		activeFieldName,
		redirectTo,
		deleteProfilePics
	} = props;

	const fullName = profileUser?.first_name + " " + profileUser?.last_name;

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/profile')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Ubah Profile
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<CustomScroll flex="1" heightRelativeToParent={'100%'}>
						<ContainerGrey>
							<LabelText
								color={"#2C528B"}
								fsize={14}
								fweight={600}
							>
								Foto Profile
							</LabelText>
						</ContainerGrey>
						<ContainerInsideContent padding={"16px"}>
							<Avatar
								onClick={() => { onChangeProfileField("avatar") }}
								style={{ cursor: 'pointer' }}
								size={60}
								bgcolor={profileUser.user_details?.avatar ?
									"#61C7B5" :
									"#D6EDF6"
								}
								textData={getInitials(fullName)}
								image={
									profileUser.user_details?.avatar ?
										profileUser.user_details?.avatar?.url :
										Person
								}
							>
								<ImageLogo
									style={{ position: 'absolute', bottom: 0, right: 5 }}
									src={CameraRoundIcon}
									width={20}
									height={20}
								/>
							</Avatar>
							<ContainerProfile>
								<LabelText
									color={"#8F90A6"}
									fsize={14}
									margin={"0px 10px"}
								>
									Ketuk Profile untuk mengganti gambar
								</LabelText>
							</ContainerProfile>
						</ContainerInsideContent>
						<ContainerGrey>
							<LabelText
								color={"#2C528B"}
								fsize={14}
								fweight={600}
							>
								Nomor Handphone
							</LabelText>
						</ContainerGrey>
						<ContainerInsideContent jcontent={"space-between"} padding={" 10px 20px"}>
							<LabelText
								color={"#8F90A6"}
								fsize={14}
							>
								{profileUser?.phone}
							</LabelText>
							<ClickLabel
								onClick={() => { onChangeProfileField("phone") }}
								color={"#61C7B5"}
								fsize={14}
								fweight={600}
							>
								Ubah
							</ClickLabel>
						</ContainerInsideContent>
						<ContainerGrey>
							<LabelText
								color={"#2C528B"}
								fsize={14}
								fweight={600}
							>
								Email
							</LabelText>
						</ContainerGrey>
						<ContainerInsideContent jcontent={"space-between"} padding={" 10px 20px"}>
							<LabelText
								color={"#8F90A6"}
								fsize={14}
							>
								{profileUser?.email}
							</LabelText>
							<ClickLabel
								onClick={() => { onChangeProfileField("email") }}
								color={"#61C7B5"}
								fsize={14}
								fweight={600}
							>
								Ubah
							</ClickLabel>
						</ContainerInsideContent>
						<ContainerGrey>
							<LabelText
								color={"#2C528B"}
								fsize={14}
								fweight={600}
							>
								Data Personal
							</LabelText>
						</ContainerGrey>
						<ContainerInsideContent jcontent={"flex-end"} padding={" 10px 20px"}>
							<ClickLabel
								onClick={() => { onChangeProfileField("profile") }}
								color={"#61C7B5"}
								fsize={14}
								fweight={600}
							>
								Ubah
							</ClickLabel>
						</ContainerInsideContent>
						<ContainerUserProfile>
							<UserProfile
								item={profileUser}
								fullName={fullName}
							/>
						</ContainerUserProfile>
					</CustomScroll>
				</ContainerInside>
			</FlexRowCenterDetail >
			<ModalProfile
				openModal={openModal}
				handleUploadFiles={handleUploadFiles}
				fileInputRef={fileInputRef}
				redirectTo={redirectTo}
				activeFieldName={activeFieldName}
				handleModal={handleModal}
				deleteProfilePics={deleteProfilePics}
			/>
		</Fragment>
	);
}

export const UpdateProfile = memo(_UpdateProfile);