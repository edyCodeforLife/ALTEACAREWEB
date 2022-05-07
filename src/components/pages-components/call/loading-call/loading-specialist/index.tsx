import { memo } from 'react';
import styled from 'styled-components';
import { Flex } from '../../../../basic-elements/flex';
import { LabelText } from '../../../create-consultation/index';
import EmptyDoctorImage from '../../../../../assets/image/icons/empty_spesialis.svg';
import { ContainerImageLoader, CustomImageLogo, CustomFlex, ContainerTitle, ContainerDescription } from '../loading-MA/index';

export const CustomContainerTitle = styled(ContainerTitle)`
	width: 100%;
	position: absolute;
	top: 20px;
`;

const ContainerName = styled.div`
	position: absolute;
	top: 70px;
	line-height: 1.6;
`;

export const CustomContainerDescription = styled(ContainerDescription)`
	position: absolute;
	bottom: 0;
	margin-bottom: 100px;
`;

function _LoadingCallSpecialist(props: any) {
	const { appointmentDescription } = props;

	return (
		<CustomFlex>
			<CustomContainerTitle>
				<LabelText
					color={"#3868B0"}
					fsize={14}
					fweight={580}
				>
					Menghubungkan ke
					Dokter Telekonsultasi
				</LabelText>
			</CustomContainerTitle>

			<ContainerName>
				<LabelText
					color={"#3A3A3C"}
					fsize={14}
					fweight={600}
				>
					{appointmentDescription?.doctor.name}
				</LabelText>

				<LabelText
					color={"#3A3A3C"}
					fsize={14}
					fweight={600}
				>
					{appointmentDescription?.doctor.specialist.name}
				</LabelText>
			</ContainerName>

			<Flex>
				<ContainerImageLoader bottom={"50%"}>
					<CustomImageLogo
						src={appointmentDescription?.doctor.photo.url ?? EmptyDoctorImage}
						height={150}
						width={150}
					/>
				</ContainerImageLoader>
			</Flex>

			<CustomContainerDescription>
				<LabelText
					color={"#3868B0"}
					fsize={14}
					fweight={580}
				>
					Mohon tunggu sebentar, Dokter telekonsultasi akan segera melayani Anda.
				</LabelText>
				<LabelText
					color={"#6B7588"}
					fsize={14}
					fweight={500}
					margin={"20px 0px 20px 0px"}
				>
					Untuk meningkatkan layanan, konsultasi ini akan direkam.
				</LabelText>

				<LabelText
					margin={"40px 0px 0px 0px"}
					color={"#FF5C5C"}
					fsize={12}
					lheight={1.6}
					fweight={580}
				>
					Harap Izinkan Camera dan microphone untuk digunakan saat melakukan telekonsultasi dengan {" "}{appointmentDescription?.doctor.name}.
				</LabelText>
			</CustomContainerDescription>
		</CustomFlex>
	);
}

export const LoadingCallSpecialist = memo(_LoadingCallSpecialist);
