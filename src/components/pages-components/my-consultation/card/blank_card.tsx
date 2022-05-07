import { SmallBoxContainer } from '../../../basic-elements/box-card/small-box';
import { memo } from 'react';
import styled from 'styled-components';
import { ImageLogo } from '../../../navbar/navbar';
import Flex, { FlexRow } from '../../../basic-elements/flex';
import SpecialistInactive from '../../../../assets/image/spesialis_inactive.png';

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	min-height: 100px;
	height: ${(props) => props.height}px;
	min-width: 10px;
	padding: 14px;
	width: auto;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 50px;
		min-width: 50px;
		padding: 14px 10px;
	}
`;

const ContainerBox = styled.div`
	padding: 0px;
	margin: 0px 3px;
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 320px) {
		margin: 0px 2px;
	}
`;

export const DateTimeLabel = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	color: #3868B0;
`;

export const FlexRowSpaceBetween = styled(FlexRow)`
	justify-content: space-between;
	width: 100%;
`;

const ContainerEmptyAppointment = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
`;

const ContainerTextEmpty = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	color: #C7C9D9;
	margin-top: 10px;
`;

function _BlankBox(props: any) {

	return (
		<ContainerBox>
			<SmallBoxCustom height={160}>
				<ContainerEmptyAppointment>
					<Flex>
						<ImageLogo
							src={SpecialistInactive}
							height={25}
							width={25}
						/>
					</Flex>

					<Flex>
						<ContainerTextEmpty>
							Tidak ada Jadwal Konsultasi
							</ContainerTextEmpty>
					</Flex>
				</ContainerEmptyAppointment>
			</SmallBoxCustom>
		</ContainerBox>
	)
}

export const BlankBox = memo(_BlankBox);

