import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomCardStyle
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';

import { NewCardContent } from '../../pages-components/list-doctor/searchandfilter/index';
import { CustomConLogin, HeaderRegister } from '../register/register';
import { FullWidthTabs } from './tabs/index';
import { isMobile } from '../../../data/global/function';
import { BottomNavBar } from '../../bottom-nav-bar/index';

export const HomeCardStyle = styled(CustomCardStyle)`
	min-height: 85vh;
`;

export const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	// height: calc(100vh - 160px);
	height: 100%;
	position: relative;
	overflow: hidden;
		@media (max-width: 768px) {
		height: 100%;
	};
`;
export const FlexRowCenterCustom = styled(FlexRowCenter)`
	width: 100%;
`;

export const HeaderMyConsultation = styled(HeaderRegister)`
	box-sizing: border-box;
	padding: 20px;
	box-shadow: none;
`;

export const AgeDesc = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	color: #2C528B;
`;

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

export const ContainerCustomSkeleton = styled(FlexRow)`
	padding: ${(props) => props.loading ? '0px' : '0px 10px'};
	justify-content: space-between;
	width: ${props => props.width};
`;


function _MyConsultationContent(props: any) {

	const {
		handleChangeActiveTab,
		tabValue,
		activeFilterPeriod,
		handleChangeIndex,
		handleSelectedPeriodFilter,
		activeAppointmentList,
		loading,
		handleClickBox,
		searchQuery,
		handleChange,
		onChangeRadio,
		sortOption,
		changeSort
	} = props;

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<HeaderMyConsultation>
										<FlexRowCenterCustom
										>
											<HeaderText> Telekonsultasi Saya</HeaderText>
										</FlexRowCenterCustom>
									</HeaderMyConsultation>
									<FullWidthTabs
										value={tabValue}
										handleChangeIndex={handleChangeIndex}
										handleChangeActiveTab={handleChangeActiveTab}
										loading={loading}
										activeAppointmentList={activeAppointmentList}
										activeFilterPeriod={activeFilterPeriod}
										handleSelectedPeriodFilter={handleSelectedPeriodFilter}
										handleChange={handleChange}
										searchQuery={searchQuery}
										onChangeRadio={onChangeRadio}
										sortOption={sortOption}
										changeSort={changeSort}
										handleClickBox={handleClickBox}
									/>
									<BottomNavBar {...props} />
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

export const MyConsultationContent = memo(_MyConsultationContent);

