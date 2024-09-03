import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Font_BOLD, Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import PrimaryButton from '../../components/PrimaryButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Video, {VideoRef} from 'react-native-video';
import {ArrowRight} from '../../../assets/icons/icons';
import {styles} from './style';
import {MOTION_AI_URL} from '../../constants';

const FeedbackScreen = () => {
  const navigation = useNavigation();

  const {data} = useRoute().params;

  if (!data) return;

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
              <Text style={styles.backText}>Get Feedback</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginVertical: heightPercentageToDP('3'),
              paddingHorizontal: widthPercentageToDP('2'),
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: widthPercentageToDP('2'),
              }}>
              {data.map((res, i) => (
                <View key={i}>
                  {res && (
                    <View
                      style={{
                        backgroundColor: '#F8F8F8',
                        paddingHorizontal: widthPercentageToDP('3'),
                        paddingVertical: widthPercentageToDP('3'),
                        borderRadius: 22,
                      }}>
                      <Text
                        style={{
                          color: '#5D5D5D',
                          fontSize: 20,
                          lineHeight: 24,
                          fontWeight: '400',
                          fontFamily: Font_REGULAR,
                          marginBottom: 3,
                        }}>
                        Pose:
                      </Text>

                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 28,
                          lineHeight: 33,
                          fontWeight: '600',
                          fontFamily: Font_SEMIBOLD,
                          marginBottom: 10,
                        }}>
                        {res?.body_turned_status}
                      </Text>

                      <Text
                        style={{
                          color: '#5D5D5D',
                          fontSize: 20,
                          lineHeight: 24,
                          fontWeight: '400',
                          fontFamily: Font_REGULAR,
                          marginBottom: 3,
                        }}>
                        Calories burned:
                      </Text>

                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 28,
                          lineHeight: 33,
                          fontWeight: '600',
                          fontFamily: Font_SEMIBOLD,
                          marginBottom: 10,
                        }}>
                        {res?.calories_burned} KCAL
                      </Text>

                      <Text
                        style={{
                          color: '#5D5D5D',
                          fontSize: 20,
                          lineHeight: 24,
                          fontWeight: '400',
                          fontFamily: Font_REGULAR,
                          marginBottom: 3,
                        }}>
                        Feedback:
                      </Text>

                      <Text
                        style={{
                          color: '#5D5D5D',
                          fontSize: 24,
                          lineHeight: 28,
                          fontWeight: '400',
                          fontFamily: Font_REGULAR,
                          marginBottom: 5,
                        }}>
                        {res?.hands_gripped_status}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* <View
          style={{
            paddingHorizontal: widthPercentageToDP('4'),
            marginBottom: 40,
          }}>
          <PrimaryButton
            style={{height: 74}}
            onPress={() => {}}
            // onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                lineHeight: 33,
                fontFamily: Font_SEMIBOLD,
              }}>
              Get Feedback
            </Text>
          </PrimaryButton>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default FeedbackScreen;
