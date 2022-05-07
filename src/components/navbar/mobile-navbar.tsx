import { memo, useState } from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon'
import { ImageLogo, InsideContainer } from './navbar';
import { FlexOne, FlexRow } from '../basic-elements/flex/index';
import LogoAltea from '../../assets/image/alteacare_logo.svg';
import { SwipeDrawerMaterial } from './mobile-drawer/mobile-drawer';

const CustomNavbarContainer = styled(InsideContainer)`
	min-height: 80px !important;
	padding: 7px;
`;

export const Icon = styled(MaterialIcon)`
	font-size: ${(props) => props.fSize}px;
`;

const LeftFlexOne = styled(FlexOne)`
	text-align: left !important;
	flex: 0.35 !important;
`;

function _MobileNavBar(props: React.HTMLProps<HTMLDivElement> | any) {
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

	const toggleDrawer = (isOpen: boolean) => (
		event: KeyboardEvent | MouseEvent,
	) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as KeyboardEvent).key === 'Tab' ||
				(event as KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setOpenDrawer(isOpen);
	};


	return (
		<CustomNavbarContainer>
			<InsideContainer>
				<FlexRow>
					<LeftFlexOne onClick={toggleDrawer(true)}>
						<Icon fSize={30} icon="menu" />
					</LeftFlexOne>
					<LeftFlexOne>
						<ImageLogo src={LogoAltea} height={50} width={120} />
					</LeftFlexOne>
				</FlexRow>
				<SwipeDrawerMaterial
					openDrawer={openDrawer}
					toggleDrawer={toggleDrawer}
					{...props}
				/>
			</InsideContainer>
		</CustomNavbarContainer>
	)
}

export const MobileNavBar = memo(_MobileNavBar);