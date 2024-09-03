import {StyleSheet} from 'react-native';
import {
  Font_MEDIUM,
  Font_REGULAR,
  Font_SEMIBOLD,
} from '../../themes/typography';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  backText: {
    color: '#000',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
    lineHeight: 38,
  },
  dayHHeading: {
    fontSize: 26,
    fontWeight: '400',
    lineHeight: 31,
    color: '#000',
    fontFamily: Font_REGULAR,
  },
  notificationWrapper: {
    borderColor: '#E8E6EA',
    borderWidth: 2,
    paddingHorizontal: widthPercentageToDP('2'),
    paddingVertical: heightPercentageToDP('3'),
    borderRadius: 22,
    marginTop: heightPercentageToDP('1'),
    marginBottom: heightPercentageToDP('2'),
  },
  notificationTitle: {
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 31,
    color: '#000000',
    fontFamily: Font_MEDIUM,
  },
  notificationTime: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    color: '#000000',
    fontFamily: Font_REGULAR,
  },
  notificationDescription: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: '#000000',
    fontFamily: Font_MEDIUM,
  },
});
