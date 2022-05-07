import { memo } from 'react';
import styled from 'styled-components';
import { MenuListItem } from '../../../../basic-elements/menu-list/list-menu';
import MaterialIcon from '@material/react-material-icon';
import { FlexOne, FlexRow } from '../../../../basic-elements/flex';

const ContainerFilter = styled.div`
	background: #FFFFFF;
	padding: 0px 5px;
	border: 1px solid #8F90A6;
	box-sizing: border-box;
	border-radius: 5px;
`;

const TextLabel = styled.div`
	font-size: 14px;
	color: #3A3A3C;
`;

const CustomFlexRow = styled(FlexRow)`
	width: 100%;
`;

export const CustomFlexOne = styled(FlexOne)`
	text-align: ${props => props.textAlign};
`;

interface IFilterListDoctor {
	datalist: any[];
	anchorEl: null | HTMLElement;
	handleclick(event: React.MouseEvent<HTMLElement>): void;
	handleclose(): void;
	labelName: string;
	handleClickSelected(selected: any): void;
}

function _FilterListDoctor(props: IFilterListDoctor) {
	const { datalist, labelName, handleClickSelected, anchorEl, handleclose, handleclick } = props;
	return (
		<ContainerFilter>
			<MenuListItem
				datalist={datalist}
				anchorEl={anchorEl}
				handleclose={handleclose}
				handleclick={handleclick}
				handleClickSelected={handleClickSelected}
				fieldName={"label"}
				minWidthListItem={360}
				{...props}
			>
				<CustomFlexRow>
					<CustomFlexOne textAlign={'left'}>
						<TextLabel>{labelName}</TextLabel>
					</CustomFlexOne>

					<CustomFlexOne textAlign={'right'}>
						<MaterialIcon icon={'keyboard_arrow_down'} />
					</CustomFlexOne>
				</CustomFlexRow>
			</MenuListItem>
		</ContainerFilter>
	);
}

export const FilterListDoctor = memo(_FilterListDoctor);
