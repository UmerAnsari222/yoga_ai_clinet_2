import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import { useEffect, useState } from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen/indext';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyScreen from '../screens/ForgotPasswordScreen/VerifyScreen';
import ResetPasswordScreen from '../screens/ForgotPasswordScreen/ResetPasswordScreen';
import FeedbackPreferenceScreen from '../screens/FeedbackPreferenceScreen';
import BottomTab from './BottomTab';
import YogaClassesScreen from '../screens/YogaClassesScreen';
import EachYogaClassesScreen from '../screens/EachYogaClassesScreen';
import MeditationSessionScreen from '../screens/MeditationSessionScreen';
import EachMeditationSessionScreen from '../screens/EachMeditationSessionScreen';
import MeditationDetailScreen from '../screens/MeditationDetailScreen';
import YogaDetailScreen from '../screens/YogaDetailScreen';
import RatingsAndReviews from '../screens/RatingsAndReviews';
import AddReviewScreen from '../screens/AddReviewScreen';
import PracticeScreen from '../screens/PracticeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../store/services/async-storage.service';
import { setToken } from '../store/slice/auth.slice';
import FavoriteScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CameraScreen from '../screens/CameraScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [splashFinished, setSplashFinished] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const auth = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const checkToken = async () => {
    const token = await getToken();
    console.log(token);

    dispatch(setToken({ token: token }));
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    // Simulate splash screen finishing after 3 seconds
    setTimeout(() => {
      setSplashFinished(true);
    }, 3000);
  }, []);

  useEffect(() => {
    // const logoutTimeout = setTimeout(() => {
    if (auth.isAuthenticated) {
      console.log('TRUE');
      setUserLoggedIn(true);
    } else {
      console.log('FALSE');
      setUserLoggedIn(false);
    }
    // }, 2000);

    // return () => clearTimeout(logoutTimeout);
  }, [auth.isAuthenticated]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen">
      {!splashFinished && (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      )}

      {!userLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen
            name="YogaClassesScreen"
            component={YogaClassesScreen}
          />
          <Stack.Screen
            name="FeedbackPreferenceScreen"
            component={FeedbackPreferenceScreen}
          />
          <Stack.Screen
            name="EachYogaClassesScreen"
            component={EachYogaClassesScreen}
          />
          <Stack.Screen
            name="MeditationSessionScreen"
            component={MeditationSessionScreen}
          />
          <Stack.Screen
            name="EachMeditationSessionScreen"
            component={EachMeditationSessionScreen}
          />
          <Stack.Screen
            name="MeditationDetailScreen"
            component={MeditationDetailScreen}
          />
          <Stack.Screen name="YogaDetailScreen" component={YogaDetailScreen} />
          <Stack.Screen
            name="RatingsAndReviews"
            component={RatingsAndReviews}
          />
          <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />
          <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
