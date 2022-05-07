import { useState, useCallback, useRef } from 'react';
import { LogLevels, Track, Room, TwilioError } from 'twilio-video';

interface MediaStreamTrackPublishOptions {
	name?: string;
	priority: Track.Priority;
	logLevel: LogLevels;
}

export type ErrorCallback = (error: TwilioError | Error) => void;

export default function useScreenShareToggle(room: Room | null, onError?: ErrorCallback) {
	const [isSharing, setIsSharing] = useState(false);
	const stopScreenShareRef = useRef<() => void>(null!);

	const shareScreen = useCallback(() => {
		const mediaDevices = navigator.mediaDevices as any;
		mediaDevices.getDisplayMedia({
			audio: false,
			video: {
				frameRate: 10,
				// height: 640,
				// width: 480,
				maxWidth: 1920,
				maxHeight: 1080,
				maxFrameRate: 10,
				minAspectRatio: 1.77
			},
		})
			.then(stream => {
				const track = stream.getTracks()[0];
				room!.localParticipant
					.publishTrack(track, {
						name: 'screen',
						priority: 'low',
					} as MediaStreamTrackPublishOptions)
					.then(trackPublication => {
						stopScreenShareRef.current = () => {
							room!.localParticipant.unpublishTrack(track);
							room!.localParticipant.emit('trackUnpublished', trackPublication);
							track.stop();
							setIsSharing(false);
						};

						track.onended = stopScreenShareRef.current;
						setIsSharing(true);
					})
					.catch(onError);
			})
			.catch(error => {
				if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
					onError(error);
				}
			});
	}, [room, onError]);

	const toggleScreenShare = useCallback(() => {
		if (room) {
			!isSharing ? shareScreen() : stopScreenShareRef.current();
		}
	}, [isSharing, shareScreen, room]);

	return [isSharing, toggleScreenShare] as const;
}
