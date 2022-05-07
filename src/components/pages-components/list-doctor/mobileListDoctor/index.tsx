import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import CustomScroll from 'react-custom-scroll';
import {
	Icon,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../../basic-elements/mobile-container/index';
import IconFilter from '../../../../assets/image/icons/icon_filter.svg';
import { CustomFlexOne } from '../../list-doctor/searchandfilter/filter/filter';
import { Footer } from '../../../footer/footer';
import { NewCardContent } from '../../../pages-components/list-doctor/searchandfilter/index';
import { CustomConLogin } from '../../register/register';
import { SearchListDoctor } from '../searchandfilter/search/search';
import SortIcon from '../../../../assets/image/icons/sort_icon.png';
import { BottomNavBar } from '../../../bottom-nav-bar/index';
import { HeaderRegister } from '../../register/register';
import { ImageLogo } from '../../../navbar/navbar';
import { ListDoctor } from '../list-doctor/list-doctor';
import { ContainerPagination } from '../content-list';
import { HOME_URL, LANDING_URL } from '../../../../data/global/variables';

export const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
`;

const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	// height: calc(100vh - 120px);
	height: 100%;
	position: relative;
	overflow: hidden;
	// @media (max-width: 768px) {
	// 	height: calc(100vh - 50px);
	// };
`;

const CustomContainerPagination = styled(ContainerPagination)`
	margin-top: 20px;
`;

export const FlexOneCustom = styled(CustomFlexOne)`
	flex-grow: 0 !important;
	flex: ${(props) => props.flex};
	cursor: ${(props) => props.cursor};
`;


export const ContainerCustomSkeleton = styled(FlexRow)`
	padding: ${(props) => props.loading ? '0px' : '0px 10px'};
	justify-content: space-between;
	width: ${props => props.width};
`;

const ContainerListDoctor = styled(FlexOne)`
	padding: 0px !important;
	height: calc(100vh - 170px);
	overflow: hidden;
	margin-bottom: 50px;
	@media (max-width: 768px) {
		height: calc(100vh - 50px);
	};
`;


function _MobileListDoctor(props: any) {
	const {
		doctorList,
		loading,
		isMobileLayout,
		hospitalList,
		selectedIndex,
		onSearchChange,
		masterDoctorList,
		onChooseScheduleRedirect,
		onChangePage,
		currentPage,
		useFooter
	} = props;

	const backToHome = () => {
		if (isMobileLayout) {
			props.history.push(HOME_URL);
		} else {
			props.history.push(LANDING_URL);
		}
	}

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomCardStyle variant="outlined">
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

											<FlexOneCustom flex={"60% 0 0"}>
												<SearchListDoctor
													id="search_doctor"
													needIcon={true}
													icon={"search"}
													onSearchChange={onSearchChange}
													isForMobileLayout={true}
													width={"80%"}
												/>
											</FlexOneCustom>

											<FlexOneCustom flex={"10% 0 0"}>
												<ImageLogo
													height={20}
													width={20}
													src={IconFilter}
												/>
											</FlexOneCustom>

											<FlexOneCustom flex={"10% 0 0"}>
												<ImageLogo
													height={20}
													width={20}
													src={SortIcon}
												/>
											</FlexOneCustom>
										</HeaderRegister>
									</CustomFlexRowCenter>
									<FlexRow>
										<ContainerListDoctor>
											<CustomScroll flex="1" heightRelativeToParent={'100%'}>
												<ListDoctor
													selectedIndex={selectedIndex}
													masterDoctorList={masterDoctorList}
													doctorList={doctorList}
													loading={loading}
													onChooseScheduleRedirect={onChooseScheduleRedirect}
													isForMobileLayout
													onChangePage={onChangePage}
													currentPage={currentPage}
												/>
											</CustomScroll>
										</ContainerListDoctor>
									</FlexRow>
									{isMobileLayout && (<BottomNavBar {...props} />)}
								</ContainerCardContent>
							</CustomCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{useFooter && (<Footer />)}
			</CustomConLogin>
		</Fragment>
	)
}

export const MobileListDoctor = memo(_MobileListDoctor);

