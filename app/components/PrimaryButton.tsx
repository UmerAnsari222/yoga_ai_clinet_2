import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type PrimaryButtonProps = {
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
};

export default function PrimaryButton({
  onPress,
  children,
  style,
  disable,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: '#07BDBD',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        },
      ]}>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0, 0.4966, 0.9996]}
        colors={['#07BDBD', '#27CDB9', '#07BDBD']}
        style={{
          flex: 1,
          paddingVertical: heightPercentageToDP('2.5'),
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </LinearGradient> */}
      {children}
    </TouchableOpacity>
  );
}
