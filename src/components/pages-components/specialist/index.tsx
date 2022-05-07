import { memo, Fragment } from 'react';
import styled from 'styled-components';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
	Icon
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';
import { CustomConLogin } from '../register/register';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { Flex, FlexRow } from '../../basic-elements/flex/index';
import { isMobile } from '../../../data/global/function';
import { BottomNavBar } from '../../bottom-nav-bar/index';
import { HeaderMyConsultation, FlexRowCenterCustom, HeaderText } from '../my-consultation/index';
import CustomScroll from 'react-custom-scroll';
import { map } from 'lodash';
import { IDoctorSpecialist } from '../../../data/services/alteaCMS/IAlteaCMS';
import { BoxSpecialist } from '../landing/slide/box-specialist';
import { ISpecialistProps } from '../../../pages/specialist/screen';

const ContainerInside = styled(Flex)`
	padding: 0px !important;
	height: calc(100vh - 160px);
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	@media (max-width: 768px) {
		height: calc(100vh - 61px);
	};
`;

const FlexRowSpaceAround = styled(FlexRow)`
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
	margin-top: 60px;
	padding: 0px 20px;
`;

function _SpecialistContent(props: ISpecialistProps) {

	const {
		loading,
		dataSpecialist,
		onRedirect
	} = props;

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<ContainerInside>
										<HeaderMyConsultation>
											<FlexRowCenterCustom
											>
												<HeaderText>Dokter Spesialis</HeaderText>
											</FlexRowCenterCustom>
										</HeaderMyConsultation>
										<CustomScroll flex="1" heightRelativeToParent={'100%'}>
											<FlexRowSpaceAround>
												{map(dataSpecialist, (item: IDoctorSpecialist, idx: number) => (
													<BoxSpecialist
														id="data"
														key={idx}
														activeHover={false}
														iconHeight={30}
														iconWidth={30}
														iconSrc={item.icon?.url}
														specialistName={item?.name}
														specialization_id={item?.specialization_id}
														onRedirect={onRedirect}
														loading={loading}
														isForMobileLayout
														containerminwidth={"80px"}
														containerwidth={"80px"}
														mobileconPadding={"2px 2px"}
														mobileconMargin={'5px 2px'}
														{...props}
													/>
												))}

											</FlexRowSpaceAround>
										</CustomScroll>
									</ContainerInside>
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

export const SpecialistContent = memo(_SpecialistContent);

