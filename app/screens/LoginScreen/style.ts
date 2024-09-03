import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR} from '../../themes/typography';

export const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 36,
    color: '#000000',
    fontWeight: '700',
    fontFamily: Font_BLACK,
    lineHeight: 36,
    width: '100%',
  },
  processTitle: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '400',
    fontFamily: Font_REGULAR,
    lineHeight: 24,
    width: '100%',
    marginTop: 10,
  },
  inputWrapper: {
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    paddingVertical: heightPercentageToDP('2'),
    // height: 79,
    paddingHorizontal: heightPercentageToDP('2'),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightPercentageToDP('1.2'),
  },
  forgotPassword: {
    fontSize: 20,
    color: '#07BDBD',
    fontFamily: Font_REGULAR,
    fontWeight: '500',
    lineHeight: 28,
  },
  dontHaveText: {
    fontSize: 19,
    color: '#000',
    fontFamily: Font_REGULAR,
    fontWeight: '400',
    lineHeight: 27,
  },
  borderStyle: {
    width: '100%',
    borderColor: '#62656A',
    borderWidth: 0.5,
  },
  orText: {
    color: '#000000',
    fontSize: 33,
    fontWeight: '700',
    marginBottom: 3,
  },
  socialBtn: {
    borderWidth: 1.39,
    borderColor: '#35383F',
    width: 127,
    height: 83,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
