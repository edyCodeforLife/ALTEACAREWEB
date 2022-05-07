import { useEffect, useRef, useState, memo } from 'react';
import { Button, CircularProgress, TextareaAutosize } from '@material-ui/core';
import { isMobile } from '../../../../../data/global/function';
import { Snackbar } from '../../../../snack-bar/index';
import styled from 'styled-components';
import {
	Icon,
}
	from '../../../../basic-elements/mobile-container/index';
import { FlexRow } from '../../../../basic-elements/flex';

const FileButtonLoadingSpinner = styled(CircularProgress)`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -12px;
`;

const ChatInputContainer = styled(FlexRow)`
	// border-top: 1px solid #e4e7e9;
	padding: 20px 0px;
	justify-content: space-between;
`;

const Border = styled.hr`
	background: #e4e7e9;
	height: 1px;
`;

export const TextAreaContainer = styled.div`
	width: ${(props) => props.width};
	padding: 4px 12px;
	border-radius: 20px;
	box-shadow: 0px 0px 4px #D6EDF6;
    position: relative;
	line-height: 1.6;
	position: relative;
	border: ${(props) => props.isTextareaFocused ? '2px solid #61C7B5' : '1px solid #EBEBF0'};
	background: #F2F2F5;
	max-width: 250px;
	overflow: hidden;
		@media (max-width: 600px) {
			line-height: 2;
			width: 230px;
	};
`;

export const TextAreaCustom = styled(TextareaAutosize)`
	border: none;
	outline: none;
	margin-top: 3px;
	background: #F2F2F5;
	font-style: normal;
	color: #8F90A6;
	font-weight: 500;
	font-size: 14px;
	width: 100%;
	resize: none;
`;

const ToolsContainer = styled.div`
	max-width: 150px;
	box-sizing: border-box;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const FileButtonContainer = styled.div`
	position: relative;
	min-width: 60px;
	text-align: left;
`;

const CustomBtn = styled(Button)`
	background: transparent;
	min-width: 30px;
		&:disabled: {
			background: 'none',
			& path: {
				fill: '#d8d8d8',
			};
		};
`;

interface ChatInputProps {
	conversation: any;
	isChatWindowOpen: boolean;
}

export const ALLOWED_FILE_TYPES =
	'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';

export function _ChatInput({ conversation, isChatWindowOpen }: ChatInputProps) {
	const [messageBody, setMessageBody] = useState('');
	const [isSendingFile, setIsSendingFile] = useState(false);
	const [fileSendError, setFileSendError] = useState<string | null>(null);
	const isValidMessage = /\S/.test(messageBody);
	const textInputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isTextareaFocused, setIsTextareaFocused] = useState(false);

	useEffect(() => {
		if (isChatWindowOpen) {
			textInputRef.current?.focus();
		}
	}, [isChatWindowOpen]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessageBody(event.target.value);
	};

	const handleReturnKeyPress = (event: React.KeyboardEvent) => {
		if (!isMobile() && event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSendMessage(messageBody);
		}
	};

	const handleSendMessage = (message: string) => {
		if (isValidMessage) {
			conversation?.sendMessage(message?.trim());
			setMessageBody('');
		}
	};

	const handleSendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			var formData = new FormData();
			formData.append('userfile', file);
			setIsSendingFile(true);
			setFileSendError(null);
			conversation
				?.sendMessage(formData)
				.catch(e => {
					if (e.code === 413) {
						setFileSendError('File size is too large. Maximum file size is 150MB.');
					} else {
						setFileSendError('There was a problem uploading the file. Please try again.');
					}
					console.log('Problem sending file: ', e);
				})
				.finally(() => {
					setIsSendingFile(false);
				});
		}
	};

	return (
		<ChatInputContainer>
			<Snackbar
				open={Boolean(fileSendError)}
				headline="Error"
				message={fileSendError || ''}
				variant="error"
				handleClose={() => setFileSendError(null)}
			/>
			<TextAreaContainer isTextareaFocused={isTextareaFocused}>
				<TextAreaCustom
					rowsMin={1}
					rowsMax={3}
					aria-label="chat input"
					placeholder="Ketik Pesan disini..."
					onKeyPress={handleReturnKeyPress}
					onChange={handleChange}
					value={messageBody}
					data-cy-chat-input
					ref={textInputRef}
					onFocus={() => setIsTextareaFocused(true)}
					onBlur={() => setIsTextareaFocused(false)}
				/>
			</TextAreaContainer>

			<ToolsContainer>
				<input
					ref={fileInputRef}
					type="file"
					style={{ display: 'none' }}
					onChange={handleSendFile}
					value={''}
					accept={ALLOWED_FILE_TYPES}
				/>
				<ButtonContainer>
					<FileButtonContainer>
						<CustomBtn onClick={() => fileInputRef.current?.click()} disabled={isSendingFile}>
							<Icon
								style={{ width: 24 }}
								icon={"attach_file_icon"}
								color={"#61C7B5"}
							/>
						</CustomBtn>

						{isSendingFile &&
							<FileButtonLoadingSpinner size={24}
							/>}
					</FileButtonContainer>

					<CustomBtn
						style={{ marginLeft: 5 }}
						onClick={() => handleSendMessage(messageBody)}
						color="primary"
						variant="contained"
						disabled={!isValidMessage}
						data-cy-send-message-button
					>
						<Icon icon={"send"} fsize={18} color={"#61C7B5"} />
					</CustomBtn>
				</ButtonContainer>
			</ToolsContainer>

		</ChatInputContainer>
	);
}

export const ChatInput = memo(_ChatInput);

