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
import { Avatar } from '../../avatar/avatar';
import { getInitials, capitalizeName, isMobile } from '../../../data/global/function';
import { LabelText } from '../create-consultation';
import { BottomNavBar } from '../../bottom-nav-bar/index';
import { map } from 'lodash';
import Person from '../../../assets/image/icons/icon_person.png';
import CustomScroll from 'react-custom-scroll';

const ContainerInside = styled(Flex)`
	box-sizing:border-box;
	height: 100%;
	width: 100%;
		@media (max-width: 360px) {
			height: calc(100vh - 60px);
	}
`;

export const ContainerProfile = styled(Flex)`
	align-items: flex-start;
	padding: 0px 5px;
	text-align: left;
	justify-content: flex-start;
`;

export const ContainerInsideContent = styled(FlexRow)`
	padding: ${(props) => props.padding};
	background: #fff;
	width: 100%;
	box-sizing: border-box;
	border-bottom: ${(props) => props.bbtom};
	justify-content: ${props => props.jcontent};
	cursor: ${(props) => props.cursor};
`;

const ContainerBlue = styled(FlexRow)`
	background: #D6EDF6;
	padding: 10px 20px;
`;

const ContainerLogout = styled(FlexRow)`
	padding: 20px;
	background: #fff;
	margin-top: 50px;
	cursor: pointer;
`;

function _ProfileContent(props: any) {

	const {
		loading,
		profileUser,
		handleClickField
	} = props;
	const fullName = profileUser?.first_name + " " + profileUser?.last_name;

	const profile1 = [
		{
			icon: <Icon style={{ marginRight: 10 }} icon={"account_circle"} fsize={25} color={"#2C528B"} />,
			name: 'Ubah Profile',
			field: 'changeProfile'

		},
		{
			icon: <Icon style={{ marginRight: 10 }} icon={"settings"} fsize={25} color={"#2C528B"} />,
			name: 'Pengaturan',
			field: 'settings'
		}
	];

	const about = [{
		icon: <Icon style={{ marginRight: 10 }} icon={"help"} fsize={25} color={"#2C528B"} />,
		name: 'Pertanyaan sering diajukan (FAQ)',
		field: 'FAQ'
	}, {
		icon: <Icon style={{ marginRight: 10 }} icon={"phone"} fsize={25} color={"#2C528B"} />,
		name: 'Kontak AlteaCare',
		field: 'contact'
	}, {
		icon: <Icon style={{ marginRight: 10 }} icon={"list_alt"} fsize={25} color={"#2C528B"} />,
		name: 'Syarat dan Ketentuan',
		field: 'termscondition'
	}]



	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<ContainerInside>
										<CustomScroll flex="1" heightRelativeToParent={'100%'}>
											<ContainerInsideContent padding={"20px"}>
												<Avatar
													size={60}
													bgcolor={profileUser.user_details?.avatar ?
														"#61C7B5" :
														"#D6EDF6"
													}
													textData={getInitials(fullName)}
													image={
														profileUser.user_details?.avatar ?
															profileUser.user_details?.avatar?.url :
															Person
													}
												/>
												<ContainerProfile>
													<LabelText
														color={"#2C528B"}
														fsize={14}
														fweight={580}
													>
														{fullName}
													</LabelText>
													<LabelText
														color={"#2C528B"}
														fsize={13}
													>
														{profileUser?.email}
													</LabelText>
												</ContainerProfile>
											</ContainerInsideContent>
											<ContainerBlue>
												<LabelText
													color={"#2C528B"}
													fsize={14}
													fweight={600}
												>
													Akun
												</LabelText>
											</ContainerBlue>
											{map(profile1, (item, idx) => (
												<ContainerInsideContent
													padding={"20px"}
													onClick={() => { handleClickField(item.field) }}
													jcontent={"space-between"}
													cursor={"pointer"}
													bbtom={idx === 0 ? "1px solid rgba(0,0,0, .08)" : "none"}
													key={idx}>
													<FlexRow>
														{item.icon}
														<LabelText
															color={"#2C528B"}
															fsize={15}
															fweight={600}
															wspace={"pre-line"}
															talign={"left"}
														>
															{item.name}
														</LabelText>
													</FlexRow>
													<Icon
														icon={"arrow_forward_ios"}
														color={"#61C7B5"}
													/>
												</ContainerInsideContent>
											))}
											<ContainerBlue>
												<LabelText
													color={"#2C528B"}
													fsize={14}
													fweight={600}
												>
													Tentang
												</LabelText>
											</ContainerBlue>
											{map(about, (item, idx) => (
												<ContainerInsideContent
													padding={"20px"}
													onClick={() => { handleClickField(item.field) }}
													jcontent={"space-between"}
													cursor={"pointer"}
													bbtom={idx !== 2 ? "1px solid rgba(0,0,0, .08)" : "none"}
													key={idx}>
													<FlexRow>
														{item.icon}
														<LabelText
															wspace={"pre-line"}
															talign={"left"}
															color={"#2C528B"}
															fsize={15}
															fweight={600}
														>
															{item.name}
														</LabelText>
													</FlexRow>
													<Icon
														icon={"arrow_forward_ios"}
														color={"#61C7B5"}
													/>
												</ContainerInsideContent>
											))}
											<ContainerLogout
												onClick={() => { handleClickField("logout") }}
											>
												<LabelText
													color={"#FF5C5C"}
													fsize={15}
													fweight={600}
												>
													Logout
												</LabelText>
											</ContainerLogout>
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

export const ProfileContent = memo(_ProfileContent);

