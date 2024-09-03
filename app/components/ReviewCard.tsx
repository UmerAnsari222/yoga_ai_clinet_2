import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FillStar, Gril, Star} from '../../assets/icons/icons';
import {Font_REGULAR, Font_SEMIBOLD} from '../themes/typography';
import {formatDistanceToNow, parseISO} from 'date-fns';

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  createdAt: string;
}

const ReviewCard = ({name, rating, review, createdAt}: ReviewCardProps) => {
  console.log('DAte', new Date(createdAt).toString());

  return (
    <View
      style={{
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius: 22,
        paddingHorizontal: widthPercentageToDP('4'),
        paddingVertical: heightPercentageToDP('2.5'),
        marginTop: heightPercentageToDP('2'),
        backgroundColor: '#FCFCFC',
      }}>
      <View style={{flexDirection: 'row', gap: 20}}>
        <View>
          <Image
            style={{width: 104, height: 104, borderRadius: 100}}
            source={Gril}
          />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 25,
                fontWeight: '700',
                lineHeight: 30,
                fontFamily: Font_SEMIBOLD,
              }}>
              {name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              {Array.from({length: rating}).map((_, i) => (
                <View key={i}>
                  <FillStar />
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: '400',
                lineHeight: 40,
                fontFamily: Font_REGULAR,
              }}>
              {review}
            </Text>
            <Text
              style={{
                color: '#A1A5C1',
                fontSize: 16,
                fontWeight: '400',
                lineHeight: 35,
                fontFamily: Font_REGULAR,
              }}>
              {createdAt &&
                formatDistanceToNow(new Date(createdAt).toString(), {
                  addSuffix: true,
                })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
