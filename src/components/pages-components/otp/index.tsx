import { memo, Fragment } from 'react';
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
import { OTPCode } from './otp-code/otp-code';

function _OTPContent(props: any) {

	const {
		dataType,
		backStep,
		activeCountdown,
		onProcess,
		seconds,
		onContinue,
		onChangeCode,
		codeInputHandle,
		errorMessage,
	} = props;

	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									<OTPCode
										errorMessage={errorMessage}
										dataType={dataType}
										backStep={backStep}
										seconds={seconds}
										activeCountdown={activeCountdown}
										onProcess={onProcess}
										onContinue={onContinue}
										onChangeCode={onChangeCode}
										codeInputHandle={codeInputHandle}
									/>
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

export const OTPContent = memo(_OTPContent);

