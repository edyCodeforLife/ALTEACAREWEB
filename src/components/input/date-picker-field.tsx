import { flowRight } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomTextField, CustomFormControl } from '../pages-components/login/login';
import MaterialIcon from '@material/react-material-icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { formattedDate } from '../../data/global/function';
import { Datepicker } from '../../components/date-picker/index';
import { FlexRow } from '../../components/basic-elements/flex/index';

export const AsShadow = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: ' ';
    display: block;
`;

export const CustomTextContainer = styled(CustomFormControl)`
	cursor: pointer;
	background: #fff;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	padding: 14px 8px;
	font-size: 16px;
	height: 100%;
	display: flex;
	line-height: 16px;
	flex-direction: row;
	justify-content: space-between;
`;

export const InputText = styled.input`
	border-bottom: none;
	margin-left: 8px;
	width: -webkit-fill-available;
	border: none;
	outline: none;
	font-size: 16px;
	margin-top: 3px;
	background: #fff;
	color: black;
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
		::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #C7C9D9;
		opacity: 1; /* Firefox */
		}

		:-ms-input-placeholder { /* Internet Explorer 10-11 */
		color: #C7C9D9;
		}

		::-ms-input-placeholder { /* Microsoft Edge */
		color: #C7C9D9;
		}
`;

const InputFieldDatePicker = styled(CustomTextField)`
	padding: 0px 10px;
	.MuiInputLabel-root {
		padding-left: 16px;
		margin-top: -6px;
		color:#C7C9D9 !important;
	}
	.MuiInput-underline:before {
		content: "";
		position: unset;
	};
	.MuiInputLabel-asterisk {
		display: none;
	};
	.MuiInputLabel-shrink {
		transform: translate(0, -1.5px) scale(0.75);
	}
	.MuiInput-underline.Mui-focused:after {
		transform: scaleX(0);
	}
`;

export const CustomAdornment = styled(InputAdornment)`
	margin-bottom: 8px;
`;

export const DateContainer = styled(FlexRow)`
    z-index: 12;
    position: relative;
`;

export const Container = styled.div`
    position: relative;
`;

export const AsModal = styled.div<any>`
    position: absolute;
    left: 18px;
    top: 48px;
    z-index: 10;
    display: ${props => (props.opened ? 'block' : 'none')};
`;

export interface IDatepickerFieldProps {
	minDate?: Date;
	maxDate?: Date;
	title?: string;
	toFieldId?: string;
	toValue?: any;
	dateType?: any;
	value?: any;
	modalStyle?: any;
	fieldId: string;
	disabled: boolean;
	readOnly: boolean;
	label: string;
	onChange(fieldId: string, value: any, error?: string, extraData?: any): void;
}

function _DatepickerField(props: IDatepickerFieldProps) {
	const language = "idn";
	const { value } = props;

	const [isShow, setIsShow] = useState(false);
	const [maskedValue, setMaskedValue] = useState(formattedDate(value, language));

	const formatDateForBackend = useCallback(date => {
		if (date) {
			const dateInstance = new Date(date);
			return `${dateInstance.getFullYear()}-${dateInstance.getMonth() + 1
				}-${dateInstance.getDate()}`;
		}
		return date;
	}, []);

	const onDateChanged = useCallback(
		(date: any) => {
			props.onChange(props.fieldId, formatDateForBackend(date), undefined);
			setMaskedValue(formattedDate(date, language));
			setIsShow(false);
		},
		[props]
	);

	useEffect(() => {
		setMaskedValue(formattedDate(value, language));
	}, [language]);

	useEffect(() => {
		if (value) {
			const _formatted = formattedDate(value, language);
			if (_formatted !== maskedValue) {
				setMaskedValue(_formatted);
			}
		}
	}, [value]);

	let minDate = props.minDate;
	let maxDate = props.maxDate;
	let defaultDate = new Date();
	if (props.dateType && props.dateType === 'birthday') {
		defaultDate.setFullYear(defaultDate.getFullYear() - 17);
		maxDate = defaultDate;
	}

	return (
		<Container>
			<CustomTextContainer minwidth="100%">
				<InputText
					type="text"
					onClick={() => {
						if (!props.disabled && !props.readOnly) setIsShow(true);
					}}
					placeholder={props.label}
					value={maskedValue || ''}
					readOnly
				/>
				<MaterialIcon role={'button'} icon={'date_range'} />
				{/* <InputFieldDatePicker
					id="inputDatePickerField"
					label={props.label}
					InputProps={{
						endAdornment: (
							<CustomAdornment position="end">
								<MaterialIcon role={'button'} icon={'date_range'} />
							</CustomAdornment>
						)
					}}

					// trailingIcon={<MaterialIcon role={'button'} icon={'date_range'} />}
					value={maskedValue}
					onClick={() => {
						if (!props.disabled && !props.readOnly) setIsShow(true);
					}}
				/> */}

				<AsModal opened={isShow}>
					<AsShadow
						onClick={evt => {
							setIsShow(false);
						}}
					/>
					<DateContainer>
						<Datepicker
							title={props.title}
							defaultDate={value ? (value as any) : defaultDate}
							minDate={minDate}
							maxDate={maxDate}
							onDateChanged={onDateChanged}
						/>
					</DateContainer>
				</AsModal>
			</CustomTextContainer>
		</Container>
	);
}

export const MDTDatepickerField = flowRight([memo])(_DatepickerField);
