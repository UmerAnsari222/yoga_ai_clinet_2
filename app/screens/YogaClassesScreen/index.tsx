import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight, Image2, Image7, Image8} from '../../../assets/icons/icons';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import CircleYogaCard from '../../components/CircleYogaCard';
import {useSelector} from 'react-redux';
import {useGetAllCategoryQuery} from '../../store/services/category.service';
import {Font_SEMIBOLD} from '../../themes/typography';

const YogaClassesScreen = () => {
  const navigation = useNavigation<any>();
  const [yogaList, setYogaList] = useState([]);

  const auth = useSelector(state => state.authSlice);

  const {data, isLoading, isSuccess} = useGetAllCategoryQuery(auth.token);

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data);
      setYogaList(data.categories);
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
            <Text style={styles.backText}>Yoga Classes</Text>
          </View>

          <View
            style={{
              marginTop: heightPercentageToDP('3'),
              alignItems: 'flex-start',
              flexDirection: 'row',
              gap: heightPercentageToDP('4'),
              flexWrap: 'wrap',
              justifyContent: yogaList.length > 3 ? 'center' : 'flex-start',
            }}>
            {yogaList.length > 0 ? (
              yogaList?.map((yoga, i) => (
                <CircleYogaCard
                  key={i}
                  ImageIcon={yoga.posterUrl}
                  title={yoga.name}
                  onPress={() =>
                    navigation.navigate('EachYogaClassesScreen', {
                      yogaClass: {name: yoga.name, id: yoga.id},
                    })
                  }
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
                Yoga class not found
              </Text>
            )}

            {/* <FlatList
              data={yogaList}
              renderItem={({item}) => (
                <CircleYogaCard
                  style={{flex: 1}}
                  ImageIcon={item?.posterUrl}
                  title={item?.name}
                  onPress={() =>
                    navigation.navigate('EachYogaClassesScreen', {
                      yogaClass: item.title,
                    })
                  }
                />
              )}
              keyExtractor={item => item.id}
              numColumns={3}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default YogaClassesScreen;
