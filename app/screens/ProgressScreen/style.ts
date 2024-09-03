import {StyleSheet} from 'react-native';
import {Font_SEMIBOLD} from '../../themes/typography';
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
  chartFlex: {
    paddingBottom: heightPercentageToDP('1'),
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 1,
    marginBottom: heightPercentageToDP('2'),
    paddingHorizontal: widthPercentageToDP('1'),
  },
  chartWrapper: {
    // backgroundColor: 'red',
    // alignSelf: 'center',
    // width: widthPercentageToDP('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('5'),
    borderColor: '#E8E7E7',
    borderWidth: 1,
    paddingVertical: heightPercentageToDP('2'),
    borderRadius: 22,
  },
  statText: {
    fontSize: heightPercentageToDP('2'),
    lineHeight: 33,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
    color: '#000000',
  },
  colorSquare: {
    width: 20,
    height: 20,
    borderRadius: 3,
  },
  squareWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  squareText: {
    color: '#000',
    fontSize: heightPercentageToDP('1.1'),
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: Font_SEMIBOLD,
  },
  squareNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: heightPercentageToDP('2'),
  },
});
