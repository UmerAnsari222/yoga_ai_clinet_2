import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Women1, Women2, Women2Svg} from '../../../assets/icons/icons';
import {GlassView} from '@metafic-co/glassmorphism';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK, Font_REGULAR, Font_THIN} from '../../themes/typography';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const [step, setStep] = useState(false);

  function onClick() {
    if (!step) {
      setStep(true);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {!step ? <StepOne onClick={onClick} /> : <StepTwo />}
    </View>
  );
};

const StepOne = ({onClick}: {onClick: () => void}) => {
  return (
    <ImageBackground
      source={Women2}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={styles.glassBoxWrapper}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.contentWrapperStyle}>
            <View>
              <Text style={styles.titleStyle}>
                Your Yoga Journey {'\n'} Starts Here
              </Text>
              <Text style={styles.contentStyle}>
                Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Erat vitae quis quam augue quam
                a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
                vitae quis quam augue quam a.consectetur adipiscing elit. Erat
                vitae quis quam augue quam a.
              </Text>
            </View>

            <PrimaryButton
              onPress={onClick}
              style={{
                height: 74,
                marginTop: heightPercentageToDP('4'),
                width: '100%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#000',
                  lineHeight: 33,
                }}>
                Next
              </Text>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const StepTwo = () => {
  const navigation = useNavigation<any>();
  return (
    <ImageBackground
      source={Women1}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={styles.glassBoxWrapper}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.contentWrapperStyle}>
            <View>
              <Text style={styles.titleStyle}>
                Your Yoga Journey {'\n'} Starts Here
              </Text>
              <Text style={styles.contentStyle}>
                Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Erat vitae quis quam augue quam
                a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
                vitae quis quam augue quam a.consectetur adipiscing elit. Erat
                vitae quis quam augue quam a.
              </Text>
            </View>

            <PrimaryButton
              onPress={() => navigation.navigate('LoginScreen')}
              style={{
                height: 74,
                marginTop: heightPercentageToDP('4'),
                width: '100%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#000',
                  lineHeight: 33,
                }}>
                Next
              </Text>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassBoxWrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderColor: 'gray',
    overflow: 'hidden',
  },
  titleStyle: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: Font_BLACK,
    lineHeight: 60,
    color: '#FFFFFF',
    // paddingHorizontal: widthPercentageToDP('20'),
    paddingBottom: heightPercentageToDP('5'),
  },
  contentWrapperStyle: {
    // height: heightPercentageToDP('60'),
    paddingHorizontal: widthPercentageToDP('4'),
    paddingVertical: heightPercentageToDP('5'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentStyle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Font_REGULAR,
    color: '#FFFFFF',
    lineHeight: 38,
    paddingHorizontal: widthPercentageToDP('8'),
  },
});

export default OnboardingScreen;
