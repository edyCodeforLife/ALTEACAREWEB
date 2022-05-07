import { Fragment, memo, useState } from 'react';
import styled from 'styled-components';
import Flex, { FlexOne, FlexRow } from '../../../basic-elements/flex/index';
import {
	ContainerErrorMessage,
	IconContainer,
	TextError,
} from '../../register/register';
import {
	CustomFlexRow,
}
	from '../../../basic-elements/mobile-container/index';

import { ContainerBtn, BtnSubmit } from '../../login/login';
import { CustomFormControl, CustomTextField } from '../../login/login';
import { IStateForgotPassword } from '../../../../pages/forgot-password/index';

export const TextTitle = styled.div`
	font-style: normal;
	font-weight: ${(props) => props.fweight};
	font-size: 14px;
	color: #3A3A3C;
	white-space: pre-line;
	line-height: 1.4;
`;

interface IStep1Props {
	data: IStateForgotPassword;
	onChange(fieldId: string, value: any, error?: any): void;
	errorMessage: IStateForgotPassword;
	requestForgotPassword(): void;
}

function _Step1(props: IStep1Props) {
	const { data, onChange, errorMessage, requestForgotPassword } = props;
	const isEmptyValue = data && data.username === "";
	const isInvalidUsername = errorMessage && errorMessage.username !== "";

	const handleKeyEnter = (e) => {
		if (!isEmptyValue && !isInvalidUsername) {
			if (e.key === "Enter") {
				requestForgotPassword();
			}
		}
	}

	return (
		<Fragment>
			<FlexRow>
				<FlexOne>
					<TextTitle fweight="bold">
						Atur Ulang Kata Sandi
					</TextTitle>
				</FlexOne>
			</FlexRow>
			<FlexRow>
				<FlexOne>
					<TextTitle fweight="normal">
						Masukkan alamat email / nomor ponsel yang terdaftar di AlteaCare dan kami akan mengirimkan kode verifikasi untuk mengatur ulang kata sandi.
					</TextTitle>
				</FlexOne>
			</FlexRow>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%">
					<CustomTextField
						label="Masukkan Alamat Email/Nomor Ponsel"
						onKeyPress={handleKeyEnter}
						variant="outlined"
						value={data && data.username}
						type="text"
						onChange={(e) => { e.persist(); onChange('username', e.target.value); }}
					/>
					<ContainerErrorMessage error={errorMessage && errorMessage["username"] !== ""}>
						<IconContainer icon={"error_outline_rounded"} />
						<TextError>{errorMessage["username"]}</TextError>
					</ContainerErrorMessage>
				</CustomFormControl>
			</CustomFlexRow>

			<CustomFlexRow>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							onClick={() => { requestForgotPassword() }}
							onKeyPress={handleKeyEnter}
							disabled={isEmptyValue || isInvalidUsername}
							minwidth="100%"
						>
							Atur Ulang
							</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomFlexRow>
		</Fragment>
	);
}

export const Step1 = memo(_Step1);