import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';

export const styles = StyleSheet.create({
  topWrapper: {
    backgroundColor: '#07BDBD',
    // height: heightPercentageToDP('23'),
    // height: 285,
    paddingVertical: heightPercentageToDP('8.5'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: widthPercentageToDP('8'),
    paddingBottom: heightPercentageToDP('4'),
  },
  greetingText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 76,
    fontFamily: Font_BLACK,
  },
  greeting2Text: {
    fontSize: 24,
    fontFamily: Font_REGULAR,
    lineHeight: 33,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  whiteBox: {
    backgroundColor: '#FFF',
    borderRadius: 11,
    padding: heightPercentageToDP('1.3'),
  },
  yogaTypeBox: {
    backgroundColor: '#07BDBD',
    // width: widthPercentageToDP('100'),
    flex: 1,
    // width: 318,
    // height: 188,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: heightPercentageToDP('2.3'),
    maxHeight: heightPercentageToDP('15.5'),
    // maxHeight: 190,
    height: heightPercentageToDP('100%'),
  },
  yogaTypeText: {
    color: '#FFF',
    // fontSize: 30,
    fontSize: heightPercentageToDP('2.3'),
    fontWeight: '700',
    fontFamily: Font_BLACK,
    textAlign: 'center',
  },
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
  },
});
