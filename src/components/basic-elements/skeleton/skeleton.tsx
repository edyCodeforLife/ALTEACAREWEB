import { memo } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from '../../../data/global/function';

export type animationType = false | "pulse" | "wave";
export type variantType = "circle" | "rect" | "text";

export interface ICustomSkeleton {
	animation?: animationType;
	variant: variantType;
	mobilewidth: number;
	width: number;
	mobileheight: number;
	height: number;
	isForMobileLayout?: boolean;
}

function _CustomSkeleton(props: ICustomSkeleton) {
	const { animation, variant, isForMobileLayout, mobilewidth, mobileheight, height, width } = props;
	return (
		<Skeleton
			animation={animation}
			variant={variant}
			width={isMobile() || isForMobileLayout ? mobilewidth : width}
			height={isMobile() || isForMobileLayout ? mobileheight : height}
		/>
	);
}

export const CustomSkeleton = memo(_CustomSkeleton);
