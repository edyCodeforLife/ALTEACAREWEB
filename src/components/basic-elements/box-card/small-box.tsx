import { memo } from 'react';
import styled from 'styled-components';

export const SmallBoxContainer = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
		&:hover {
		border: ${(props) => props.activeHover ? '1px solid #3868B0' : 'none'};
	}
`;

export interface ISmallBoxProps extends React.HTMLProps<HTMLDivElement> { }

function _SmallBox(props: ISmallBoxProps) {
	const { style = {}, id } = props;

	return (
		<SmallBoxContainer>
			{props.children}
		</SmallBoxContainer>
	);
}

export const SmallBox = memo(_SmallBox);