
import { memo } from 'react';
import { Link } from '@material-ui/core';
import linkify from 'linkify-it';
import styled from 'styled-components';
import { MessageInfo, MessageInfoProps } from '../messageInfo/message-info';

const WrapMessage = styled.div`
	display: flex;
	justify-content: ${(props) => props.isLocalParticipant ? 'flex-end' : 'flex-start'}!important;
`;

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

const CustomLink = styled(Link)`
	color: #FFFFFF;
`;

const TextData = styled.div`
	font-size: 14px;
	font-weight: 500;
	padding: 6px;
`;

interface TextMessageProps extends MessageInfoProps {
	body: string;
	dateCreated: string;
	shouldDisplayMessageInfo: any;
}

function addLinks(text: string) {
	const matches = linkify().match(text);
	if (!matches) return text;

	const results = [];
	let lastIndex = 0;

	matches.forEach((match, i) => {
		results.push(text.slice(lastIndex, match.index));
		results.push(
			<CustomLink target="_blank" rel="noreferrer" href={match.url} key={i}>
				{match.text}
			</CustomLink>
		);
		lastIndex = match.lastIndex;
	});

	results.push(text.slice(lastIndex, text.length));

	return results;
}

export function _TextMessage(props: TextMessageProps) {
	const { isLocalParticipant, body, shouldDisplayMessageInfo, author, dateCreated } = props;

	return (
		<WrapMessage isLocalParticipant={isLocalParticipant}>
			<MessageContainer
				isLocalParticipant={isLocalParticipant}
			>
				{shouldDisplayMessageInfo && (
					<MessageInfo
						author={author}
						isLocalParticipant={isLocalParticipant}
						dateCreated={dateCreated}
					/>
				)}
				<TextData>{addLinks(body)}</TextData>
			</MessageContainer>
		</WrapMessage>
	);
}


export const TextMessage = memo(_TextMessage);
