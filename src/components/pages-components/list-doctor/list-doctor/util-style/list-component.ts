import styled from 'styled-components';
import { ContainerGrid } from '../../../../material-grid/index';
import {
	Card,
} from '@material-ui/core';

export const ContainerListDoctor = styled.div`
	padding: ${props => props.isForMobileLayout ? '70px 20px 0px 20px' : '10px 0px'};
	width: 100%;
	height: auto;
	box-sizing: border-box;
`;

export const CustomContainerGrid = styled(ContainerGrid)`
	align-items: center;
`;

export const CustomCard = styled(Card)`
	margin: 10px 0px;
`;

export const LabelExperience = styled.div`
	background: #D6EDF6;
	border-radius: 30px;
	padding: 8px 15px;
	color: #2C528B;
	font-size: ${props => props.isForMobileLayout ? '10px' : '14px'};
`;

export const ContainerImage = styled.div`
	margin-left: ${props => props.isForMobileLayout ? '0px' : '20px'};
	margin-right: 10px;
`;

export const ContainerBtn = styled.div`
	margin: 8px;
`;

export const TextLabel = styled.div`
	font-style: normal;
	margin: ${(props) => props.marginPrimary ? '8px 0px' : '0px'};
	font-weight: ${(props) => props.bold ? 'bold' : '400'};
	font-size: ${(props) => props.primary ? 20 : props.secondary ? 18 : props.third ? 16 : 12}px;
	color: ${(props) => props.colorPrimary ? '#6B7588' : '#2C528B'};
	white-space: ${(props) => props.breakSpace ? 'pre-line' : 'none'};
	word-break: ${(props) => props.wbreak};
`;

export const BtnChooseSchedule = styled.button`
	background: #61C7B5;
	border-radius: 8px;
	padding: ${props => props.isForMobileLayout ? '10px 20px' : '10px 25px'};
	color: #fff;
	font-style: normal;
	font-weight: normal;
	font-size: ${props => props.isForMobileLayout ? '14px' : '20px'};
	border: none;
	cursor: pointer;
`;