import { memo, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import LogoAltea from '../../assets/image/alteacare_logo.svg';
import IconAccount from '../../assets/image/icons/icon_account.svg';
import { BasicBtn } from '../basic-elements/button/basic';
import { FlexOne, FlexRow } from '../basic-elements/flex';
import MaterialIcon from '@material/react-material-icon';
import { LeftGrid, RightGrid, ContainerGrid } from '../material-grid/index';
import { MenuListItem } from '../../components/basic-elements/menu-list/list-menu';
import { IDoctorSpecialist } from '../../data/services/alteaCMS/IAlteaCMS';

export const ContainerNavBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 80px;
	background: #FFFFFF;
	box-shadow: 0px 0px 4px rgba(44, 82, 139, 0.25);
	box-sizing: border-box;
	z-index: 5;
	padding: 5px 0px;
`;

export const ImageLogo = styled.img`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	max-width: ${(props) => props.mwidth}px;
	max-height: ${(props) => props.mheight}px;
	margin: ${(props) => props.margin ? '0px 5px' : null}
`;

export const InsideContainer = styled.div`
	box-sizing: border-box;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-left: 6px;
    padding-right: 6px;
    max-width: 1140px;
`;

export const TextLabel = styled.div`
	font-size: 18px;
	color: #6B7588;
	line-height: 19px;
	text-transform: none;
	font-family: 'Inter Regular', sans-serif;
	cursor: pointer;
`;

const CustomFlexBtn = styled(FlexOne)`
	flex: 0;
	margin-right: 5px;
	flex-wrap: nowrap;
`;

export const DownloadButton = styled(BasicBtn)`
	border: 1px solid #2C528B;
	box-sizing: border-box;
	border-radius: 8px;
	padding: 10px 20px;
	color: #2C528B;
	font-weight: 700;
`;

export const RegisterOrLoginBtn = styled(BasicBtn)`
	background: #61C7B5;
	border-radius: 8px;
	white-space:nowrap;
	box-sizing: border-box;
	padding: 8px 15px;
	color: #fff;
`;

const MaterialCustomIcon = styled(MaterialIcon)`
	color: #6B7588;
`;

export const SpesialistMenuContainer = styled(FlexRow)`
	cursor: pointer;
`;

export interface INavbar {
	dataSpecialist: IDoctorSpecialist[];
	handleRedirectSpecialist(id: any): void;
	history?: any;
}

function _NavBar(props: INavbar) {

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const { dataSpecialist, history, handleRedirectSpecialist } = props;

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<ContainerNavBar>
			<InsideContainer>
				<ContainerGrid container spacing={3}>
					<LeftGrid style={{ cursor: 'pointer' }} onClick={() => history.push("/landing")} item xs={3} sm={3} md={3}>
						<ImageLogo width={"200"} height={"70"} src={LogoAltea} />
					</LeftGrid>

					<LeftGrid item xs={2} sm={2} md={2}>
						<SpesialistMenuContainer>
							<MenuListItem
								isSubheader
								datalist={dataSpecialist}
								anchorEl={anchorEl}
								handleclose={handleClose}
								handleclick={handleClick}
								handleRedirectSpecialist={handleRedirectSpecialist}
								isSpecialist
								{...props}
							>
								<TextLabel>Dokter Spesialis</TextLabel>
								<MaterialCustomIcon icon={'keyboard_arrow_down'} />
							</MenuListItem>
						</SpesialistMenuContainer>
					</LeftGrid>

					<Grid item xs={2} sm={2} md={2}>
						<TextLabel>Rumah Sakit</TextLabel>
					</Grid>

					<LeftGrid item xs={1} sm={1} md={1}>
						<TextLabel>COVID-19</TextLabel>
					</LeftGrid>

					<RightGrid item xs={2} sm={2} md={2}>
						<DownloadButton>Download App</DownloadButton>
					</RightGrid>

					<RightGrid onClick={() => history.push("/login")} item xs={2} sm={2} md={2}>
						<RegisterOrLoginBtn>
							<FlexRow>
								<CustomFlexBtn>
									<ImageLogo width={"20"} height={"20"} src={IconAccount} /> {" "}
								</CustomFlexBtn>

								<FlexOne>
									<div>Login & Register</div>
								</FlexOne>

								<FlexOne>
									<MaterialIcon icon={'keyboard_arrow_down'} />
								</FlexOne>
							</FlexRow>
						</RegisterOrLoginBtn>
					</RightGrid>

				</ContainerGrid>
			</InsideContainer>
		</ContainerNavBar>
	)
}

export const NavBar = memo(_NavBar);