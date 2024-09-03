import {StyleSheet} from 'react-native';
import {Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  profileHeadingText: {
    color: '#000',
    fontSize: 36,
    lineHeight: 43,
    fontFamily: Font_SEMIBOLD,
    fontWeight: '700',
  },
  settingHeadingText: {
    color: '#646464',
    fontSize: 24,
    lineHeight: 28,
    fontFamily: Font_REGULAR,
    fontWeight: '500',
    marginTop: 10,
  },
  nameTextStyle: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '400',
    color: '#000000',
    fontFamily: Font_SEMIBOLD,
  },
  wrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: widthPercentageToDP('3'),
    paddingVertical: heightPercentageToDP('1.5'),
    borderRadius: 20,
  },
  infoWrapper: {
    backgroundColor: '#07BDBD',
    height: 49,
    width: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
