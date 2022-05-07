import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { ContainerDataPatient, LabelText } from '../../../create-consultation/index';
import { DateTimeLabel } from '../../../home/appointment-carousel/appointment-box';
import { FlexRowSpaceBetween } from '../../../home/appointment-carousel/appointment-box';
import { formattedDate } from '../../../../../data/global/function';
import { Flex } from '../../../../basic-elements/flex/index';

export const CustomDateTimeLabel = styled(DateTimeLabel)`
	color: #8F90A6;
`;

interface IUserProfileProps {
	item: any;
	fullName: string;
	loading?: boolean
}

const FlexStart = styled(Flex)`
	justify-content: flex-start;
	white-space: pre-line;
	align-items: flex-start;
`;

const CustomDataPatientContainer = styled(ContainerDataPatient)`
	padding: 5px;
	border-bottom: ${props => props.bbottom};
	border-top: ${props => props.btop};
	border-left: none;
	border-right: none;
	box-shadow: unset;
	@media (max-width: 360px) {
		padding: 5px 0px;
	}
`;

function _UserProfile(props: IUserProfileProps) {
	const { item, loading, fullName } = props;

	const genderIdn = (gender) => {
		switch (gender) {
			case "MALE":
				return "Laki - Laki";
			case "FEMALE":
				return "Perempuan";
			default:
				return "";
		}
	}

	return (
		<Fragment>
			<CustomDataPatientContainer btop={"none"}>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Nama
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{fullName}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>
			<CustomDataPatientContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Umur
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{`${item?.user_details?.age.year} Tahun ${item?.user_details?.age.month} Bulan`}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>
			<CustomDataPatientContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Tanggal Lahir
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{formattedDate(item?.user_details?.birth_date, "idn")}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>
			<CustomDataPatientContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Jenis Kelamin
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{genderIdn(item?.user_details?.gender)}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>
			<CustomDataPatientContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						No. Handphone
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{item?.phone}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>
			<CustomDataPatientContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Email
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{item?.email}
					</LabelText>
				</FlexRowSpaceBetween>
			</CustomDataPatientContainer>

			<CustomDataPatientContainer>
				<FlexStart>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						Alamat
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={400}
					>
						{item?.user_addresses?.[0]?.street}
					</LabelText>
				</FlexStart>
			</CustomDataPatientContainer>
		</Fragment>
	)

}

export const UserProfile = memo(_UserProfile);