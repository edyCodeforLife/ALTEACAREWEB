import { memo, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { LeftGrid, ContainerGrid } from '../../material-grid/index';
import { TextLabel } from '../../navbar/navbar';
import { CarouselSpecialist } from './slide/index';
import { GeneralSearch } from './general-search/search';
import { IDoctorSpecialist, IDataGeneralSearch } from '../../../data/services/alteaCMS/IAlteaCMS';
import { sortBy } from 'lodash';

export const ContainerMainLanding = styled.div`
	// padding-top: 100px !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: top !important;
    min-height: -webkit-calc(100vh - 220px) !important;
    min-height: -moz-calc(100vh - 220px) !important;
    min-height: calc(100vh - 220px) !important;
    padding-bottom: 12px !important;
    background-attachment: fixed !important;
	width: 100%;
	overflow: hidden;
`;

const ContainerGridCenter = styled(ContainerGrid)`
	justify-content: center;
	height: 100%;
`;

export const MainLandingContainer = styled.div`
	margin-left: -6px;
	margin-right: -6px;
	display: flex;
	flex-wrap: wrap;
	flex-grow: 0;
	flex-shrink: 0;
	align-items: normal;
	padding: 0px 360px;
	@media all and (device-width: 1024px) and (device-height: 1366px) and (orientation:portrait) {
		padding: 0px 140px;
	};
	@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
		padding: 0px 140px;
	}
`;

export const InsiderBox = styled.div`
	box-sizing: border-box;
    min-height: 1px;
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
    margin-left: 0%;
    right: auto;
    left: auto;
`;

export const LeftGridCustom = styled(LeftGrid)`
	line-height: 1.6;
`;

const LeftGridSpaceBetween = styled(LeftGridCustom)`
	display: flex;
	justify-content: space-between;
	margin-top: 50px;
`;

const LeftGridSpaceAround = styled(LeftGridCustom)`
	display: flex;
	justify-content: space-around;
	margin-top: 15px;
	flex-direction: column;
`;

export const TextLabelCustom = styled(TextLabel)`
	color: #2C528B;
	font-size: 18px;
`;

export const BoldText = styled.span`
	font-weight: bold;
	margin-left: ${(props) => props.normal ? 0 : 5}px;
	font-size: 18px;
	color: #2C528B;
`;

const ContainerImage = styled.div`
	display: flex;
	width: 15%;
	justify-content: space-between;
`;

export interface IMainLandingContent {
	loading: boolean;
	loadingSearch: boolean;
	onRedirect(): void;
	dataPopularSpecialist: IDoctorSpecialist[];
	open?: boolean;
	anchorRef?: any;
	handleClose?(event: MouseEvent<EventTarget>): void;
	handleListKeyDown?(event: KeyboardEvent): void;
	handleChange?(event: ChangeEvent): void;
	searchData?: IDataGeneralSearch;
	redirectTo(field: string, id: string): void;
}

function _MainLandingContent(props: IMainLandingContent) {
	const { onRedirect, loadingSearch, redirectTo, dataPopularSpecialist, handleChange, searchData, loading, open, anchorRef, handleClose, handleListKeyDown } = props;
	let sortedData = sortBy(dataPopularSpecialist, (o) => { return !o.is_popular });
	return (
		<ContainerMainLanding>
			<MainLandingContainer>
				<InsiderBox>
					<LeftGridCustom item xs={12}>
						<TextLabelCustom>
							Hi, Selamat datang di
							<BoldText>AlteaCare,</BoldText>
						</TextLabelCustom>
						<BoldText normal>
							Apakah ada gejala yang mengganggu Kamu?
						</BoldText>

						<LeftGridCustom item xs={12}>
							<GeneralSearch
								id="search_input"
								needIcon={true}
								icon={"search"}
								open={open}
								anchorRef={anchorRef}
								handleClose={handleClose}
								handleListKeyDown={handleListKeyDown}
								isActiveMenu
								handleChange={handleChange}
								searchData={searchData}
								loadingSearch={loadingSearch}
								redirectTo={redirectTo}
							/>
						</LeftGridCustom>

						<LeftGridSpaceBetween item xs={12}>
							<BoldText normal>
								konsultasi langsung dengan dokter spesialis
							</BoldText>
						</LeftGridSpaceBetween>

						<LeftGridSpaceAround item xs={12}>
							<CarouselSpecialist
								dataSpecialist={sortedData}
								iconHeight={70}
								iconWidth={70}
								onRedirect={onRedirect}
								loading={loading}
								isForMobileLayout={false}
								activeHover
							/>
						</LeftGridSpaceAround>

					</LeftGridCustom>
				</InsiderBox>
			</MainLandingContainer>
		</ContainerMainLanding>
	)

}

export const MainLandingContent = memo(_MainLandingContent);