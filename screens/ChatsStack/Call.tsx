import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import useAuth from '../../hooks/useAuth';
import { CallURL, URL } from '../../service/api/api'
import AcceptCallIcon from '../../assets/images/acceptcall.svg'
import MicOffIcon from '../../assets/images/micoff.svg'
import WebcamOffIcon from '../../assets/images/webcamoff.svg'
import SwitchCameraIcon from '../../assets/images/switchcamera.svg'
import SpeakerIcon from '../../assets/images/speaker.svg'

const buttonStyle = {
  height: 50,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const IconContainer = ({backgroundColor, onPress, Icon, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        borderRadius: 30,
        height: 60,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon />
    </TouchableOpacity>
  );
};

const TextInputContainer = ({placeholder, value, setValue, keyboardType}) => {
    return (
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202427',
          borderRadius: 12,
          marginVertical: 12,
        }}>
        <TextInput
          style={{
            margin: 8,
            padding: 8,
            width: '90%',
            textAlign: 'center',
            fontSize: 16,
            color: '#FFFFFF',
          }}
          multiline={true}
          numberOfLines={1}
          cursorColor={'#5568FE'}
          placeholder={placeholder}
          placeholderTextColor={'#9A9FA5'}
          onChangeText={setValue}
          value={value}
          keyboardType={keyboardType}
        />
      </View>
    );
  };

export default function CallScreen({ navigation, route, callData }: any) {
  const [localStream, setlocalStream] = useState(null);

  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('JOIN');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { user } = useAuth()

  const callerId = user.id
  const otherUserId = useRef(null);

  const socket = SocketIOClient(CallURL, {
    transports: ['websocket'],
    query: {
      callerId,
    },
  });

  const callType = route.params.callType
  // console.error(callType)

  const [localMicOn, setlocalMicOn] = useState(true);

  const [ localWebcamOn, setlocalWebcamOn ] = useState(callType === 'VIDEO' ? true : false);
  const [ remoteWebcamOn, setRemoteWebcamOn ] = useState(callType === 'VIDEO' ? true : false);

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds!=60) setSeconds(seconds+1)
      else {
        setSeconds(0)
        setMinutes(minutes+1)
      }
    }, 1000)

    return () => clearInterval(interval);
  }, [seconds, minutes])

  useEffect(() => {
    otherUserId.current = route.params.otherUserId.toString()
    socket.on('callAnswered', data => {
      // remoteRTCMessage.current = data.rtcMessage;
      // console.error(data.rtcMessage)
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.rtcMessage),
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('callNotAnswered', data => {
      navigation.goBack()
    });

    socket.on('callEnded', data => {
      navigation.goBack()
    });

    socket.on('webcamToggle', data => {
      remoteWebcamOn ? setRemoteWebcamOn(false) : setRemoteWebcamOn(true)
    });

    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    let isFront = true;

    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!

          setlocalStream(stream);

          // setup stream listening
          peerConnection.current.addStream(stream);

          // console.error(route.params.otherUserId)
          

          processCall()
        })
        .catch(error => {
          // Log error
        });
    });

    peerConnection.current.onaddstream = event => {
      // console.error(event.stream)

      setRemoteStream(event.stream);
    };

    // Setup ice handling
    peerConnection.current.onicecandidate = event => {
      // console.error(event.candidate)
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    };

    // otherUserId.current = receiverId
    

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, []);

  // useEffect(() => {
  //   InCallManager.start();
  //   InCallManager.setKeepScreenOn(true);
  //   InCallManager.setForceSpeakerphoneOn(true);

  //   return () => {
  //     InCallManager.stop();
  //   };
  // }, []);

  function sendICEcandidate(data) {
    socket.emit('ICEcandidate', data);
  }

  async function processCall() {
    setType('OUTGOING_CALL');
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
      callType
    });
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  function sendCall(data) {
    socket.emit('call', data);
  }

  const OutgoingCallScreen = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
          <ImageBackground blurRadius={1} style={{  flex: 1, justifyContent: 'center', }} source={{ uri: route.params.currentUserAvatar ? `${URL}/auth/pictures/${route.params.currentUserAvatar}` : 'sdfg' }}>

          <View
            style={{
              padding: 35,
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#D0D4DD',
              }}>
              Calling to...
            </Text>

            <Text
              style={{
                fontSize: 36,
                marginTop: 12,
                color: '#ffff',
                letterSpacing: 4,
                marginBottom: 240
              }}>
              {route.params.currentUserName}
            </Text>

          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                otherUserId.current = null;
                navigation.goBack()
              }}
              style={{
                backgroundColor: '#FF5D5D',
                borderRadius: 30,
                height: 60,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <AcceptCallIcon style={{transform: [{rotate: '135deg'}]}} width={27} height={27} fill={'white'} />
            </TouchableOpacity>
          </View>
          </ImageBackground>
      </View>
    );
  };

  function switchCamera() {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  }

  // function toggleCamera() {
  //   localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
  //   localStream.getVideoTracks().forEach(track => {
  //     localWebcamOn ? (track.enabled = false) : (track.enabled = true);
  //   });
  // }

  // function toggleMic() {
  //   localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
  //   localStream.getAudioTracks().forEach(track => {
  //     localMicOn ? (track.enabled = false) : (track.enabled = true);
  //   });
  // }

  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
    navigation.goBack()
  }

  const WebrtcRoomScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>

        { !localWebcamOn && !remoteWebcamOn && 

          <ImageBackground blurRadius={1} style={{  flex: 1, justifyContent: 'center', }} source={{ uri: route.params.currentUserAvatar ? `${URL}/auth/pictures/${route.params.currentUserAvatar}` : 'sdfg' }}>

            <View
            style={{
              padding: 35,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 36,
                color: '#ffff',
                letterSpacing: 4,
              }}>
              {route.params.currentUserName}
            </Text>

            <Text
              style={{
                fontSize: 36,
                marginTop: 12,
                color: '#ffff',
                letterSpacing: 4
              }}>
              {minutes}:{seconds}
            </Text>

          </View>
        
          </ImageBackground>
        
        }
        
        {localStream && localWebcamOn ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: '#050A0E'}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream && remoteWebcamOn ? (
          <RTCView
            objectFit={'cover'}
            style={{
              flex: 1,
              backgroundColor: '#050A0E',
              marginTop: 8,
            }}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <IconContainer
            backgroundColor={'red'}
            onPress={() => {
              leave();
              socket.emit('endCall', {user2: otherUserId.current})
            }}
            Icon={() => {
              return <AcceptCallIcon style={{transform: [{rotate: '120deg'}]}} width={27} height={27} fill={'white'} />;
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localMicOn ? '#fff' : 'transparent'}
            onPress={() => {
              if (localMicOn) setlocalMicOn(false)
              if (!localMicOn) setlocalMicOn(true)
            }}
            Icon={() => {
              return localMicOn ? (
                <MicOffIcon width={27} height={27} fill={'white'} />
              ) : (
                <MicOffIcon width={27} height={27} fill={'black'} />
              );
            }}
          />
          {/* <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'#fff'}
            onPress={() => {
              // toggleCamera();
              socket.emit('toggleWebcam', {user2: otherUserId.current})
              if (localWebcamOn) setlocalWebcamOn(false)
              if (!localWebcamOn) setlocalWebcamOn(true)
            }}
            Icon={() => {
              return <WebcamOffIcon width={27} height={27} fill={'white'} />
            }}
          /> */}
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'#fff'}
            onPress={() => {
              // switchCamera();
            }}
            Icon={() => {
              return <SpeakerIcon width={27} height={27} />;
            }}
          />

          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'#fff'}
            onPress={() => {
              switchCamera();
            }}
            Icon={() => {
              return <SwitchCameraIcon width={27} height={27} />;
            }}
          />
        </View>
      </View>
    );
  };

  switch (type) {
    case 'WEBRTC_ROOM':
      return WebrtcRoomScreen();
    default:
      return OutgoingCallScreen();
  }
}