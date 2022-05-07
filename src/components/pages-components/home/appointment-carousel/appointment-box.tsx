import { SmallBoxContainer } from '../../../basic-elements/box-card/small-box';
import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { ImageLogo } from '../../../navbar/navbar';
import { CustomSkeleton } from '../../../basic-elements/skeleton/skeleton'
import Flex, { FlexRow } from '../../../basic-elements/flex';
import IconMitrakeluarga from '../../../../assets/image/icons/icon_mitrakeluarge.svg';
import MaterialIcon from '@material/react-material-icon';
import { formattedDate } from '../../../../data/global/function';
import SpecialistInactive from '../../../../assets/image/spesialis_inactive.png';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';
import { ContainerCustomSkeleton } from '../home';

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	min-height: 100px;
	height: ${(props) => props.height}px;
	min-width: 10px;
	padding: 14px;
	width: auto;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 50px;
		min-width: 50px;
		padding: 14px 10px;
	}
`;

export const TextLabel = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 11px;
	color: #8F90A6;
		@media (max-width: 350px) {
			font-size: 10px;
	}
`;

export const ContainerBox = styled.div`
	padding: ${(props) => props.normal ? '0px 5px' : '9px 0px'} ;
	margin: 0px 3px;
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding: ${(props) => props.normal ? '2px 2px;' : '8px 0px'} ;
		margin: 0px 2px;
	}
`;

export const CustomFlexRow = styled(FlexRow)`
	justify-content: space-between;
	width: 100%;
`;

export const ContainerInsideItem = styled.div`
	text-align: ${(props) => props.tAlign}
`;

export const ContainerMeetDoctor = styled.div`
	padding: 2px;
	width: auto;
	height: 19px;
	background: ${(props) => props.bg_color};
	border-radius: 4px;
	display: flex;
	justify-content: center;
	color: ${(props) => props.text_color};
	font-size: 12px;
	line-height: 1.6;
	text-align: center;
`;

const HorizontalLine = styled.div`
	height: 1px;
    background: rgba(0,0,0, .2);
    width: 100%;
    content: ' ';
    display: block;
	margin: 10px 0px;
`;

export const ContainerDoctorInfo = styled(FlexRow)`
	align-items: center;
	width: 100%;
	justify-content: space-around;
`;

export const TextHospital = styled.span`
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	color: #6B7588;
`;

export const TextLabelDoctor = styled.div`
	font-style: normal;
	font-weight: ${(props) => props.fWeight};
	font-size: ${(props) => props.fSize}px;
	text-align: ${(props) => props.talign};
	color: #3A3A3C;
	padding-left: 15px;
	line-height: 1.6;
`;

export const DateTimeLabel = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	color: #3868B0;
`;

export const FlexRowSpaceBetween = styled(FlexRow)`
	justify-content: space-between;
	width: 100%;
`;

const ContainerEmptyAppointment = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
`;

const ContainerTextEmpty = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	color: #C7C9D9;
	margin-top: 10px;
`;

const Icon = styled(MaterialIcon)`
	color:#61C7B5;
`;

export interface IBoxAppointment {
	id: string;
	item: any;
	loading: boolean;
	isNormalBox: boolean;
	handleClickBox(id: number, status: string, transaction: any): void;
}

function _BoxAppointment(props: IBoxAppointment) {
	const {
		id,
		item,
		loading,
		isNormalBox,
		handleClickBox
	} = props;

	const appointmentTimeFormmatted = (time) => {
		const data = time.split(":");
		const hour = data[0];
		const minute = data[1];
		return `${hour}:${minute}`;
	}

	const renderSkeletonLoading = () => {
		return (
			<Fragment>
				<CustomFlexRow>
					<ContainerInsideItem>
						<TextLabel>
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={20}
								mobilewidth={140}
								width={140}
								isForMobileLayout
							/>
						</TextLabel>
					</ContainerInsideItem>

					<ContainerInsideItem>
						<CustomSkeleton
							animation="wave"
							variant="text"
							mobileheight={35}
							height={35}
							mobilewidth={70}
							width={70}
							isForMobileLayout
						/>
					</ContainerInsideItem>
				</CustomFlexRow>

				<HorizontalLine />

				<ContainerDoctorInfo>
					<CustomSkeleton
						animation="wave"
						variant="circle"
						mobileheight={60}
						height={60}
						mobilewidth={60}
						width={60}
						isForMobileLayout
					/>
					<Flex>
						<ContainerCustomSkeleton loading={loading} width={"90%"}>
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={20}
								mobilewidth={40}
								width={40}
								isForMobileLayout
							/>
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={20}
								height={20}
								mobilewidth={100}
								width={100}
								isForMobileLayout
							/>
						</ContainerCustomSkeleton>

						<FlexRow>
							<TextLabelDoctor fSize={14} fWeight={600}>
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={150}
									width={150}
									isForMobileLayout
								/>
							</TextLabelDoctor>
						</FlexRow>

						<FlexRow>
							<TextLabelDoctor fSize={12} fWeight={500}>
								<CustomSkeleton
									animation="wave"
									variant="text"
									mobileheight={20}
									height={20}
									mobilewidth={120}
									width={120}
									isForMobileLayout
								/>
							</TextLabelDoctor>
						</FlexRow>
					</Flex>
					<CustomSkeleton
						animation="wave"
						variant="rect"
						mobileheight={30}
						height={30}
						mobilewidth={20}
						width={20}
						isForMobileLayout
					/>

				</ContainerDoctorInfo>

				<HorizontalLine />

				<FlexRowSpaceBetween>
					<ContainerCustomSkeleton loading={loading} width={"55%"}>
						<CustomSkeleton
							animation="wave"
							variant="rect"
							mobileheight={20}
							height={20}
							mobilewidth={20}
							width={20}
							isForMobileLayout
						/>
						<DateTimeLabel>
							<CustomSkeleton
								animation="wave"
								variant="text"
								mobileheight={15}
								height={15}
								mobilewidth={120}
								width={120}
								isForMobileLayout
							/>
						</DateTimeLabel>
					</ContainerCustomSkeleton>

					<ContainerCustomSkeleton loading={loading} width={"35%"}>
						<CustomSkeleton
							animation="wave"
							variant="rect"
							mobileheight={20}
							height={20}
							mobilewidth={20}
							width={20}
							isForMobileLayout
						/>

						<CustomSkeleton
							animation="wave"
							variant="text"
							mobileheight={15}
							height={15}
							mobilewidth={30}
							width={30}
							isForMobileLayout
						/>

						<CustomSkeleton
							animation="wave"
							variant="text"
							mobileheight={15}
							height={15}
							mobilewidth={30}
							width={30}
							isForMobileLayout
						/>
					</ContainerCustomSkeleton>
				</FlexRowSpaceBetween>
			</Fragment>
		)
	}

	const renderActualAppointment = () => {
		return (
			item.order_code !== "" ? (
				<Fragment>
					<CustomFlexRow>
						<ContainerInsideItem>
							<TextLabel>
								Order ID: {item.order_code}
							</TextLabel>
						</ContainerInsideItem>

						<ContainerInsideItem>
							<ContainerMeetDoctor
								bg_color={item.status_detail?.bg_color}
								text_color={item.status_detail?.text_color}
							>
								{item.status_detail?.label}
							</ContainerMeetDoctor>
						</ContainerInsideItem>
					</CustomFlexRow>

					<HorizontalLine />

					<ContainerDoctorInfo>
						<ImageLogo
							src={item.doctor?.photo.url ?? EmptyDoctorImage}
							width={60}
							height={60}
						/>
						<Flex>
							<FlexRow>
								<ImageLogo
									src={IconMitrakeluarga}
									height={25}
									width={50}
								/>
								<TextHospital>{item.doctor?.hospital.name}</TextHospital>
							</FlexRow>

							<FlexRow>
								<TextLabelDoctor talign={"left"} fSize={14} fWeight={600}>
									{item.doctor?.name}
								</TextLabelDoctor>
							</FlexRow>

							<FlexRow>
								<TextLabelDoctor fSize={12} fWeight={500}>
									{item.doctor?.specialist.name}
								</TextLabelDoctor>
							</FlexRow>
						</Flex>
						<Icon
							icon={"arrow_forward_ios"}
						/>
					</ContainerDoctorInfo>

					<HorizontalLine />

					<FlexRowSpaceBetween>
						<FlexRow>
							<MaterialIcon
								role={'button'}
								className="calendarIcon"
								icon={'date_range'}
							/>
							<DateTimeLabel>
								{formattedDate(item.schedule?.date, "idn", true, false, true)}
							</DateTimeLabel>
						</FlexRow>

						<FlexRow>
							<MaterialIcon
								role={'button'}
								className="calendarIcon"
								icon={'alarm'}
							/>

							<DateTimeLabel>
								{appointmentTimeFormmatted(item.schedule?.time_start)} {" - "}
								{appointmentTimeFormmatted(item.schedule?.time_end)}
							</DateTimeLabel>
						</FlexRow>
					</FlexRowSpaceBetween>
				</Fragment>
			) : (
				<ContainerEmptyAppointment>
					<Flex>
						<ImageLogo
							src={SpecialistInactive}
							height={25}
							width={25}
						/>
					</Flex>

					<Flex>
						<ContainerTextEmpty>
							Tidak ada konsultasi hari ini
						</ContainerTextEmpty>

					</Flex>
				</ContainerEmptyAppointment>
			)
		)
	}

	return (
		<div onClick={() => handleClickBox(item.id, item.status, item.transaction)}>
			<ContainerBox normal={isNormalBox} id={id}>
				<SmallBoxCustom height={item.order_code !== "" ? null : 160}>
					{
						loading ? (
							renderSkeletonLoading()
						) : (
							renderActualAppointment()
						)
					}

				</SmallBoxCustom>
			</ContainerBox>
		</div>
	)
}

export const BoxAppointment = memo(_BoxAppointment);

