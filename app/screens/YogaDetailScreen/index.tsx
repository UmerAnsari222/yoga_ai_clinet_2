import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowRight,
  Ciml,
  FavoriteBlackIcon,
  FavoriteRedIcon,
  Gril,
  Image2,
  Kcal,
  PlusButton,
  SmArrow,
  Star,
  StarText,
  Timer,
} from '../../../assets/icons/icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import TypeCard from '../../components/TypeCard';
import {styles} from './style';
import PrimaryButton from '../../components/PrimaryButton';
import RatingCard from '../../components/RatingCard';
import ReviewCard from '../../components/ReviewCard';
import {useGetSingleYogaSessionByIdQuery} from '../../store/services/yoga.service';
import {useSelector} from 'react-redux';
import {useCreateFavoriteMutation} from '../../store/services/favorite.service';

const YogaDetailScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [yogaSession, setYogaSession] = useState<any>(null);

  const navigation = useNavigation();
  const {id} = useRoute().params;

  const auth = useSelector(state => state.authSlice);
  const {data, isSuccess, isLoading} = useGetSingleYogaSessionByIdQuery({
    id,
    token: auth.token,
  });

  const [createFavorite] = useCreateFavoriteMutation();

  console.log(id);

  async function handleFavorite() {
    try {
      const data = {
        yogaId: id,
      };

      const res = await createFavorite({data, token: auth.token});

      console.log(res);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log('Favorite Error', error);
      setIsFavorite(false);
    }
  }

  useEffect(() => {
    if (isSuccess || data != null) {
      console.log(data);
      setYogaSession(data.yogaSession);

      data.yogaSession.favorite.map(favorite => {
        if (favorite.userId === auth.user.id) {
          setIsFavorite(true);
        }
      });
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
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
            source={{uri: yogaSession?.posterUrl}}
            style={{
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
              overflow: 'hidden',
            }}>
            <View
              style={{
                // height: 600,
                height: heightPercentageToDP('45'),
                borderBottomLeftRadius: 22,
                borderBottomRightRadius: 22,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 4,
                  paddingVertical: heightPercentageToDP('6'),
                  paddingHorizontal: heightPercentageToDP('2'),
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowRight />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite}>
                  {isFavorite ? <FavoriteRedIcon /> : <FavoriteBlackIcon />}
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
              {yogaSession?.name}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '400',
                lineHeight: 38.4,
                fontFamily: Font_REGULAR,
                color: '#000',
              }}>
              {yogaSession?.description}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: widthPercentageToDP('4'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            <TypeCard
              ImageIcon={Ciml}
              count={yogaSession?.movements}
              type="Movements"
            />
            <TypeCard
              ImageIcon={Timer}
              count={yogaSession?.duration.split(' ')[0]}
              type="Minutes"
            />
            <TypeCard ImageIcon={Kcal} count={yogaSession?.kcal} type="Kcal" />
          </View>

          {yogaSession?.reviews.length > 0 ? (
            <View
              style={{
                marginVertical: heightPercentageToDP('4'),
                paddingHorizontal: widthPercentageToDP('6'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: heightPercentageToDP('2'),
                }}>
                <Text style={styles.recommendedText}>Ratings & Reviews</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RatingsAndReviews', {yogaId: id})
                  }
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text style={styles.viewAll}>View All</Text>
                  <SmArrow />
                </TouchableOpacity>
              </View>

              <RatingCard
                count={yogaSession?.reviews?.length}
                rating={yogaSession?.reviews[0]?.rating}
              />
              <ReviewCard
                name={yogaSession?.reviews[0]?.createdBy?.name}
                review={yogaSession?.reviews[0]?.review}
                rating={yogaSession?.reviews[0]?.rating}
                createdAt={yogaSession?.reviews[0]?.createdAt}
              />
            </View>
          ) : (
            <View
              style={{
                marginVertical: heightPercentageToDP('4'),
                paddingHorizontal: widthPercentageToDP('6'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: heightPercentageToDP('2'),
                }}>
                <Text style={styles.recommendedText}>Ratings & Reviews</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddReviewScreen', {yogaId: id})
                  }>
                  <PlusButton />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: widthPercentageToDP('4'),
            marginBottom: 40,
          }}>
          <PrimaryButton
            style={{height: 74}}
            onPress={() => navigation.navigate('PracticeScreen', {id})}>
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
};

export default YogaDetailScreen;
