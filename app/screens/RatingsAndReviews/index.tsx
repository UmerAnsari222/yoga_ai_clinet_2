import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight, PlusButton} from '../../../assets/icons/icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import RatingCard from '../../components/RatingCard';
import ReviewCard from '../../components/ReviewCard';
import {BASE_URL} from '../../constants';
import {useSelector} from 'react-redux';

export default function RatingsAndReviews() {
  const [reviews, setReviews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {yogaId} = useRoute().params;

  const auth = useSelector(state => state.authSlice);

  console.log(yogaId);

  async function getReviews() {
    try {
      setIsLoading(true);
      const responsePromise = await fetch(
        `${BASE_URL}/api/v1/review-rating/all?yogaId=${yogaId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`, // Include the Bearer token
          },
        },
      );

      const data = await responsePromise.json();

      console.log(data);

      setReviews(data.reviews);
    } catch (error) {
      console.log('ERROR REVIEWS', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getReviews();
  }, [yogaId]);

  if (isLoading || !reviews) {
    return (
      <View>
        <Text>Loading...</Text>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
              onPress={() => navigation.goBack()}>
              <ArrowRight />
              <Text style={styles.backText}>Ratings & Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddReviewScreen', {yogaId})}>
              <PlusButton />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: heightPercentageToDP('3')}}>
            <RatingCard count={reviews.length} rating={reviews[0]?.rating} />
            {reviews.map((review, i) => (
              <ReviewCard
                name={review?.createdBy?.name}
                review={review?.review}
                rating={review?.rating}
                createdAt={review?.createdAt}
                key={i}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
