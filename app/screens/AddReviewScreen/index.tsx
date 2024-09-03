import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight, BlueStar} from '../../../assets/icons/icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import {Font_SEMIBOLD} from '../../themes/typography';
import PrimaryInput from '../../components/PrimaryInput';
import PrimaryButton from '../../components/PrimaryButton';
import {useSelector} from 'react-redux';
import {useCreateReviewMutation} from '../../store/services/review.service';

const AddReviewScreen = () => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const {yogaId} = useRoute().params;

  const auth = useSelector(state => state.authSlice);

  const [createReview] = useCreateReviewMutation();

  async function onSubmit() {
    try {
      setIsLoading(true);
      const data = {
        yogaId,
        review,
        rating: 0,
      };

      const res = await createReview({data, token: auth.token});

      console.log(res);
    } catch (error) {
      console.log('Failed to submit', error);
    } finally {
      setIsLoading(false);
    }
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
              <Text style={styles.backText}>Add Review</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: heightPercentageToDP('5')}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 23,
                lineHeight: 28,
                fontFamily: Font_SEMIBOLD,
              }}>
              How was your overall experience?
            </Text>

            <TextInput
              onChangeText={e => setReview(e)}
              value={review}
              placeholder=""
              keyboardType="default"
              style={{
                backgroundColor: '#E7E7E7',
                borderRadius: 10,
                paddingVertical: heightPercentageToDP('2'),
                // height: 79,
                paddingHorizontal: heightPercentageToDP('2'),

                marginVertical: heightPercentageToDP('1.2'),
                height: 166,
              }}
              multiline={true}
              textAlignVertical="top"
            />
            <View style={{marginTop: heightPercentageToDP('4')}}>
              <Text style={styles.yogaTextStyle}>Rate the Yoga</Text>
              <Text style={styles.yogaText2Style}>
                Please leave a review About Yoga
              </Text>
              <View style={styles.reviewBlueStarWrapper}>
                <BlueStar />
                <BlueStar />
                <BlueStar />
                <BlueStar />
                <BlueStar />
              </View>
            </View>
          </View>
        </View>

        <PrimaryButton onPress={onSubmit} style={{height: 74}}>
          <Text style={styles.submitButtonTextStyle}>Submit</Text>
        </PrimaryButton>
      </ScrollView>
    </View>
  );
};

export default AddReviewScreen;
