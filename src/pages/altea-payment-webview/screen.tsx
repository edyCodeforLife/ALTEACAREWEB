import { Fragment, memo } from "react";
import styled from 'styled-components';
import { Flex } from '../../components/basic-elements/flex/index';
import { ContainerBtn, BtnSubmit, CustomFormControl } from '../../components/pages-components/login/login';
import {
	CustomFlexRow,
}
	from '../../components/basic-elements/mobile-container/index';

const ContainerFrame = styled(Flex)`
	position: relative;
	width: 100vw;
	height: 100vh;
`;

const CustomIframe = styled.iframe`
	width: inherit;
	height: inherit;
`;

const CustomContainerBtn = styled(CustomFlexRow)`
	position: relative;
	width: 100%;
	padding: 0px 20px;
	box-sizing: border-box;
	padding-bottom: 15px;
`;

function _ScreenAlteaPaymentWebView(props: any) {

	const {
		selectedPaymentObj,
		onCheckPaymentStatus,
		webviewURL
	} = props;

	return (
		<ContainerFrame>
			<CustomIframe src={webviewURL} />
			<CustomContainerBtn>
				<CustomFormControl minwidth="90%" talign="center">
					<ContainerBtn>
						<BtnSubmit
							onClick={onCheckPaymentStatus}
							minwidth="100%"
						>
							Cek Status Pembayaran
						</BtnSubmit>
					</ContainerBtn>
				</CustomFormControl>
			</CustomContainerBtn>
		</ContainerFrame>
	);
}

export const ScreenAlteaPaymentWebView = memo(_ScreenAlteaPaymentWebView);
