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
import { ChangeEmail } from './change-email/change-email';
import { ChangePhone } from './change-phone/change-phone';

function _VerifyChangeDataContent(props: any) {

	const {
		dataType,
		backStep,
		data,
		errorMessage,
		onChange,
		handleKeyEnter,
		onVerifyPhone,
		isDisabled,
		onVerifyEmail,
	} = props;

	const switchRender = (type) => {
		switch (type) {
			case 'email':
				return (
					<ChangeEmail
						data={data}
						onVerifyEmail={onVerifyEmail}
						backStep={backStep}
						errorMessage={errorMessage}
						onChange={onChange}
						handleKeyEnter={handleKeyEnter}
						isDisabled={isDisabled}
						{...props}
					/>
				);
			case 'phone':
				return (
					<ChangePhone
						data={data}
						onVerifyPhone={onVerifyPhone}
						backStep={backStep}
						errorMessage={errorMessage}
						onChange={onChange}
						handleKeyEnter={handleKeyEnter}
						isDisabled={isDisabled}
						{...props}
					/>
				)
		}
	}



	return (
		<Fragment>
			<CustomConLogin>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<HomeCardStyle variant="outlined">
								<ContainerCardContent>
									{switchRender(dataType)}
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

export const VerifyChangeDataContent = memo(_VerifyChangeDataContent);

