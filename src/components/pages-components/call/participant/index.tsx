
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useVideoTrackDimensions from '../../../../data/hooks/use-videoTracksDimension';
import { find } from 'lodash';

const ContainerParticipants = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	overflow: hidden;
	box-sizing: border-box;
	background-size: cover;
`;

const VideoPlayer = styled.video`
	width: ${(props) => props.width} !important;
	height: ${(props) => props.height} !important;
    min-width: 100% !important;
	min-height: 100% !important;
	object-fit: cover;
	display: ${(props) => props.display};
	right: 0;
	bottom: 0;
	border-radius: 10px;
	transform: ${(props) => props.transform};
	object-position: center;
`;

const ContainerNoVideo = styled.div`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
    min-width: 100%;
	min-height: 100%;
	object-fit: ${(props) => props.objfit};
	justify-content: center;
	align-items: center;
	display: ${(props) => props.display};
`;

const Participant = (props: any) => {
	const { reconnecting, isParticipantConnected, participant, videoheight, videowidth, data, iconPersonColor, iconPersonSize, handleRemoteTrackAudio, handleAudioRemote } = props;

	const [videoTracks, setVideoTracks] = useState([]);
	const [audioTracks, setAudioTracks] = useState([]);
	const videoRef = useRef();
	const audioRef = useRef();
	const dimensions = useVideoTrackDimensions(videoTracks && videoTracks[0]);
	const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);
	const trackpubsToTracks = trackMap => Array.from(trackMap ? trackMap?.values() : [])
		.map(publication => (publication as any)?.track)
		.filter(track => track !== null);

	const [isEnabledVideo, setIsEnabledVideo] = useState(false);

	const screenShareVideoTrack = find(videoTracks, { name: 'screen' });

	useEffect(() => {
		setIsEnabledVideo(reconnecting ? false : isEnabledVideo)
	}, [reconnecting])
	useEffect(() => {
		const trackSubscribed = track => {
			if (track?.kind === 'video') {
				setVideoTracks(videoTracks => [...videoTracks, track]);
			} else {
				setAudioTracks(audioTracks => [...audioTracks, track]);
				handleAudioRemote(track)
			}
		};

		const trackUnsubscribed = track => {
			if (track?.kind === 'video') {
				setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
			} else {
				setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
			}
		};
		setVideoTracks(trackpubsToTracks(participant?.videoTracks));
		setAudioTracks(trackpubsToTracks(participant?.audioTracks));

		participant && participant?.on('trackSubscribed', trackSubscribed);
		participant && participant?.on('trackUnsubscribed', trackUnsubscribed);

		participant && participant?.on("trackDisabled", track => {
			if (track.kind === "video") {
				setIsEnabledVideo(track?.isTrackEnabled);
			}

			if (track.kind === "audio" && track.isSubscribed) {
				// handleRemoteTrackAudio(track?.isTrackEnabled)
			}
		});

		participant && participant?.on("trackEnabled", track => {
			if (track.kind === "video") {
				setIsEnabledVideo(track?.isTrackEnabled);
			}

			if (track.kind === "audio" && track.isSubscribed) {
				// handleRemoteTrackAudio(track?.isTrackEnabled)
			}
		})

		return () => {
			setVideoTracks([]);
			setAudioTracks([]);
			participant?.removeAllListeners();
		};
	}, [participant]);

	useEffect(() => {
		const videoTrack = screenShareVideoTrack ? screenShareVideoTrack : videoTracks && videoTracks[0];
		if (videoTrack) {
			videoTrack?.attach(videoRef.current);
			return () => {
				videoTrack?.detach();
			};
		}
	}, [videoTracks]);

	useEffect(() => {
		const videoTrack = screenShareVideoTrack ? screenShareVideoTrack : videoTracks && videoTracks[0];
		if (reconnecting) {
			setIsEnabledVideo(false)
			videoTrack?.detach();
		} else {
			setIsEnabledVideo(true)
			videoTrack?.attach(videoRef.current);
		}
	}, [reconnecting])

	useEffect(() => {
		const audioTrack = audioTracks && audioTracks[0];
		if (audioTrack) {
			audioTrack?.attach(audioRef.current);
			return () => {
				audioTrack?.detach();
			};
		}
	}, [audioTracks]);

	useEffect(() => {
		const videoTrack = screenShareVideoTrack ? screenShareVideoTrack : videoTracks && videoTracks[0];
		if (videoTrack) {
			setIsEnabledVideo(videoTrack?.isEnabled);
		}
	}, [videoTracks[0]?.isEnabled]);

	return (
		<ContainerParticipants>
			<VideoPlayer
				height={videoheight ? videoheight : dimensions?.height ?? 0}
				width={videowidth ? videowidth : dimensions?.width ?? 0}
				ref={videoRef}
				autoPlay={data.enable?.video}
				transform={screenShareVideoTrack ? 'none' : 'rotateY(180deg)'}
				// objfit={'cover'}
				display={isEnabledVideo && isParticipantConnected ? "block" : "none"}
			/>

			<ContainerNoVideo
				height={videoheight ? videoheight : dimensions?.height ?? 0}
				width={videowidth ? videowidth : dimensions?.width ?? 0}
				objfit={isPortrait ? 'fill' : 'cover'}
				display={isEnabledVideo && isParticipantConnected ? "none" : "flex"}
			>
				{/* <Icon
					icon={"person"}
					color={iconPersonColor}
					fsize={iconPersonSize}
				/> */}

			</ContainerNoVideo>
			<audio ref={audioRef} autoPlay={true} />
		</ContainerParticipants>
	);
};

export default Participant;