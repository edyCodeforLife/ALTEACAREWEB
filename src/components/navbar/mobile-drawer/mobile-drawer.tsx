
import { map } from 'lodash';
import styled from 'styled-components';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Fragment, memo } from 'react';
import { FlexRow } from '../../basic-elements/flex';
import { Icon } from '../mobile-navbar';

export interface ISwipeDrawerProps {
	toggleDrawer(open: boolean): any;
	openDrawer: boolean;
	history: any
}

const CustomList = styled(List)`
	padding-top: 0px;
	padding-bottom: ${(props) => props.value === "Download Apps" ? 80 : 0}px;
`;

const ContainerDrawer = styled.div`
	width: 250px;
`;

const CustomContainerFlexRow = styled(FlexRow)`
	justify-content: space-between;
`;

const CustomListItem = styled(ListItem)`
	display: block;
`;

const CustomListItemText = styled(ListItemText)`
	text-align: ${(props) => props.textAlign};
	color: #2C528B;
	.MuiTypography-displayBlock {
		font-weight: ${(props) => props.fWeight}
	}
`;


function _SwipeDrawerMaterial(props: ISwipeDrawerProps) {

	const { toggleDrawer, openDrawer } = props;
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const text = ["Masuk", "Daftar", "Dokter Spesialis", "Rumah Sakit", "Covid-19", "Download Apps", "FAQ", "Syarat dan Ketentuan", "Kontak"];

	const switchRoute = (route) => {
		switch (route) {
			case "Masuk":
				return props.history.push("/login");
			case "Daftar":
				return props.history.push("/register");
			default:
				return props.history.push("/login");
		}
	}

	const list = () => (
		<ContainerDrawer

			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			{map(text, (item: string, idx: number) => (
				<Fragment>
					<CustomList value={item} key={idx} >
						<CustomListItem button>
							<CustomContainerFlexRow>
								<CustomListItemText
									onClick={() => {
										if (item === "Masuk" || item === "Daftar")
											switchRoute(item);
									}}
									fWeight={item === "Masuk" ||
										item === "Daftar" ||
										item === "Download Apps" ?
										600 :
										'light'
									}
									textAlign={"left"}
								>
									{item}
								</CustomListItemText>
								{(item === "Masuk" ||
									item === "Daftar") && (
										<CustomListItemText fWeight={600} textAlign={"right"}>
											<Icon fSize={20} icon={"arrow_forward_ios"} />
										</CustomListItemText>
									)
								}
							</CustomContainerFlexRow>
						</CustomListItem>
					</CustomList>
					<Divider />
				</Fragment>
			))}
		</ContainerDrawer>
	);

	return (
		<SwipeableDrawer
			anchor="left"
			open={openDrawer}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
		>
			{list()}
		</SwipeableDrawer>
	)
}

export const SwipeDrawerMaterial = memo(_SwipeDrawerMaterial);