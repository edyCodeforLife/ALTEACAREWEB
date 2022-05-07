import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Flex, { FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import {
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';

import { CustomFlexOne } from '../list-doctor/searchandfilter/filter/filter';
import { Footer } from '../../footer/footer';
import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { CustomConLogin } from '../register/register';
import { ImageLogo } from '../../navbar/navbar';
import AlteaLogo from '../../../assets/image/alteacare_logo.svg';
import { Avatar } from '../../avatar/avatar';
import { getInitials, capitalizeName, isMobile } from '../../../data/global/function';
import { GeneralSearch } from '../landing/general-search/search';
import { ContainerSlider } from '../landing/mobile-view/mobile-content/content';
import { CarouselSpecialist } from '../landing/slide/index';
import { sortBy } from 'lodash';
import { CustomSkeleton } from '../../basic-elements/skeleton/skeleton';
import { CarouselAppointmentCard } from './appointment-carousel/index';
import { BottomNavBar } from '../../bottom-nav-bar/index';
import { CarouselBanner } from './banner-carousel/index';

const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: ${(props) => props.loading ? 15 : 0}px;
`;

const HomeCardStyle = styled(CustomCardStyle)`
	min-height: 85vh;
	position: relative;
`;

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	height: calc(100vh - 160px);
	// height: 100%;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		height: calc(100vh - 61px);
	};
`;

const HeaderHome = styled.div`
	min-height: 40px;
	width: 100%;
	position: relative;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 20px;
`;

const FlexOneCustom = styled(CustomFlexOne)`
	flex-grow: 0 !important;
	flex: ${(props) => props.flex};
`;

const ContainerContent = styled.div`
	width: auto;
	height: 100%;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	box-sizing: border-box;
	text-align: left;
	position: relative;
`;

const NameText = styled.div`
	font-weight: 600;
	font-size: 14px;
	color: #2C528B;
`;

const ContainerTextDesc = styled(NameText)`
	margin: ${(props) => props.margin};
	text-align: left;
`;

export const AgeDesc = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	color: #2C528B;
	margin: ${(props) => props.margin};
`;

export const ContainerCustomSkeleton = styled(FlexRow)`
	padding: ${(props) => props.loading ? '0px' : '0px 10px'};
	justify-content: space-between;
	width: ${props => props.width};
`;


function _HomeContent(props: any) {
	const { profileUser, handleClickBanner, bannerData, anchorRef, loading, dataSpecialist, onRedirect, handleClick, handleChange, appointmentList, handleClickBox } = props;
	const fullName = profileUser?.first_name + " " + profileUser?.last_name;
	let sortedData = sortBy(dataSpecialist, (o) => { return !o.is_popular });

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<CustomScroll flex="1" heightRelativeToParent={'100%'}>
										<CustomFlexRowCenter loading={loading}>
											<HeaderHome>
												<FlexOneCustom
													style={{ cursor: 'pointer' }}
													flex={"90% 0 0"}
												>
													{loading ? (
														<ContainerCustomSkeleton
															loading={loading}
															width={"40%"}>
															<CustomSkeleton
																animation="wave"
																variant="circle"
																mobileheight={35}
																height={35}
																mobilewidth={35}
																width={35}
																isForMobileLayout
															/>
															<CustomSkeleton
																animation="wave"
																variant="text"
																mobileheight={30}
																height={30}
																mobilewidth={70}
																width={70}
																isForMobileLayout
															/>
														</ContainerCustomSkeleton>
													) : (
														<ImageLogo
															src={AlteaLogo}
															height={60}
															width={120}
														/>
													)}

												</FlexOneCustom>

												{/* <FlexOneCustom
													flex={"10% 0 0"}
												>
													{loading ? (
														<CustomSkeleton
															animation="wave"
															variant="circle"
															mobileheight={20}
															height={20}
															mobilewidth={20}
															width={20}
															isForMobileLayout
														/>
													) : (
														<Icon
															icon="notifications_icon"
															color={"#61C7B5"}
														/>
													)}

												</FlexOneCustom> */}
											</HeaderHome>
										</CustomFlexRowCenter>
										<ContainerContent>
											<FlexRow>
												{loading ? (
													<ContainerCustomSkeleton loading={loading} width={"15%"}>
														<CustomSkeleton
															animation="wave"
															variant="circle"
															mobileheight={40}
															height={40}
															mobilewidth={40}
															width={40}
															isForMobileLayout
														/>
													</ContainerCustomSkeleton>
												) : (
													<Avatar
														size={40}
														textData={getInitials(fullName)}
														image={profileUser?.user_details.avatar?.url}
													/>
												)}

												{loading ? (
													<Flex>
														<NameText>
															<ContainerCustomSkeleton loading={loading} width={"110%"}>
																<CustomSkeleton
																	animation="wave"
																	variant="text"
																	mobileheight={20}
																	height={20}
																	mobilewidth={50}
																	width={50}
																	isForMobileLayout
																/>

																<CustomSkeleton
																	animation="wave"
																	variant="text"
																	mobileheight={20}
																	height={20}
																	mobilewidth={50}
																	width={50}
																	isForMobileLayout
																/>
															</ContainerCustomSkeleton>

														</NameText>
														<AgeDesc>
															<ContainerCustomSkeleton loading={loading} width={"60%"}>
																<CustomSkeleton
																	animation="wave"
																	variant="text"
																	mobileheight={15}
																	height={15}
																	mobilewidth={20}
																	width={20}
																	isForMobileLayout
																/>

																<CustomSkeleton
																	animation="wave"
																	variant="text"
																	mobileheight={15}
																	height={15}
																	mobilewidth={30}
																	width={30}
																	isForMobileLayout
																/>
															</ContainerCustomSkeleton>
														</AgeDesc>
													</Flex>
												) : (
													<Flex>
														<NameText>
															{capitalizeName(fullName)}
														</NameText>
														<FlexRow>
															<AgeDesc>
																{profileUser?.user_details.age?.year} Tahun
															</AgeDesc>
															<AgeDesc margin={"0px 5px"}>
																{profileUser?.user_details.age?.month} Bulan
															</AgeDesc>
														</FlexRow>
													</Flex>
												)}

											</FlexRow>

											<FlexRow>
												<ContainerTextDesc margin={"15px 0px 0px 0px"}>
													{loading ? (
														<CustomSkeleton
															animation="wave"
															variant="text"
															mobileheight={20}
															height={20}
															mobilewidth={300}
															width={300}
															isForMobileLayout
														/>
													) : (
														<span>Keluhan apa yang anda rasakan ?</span>
													)}

												</ContainerTextDesc>
											</FlexRow>

											<FlexRow>
												{loading ? (
													<CustomSkeleton
														animation="wave"
														variant="text"
														mobileheight={60}
														height={60}
														mobilewidth={380}
														width={380}
														isForMobileLayout
													/>
												) : (
													<GeneralSearch
														id="search_input"
														needIcon={true}
														icon={"search"}
														isActiveMenu={false}
														anchorRef={anchorRef}
														handleClick={handleClick}
														handleChange={handleChange}
													/>
												)}
											</FlexRow>

											<FlexRow>
												<ContainerTextDesc margin={"20px 0px 0px 0px"}>
													{loading ? (
														<CustomSkeleton
															animation="wave"
															variant="text"
															mobileheight={20}
															height={20}
															mobilewidth={300}
															width={300}
															isForMobileLayout
														/>
													) : (
														<span>Temui dokter spesialis via panggilan video</span>
													)}
												</ContainerTextDesc>
											</FlexRow>

											<ContainerSlider>
												<CarouselSpecialist
													dataSpecialist={sortedData}
													iconWidth={30}
													iconHeight={30}
													onRedirect={onRedirect}
													loading={loading}
													isForMobileLayout={true}
													activeHover={false}

												/>
											</ContainerSlider>

											<FlexRow>
												<ContainerTextDesc margin={"20px 0px 0px 0px"}>
													{loading ? (
														<CustomSkeleton
															animation="wave"
															variant="text"
															mobileheight={20}
															height={20}
															mobilewidth={200}
															width={200}
															isForMobileLayout
														/>
													) : (
														<span>Terbaru dari AlteaCare</span>
													)}
												</ContainerTextDesc>
											</FlexRow>

											<ContainerSlider>
												<CarouselBanner
													loading={loading}
													handleClickBanner={handleClickBanner}
													bannerData={bannerData}

												/>
											</ContainerSlider>

											<FlexRow>
												<ContainerTextDesc margin={"20px 0px 0px 0px"}>
													{loading ? (
														<CustomSkeleton
															animation="wave"
															variant="text"
															mobileheight={20}
															height={20}
															mobilewidth={200}
															width={200}
															isForMobileLayout
														/>
													) : (
														<span>Jadwal Konsultasi saya Hari ini</span>
													)}
												</ContainerTextDesc>
											</FlexRow>

											<ContainerSlider>
												<CarouselAppointmentCard
													loading={loading}
													handleClickBox={handleClickBox}
													listAppointment={appointmentList}
												/>
											</ContainerSlider>
										</ContainerContent>
									</CustomScroll>
								</ContainerCardContent>
								<BottomNavBar {...props} />
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
		</Fragment>
	)
}

export const HomeContent = memo(_HomeContent);

