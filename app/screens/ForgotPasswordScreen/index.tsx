import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_BLACK} from '../../themes/typography';
import PrimaryInput from '../../components/PrimaryInput';
import {
  Facebook,
  Google,
  Hide,
  Lock,
  MessageGray,
} from '../../../assets/icons/icons';
import PasswordInput from '../../components/PasswordInput';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import {setOtpAndHashForVerify} from '../../store/slice/forgot-password.slice';
import {useSendEmailMutation} from '../../store/services/forgot-password.service';
import {useDispatch} from 'react-redux';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();

  const [sendMail] = useSendEmailMutation();
  const dispatch = useDispatch();

  async function handelSubmit() {
    setIsLoading(true);
    // navigation.navigate('VerificationPasswordScreen');

    try {
      const response = await sendMail({email});

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
          text1: 'Otp Send on your email',
        });
        dispatch(
          setOtpAndHashForVerify({
            otp: response.data.otp,
            hash: response.data.hash,
            email: response.data.email,
          }),
        );
        navigation.navigate('VerifyScreen');
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
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.headingTitle}>Forgot Password?</Text>
          <Text style={styles.processTitle}>
            Enter your details to continue
          </Text>
          <View style={{marginTop: 20}}>
            <View style={styles.inputWrapper}>
              <MessageGray fill={'#9E9E9E'} />
              <PrimaryInput
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                placeholder="Email"
              />
            </View>

            <PrimaryButton
              disable={isLoading}
              onPress={handelSubmit}
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

export default ForgotPasswordScreen;
