import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_SEMIBOLD} from '../themes/typography';
import {TickMark} from '../../assets/icons/icons';

const PreferenceButton = ({
  preference,
  setSelectedPreference,
  selectedPreference,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedPreference(preference)}
      style={[
        styles.preferenceButton,
        {
          borderColor:
            selectedPreference != null && selectedPreference.id == preference.id
              ? '#07BDBD'
              : '#8D8D8D',
        },
      ]}>
      <View style={{flexDirection: 'row', gap: 20}}>
        <Image source={preference.icon} style={{width: 44, height: 44}} />
        <Text style={styles.preferenceButtonText}>{preference.name}</Text>
      </View>
      {selectedPreference != null && selectedPreference.id == preference.id && (
        <TickMark />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preferenceButton: {
    borderColor: '#8D8D8D',
    borderWidth: 2,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 109,
    // height: heightPercentageToDP('8.5%'),
    paddingHorizontal: widthPercentageToDP('5'),
    justifyContent: 'space-between',
  },
  preferenceButtonText: {
    color: '#000000',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
  },
});

export default PreferenceButton;
