import { memo, Fragment } from 'react';
import {
	InsideContainer,
	CustomFlex,
	ContentContainer,
	Icon
}
	from '../../basic-elements/mobile-container/index';
import { Footer } from '../../footer/footer';
import { CustomConLogin } from '../register/register';
import { isMobile } from '../../../data/global/function';
import { HomeCardStyle, ContainerCardContent } from '../my-consultation/index';
import { HorizontalStepper } from '../../stepper/horizontal-stepper/index';
import { ContainerContent, CustomFlexRowCenter, HeaderConsultation, } from '../create-consultation/index';
import { FlexOneCustom, ContainerHeaderText } from '../register/register';
import { PaymentInsideData } from './content/payment-content';

function _PaymentContent(props: any) {

	const {
		activeStep,
		listStep,
		appointmentDescription,
		backStep,
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
										<HeaderConsultation>
											<FlexOneCustom
												style={{ cursor: 'pointer' }}
												flex={"15% 0 0"}
												onClick={backStep}
											>
												<Icon
													className="iconBackArrow"
													icon="arrow_back_ios"
													color="#2C528B"
												/>
											</FlexOneCustom>

											<FlexOneCustom flex={"65% 0 0"}>
												<ContainerHeaderText>
													Pembayaran
												</ContainerHeaderText>
											</FlexOneCustom>
										</HeaderConsultation>
									</CustomFlexRowCenter>
									<ContainerContent mheight={`calc(100vh - 140px)`}>
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
											isPaymentPage
										/>

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

export const PaymentContent = memo(_PaymentContent);

