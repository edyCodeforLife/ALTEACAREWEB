import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { FlexOneCustom } from '../../register/register';
import { Flex } from '../../../basic-elements/flex';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';
import { ContainerGrey } from '../update-profile/update-profile';
import { LabelText } from '../../create-consultation';
import { FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-start;
`;

const ContainerPassword = styled(FlexRowSpaceBetween)`
	padding: 10px 20px;
	box-sizing: border-box;
`;

export const ClickLabel = styled(LabelText)`
	cursor: pointer;
`;

function _Settings(props: any) {
	const {
		backStep,
		redirectChangePassword
	} = props;

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<HeaderDetailConsultation>
					<FlexOneCustom
						style={{ cursor: 'pointer' }}
						flex={"17% 0 0"}
						onClick={() => backStep('/profile')}
					>
						<Icon
							className="iconBackArrow"
							icon="arrow_back_ios"
							color="#2C528B"
						/>
					</FlexOneCustom>
					<FlexOneCustom flex={"65% 0 0"}>
						<HeaderText>
							Pengaturan
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<ContainerGrey>
						<LabelText
							color={"#2C528B"}
							fsize={14}
							fweight={600}
						>
							Ubah Kata Sandi
						</LabelText>
					</ContainerGrey>
					<ContainerPassword>
						<LabelText
							color={"#8F90A6"}
							fsize={14}
						>
							Kata Sandi
						</LabelText>
						<ClickLabel
							onClick={() => { redirectChangePassword("step1") }}
							color={"#61C7B5"}
							fsize={14}
							fweight={600}
						>
							Ubah
						</ClickLabel>
					</ContainerPassword>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const Settings = memo(_Settings);