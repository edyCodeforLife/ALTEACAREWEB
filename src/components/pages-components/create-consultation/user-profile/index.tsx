import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { ContainerDataPatient, LabelText } from '../index';
import { DateTimeLabel } from '../../home/appointment-carousel/appointment-box';
import { FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';
import { formattedDate } from '../../../../data/global/function';

export const CustomDateTimeLabel = styled(DateTimeLabel)`
	color: #8F90A6;
`;

interface IUserProfileProps {
	item: any;
	fullName: string;
	isForMobileLayout: boolean;
	loading: boolean
}


function _UserProfile(props: IUserProfileProps) {
	const { item, isForMobileLayout, loading, fullName } = props;

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
			<ContainerDataPatient>
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
			</ContainerDataPatient>
			<ContainerDataPatient>
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
			</ContainerDataPatient>
			<ContainerDataPatient>
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
			</ContainerDataPatient>
			<ContainerDataPatient>
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
			</ContainerDataPatient>
			<ContainerDataPatient>
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
			</ContainerDataPatient>
			<ContainerDataPatient>
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
			</ContainerDataPatient>
		</Fragment>
	)

}

export const UserProfile = memo(_UserProfile);