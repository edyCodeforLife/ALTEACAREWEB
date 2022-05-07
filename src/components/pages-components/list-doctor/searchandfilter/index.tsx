
import { memo } from 'react';
import styled from 'styled-components';
import { LeftGrid } from '../../../material-grid/index';
import Flex, { FlexOne, FlexRow, FlexRowCenter } from '../../../basic-elements/flex/index';
import { CustomCardContent } from '../side-list/card';
import {
	Divider,
	CardContent,
	Card,
} from '@material-ui/core';
import { SearchListDoctor } from './search/search';
import { FilterListDoctor } from './filter/filter';
import { ImageLogo } from '../../../navbar/navbar';
import SortIcon from '../../../../assets/image/icons/sort_icon.png';

const CustomFlexRow = styled(FlexRow)`
	align-items: flex-end;
`;

export const NewCardContent = styled(CustomCardContent)`
	padding: 15px !important;
`;

const CustomFlex = styled(Flex)`
	margin-right: ${props => (props.activeMarginRight ? '10' : '0')}px;
	width: ${props => (props.fullWidth ? '100%' : null)};
`;

interface ISearchandFilter {
	datalist: any[];
	anchorEl: null | HTMLElement;
	handleclick(event: React.MouseEvent<HTMLElement>): void;
	handleclose(): void;
	labelName: string;
	handleClickSelected(selected: any): void;
	onSearchChange(): void;
}

function _SearchandFilter(props: ISearchandFilter) {

	const { datalist, onSearchChange, handleClickSelected, labelName, anchorEl, handleclose, handleclick } = props;
	return (
		<Card>
			<NewCardContent>
				<CustomFlexRow>
					<FlexOne>
						<SearchListDoctor
							id="search_doctor"
							needIcon={true}
							icon={"search"}
							onSearchChange={onSearchChange}
							isForMobileLayout={false}
						/>
					</FlexOne>
					<FlexOne>
						<FlexRow>
							<CustomFlex
								activeMarginRight
							>
								<ImageLogo
									height={25}
									width={25}
									src={SortIcon}
								/>
							</CustomFlex>

							<CustomFlex
								fullWidth
							>
								<FilterListDoctor
									datalist={datalist}
									anchorEl={anchorEl}
									handleclose={handleclose}
									handleclick={handleclick}
									labelName={labelName}
									handleClickSelected={handleClickSelected}
									{...props}
								/>
							</CustomFlex>
						</FlexRow>
					</FlexOne>
				</CustomFlexRow>
			</NewCardContent>
		</Card>
	)
}

export const SearchandFilter = memo(_SearchandFilter);