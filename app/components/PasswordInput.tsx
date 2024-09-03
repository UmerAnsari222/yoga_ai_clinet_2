import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';

type PasswordInputProps = {
  value: string;
  onChange: Function;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
};

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  keyboardType,
  secureTextEntry,
}: PasswordInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={e => onChange(e)}
      keyboardType={keyboardType}
      placeholder={placeholder}
      style={{
        color: '#000',
        marginHorizontal: widthPercentageToDP('2'),
        flex: 1,
      }}
      placeholderTextColor={'#9E9E9E'}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default PasswordInput;
