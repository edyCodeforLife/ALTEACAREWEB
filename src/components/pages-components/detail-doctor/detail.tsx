import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Flex, { FlexOneCenter, FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import { formattedDate, isMobile } from '../../../data/global/function';
import {
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';
import { Spinner } from '../../spinner/index';
import { isToday, format, eachDayOfInterval } from 'date-fns';
import Slider from 'react-slick';
import IconMitrakeluarga from '../../../assets/image/icons/icon_mitrakeluarge.svg';
import { Footer } from '../../footer/footer';
import { ContainerBtn, BtnSubmit } from '../login/login';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { ModalScheduleTime } from './modal/modalScheduleTime';
import { CustomConLogin } from '../register/register';
import { ImageLogo } from '../../navbar/navbar';
import { ModalDatePicker } from './modal/modalDatePicker';
import { FlexOneCustom } from '../register/register';
import { LabelExperience } from '../list-doctor/list-doctor/util-style/list-component';
import { map } from 'lodash';
import Calendar from '../../../assets/image/calendar.png';
import EmptyDoctorImage from '../../../assets/image/icons/empty_spesialis.svg';

const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
`;

const HomeCardStyle = styled(CustomCardStyle)`
	min-height: 85vh;
`;

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	height: calc(100vh - 120px);
	// height: 100%;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		height:100vh
	};
`;

const NameText = styled.div`
	font-weight: 600;
	font-size: 14px;
	color: #2C528B;
`;

export const AgeDesc = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	color: #2C528B;
`;

export const ContainerCustomSkeleton = styled(FlexRow)`
	padding: ${(props) => props.loading ? '0px' : '0px 10px'};
	justify-content: space-between;
	width: ${props => props.width};
`;

const ContainerDoctorImage = styled.div`
	background: #F1F9FC;
	padding: 20px;
	min-height: 216px;
	position: relative;
	display: flex;
`;

const ContainerDoctorContent = styled.div`
	width: auto;
	height: inherit;
	padding-left: 20px;
	padding-right: 20px;
	box-sizing: border-box;
	position: relative;
`;

export const TextLabel = styled.div`
	font-style: normal;
	text-align: ${(props) => props.talign};
	font-weight: ${(props) => props.fweight};
	font-size: ${(props) => props.fsize}px;
	display: flex;
	align-items: center;
	color: ${(props) => props.color};
	white-space: pre-line;
	line-height: 1.6;
	margin: ${props => props.margin};
	cursor: ${(props) => props.cursor};
`;

export const FlexMTop = styled(FlexRow)`
	margin-top: ${props => props.mtop}px;
	justify-content: ${(props) => props.jcontent};
	margin-bottom: ${(props) => props.mbottom}px;
`;

export const ContainerBtnNext = styled(FlexRow)`
	position: absolute;
	bottom: 0;
	background: #D8ECF5;
	box-sizing: border-box;
	min-height: 50px;
	width: 100%;
	left: 0;
	right: 0;
	z-index: 999;
	padding: 10px 25px;
	align-items: center;
`;

const BoxSchedule = styled.div`
	padding: 5px;
	width: auto;
	height: auto;
	display: block;
	position: relative;
	background: ${(props) => props.selected ? '#2C528B' : '#fff'};
	margin: 0px 2px;
	color: ${(props) => props.selected ? '#fff' : '#2C528B'};
	border: 1px solid #2C528B;
	outline: none;
	cursor: pointer;
	font-size: 12px;
	border-radius: 12px;
`;

const ContainerBoxSchedule = styled.div`
	margin: 10px 0px;
	display: inline-block;
`;

export const ContainerFlexRow = styled(FlexRow)`
	flex-wrap: wrap;
`;

export const BoxTimeSchedule = styled.div`
	background: ${(props) => props.selected ? '#61C7B5' : '#FFFFFF'};
	border: 1px solid #61C7B5;
	box-sizing: border-box;
	border-radius: 4px;
	color: ${(props) => props.selected ? '#FFFFFF' : '#61C7B5'};
	padding: 6px;
	font-size: ${(props) => props.fsize}px;
	margin: 3px;
	text-align: center;
	cursor: pointer;
`;

export const ContainerSpinner = styled(FlexRowCenter)`
	padding: 20px;
	width: 100%;
`;

const ContainerAbout = styled.div`
	position: relative;
	// margin: 20px 0px;
	padding-bottom: ${(props) => props.pbottom}px;
	width: 100%;
	text-align: left;
	word-break: break-word;
	line-height: 1.4;

`;

const FlexCustomize = styled(Flex)`
	margin-top: 20px
`;

const FlexRowCustomize = styled(FlexRow)`
	padding: 3px 0px;
`;


function _DetailDoctorContent(props: any) {
	const {
		doctorDetail,
		redirectTo,
		loading,
		open,
		onChange,
		selectedDate,
		onClickDaySchedule,
		isForMobileLayout,
		doctorSchedule,
		handleModal,
		handleActiveCalendar,
		activeCalendarDate,
		handleScheduleTime,
		onClickSetSchedule,
		selectedScheduleUser,
		dataTermsRefundCancel
	} = props;

	const backToList = () => {
		if (!doctorDetail) return;
		props.history.push(`/mobile-list?specialistID=${doctorDetail.specialization?.id}`);
	}

	const settings = {
		dots: false,
		infinite: false,
		autoplay: false,
		swipeToSlide: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
		],
	};

	const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

	const date = new Date();
	const dateSelected = new Date(selectedDate);

	const dateRangeinSevenDays = (dateStart: Date, dateEnd: Date) => {
		return eachDayOfInterval({
			start: dateStart,
			end: dateEnd
		});
	}

	const initialDate = dateRangeinSevenDays(new Date(), new Date(date.setDate(date.getDate() + 6)));
	const selectedRangeDate = dateRangeinSevenDays(selectedDate, new Date(dateSelected.setDate(dateSelected.getDate() + 6)));

	const renderSevenDaysSchedule = () => {
		return (
			<Fragment>
				<Slider {...settings}>
					{map(initialDate, (item, idx) => {
						return (
							<ContainerBoxSchedule
								onClick={() => {
									onClickDaySchedule(item)
								}}
								key={idx}
							>
								<BoxSchedule
									selected={item.toDateString() === selectedDate.toDateString()}
								>
									{isToday(item) ? "Hari Ini" : days[item.getDay()]}
								</BoxSchedule>
							</ContainerBoxSchedule>
						)
					})}
				</Slider>
				<ContainerFlexRow>
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
										key={idx}
										flex={"33% 0 0"}>
										<BoxTimeSchedule
											selected={item.code === selectedScheduleUser.code}
											fsize={14}>
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
				</ContainerFlexRow>
			</Fragment>
		)
	}

	const renderDatePickerSchedule = () => {
		return (
			<FlexCustomize>
				{map(selectedRangeDate, (item, idx) => {
					return (
						<FlexRowCustomize key={idx}>
							<FlexOneCustom flex={"76% 0 0"}>
								<TextLabel
									talign={"left"}
									fsize={14}
									fweight={500}
									color={"#2C528B"}
								>
									{formattedDate(item, "idn", true)}
								</TextLabel>
							</FlexOneCustom>

							<FlexOneCustom onClick={() => {
								handleScheduleTime("modalScheduleTime", true, item)
							}}
								flex={"24% 0 0"}>
								<TextLabel
									talign={"right"}
									fsize={12}
									fweight={500}
									color={"#61C7B5"}
									cursor={"pointer"}
								>
									Lihat Jadwal
							</TextLabel>
							</FlexOneCustom>
						</FlexRowCustomize>
					)
				})}
			</FlexCustomize>
		)
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<CustomScroll flex="1" heightRelativeToParent={'100%'}>
										<ContainerDoctorImage>
											<FlexOneCustom
												style={{ cursor: 'pointer' }}
												onClick={backToList}
												flex={"20% 0 0"}
											>
												<Icon
													className="iconBackArrow"
													icon="arrow_back_ios"
													color="#2C528B"
												/>
											</FlexOneCustom>
											<FlexOneCustom
												flex={"75% 0 0"}
											>
												<ImageLogo
													src={doctorDetail.photo ? doctorDetail.photo?.url : EmptyDoctorImage}
													height={216}
													width={200}
												/>
											</FlexOneCustom>
										</ContainerDoctorImage>
										<ContainerDoctorContent>
											<FlexRow>
												<TextLabel
													fsize={14}
													fweight={600}
													color={"#333333"}
												>
													{doctorDetail?.name}
												</TextLabel>
											</FlexRow>
											<FlexRow>
												<TextLabel
													fsize={14}
													fweight={500}
													color={"#2C528B"}
												>
													{doctorDetail.specialization?.name}
												</TextLabel>
											</FlexRow>

											<FlexRow>
												<ImageLogo
													style={{ marginRight: 8 }}
													height={30}
													width={30} src={IconMitrakeluarga}
												/>
												<TextLabel
													fsize={14}
													fweight={500}
													color={"#6B7588"}
												>
													RS.	{doctorDetail.hospital && doctorDetail.hospital.length > 0 ? doctorDetail.hospital[0]["name"] : null}
												</TextLabel>
											</FlexRow>

											<FlexMTop mtop={15}>
												<FlexOneCustom
													flex={"60% 0 0"}
												>
													<TextLabel
														talign={"left"}
														fsize={12}
														fweight={500}
														color={"#000000"}
													>
														{doctorDetail.overview}
													</TextLabel>
												</FlexOneCustom>

												<FlexOneCustom
													flex={"40% 0 0"}
												>
													<LabelExperience isForMobileLayout={isForMobileLayout}>
														{doctorDetail.experience}
													</LabelExperience>
												</FlexOneCustom>
											</FlexMTop>

											<FlexMTop mtop={20} jcontent={"space-between"}>
												<FlexOneCustom flex={"60% 0 0"}>
													<Flex>
														<TextLabel
															talign={"left"}
															fsize={14}
															fweight={600}
															color={"#2C528B"}
														>
															Pilih jadwal yang tersedia
														</TextLabel>
													</Flex>
													<Flex>
														<TextLabel
															talign={"left"}
															fsize={10}
															fweight={500}
															color={"#8F90A6"}
														>
															Menampilkan jadwal 7 hari kedepan
														</TextLabel>
													</Flex>
												</FlexOneCustom>

												<TextLabel
													talign={"left"}
													fsize={14}
													fweight={500}
													color={activeCalendarDate ? '#FF5C5C' : '#61C7B5'}
													margin={"0px 5px"}
													cursor={"pointer"}
													onClick={() => {
														if (!loading && !activeCalendarDate) handleModal("modalDatePicker", true);
														handleActiveCalendar(!activeCalendarDate);
													}}
												>
													{activeCalendarDate ? "Hapus" : "Atur Tanggal"}
												</TextLabel>
												<Icon color={"#61C7B5"} role={'button'} icon={'date_range'} />

											</FlexMTop>
											{activeCalendarDate ? (
												renderDatePickerSchedule()
											) : (
												renderSevenDaysSchedule()
											)}

											<FlexMTop mtop={10}>
												<ContainerAbout
													dangerouslySetInnerHTML={{ __html: doctorDetail?.about }}
												/>
											</FlexMTop>

											<hr />

											<FlexMTop mtop={10}>
												<ContainerAbout
													pbottom={50}
													dangerouslySetInnerHTML={{ __html: dataTermsRefundCancel[0]?.text }}
												/>
											</FlexMTop>

										</ContainerDoctorContent>
									</CustomScroll>
									<ContainerBtnNext>
										<ContainerBtn>
											<BtnSubmit
												onClick={redirectTo}
												disabled={loading || selectedScheduleUser.code === ""}
												minwidth="100%"
											>
												Lanjutkan
											</BtnSubmit>
										</ContainerBtn>
									</ContainerBtnNext>
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
			<ModalDatePicker
				open={open.modalDatePicker}
				handleModal={handleModal}
				title={"Atur Tanggal"}
				value={selectedDate}
				fieldId={'doctor_schedule'}
				onChange={onChange}
				minDate={new Date()}
			/>
			<ModalScheduleTime
				open={open.modalScheduleTime}
				handleModal={handleModal}
				title={"Jadwal"}
				selectedDate={selectedDate}
				fieldId={'schedule_time'}
				onChange={onChange}
				doctorSchedule={doctorSchedule}
				loading={loading}
				redirectTo={redirectTo}
				selectedScheduleUser={selectedScheduleUser}
				onClickSetSchedule={onClickSetSchedule}
			/>
		</Fragment>
	)
}

export const DetailDoctorContent = memo(_DetailDoctorContent);

