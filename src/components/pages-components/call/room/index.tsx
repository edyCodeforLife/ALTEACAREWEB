import { Fragment, memo, useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { CustomConLogin } from '../../register/register';
import { Prompt } from 'react-router-dom';
import Video, { createLocalTracks, createLocalAudioTrack } from 'twilio-video';
import {
	Icon,
}
	from '../../../basic-elements/mobile-container/index';
import { FlexOneCustom } from '../../list-doctor/mobileListDoctor/index';
import { clone } from 'lodash';
import { isPermissionDenied } from '../../../../data/global/function';
import Participant from '../participant/index';
import { map } from 'lodash';
import useDevices from '../../../../data/hooks/use-devices';
import { FlexRowCenter, FlexRow, Flex } from '../../../basic-elements/flex';
import { FlexRowSpaceBetween } from '../../home/appointment-carousel/appointment-box';
import { ImageLogo } from '../../../navbar/navbar';
import { Timer } from '../../../timer/index';
import CallInfo from '../../../../assets/image/icons/call_info.png';
import useScreenShareToggle from '../../../../data/hooks/use-screenShareToggle';
import useScreenShareParticipant from '../../../../data/hooks/use-screenShareParticipant'
import { AltAlert } from '../../../alert';
import { CurtainChat } from '../chat/index';
import { Client } from 'twilio-chat';
import { SignalBar } from '../../../signal-bar/signal';
import TwilioSignal from '../signal/signal-speed';
import { LabelText } from '../../landing/doctor/doctor';
import { Loading } from '../../../loading/index';
import useParticipantIsReconnecting from '../../../../data/hooks/use-participantIsReconnecting';
import IconPerson from '../../../../assets/image/image_person.png';
import AudioLevelIndicator from '../audio-indicator/audio-indicator';

export const CustomCallContainer = styled(CustomConLogin)`
	background: #8F90A6;
	position: initial !important;
	display: flex;
		@media (max-width: 768px) {
			padding-left: 0px;
			padding-right: 0px;
			max-width: auto;
	}
`;

export const RoomLayout = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	overflow: hidden;
`;

export const RemoteParticipantLayout = styled(FlexRowCenter)`
	position: absolute;
	width: 100%;
	height: 100%;
	background: #3A3A3C;
	box-sizing: border-box;
`;

export const LocalParticipantContainer = styled(FlexRowCenter)`
	position: absolute;
	border-radius: 10px;
	background: #6B7588;
	box-sizing: border-box;
	width: 150px;
	height: 183px;
	bottom: 65px;
	right: 15px;
		@media (max-width: 768px) {
			width: 138px;
			height: 175px;
			bottom: 78px;
			right: 22px;
	}
`;

const HeaderCall = styled(FlexRowSpaceBetween)`
	position: absolute;
	top: 0;
	width: 100%;
	min-height: 10px;
	z-index: 999;
	background: rgba(58, 58, 60, 0.5);
	padding: 10px;
	color: #fff;
	box-sizing: border-box;
`;

const SignalContainer = styled(FlexRowSpaceBetween)`
	position: absolute;
	top: 10%;
	left: 15px;
	box-sizing: border-box;
	padding:10px 13px;
	border-radius: 15px;
	z-index: 999;
	background: #6B7588;
	width: 135px;
	max-width: 200px;
`;

const FooterCall = styled(FlexRowCenter)`
	position: absolute;
	bottom: 0;
	width: 100%;
	min-height: 10px;
	z-index: 999;
	background: #3A3A3C;
	padding: 10px;
	color: #fff;
	box-sizing: border-box;
`;

const BtnEndCall = styled.button`
	background: #EB5757;
	padding: 8px;
	color: #fff;
	border-radius: 6px;
	border: none;
	cursor: pointer;
	margin-left: 15px;
`;

const NameTag = styled.div`
	color: #fff;
	background: rgba(58, 58, 60, 0.5);
	padding: 4px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
	font-size: 14px;
	z-index: 999;
	position: absolute;
	white-space: pre-line;
	bottom: ${(props) => props.bottomD}px;
	left: ${(props) => props.leftD}px;
		@media (max-width: 768px) {
			left: 5px;
			bottom: ${(props) => props.bottomM}px !important;
			top: ${(props) => props.topM}px !important;
	}
`;

const TextTools = styled.div`
	color: #fff;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
`;

const CustomFlexContainer = styled(Flex)`
	padding: 0px 14px;
	position: relative;
	cursor: pointer;
		@media (max-width: 768px) {
			padding: 0px 20px;
	}
`;

const RedDot = styled.div`
	border-radius: 50%;
	position: absolute;
	height: 10px;
	width: 10px;
	background-color: red;
	display: block;
	right: 18px;
`;

const NameText = styled.span`
	line-height: 1.8;
	margin-left: 5px;
	font-size: 12px;
`;

const FlexRowCustomize = styled(FlexRow)`
	line-height: 2.4;
`;

const ReconnectingNotif = styled(FlexRow)`
	justify-content: flex-start;
	white-space: pre-line;
	width: 100%;
	background: #6B7588;
	padding: 10px;
	position: absolute;
	top: 8%;
	box-sizing: border-box;
	z-index: 999;
`;

export const ContainerImageLoader = styled.div`
	background: ${(props) => props.isBackgroundColorActive ? "#fff" : 'none'};
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
	bottom: ${props => props.bottom};
    position: relative;
    margin: 0 auto;
    border-radius: 100%;
    border: ${(props) => props.isBackgroundColorActive ? "solid 5px #fff" : 'solid 5px transparent'};
    animation: ${(props) => props.activeAnimation ? "call 2s ease infinite" : "none"} ;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
`;

export const CustomImageLogo = styled(ImageLogo)`
	border-radius: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
`;

function _Room(props: any) {

	const _audioLeve: any = {
		localAudioLevel: null,
		remoteAudioLevel: null
	}
	const { appointmentDetail, method, handleOutRoom, setLastTime, appointmentDescription } = props;
	require('events').EventEmitter.defaultMaxListeners = 15;
	const [room, setRoom] = useState(null);
	const [participants, setParticipants] = useState([]);
	const { audioInputDevices } = useDevices();
	const [token, setToken] = useState(appointmentDetail?.token);
	const [endTime, setEndTime] = useState(false);
	const isRoomInactive = useRef(false);
	const [mute, setMute] = useState({ audioMute: false, videoMute: false });
	const trackToggleRef = useRef(false);
	const remoteNameTag = participants[0]?.identity.split("@")[0];
	const localNameTag = appointmentDetail?.identity.split("@")[0];
	// const [isRemoteAudioEnable, setIsRemoteAudioEnable] = useState(true);
	const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room?.room);
	const localParticipant = room?.room.localParticipant;
	const isParticipantReconnecting = useParticipantIsReconnecting(localParticipant);
	const screenShareParticipantDisplay = useScreenShareParticipant(room?.room);
	const remoteScreenShareParticipant = screenShareParticipantDisplay !== localParticipant ?
		screenShareParticipantDisplay : null;
	const connection = navigator["connection"] || navigator["mozConnection"] || navigator["webkitConnection"];
	const type = connection?.effectiveType;
	const mediaDevices: any = navigator?.mediaDevices;
	const isScreenShareSupported = mediaDevices && mediaDevices.getDisplayMedia;
	const isCameraPermissionDenied = isPermissionDenied('camera');
	const isMicrophonePermissionDenied = isPermissionDenied('microphone');
	const [openChat, setOpenChat] = useState(false);
	const isChatWindowOpenRef = useRef(false);
	const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
	const [chatClient, setChatClient] = useState<Client>();
	const [conversation, setConversation] = useState<any | null>(null);
	const [messages, setMessages] = useState([]);
	const assert = require("assert");
	const { mbps } = TwilioSignal();
	const [reconnecting, setReconnecting] = useState(false);
	const [isParticipantConnected, setIsParticipantConnected] = useState(false);
	const imagePatient = appointmentDescription?.parent_user?.avatar?.formats?.medium;
	const imageDoctor = appointmentDescription.doctor?.photo?.url;
	const [failedConnectTwilio, setFailedConnectTwilio] = useState(false);
	const [localAudioTrack, setLocalAudioTrack] = useState(null);
	const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);

	const audioTrackLocal = () => {
		if (room) {
			const newRoom = clone(room);
			newRoom?.room.localParticipant["audioTracks"].forEach(function (trackPublication) {
				setLocalAudioTrack(trackPublication?.track);
			});
		}
	}

	useEffect(() => {
		audioTrackLocal();
	}, [localParticipant])

	const handleModal = (open: boolean) => {
		setOpenChat(open);
	}

	const remoteParticipants = () => {
		return map(participants, (item, idx) => {
			return (
				<Participant
					key={idx}
					participant={remoteScreenShareParticipant ? remoteScreenShareParticipant : item}
					videoheight={"100%"}
					videowidth={"100%"}
					data={appointmentDetail ?? false}
					reconnecting={reconnecting}
					// handleRemoteTrackAudio={handleRemoteTrackAudio}
					isParticipantConnected={isParticipantConnected}
					handleAudioRemote={handleAudioRemote}
					{...props}
				/>
			)
		})
	}

	const audioChanged = () => {
		if (!audioInputDevices[0]) return;
		const newRoom = clone(room);

		if (room !== null) {
			newRoom?.room.localParticipant["audioTracks"].forEach(function (trackPublication) {
				trackPublication.track.stop();
				newRoom?.room.localParticipant.unpublishTrack(trackPublication.track);
				// newRoom?.room.localParticipant.publishTrack(trackPublication.track);
			});
			createLocalAudioTrack({ deviceId: { exact: audioInputDevices[0].deviceId } }).then((localTrack) => {
				newRoom?.room.localParticipant.publishTrack(localTrack);
			});

		};

		setRoom(newRoom);
	}

	useEffect(() => {
		navigator.mediaDevices.ondevicechange = async (event) => {
			await audioChanged();
		}
	}, [room])

	// const handleRemoteTrackAudio = (trackAudio) => {
	// 	setIsRemoteAudioEnable(trackAudio)
	// }

	useEffect(() => {
		const participantConnected = participant => {
			setIsParticipantConnected(true)
			setReconnecting(false);
			setParticipants(prevParticipants => [...prevParticipants, participant]);
		};

		const participantDisconnected = participant => {
			setIsParticipantConnected(false)
			setReconnecting(false);
			setParticipants(prevParticipants =>
				prevParticipants.filter(p => p !== participant)
			);
		};
		const audioInput = audioInputDevices[0];
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			const audioInput = devices.find(device => device.kind === 'audioinput');
			createLocalTracks({
				audio: { deviceId: audioInput?.deviceId },
				video: appointmentDetail?.enable.video ? {
					// height: 480,
					// width: 640,
					frameRate: 24,
					facingMode: 'user'
				} : appointmentDetail.enable?.video,

				// bandwidthProfile: {
				// 	video: {
				// 		mode: 'collaboration',
				// 		dominantSpeakerPriority: 'standard',
				// 		contentPreferencesMode: 'auto',
				// 		clientTrackSwitchOffControl: 'auto',
				// 		maxSubscriptionBitrate: 2500000,
				// 	}
				// }
			}).then((localTrack) => {
				return Video.connect(token, {
					name: appointmentDetail?.room_code,
					tracks: localTrack,
					maxAudioBitrate: 16000,
					dominantSpeaker: true,
					preferredAudioCodecs: ['isac'],
					preferredVideoCodecs: ['VP8'],
					region: 'gll',
				})
			}).then(room => {
				setRoom({
					room,
					roomName: appointmentDetail?.room_code,
					identity: appointmentDetail?.identity,
					token: appointmentDetail?.token,
					roomCode: appointmentDetail?.room_code,
					audio: appointmentDetail.enable?.voice,
					video: appointmentDetail.enable?.video
				});
				room.on('participantConnected', participantConnected);
				room.on('participantDisconnected', participantDisconnected);
				room.on('reconnecting', error => {
					assert?.equal(room.state, 'reconnecting');
					if (error.code === 53001) {
						setReconnecting(true)
						setIsParticipantConnected(false)
						console.log('Reconnecting your signaling connection!', error.message);
					} else if (error.code === 53405) {
						setReconnecting(true)
						setIsParticipantConnected(false)
						console.log('Reconnecting your media connection!', error.message);
					}
					/* Update the application UI here */
				});
				room.on('reconnected', () => {
					assert?.equal(room.state, 'connected');
					setIsParticipantConnected(true);
					setReconnecting(false)
					console.log('Reconnected your signaling and media connections!');
					/* Update the application UI here */
				});
				room.participants.forEach(participantConnected);
			}, function (error) {
				setFailedConnectTwilio(true);
				console.log(error);
			});
			connectChat(token);

			return () => {
				disconnectRoom();
			}
		})
	}, [appointmentDetail]);

	useEffect(() => {
		return () => {
			setToken(null);
			disconnectRoom();
		}
	}, []);

	useEffect(() => {
		// If the chat window is closed and there are new messages, set hasUnreadMessages to true
		if (!isChatWindowOpenRef.current && messages.length) {
			setHasUnreadMessages(true);
		}
	}, [messages]);

	useEffect(() => {
		isChatWindowOpenRef.current = openChat;
		if (openChat) setHasUnreadMessages(false);
	}, [openChat]);

	const disconnectRoom = () => {
		const participantDisconnected = participant => {
			setIsParticipantConnected(false)
			setReconnecting(false);
			setParticipants(prevParticipants =>
				prevParticipants.filter(p => p !== participant)
			);
		};
		if (room) {
			isRoomInactive.current = true;
			setRoom(currentRoom => {
				if (currentRoom.room?.localParticipant.state === 'connected') {
					currentRoom.room?.localParticipant.tracks.forEach(function (trackPublication) {
						trackPublication.track?.stop();
						trackPublication.track?.disable();
						const attachedElements = trackPublication.track.detach();
						attachedElements.forEach(element => element.remove());
						currentRoom.room?.localParticipant.unpublishTrack(trackPublication.track);
					});
					currentRoom.room?.disconnect();
					return null;
				} else {
					currentRoom?.room
						.off('disconnected', participantDisconnected)
						.off('reconnected', () => {
							assert?.equal(room.state, 'connected');
							setReconnecting(false)
						})
						.off('reconnecting', error => {
							assert?.equal(room.state, 'reconnecting');
							setReconnecting(false)
						});
					return currentRoom;
				}
			});
		} else {
			handleOutRoom(3);
		}
	}

	useEffect(() => {
		if (room) {
			if (room?.room.state === "disconnected") {
				setIsParticipantConnected(false);
				setReconnecting(false);
				AltAlert.show({
					title: "INFO",
					subtitle: "Maaf panggilan anda telah terputus. Silahkan tekan tombol akhiri panggilan dan  menghubungi kembali lewat konsultasi saya.",
					type: 'info',
				});
			}
		}
	}, [room?.room.state])

	// useEffect(() => {
	// 	if (room !== null && room.room?.localParticipant.state === 'disconnected') {
	// 		setRoom(null);
	// 		handleOutRoom(3);
	// 	}
	// }, [room]);

	// useEffect(() => {
	// 	if (isParticipantReconnecting) {
	// 		const interval = setInterval(() => {
	// 			isParticipantReconnecting
	// 		}, 120000);

	// 		return () => {
	// 			clearInterval(interval);
	// 			if (interval) {
	// 				handleOutRoom(3);
	// 			}
	// 		}
	// 	}
	// }, [isParticipantReconnecting])

	useEffect(() => {
		isRoomInactive.current && handleOutRoom(3);
	}, [room]);

	const handleOut = () => {
		setEndTime(true)
		setTimeout(() => {
			disconnectRoom();
			handleOutRoom(3)
		}, 250);
	}

	const handleClicked = (key) => {
		if (reconnecting) return;
		trackToggleRef.current = true;
		let newData = {};
		newData[key] = !mute[key];
		setMute({ ...mute, ...newData })

	}

	const handleRoomMuteUnmute = () => {
		const newRoom = clone(room);
		newRoom?.room.localParticipant["audioTracks"].forEach(function (trackPublication) {
			if (mute.audioMute) {
				trackPublication.track?.disable();
			} else {
				trackPublication.track?.enable();
			}
		});

		newRoom?.room.localParticipant["videoTracks"].forEach(function (trackPublication) {
			if (mute.videoMute) {
				trackPublication.track?.disable();
			} else {
				trackPublication.track?.enable();
			}
		});
		setRoom(newRoom)
	}

	useEffect(() => {
		trackToggleRef.current && handleRoomMuteUnmute();
	}, [mute]);

	const handleToggleScreenShare = () => {
		if (reconnecting) return;
		if (isScreenShareSupported) {
			toggleScreenShare();
		} else {
			AltAlert.show({
				title: "Maaf",
				subtitle: 'Share Screen tidak di support oleh browser yang anda gunakan.',
				type: 'warning',
			});
		}
	}

	const connectChat = useCallback(
		async (token: string) => {
			const Chat = require('twilio-chat');
			const client = await Chat.Client.create(token, {
				identity: appointmentDetail?.identity,
				roomCode: appointmentDetail?.room_code
			});
			//@ts-ignore
			window.chatClient = client;
			setChatClient(client)
		},
		[]
	);

	const handleAudioRemote = (trackAudioRemote) => {
		setRemoteAudioTrack(trackAudioRemote)
	}

	useEffect(() => {
		if (room?.room && chatClient) {
			chatClient
				.getChannelByUniqueName(appointmentDetail?.room_code)
				.then((channel: any) => {
					if (channel.channelState?.status !== "joined") {
						channel.join?.();
					}
					//@ts-ignore
					window.chatConversation = channel;
					setConversation(channel);
				})
				.catch(() => {
					const channel: any = chatClient.createChannel({
						uniqueName: appointmentDetail?.room_code,
						friendlyName: appointmentDetail?.identity,
					});
					if (channel.channelState?.status !== "joined") {
						channel.join?.();
					}
				});
		}
	}, [room, chatClient]);

	useEffect(() => {
		if (conversation) {
			const handleMessageAdded = (message: any) => setMessages(oldMessages => [...oldMessages, message]);
			conversation.getMessages?.().then(newMessages => setMessages(newMessages?.items));
			conversation.on?.('messageAdded', handleMessageAdded);
			return () => {
				conversation.off?.('messageAdded', handleMessageAdded);
			};
		}
	}, [conversation]);

	return (

		<CustomCallContainer>
			{room?.room.localParticipant.state === "connected" && (
				<Prompt message={location => disconnectRoom()} />
			)}
			<RoomLayout>
				<HeaderCall>
					<ImageLogo
						src={CallInfo}
						width={30}
						height={30}
					/>
					<FlexRowCustomize>
						<Timer
							endTime={endTime}
							setLastTime={setLastTime}
						/>

						<BtnEndCall onClick={() => handleOut()}>
							Akhiri Panggilan
						</BtnEndCall>
					</FlexRowCustomize>

				</HeaderCall>
				<RemoteParticipantLayout>
					{room ?
						isParticipantConnected ? (
							mbps && (
								<SignalContainer>
									<SignalBar
										height={15}
										width={40}
										signal={mbps}
									/>
									<LabelText
										color={"#fff"}
										fsize={12}
									>
										{mbps} {mbps && "mbps"}
									</LabelText>
								</SignalContainer>
							)
						) : (

							<ReconnectingNotif>
								{reconnecting && (
									<FlexOneCustom flex={"12% 0 0"}>
										<Loading size={30} color={"#EB5757"} />
									</FlexOneCustom>
								)}
								<LabelText
									color={"#fff"}
									fsize={12}
									talign={'left'}
								>
									{reconnecting && !isParticipantConnected ?
										"Koneksi sedang tidak stabil. Mencoba menghubungkan kembali."
										:
										"Maaf panggilan anda telah terputus. Silahkan tekan tombol akhiri panggilan dan  menghubungi kembali lewat konsultasi saya."
									}
								</LabelText>
							</ReconnectingNotif>

						) :
						failedConnectTwilio ?
							(
								<ReconnectingNotif>
									<LabelText
										color={"#fff"}
										fsize={12}
										talign={'left'}
									>
										Maaf anda tidak dapat terhubung. Silahkan tekan tombol akhiri panggilan dan cek koneksi anda. Anda dapat melakukan panggilan ulang di menu konsultasi saya.
									</LabelText>
								</ReconnectingNotif>
							)
							:
							(
								<ReconnectingNotif>
									<FlexOneCustom flex={"12% 0 0"}>
										<Loading size={30} color={"#f1c40f"} />
									</FlexOneCustom>
									<LabelText
										color={"#fff"}
										fsize={12}
										talign={'left'}
									>
										Sedang Menghubungkan...
									</LabelText>
								</ReconnectingNotif>
							)
					}

					{imageDoctor && method === "CONSULTATION_CALL" ? (
						<ContainerImageLoader activeAnimation={room?.room.state !== "disconnected"} isBackgroundColorActive={true} height={120} width={120}>
							<CustomImageLogo
								src={imageDoctor}
								height={120}
								width={120}
							/>
						</ContainerImageLoader>
					) : (
						<ContainerImageLoader activeAnimation={room?.room.state !== "disconnected"} height={120} width={120}>
							<CustomImageLogo
								src={IconPerson}
								height={120}
								width={120}
							/>
						</ContainerImageLoader>
					)}
					{/* <Icon
						icon={"person"}
						color={"#C7C9D9"}
						fsize={250}
					/> */}

					{
						remoteParticipants()
					}
				</RemoteParticipantLayout>
				{participants.length > 0 && (
					<NameTag
						bottomD={75}
						leftD={7}
						bottomM={88}
					>

						<AudioLevelIndicator audioTrack={remoteAudioTrack} color="white" />

						{/* <Icon
							style={{ position: 'relative', top: 5 }}
							fsize={18}
							color={isRemoteAudioEnable ? "#FFFFFF" : "#FF5C5C"}
							icon={isRemoteAudioEnable ? "mic" : "mic_off"}
						/> */}
						<NameText>
							{remoteNameTag}
						</NameText>
					</NameTag>
				)}
				<LocalParticipantContainer>
					{imagePatient ? (
						<ContainerImageLoader activeAnimation={room?.room.state !== "disconnected"} isBackgroundColorActive={true} height={30} width={30}>
							<CustomImageLogo
								src={imagePatient}
								height={30}
								width={30}
							/>
						</ContainerImageLoader>
					) : (
						<ContainerImageLoader activeAnimation={room?.room.state !== "disconnected"} height={30} width={30}>
							<CustomImageLogo
								src={IconPerson}
								height={30}
								width={30}
							/>
						</ContainerImageLoader>
					)}
					{room ? (
						<Fragment>
							<Participant
								key={room?.room.localParticipant.sid}
								participant={room?.room.localParticipant}
								videoheight={"100%"}
								videowidth={"100%"}
								data={appointmentDetail}
								// handleRemoteTrackAudio={handleRemoteTrackAudio}
								reconnecting={reconnecting}
								isParticipantConnected={isParticipantConnected}
								handleAudioRemote={handleAudioRemote}
								{...props}
							/>

							<NameTag
								bottomD={10}
								leftD={2}
								bottomM={10}
							>
								{/* <Icon
									style={{ position: 'relative', top: 5 }}
									fsize={18}
									color={mute.audioMute ? "#FF5C5C" : "#FFFFFF"}
									icon={mute.audioMute ? "mic_off" : "mic"}
								/> */}

								<AudioLevelIndicator audioTrack={localAudioTrack} color="white" />
								<NameText>
									{localNameTag}
								</NameText>
							</NameTag>
						</Fragment>

					) : (
						''
					)}
				</LocalParticipantContainer>
				<FooterCall>
					<CustomFlexContainer onClick={() => handleClicked("audioMute")}>
						<Icon
							style={{ transform: 'rotateY(180deg)' }}
							color={mute.audioMute ? "#FF5C5C" : "#FFFFFF"}
							icon={mute.audioMute ? "mic_off" : "mic"}
						/>
						<TextTools>
							{mute.audioMute ? "Stop Mic" : "Mic Aktif"}
						</TextTools>
					</CustomFlexContainer>

					<CustomFlexContainer onClick={() => handleClicked("videoMute")}>
						<Icon
							color={appointmentDetail.enable?.video && !mute.videoMute ? "#FFFFFF" : "#FF5C5C"}
							icon={appointmentDetail.enable?.video && !mute.videoMute ? "videocam" : "videocam_off"}
						/>
						<TextTools>
							{appointmentDetail.enable?.video && !mute.videoMute ? "Video Aktif" : "Stop Video"}
						</TextTools>
					</CustomFlexContainer>

					<CustomFlexContainer onClick={() => handleToggleScreenShare()}>
						<Icon
							icon={"screen_share"}
						/>
						<TextTools>
							{isSharingScreen ? 'Stop Layar' : 'Berbagi Layar'}
						</TextTools>
					</CustomFlexContainer>
					<CustomFlexContainer onClick={() => { handleModal(true) }}>
						{hasUnreadMessages && (<RedDot />)}
						<Icon
							icon={"chat_bubble"}
						/>
						<TextTools>
							Pesan
						</TextTools>
					</CustomFlexContainer>
				</FooterCall>
			</RoomLayout>
			<CurtainChat
				open={openChat}
				handleModal={handleModal}
				messages={messages}
				localParticipant={localParticipant}
				conversation={conversation}
				{...props}
			/>
		</CustomCallContainer>
	);
}

export const Room = memo(_Room);