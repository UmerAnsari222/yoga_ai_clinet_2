import {View, Text, Image} from 'react-native';
import React from 'react';
import {Ciml} from '../../assets/icons/icons';
import {Font_SEMIBOLD} from '../themes/typography';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface TypeCardProps {
  type: string;
  count: number;
  ImageIcon: any;
}

const MiniTypeCard = ({type, ImageIcon, count}: TypeCardProps) => {
  return (
    <View
      style={{
        borderColor: '#F0F0F0',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 22,
        paddingVertical: heightPercentageToDP('2'),
        gap: 10,
      }}>
      <Image style={{width: 66, height: 66}} source={ImageIcon} />
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          fontFamily: Font_SEMIBOLD,
          lineHeight: 28,
          color: '#000',
        }}>
        {count}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          fontFamily: Font_SEMIBOLD,
          lineHeight: 24,
          color: '#575757',
        }}>
        {type}
      </Text>
    </View>
  );
};

export default MiniTypeCard;
