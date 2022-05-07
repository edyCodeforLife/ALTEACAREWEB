
import { memo } from 'react';
import styled from 'styled-components';

import {
	Collapse,
	List,
	ListItem,
	ListItemText,
	Checkbox,
	ListItemSecondaryAction
} from '@material-ui/core';
import { map } from 'lodash';
import MaterialIcon from '@material/react-material-icon';
import Flex, { FlexOne, FlexRowCenter } from '../../../../basic-elements/flex';

const CustomListItem = styled(ListItem)`
	pointer-events: none;
`;

const CustomListItemText = styled(ListItemText)`
	color: #61C7B5;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
`;

const BreakListText = styled(ListItemText)`
	white-space: pre-line;
`;

const ButtonPrice = styled.button`
	background: #FFFFFF;
	border: 1px solid #3E8CB9;
	box-sizing: border-box;
	border-radius: 20px;
	outline: none;
	cursor: pointer;
	padding: 10px 15px;
	max-width: 200px;
	color: #3E8CB9;
	font-size: 14px;
`;

const ContainerButton = styled.div`
	margin: 5px 0px;
`

interface ICategoryProps {
	titleName: string;
	listData: any[];
	open: boolean;
	toggle?: any;
	checked?: number[]
	handleClickSideList(query: any): void;
	isCheckBoxUsed?: boolean;
	onShowModalCategory?(evt: any): void;
}

function _CategoryList(props: ICategoryProps) {
	const { titleName, onShowModalCategory, listData, open, toggle, checked, handleClickSideList, isCheckBoxUsed } = props;

	return (
		<List
			component="nav"
			disablePadding
			aria-labelledby="nested-list-subheader"
		>
			<ListItem disableGutters={true} button onClick={handleClickSideList} >
				<BreakListText>
					{titleName}
				</BreakListText>
				{open ? <MaterialIcon icon={"expand_less"} /> : <MaterialIcon icon={"expand_more"} />}
			</ListItem>

			<Collapse in={open} timeout="auto" unmountOnExit>
				{isCheckBoxUsed ? (
					<List component="div" disablePadding>
						{map(listData, (item, idx) => {
							const numberValue = idx + 1;
							const labelId = `checkbox-list-secondary-label-${numberValue}`;
							return (
								<CustomListItem key={labelId}>
									<BreakListText id={labelId} primary={`${item.name}`} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											onChange={toggle(numberValue)}
											checked={checked.indexOf(numberValue) !== -1}
											inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemSecondaryAction>
								</CustomListItem>
							);
						})}
						<ListItem onClick={(evt) => { onShowModalCategory(evt) }}>
							<CustomListItemText>
								Lihat Semua
							</CustomListItemText>
						</ListItem>
					</List>
				) : (
					<Flex>
						{map(listData, (item, idx) => (
							<FlexOne key={idx}>
								<ContainerButton>
									<ButtonPrice>
										{item}
									</ButtonPrice>
								</ContainerButton>
							</FlexOne>
						))}
					</Flex>
				)
				}
			</Collapse>
		</List>
	)
}

export const CategoryList = memo(_CategoryList);

