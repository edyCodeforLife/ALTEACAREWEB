
import { memo } from 'react';
import styled from 'styled-components';
import { ImageLogo } from '../../../navbar/navbar';
import Flex, { FlexRow } from '../../../basic-elements/flex';
import { ContainerBox, SmallBoxCustom } from '../../home/appointment-carousel/appointment-box';
import { LabelText } from '../../create-consultation';


export interface IBoxAppointment {
	id: string;
	item: any;
	loading: boolean;
	isNormalBox: boolean;
	handleClickBox(code: string, provider: string): void;
}

const ContainerHeaderBox = styled(FlexRow)`
	border-bottom:  1px solid rgba(0,0,0, .08);
	padding-bottom: 10px;
`;

const CustomBox = styled(SmallBoxCustom)`
	min-height: 0px;
	height: auto;
		@media (max-width: 768px) {
		min-width: 50px;
		padding: 14px 10px;
	}
`;

function _BoxPaymentMethod(props: IBoxAppointment) {
	const {
		id,
		item,
		loading,
		isNormalBox,
		handleClickBox
	} = props;

	return (
		<div onClick={() => handleClickBox(item?.code, item?.provider)}>
			<ContainerBox normal={isNormalBox} id={id}>
				<CustomBox>
					<Flex>
						<ContainerHeaderBox>
							<ImageLogo
								src={item?.icon}
								width={'20%'}
								height={"10%"}
							/>

							<LabelText
								margin={"0px 8px"}
								color={"#3A3A3C"}
								fweight={500}
								fsize={14}
							>
								{item?.name}
							</LabelText>
						</ContainerHeaderBox>

						<LabelText
							margin={"8px 0px"}
							color={"#8F90A6"}
							fsize={14}
							lheight={1.4}
						>
							{item?.description}
						</LabelText>
					</Flex>
				</CustomBox>
			</ContainerBox>
		</div>
	)
}

export const BoxPaymentMethod = memo(_BoxPaymentMethod);

