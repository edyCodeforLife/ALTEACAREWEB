import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { CountDown } from '../countdown/countdown';
import { ImageLogo } from '../navbar/navbar';
import CheckedSuccess from '../../assets/image/CheckSuccess.svg';
import { FlexRowCenter } from '../basic-elements/flex';
import { animated, useSpring } from 'react-spring';

const ContainerLastStep = styled.div`
	background: linear-gradient(180deg, #ffffff 1.3%, #d6edf6 99.21%);
	box-sizing;
	height: 100%;
	width: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const TextLabelSuccess = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	text-align: center;
	color: #05A660;
`;

const ContainerBacktoLogin = styled(FlexRowCenter)`
	margin-top: 20px;
`;


interface ISuccessPage {
	successText: string;
	path: string;
	nextPageText: string;
	history: any
}

function _SuccessPage(props: ISuccessPage) {
	const { successText, path, nextPageText, history } = props;

	useEffect(() => {
		setTimeout(() => {
			history.push(path);
		}, 6000);
	}, []);

	const styles = useSpring({
		loop: true,
		to: [
			{ opacity: 1, color: '#05A660' },
			{ opacity: 0, color: '#05A660' },
		],
		from: { opacity: 0, color: '#05A660' },
	});

	return (
		<ContainerLastStep>
			<ImageLogo
				height={120}
				width={120}
				src={CheckedSuccess}
			/>
			<TextLabelSuccess>
				Selamat, {successText} berhasil!
			</TextLabelSuccess>
			<ContainerBacktoLogin>
				<TextLabelSuccess>
					Kembali ke halaman {nextPageText} dalam
				</TextLabelSuccess>
				<animated.div style={styles}>
					<CountDown
						talign="center"
						seconds={5}
						isSimple
					/>
				</animated.div>
			</ContainerBacktoLogin>
		</ContainerLastStep>
	);
}

export const SuccessPage = memo(_SuccessPage);