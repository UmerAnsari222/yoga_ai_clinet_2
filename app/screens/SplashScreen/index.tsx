import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR} from '../../themes/typography';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEBEF8', '#07BDBD']}
        start={{x: 0, y: 0}} // Start from top-left
        end={{x: 0, y: 1}} // End at bottom-left
        style={styles.gradient}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    // width: 446,
    // height: 446,
    width: widthPercentageToDP('55'),
    height: widthPercentageToDP('55'),
    backgroundColor: '#FFFFFF',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: Font_REGULAR,
    fontSize: 96,
    lineHeight: 115,
  },
});

export default SplashScreen;
