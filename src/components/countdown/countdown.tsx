import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

const padTime = time => {
	return String(time).length === 1 ? `0${time}` : `${time}`;
};

const simpleSeconds = time => {
	return String(time).length === 1 ? `${time}` : '0';
}

const format = time => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const dataMinutes = `${minutes < 10 ? '0' + minutes : minutes}`
	return `${dataMinutes}:${padTime(seconds)}`;
};

const ContainerCountdown = styled.div`
	padding: 10px;
	text-align: ${props => props.talign};
	color: ${props => props.color};
`;

interface ICountdownProps {
	seconds: number;
	talign: string;
	color?: string;
	isSimple?: boolean
}

function _CountDown(props: ICountdownProps) {
	const { seconds, talign, color, isSimple } = props;
	const [counter, setCounter] = useState(seconds);

	const startCounter = () => {
		return setInterval(() => {
			setCounter(c => c - 1);
		}, 1000);
	}

	useEffect(() => {
		let timer;

		if (counter > 0) {
			timer = startCounter();
		}

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [counter]);

	return (
		<ContainerCountdown talign={talign} color={color}>
			{isSimple ? (
				<div>{simpleSeconds(counter % 60)}</div>
			) : (
				counter === 0 ? "Time is Over" : <div>{format(counter)}</div>
			)}

		</ContainerCountdown>
	);
}

export const CountDown = memo(_CountDown);