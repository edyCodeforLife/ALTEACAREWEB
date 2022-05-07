import { memo, Fragment } from 'react';
import CustomScroll from 'react-custom-scroll';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';
import styled from 'styled-components';
import { CustomConLogin } from '../register/register';
import { isMobile } from '../../../data/global/function';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { ContainerContent, CustomFlexRowCenter, HeaderConsultation, } from '../create-consultation/index';
import { ContainerHeaderText } from '../register/register';
import { FlexRowCenter, Flex } from '../../basic-elements/flex';
import { map } from 'lodash';
import { LabelText } from '../create-consultation/index';
import { BoxPaymentMethod } from './box-payment-method/box-payment';

export const HeaderPaymentMethod = styled(HeaderConsultation)`
	justify-content: center;
	box-sizing: border-box;
	padding: 15px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
`;

const ContainerListPaymentMethod = styled(Flex)`
	box-sizing: border-box;
	justify-content: flex-start;
	padding: 10px;
;`

function _PaymentMethodContent(props: any) {

	const {
		paymentMethod,
		handleClickBox,
		loading
	} = props;

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<CustomFlexRowCenter>
										<HeaderPaymentMethod>
											<FlexRowCenter>
												<ContainerHeaderText>
													Metode Pembayaran
												</ContainerHeaderText>
											</FlexRowCenter>
										</HeaderPaymentMethod>
									</CustomFlexRowCenter>
									<ContainerContent mheight={`calc(100vh - 1px)`}>
										<CustomScroll flex="1" heightRelativeToParent={'calc(100% - 20px)'}>
											{map(paymentMethod, (item, idx) => (
												<ContainerListPaymentMethod key={idx}>
													<LabelText
														color={"#3A3A3C"}
														fsize={14}
														margin={"8px"}
													>
														{item?.type}
													</LabelText>
													{map(item?.payment_methods, (data, index) => (
														<BoxPaymentMethod
															key={index}
															id={`box_payment_${index}`}
															item={data}
															loading={loading}
															isNormalBox
															handleClickBox={handleClickBox}
														/>
													))}
												</ContainerListPaymentMethod>
											))}

										</CustomScroll>
									</ContainerContent>
								</ContainerCardContent>
							</HomeCardStyle>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
				{!isMobile() && <Footer />}
			</CustomConLogin>
		</Fragment>
	)
}

export const PaymentMethodContent = memo(_PaymentMethodContent);

