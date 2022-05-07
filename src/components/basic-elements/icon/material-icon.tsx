import { memo } from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';

export const CustomIcon = styled(MaterialIcon)`
    color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	padding: ${(props) => props.padding};
	width: ${(props) => props.width}px;
`;

export interface IMaterialIconProps {
	icon: string;
	style?: any;
	id?: string;
	onClick?(): void;
	fsize?: number;
	color?: string;
	padding?: string;
	width?: number;
}


function _MaterialCustomIcon(props: IMaterialIconProps) {
	const { style = {}, id, icon, width, onClick, fsize, color, padding } = props;
	return (
		<CustomIcon
			icon={icon}
			fsize={fsize}
			color={color}
			padding={padding}
			width={width}
			id={id}
			onClick={onClick}
			style={style}
		/>
	);
}

export const MaterialCustomIcon = memo(_MaterialCustomIcon);
