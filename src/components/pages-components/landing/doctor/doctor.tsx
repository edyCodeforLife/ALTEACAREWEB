import { memo } from 'react';
import styled from 'styled-components';
import Flex, { FlexRow } from '../../../basic-elements/flex/index';
import { ImageLogo } from '../../../navbar/navbar';
import { LabelExperience } from '../../list-doctor/list-doctor/util-style/list-component';
import EmptyDoctorImage from '../../../../assets/image/icons/empty_spesialis.svg';
import { IDoctor } from '../../../../data/services/alteaCMS/IAlteaCMS';

const ContainerInfo = styled(Flex)`
	margin-left: 10px;
	align-items: flex-start;
`;

const CustomLabelExp = styled(LabelExperience)`
	padding: 5px;
`;

export const LabelText = styled.div`
	color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	font-weight: ${(props) => props.fweight};
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.talign};
	line-height: ${(props) => props.lheight};
	white-space:${(props) => props.wspace};
	cursor: ${(props) => props.cursor};
`;

function _Doctor(props: { item: IDoctor }) {
	const { item } = props;
	return (
		<FlexRow>
			<ImageLogo
				src={item.photo ? item.photo?.url : EmptyDoctorImage}
				height={60}
				width={60}
			/>
			<ContainerInfo>
				<CustomLabelExp isForMobileLayout>
					{item?.experience}
				</CustomLabelExp>

				<LabelText
					talign={"left"}
					fsize={14}
					fweight={600}
					margin={"3px 0px"}
				>
					{item?.name}
				</LabelText>

				<LabelText
					talign={"left"}
					fsize={12}
				>
					{item?.specialization?.name}
				</LabelText>

			</ContainerInfo>
		</FlexRow>
	);
}

export const Doctor = memo(_Doctor);
