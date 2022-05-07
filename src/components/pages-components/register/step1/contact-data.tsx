import { Fragment, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { ContainerBtn, BtnSubmit } from '../../login/login';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	TextLabelRegister,
} from '../register';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';
import { IValueInput, IErrorMessage } from '../../../../pages/register/index';
import { ContainerErrorMessage, IconContainer, TextError } from '../register';

export interface IContactDataProps {
	onChange(fieldId: string, value: any, error?: any): void;
	data: IValueInput;
	errorMessage: IErrorMessage;
	switchStep(step: number): void;
	validateContactData?(): void;
}

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	bottom: 0;
	width: 90%;
`;

function _ContactData(props: IContactDataProps) {
	const { onChange, data, errorMessage, switchStep, validateContactData } = props;

	const isEmptyValue = data && (data.email === "" || data.phone === "");
	const isInvalidEmail = errorMessage && errorMessage.email !== "";
	const isInvalidPhone = errorMessage && errorMessage.phone !== "";

	const handleKeyEnter = (e) => {
		if (!isEmptyValue && !isInvalidEmail && !isInvalidPhone) {
			if (e.key === "Enter") {
				validateContactData();
			}
		}
	}

	return (
		<Fragment>
			<FlexRow>
				<FlexOne>
					<TextLabelRegister fweight="bold">
						Isi Data Kontak
					</TextLabelRegister>
				</FlexOne>
			</FlexRow>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Nomor Telepon"
						variant="outlined"
						value={data && data.phone}
						onKeyPress={handleKeyEnter}
						type="number"
						onInput={(e) => {
							e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
						}}
						onChange={(e) => { e.persist(); onChange('phone', e.target.value); }}
						min={9}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<div>+62</div>
								</InputAdornment>
							)
						}}
					/>

					<ContainerErrorMessage error={errorMessage && errorMessage["phone"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["phone"]}</TextError>
					</ContainerErrorMessage>
				</CustomFormControl>
			</CustomFlexRow>

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
							onKeyPress={handleKeyEnter}
							disabled={isEmptyValue || isInvalidEmail || isInvalidPhone}
							onClick={() => { validateContactData(); }}
							minwidth="100%"
						>
							Lanjutkan
							</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomContainerBtn>
		</Fragment>
	);
}

export const ContactData = memo(_ContactData);