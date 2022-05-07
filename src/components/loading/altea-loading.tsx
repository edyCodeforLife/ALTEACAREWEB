
import { memo, useRef, useEffect, useState } from 'react';
import lottie from 'lottie-web';
import * as animationData from '../../assets/altea-loader/loading_lottie.json';

function _AlteaLoader(props: any) {
	const animationElement = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState(false)

	useEffect(() => {
		lottie.loadAnimation({
			container: animationElement.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData.default
		});

		let timeout = setTimeout(() => setShow(true), 200)
		return () => {
			clearTimeout(timeout)
		}
	}, []);
	return (
		show && (
			<div ref={animationElement} />
		)
	);
}

export const AlteaLoader = memo(_AlteaLoader);