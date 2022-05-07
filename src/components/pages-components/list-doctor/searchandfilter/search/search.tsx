import { memo } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import MaterialIcon from '@material/react-material-icon';

interface ISearch {
	needIcon: boolean;
	id: string;
	icon: string;
	style?: any
	onSearchChange(e: any): void;
	isForMobileLayout: boolean;
	width?: string;
}

export const CustomInputFieldContainer = styled.div`
	font-size: 16px;
	width: ${(props) => props.isForMobileLayout ? props.width : 'auto'};
	padding: 4px 12px;
	border-radius: 20px;
	box-shadow: 0px 0px 4px #D6EDF6;
    position: relative;
	line-height: 1.6;
	position: relative;
	border: 1px solid #EBEBF0;
	background: #F2F2F5;
	max-width: 300px;
	overflow: hidden;
`;

export const CustomInputField = styled.input`
	border-bottom: none;
	margin-left: 30px;
	width: ${(props) => props.isForMobileLayout ? props.width : '-webkit-fill-available'};
	border: none;
	outline: none;
	font-size: 16px;
	margin-top: 3px;
	background: #F2F2F5;
	color: #6B7588;
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
`;

export const MaterialIconContainer = styled(MaterialIcon)`
	position: absolute;
	top: 8px;
	color: #61C7B5;
`;

function _SearchListDoctor(props: ISearch) {
	const { style = {}, id, needIcon, icon, onSearchChange, isForMobileLayout, width } = props;
	return (
		<form noValidate autoComplete="off">
			<CustomInputFieldContainer
				width={width}
				isForMobileLayout={isForMobileLayout}
			>
				{needIcon ? (
					<MaterialIconContainer icon={icon} />
				) : null}
				<CustomInputField
					onChange={(e) => { onSearchChange(e) }}
					width={width}
					isForMobileLayout={isForMobileLayout}
					placeholder="Pencarian"
				/>
			</CustomInputFieldContainer>
		</form>
	);
}

export const SearchListDoctor = memo(_SearchListDoctor);
