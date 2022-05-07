import { memo } from 'react';
import styled from 'styled-components';
import { globalColorDefault } from '../../data/global/variables';

const ContainerSpinner = styled.div`
	display: ${(props) => props.display};
	margin: ${props => props.margin};
`;

const Bounce = styled.div`
	background: ${(props) => props.background};
	width: 12px;
	height: 12px;
`;

export interface ISpinner {
	style?: any;
	color?: string;
	small?: boolean;
}

function _Spinner(props: ISpinner) {
	const { style = {}, small } = props;
	if (small) {
		let color = props.color || '#fff';
		return (
			<ContainerSpinner className="spinner" display={"inline"} margin={"0 8px"}>
				<Bounce className="bounce1" background={color} />
				<Bounce className="bounce2" background={color} />
				<Bounce className="bounce3" background={color} />
			</ContainerSpinner>
		);
	}
	return (
		<ContainerSpinner className="spinner">
			<Bounce className="bounce1" background={globalColorDefault} />
			<Bounce className="bounce2" background={globalColorDefault} />
			<Bounce className="bounce3" background={globalColorDefault} />
		</ContainerSpinner>
	)

}

export const Spinner = memo(_Spinner);
