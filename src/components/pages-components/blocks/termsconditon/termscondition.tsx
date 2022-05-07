import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { Flex } from '../../../basic-elements/flex/index';
import { FlexCenter } from '../../../basic-elements/flex';
import CustomScroll from 'react-custom-scroll';
import { FlexRowCenterDetail } from '../../detail-consultation/tab-detail-consultation/index';
import { ContainerBtn, BtnSubmit } from '../../login/login';

const ContainerInside = styled(FlexCenter)`
	position: relative;
	height: calc(100vh - 120px);
	box-sizing: border-box;
	@media (max-width: 768px) {
		height: calc(100vh - 10px);
	};
`;

const ContainerBtnCustom = styled(ContainerBtn)`
	padding: 0px 20px;
	box-sizing: border-box;
	position: absolute;
	bottom: 0;
`;

const ContainerTerms = styled(Flex)`
	padding: 5px 20px;
	text-align: left;
`;

function _TermsCondition(props: any) {
	const {
		termscondition,
		backStep,
	} = props;

	console.log(termscondition)

	return (
		<Fragment>
			<FlexRowCenterDetail>
				<ContainerInside>
					<CustomScroll flex="1" heightRelativeToParent={'100%'}>
						<ContainerTerms dangerouslySetInnerHTML={{ __html: termscondition?.[0]?.text }} />
					</CustomScroll>
					<ContainerBtnCustom>
						<BtnSubmit
							onClick={() => backStep('/profile')}
							minwidth={"100%"}
						>
							Ya, Mengerti
						</BtnSubmit>
					</ContainerBtnCustom>
				</ContainerInside>
			</FlexRowCenterDetail >
		</Fragment>
	);
}

export const TermsCondition = memo(_TermsCondition);