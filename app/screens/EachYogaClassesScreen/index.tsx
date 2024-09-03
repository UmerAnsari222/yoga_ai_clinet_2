import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
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
import {useGetAllYogaSessionByCategoryQuery} from '../../store/services/category.service';
import {useSelector} from 'react-redux';

const EachYogaClassesScreen = () => {
  const [yogaList, setYogaList] = useState([]);
  const {yogaClass} = useRoute().params;
  const auth = useSelector(state => state.authSlice);

  const navigation = useNavigation();
  console.log(yogaClass);

  const {data, isLoading, isSuccess} = useGetAllYogaSessionByCategoryQuery({
    id: yogaClass.id,
    token: auth.token,
  });

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data.categories.yoga);

      setYogaList(data.categories.yoga);
    }
  }, [isSuccess]);

  // const yogaList = [
  //   {
  //     title: yogaClass,
  //     duration: '10 mins',
  //     type: 'Beginner',
  //     image: Image2,
  //   },
  //   {
  //     title: yogaClass,
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image3,
  //   },
  //   {
  //     title: yogaClass,
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image4,
  //   },
  //   {
  //     title: yogaClass,
  //     duration: '24 mins',
  //     type: 'Beginner',
  //     image: Image5,
  //   },
  // ];

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />

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
            <Text style={styles.backText}>{yogaClass?.name}</Text>
          </View>

          <View style={{marginVertical: heightPercentageToDP('2')}}>
            <View style={{marginTop: heightPercentageToDP('4'), gap: 30}}>
              {yogaList.map((yoga, i) => (
                <YogaCard
                  level={yoga.level}
                  key={i}
                  title={yoga?.name}
                  YogaImage={yoga?.posterUrl}
                  duration={yoga?.duration}
                  onPress={() =>
                    navigation.navigate('YogaDetailScreen', {id: yoga.id})
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EachYogaClassesScreen;
