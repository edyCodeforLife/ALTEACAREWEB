
import { memo } from 'react';
import styled from 'styled-components';
import { LeftGrid } from '../../../material-grid/index';
import { FlexOne, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { ImageLogo } from '../../../navbar/navbar';
import {
	Divider,
	CardContent,
	Card,
} from '@material-ui/core';
import { CategoryList } from './list-item-category/category';
import IconFilter from '../../../../assets/image/icons/icon_filter.svg';
import { IDoctorSpecialist, IHospitalList } from '../../../../data/services/alteaCMS/IAlteaCMS';
import { chunk } from 'lodash';

const ContainerBtnReset = styled.div`
	height: auto;
	width: auto:
	padding: 5px;
	margin: 10px;
`;

export const CustomCardContent = styled(CardContent)`
	padding: 12px;
	  &:last-child {
        padding-bottom: 10px;
    }
`;

const BtnReset = styled.button`
	background: #D6EDF6;
	border-radius: 20px;
	color: #3E8CB9;
	border: none;
	padding: 8px 15px;
	font-size: 14px;
	outline: none;
	cursor: pointer;
`;

const ContainerIcon = styled.div`
	margin-right: 8px;
`;

const CustomText = styled.div`
	color: #3A3A3C;
	font-size: 14px;
	font-style: normal;
`;

export interface IOpen {
	specialistOpen: boolean;
	hospitalOpen: boolean;
	priceOpen: boolean;
}

interface ISidelistCard {
	handleClickSideList(categoryParam): void;
	open: IOpen;
	handleToggleSpecialist(value: number): void;
	handleToggleHospital(value: number): void
	checkedSpecialist: number[];
	checkedHospital: number[];
	priceList: string[];
	dataSpecialist: IDoctorSpecialist[];
	hospitalList: IHospitalList[];
	onShowModalCategory(evt: any): void;
}

function _SideListCard(props: ISidelistCard) {
	const { handleClickSideList, onShowModalCategory, open: { specialistOpen, hospitalOpen, priceOpen }, handleToggleSpecialist, handleToggleHospital, dataSpecialist, hospitalList, checkedHospital, checkedSpecialist, priceList } = props;

	let query1 = { specialistOpen: { $set: !specialistOpen } };
	let query2 = { hospitalOpen: { $set: !hospitalOpen } };
	let query3 = { priceOpen: { $set: !priceOpen } };

	const chunkDataSpecialist = chunk(dataSpecialist, 5);

	return (
		<Card>
			<CustomCardContent>
				<FlexRow>
					<ContainerIcon>
						<ImageLogo height={20} width={20} src={IconFilter} />
					</ContainerIcon>

					<FlexOne>
						<CustomText>Filter Pencarian</CustomText>
					</FlexOne>
				</FlexRow>

				<FlexRowCenter>
					<ContainerBtnReset>
						<BtnReset>
							Atur Ulang
						</BtnReset>
					</ContainerBtnReset>
				</FlexRowCenter>
				<Divider />

				<LeftGrid item xs={12}>
					<CategoryList
						titleName={"Spesialis"}
						listData={chunkDataSpecialist[0]}
						open={specialistOpen}
						toggle={handleToggleSpecialist}
						checked={checkedSpecialist}
						handleClickSideList={() => handleClickSideList(query1)}
						isCheckBoxUsed
						onShowModalCategory={(evt) => { onShowModalCategory(evt) }}
					/>
				</LeftGrid>
				<Divider />
				<LeftGrid item xs={12}>
					<CategoryList
						titleName={"Rumah Sakit"}
						listData={hospitalList}
						open={hospitalOpen}
						toggle={handleToggleHospital}
						checked={checkedHospital}
						handleClickSideList={() => handleClickSideList(query2)}
						isCheckBoxUsed
						onShowModalCategory={(evt) => { onShowModalCategory(evt) }}
					/>
				</LeftGrid>
				<Divider />
				<LeftGrid item xs={12}>
					<CategoryList
						titleName={"Harga"}
						listData={priceList}
						open={priceOpen}
						handleClickSideList={() => handleClickSideList(query3)}
					/>
				</LeftGrid>
			</CustomCardContent>
		</Card>
	)
}

export const SideListCard = memo(_SideListCard);

