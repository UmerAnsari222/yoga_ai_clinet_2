import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';

type PrimaryInputProps = {
  value: string;
  onChange: Function;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

export default function PrimaryInput({
  onChange,
  value,
  keyboardType,
  placeholder,
}: PrimaryInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={e => onChange(e)}
      keyboardType={keyboardType}
      placeholder={placeholder}
      style={{
        color: '#000',
        flex: 1,
        marginHorizontal: widthPercentageToDP('2'),
      }}
      placeholderTextColor={'#9E9E9E'}
    />
  );
}
