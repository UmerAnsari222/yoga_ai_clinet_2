import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight} from '../../../assets/icons/icons';
import {styles} from './style';

export default function NotificationScreen() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />
      <SafeAreaView />

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
            <Text style={styles.dayHHeading}>Today</Text>
            <View style={styles.notificationWrapper}>
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
                  Lorem ipsum dolor sit amet, consectetur dipiscing elit. Ornare
                  sapien, et elit, ornare amet...
                </Text>
              </View>
            </View>
            <View style={styles.notificationWrapper}>
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
                  Lorem ipsum dolor sit amet, consectetur dipiscing elit. Ornare
                  sapien, et elit, ornare amet...
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
