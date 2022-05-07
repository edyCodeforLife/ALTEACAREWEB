import { Fragment, memo, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { MainLandingContainer, InsiderBox, TextLabelCustom, BoldText } from '../../main';
import { FlexRow, FlexRowCenter } from '../../../../basic-elements/flex';
import { CarouselSpecialist } from '../../slide/index';
import { GeneralSearch } from '../../general-search/search';
import { Footer } from '../../../../footer/footer';
import { IDoctorSpecialist, IDataGeneralSearch } from '../../../../../data/services/alteaCMS/IAlteaCMS';
import { sortBy } from 'lodash';

export const MobileContentContainer = styled.div`
    min-height: -webkit-calc(100vh - 20px) !important;
    min-height: -moz-calc(100vh - 20px) !important;
    min-height: calc(100vh - 20px) !important;
    padding-bottom: 12px !important;
	width: 100%;
	overflow: hidden;
`;

const MobileMainLanding = styled(MainLandingContainer)`
	padding: 0px 20px;
	position: relative;
`;

const TextCustomLabel = styled(TextLabelCustom)`
	font-size: 16px;
`;

const TextBold = styled(BoldText)`
	font-size: 16px;
	text-align: left;
	margin-top: 3px;
`;

const DescTextTitle = styled(TextBold)`
	font-size: 15px;
	white-spaces: none;
	margin-top: 40px;
`;

export const ContainerSlider = styled.div`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
`;

const ContainerFlexCenterRow = styled(FlexRowCenter)`
	margin-top: ${(props) => props.marginTop}px;
	@media (max-width: 360px) {
		margin-top: 10px
	}
`;

const CustomBtn = styled.button`
	font-size: 12px;
	color: #FFFFFF;
	background: #3E8CB9;
	border: none;
	padding: 15px 40px;
	border-radius: 8px;
`;

const TextLabelStyle = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	color: #2C528B;
`;

export interface IMobileView {
	dataPopularSpecialist: IDoctorSpecialist[];
	onRedirect(): void;
	loading: boolean;
	loadingSearch: boolean;
	history: any;
	open?: boolean;
	anchorRef?: any;
	handleClose?(event: MouseEvent<EventTarget>): void;
	handleListKeyDown?(event: KeyboardEvent): void;
	handleChange?(event: ChangeEvent): void;
	searchData?: IDataGeneralSearch;
	redirectTo(field: string, id: string): void;
}

function _ContentMobileView(props: IMobileView) {
	const { onRedirect, redirectTo, loadingSearch, dataPopularSpecialist, searchData, loading, handleChange, open, anchorRef, handleListKeyDown, handleClose } = props;
	let sortedData = sortBy(dataPopularSpecialist, (o) => { return !o.is_popular });
	return (
		<Fragment>
			<MobileContentContainer>
				<MobileMainLanding>
					<InsiderBox>
						<FlexRow>
							<TextCustomLabel>
								Hi, Selamat datang di Alteacare
						</TextCustomLabel>
						</FlexRow>
						<FlexRow>
							<TextBold normal>
								Apakah ada gejala yang mengganggu Kamu?
						</TextBold>
						</FlexRow>

						<FlexRow>
							<GeneralSearch
								id="search_input"
								needIcon={true}
								icon={"search"}
								open={open}
								anchorRef={anchorRef}
								handleClose={handleClose}
								handleListKeyDown={handleListKeyDown}
								handleChange={handleChange}
								isActiveMenu
								searchData={searchData}
								loadingSearch={loadingSearch}
								redirectTo={redirectTo}
							/>
						</FlexRow>
						<FlexRowCenter>
							<DescTextTitle normal>
								Konsultasi langsung dengan dokter spesialis
						</DescTextTitle>
						</FlexRowCenter>

						<ContainerSlider>
							<CarouselSpecialist
								dataSpecialist={sortedData}
								iconWidth={30}
								iconHeight={30}
								onRedirect={onRedirect}
								loading={loading}
								isForMobileLayout={false}
								activeHover
							/>
						</ContainerSlider>

						<FlexRow>
							<DescTextTitle normal>
								Jadwal Konsultasi saya Hari ini
						</DescTextTitle>
						</FlexRow>

						<ContainerFlexCenterRow onClick={() => props.history.push("/login")} marginTop={100}>
							<CustomBtn>
								Masuk
							</CustomBtn>
						</ContainerFlexCenterRow>

						<ContainerFlexCenterRow marginTop={20}>
							<TextLabelStyle>
								Masuk untuk melihat konsultasi hari ini
							</TextLabelStyle>
						</ContainerFlexCenterRow>

					</InsiderBox>
				</MobileMainLanding>
			</MobileContentContainer>
			<Footer />
		</Fragment>
	)

}

export const ContentMobileView = memo(_ContentMobileView);