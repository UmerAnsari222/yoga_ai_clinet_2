import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type OtpInputProps = {
  value: string;
  onChange: Function;
};

export default function OtpInput({value, onChange}: OtpInputProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      maxLength={1}
      onChangeText={e => onChange(e)}
      keyboardType="numeric"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E7E7E7',
    marginTop: wp('2.5%'),
    color: '#777777',
    paddingHorizontal: wp('2.5%'),
    borderRadius: 15,
    width: wp('14%'),
    // width: 109,
    height: hp('7%'),
    // height: 79,
    fontSize: 26,
    textAlign: 'center',
  },
});
