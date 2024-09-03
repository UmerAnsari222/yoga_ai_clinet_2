import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import OtpInput from '../../components/OptInput';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import {styles} from './style';
import Toast from 'react-native-toast-message';
import {useVerifiedOtpMutation} from '../../store/services/forgot-password.service';
import {useSelector} from 'react-redux';

const VerifyScreen = () => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();
  const [verifyOtp] = useVerifiedOtpMutation();
  const {otp, hash} = useSelector(state => state.forgotPasswordSlice);

  console.log({otp, hash});

  async function handSubmit() {
    setIsLoading(true);
    // navigation.navigate('ResetPasswordScreen');

    try {
      const combineOtp = otp1 + otp2 + otp3 + otp4;

      // console.log({otp: parseInt(combineOtp), hash});

      const response = await verifyOtp({otp: parseInt(combineOtp), hash});

      console.log(response);

      if (response?.error?.data?.message === 'failed') {
        // console.log(res.data.errors.map(er => console.log(er)));
        Toast.show({
          type: 'error',
          text1: 'Error Message',
          text2: response.error.data.errors[currentIndex].msg,
          visibilityTime: 2000, // Adjust the visibility time as needed
          autoHide: true,
          onHide: () => {
            if (response.error.data.errors.length == 0) return;
            setCurrentIndex(currentIndex + 1);
          },
        });
        return;
      }

      if (response?.data?.message === 'success') {
        if (response?.data?.isOtpValid) {
          navigation.navigate('ResetPasswordScreen');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: heightPercentageToDP('4'),
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: heightPercentageToDP('4'),
          backgroundColor: '#fff',
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.headingTitle}>Forgot Password?</Text>
          <Text style={styles.processTitle}>Enter OTP send to your email</Text>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                justifyContent: 'space-between',
                paddingHorizontal: widthPercentageToDP('5'),
              }}>
              <OtpInput value={otp1} onChange={setOtp1} />
              <OtpInput value={otp2} onChange={setOtp2} />
              <OtpInput value={otp3} onChange={setOtp3} />
              <OtpInput value={otp4} onChange={setOtp4} />
            </View>

            <PrimaryButton
              disable={isLoading}
              onPress={handSubmit}
              style={{height: 74, marginTop: heightPercentageToDP('4')}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#000',
                  lineHeight: 33,
                }}>
                Continue
              </Text>
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VerifyScreen;
