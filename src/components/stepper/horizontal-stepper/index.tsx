import { memo } from 'react';
import styled from 'styled-components';
import { Stepper, Step, StepLabel } from '@material-ui/core/';
import { map } from 'lodash';

interface IHorizontalStepperProps {
	listStep: any[];
	activeStep: number;
	background: string;
	activestepcolor: any;
	completestepcolor: any;
	width: any;
	right?: any;
}

const CustomStepper = styled(Stepper)`
	&.MuiStepper-horizontal {
		background: ${(props) => props.background};
		white-space: nowrap;
		position: relative;
		width: ${(props) => props.width};
		right: ${(props) => props.right};
	}
	&.MuiStepper-root {
		padding: 5px 0px !important;
	}
	.MuiStepLabel-label.MuiStepLabel-active {
		color: ${(props) => props.activestepcolor};
	}
	.MuiStepLabel-label.MuiStepLabel-completed {
		color: ${(props) => props.completestepcolor};
	}
	.MuiStepIcon-root.MuiStepIcon-completed {
		color: ${(props) => props.completestepcolor};
	}
`;

function _HorizontalStepper(props: IHorizontalStepperProps) {
	const { listStep, activeStep, background, activestepcolor, completestepcolor, width, right } = props;

	return (
		<CustomStepper
			activestepcolor={activestepcolor}
			completestepcolor={completestepcolor}
			background={background}
			activeStep={activeStep}
			width={width}
			right={right}
		>
			{map(listStep, (label, index) => {
				return (
					<Step key={index}>
						<StepLabel>{label}</StepLabel>
					</Step>
				);
			})}
		</CustomStepper>
	);
}

export const HorizontalStepper = memo(_HorizontalStepper);