import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../basic-elements/mobile-container';
import { FlexOneCustom } from '../../register/register';
import { CustomizedAccordions } from '../../../accordion/index';
import { map } from 'lodash';
import { FlexCenter } from '../../../basic-elements/flex';
import CustomScroll from 'react-custom-scroll';
import { HeaderDetailConsultation, FlexRowCenterDetail, HeaderText } from '../../detail-consultation/tab-detail-consultation/index';

const ContainerInside = styled(FlexCenter)`
	margin-top: 60px;
	height: calc(100vh - 180px);
	box-sizing: border-box;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

function _FAQ(props: any) {
	const {
		faqlist,
		backStep,
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
							FAQ
						</HeaderText>
					</FlexOneCustom>
				</HeaderDetailConsultation>
				<ContainerInside>
					<CustomScroll flex="1" heightRelativeToParent={'100%'}>
						{map(faqlist, (item, idx) => (
							<CustomizedAccordions
								key={idx}
								idx={idx}
								title={item?.question}
								description={item?.answer}
							/>
						))}
					</CustomScroll>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const FAQ = memo(_FAQ);