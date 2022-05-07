import { Fragment, memo, useRef, useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Tab, Tabs, AppBar } from '@material-ui/core';
import styled from 'styled-components';
import { map } from 'lodash';
import { BoxAppointment, FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';
import CustomScroll from 'react-custom-scroll';
import { BlankBox } from '../card/blank_card';
import { FlexRow } from '../../../basic-elements/flex';
import { TextAreaContainer, TextAreaCustom } from '../../call/chat/InputChat/input-chat';
import { Icon } from '../../../basic-elements/mobile-container';
import SortIcon from '../../../../assets/image/icons/sort_icon.png';
import { ImageLogo } from '../../../navbar/navbar';
import { ModalSort } from '../modal/sortModal';

const ContainerFullWidth = styled.div`
	position: relative;
	width: 100%;
	box-sizing: border-box;
	height: 100%;
	margin-top:60px;
`;

const CustomTab = styled(Tab)`
	min-width: 0px;
`;

const CustomSwipeView = styled(SwipeableViews)`
	height: 100%;
	box-sizing: border-box;
	& .react-swipeable-view-container {
		height: calc(100% - 100px);
	}
`;

const MainTabs = styled(Tabs)`
	background: #FFFFFF;
	color: #61C7B5;
	& .MuiTabs-indicator {
		background-color: #61C7B5 !important;
	}

`;

const ContainerTabs = styled(AppBar)`
	color: white;
	background: #FFFFFF;
	box-shadow: none;
	position: absolute;
	z-index: 20;
`;

const CustomTabPanel = styled(TabPanel)`
	height: 100%;
`;

const ContainerCardList = styled.div`
	height: calc(100vh - 240px);
	box-sizing: border-box;
	padding-top: 60px;
	@media (max-width: 768px) {
		height: ${(props) => props.mheight};
	};
`;

const FilterBox = styled.div`
	border: 1px solid #61C7B5;
	box-sizing: border-box;
	color: ${(props) => props.isActive ? '#fff' : '#8F90A6'};
	border-radius: 15px;
	padding: 4px 8px;
	margin: 0px 5px;
	font-size: 12px;
	cursor: pointer;
	background-color: ${(props) => props.isActive ? '#61C7B5' : '#fff'};
`;

const CustomBox = styled(Box)`
	padding: 2px 24px;
`;

const ContainerTools = styled.div`
	margin: 0px 0px 8px 0px;
	box-sizing: border-box;
	padding: 0px 24px;
`;

const ContainerSort = styled.div`
	display: flex;
	position: relative;
	margin-left: 5px;
	padding: 12px 4px;
	justify-content: space-between;
	cursor: pointer;
`;

const SortText = styled.span`
	font-size: 14px;
	font-weight: 500;
	text-align: right;
	margin-left: 8px;
	color: #6B7588;
`;

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<CustomBox>
					<Typography component={'span'}>{children}</Typography>
				</CustomBox>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

function _FullWidthTabs(props: any) {
	const theme = useTheme();
	const {
		value,
		handleChangeActiveTab,
		activeFilterPeriod,
		changeSort,
		handleSelectedPeriodFilter,
		handleChangeIndex,
		loading,
		activeAppointmentList,
		handleChange,
		searchQuery,
		onChangeRadio,
		sortOption,
		handleClickBox
	} = props;
	const arrIdx = [0, 1, 2];
	const filterBox = ["Hari Ini", "Minggu Ini", "Hari Lain"];
	const textInputRef = useRef<HTMLTextAreaElement>(null);
	const [openModalSort, setOpenModalSort] = useState(false);
	const [isTextareaFocused, setIsTextareaFocused] = useState(false);

	const handleModalSort = (isOpen) => {
		setOpenModalSort(isOpen)
	}

	const renderFilterPeriod = () => {
		return (
			<FlexRow>
				{map(filterBox, (item, idx) => {
					return (
						<FilterBox
							isActive={activeFilterPeriod === item}
							onClick={() => handleSelectedPeriodFilter(item, idx)}
							key={idx}
						>
							{item}
						</FilterBox>
					)
				})}
			</FlexRow>
		)
	}

	const renderSearchandSort = () => {
		return (
			<FlexRowSpaceBetween>
				<TextAreaContainer
					style={{ display: 'flex', padding: '6px 10px' }}
					isTextareaFocused={isTextareaFocused}
				>
					<Icon
						style={{ position: 'absolute', lineHeight: 1.2 }}
						color={'#61C7B5'}
						icon={"search"}
					/>
					<TextAreaCustom
						style={{ marginLeft: 25, fontSize: 15 }}
						rowsMin={1}
						rowsMax={3}
						aria-label="Search"
						placeholder="Pencarian"
						onChange={handleChange}
						value={searchQuery}
						data-cy-chat-input
						ref={textInputRef}
						onFocus={() => setIsTextareaFocused(true)}
						onBlur={() => setIsTextareaFocused(false)}
					/>
				</TextAreaContainer>
				<ContainerSort onClick={() => { handleModalSort(true) }}>
					<ImageLogo
						src={SortIcon}
					/>
					<SortText>
						Urutkan
					</SortText>
				</ContainerSort>
			</FlexRowSpaceBetween>
		)
	}

	const switchTools = (activeTab) => {
		switch (activeTab) {
			case 0:
				return renderFilterPeriod();
			case 1:
				return renderSearchandSort();
			case 2:
				return renderSearchandSort();
			default:
				return renderFilterPeriod();
		}
	}

	return (
		<ContainerFullWidth>
			<ContainerTabs>
				<MainTabs
					value={value}
					onChange={handleChangeActiveTab}
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<CustomTab label="Berjalan" {...a11yProps(0)} />
					<CustomTab label="Riwayat" {...a11yProps(1)} />
					<CustomTab label="Dibatalkan" {...a11yProps(2)} />
				</MainTabs>
			</ContainerTabs>

			<CustomSwipeView
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				springConfig={{ duration: '1s', delay: '0.5s' }}
				onChangeIndex={handleChangeIndex}
			>
				{map(arrIdx, (item, idx) => (
					<ContainerCardList key={idx} mheight={"calc(100vh - 140px)"}>
						<ContainerTools>
							{switchTools(value)}
						</ContainerTools>
						<CustomScroll flex="1" heightRelativeToParent={'calc(100% - 20px)'}>
							<CustomTabPanel key={idx} value={value} index={item} dir={theme.direction}>
								{activeAppointmentList?.length > 0 ?
									<Fragment>
										{map(activeAppointmentList, (item: any, idx: number) => (
											<BoxAppointment
												id="data"
												item={item}
												loading={loading}
												handleClickBox={handleClickBox}
												key={idx}
												{...props}
											/>
										))}
									</Fragment>

									:
									(
										<BlankBox />
									)
								}
							</CustomTabPanel>
						</CustomScroll>
					</ContainerCardList>

				))}
			</CustomSwipeView>
			<ModalSort
				open={openModalSort}
				handleModal={handleModalSort}
				onChangeRadio={onChangeRadio}
				sortOption={sortOption}
				changeSort={changeSort}
			/>
		</ContainerFullWidth>
	);
}

export const FullWidthTabs = memo(_FullWidthTabs);