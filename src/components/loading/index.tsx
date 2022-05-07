import { memo } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';

const Base = styled.div<any>`
    position: relative;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

const Element1 = styled(animated.div) <any>`
    opacity: 0.6;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: ${props => props.size / 2}px;
    background-color: ${props => props.color};
    content: ' ';
    display: block;
    transform: scale(0.1);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
`;
const Element2 = styled(Element1)`
    transform: scale(0.6);
    opacity: 0.3;
`;

function _Loading(props: { size?: number; color?: string }) {
	const { size = 24, color = '#fff' } = props;

	const elementStyle = useSpring<any>({
		loop: true,
		to: { x: 0 },
		from: { x: 1 },
		config: { ...config.wobbly, duration: 1000 },
		reset: true
	});

	return (
		<Base size={size}>
			<Element1
				style={{
					transform: elementStyle.x
						.to({
							range: [0, 0.25, 0.5, 0.75, 1],
							output: [0.1, 0.2, 0.6, 0.2, 0.1]
						})
						.to((x: number) => `scale(${x})`)
				}}
				size={size}
				color={color}
			/>
			<Element2
				style={{
					transform: elementStyle.x
						.to({
							range: [0, 0.25, 0.5, 0.75, 1],
							output: [1, 0.9, 0.6, 0.9, 1]
						})
						.to((x: number) => `scale(${x})`)
				}}
				size={size}
				color={color}
			/>
		</Base>
	);
}

export const Loading = memo(_Loading);
