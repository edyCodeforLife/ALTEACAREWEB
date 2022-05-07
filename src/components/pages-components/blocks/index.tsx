import { memo, Fragment } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../../basic-elements/flex/index';
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
import { FAQ } from './FAQ/index';
import { TermsCondition } from './termsconditon/termscondition';
import { ContactInside } from './contact/contact';


function _BlocksContent(props: any) {

	const {
		centralInformation,
		dataType,
		messageType,
		faqlist,
		backStep,
		termscondition,
		dataContact,
		errorMessage,
		onChange,
		handleKeyEnter,
		datalist,
		anchorEl,
		handleclose,
		handleclick,
		handleClickSelected,
		labelName,
		isDisabled,
		onSendMessage
	} = props;

	const switchRender = (type) => {
		switch (type) {
			case 'FAQ':
				return (
					<FAQ
						faqlist={faqlist}
						backStep={backStep}
						{...props}
					/>
				);
			case 'termscondition':
				return (
					<TermsCondition
						termscondition={termscondition}
						backStep={backStep}
						{...props}
					/>
				);
			case 'contact':
				return (
					<ContactInside
						centralInformation={centralInformation}
						backStep={backStep}
						messageType={messageType}
						dataContact={dataContact}
						errorMessage={errorMessage}
						onChange={onChange}
						handleKeyEnter={handleKeyEnter}
						datalist={datalist}
						anchorEl={anchorEl}
						handleclose={handleclose}
						handleclick={handleclick}
						handleClickSelected={handleClickSelected}
						labelName={labelName}
						isDisabled={isDisabled}
						onSendMessage={onSendMessage}
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

export const BlocksContent = memo(_BlocksContent);

