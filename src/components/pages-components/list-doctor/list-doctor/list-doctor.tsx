
import { memo } from 'react';
import { map } from 'lodash';
import { IDoctorList } from '../../../../data/services/alteaCMS/IAlteaCMS';
import { ContainerListDoctor } from './util-style/list-component';
import { InsideCardListDoctor } from './inside-list';
import Flex, { FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { ContainerPagination, CustomPagination } from '../content-list';

export interface IListDoctor {
	doctorList: any[];
	masterDoctorList: IDoctorList[];
	selectedIndex: number;
	loading: boolean;
	onChooseScheduleRedirect(doctorId: string): void;
	isForMobileLayout?: boolean;
	onChangePage?(e: object, page: number): void;
	currentPage?: number;
}


function _ListDoctor(props: IListDoctor) {

	const { doctorList, loading, onChangePage, currentPage, masterDoctorList, isForMobileLayout, selectedIndex, onChooseScheduleRedirect } = props;

	const newData = doctorList && doctorList?.length > 0 && !loading ? doctorList[selectedIndex] : [0, 1, 2, 3, 4];

	return (
		<ContainerListDoctor isForMobileLayout={isForMobileLayout}>
			{map(newData, (item: any, idx: number) => {
				return (
					<InsideCardListDoctor
						key={idx}
						item={item}
						loading={loading}
						onChooseScheduleRedirect={onChooseScheduleRedirect}
						isForMobileLayout={isForMobileLayout}
						id={idx}
					/>
				)
			})}
			{isForMobileLayout && (
				<FlexRow>
					{doctorList && doctorList[selectedIndex] && doctorList[selectedIndex].length > 0 && (
						<FlexRowCenter>
							<ContainerPagination>
								<CustomPagination
									defaultPage={1}
									onChange={onChangePage}
									page={currentPage}
									count={doctorList.length}
									variant="outlined"
									shape="rounded"
									isForMobileLayout
								/>
							</ContainerPagination>
						</FlexRowCenter>
					)}
				</FlexRow>
			)}
		</ContainerListDoctor>
	)
}

export const ListDoctor = memo(_ListDoctor);