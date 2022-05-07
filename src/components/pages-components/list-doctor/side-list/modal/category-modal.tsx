
import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Modal } from '../../../../modal/index';
import { clamp } from '../../../../../data/global/function';
import { CustomInputFieldContainer, CustomInputField, MaterialIconContainer } from '../../searchandfilter/search/search';

const InnerModal = styled.div<any>`
	width: 400px;
	max-width: 90vw;
	padding: 18px 12px;
	border-radius: 8px;
	background: #fff;
	position: absolute;
	right: ${props => props.right + 400}px;
	top: ${props => props.top}px;
`;

export const Title = styled.h1`
    font-weight: 500;
    font-size: 16px;
    margin: 0px 0 18px;
	font-style: normal;
	font-weight: bold;
`;

const SmallSearchInputContainer = styled(CustomInputFieldContainer)`
	max-width: 100% !important;
`;

export interface IModalCategory {
	isShow: boolean;
	setIsShow(_isShow: boolean): void;
	modalPosition: { top: number; right: number };
}

function _ModalCategory(props: IModalCategory) {
	const {
		isShow,
		setIsShow,
		modalPosition,
	} = props;

	const calculatePosition = (
		formHeight: number,
		modalPosition: { top: number; right: number }
	): { top: number; right: number } => {
		const placeholder = { top: 0, right: 0 };
		if ((process as NodeJS.Process).browser) {
			const { innerWidth, innerHeight } = window;
			const padding = 12;
			const maxRight = innerWidth - 1270;
			const height = formHeight + 24;

			const maxTop = innerHeight - height < 0 ? padding : innerHeight - height;

			const { right = 0, top = 0 } = modalPosition || {};
			const _right = clamp(right, 0, maxRight);
			const _top = clamp(top - 220, padding, maxTop);

			return { top: _top, right: _right };
		}

		return placeholder;
	};

	return (
		<Modal
			isShow={isShow}
			onCloseRequested={() => {
				setIsShow(false);
			}}
		>
			<InnerModal {...calculatePosition(530, modalPosition)}>
				<Title>
					Spesialis
				</Title>

				<CustomInputFieldContainer>
					<MaterialIconContainer icon={"search"} />
					<CustomInputField placeholder="Pencarian" />
				</CustomInputFieldContainer>

			</InnerModal>

		</Modal>
	)
}

export const ModalCategory = memo(_ModalCategory);

