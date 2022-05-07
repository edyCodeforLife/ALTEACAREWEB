import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomFlexRowCenter } from '../index';
import { LoadingCallMA } from './loading-MA';
import { LoadingCallSpecialist } from './loading-specialist';

function _LoadingCall(props: any) {
	const [play, setPlay] = useState(true);
	const { method, appointmentDescription } = props;
	useEffect(() => {
		return () => {
			setPlay(false)
		}
	}, [])

	return (

		<CustomFlexRowCenter>
			<audio
				src={"../../../../assets/sound/alteaRBT.mp3"}
				autoPlay={play}
				loop
			/>
			{method === 'CALL_MA' ? (
				<LoadingCallMA />
			) : (
				<LoadingCallSpecialist
					appointmentDescription={appointmentDescription}
				/>
			)}
		</CustomFlexRowCenter>

	);
}

export const LoadingCall = memo(_LoadingCall);