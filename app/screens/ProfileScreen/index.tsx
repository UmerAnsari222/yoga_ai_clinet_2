import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Font_SEMIBOLD} from '../../themes/typography';
import {styles} from './style';
import {Gril, InfoIcon, Logout} from '../../../assets/icons/icons';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {removeToken} from '../../store/services/async-storage.service';
import {logout} from '../../store/slice/auth.slice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  async function handelLogout() {
    try {
      // setTimeout(async () => {
      // console.log(auth.token);
      navigation.dispatch(StackActions.replace('LoginScreen'));
      await removeToken();
      dispatch(logout());
      // }, 400);
    } catch (error) {
      // Handle any errors that occur during logout
      console.error('Error during logout:', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />
      <SafeAreaView />

      <ScrollView
        contentContainerStyle={{
          paddingVertical: heightPercentageToDP('4'),
          paddingHorizontal: heightPercentageToDP('2'),
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text style={styles.profileHeadingText}>Profile</Text>
            <Text style={styles.settingHeadingText}>
              Personalize & Settings
            </Text>
          </View>

          <View style={{marginTop: heightPercentageToDP('3')}}>
            <View style={styles.wrapperStyle}>
              <Image
                style={{height: 85, width: 85, borderRadius: 20}}
                source={Gril}
              />
              <Text style={styles.nameTextStyle}>{auth?.user?.name}</Text>
            </View>
          </View>

          <View style={{gap: 30, marginBottom: 20}}>
            <Text
              style={[
                styles.profileHeadingText,
                {fontWeight: '600', fontSize: 32},
              ]}>
              Support
            </Text>

            <View
              style={[
                styles.wrapperStyle,
                {paddingVertical: heightPercentageToDP('2')},
              ]}>
              <View style={styles.infoWrapper}>
                <InfoIcon />
              </View>
              <Text
                style={[
                  styles.nameTextStyle,
                  {fontSize: 28, fontWeight: '500'},
                ]}>
                About Us
              </Text>
            </View>

            <View
              style={[
                styles.wrapperStyle,
                {paddingVertical: heightPercentageToDP('2')},
              ]}>
              <View style={styles.infoWrapper}>
                <InfoIcon />
              </View>
              <Text
                style={[
                  styles.nameTextStyle,
                  {fontSize: 28, fontWeight: '500'},
                ]}>
                Contact Support
              </Text>
            </View>

            <View
              style={[
                styles.wrapperStyle,
                {paddingVertical: heightPercentageToDP('2')},
              ]}>
              <View style={styles.infoWrapper}>
                <InfoIcon />
              </View>
              <Text
                style={[
                  styles.nameTextStyle,
                  {fontSize: 28, fontWeight: '500'},
                ]}>
                Privacy Policy
              </Text>
            </View>

            <View
              style={[
                styles.wrapperStyle,
                {paddingVertical: heightPercentageToDP('2')},
              ]}>
              <View style={styles.infoWrapper}>
                <InfoIcon />
              </View>
              <Text
                style={[
                  styles.nameTextStyle,
                  {fontSize: 28, fontWeight: '500'},
                ]}>
                Terms & Conditions
              </Text>
            </View>
          </View>

          <View style={{gap: 30}}>
            <Text
              style={[
                styles.profileHeadingText,
                {fontWeight: '600', fontSize: 32},
              ]}>
              Other
            </Text>

            <TouchableOpacity
              onPress={handelLogout}
              style={[
                styles.wrapperStyle,
                {paddingVertical: heightPercentageToDP('2')},
              ]}>
              <View style={styles.infoWrapper}>
                <Logout />
              </View>
              <Text
                style={[
                  styles.nameTextStyle,
                  {fontSize: 28, fontWeight: '500'},
                ]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
