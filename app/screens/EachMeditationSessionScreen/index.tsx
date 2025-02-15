import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  ArrowRight,
  Image2,
  Image3,
  Image4,
  Image5,
} from '../../../assets/icons/icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import YogaCard from '../../components/YogaCard';
import {useGetAllMeditationByLevelQuery} from '../../store/services/meditation.service';
import {useSelector} from 'react-redux';
import {Font_SEMIBOLD} from '../../themes/typography';

const EachMeditationSessionScreen = () => {
  const [meditationList, setMeditationList] = useState([]);
  const navigation = useNavigation();
  const {yogaClass} = useRoute().params;
  const auth = useSelector(state => state.authSlice);

  const {data, isLoading, isSuccess} = useGetAllMeditationByLevelQuery({
    token: auth.token,
    type: yogaClass.type,
  });

  // const yogaList = [
  //   {
  //     title: 'Mindfull Meditation',
  //     duration: '10 mins',
  //     type: 'Beginner',
  //     image: Image2,
  //   },
  //   {
  //     title: 'Mindfull Meditation',
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image3,
  //   },
  //   {
  //     title: 'Mindfull Meditation',
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image4,
  //   },
  //   {
  //     title: 'Mindfull Meditation',
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image5,
  //   },
  // ];

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data.meditationSessions);
      setMeditationList(data.meditationSessions);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={30} color={'#07BDBD'} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />
      <SafeAreaView />

      <ScrollView
        contentContainerStyle={{
          paddingVertical: heightPercentageToDP('4'),
          paddingHorizontal: heightPercentageToDP('4'),
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowRight />
            </TouchableOpacity>
            <Text style={styles.backText}>{yogaClass.title}</Text>
          </View>

          <View style={{marginVertical: heightPercentageToDP('2')}}>
            <View style={{marginTop: heightPercentageToDP('4'), gap: 30}}>
              {meditationList.length > 0 ? (
                meditationList.map((meditation, i) => (
                  <YogaCard
                    onPress={() =>
                      navigation.navigate('MeditationDetailScreen', {
                        id: meditation.id,
                      })
                    }
                    key={i}
                    title={meditation?.name}
                    YogaImage={meditation?.posterUrl}
                    duration={meditation?.duration}
                    level={meditation?.level}
                  />
                ))
              ) : (
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: Font_SEMIBOLD,
                    textAlign: 'center',
                  }}>
                  Meditations not found
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EachMeditationSessionScreen;
