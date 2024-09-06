import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  ClarityNotification,
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  LeftArrow,
  SmArrow,
  SymbolsFavorite,
} from '../../../assets/icons/icons';
import {styles} from './style';
import YogaCard from '../../components/YogaCard';
import {useNavigation} from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {useLoggedInUserQuery} from '../../store/services/auth.service';
import {setOnlyUser} from '../../store/slice/auth.slice';
import {useGetAllYogaSessionsQuery} from '../../store/services/yoga.service';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [yogaList, setYogaList] = useState<any>([]);

  const auth = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
    isSuccess: isUserSuccess,
  } = useLoggedInUserQuery(auth.token);
  const {
    data: yogaSessionData,
    isLoading: isYogaSessionLoading,
    isSuccess: isYogaSessionSuccess,
  } = useGetAllYogaSessionsQuery(auth.token);

  // useEffect(() => {
  //   fetch('http://192.168.10.10:5000/analyze_yoga2')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    if (isUserSuccess || userData != null) {
      // console.log(userData.user);
      dispatch(setOnlyUser({user: userData.user}));
    }
    if (isYogaSessionSuccess || yogaSessionData != null) {
      console.log(yogaSessionData);
      setYogaList(yogaSessionData.yogaSessions);
    }
  }, [isUserSuccess, isYogaSessionSuccess]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new message arrived!');
    });

    return unsubscribe;
  }, []);

  if (isUserLoading || isYogaSessionLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

    // return (
    //   <View
    //     style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <ActivityIndicator size={'large'} />
    //   </View>
    // );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <SafeAreaView />
        <StatusBar translucent backgroundColor={'transparent'} />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.topWrapper}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View>
                <Text style={styles.greetingText}>
                  Hello,
                  {auth?.user?.name.includes(' ')
                    ? auth?.user?.name.split(' ')[0]
                    : auth?.user?.name.slice(0, 10)}
                </Text>
                <Text style={styles.greeting2Text}>
                  Have a calm {'\n'} and peaceful day!
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NotificationScreen')}
                  style={styles.whiteBox}>
                  <ClarityNotification />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('FavoriteScreen')}
                  style={styles.whiteBox}>
                  <SymbolsFavorite />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: heightPercentageToDP('4'),
              paddingHorizontal: heightPercentageToDP('2'),
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: widthPercentageToDP('7'),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: widthPercentageToDP('1'),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('YogaClassesScreen')}
                style={styles.yogaTypeBox}>
                <Image style={{width: 96, height: 96}} source={Image6} />
                <Text style={styles.yogaTypeText}>Yoga Classes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('MeditationSessionScreen')}
                style={styles.yogaTypeBox}>
                <Image style={{width: 96, height: 96}} source={Image1} />
                <Text style={styles.yogaTypeText}>Meditation Sessions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingTop: heightPercentageToDP('1'),
              paddingHorizontal: heightPercentageToDP('2'),
            }}>
            <View
              style={{
                marginVertical: heightPercentageToDP('2'),
                paddingHorizontal: widthPercentageToDP('2'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: widthPercentageToDP('1'),
                }}>
                <Text style={styles.recommendedText}>Recommended for you</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MeditationSessionScreen')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text style={styles.viewAll}>View All</Text>
                  <SmArrow />
                </TouchableOpacity>
              </View>

              <View style={{marginTop: heightPercentageToDP('2'), gap: 30}}>
                {yogaList.map((yoga, i) => (
                  <YogaCard
                    onPress={() =>
                      navigation.navigate('YogaDetailScreen', {id: yoga.id})
                    }
                    key={i}
                    title={yoga.name}
                    YogaImage={yoga.posterUrl}
                    duration={yoga.duration}
                    level={yoga.level}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
