import { memo } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../basic-elements/flex';
import { HOME_URL } from '../../data/global/variables';
import { IconHome, IconSpecialist, IconConsultation, IconAccount } from './icon/icon';

const ContainerBottomNavBar = styled(FlexRow)`
	position: absolute;
	bottom: 0;
	background: #fff;
	box-sizing: border-box;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 50px;
	width: 100%;
	left: 0;
	right: 0;
	z-index: 999;
	padding: 5px 10px;
	justify-content: space-around;
	align-items: center;
`;

const ContainerIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	cursor: pointer;
`;

function _BottomNavBar(props: any) {
	const { style = {} } = props;
	let currentHistory = props.history;
	let currentUrl = currentHistory.location.pathname;

	const onNavigate = (path: string) => {
		if (currentUrl !== path) {
			currentHistory.push(path);
		}
	}

	return (
		<ContainerBottomNavBar>
			<ContainerIcon onClick={() => onNavigate(HOME_URL)}>
				{IconHome(currentUrl)}
			</ContainerIcon>
			<ContainerIcon onClick={() => onNavigate("/specialist")}>
				{IconSpecialist(currentUrl)}
			</ContainerIcon>
			<ContainerIcon onClick={() => onNavigate("/my-consultation")}>
				{IconConsultation(currentUrl)}
			</ContainerIcon>
			<ContainerIcon onClick={() => onNavigate("/profile")}>
				{IconAccount(currentUrl)}
			</ContainerIcon>
		</ContainerBottomNavBar>
	);
}

export const BottomNavBar = memo(_BottomNavBar);
