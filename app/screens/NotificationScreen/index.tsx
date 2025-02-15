import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight} from '../../../assets/icons/icons';
import {styles} from './style';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import {useSelector} from 'react-redux';
import {formatDistanceToNow} from 'date-fns';
import {Font_SEMIBOLD} from '../../themes/typography';

type Reminder = {
  createdAt: string;
  description: string;
  id: string;
  reminderDate: string;
  reminderTime: string;
  title: string;
  updatedAt: string;
  userId: string;
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const auth = useSelector(state => state.authSlice);

  useEffect(() => {
    getUserNotification();
  }, []);

  const getUserNotification = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/reminder/notifications`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log(res.data.notifications);

      if (res.data.message === 'success') {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.log('[NOTIFICATION ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'light-content'} />
      <SafeAreaView />

      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={30} color={'#07BDBD'} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingVertical: heightPercentageToDP('4'),
            paddingHorizontal: heightPercentageToDP('4'),
            flexGrow: 1,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowRight />
              </TouchableOpacity>
              <Text style={styles.backText}>Notifications</Text>
            </View>

            <View
              style={{
                marginTop: heightPercentageToDP('3'),
              }}>
              {/* <Text style={styles.dayHHeading}>Today</Text> */}

              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <View
                    key={notification.id}
                    style={styles.notificationWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.notificationTitle}>
                        {notification.title.length > 20
                          ? notification.title.slice(0, 20) + '...'
                          : notification.title}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </Text>
                    </View>
                    <View style={{marginTop: heightPercentageToDP('1')}}>
                      <Text style={styles.notificationDescription}>
                        {notification.description}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: Font_SEMIBOLD,
                    textAlign: 'center',
                  }}>
                  Not found any notifications
                </Text>
              )}

              {/* <View style={styles.notificationWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.notificationTitle}>Iphone</Text>
                  <Text style={styles.notificationTime}>12:00 am</Text>
                </View>
                <View style={{marginTop: heightPercentageToDP('1')}}>
                  <Text style={styles.notificationDescription}>
                    Lorem ipsum dolor sit amet, consectetur dipiscing elit.
                    Ornare sapien, et elit, ornare amet...
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
