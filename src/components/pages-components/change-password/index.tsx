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
import { CheckPasswordData } from './check-password/check-password';
import { UpdatePassword } from './update-password/update-password';

function _ChangePasswordContent(props: any) {

	const {
		qrsStep,
		backStep,
		profileUser,
		handleMouseDownPassword,
		handleClickShowPasswordStep1,
		showPasswordStep1,
		passwordStep1,
		onChangeCheckPassword,
		handleKeyEnter,
		checkPassword,
		handleClickShowPassword,
		isPasswordValid,
		showPassword,
		passwordData,
		onChange,
		errorMessage,
		changePassword
	} = props;

	const switchRender = (type) => {
		switch (type) {
			case 'step1':
				return (
					<CheckPasswordData
						backStep={backStep}
						passwordStep1={passwordStep1}
						onChangeCheckPassword={onChangeCheckPassword}
						showPasswordStep1={showPasswordStep1}
						handleKeyEnter={handleKeyEnter}
						checkPassword={checkPassword}
						handleMouseDownPassword={handleMouseDownPassword}
						handleClickShowPasswordStep1={handleClickShowPasswordStep1}
						{...props}
					/>
				);
			case 'step2':
				return (
					<UpdatePassword
						handleClickShowPassword={handleClickShowPassword}
						isPasswordValid={isPasswordValid}
						handleMouseDownPassword={handleMouseDownPassword}
						passwordData={passwordData}
						showPassword={showPassword}
						onChange={onChange}
						changePassword={changePassword}
						errorMessage={errorMessage}
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
									{switchRender(qrsStep)}
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

export const ChangePasswordContent = memo(_ChangePasswordContent);

