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
import InputAdornment from '@material-ui/core/InputAdornment';

const CustomContainerBtn = styled(CustomFlexRow)`
	position: absolute;
	box-sizing: border-box;
	bottom: 0;
	width: 90%;
`;

const ContainerContent = styled(FlexRow)`
	padding: 30px 10px 0px;
`;

interface IChangePhoneProps extends IContactDataProps {
	onUpdatePhone(): void;
}

function _ChangePhone(props: IChangePhoneProps) {

	const { onChange, data, errorMessage, switchStep, onUpdatePhone } = props;
	const isEmptyValue = data && data.phone === "";
	const isInvalidPhone = errorMessage && errorMessage.phone !== "";

	const handleKeyEnter = (e) => {
		if (!isEmptyValue && !isInvalidPhone) {
			if (e.key === "Enter") {
				onUpdatePhone();
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

			<CustomContainerBtn>
				<CustomFormControl minwidth="100%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							disabled={isEmptyValue || isInvalidPhone}
							onClick={() => onUpdatePhone()}
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

export const ChangePhone = memo(_ChangePhone);