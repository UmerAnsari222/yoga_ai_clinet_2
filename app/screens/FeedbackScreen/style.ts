import {StyleSheet} from 'react-native';
import {Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
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
  description: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 38,
    color: '#000000',
    fontFamily: Font_REGULAR,
  },
  FeedbackPreferenceText: {
    fontSize: 32,
    color: '#000',
    lineHeight: 38,
    fontWeight: '600',
    fontFamily: Font_SEMIBOLD,
  },
  FeedbackPreferenceButton: {
    borderColor: '#8D8D8D',
    borderWidth: 2,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: heightPercentageToDP('1.5'),
    paddingHorizontal: heightPercentageToDP('2'),
    backgroundColor: '#F7F7F7',
  },
  FeedbackPreferenceButtonText: {
    fontSize: 32,
    lineHeight: 44,
    color: '#000',
    fontFamily: Font_SEMIBOLD,
    fontWeight: '600',
  },
  feedBackText: {
    fontSize: 30,
    lineHeight: 39,
    fontWeight: '700',
    color: '#000',
    fontFamily: Font_SEMIBOLD,
  },
  whiteWrapper: {
    backgroundColor: '#FFF',
    paddingHorizontal: heightPercentageToDP('1'),
    paddingVertical: heightPercentageToDP('2'),
    borderRadius: 15,
  },
  writtenText: {
    color: '#363636',
    fontSize: 24,
    lineHeight: 39,
    fontWeight: '500',
    fontFamily: Font_REGULAR,
  },
  borWrapper: {
    gap: 30,
    marginTop: heightPercentageToDP('2'),
    backgroundColor: '#F4F4F4',
    paddingHorizontal: widthPercentageToDP('4'),
    paddingVertical: heightPercentageToDP('2'),
    borderRadius: 11,
  },
});
