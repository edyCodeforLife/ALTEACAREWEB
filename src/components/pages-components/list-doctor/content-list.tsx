import { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { LeftGrid, ContainerGrid, CenterGrid, RightGrid } from '../../material-grid/index';
import { FlexOne, FlexOneCenter, FlexRow, FlexRowCenter } from '../../basic-elements/flex/index';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from '@material-ui/core/';
import { ContainerMainLanding, MainLandingContainer, InsiderBox, LeftGridCustom } from '../landing/main';
import { SideListCard } from './side-list/card';
import { IOpen } from './side-list/card';
import { SearchandFilter } from './searchandfilter/index';
import Pagination from '@material-ui/lab/Pagination';
import { ListDoctor } from './list-doctor/list-doctor';
import { ModalCategory } from '../list-doctor/side-list/modal/category-modal';
import { IDoctorSpecialist, IHospitalList, IDoctorList } from '../../../data/services/alteaCMS/IAlteaCMS';
import { QrsToObj } from '../../../data/global/function';
import { find } from 'lodash';

const CustomContainerMainLanding = styled(ContainerMainLanding)`
	// padding-top: 85px !important;
	// height: 150vh !important;
	// padding-bottom: 85px !important;
	// margin-bottom: 100px !important;
	min-height: calc(100vh - 220px) !important;
`;

const CustomContainerGrid = styled(ContainerGrid)`
	align-items: flex-start;
`;

const CustomMainLanding = styled(MainLandingContainer)`
	padding: 0px 160px;
`;

const ContainerMainContent = styled(CustomMainLanding)`
	margin-top: 50px;
`;

const ContainerBreadCrumb = styled.div`
	width: 100%;
	height: 30px;
	background: #FAFAFC;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const CustomLink = styled(Link)`
	color: #3E8CB9;
`;

export const FlexRowRight = styled(FlexRow)`
	justify-content: flex-end;
	width: 100%;
`;

export const ContainerPagination = styled.div`
	width: auto;
	height: auto;
	padding: 10px;
`;

export const CustomPagination = styled(Pagination)`
	.MuiButtonBase-root {
		background-color: #fff;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
	};
	.Mui-selected{
		background-color: #3868B0;
		color: #fff;
	}
	.MuiPaginationItem-page:hover {
		background-color: #3868B0;
		color: #fff;
	}
	.MuiPaginationItem-root {
		height: ${props => props.isForMobileLayout ? 28 : 32}px;
		min-width: ${props => props.isForMobileLayout ? 28 : 32}px;
	}

`;

interface IContentList {
	open: IOpen;
	handleClickSideList(query): void;
	handleToggleSpecialist(value: number): void;
	handleToggleHospital(value: number): void;
	checkedSpecialist: number[];
	checkedHospital: number[];
	priceList: string[];
	dataSpecialist: IDoctorSpecialist[];
	hospitalList: IHospitalList[];
	datalist: any[];
	anchorEl: null | HTMLElement;
	handleClickFilter(event: React.MouseEvent<HTMLElement>): void;
	handleCloseFilter(): void;
	labelName: string;
	doctorList: any[];
	masterDoctorList: IDoctorList[];
	selectedIndex: number;
	chunkNumber: number;
	onChangePage(e: object, page: number): void;
	currentPage: number;
	loading: boolean;
	handleClickSelected(selected: any): void;
	onSearchChange(): void;
	onChooseScheduleRedirect(doctorId: string): void;
}

function _ContainerContentListDoc(props: IContentList) {
	const {
		open,
		handleClickSideList,
		handleToggleSpecialist,
		handleToggleHospital,
		checkedHospital,
		checkedSpecialist,
		dataSpecialist,
		hospitalList,
		priceList,
		datalist,
		anchorEl,
		handleCloseFilter,
		handleClickFilter,
		labelName,
		doctorList,
		masterDoctorList,
		selectedIndex,
		handleClickSelected,
		chunkNumber,
		loading,
		onChangePage,
		currentPage,
		onSearchChange,
		onChooseScheduleRedirect,
	} = props;

	const [isShowModalCategory, setIsShowModalCategory] = useState<boolean>(false);
	const [modalPosition, setModalPosition] = useState<{ top: number; right: number }>();
	let qObj = QrsToObj(window.location.search);
	let specialistData = find(dataSpecialist, { specialization_id: qObj.specialistID });

	const modify = useCallback(
		(
			{
				position,
			}: {
				position: { top: number; right: number };
			},
			cb: any
		) => {
			setModalPosition(position)
		}, [props]);

	const onShowModalCategory = (evt: React.MouseEvent<HTMLElement>) => {
		const { clientX, clientY } = evt;
		setIsShowModalCategory(true)
		modify(
			{
				position: { top: clientY, right: clientX },
			},
			() => {
			}
		);
	}

	const specialistName = specialistData?.name ?? 'Dokter Specialist';

	return (
		<CustomContainerMainLanding>
			<LeftGrid item xs={12}>
				<ContainerBreadCrumb>
					<CustomMainLanding>
						<InsiderBox>
							<Breadcrumbs>
								<CustomLink href="/landing">
									Beranda
								</CustomLink>
								<Link color="inherit">
									{specialistName}
								</Link>
							</Breadcrumbs>
						</InsiderBox>
					</CustomMainLanding>

				</ContainerBreadCrumb>
			</LeftGrid>
			<ContainerMainContent>
				<InsiderBox>
					<CustomContainerGrid container spacing={3}>
						<LeftGrid item xs={3} sm={3} md={3}>
							<SideListCard
								dataSpecialist={dataSpecialist}
								checkedHospital={checkedHospital}
								checkedSpecialist={checkedSpecialist}
								handleToggleHospital={handleToggleHospital}
								handleToggleSpecialist={handleToggleSpecialist}
								handleClickSideList={handleClickSideList}
								open={open}
								onShowModalCategory={(evt) => { onShowModalCategory(evt) }}
								hospitalList={hospitalList}
								priceList={priceList}
							/>
						</LeftGrid>
						<LeftGrid item xs={9} sm={9} md={9}>
							<FlexRow>
								<FlexOne>
									<SearchandFilter
										datalist={datalist}
										onSearchChange={onSearchChange}
										handleClickSelected={handleClickSelected}
										anchorEl={anchorEl}
										handleclose={handleCloseFilter}
										handleclick={handleClickFilter}
										labelName={labelName}
									/>
								</FlexOne>
							</FlexRow>

							<FlexRow>
								<FlexOne>
									<ListDoctor
										selectedIndex={selectedIndex}
										masterDoctorList={masterDoctorList}
										doctorList={doctorList}
										loading={loading}
										onChooseScheduleRedirect={onChooseScheduleRedirect}
									/>
								</FlexOne>
							</FlexRow>
							{doctorList && doctorList[selectedIndex] && doctorList[selectedIndex].length > 0 && (
								<FlexRowRight>
									<ContainerPagination>
										<CustomPagination
											defaultPage={1}
											onChange={onChangePage}
											page={currentPage}
											variant="outlined"
											shape="rounded"
											count={doctorList.length}
										/>
									</ContainerPagination>
								</FlexRowRight>
							)}
						</LeftGrid>
					</CustomContainerGrid>
				</InsiderBox>
			</ContainerMainContent>

			<ModalCategory
				isShow={isShowModalCategory}
				setIsShow={setIsShowModalCategory}
				modalPosition={modalPosition}
			/>
		</CustomContainerMainLanding>
	)

}

export const ContainerContentListDoc = memo(_ContainerContentListDoc);