import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { ImageLogo } from '../../../navbar/navbar';
import Flex, { FlexOne, FlexRow } from '../../../basic-elements/flex';
import MaterialIcon from '@material/react-material-icon';
import { formattedDate } from '../../../../data/global/function';
import {
	ContainerBox,
	SmallBoxCustom,
	CustomFlexRow,
	ContainerInsideItem,
	ContainerMeetDoctor,
	TextLabel,
	ContainerDoctorInfo,
	TextHospital,
	TextLabelDoctor,
	FlexRowSpaceBetween,
	DateTimeLabel
} from '../../home/appointment-carousel/appointment-box';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';

export const CustomContainerDoctorInfo = styled(ContainerDoctorInfo)`
	padding: 10px 0px;
	justify-content: flex-start;
`;

const CustomBox = styled(ContainerBox)`
	box-sizing: border-box;
	width: 350px;
	cursor: auto;
	min-width: 350px;
		@media (max-width: 768px) {
			min-width: 0px;
			width: calc(100% - 40px);
		};
`;

export const CustomDateTimeLabel = styled(DateTimeLabel)`
	color: #8F90A6;
`;

function _BoxDoctor(props: any) {
	const {
		appointmentDescription
	} = props;

	const appointmentTimeFormmatted = (time) => {
		if (!time) return;
		const data = time.split(":");
		const hour = data[0];
		const minute = data[1];
		return `${hour}:${minute}`;
	}

	return (
		<Fragment>
			<CustomBox normal>
				<SmallBoxCustom>
					<CustomFlexRow>
						<ContainerInsideItem>
							<TextLabel>
								Order ID: {appointmentDescription?.order_code}
							</TextLabel>
						</ContainerInsideItem>
					</CustomFlexRow>

					<CustomContainerDoctorInfo>
						<ImageLogo
							src={appointmentDescription.doctor?.photo.url ?? EmptyDoctorImage}
							width={60}
							height={60}
						/>
						<Flex>
							<FlexRow>
								<ImageLogo
									style={{ padding: '5px 10px' }}
									src={appointmentDescription.doctor?.hospital.logo}
									height={15}
									width={40}
								/>
								<TextHospital>{appointmentDescription.doctor?.hospital.name}</TextHospital>
							</FlexRow>

							<FlexRow>
								<TextLabelDoctor talign={"left"} fSize={14} fWeight={600}>
									{appointmentDescription.doctor?.name}
								</TextLabelDoctor>
							</FlexRow>

							<FlexRow>
								<TextLabelDoctor fSize={12} fWeight={500}>
									{appointmentDescription.doctor?.specialist.name}
								</TextLabelDoctor>
							</FlexRow>
						</Flex>
					</CustomContainerDoctorInfo>

					<FlexRowSpaceBetween>
						<FlexRow>
							<MaterialIcon
								role={'button'}
								className="calendarIcon-grey"
								icon={'date_range'}
							/>
							<CustomDateTimeLabel>
								{formattedDate(appointmentDescription.schedule?.date, "idn", true, false, true)}
							</CustomDateTimeLabel>
						</FlexRow>

						<FlexRow>
							<MaterialIcon
								role={'button'}
								className="calendarIcon-grey"
								icon={'alarm'}
							/>

							<CustomDateTimeLabel>
								{appointmentTimeFormmatted(appointmentDescription?.schedule?.time_start)} {" - "}
								{appointmentTimeFormmatted(appointmentDescription?.schedule?.time_end)}
							</CustomDateTimeLabel>
						</FlexRow>
					</FlexRowSpaceBetween>
				</SmallBoxCustom>
			</CustomBox>
		</Fragment>
	);
}

export const BoxDoctor = memo(_BoxDoctor);