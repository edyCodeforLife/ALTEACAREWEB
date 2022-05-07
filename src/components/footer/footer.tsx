import { memo } from 'react';
import styled from 'styled-components';
import { isMobile } from '../../data/global/function';

export const FooterContainer = styled.div`
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    text-align: center !important;
    font-size: 14px !important;
	width: 100vw;
	height: 20px;
	display: flex;
	flex-shrink: 0;
	position: relative;
	z-index: 10;
	bottom: 0;
	top: 100%;
	transform: translateY(-100%);
	background: ${(props) => isMobile() ? 'transparent' : '#2C528B'};
	  	@media (max-width: 768px) {
    		flex-direction: column;
			position: fixed;
			bottom: 0;
  	};
`;

export const FooterInsideContainer = styled.div`
	box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-left: 6px;
    padding-right: 6px;
    max-width: 1140px;
`;

export const MainContentFooterContainer = styled.div`
    margin-left: -6px;
    margin-right: -6px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: normal;
`;

export const InsideMainContentContainer = styled.div`
	box-sizing: border-box;
    min-height: 1px;
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    overflow: hidden;
    flex: 0 0 100%;
    max-width: 100%;
    margin-left: 0%;
    right: auto;
    left: auto;
	vertical-align: middle;
`

export const TextLabel = styled.div`
	font-size: 12px;
	color: ${(props) => isMobile() ? '#2C528B' : '#fff'};
`;

function _Footer(props: React.HTMLProps<HTMLDivElement>) {
	const { style = {} } = props;
	const year = (new Date()).getFullYear();
	return (
		<FooterContainer>
			<FooterInsideContainer>
				<MainContentFooterContainer>
					<InsideMainContentContainer>
						<TextLabel>{`©${year} Alteacare All Rights Reserved`}</TextLabel>
					</InsideMainContentContainer>
				</MainContentFooterContainer>
			</FooterInsideContainer>
		</FooterContainer>
	);
}

export const Footer = memo(_Footer);
