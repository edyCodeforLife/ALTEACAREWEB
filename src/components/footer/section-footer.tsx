import { memo } from 'react';
import styled from 'styled-components';
import { InsideContainer, ImageLogo } from '../navbar/navbar';
import Appstore from '../../assets/image/Appstore.png';
import GooglePlay from '../../assets/image/Google_Play.png';
import LogoAltea from '../../assets/image/alteacare_logo.svg';
import { LeftGrid, RightGrid, CenterGrid, ContainerGrid } from '../material-grid/index';
import { FooterContainer, FooterInsideContainer, MainContentFooterContainer, InsideMainContentContainer } from './footer';
import { FlexRow } from '../basic-elements/flex';
import Instagram from '../../assets/image/icons/Instagram.svg';
import Facebook from '../../assets/image/icons/Facebook.svg';
import Linkedin from '../../assets/image/icons/Linkedin.svg';
import Twitter from '../../assets/image/icons/Twitter.svg';
import Youtube from '../../assets/image/icons/YouTube.svg';
import { IDataSosMed } from '../../data/services/alteaCMS/IAlteaCMS';

const FooterSection = styled(FooterContainer)`
    position: relative;
	bottom: 0px;
	left: 0px;
	right: 0px
	top: 0px
	width: 100vw;
	min-height: 200px;
	background: #D6EDF6;
	box-shadow: 0px 0px 4px rgba(44, 82, 139, 0.25);
	box-sizing: border-box;
	z-index: 5;
	padding: 20px 0px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CustomContainerGrid = styled(ContainerGrid)`
	text-align: right;
`;

const TextLabel = styled.div`
	font-size: 14px;
	color: #2C528B;
	padding: 8px 0px;
	font-weight: bold;
`;

const SectionContainer = styled(InsideContainer)`
	width: 100%;
`;

const CustomLeftGrid = styled(LeftGrid)`
	margin-top: 30px;
`;

const CustomTextLabel = styled(TextLabel)`
	font-size: 10;
	font-weight: normal;
	white-space: normal;
	padding: 1px 0px;
	text-decoration: none;
	margin-right: ${(props) => props.marginRight ? '8px' : null}
`;

const CustomTextLabel2 = styled(CustomTextLabel)`
	margin-bottom: 10px
`

const Space = styled.div`
	margin: 20px 0px;
`;

const NormalLink = styled.a`
	text-decoration: none;
`;

const MarginTopRow = styled(FlexRow)`
	margin-top: 7px;
`;

interface ISectionFooter {
	dataSosMed: IDataSosMed[];
	style?: any
}


function _SectionFooter(props: ISectionFooter) {
	const { dataSosMed, style } = props;
	return (
		<FooterSection style={style}>
			<FooterInsideContainer>
				<MainContentFooterContainer>
					<InsideMainContentContainer>
						<CustomContainerGrid container spacing={3}>
							<RightGrid item xs={3}>
								<ImageLogo width={"200"} height={"70"} src={LogoAltea} />
							</RightGrid>

							<LeftGrid item xs={2}>
								<TextLabel>FAQ</TextLabel>
								<TextLabel>Syarat dan ketentuan</TextLabel>
								<TextLabel>Blog</TextLabel>
							</LeftGrid>

							<CustomLeftGrid item xs={2}>
								<TextLabel>Medical Advisor</TextLabel>
								<TextLabel>Spesialis</TextLabel>
							</CustomLeftGrid>

							<LeftGrid item xs={3}>
								<TextLabel>Kontak</TextLabel>
								<CustomTextLabel>
									Jalan Raya Bintaro Utama, Bintaro Jaya Sektor 3A Tangerang Selatan 15225
								</CustomTextLabel>

								<Space>
									<CustomTextLabel>
										Hotline WA AlteaCare
									</CustomTextLabel>
									<NormalLink href="https://api.whatsapp.com/send?phone=6281315739235">
										<CustomTextLabel>
											<strong>+62 813 15739235</strong>
										</CustomTextLabel>
									</NormalLink>

									<NormalLink href="mailto:cs@alteacare.com">
										<CustomTextLabel>
											email : cs@alteacare.com
										</CustomTextLabel>
									</NormalLink>

									<MarginTopRow>
										<CustomTextLabel marginRight>
											Ikuti Kami
										</CustomTextLabel>
										<ImageLogo
											src={Instagram}
											height={25}
											width={25}
										/>
										<ImageLogo
											margin
											src={Twitter}
											height={25}
											width={25}
										/>
										<ImageLogo
											src={Linkedin}
											height={25}
											width={25}
										/>
										<ImageLogo
											margin
											src={Facebook}
											height={25}
											width={25}
										/>
										<ImageLogo
											src={Youtube}
											height={25}
											width={25}
										/>
									</MarginTopRow>
								</Space>
							</LeftGrid>

							<CenterGrid item xs={2}>
								<CustomTextLabel2>Download Aplikasi</CustomTextLabel2>
								<ImageLogo src={GooglePlay} />
								<ImageLogo src={Appstore} />
							</CenterGrid>

						</CustomContainerGrid>
					</InsideMainContentContainer>
				</MainContentFooterContainer>

			</FooterInsideContainer>
		</FooterSection>
	);
}

export const SectionFooter = memo(_SectionFooter);
