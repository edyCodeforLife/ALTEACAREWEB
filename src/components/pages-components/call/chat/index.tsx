import { memo } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { map } from 'lodash';
import CustomScroll from 'react-custom-scroll';
import { Icon } from '../../../basic-elements/mobile-container';
import { TextMessage } from './TextMessage/text-message';
import { MediaMessage } from './mediaMessage/media-message';
import { ChatInput } from './InputChat/input-chat';

const CustomModal = styled(Modal)`
	display: flex;
    align-items: flex-start;
    justify-content: center;
	border: none;
	position: absolute;
	top: 22px !important;
	@media (max-width: 768px) {
		top: unset !important;
	}
`;

const InsideModal = styled.div`
	background: #fff;
	max-width: 370x;
	width: 370px;
	height: 631px;
	max-height: 631px;
	outline: none;
	padding: 0px;
	border-radius: 8px;
		@media (max-width: 768px) {
			width: 100vw;
			height: 100vh;
			max-height: 100vh;
			max-width: 100vw;
	}
`;

const ContentInside = styled.div`
	text-align: center;
	width: 100%;
	box-sizing: border-box;
	position: relative;
	height: 100%;
`;

const HeaderChat = styled.div`
	position: absolute;
	top: 0;
	min-height: 50px;
	align-items: center;
	justify-content: flex-end;
	display: flex;
	width: 100%;
	padding: 10px;
	background: #87CDE9;
	box-sizing: border-box;
	border-radius: 8px 8px 0px 0px;
`;

const InputChatContainer = styled.div`
	position: absolute;
	bottom: 0;
	min-height: 50px;
	box-sizing: border-box;
	width: 100%;
	padding: 0px 20px;
		@media (max-width: 600px) {
			min-height: 30px;
	}
`;

const HeaderText = styled.div`
	color: white;
	display: flex;
	flex: 0 0 50%;
	font-size: 16px;
`;

const ContainerIcon = styled.div`
	cursor: pointer;
	z-index: 999;
`;

const ContainerMessageList = styled.div`
	padding: 60px 0px;
	position: relative;
	height: calc(100% + 7px);
	box-sizing: border-box;
		@media (max-width: 600px) {
			padding: 60px 0px 74px 0px;
	};
`;

const InsideListMessage = styled.div`
	padding: 7px 20px;
`;

interface ICurtainProps {
	open: boolean;
	handleModal(open: boolean): void;
	messages: any[];
	localParticipant: any;
	conversation: any;
}

function _CurtainChat(props: ICurtainProps) {
	const { open, handleModal, messages, localParticipant, conversation } = props;

	const getFormattedTime = (message) => {
		return message?.dateUpdated.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' }).toLowerCase();
	}

	return (
		<CustomModal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={() => handleModal(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<InsideModal>
					<ContentInside>
						<HeaderChat>
							<HeaderText>
								CHAT
							</HeaderText>
							<ContainerIcon onClick={() => { handleModal(false) }}>
								<Icon
									style={{ pointerEvents: 'none' }}
									icon={"close"}
									fsize={27}
									color={"#fff"}
								/>
							</ContainerIcon>
						</HeaderChat>
						<ContainerMessageList>
							<CustomScroll flex="1" heightRelativeToParent={'calc(100% - 20px)'}>
								{map(messages, (item, idx) => {
									const message = item.state?.body;
									const author = item.state?.author;
									const messageType = item.state?.type;
									const media = item.state?.media;
									const time = getFormattedTime(item)!;
									const previousTime = getFormattedTime(messages[idx - 1]);
									const isLocalParticipant = localParticipant?.identity === author;
									const shouldDisplayMessageInfo = time !== previousTime || author !== messages[idx - 1]?.author;

									return (
										<InsideListMessage key={idx}>
											{messageType === 'text' &&
												<TextMessage
													body={message}
													shouldDisplayMessageInfo={shouldDisplayMessageInfo}
													author={author}
													dateCreated={time}
													isLocalParticipant={isLocalParticipant}
												/>}
											{
												messageType === "media" &&
												<MediaMessage
													media={media}
													shouldDisplayMessageInfo={shouldDisplayMessageInfo}
													author={author}
													dateCreated={time}
													isLocalParticipant={isLocalParticipant}
												/>
											}
										</InsideListMessage>
									)
								})}
							</CustomScroll>
						</ContainerMessageList>
						<InputChatContainer>
							<ChatInput
								isChatWindowOpen={open}
								conversation={conversation}
							/>
						</InputChatContainer>
					</ContentInside>
				</InsideModal>
			</Fade>
		</CustomModal>

	);
}

export const CurtainChat = memo(_CurtainChat);