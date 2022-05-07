import { memo } from 'react';
import styled from 'styled-components';
import { LabelText } from '../../../../create-consultation/index';
import { CustomFlexLeft } from '../patient-data/patient-data'
import { ImageLogo } from '../../../../../navbar/navbar';
import { FlexRow } from '../../../../../basic-elements/flex/index';
import { filter } from 'lodash';
import { FlexRowSpaceBetween } from '../../../../home/appointment-carousel/appointment-box';
import { moneyFormat } from '../../../../../../data/global/function';

const ContainerLabelText = styled(FlexRowSpaceBetween)`
	align-items: center;
	background: #fff;
	box-sizing: border-box;
	width: 100%;
	padding: 8px 20px;
	word-break: break-all;
`;

const ContainerLabelTitle = styled.div`
	background:#EBEBF0;
	padding: 10px 20px;
	width: 100%;
	box-sizing: border-box;
	text-align: left;
`;

const ContainerFileContent = styled.div`
	z-index: 999;
`;

const ContainerFlexRow = styled(FlexRow)`
	padding: 10px 20px;
	box-sizing: border-box;
`;


function _ConsultationFees(props: any) {
	const {
		appointmentDescription
	} = props;

	const serviceFee = filter(appointmentDescription?.fees, (item) => {
		return item?.type === "SERVICE_FEE";
	});

	const teleconsultationDoctorFee = filter(appointmentDescription?.fees, (item) => {
		return item?.type === "DOCTOR_TELECONSULTATION_FEE";
	});

	return (
		<ContainerFileContent>
			<CustomFlexLeft>
				<ContainerLabelTitle>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						Konsultasi
					</LabelText>
				</ContainerLabelTitle>

				<ContainerLabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
					>
						Biaya Layanan
					</LabelText>

					<LabelText
						color={"#6B7588"}
						fsize={14}
					>
						{moneyFormat(serviceFee[0].amount, "idn")}

					</LabelText>
				</ContainerLabelText>

				<ContainerLabelText>
					<LabelText
						color={"#6B7588"}
						fsize={14}
					>
						Biaya Telekonsultasi Dokter
					</LabelText>

					<LabelText
						color={"#6B7588"}
						fsize={14}
					>
						{moneyFormat(teleconsultationDoctorFee[0].amount, "idn")}
					</LabelText>
				</ContainerLabelText>

				<ContainerLabelText>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						Harga Total
					</LabelText>

					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						{moneyFormat(appointmentDescription?.total_price, "idn")}
					</LabelText>
				</ContainerLabelText>

				<ContainerLabelTitle>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						fweight={600}
					>
						Metode Pembayaran
					</LabelText>
				</ContainerLabelTitle>

				<ContainerFlexRow>
					<ImageLogo
						width={100}
						height={30}
						src={appointmentDescription.transaction?.detail.icon}
					/>
					<LabelText
						color={"#2C528B"}
						fsize={14}
						margin={'0px 10px'}
						fweight={500}
						talign={"left"}
					>
						{appointmentDescription.transaction?.detail.name}
					</LabelText>
				</ContainerFlexRow>
			</CustomFlexLeft>
		</ContainerFileContent>
	);
}

export const ConsultationFees = memo(_ConsultationFees);