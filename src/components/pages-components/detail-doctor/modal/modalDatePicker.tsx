import { memo, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexRow } from '../../../basic-elements/flex';
import { Datepicker } from '../../../date-picker/index';

const CustomModal = styled(Modal)`
	display: flex;
    align-items: center;
    justify-content: center;
	outline: none;
	border: none;
`;

const InsideModal = styled.div`
	background: #fff;
	max-width: 300px;
	height: auto;
	padding: 20px;
	border-radius: 10px;
	outline: none;
`;

export const DateContainer = styled(FlexRow)`
    z-index: 12;
    position: relative;
`;

interface IModalDatePickerProps {
	open: boolean;
	handleModal(fieldId: string, open: boolean): void;
	minDate?: Date;
	maxDate?: Date;
	title?: string;
	value?: any,
	dateType?: any;
	fieldId?: any,
	onChange(fieldId: string, value: any, error?: string, extraData?: any): void;
}

function _ModalDatePicker(props: IModalDatePickerProps) {
	const {
		open,
		title,
		handleModal,
		value,
	} = props;

	let minDate = props.minDate;
	let maxDate = props.maxDate;
	let defaultDate = new Date();
	if (props.dateType && props.dateType === 'birthday') {
		defaultDate.setFullYear(defaultDate.getFullYear() - 17);
		maxDate = defaultDate;
	}

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
			handleModal("modalDatePicker", false);
		},
		[props]
	);

	return (
		<div>
			<CustomModal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={() => handleModal("modalDatePicker", false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<InsideModal>
						<Datepicker
							title={props.title}
							defaultDate={value ? (value as any) : defaultDate}
							minDate={minDate}
							maxDate={maxDate}
							onDateChanged={onDateChanged}
						/>
					</InsideModal>
				</Fade>
			</CustomModal>
		</div>
	);
}

export const ModalDatePicker = memo(_ModalDatePicker);