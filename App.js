import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import CallScreen from './screens/CallScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

import Peer from 'react-native-peerjs';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
// import { TextInput } from 'react-native-paper';

// const Stack = createStackNavigator();

// npx react-native run-android  ./gradlew assembleRelease

const App = () => {

  const [localStream, setLocalStream] = useState({toURL: () => null});
  const [remoteStream, setRemoteStream] = useState({toURL: () => null});

  const [remotePeerId, setRemotePeerId] = useState('')
  const [peerId, setPeerId] = useState('')

  const [text, setText] = useState('')
  const [textRevers, setTextRevers] = useState('')

  const [callFlag, setCallFlag] = useState(false)

  const yourConn = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:srv3.callshark.ru:80",
      },
      {
        urls: "turn:srv3.callshark.ru:80?transport=tcp",
        username: "username1",
        credential: "kfpolser"
    }
    ]
  })

  const callOptions = {'iceServers': [
		{
      url: "turn:srv3.callshark.ru:80?transport=tcp",
      username: "username1",
      credential: "kfpolser"
  },
		{ url: "stun:srv3.callshark.ru:80"}
  ]
	}; 
  
  //, { host: 'ipbase.mooo.com', port: 443, path: '/myapp', secure: true, debug: 2, iceServers: [{ "url": "stun:stun.l.google.com:19302" }, { "url": "stun:srv3.callshark.ru:80"}, { "url": "stun:e1.xirsys.com" }, { "credential": "kfpolser", "urls": ["turn:srv3.callshark.ru:80"], "username": "username1" }] }
  
useEffect(()=>{
  const peer = new Peer(peerId/*roomId,*/, {debug: 2, iceServers: [{'url': "stun:srv3.callshark.ru:80"}, {
    'urls': "turn:srv3.callshark.ru:80?transport=tcp",
    'username': "username1",
    'credential': "kfpolser"
}]}); 
  
  peer.on('open', peerId => {
    console.log('Local peer open with ID', peerId);
  });

  // if (remotePeerId !== '') {
  //   console.log(1234);
  //   const conn = peer.connect(remotePeerId)

  //   conn.on('open', () => {
  //     console.log('Remote peer has opened connection.');

  //     conn.on('data', data => {console.log('Received from local peer', data)
  //       setRemoteStream(data)
  //     });

  //     conn.send(peerId);
  //   });
  // }

  if (remotePeerId !== '') {
    const remotePeer = new Peer(remotePeerId);
    remotePeer.on('open', remotePeerId => {
      console.log('Remote peer open with ID', remotePeerId);
    
      const conn = remotePeer.connect(peerId);

      conn.on('open', () => {
        console.log('Remote peer has opened connection.');

        conn.on('data', data => {console.log('Received from local peer', data)
          setRemoteStream(data)
        });

        conn.send(text);
      });

      var call = peer.call(peerId, localStream);
    });
  }

  peer.on('call', function(call) {
    console.log(call);
    // Answer the call, providing our mediaStream
    call.answer(localStream);
  });

  peer.on('connection', conn => {
    console.log('Local peer has received connection.');

    conn.on('open', () => {
      console.log('Local peer has opened connection.');

      conn.on('data', data => setTextRevers(data));

      conn.send(localStream);
    });
  });

  // peer.on('close', ()=>{
  //   console.log('CLOSE');
  // })
},[callFlag])
      
 
  

  useEffect(() => {
  
  let isFront = false;
  mediaDevices.enumerateDevices().then(sourceInfos => {
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
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
        setLocalStream(stream);

        // setup stream listening
        yourConn.addStream(stream);
      })
      .catch(error => {
        // Log error
        console.log('ERROR ON YOORCONN', error);
      });
  });
  }, []);


  return (
    <View style={styles.content}>
       <View style={styles.videoContainer}>
          <View style={[styles.videos, styles.localVideos]}>
            <Text>Your Video   {(peerId != '')?(<Text>Ваш айди: {peerId}</Text>):(<></>)}</Text>
            <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
          </View>
          <View style={[styles.videos, styles.remoteVideos]}>
            <Text>Friends Video   {(remotePeerId != '')?(<Text>Айди друга: {remotePeerId}</Text>):(<></>)}</Text>
            <RTCView
              streamURL={localStream.toURL()}
              style={styles.remoteVideo}
            />
        </View>
       </View>
       <View style={styles.bottom}>
         <View style={styles.str}>
          <Text>Введите ваш айди</Text>
          <TextInput 
            style={styles.input}
            value={peerId}
            onChangeText={setPeerId}
          />
         </View>
         <View style={styles.str}>
          <Text>Введите айди друга</Text>
          <TextInput 
            style={styles.input}
            value={remotePeerId}
            onChangeText={setRemotePeerId}
          />
         </View>
       </View>
       <Text style={{marginLeft: 15}}>Введите что хотите отправить при созджании соединения</Text>
          <TextInput 
            style={[styles.input, {marginLeft: 120}]}
            value={text}
            onChangeText={setText}
          />
        {(textRevers != '')?(<Text>Соединение с сервером установлено. Текст пришедший с сервера: {textRevers}</Text>):(<></>)}
       <Button
        title='отправить другу'
        onPress={()=>{!callFlag?setCallFlag(true):setCallFlag(false)}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',

  },
  bottom: {
    display: 'flex',
    flexDirection: 'row'
  },
  str: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    width: 150
  },
  root: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    minHeight: 250,
  },
  videos: {
    width: '100%',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',

    borderRadius: 6,
  },
  localVideos: {
    height: 250,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 250,
  },
  localVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  remoteVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  videoContainer: {
    
    minHeight: 250,
    display: 'flex',
    flexDirection: 'row'
  },
});

export default App;
