import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


export const TimerContainer = styled.div`
	text-align: center;
	color: "#fff";
`;

function _Timer(props: any) {
	const [second, setSecond] = useState(0);
	const { endTime, setLastTime } = props;

	useEffect(() => {
		let tempSeconds = 0
		const interval = setInterval(() => {
			tempSeconds += 1
			setSecond(tempSeconds)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (endTime) {
			setLastTime(converter(second));
		}
	}, [endTime])

	const pad = (num) => {
		return ("0" + num).slice(-2);
	}

	const converter = (secs) => {
		let minutes = Math.floor(secs / 60);
		secs = secs % 60;
		let hours = Math.floor(minutes / 60)
		minutes = minutes % 60;
		return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
	}

	return (
		<TimerContainer>
			{converter(second)}
		</TimerContainer>
	)
}

export const Timer = memo(_Timer);
