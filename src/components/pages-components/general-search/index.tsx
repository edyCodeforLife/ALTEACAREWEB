import { memo, Fragment } from 'react';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
	Icon
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';
import { CustomConLogin } from '../register/register';
import { isMobile } from '../../../data/global/function';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { HeaderRegister } from '../register/register';
import styled from 'styled-components';
import { FlexOneCustom, CustomFlexRowCenter } from '../list-doctor/mobileListDoctor/index';
import { SearchListDoctor } from '../list-doctor/searchandfilter/search/search';
import { Loading } from '../../loading/index';
import Flex, { FlexOne, FlexRow } from '../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import { map } from 'lodash';
import { Doctor, LabelText } from '../landing/doctor/doctor';
import { TextNotFound } from '../landing/general-search/search';

const ContainerInside = styled(FlexOne)`
	margin-top: 60px;
	height: calc(100vh - 180px);
	box-sizing: border-box;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

const CustomSubHeader = styled.div`
	color: #61C7B5;
	text-align: left;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;
const ContainerDoctor = styled(Flex)`
	margin: 10px 0px;
	cursor: pointer;
`;

const ContainerListContent = styled(Flex)`
	padding: 20px 30px;
`;

function _GeneralSearchContent(props: any) {

	const {
		onSearchChange,
		loadingSearch,
		redirectTo,
		searchData,
		backToHome,
	} = props;

	const specialization = () => {
		if (searchData?.specialization?.length > 0) {
			let arr = map(searchData?.specialization, item => {
				return item?.name;
			});
			return arr;
		}
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<CustomFlexRowCenter>
										<HeaderRegister style={{ padding: '10px' }}>
											<FlexOneCustom
												onClick={backToHome}
												flex={"15% 0 0"}
												cursor={"pointer"}
											>
												<Icon
													className="iconBackArrow"
													icon="arrow_back_ios"
													color="#2C528B"
												/>
											</FlexOneCustom>

											<FlexOneCustom flex={"70% 0 0"}>
												<SearchListDoctor
													id="search_doctor"
													needIcon={true}
													icon={"search"}
													onSearchChange={onSearchChange}
													isForMobileLayout={true}
													width={"80%"}
												/>
											</FlexOneCustom>
											{loadingSearch && (
												<FlexOneCustom flex={"15% 0 0"}>
													<Loading size={30} color={"#61C7B5"} />
												</FlexOneCustom>
											)}
										</HeaderRegister>
									</CustomFlexRowCenter>
									<FlexRow>
										<ContainerInside>
											<CustomScroll flex="1" heightRelativeToParent={'100%'}>
												<ContainerListContent>
													{searchData?.doctor?.length > 0 ? (
														<div>
															{searchData.specialization?.length > 0 && (
																<Fragment>
																	<CustomSubHeader
																		disableSticky={true}
																		component="div"
																		id="nested-list-subheader-1"
																	>
																		Dokter Spesialis
																	</CustomSubHeader>
																	{map(searchData.specialization, (item, idx) => {
																		return (
																			<LabelText
																				cursor={"pointer"}
																				color={"#61C7B5"}
																				talign={"left"}
																				margin={"15px 0px"}
																				key={idx}
																				onClick={() => redirectTo("specialization", item?.specialization_id)}
																			>
																				{item?.name}
																			</LabelText>
																		)
																	})}
																</Fragment>
															)}

															{searchData.symtom?.length > 0 && (
																<Fragment>
																	<CustomSubHeader
																		disableSticky={true}
																		component="div"
																		id="nested-list-subheader-2"
																	>
																		Gejala
																</CustomSubHeader>
																	{map(searchData.symtom, (item, idx) => {
																		return (
																			<LabelText
																				cursor={"pointer"}
																				color={"#61C7B5"}
																				talign={"left"}
																				margin={"15px 0px"}
																				key={idx}
																				onClick={() => redirectTo("symtom", item?.symtom_id)}
																			>
																				{item?.name}
																			</LabelText>
																		)
																	})}
																</Fragment>
															)}

															<CustomSubHeader
																disableSticky={true}
																component="div"
																id="nested-list-subheader-3"
															>
																Dokter
																</CustomSubHeader>

															{map(searchData.doctor, (item, idx) => {
																return (
																	<ContainerDoctor
																		key={idx}
																		onClick={() => redirectTo("doctor", item?.doctor_id)}
																	>
																		<Doctor
																			item={item}
																		/>
																	</ContainerDoctor>
																)
															})}
														</div>
													) : (
														<TextNotFound>
															Tidak ditemukan
														</TextNotFound>
													)}
												</ContainerListContent>
											</CustomScroll>
										</ContainerInside>
									</FlexRow>
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
		</Fragment>
	)
}

export const GeneralSearchContent = memo(_GeneralSearchContent);

