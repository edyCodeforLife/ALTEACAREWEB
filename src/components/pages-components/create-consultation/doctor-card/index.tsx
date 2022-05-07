import { memo } from 'react';
import styled from 'styled-components';
import { CustomContainerGrid, ContainerImage, TextLabel } from '../../list-doctor/list-doctor/util-style/list-component';
import { LeftGrid } from '../../../material-grid/index';
import { FlexCenter, FlexRow } from '../../../basic-elements/flex/index';
import { ImageLogo } from '../../../navbar/navbar';
import { DateTimeLabel } from '../../home/appointment-carousel/appointment-box';
import MaterialIcon from '@material/react-material-icon';
import { formattedDate } from '../../../../data/global/function';
import { LabelText } from '../index';
import { FlexMTop } from '../../detail-doctor/detail';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';

export const CustomDateTimeLabel = styled(DateTimeLabel)`
	color: #8F90A6;
`;

const FlexRowSpaceAround = styled(FlexRow)`
	justify-content: space-around;
`;

const ContainerText = styled.div`
	color: #61C7B5;
	font-size: 14px;
`;

const ContainerDoctorCard = styled(CustomContainerGrid)`
	align-items: flex-start;
`;

const CustomizeFlexRow = styled(FlexRow)`
	justify-content: ${(props) => props.jcontent};
	margin-top: 4px;
`;

interface IDoctorCardProps {
	item: any;
	loading?: boolean;
	isForMobileLayout: boolean;
	onClickChangeDoctor(): void;
	activeStep: number;
	mediaValue: string;
}

function _DoctorCard(props: IDoctorCardProps) {
	const { item, isForMobileLayout, loading, onClickChangeDoctor, activeStep, mediaValue } = props;

	return (
		<ContainerDoctorCard
			spacing={3}
			container
		>
			<LeftGrid item xs={3}>
				<ImageLogo
					src={item?.photo?.url ?? EmptyDoctorImage}
					height={70}
					width={70}
				/>
			</LeftGrid>
			<LeftGrid item xs={6}>
				<FlexRow>
					<FlexCenter>
						<ContainerImage isForMobileLayout={isForMobileLayout}>
							<ImageLogo height={20} width={55} src={item.hospital?.[0].icon?.url} />
						</ContainerImage>
					</FlexCenter>

					<FlexCenter>
						<TextLabel
							colorPrimary
						>
							{item?.hospital && item?.hospital.length > 0 ? item?.hospital[0]["name"] : null}
						</TextLabel>
					</FlexCenter>
				</FlexRow>

				<FlexRow style={{ padding: '8px 0px' }}>
					<TextLabel
						bold
						colorPrimary
					>
						{item.name}
					</TextLabel>
				</FlexRow>
				<FlexRow>
					<TextLabel
						bold
						colorPrimary
					>
						Sp.{" "}{item.specialization && item.specialization?.name}
					</TextLabel>
				</FlexRow>
			</LeftGrid>
			{activeStep === 1 && (
				<LeftGrid
					style={{ cursor: 'pointer' }}
					item
					xs={3}
					onClick={onClickChangeDoctor}>
					<CustomizeFlexRow jcontent={"flex-end"}>
						<ContainerText>
							Ubah
					</ContainerText>
					</CustomizeFlexRow>
				</LeftGrid>
			)}

			<FlexRowSpaceAround>
				<FlexRow style={{ marginRight: 50 }}>
					<MaterialIcon
						role={'button'}
						className="defaultcolor"
						icon={'date_range'}
						style={{ marginRight: 5 }}
					/>
					<CustomDateTimeLabel>
						{formattedDate(item?.date, "idn", true, false, true)}
					</CustomDateTimeLabel>
				</FlexRow>

				<FlexRow>
					<MaterialIcon
						role={'button'}
						className="defaultcolor"
						icon={'alarm'}
						style={{ marginRight: 5 }}
					/>

					<CustomDateTimeLabel>
						{item?.start_time} {" - "}
						{item?.end_time}
					</CustomDateTimeLabel>
				</FlexRow>
			</FlexRowSpaceAround>
			{activeStep === 2 && (
				<FlexMTop mtop={15} mbottom={10}>
					<MaterialIcon
						icon={mediaValue === "VIDEO_CALL" ? "video_camera_front" : "call"}
						className="defaultcolor"
					/>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
						margin={"0px 0px 0px 5px"}
					>
						{mediaValue === "VIDEO_CALL" ? "Panggilan Video" : "Panggilan Suara"}
					</LabelText>
				</FlexMTop>
			)}
		</ContainerDoctorCard>
	)

}

export const DoctorCard = memo(_DoctorCard);