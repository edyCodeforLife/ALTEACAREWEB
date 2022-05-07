import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { CustomFlexRowCenter } from '../../create-consultation/index';
import { FlexOneCustom, ContainerHeaderText } from '../../register/register';
import { BoxDoctor } from '../box-card/box';
import { Flex, FlexCenter, FlexRowCenter } from '../../../basic-elements/flex/index';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../login/login';

export const HeaderDetailConsultation = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 60px;
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 0px;
`;

export const FlexRowCenterDetail = styled(CustomFlexRowCenter)`
	height: 100%;
	align-items: flex-start;
`;

const BtnCustom = styled(BtnSubmit)`
	min-width: 340px;
	padding: 15px;
		@media (max-width: 768px) {
			min-width: calc(100% - 60px);
		}
`;

const ContainerBoxDoctor = styled(FlexCenter)`
	box-sizing: border-box;
	margin-top: 80px;
	position: relative;
`;

const HeaderText = styled(ContainerHeaderText)`
	font-size: 18px;
`;

export const ContainerMessage = styled.div`
	color: ${(props) => props.color};
	font-weight: ${(props) => props.lheight};
	white-space: pre-line;
	font-size: 14px;
	padding: 20px;
	line-height: 1.6;
`;

const ContainerNotes = styled.div`
	position: absolute;
	display: flex;
	bottom: 20px;
	white-space: pre-line;
	font-size: 14px;
	color: #8F90A6;
	text-align: center;
	padding: 20px;
`;


function _CancelDetailContent(props: any) {
	const {
		appointmentDescription,
		backStep,
		redirectToDoctorDetail
	} = props;

	const textData = {
		CANCELED_BY_GP: {
			title: "Dibatalkan",
			message: "Telekonsultasi telah dibatalkan",
			color: "#FF5C5C",
			isButtonReSchedule: true,
			notes: null
		},
		PAYMENT_FAILED: {
			title: "Dibatalkan",
			message: "Pembayaran Gagal",
			color: "#FF5C5C",
			isButtonReSchedule: true,
			notes: null
		},
		CANCELED_BY_SYSTEM: {
			title: "Masa Pembayaran Berakhir",
			message: "Maaf, masa pembayaran telekonsultasi berakhir. Silakan jadwalkan ulang.",
			color: "#FF5C5C",
			isButtonReSchedule: true,
			notes: '*Riwayat pembatalan telekonsultasi akan terhapus otomatis setelah 48 jam.'
		},
		PAYMENT_EXPIRED: {
			title: "Masa Pembayaran Berakhir",
			message: "Maaf, masa pembayaran telekonsultasi berakhir. Silakan jadwalkan ulang.",
			color: "#FF5C5C",
			isButtonReSchedule: true,
			notes: '*Riwayat pembatalan telekonsultasi akan terhapus otomatis setelah 48 jam.'
		},
		REFUNDED: {
			title: "Pengembalian Dana",
			message: "Pengembalian dana akan diproses maksimal 7 hari kerja.",
			color: "#3E8CB9",
			isButtonReSchedule: false,
			notes: '*Hubungi Cuctomer service untuk informasi proses refund.'
		}

	}

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"20% 0 0"}
						onClick={() => backStep()}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							{textData[`${appointmentDescription?.status}`]?.title}
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<Flex>
					<ContainerBoxDoctor>
						<BoxDoctor
							appointmentDescription={appointmentDescription}
						/>
					</ContainerBoxDoctor>

					<ContainerMessage color={textData[`${appointmentDescription?.status}`]?.color}>
						{textData[`${appointmentDescription?.status}`]?.message}
					</ContainerMessage>
					{textData[`${appointmentDescription?.status}`]?.isButtonReSchedule && (
						<FlexRowCenter>
							<CustomFormControl minwidth="100%" talign="center">
								<ContainerBtn>
									<BtnCustom
										onClick={() => { redirectToDoctorDetail(appointmentDescription?.doctor.id) }}
										bground="#61C7B5"
										color="#fff"
									>
										Jadwalkan Ulang
									</BtnCustom>
								</ContainerBtn>
							</CustomFormControl>
						</FlexRowCenter>
					)}
				</Flex>

				<ContainerNotes>
					{textData[`${appointmentDescription?.status}`]?.notes}
				</ContainerNotes>

			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const CancelDetailContent = memo(_CancelDetailContent);