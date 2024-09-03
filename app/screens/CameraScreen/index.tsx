// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {Font_SEMIBOLD} from '../../themes/typography';
// import PrimaryButton from '../../components/PrimaryButton';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Video, {VideoRef} from 'react-native-video';
// import {ArrowRight} from '../../../assets/icons/icons';
// import {styles} from './style';
// import {BASE_URL, MOTION_AI_URL} from '../../constants';
// import {useSelector} from 'react-redux';

// const CameraScreen = () => {
//   const navigation = useNavigation();
//   const videoRef = useRef<VideoRef>(null);
//   const {video} = useRoute().params;

//   const auth = useSelector(state => state.authSlice);

//   const [videoUrl, setVideoUrl] = useState(video.path);

//   console.log(video);

//   async function handelMotionApi() {
//     const formData = new FormData();
//     formData.append('video', {
//       uri: video.path,
//       type: video.mime,
//       name: 'video.mp4',
//     });

//     console.log(formData);

//     try {
//       const res = await fetch(`${MOTION_AI_URL}/analyze_yoga`, {
//         method: 'POST',
//         body: formData,
//         // headers: {
//         //   'Content-Type': 'multipart/form-data',
//         // },
//       });

//       if (!res.ok) {
//         throw new Error('Network response was not ok ' + res.statusText);
//       }

//       const data = await res.json();

//       let filteredData = data.filter(item => Object.keys(item).length !== 0);

//       console.log('RESPONSE', filteredData);
//       console.log('RESPONSE', data);

//       // Sum the calories_burned
//       let totalCaloriesBurned = filteredData.reduce((sum, item) => {
//         return sum + (item.calories_burned || 0);
//       }, 0);

//       console.log(totalCaloriesBurned);

//       let removeDuplicateData = removeDuplicates(filteredData);

//       if (removeDuplicateData.length > 0) {
//         const isTrue = await sendMotionAiDataForReport(
//           String(video.duration),
//           totalCaloriesBurned,
//           filteredData.length,
//         );

//         if (isTrue) {
//           navigation.navigate('FeedbackScreen', {data: removeDuplicateData});
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   function removeDuplicates(data) {
//     const seen = new Set();
//     const uniqueData = [];

//     data.forEach(item => {
//       const itemString = JSON.stringify(item);
//       if (!seen.has(itemString)) {
//         seen.add(itemString);
//         uniqueData.push(item);
//       }
//     });

//     return uniqueData;
//   }

//   return (
//     <View style={{flex: 1, backgroundColor: '#FFF'}}>
//       <StatusBar translucent={false} barStyle={'dark-content'} />
//       <SafeAreaView />

//       <ScrollView
//         contentContainerStyle={{
//           paddingVertical: heightPercentageToDP('4'),
//           paddingHorizontal: heightPercentageToDP('3'),
//           flexGrow: 1,
//           justifyContent: 'space-between',
//           backgroundColor: '#fff',
//         }}
//         automaticallyAdjustKeyboardInsets={true}
//         showsVerticalScrollIndicator={false}>
//         <View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
//               onPress={() => navigation.goBack()}>
//               <ArrowRight />
//               <Text style={styles.backText}>Get Feedback</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{marginTop: heightPercentageToDP('3')}}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 gap: widthPercentageToDP('5'),
//               }}>
//               <View style={{flex: 1}}>
//                 <Video
//                   fullscreen={true}
//                   controls={true}
//                   pictureInPicture={true}
//                   source={{uri: videoUrl}}
//                   ref={videoRef}
//                   resizeMode="contain"
//                   style={{
//                     height: 560,
//                     borderRadius: 20,
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             paddingHorizontal: widthPercentageToDP('4'),
//             marginBottom: 40,
//           }}>
//           <PrimaryButton
//             style={{height: 74}}
//             onPress={handelMotionApi}
//             // onPress={() => navigation.navigate('CameraScreen')}
//           >
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: '600',
//                 lineHeight: 33,
//                 fontFamily: Font_SEMIBOLD,
//               }}>
//               Get Feedback
//             </Text>
//           </PrimaryButton>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default CameraScreen;

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {millisecondsToMinutes, milliseconds} from 'date-fns';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {io, Socket} from 'socket.io-client';
import {BASE_URL, IP_ADDRESS, MOTION_AI_URL} from '../../constants';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const socket = useRef(null);
  const [res, setRes] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [processingData, setProcessingData] = useState<number[] | null>(null);
  let imageQueue = [];
  const navigation = useNavigation();

  const auth = useSelector(state => state.authSlice);

  useEffect(() => {
    // socket.current = io(`ws://${IP_ADDRESS}:5000`, {
    //   transports: ['websocket'],
    //   reconnection: true,
    //   reconnectionAttempts: 10,
    //   reconnectionDelay: 2000,
    // });
    socket.current = io('https://api.ai.techjinc.com/', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      processQueue();
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.current.on('connect_error', error => {
      console.error('WebSocket connection error:', error);
    });

    socket.current.on('analysis_result', result => {
      console.log('Received analysis result:', result);
      setRes(result.hands_gripped_status);

      setProcessingData(prev => {
        const newValue = Number(result.calories_burned);
        return prev ? [...prev, newValue] : [newValue];
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const processQueue = () => {
    if (imageQueue.length > 0 && socket.current.connected) {
      const image = imageQueue.shift();
      socket.current.emit('send_frame', image);
    }
  };

  useEffect(() => {
    if (!isCameraActive) {
      setRes(null);
      return;
    }

    const intervalId = setInterval(() => {
      if (socket.current.connected) {
        captureAndSendPhoto();
        setDuration(prev => (prev += 5000));
      } else {
        console.log('WebSocket not connected, skipping capture.');
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [device, isCameraActive]);

  useEffect(() => {
    if (!isCameraActive) {
      if (processingData != undefined && processingData?.length > 0) {
        setRes(null);
        console.log('Camera is not active');
        handelProcessing();
      }
    }
  }, [isCameraActive]);

  const captureAndSendPhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        console.log('Captured Photo:', photo);

        const resizedImage = await ImageResizer.createResizedImage(
          photo.path,
          800,
          800,
          'JPEG',
          70,
        );
        const fileData = await RNFS.readFile(resizedImage.uri, 'base64');
        if (fileData) {
          imageQueue.push(fileData);
          processQueue();
        }
      } catch (error) {
        console.error('Error capturing or queuing photo:', error);
      }
    }
  };

  const handelProcessing = async () => {
    // Sum the calories_burned
    let totalCaloriesBurned = processingData?.reduce((sum, item) => {
      return sum + (item || 0);
    }, 0);

    console.log(totalCaloriesBurned);
    const isTrue = await sendMotionAiDataForReport(
      String(duration),
      totalCaloriesBurned!,
      processingData?.length!,
    );

    if (isTrue) {
      navigation.goBack();
    }
  };

  async function sendMotionAiDataForReport(
    duration: string,
    kcal: number,
    movements: number,
  ) {
    try {
      let sendData = {
        duration,
        kcal,
        movements,
      };

      const res = await fetch(`${BASE_URL}/api/v1/progress/create`, {
        method: 'POST',
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      const data = await res.json();

      console.log('DATA:', data);
      console.log('DATA:', millisecondsToMinutes(data.report.duration));
      console.log('DATA:', milliseconds(data.report.duration));

      return true;
    } catch (error) {
      console.error('CREATE REPORT ERROR:', error);
      return false;
    }
  }

  if (!hasPermission) return requestPermission();
  if (device == null) return <Text style={{color: '#000'}}>No Device</Text>;

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Camera
        ref={cameraRef}
        style={{flex: 1}}
        device={device}
        isActive={true}
        photo={true}
        outputOrientation="device"
      />

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsCameraActive(!isCameraActive);
          }}
          style={{
            backgroundColor: isCameraActive ? 'green' : 'red',
            width: 60,
            height: 60,
            borderRadius: 50,
          }}
        />
      </View>

      {res && (
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            top: 20,
            left: 20,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
            {res}
          </Text>
        </View>
      )}
    </View>
  );
}
