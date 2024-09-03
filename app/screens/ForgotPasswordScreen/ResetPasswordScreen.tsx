import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import PrimaryButton from '../../components/PrimaryButton';
import PasswordInput from '../../components/PasswordInput';
import {Hide, Lock} from '../../../assets/icons/icons';
import Toast from 'react-native-toast-message';
import {useChangePasswordMutation} from '../../store/services/forgot-password.service';
import {useSelector} from 'react-redux';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();
  const [changePassword] = useChangePasswordMutation();
  const {email, otp, hash} = useSelector(state => state.forgotPasswordSlice);

  function handelPassword() {
    setIsSecure(prev => {
      return !prev;
    });
  }

  function handelConfirmPassword() {
    setIsConfirmSecure(prev => {
      return !prev;
    });
  }

  async function handSubmit() {
    setIsLoading(true);
    // navigation.navigate('ResetPasswordScreen');

    try {
      const response = await changePassword({
        otp,
        hash,
        email,
        password,
        confirmPassword,
      });

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
        Toast.show({
          type: 'success',
          text1: 'Password reset successfully!',
        });
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Try again?',
        visibilityTime: 2000, // Adjust the visibility time as needed
        autoHide: true,
      });
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
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.headingTitle}>Forgot Password?</Text>
          <Text style={styles.processTitle}>
            Please create your new password
          </Text>
          <View style={{marginTop: 20}}>
            <View style={styles.inputWrapper}>
              <Lock fill={'#9E9E9E'} />
              <PasswordInput
                value={password}
                onChange={setPassword}
                keyboardType="default"
                placeholder="Password"
                secureTextEntry={isSecure}
              />
              <TouchableOpacity onPress={handelPassword}>
                <Hide fill={'#9E9E9E'} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Lock fill={'#9E9E9E'} />
              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                keyboardType="default"
                placeholder="Confirm Password"
                secureTextEntry={isConfirmSecure}
              />
              <TouchableOpacity onPress={handelConfirmPassword}>
                <Hide fill={'#9E9E9E'} />
              </TouchableOpacity>
            </View>

            <PrimaryButton
              disable={isLoading}
              onPress={handSubmit}
              style={{height: 74, marginTop: 20}}>
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

export default ResetPasswordScreen;
