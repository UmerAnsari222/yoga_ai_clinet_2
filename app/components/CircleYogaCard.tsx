import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Image2} from '../../assets/icons/icons';
import {Font_SEMIBOLD} from '../themes/typography';

interface CircleYogaCardProps {
  title: string;
  ImageIcon: any;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CircleYogaCard = ({
  title,
  ImageIcon,
  onPress,
  style,
}: CircleYogaCardProps) => {
  console.log(ImageIcon);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          alignItems: 'center',
          justifyContent: 'center',
          // flex: 1,
          marginTop: 30,
        },
      ]}>
      <Image
        source={{uri: ImageIcon}}
        style={{width: 111, height: 111, borderRadius: 100}}
      />
      <Text
        style={{
          fontSize: 32,
          lineHeight: 38,
          fontWeight: '600',
          color: '#000',
          fontFamily: Font_SEMIBOLD,
          marginTop: 15,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CircleYogaCard;
