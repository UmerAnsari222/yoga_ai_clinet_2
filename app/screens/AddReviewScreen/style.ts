import {StyleSheet} from 'react-native';
import {Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  backText: {
    color: '#000',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
    lineHeight: 38,
  },
  yogaTextStyle: {
    color: '#07BDBD',
    fontSize: 49,
    lineHeight: 69,
    fontWeight: '800',
    fontFamily: Font_SEMIBOLD,
    textAlign: 'center',
  },
  yogaText2Style: {
    color: '#757575',
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '400',
    fontFamily: Font_REGULAR,
    textAlign: 'center',
    marginTop: heightPercentageToDP('1'),
  },
  reviewBlueStarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    marginTop: heightPercentageToDP('5'),
  },
  submitButtonTextStyle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 33,
    fontFamily: Font_REGULAR,
  },
});
