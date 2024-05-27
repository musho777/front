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

export default function IncomingCallScreen({ navigation, route, callType = 'AUDIO', callData, hangup, caller }: any) {
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
   
    // console.error(callData)
    
    otherUserId.current = callData.callerId;
   
    socket.on('callEnded', data => {
      
      hangup()
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


    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, []);


  function sendICEcandidate(data) {
    socket.emit('ICEcandidate', data);
  }


  async function processAccept() {
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

          processAcceptCall()
        })
        .catch(error => {
          // Log error
        });
    });

    const processAcceptCall = async () => {
        peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(callData.rtcMessage),
            );
            const sessionDescription = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(sessionDescription);
            answerCall({
                callerId: otherUserId.current,
          rtcMessage: sessionDescription,
        });
        setType('WEBRTC_ROOM');
    }
    
  }

  async function processHangup() {
    socket.emit('notAnswerCall', {
      callerId: otherUserId.current,
    })
    hangup()
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  const IncomingCallScreen = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
          <ImageBackground blurRadius={1} style={{  flex: 1, justifyContent: 'center', }} source={{ uri: caller.avatar ? `${URL}/auth/pictures/${caller.avatar}` : 'sdfg' }}>

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
                marginTop: 12,
                color: '#ffff',
                letterSpacing: 4,
              }}>
              {caller.fullName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#D0D4DD',
                marginBottom: 350
              }}>
              is calling..
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <TouchableOpacity
                onPress={processAccept}
                style={{
                  backgroundColor: 'green',
                  borderRadius: 50,
                  height: 65,
                  width: 65,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 100
                }}>
                <AcceptCallIcon width={27} height={27} fill={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={processHangup}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 50,
                  height: 65,
                  width: 65,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <AcceptCallIcon style={{transform: [{rotate: '120deg'}]}} width={27} height={27} fill={'white'} />

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
    hangup()
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

          <ImageBackground blurRadius={1} style={{  flex: 1, justifyContent: 'center', }} source={{ uri: caller.avatar ? `${URL}/auth/pictures/${caller.avatar}` : 'sdfg' }}>

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
              {caller.fullName}
            </Text>

            <Text
              style={{
                fontSize: 36,
                marginTop: 12,
                color: '#ffff',
                letterSpacing: 4,
                marginBottom: 240
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
        return IncomingCallScreen();
  }
    
}