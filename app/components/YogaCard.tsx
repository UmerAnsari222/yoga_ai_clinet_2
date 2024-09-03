import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {LeftArrow} from '../../assets/icons/icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR, Font_SEMIBOLD} from '../themes/typography';

interface YogaCardProps {
  title: string;
  duration: string;
  YogaImage: any;
  onPress: () => void;
  level: string;
}

const YogaCard = ({
  title,
  YogaImage,
  duration,
  onPress,
  level,
}: YogaCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#F8F8F8',
        paddingHorizontal: widthPercentageToDP('3'),
        paddingVertical: heightPercentageToDP('2'),
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <Image
          source={{uri: YogaImage}}
          style={{width: 169, height: 169, borderRadius: 22}}
        />
        <View>
          <Text style={styles.recommendedText}>{title}</Text>
          <Text style={styles.timeAndTypeText}>
            {duration} . {level}
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: widthPercentageToDP('6')}}>
        <LeftArrow />
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  recommendedText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
    lineHeight: 39,
  },
  viewAll: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 33,
    color: '#07BDBD',
    fontFamily: Font_BLACK,
  },
  timeAndTypeText: {
    color: '#696969',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: Font_REGULAR,
    lineHeight: 28,
    marginTop: 20,
    textTransform: 'capitalize',
  },
});

export default YogaCard;
