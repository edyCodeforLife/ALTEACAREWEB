import styled from 'styled-components';
import { isMobile } from '../../../data/global/function';
import MaterialIcon from '@material/react-material-icon';
import Card from '@material-ui/core/Card';
import { FlexRowCenter } from '../../basic-elements/flex/index';

export const ContainerLogin = styled.div`
	box-sizing: border-box;
	position: relative;
	margin-left: auto;
	margin-right: auto;
		@media (max-width: 768px) {
			padding-left: 6px;
			padding-right: 6px;
			max-width: 960px;
		}
`;

export const Icon = styled(MaterialIcon)`
  outline: none;
  user-select: none;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fsize}px;
`;

export const InsideContainer = styled.div`
	// -webkit-box-pack: center !important;
    // -ms-flex-pack: center !important;
    // -webkit-box-direction: normal !important;
    // -webkit-box-orient: vertical !important;
    padding-top: 12px !important;
    min-height: 100vh !important;
    // display: -webkit-box !important;
    // display: -moz-box !important;
    // display: -ms-flexbox !important;
    // display: -webkit-flex !important;
    // display: flex !important;
    // -webkit-flex-direction: column !important;
    // -ms-flex-direction: column !important;
    // flex-direction: column !important;
    // -webkit-justify-content: center !important;
    // justify-content: center !important;
    -moz-box-sizing: border-box !important;
    box-sizing: border-box !important;
    padding-bottom: 12px !important;
	&:before {
		content: "" !important;
		display: block !important;
		top: 0px !important;
		left: 0px !important;
		right: 0px !important;
		bottom: 0px !important;
		position: fixed !important;
  }
  	@media (max-width: 768px) {
		padding-top: 0px !important;
		padding-bottom: 0px !important;
	}
`;

export const CustomFlex = styled.div`
  	margin-left: -6px;
    margin-right: -6px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: normal;
`;

export const ContentContainer = styled.div`
  	box-sizing: border-box;
    min-height: 1px;
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    overflow: inherit;
    flex: 0 0 50%;
    max-width: 50%;
    margin-left: 25%;
    right: auto;
    left: auto;
	@media (max-width: 768px) {
		padding-left: 0px;
		padding-right: 0px;
		max-width: 100%;
		margin-left: 0px;
		flex: 0;
	}
`;

export const ContainerLogo = styled.div`
  	width: auto;
	height: auto;
	margin-top: ${(props) => isMobile() ? 0 : props.marginTop}px;
`;

export const CustomFlexRow = styled(FlexRowCenter)`
	position: relative;
`;

export const CustomCardStyle = styled(Card)`
  	background: linear-gradient(180deg, #FFFFFF 11.3%, #D6EDF6 98.21%);
	border-radius: 8px;
	max-width: 370px;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 12px;
	min-height: 75vh;
	overflow: hidden;
		@media (max-width: 768px) {
			width: 100vw;
			margin-top: 0px;
			margin-bottom: 0px;
			border-radius: 0px;
			min-height: 90vh;
			height: 100vh;
			max-width: 100vw;
		}
`;