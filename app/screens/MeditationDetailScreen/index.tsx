import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ArrowRight, ArrowWhite, Med} from '../../../assets/icons/icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Font_BLACK,
  Font_REGULAR,
  Font_SEMIBOLD,
  Font_THIN,
} from '../../themes/typography';
import PrimaryButton from '../../components/PrimaryButton';
import {useSelector} from 'react-redux';
import {useGetSingleMeditationByIdQuery} from '../../store/services/meditation.service';

const MeditationDetailScreen = () => {
  const [meditation, setMeditation] = useState(null);
  const navigation = useNavigation();
  const {id} = useRoute().params;

  console.log(id);

  const auth = useSelector(state => state.authSlice);

  const {data, isSuccess, isLoading} = useGetSingleMeditationByIdQuery({
    id,
    token: auth.token,
  });

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data);
      setMeditation(data.meditationSession);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={true} barStyle={'default'} />
      <SafeAreaView />

      <ScrollView
        contentContainerStyle={{
          //   paddingVertical: heightPercentageToDP('4'),
          //   paddingHorizontal: heightPercentageToDP('4'),
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground
            source={{uri: meditation?.posterUrl}}
            style={{
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
              overflow: 'hidden',
            }}>
            <View
              style={{
                height: 597,
                // height: heightPercentageToDP('47%'),
                borderBottomLeftRadius: 22,
                borderBottomRightRadius: 22,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  paddingVertical: heightPercentageToDP('6'),
                  paddingHorizontal: heightPercentageToDP('2'),
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowWhite />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View
            style={{
              paddingHorizontal: widthPercentageToDP('4'),
              paddingVertical: heightPercentageToDP('4'),
            }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '600',
                lineHeight: 38,
                fontFamily: Font_SEMIBOLD,
                color: '#000',
              }}>
              {meditation?.name}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '400',
                lineHeight: 38.4,
                fontFamily: Font_REGULAR,
                color: '#000',
              }}>
              {meditation?.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP('5'),
                gap: 20,
                marginTop: 30,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  lineHeight: 38,
                  fontFamily: Font_REGULAR,
                  color: '#6E6E6E',
                  textTransform: 'capitalize',
                }}>
                {meditation?.duration}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  lineHeight: 38,
                  fontFamily: Font_REGULAR,
                  color: '#6E6E6E',
                }}>
                {meditation?.tag}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: widthPercentageToDP('4'),
            marginBottom: 30,
          }}>
          <PrimaryButton style={{height: 74}} onPress={() => {}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                lineHeight: 33,
                fontFamily: Font_SEMIBOLD,
              }}>
              Start
            </Text>
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default MeditationDetailScreen;
