import { useEffect, useState } from 'react';
import { Participant, TrackPublication, Room } from 'twilio-video';
import { includes } from 'lodash'

export default function useScreenShareParticipant(room: Room) {
	const [screenShareParticipant, setScreenShareParticipant] = useState<Participant>(null);

	useEffect(() => {
		if (room) {
			const updateScreenShareParticipant = () => {
				setScreenShareParticipant(
					Array.from<Participant>(room?.participants.values())
						.concat(room?.localParticipant)
						.find((participant: Participant) =>
							Array.from<TrackPublication>(participant?.tracks.values()).find(track => {
								return includes(track?.trackName, "screen")
							})
						)
				);
			};
			updateScreenShareParticipant();

			room.on('trackPublished', updateScreenShareParticipant);
			room.on('trackUnpublished', updateScreenShareParticipant);
			room.on('participantDisconnected', updateScreenShareParticipant);

			room.localParticipant.on('trackPublished', updateScreenShareParticipant);
			room.localParticipant.on('trackUnpublished', updateScreenShareParticipant);
			return () => {
				room.off('trackPublished', updateScreenShareParticipant);
				room.off('trackUnpublished', updateScreenShareParticipant);
				room.off('participantDisconnected', updateScreenShareParticipant);

				room.localParticipant.off('trackPublished', updateScreenShareParticipant);
				room.localParticipant.off('trackUnpublished', updateScreenShareParticipant);
			};
		}
	}, [room]);

	return screenShareParticipant;
}
