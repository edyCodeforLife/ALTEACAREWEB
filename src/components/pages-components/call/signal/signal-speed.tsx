import { useEffect, useState } from 'react';
import NetworkSpeed from 'network-speed';

const TwilioSignal = () => {

	const [counted, setCounted] = useState(0);
	const [hasResponse, setHasResponse] = useState(false);
	const [speedInet, setSpeed] = useState<any>({});

	const testNetworkSpeed = new NetworkSpeed();

	var speed;
	const getNetworkDownloadSpeed = async () => {
		speed = null;
		const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
		const fileSizeInBytes = 500000;

		setHasResponse(false);

		speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
		if (speed) setHasResponse(true);
		setSpeed(speed)
	}

	useEffect(() => {
		if (!hasResponse && counted >= 5) {
			setHasResponse(false);
			setSpeed(0)
		}
	}, [counted])

	useEffect(() => {
		const interval = setInterval(() => {
			setCounted((number) => number === 5 ? 0 : number + 1)
			getNetworkDownloadSpeed();
		}, 3000);

		return () => {
			setCounted(0)
			clearInterval(interval)
		}
	}, []);
	return speedInet;
};

export default TwilioSignal;