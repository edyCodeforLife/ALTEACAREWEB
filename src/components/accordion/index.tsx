import { memo, ChangeEvent, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const CustomAccordion = styled(MuiAccordion)`
	background-color: transparent;
	text-align: left;
	padding: 5px;
	box-shadow: none;
`;

const CustomAccordionSummary = styled(MuiAccordionSummary)`
   	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    margin-bottom: -1px;
	background-color: #fff;
	border: none;
    min-height: 56px
`;

const CustomAccordionDetail = styled(MuiAccordionDetails)`
	padding: 10px;
`;

export interface ICustomAccordion {
	idx: number;
	title: string;
	description: string
}

function _CustomizedAccordions(props: ICustomAccordion) {
	const { idx, title, description } = props;
	const [expanded, setExpanded] = useState<number | false>(-1);

	const handleChange = (panel: number) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
		event.preventDefault();
		setExpanded(expanded === panel ? -1 : panel);
	};

	return (
		<div>
			<CustomAccordion square expanded={expanded === idx} onChange={handleChange(idx)}>
				<CustomAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<Typography>{title}</Typography>
				</CustomAccordionSummary>
				<CustomAccordionDetail>
					<Typography dangerouslySetInnerHTML={{ __html: description }} />
				</CustomAccordionDetail>
			</CustomAccordion>
		</div>
	);
}

export const CustomizedAccordions = memo((_CustomizedAccordions))