import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';

export const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 36,
    color: '#000000',
    fontWeight: '700',
    fontFamily: Font_BLACK,
    lineHeight: 36,
    width: '100%',
    textAlign: 'center',
  },
  preferenceButton: {
    borderColor: '#8D8D8D',
    borderWidth: 2,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 109,
    height: heightPercentageToDP('15'),
    paddingHorizontal: widthPercentageToDP('5'),
    gap: 20,
  },
  preferenceButtonText: {
    color: '#000000',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
  },
  button: {
    // flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 74,
    marginTop: heightPercentageToDP('4'),
  },
});
