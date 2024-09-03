import {View, Text, Image} from 'react-native';
import React from 'react';
import {Gril, Star, StarText} from '../../assets/icons/icons';
import {Font_REGULAR, Font_SEMIBOLD} from '../themes/typography';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

interface RatingCardProps {
  count: number;
  rating: number;
}

const RatingCard = ({count, rating}: RatingCardProps) => {
  return (
    <View
      style={{
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius: 22,
        paddingHorizontal: widthPercentageToDP('4'),
        paddingVertical: heightPercentageToDP('2.5'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <View
          style={{
            backgroundColor: '#00000026',
            paddingVertical: heightPercentageToDP('4'),
            borderRadius: 35,
            width: 117,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={{width: 49, height: 49}} source={StarText} />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            {Array.from({length: Math.floor(rating)}).map(i => (
              <Star key={i} />
            ))}

            {/* <Star />
            <Star />
            <Star /> */}
            <Text
              style={{
                color: '#000',
                fontSize: 37,
                lineHeight: 45,
                fontWeight: '600',
                fontFamily: Font_SEMIBOLD,
              }}>
              {Math.floor(rating)}
            </Text>
          </View>
          <Text
            style={{
              color: '#53587A',
              fontSize: 18,
              lineHeight: 22,
              fontWeight: '400',
              fontFamily: Font_REGULAR,
            }}>
            From {count} reviewers
          </Text>
        </View>
      </View>
      {/* <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 62, height: 62, borderRadius: 52}}
          source={Gril}
        />
        <Image
          style={{width: 62, height: 62, borderRadius: 52}}
          source={Gril}
        />
        <Image
          style={{width: 62, height: 62, borderRadius: 52}}
          source={Gril}
        />
      </View> */}
    </View>
  );
};

export default RatingCard;
