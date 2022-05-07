import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import { CustomFormControl, CustomTextField } from '../../login/login';
import {
	TextLabelRegister,
} from '../register';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';
import { ContainerErrorMessage, IconContainer, TextError } from '../register';
import { IContactDataProps } from '../step1/contact-data';

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	box-sizing: border-box;
	bottom: 0;
	width: 90%;
`;

const ContainerContent = styled(FlexRow)`
	padding: 30px 10px 0px;
`;

interface IChangeEmailProps extends IContactDataProps {
	onUpdateEmail(): void;
}


function _ChangeEmail(props: IChangeEmailProps) {

	const { onChange, data, errorMessage, switchStep, onUpdateEmail } = props;
	const isEmptyValue = data && data.email === "";
	const isInvalidEmail = errorMessage && errorMessage.email !== "";

	const handleKeyEnter = (e) => {
		if (!isEmptyValue && !isInvalidEmail) {
			if (e.key === "Enter") {
				onUpdateEmail();
			}
		}
	}

	return (
		<Fragment>
			<ContainerContent>
				<FlexOne>
					<TextLabelRegister fweight="bold">
						Ubah data kontak
					</TextLabelRegister>
				</FlexOne>
			</ContainerContent>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Email"
						variant="outlined"
						onKeyPress={handleKeyEnter}
						value={data && data.email}
						type="text"
						onChange={(e) => { e.persist(); onChange('email', e.target.value); }}
					/>
					<ContainerErrorMessage error={errorMessage && errorMessage["email"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["email"]}</TextError>
					</ContainerErrorMessage>
				</CustomFormControl>
			</CustomFlexRow>

			<CustomContainerBtn>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							disabled={isEmptyValue || isInvalidEmail}
							onClick={() => onUpdateEmail()}
							minwidth="100%"
							onKeyPress={handleKeyEnter}
						>
							Verifikasi
						</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomContainerBtn>
		</Fragment>
	);
}

export const ChangeEmail = memo(_ChangeEmail);