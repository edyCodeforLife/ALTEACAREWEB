import { memo } from 'react';
import styled from 'styled-components';

export const MessageInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center
	padding: 1.425em 0 0.083em;
	font-size: 12px;
	color: #87CDE9;
`;

export const TagUser = styled.div`
	padding: 5px;
`

export interface MessageInfoProps {
	author: string;
	dateCreated: string;
	isLocalParticipant: boolean;
}

function _MessageInfo(props: MessageInfoProps) {
	const { author, dateCreated, isLocalParticipant } = props;

	const userName = author.split("@")[0];
	return (
		<MessageInfoContainer>
			<TagUser>{isLocalParticipant ? `${userName} (You)` : userName}</TagUser>
			<TagUser>{dateCreated}</TagUser>
		</MessageInfoContainer>
	);
}

export const MessageInfo = memo(_MessageInfo);
