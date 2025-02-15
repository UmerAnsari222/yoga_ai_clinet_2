import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  ArrowRight,
  Image2,
  Image3,
  Image7,
  Image8,
} from '../../../assets/icons/icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {styles} from './style';
import YogaCardFavorite from '../../components/YogaCardFavorite';
import {useSelector} from 'react-redux';
import {
  useCreateFavoriteMutation,
  useGetFavoriteYogaOfUserQuery,
} from '../../store/services/favorite.service';
import {Font_SEMIBOLD} from '../../themes/typography';

const FavoriteScreen = () => {
  const [yogaList, setYogaList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();
  const auth = useSelector(state => state.authSlice);

  const {data, isSuccess, isLoading, refetch} = useGetFavoriteYogaOfUserQuery(
    auth.token,
  );
  const [createFavorite] = useCreateFavoriteMutation();

  async function handleFavorite(id: string) {
    try {
      const data = {
        yogaId: id,
      };

      const res = await createFavorite({data, token: auth.token});

      console.log(res);
      const list = yogaList.filter(favorite => favorite.id !== id);
      setYogaList(list);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log('Favorite Error', error);
      setIsFavorite(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      refetch()
        .then(data => {
          // console.log('REFETCHED userPolling', userVotes.data);
          if (data != null) {
            setYogaList(data?.data?.favorites);
          }
        })
        .catch(error => {
          console.error('Error while refetching:', error);
        });
    }, []),
  );

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data);
      setYogaList(data.favorites);
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
            <Text style={styles.backText}>Favorites</Text>
          </View>

          <View
            style={{
              marginTop: heightPercentageToDP('3'),
              gap: 40,
            }}>
            {yogaList.length > 0 ? (
              yogaList.map((yoga, i) => (
                <YogaCardFavorite
                  onPress={() => handleFavorite(yoga?.id)}
                  key={i}
                  title={yoga?.name}
                  YogaImage={yoga?.posterUrl}
                  duration={yoga?.duration}
                  level={yoga?.level}
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
                Not found any favorites yoga or meditations
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;
