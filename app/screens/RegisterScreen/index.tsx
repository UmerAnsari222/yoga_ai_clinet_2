import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  Profile,
} from '../../../assets/icons/icons';
import PasswordInput from '../../components/PasswordInput';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import {
  useRegisterFacebookMutation,
  useRegisterGoogleMutation,
  useRegisterUserMutation,
} from '../../store/services/auth.service';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setToken} from '../../store/slice/auth.slice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {
//   AccessToken,
//   LoginManager,
//   Profile as FBProfile,
// } from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  const [registerUserByEmailPassword] = useRegisterUserMutation();
  const [registerUserByGoogleProvider] = useRegisterGoogleMutation();
  const [registerUserByFacebookProvider] = useRegisterFacebookMutation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '707169866325-81ibscbc0dnqgjdgr3n2bmo4stdosnao.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setDeviceToken(token);
      })
      .catch(error => {
        console.log('TOKEN ERROR: ' + error);
      });
  }, []);

  async function handelGoogleRegister() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();

      const data = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        providerId: userInfo.user.id,
        deviceToken: deviceToken,
      };

      console.log(userInfo);
      console.log(data);

      const res = await registerUserByGoogleProvider(data);

      console.log('BACKEND RESPONSE: ', res);

      if (res?.error?.data?.message === 'failed') {
        console.log('Insdei IF failed', res?.error.data);
        // console.log(res.data.errors.map(er => console.log(er)));
        console.log(currentIndex);
        Toast.show({
          type: 'error',
          text1: 'Error Message',
          text2: res.error.data.errors[currentIndex].msg,
          visibilityTime: 2000, // Adjust the visibility time as needed
          autoHide: true,
          onHide: () => {
            if (res.error.data.errors.length == 0) return;

            if (res.error.data.errors.length > 1)
              setCurrentIndex(currentIndex + 1);
          },
        });

        return;
      }

      if (res?.data?.message === 'success') {
        // dispatch(setUser({user: res?.data?.user, token: res?.data?.token}));
        dispatch(setToken({token: res?.data?.token}));
        Toast.show({
          type: 'success',
          text1: 'Register successfully!',
        });
        console.log(res.data);
        navigation.navigate('FeedbackPreferenceScreen');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function handelFacebookSigIn() {
  //   try {
  //     const result = LoginManager.logInWithPermissions(['public_profile']);

  //     if ((await result).isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AccessToken
  //     const data = await AccessToken.getCurrentAccessToken();

  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     console.log(data);

  //     const profile = await FBProfile.getCurrentProfile();

  //     console.log(profile);
  //     const data1 = {
  //       email: profile?.email,
  //       providerId: profile?.userID,
  //       name: profile?.name,
  //       deviceToken: deviceToken,
  //     };

  //     const res = await registerUserByFacebookProvider(data1);

  //     if (res?.error?.data?.message === 'failed') {
  //       console.log('Insdei IF failed', res?.error.data.errors);
  //       // console.log(res.data.errors.map(er => console.log(er)));
  //       console.log(currentIndex);
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error Message',
  //         text2: res.error.data.errors[currentIndex].msg,
  //         visibilityTime: 2000, // Adjust the visibility time as needed
  //         autoHide: true,
  //         onHide: () => {
  //           if (res.error.data.errors.length == 0) return;

  //           if (res.error.data.errors.length > 1)
  //             setCurrentIndex(currentIndex + 1);
  //         },
  //       });

  //       return;
  //     }

  //     if (res?.data?.message === 'success') {
  //       // dispatch(setUser({user: res?.data?.user, token: res?.data?.token}));
  //       dispatch(setToken({token: res?.data?.token}));

  //       Toast.show({
  //         type: 'success',
  //         text1: 'Register successfully!',
  //       });
  //       console.log(res.data);
  //       navigation.navigate('FeedbackPreferenceScreen');
  //     }
  //   } catch (error) {
  //     console.log('FACEBOOK ERROR: ', error);
  //   }
  // }

  async function onSubmitRegisterUser() {
    setCurrentIndex(0);

    try {
      const data = {
        name,
        email,
        password,
        confirmPassword,
        deviceToken: deviceToken,
      };

      setIsLoading(true);

      const res = await registerUserByEmailPassword(data);

      console.log(res);

      if (res?.error?.data?.message === 'failed') {
        console.log('Insdei IF failed', res?.error.data);
        // console.log(res.data.errors.map(er => console.log(er)));
        console.log(currentIndex);
        Toast.show({
          type: 'error',
          text1: 'Error Message',
          text2: res.error.data.errors[currentIndex].msg,
          visibilityTime: 2000, // Adjust the visibility time as needed
          autoHide: true,
          onHide: () => {
            if (res.error.data.errors.length == 0) return;

            if (res.error.data.errors.length > 1)
              setCurrentIndex(currentIndex + 1);
          },
        });

        return;
      }

      if (res?.data?.message === 'success') {
        // dispatch(setUser({user: res?.data?.user, token: res?.data?.token}));
        dispatch(setToken({token: res?.data?.token}));
        Toast.show({
          type: 'success',
          text1: 'Register successfully!',
        });
        console.log(res.data);
        navigation.navigate('FeedbackPreferenceScreen');
      }

      console.log(res);
    } catch (error) {
      console.log('REGISTER ERROR', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
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
          <Text style={styles.headingTitle}>Let’s get you started</Text>
          <Text style={styles.processTitle}>Proceed as you like</Text>
          <View style={{marginTop: 20}}>
            <View style={styles.inputWrapper}>
              <Profile fill={'#9E9E9E'} />
              <PrimaryInput
                value={name}
                onChange={setName}
                keyboardType="default"
                placeholder="Name"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MessageGray fill={'#9E9E9E'} />
              <PrimaryInput
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                placeholder="Email"
              />
            </View>

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
              onPress={onSubmitRegisterUser}
              style={{height: 74, marginTop: 20}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#000',
                  lineHeight: 33,
                }}>
                Sign Up
              </Text>
            </PrimaryButton>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                marginVertical: heightPercentageToDP('2.5'),
                width: widthPercentageToDP('70'),
                alignSelf: 'center',
              }}>
              <View style={styles.borderStyle}></View>
              <View>
                <Text style={styles.orText}>or</Text>
              </View>
              <View style={styles.borderStyle}></View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: heightPercentageToDP('3'),
              }}>
              <TouchableOpacity onPress={() => {}} style={styles.socialBtn}>
                <Facebook />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handelGoogleRegister}
                style={styles.socialBtn}>
                <Google />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            marginTop: 20,
          }}>
          <Text style={styles.dontHaveText}>Don’t have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.dontHaveText, {color: '#07BDBD'}]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
