import { SmallBoxContainer } from '../../../basic-elements/box-card/small-box';
import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { ImageLogo } from '../../../navbar/navbar';
import { CustomSkeleton } from '../../../basic-elements/skeleton/skeleton';

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: ${(props) => props.isForMobileLayout ? '20' : '50'}px;
	min-width: ${(props) => props.isForMobileLayout ? '20' : '50'}px;
	height: ${(props) => props.isForMobileLayout ? '80' : '150'}px;
	padding: ${(props) => props.isForMobileLayout ? '4' : '0'}px;
	width: ${(props) => props.isForMobileLayout ? 'auto' : null};
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 20px;
		min-width: 20px;
		height: 80px;
		width: auto;
		padding: 4px;
	}
`;

const TextSpecialist = styled.div`
	font-weight: 550;
	font-size: ${(props) => props.isForMobileLayout ? '9' : '14'}px;
	line-height: 17px;
	color: #3E8CB9;
	text-align: center;
	margin-top: 10px;
	white-space: pre-line;
	@media (max-width: 768px) {
		font-size: 9px;
	}
`;

const ContainerBox = styled.div`
	padding: ${(props) => props.isForMobileLayout ? props.mobileconPadding : '0px 5px'};
	margin: ${(props) => props.isForMobileLayout ? props.mobileconMargin : '0px 3px'};
	min-width: ${(props) => props.containerminwidth};
	min-height: ${(props) => props.containerminheight};
	height:  ${(props) => props.containerheight};
	width:  ${(props) => props.containerwidth};
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding:  ${(props) => props.mobileconPadding};
		margin: ${(props) => props.mobileconMargin};
	}
`;

export interface IBoxSpecialist {
	id: string;
	iconHeight: number;
	iconWidth: number;
	iconSrc?: string;
	specialistName?: string;
	onRedirect(name: string): void;
	loading: boolean;
	specialization_id: string;
	isForMobileLayout: boolean;
	activeHover: boolean;
	mobileconPadding: any;
	mobileconMargin?: any;
	containerminwidth?: any;
	containerminheight?: any;
	containerheight?: any;
	containerwidth?: any;
}

function _BoxSpecialist(props: IBoxSpecialist) {
	const {
		id,
		iconHeight,
		isForMobileLayout,
		onRedirect,
		iconWidth,
		iconSrc,
		loading,
		specialistName,
		specialization_id,
		activeHover,
		mobileconPadding,
		mobileconMargin,
		containerminwidth,
		containerminheight,
		containerheight,
		containerwidth
	} = props;

	return (
		<div>
			<ContainerBox
				containerminwidth={containerminwidth}
				containerminheight={containerminheight}
				containerheight={containerheight}
				containerwidth={containerwidth}
				isForMobileLayout={isForMobileLayout}
				mobileconPadding={mobileconPadding}
				mobileconMargin={mobileconMargin}
				id={id}
				onClick={() => onRedirect(specialization_id)}
			>
				<SmallBoxCustom isForMobileLayout={isForMobileLayout} activeHover={activeHover}>
					{loading ? (
						<CustomSkeleton
							animation="wave"
							variant="rect"
							mobileheight={50}
							height={80}
							mobilewidth={50}
							width={100}
							isForMobileLayout={isForMobileLayout}
						/>
					) : (
						<ImageLogo height={iconHeight} width={iconWidth} src={iconSrc} />
					)}


					{loading ? (
						<CustomSkeleton
							animation="wave"
							variant="text"
							mobileheight={20}
							height={20}
							mobilewidth={50}
							width={100}
							isForMobileLayout={isForMobileLayout}
						/>
					) : (
						<TextSpecialist isForMobileLayout={isForMobileLayout} >
							<span>{specialistName}</span>
						</TextSpecialist>
					)}


				</SmallBoxCustom>
			</ContainerBox>
		</div>
	)
}

export const BoxSpecialist = memo(_BoxSpecialist);

