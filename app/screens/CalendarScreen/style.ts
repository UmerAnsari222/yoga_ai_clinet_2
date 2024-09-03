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
});
