import { memo } from 'react';
import styled from 'styled-components';

const BaseComponent = styled.div`
	width: ${(props) => props['data-size']}px;
	height: ${(props) => props['data-size']}px;
	border-radius: ${(props) => props['data-size'] / 2}px;
	overflow: hidden;
	margin-right: 8px;
	background-color: ${(props) => props.bgcolor ? props.bgcolor : '#61C7B5'};
	border: 1px solid #ddd;
	position: relative;
	z-index:
`;

const Image = styled.img`
	width: ${(props) => props['data-size'] - 1}px;
	height: ${(props) => props['data-size'] - 1}px;
`;

const Letter = styled.div`
	position: absolute;
	top: 12px;
	bottom: 0;
	left: 9px;
	right: 0;
	color: #fff;
`;

type IAvatarProps = {
	image?: string;
	style?: any;
	size?: number;
	textData?: string
	bgcolor?: string;
	children?: any;
	onClick?(): void
};

function _Avatar({ onClick, style, image, size, textData, bgcolor, children }: IAvatarProps) {
	return (
		<BaseComponent onClick={onClick} bgcolor={bgcolor} data-size={size || 32} style={style}>
			{image ? (
				<Image
					data-size={size || 32}
					src={image}
				/>
			) : (
				<Letter>
					{textData}
				</Letter>
			)}
			{children}
		</BaseComponent>
	);
}

export const Avatar = memo(_Avatar);
