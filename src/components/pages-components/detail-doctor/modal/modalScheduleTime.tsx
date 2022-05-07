import { memo, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexRow, FlexRowCenter, FlexOneCenter, Flex } from '../../../basic-elements/flex';
import { ContainerFlexRow, BoxTimeSchedule, TextLabel, ContainerSpinner, ContainerBtnNext } from '../detail';
import { FlexOneCustom } from '../../register/register';
import { ImageLogo } from '../../../navbar/navbar';
import Calendar from '../../../../assets/image/calendar.png';
import { map } from 'lodash';
import { Spinner } from '../../../spinner/index';
import CustomScroll from 'react-custom-scroll';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { formattedDate } from '../../../../data/global/function';
import { IDataSchedule } from '../../../../data/services/alteaCMS/IAlteaCMS';

const CustomModal = styled(Modal)`
	display: flex;
    align-items: center;
    justify-content: center;
	outline: none;
	border: none;
`;

const InsideModal = styled.div`
	background: #fff;
	max-width: 350px;
	width: 90%;
	height: calc(100vh - 530px);
	padding: 0px;
	border-radius: 10px;
	outline: none;
	box-sizing: border-box;
`;;

const Title = styled(FlexRowCenter)`
	color: #3E8CB9;
	font-weight: 600;
`;

export const DateContainer = styled(FlexRow)`
    z-index: 12;
    position: relative;
`;

const ContainerContent = styled(props => <ContainerFlexRow {...props} />)`
	margin-right: 10px;
	position: relative;
	height: 100%;
`;

const ContainerInsider = styled.div`
	padding: 20px;
`;

interface IModalScheduleTimeProps {
	open: boolean;
	handleModal(fieldId: string, open: boolean): void;
	title?: string;
	fieldId?: any,
	loading: boolean;
	doctorSchedule: any;
	selectedDate: Date;
	onChange(fieldId: string, value: any, error?: string, extraData?: any): void;
	onClickSetSchedule(item: any): void;
	selectedScheduleUser: IDataSchedule;
	redirectTo(): void;
}

function _ModalScheduleTime(props: IModalScheduleTimeProps) {
	const {
		open,
		redirectTo,
		title,
		handleModal,
		onClickSetSchedule,
		doctorSchedule,
		loading,
		selectedDate,
		selectedScheduleUser
	} = props;

	return (
		<div>
			<CustomModal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={() => handleModal("modalScheduleTime", false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<InsideModal>
						<CustomScroll flex="1" heightRelativeToParent={doctorSchedule.length > 0 ? '100%' : null}>
							<ContainerInsider>
								<Title>
									{title}
								</Title>
								<FlexRow>
									<TextLabel
										fsize={14}
										fweight={500}
										color={"#2C528B"}
										margin={"15px 0px"}
									>
										{formattedDate(selectedDate, "idn", true)}
									</TextLabel>
								</FlexRow>
								<ContainerContent>
									{loading ?
										<ContainerSpinner>
											<Spinner />
										</ContainerSpinner>
										:
										doctorSchedule.length > 0 ?
											map(doctorSchedule, (item, idx) => {
												return (
													<FlexOneCustom
														onClick={() => onClickSetSchedule(item)}
														key={idx} flex={"33% 0 0"}>
														<BoxTimeSchedule
															selected={item.code === selectedScheduleUser.code}
															fsize={12}>
															{item.start_time} - {item.end_time}
														</BoxTimeSchedule>
													</FlexOneCustom>
												)
											}) : (
												<FlexOneCenter>
													<Flex>
														<ImageLogo
															src={Calendar}
															height={100}
															width={100}
														/>
													</Flex>

													<Flex>
														<TextLabel
															talign={"center"}
															fsize={14}
															fweight={500}
															color={"#8F90A6"}
															margin={"10px 0px"}
														>
															Jadwal belum tersedia
													</TextLabel>
													</Flex>
												</FlexOneCenter>
											)}
									{doctorSchedule.length > 0 && !loading && (
										<ContainerBtn style={{ marginTop: 10 }}>
											<BtnSubmit
												onClick={() => redirectTo()}
												disabled={loading || selectedScheduleUser.code === ""}
												minwidth="100%"
											>
												Lanjutkan
										</BtnSubmit>
										</ContainerBtn>
									)}
								</ContainerContent>
							</ContainerInsider>
						</CustomScroll>
					</InsideModal>
				</Fade>
			</CustomModal>
		</div>
	);
}

export const ModalScheduleTime = memo(_ModalScheduleTime);