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
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  millisecondsToMinutes,
  milliseconds,
  secondsToMinutes,
  millisecondsToSeconds,
} from 'date-fns';
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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Video, {VideoRef} from 'react-native-video';
import {PauseCircle2Icon, VideoCircle2Icon} from '../../../assets/icons/icons';
import {Font_BLACK, Font_SEMIBOLD} from '../../themes/typography';

type YogaSessionProps = {
  back_angle: number;
  body_line_percentage: number;
  body_turned_status: string;
  calories_burned: number;
  elapsed_time: number;
  front_angle: number;
  hand_body_angle: number;
  hands_gripped_status: string;
  yoga_progress: number;
};

type ShowResultProps = {
  duration: string;
  yoga: number;
  kcal: number;
  id: string;
};

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const videoRef = useRef<VideoRef>(null);

  const device = useCameraDevice('front');
  const {hasPermission, requestPermission} = useCameraPermission();
  const socket = useRef(null);
  const [res, setRes] = useState<YogaSessionProps | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [processingData, setProcessingData] = useState<number[] | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showResult, setShowResult] = useState<ShowResultProps | null>(null);

  let imageQueue = [];
  const navigation = useNavigation();

  const auth = useSelector(state => state.authSlice);

  useEffect(() => {
    videoRef.current?.pause();

    // 'https://api.ai.techjinc.com/'
    socket.current = io(MOTION_AI_URL, {
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

      if (Object.entries(result).length !== 0) {
        console.log('The object is not empty');
        setRes(result);
        setProcessingData(prev => {
          const newValue = Number(result.calories_burned);
          return prev ? [...prev, newValue] : [newValue];
        });
      }
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
      videoRef.current?.pause();
      if (processingData != undefined && processingData?.length > 0) {
        setRes(null);
        console.log('Camera is not active');
        // handelProcessing();
      }
    } else {
      videoRef.current?.resume();
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
    setIsProcessing(true);
    // Sum the calories_burned
    let totalCaloriesBurned = processingData?.reduce((sum, item) => {
      return sum + (item || 0);
    }, 0);

    console.log(totalCaloriesBurned);

    if (totalCaloriesBurned) {
      await handelMotionApi(totalCaloriesBurned);
    }
  };

  const handelMotionApi = async (totalCaloriesBurned: number) => {
    const isTrue = await sendMotionAiDataForReport(
      String(duration),
      totalCaloriesBurned!,
      processingData?.length!,
    );

    if (isTrue) {
      setIsProcessing(false);
      setIsCameraActive(false);
      // navigation.goBack();
    }
  };

  async function sendMotionAiDataForReport(
    duration: string,
    kcal: number,
    movements: number,
  ) {
    console.log(kcal);

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

      setShowResult({
        duration: data.report.duration,
        yoga: data.report.yoga,
        kcal: data.report.kcal,
        id: data.id,
      });

      return true;
    } catch (error) {
      console.error('CREATE REPORT ERROR:', error);
      return false;
    }
  }

  // Triggered when video starts loading to get the duration
  const handleLoad = data => {
    setVideoDuration(data.duration);
  };

  // Triggered while video is playing to get current position
  const handleProgress = async data => {
    setVideoProgress(data.currentTime);

    // Check if the user has watched the entire video
    if (data.currentTime >= videoDuration) {
      setIsVideoWatched(true);
      setIsCameraActive(false);
      // handelProcessing();
    }
  };

  // Triggered when video ends
  const handleEnd = async () => {
    setIsVideoWatched(true);
    setIsCameraActive(false);
    handelProcessing();
  };

  const handelResumePause = () => {
    if (isPaused) {
      videoRef.current?.resume();
      setIsPaused(false);
      setIsCameraActive(true);
    } else {
      videoRef.current?.pause();
      setIsPaused(true);
      setIsCameraActive(false);
    }
  };

  if (!hasPermission) return requestPermission();
  if (device == null) return <Text style={{color: '#000'}}>No Device</Text>;

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={{width: '100%', position: 'relative'}}>
        <Video
          fullscreen={false}
          controls={false}
          pictureInPicture={false}
          source={{
            uri: 'https://yoga-ai-app.s3.amazonaws.com/uploads/85912def-0162-45b2-9e63-8589d0047077.mp4',
          }}
          ref={videoRef}
          resizeMode="contain"
          style={{
            height: '100%',
          }}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={handleEnd}
        />
      </View>
      <View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 20,
          width: 400,
          height: 200,
          borderRadius: 20,
          borderColor: 'red',
          borderWidth: 4,
          overflow: 'hidden',
        }}>
        <Camera
          ref={cameraRef}
          style={{
            flex: 1,
          }}
          device={device}
          isActive={true}
          photo={true}
          outputOrientation="device"
        />
      </View>

      {showResult && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3333,
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              height: '20%',
              width: '60%',
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                gap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{fontSize: 20, color: '#000', fontFamily: Font_BLACK}}>
                  Total Duration:
                </Text>
                <Text
                  style={{
                    fontFamily: Font_SEMIBOLD,
                    fontSize: 20,
                    color: '#000',
                  }}>
                  {millisecondsToMinutes(Number(showResult.duration))
                    ? millisecondsToMinutes(Number(showResult.duration)) +
                      ' minutes'
                    : millisecondsToSeconds(Number(showResult.duration)) +
                      ' seconds'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{fontSize: 20, color: '#000', fontFamily: Font_BLACK}}>
                  Calories you Burned:
                </Text>
                <Text
                  style={{
                    fontFamily: Font_SEMIBOLD,
                    fontSize: 20,
                    color: '#000',
                  }}>
                  {showResult.kcal}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{fontSize: 20, color: '#000', fontFamily: Font_BLACK}}>
                  Movements you make:
                </Text>
                <Text
                  style={{
                    fontFamily: Font_SEMIBOLD,
                    fontSize: 20,
                    color: '#000',
                  }}>
                  {showResult.yoga}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#07BDBD',
                    fontWeight: '900',
                    fontFamily: Font_BLACK,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {isProcessing ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator size={'large'} />
          <Text>Processing...</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 50,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 30,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIsCameraActive(true);
                  if (isCameraActive) {
                    Alert.alert('Alert Title', 'Do you to close the session?', [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          setIsCameraActive(true);
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          setIsCameraActive(false);
                          navigation.goBack();
                        },
                      },
                    ]);
                  }
                }}
                style={{
                  backgroundColor: isCameraActive ? 'green' : 'red',
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
              />
            </View>

            {isCameraActive && (
              <TouchableOpacity
                onPress={handelResumePause}
                style={{backgroundColor: 'white', borderRadius: 50}}>
                {isPaused ? <VideoCircle2Icon /> : <PauseCircle2Icon />}
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity
              style={{backgroundColor: 'white', borderRadius: 50}}>
              <PauseCircle2Icon />
            </TouchableOpacity> */}
          </View>

          {res && (
            <View
              style={{
                position: 'absolute',
                top: 60,
                right: 40,
              }}>
              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Hand Gripped {res.hands_gripped_status}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Calories Burned: {res.calories_burned}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Front Angle: {res.front_angle}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Back Angle: {res.back_angle}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Body Line % : {res.body_line_percentage}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 12}}>
                  Body Turned Status: {res.body_turned_status}
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}
