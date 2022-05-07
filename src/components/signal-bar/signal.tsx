import { memo } from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	display: inline-block;
	box-sizing: border-box;
`;

const FirstBar = styled.div`
	display: inline-block;
	border-radius: 12px;
	height: 20%;
	width: 14%;
    margin-left: 1%;
    min-height: 20%;
	background-color: ${(props => props.signal >= 10 ? "#16a085" : props.signal >= 7 && props.signal < 10 ? "#f1c40f" : props.signal >= 1 && props.signal < 7 ? "#e74c3c" : "transparent")};
    border:${(props) => props.signal >= 10 ? "thin solid #12816b" : props.signal >= 7 && props.signal < 10 ? "thin solid #d0a90c" : props.signal >= 1 && props.signal < 7 ? "thin solid #a82315" : "thin solid #f3f3f3"};
`;

const SecondBar = styled.div`
	display: inline-block;
	height: 40%;
	border-radius: 12px;
	width: 14%;
    margin-left: 1%;
    min-height: 20%;
	background-color: ${(props => props.signal >= 10 ? "#16a085" : props.signal >= 7 && props.signal < 10 ? "#f1c40f" : props.signal >= 3 && props.signal < 7 ? "#e74c3c" : "transparent")};
    border:${(props) => props.signal >= 10 ? "thin solid #12816b" : props.signal >= 7 && props.signal < 10 ? "thin solid #d0a90c" : props.signal >= 3 && props.signal < 7 ? "thin solid #a82315" : "thin solid #f3f3f3"};
`;

const ThirdBar = styled.div`
	display: inline-block;
	height: 60%;
	border-radius: 12px;
	width: 14%;
    margin-left: 1%;
    min-height: 20%;
	background-color: ${(props => props.signal >= 10 ? "#16a085" : props.signal >= 7 && props.signal < 10 ? "#f1c40f" : "transparent")};
    border:${(props) => props.signal >= 10 ? "thin solid #12816b" : props.signal >= 7 && props.signal < 10 ? "thin solid #d0a90c" : "thin solid #f3f3f3"};
`;

const FourthBar = styled.div`
	display: inline-block;
	height: 80%;
	border-radius: 12px;
	width: 14%;
    margin-left: 1%;
    min-height: 20%;
	background-color: ${(props => props.signal >= 10 ? "#16a085" : "transparent")};
    border:${(props) => props.signal >= 10 ? "thin solid #12816b" : "thin solid #f3f3f3"};
`;

const FifthBar = styled.div`
	display: inline-block;
	height: 99%;
	border-radius: 12px;
	width: 14%;
    margin-left: 1%;
    min-height: 20%;
	background-color: ${(props) => props.signal >= 20 ? "#16a085" : "transparent"};
    border: ${(props) => props.signal >= 20 ? "thin solid #12816b" : "thin solid #f3f3f3"};
`;

type ISignalBarProps = {
	signal: any;
	height: number;
	width: number;
};

function _SignalBar({ signal, height, width }: ISignalBarProps) {
	return (
		<BarContainer height={height} width={width}>
			<FirstBar signal={signal} />
			<SecondBar signal={signal} />
			<ThirdBar signal={signal} />
			<FourthBar signal={signal} />
			<FifthBar />
		</BarContainer>
	);
}

export const SignalBar = memo(_SignalBar);
