import {StyleSheet} from 'react-native';
import {Font_BLACK, Font_SEMIBOLD} from '../../themes/typography';

export const styles = StyleSheet.create({
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
});
