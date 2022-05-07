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
import { Settings } from './settings/settings';
import { UpdateProfile } from './update-profile/update-profile';

function _ChangeProfileContent(props: any) {

	const {
		dataType,
		backStep,
		profileUser,
		redirectChangePassword,
		openModal,
		handleModal
	} = props;

	const switchRender = (type) => {
		switch (type) {
			case 'changeProfile':
				return (
					<UpdateProfile
						profileUser={profileUser}
						backStep={backStep}
						open={openModal}
						handleModal={handleModal}
						{...props}
					/>
				);
			case 'settings':
				return (
					<Settings
						redirectChangePassword={redirectChangePassword}
						backStep={backStep}
						{...props}
					/>
				);
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

export const ChangeProfileContent = memo(_ChangeProfileContent);

