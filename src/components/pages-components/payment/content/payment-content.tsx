import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { Flex, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { LabelText } from '../../create-consultation/index';
import { CustomContainerDoctorInfo, CustomDateTimeLabel } from '../../detail-consultation/box-card/box';
import { ImageLogo } from '../../../navbar/navbar';
import MaterialIcon from '@material/react-material-icon';
import { formattedDate, moneyFormat } from '../../../../data/global/function';
import {

	TextHospital,
	TextLabelDoctor,
	FlexRowSpaceBetween,
} from '../../home/appointment-carousel/appointment-box';
import { filter } from 'lodash';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { NewFormControl, BtnCustom } from '../../detail-consultation/tab-detail-consultation/tabs/tabs';
import { ContainerEndBtn } from '../../call/callEnded/callEndedMA/index';
import { HOME_URL } from '../../../../data/global/variables';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';

const CustomContainerEndBtn = styled(ContainerEndBtn)`
	padding: 20px;
	background: transparent;
`;

const ContainerFlex = styled(Flex)`
	margin-top: 3px;
	width: 100%;
	box-sizing: border-box;
`;

const FlexRowStart = styled(FlexRow)`
	justify-content: flex-start;
`;

const ContainerDateTime = styled(FlexRow)`
	margin: ${(props) => props.margin};
	width: 100%;
	@media (max-width: 320px) {
		margin: 0px 4px;
	}
`;

export const BtnWhite = styled.button`
	background: #fff;
	cursor: pointer;
	border-radius: 8px;
	margin-top: 10px;
	padding: 20px;
	color: #3E8CB9;
	border: 1px solid #61C7B5;
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	}
`;

const CustomContainerBtn = styled(ContainerBtn)`
	display: flex;
	justify-content: center;
`;

const LabelContainer = styled.div`
	background: ${(props) => props.bground};
	text-align: ${(props) => props.talign};
	padding: ${(props) => props.padding};
`;

const CustomFlexRowSpaceBetween = styled(FlexRowSpaceBetween)`
	padding: 10px 4px;
	box-sizing: border-box;
`;

const CustomBtn = styled(BtnCustom)`
	justify-content: space-between;
	display: flex;
	line-height: 1.5;
	@media (max-width: 768px) {
		min-width: calc(100% - 30px);
	}

`;

const PaymentMethodLabel = styled(FlexRow)`
	box-sizing: border-box;
	margin-top: 50px;
	padding: 17px;
`;

const ContainerSuccessLabel = styled(FlexRowCenter)`
	box-sizing: border-box;
	padding: 12px;
	background: #06C270;
	width: 100%;
`;

function _PaymentInsideData(props: any) {
	const {
		appointmentDescription,
		redirectToPaymentMethod,
		isPaymentPage,
		redirectTo
	} = props;
	const appointmentTimeFormmatted = (time) => {
		if (!time) return;
		const data = time.split(":");
		const hour = data[0];
		const minute = data[1];
		return `${hour}:${minute}`;
	}

	const serviceFee = filter(appointmentDescription?.fees, (item) => {
		return item?.type === "SERVICE_FEE";
	});

	const teleconsultationDoctorFee = filter(appointmentDescription?.fees, (item) => {
		return item?.type === "DOCTOR_TELECONSULTATION_FEE";
	});


	return (
		<Fragment>
			<ContainerFlex>
				<LabelContainer talign={"left"} bground={"#D6EDF6"} padding={"10px"}>
					<LabelText
						fsize={12}
						color={"#2C528B"}
					>
						Order ID: {appointmentDescription?.order_code}
					</LabelText>
				</LabelContainer>
				<LabelContainer bground={"#fff"} padding={"10px"}>
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

					<FlexRowStart>
						<ContainerDateTime>
							<MaterialIcon
								role={'button'}
								className="calendarIcon-grey"
								icon={'date_range'}
							/>
							<CustomDateTimeLabel>
								{formattedDate(appointmentDescription.schedule?.date, "idn", true, false, true)}
							</CustomDateTimeLabel>
						</ContainerDateTime>

						<ContainerDateTime margin={"0px 15px"}>
							<MaterialIcon
								role={'button'}
								className="calendarIcon-grey"
								icon={'alarm'}
							/>

							<CustomDateTimeLabel>
								{appointmentTimeFormmatted(appointmentDescription?.schedule?.time_start)} {" - "}
								{appointmentTimeFormmatted(appointmentDescription?.schedule?.time_end)}
							</CustomDateTimeLabel>
						</ContainerDateTime>
					</FlexRowStart>
					<CustomFlexRowSpaceBetween>
						<LabelText
							fsize={14}
							color={"#8F90A6"}
						>
							Biaya Telekonsultasi Dokter
						</LabelText>

						<LabelText
							fsize={14}
							color={"#8F90A6"}
						>
							{moneyFormat(teleconsultationDoctorFee[0]?.amount, "idn")}
						</LabelText>
					</CustomFlexRowSpaceBetween>

					<CustomFlexRowSpaceBetween>
						<LabelText
							fsize={14}
							color={"#8F90A6"}
						>
							Biaya Layanan
						</LabelText>

						<LabelText
							fsize={14}
							color={"#8F90A6"}
						>
							{moneyFormat(serviceFee[0]?.amount, "idn")}
						</LabelText>
					</CustomFlexRowSpaceBetween>

					<CustomFlexRowSpaceBetween>
						<LabelText
							fsize={14}
							color={"#2C528B"}
							fweight={600}
						>
							Harga Total
						</LabelText>

						<LabelText
							fsize={14}
							color={"#2C528B"}
							fweight={600}
						>
							{moneyFormat(appointmentDescription?.total_price, "idn")}
						</LabelText>
					</CustomFlexRowSpaceBetween>
				</LabelContainer>

				{isPaymentPage ? (
					<Fragment>
						<PaymentMethodLabel>
							<LabelText color={"#000000"} fsize={14}>
								Metode Pembayaran
							</LabelText>
						</PaymentMethodLabel>

						<NewFormControl minwidth="100%" talign="center">
							<CustomContainerBtn>
								<CustomBtn
									cursor={"pointer"}
									onClick={() => { redirectToPaymentMethod() }}
									bground={"#61C7B5"}
								>
									Pilih Metode Pembayaran

									<Icon
										icon="arrow_forward_ios"
										color="#fff"
									/>
								</CustomBtn>
							</CustomContainerBtn>
						</NewFormControl>
					</Fragment>
				) : (
					<Flex>
						<ContainerSuccessLabel>
							<LabelText
								color={"#fff"}
								fsize={14}
							>
								Pembayaran berhasil!
							</LabelText>
						</ContainerSuccessLabel>

						<CustomContainerEndBtn>
							<ContainerBtn>
								<BtnSubmit
									onClick={() => redirectTo("/my-consultation")}
									minwidth="100%"
								>
									Lihat Telekonsultasi saya
								</BtnSubmit>

								<BtnWhite
									onClick={() => redirectTo(HOME_URL)}
									minwidth="100%"
								>
									Ke Beranda
								</BtnWhite>

							</ContainerBtn>
						</CustomContainerEndBtn>
					</Flex>

				)}
			</ContainerFlex>
		</Fragment>
	);
}

export const PaymentInsideData = memo(_PaymentInsideData);