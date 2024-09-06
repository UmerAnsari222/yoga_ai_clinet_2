import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  ArrowRight,
  AudioPlayerIcon,
  Image2,
  PauseCircleIcon,
  PracticeBodyImage,
  ResetCircleIcon,
  TextIcon,
  VideoCircleIcon,
  WriteText,
} from '../../../assets/icons/icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import {Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import PrimaryButton from '../../components/PrimaryButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import TrackPlayer, {
  Event,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {useSelector} from 'react-redux';
import {useGetSingleYogaSessionByIdQuery} from '../../store/services/yoga.service';
import Video, {VideoRef} from 'react-native-video';

import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default function PracticeScreen() {
  const videoRef = useRef<VideoRef>(null);
  const refRBSheet = useRef();
  const preferenceRBSheet = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [yogaSession, setYogaSession] = useState<any>(null);

  const [showCamera, setShowCamera] = useState(false);

  const [preference, setPreference] = useState([
    {
      id: 1,
      title: 'Audio',
      Icon: AudioPlayerIcon,
    },
    {
      id: 2,
      title: 'Written',
      Icon: TextIcon,
    },
  ]);
  const [selectPreference, setSelectPreference] = useState(null);

  const navigation = useNavigation();
  const {id} = useRoute().params;
  const progress = useProgress();
  const auth = useSelector(state => state.authSlice);
  const {data, isSuccess, isLoading} = useGetSingleYogaSessionByIdQuery({
    id,
    token: auth.token,
  });

  // console.log(data);

  useEffect(() => {
    if (isSuccess || data != null) {
      // console.log(data);
      setYogaSession(data.yogaSession);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (!isPlayerInitialized) {
  //     initializeTrackPlayer();
  //   }
  // }, [isPlayerInitialized]);

  // const initializeTrackPlayer = async () => {
  //   await TrackPlayer.setupPlayer();
  // };

  // function handelPreference() {
  //   refRBSheet?.current?.close();

  //   setTimeout(() => {
  //     preferenceRBSheet?.current?.open();
  //   }, 1500);
  // }

  const playAudio = async () => {
    if (!isPlaying) {
      try {
        // Add your audio track
        await TrackPlayer.add({
          id: 'trackId',
          url: require('../../sounds/audio/sound_track.mp3'),
          title: 'My Song',
          artist: 'Track Artist',
        });

        // Start playback
        await TrackPlayer.play();
        setIsPlaying(true);

        console.log('RUNNING');
      } catch (error) {
        console.log('ERROR', error);
      }
    } else {
      await TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  const ResetAudio = async () => {
    await TrackPlayer.reset();
  };

  const handelCamera = () => {
    // ImageCropPicker.openCamera({
    //   mediaType: 'video',
    // }).then(async video => {
    //   console.log(video.path);
    //   console.log(video.sourceURL);
    // navigation.navigate('CameraScreen', {video: video});

    // });
    navigation.navigate('CameraScreen');
  };

  // const handelCamera = async () => {
  //   console.log('CLICK ON IT');

  //   // fetch('http://127.0.0.1:5000/analyze_yoga2')
  //   fetch('http://192.168.10.10:5000/analyze_yoga2')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });

  //   // try {
  //   //   const res = await axios.get(`${MOTION_AI_URL}/analyze_yoga2`);
  //   //   // const res = await axios.post(
  //   //   //   `${MOTION_AI_URL}/analyze_yoga`,
  //   //   //   formData,
  //   //   //   {
  //   //   //     headers: {
  //   //   //       'Content-Type': 'multipart/form-data',
  //   //   //     },
  //   //   //   },
  //   //   // );

  //   //   console.log('RESPONSE', res);
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />
      <SafeAreaView />

      <ScrollView
        contentContainerStyle={{
          paddingVertical: heightPercentageToDP('4'),
          paddingHorizontal: heightPercentageToDP('3'),
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() => navigation.goBack()}>
              <ArrowRight />
              <Text style={styles.backText}>Practice</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
              {selectPreference != null ? (
                <Image
                  style={{width: 36, height: 36}}
                  source={selectPreference.Icon}
                />
              ) : (
                <Image style={{width: 36, height: 36}} source={WriteText} />
              )}
            </TouchableOpacity> */}
          </View>

          <View style={{marginTop: heightPercentageToDP('3')}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: widthPercentageToDP('5'),
              }}>
              <Image
                style={{width: 250, height: 348, flexShrink: 1}}
                source={PracticeBodyImage}
              />
              <View style={{flex: 1}}>
                <Video
                  fullscreen={true}
                  controls={true}
                  pictureInPicture={true}
                  source={{uri: yogaSession?.videoUrl}}
                  ref={videoRef}
                  resizeMode="contain"
                  style={{
                    height: 350,
                    borderRadius: 20,
                  }}
                />
              </View>
              {/* <Image
                style={{
                  width: 380,
                  height: 307,
                  objectFit: 'cover',
                  borderRadius: 22,
                }}
                source={Image2}
              /> */}
            </View>

            <View style={{marginTop: heightPercentageToDP('4')}}>
              <Text style={styles.description}>{yogaSession?.description}</Text>
            </View>
          </View>
        </View>

        {/* <RBSheet
          ref={refRBSheet}
          customStyles={{
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
              height: 640,
            },
          }}>
          <View
            style={{
              paddingVertical: heightPercentageToDP('4'),
              paddingHorizontal: heightPercentageToDP('3'),
            }}>
            <Text style={styles.FeedbackPreferenceText}>
              Feedback Preference
            </Text>

            <View style={{gap: 30, marginTop: heightPercentageToDP('4')}}>
              {preference.map((pref, i) => (
                <TouchableOpacity
                  onPress={() => setSelectPreference(pref)}
                  key={i}
                  style={[
                    styles.FeedbackPreferenceButton,
                    {
                      borderColor:
                        selectPreference?.id == pref.id ? '#07BDBD' : '#8D8D8D',
                    },
                  ]}>
                  <Image style={{width: 44, height: 44}} source={pref.Icon} />
                  <Text style={styles.FeedbackPreferenceButtonText}>
                    {pref.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                marginBottom: 40,
                marginTop: heightPercentageToDP('6'),
              }}>
              <PrimaryButton style={{height: 74}} onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    lineHeight: 33,
                    fontFamily: Font_SEMIBOLD,
                  }}>
                  Set Preference
                </Text>
              </PrimaryButton>
            </View>
          </View>
        </RBSheet> */}

        {/* <RBSheet
          ref={preferenceRBSheet}
          customStyles={{
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
              height: 500,
            },
          }}>
          <View
            style={{
              paddingVertical: heightPercentageToDP('4'),
              paddingHorizontal: heightPercentageToDP('3'),
            }}>
            <Text style={styles.FeedbackPreferenceText}>
              Feedback From Instructor
            </Text>

            <View style={styles.borWrapper}>
              {selectPreference?.id == 1 ? (
                <View style={{gap: 10}}>
                  <Text style={styles.feedBackText}>Audio Feedback:</Text>
                  <View
                    style={[
                      styles.whiteWrapper,
                      {flexDirection: 'row', justifyContent: 'space-between'},
                    ]}>
                    {progress.position === progress.duration ? (
                      <TouchableOpacity>
                        <ResetCircleIcon fill="#8E99FD" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={playAudio}>
                        {isPlaying ? <PauseCircleIcon /> : <VideoCircleIcon />}
                      </TouchableOpacity>
                    )}

                    <Slider
                      value={progress.position}
                      minimumValue={0}
                      maximumValue={progress.duration}
                      style={{flex: 1}}
                      thumbTintColor="#8E99FD"
                      minimumTrackTintColor="#8E99FD"
                    />
                  </View>
                </View>
              ) : (
                <View style={{gap: 10}}>
                  <Text style={styles.feedBackText}>Written Feedback:</Text>
                  <View style={styles.whiteWrapper}>
                    <Text style={styles.writtenText}>
                      “Fully Extend your arms”
                    </Text>
                  </View>
                </View>
              )}

              <View style={{gap: 10}}>
                <Text style={styles.feedBackText}>Pose:</Text>
                <View style={styles.whiteWrapper}>
                  <Text style={styles.writtenText}>Cow Pose Aerial</Text>
                </View>
              </View>
            </View>
          </View>
        </RBSheet> */}

        <View
          style={{
            paddingHorizontal: widthPercentageToDP('4'),
            marginBottom: 40,
          }}>
          <PrimaryButton
            style={{height: 74}}
            onPress={handelCamera}
            // onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                lineHeight: 33,
                fontFamily: Font_SEMIBOLD,
              }}>
              Start Practice
            </Text>
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
}
