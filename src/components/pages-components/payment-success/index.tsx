import { memo, Fragment } from 'react';
import styled from 'styled-components';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';
import { CustomConLogin } from '../register/register';
import { isMobile } from '../../../data/global/function';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { HorizontalStepper } from '../../stepper/horizontal-stepper/index';
import { CustomFlexRowCenter } from '../create-consultation/index';
import { ContainerHeaderText } from '../register/register';
import { FlexRowCenter } from '../../basic-elements/flex/index';
import { HeaderPaymentMethod } from '../payment-method/payment-method';
import { PaymentInsideData } from '../payment/content/payment-content';

export const ContainerPaymentContent = styled.div`
	width: auto;
	height: calc(100vh - 120px);
	padding-top: 50px;
	box-sizing: border-box;
	text-align: left;
	position: relative;
	@media (max-width: 768px) {
		height: ${(props) => props.mheight};
	};

`;

function _PaymentSuccessContent(props: any) {

	const {
		activeStep,
		listStep,
		appointmentDescription,
		redirectTo,
		redirectToPaymentMethod
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
													Pembayaran
												</ContainerHeaderText>
											</FlexRowCenter>
										</HeaderPaymentMethod>
									</CustomFlexRowCenter>
									<ContainerPaymentContent mheight={`calc(100vh - 140px)`}>
										<HorizontalStepper
											activestepcolor={"#2C528B"}
											completestepcolor={"#3E8CB9"}
											background={"#D6EDF6"}
											listStep={listStep}
											activeStep={activeStep}
											width={isMobile() ? "200vw" : "680px"}
											right={"310px"}
										/>

										<PaymentInsideData
											appointmentDescription={appointmentDescription}
											redirectToPaymentMethod={redirectToPaymentMethod}
											redirectTo={redirectTo}
										/>

									</ContainerPaymentContent>
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

export const PaymentSuccessContent = memo(_PaymentSuccessContent);

