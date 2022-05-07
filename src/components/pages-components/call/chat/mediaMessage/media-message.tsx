import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageInfo, MessageInfoProps } from '../messageInfo/message-info';

const MessageContainer = styled.div`
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	align-items: ${(props) => props.isLocalParticipant ? 'flex-end' : 'flex-start'};
	padding: 0.3em 0.8em 0.3em;
	margin: 0.3em 0 0;
	word-break: break-word;
	background-color: ${(props) => props.isLocalParticipant ? '#D6EDF6' : '#3E8CB9'};
	hyphens: auto;
	white-space: pre-wrap;
	text-align: ${(props) => props.isLocalParticipant ? 'right' : 'left'};
	color: ${(props) => props.isLocalParticipant ? '#2C528B' : '#FFFFFF'};
`;

const FileName = styled.div`
	font-weight: 700;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 10px 0px;
`;

const MediaInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 0;
	padding: 6px;
	&p: {
		margin: 0;
		font-size: 12px;
	};
`;

const Size = styled.div`
	font-weight: 400;
	cursor: pointer;
`;

export const ImageLogo = styled.img`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	margin: ${(props) => props.margin ? '0px 5px' : null}
`;


interface MediaMessageProps extends MessageInfoProps {
	media: any;
	shouldDisplayMessageInfo: boolean;
}

export function formatFileSize(bytes: number, suffixIndex = 0): string {
	const suffixes = ['bytes', 'KB', 'MB', 'GB'];
	if (bytes < 1000) return +bytes.toFixed(2) + ' ' + suffixes[suffixIndex];
	return formatFileSize(bytes / 1024, suffixIndex + 1);
}

export function _MediaMessage(props: MediaMessageProps) {
	const { media, author, isLocalParticipant, dateCreated, shouldDisplayMessageInfo } = props;
	const [dataMedia, setDataMedia] = useState('');

	const handleClick = () => {
		media.getContentTemporaryUrl().then(url => {
			const anchorEl = document.createElement('a');

			anchorEl.href = url;
			anchorEl.target = '_blank';
			anchorEl.rel = 'noopener';

			// setTimeout is needed in order to open files in iOS Safari.
			setTimeout(() => {
				anchorEl.click();
			});
		});
	};

	useEffect(() => {
		media.getContentTemporaryUrl().then(url => {
			setDataMedia(url);
		});
	}, [dataMedia])

	return (
		<MessageContainer isLocalParticipant={isLocalParticipant} onClick={handleClick}>
			{shouldDisplayMessageInfo && (
				<MessageInfo
					author={author}
					isLocalParticipant={isLocalParticipant}
					dateCreated={dateCreated}
				/>
			)}
			<MediaInfo>
				{media?.contentType.includes('image') && (
					<ImageLogo
						style={{ padding: '10px 0px' }}
						height={'100%'}
						width={'100%'}
						src={dataMedia !== "" ? dataMedia : ''}
					/>
				)}

				<FileName>{media?.filename}</FileName>
				<Size>{formatFileSize(media?.size)} - Click to open</Size>
			</MediaInfo>
		</MessageContainer>
	);
}

export const MediaMessage = memo(_MediaMessage);
