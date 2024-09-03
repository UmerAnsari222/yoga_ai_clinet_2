import {View, Text, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Calender, Home, Reports, User} from '../../assets/icons/icons';
import {Font_BOLD} from '../themes/typography';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();

// screenOptions={({route}) => ({
//     tabBarIcon: ({focused, color, size}) => {
//       const rn = route.name;
//       let Icon = Home;

//       if (rn === 'HomeScreen') {
//         Icon = Home;
//       } else if (rn === 'ProgressScreen') {
//         Icon = Reports;
//       } else if (rn === 'CalendarScreen') {
//         Icon = Calender;
//       } else if (rn === 'ProfileScreen') {
//         Icon = User;
//       }

//       return <Icon fill={focused ? '#07BDBD' : '#07BDBD4A'} />;
//     },
//     tabBarStyle: {
//       backgroundColor: '#FFF',
//       shadowOffset: 0,
//       height:
//         Platform.OS === 'ios'
//           ? heightPercentageToDP('10')
//           : heightPercentageToDP('10'),
//     },
//     headerShown: false,
//     tabBarShowLabel: true,
//     tabBarActiveTintColor: '#07BDBD',
//     tabBarInactiveTintColor: '#FBD9B3',
//     tabBarHideOnKeyboard: true,
//   })}

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const rn = route.name;
          let Icon = Home;

          if (rn === 'HomeScreen') {
            Icon = Home;
          } else if (rn === 'ProgressScreen') {
            Icon = Reports;
          } else if (rn === 'CalendarScreen') {
            Icon = Calender;
          } else if (rn === 'ProfileScreen') {
            Icon = User;
          }

          return <Icon fill={focused ? '#07BDBD' : '#07BDBD4A'} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFF', // Set the background color to transparent
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0,
          height:
            Platform.OS === 'ios'
              ? heightPercentageToDP('12')
              : heightPercentageToDP('12'),
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#07BDBD',
        tabBarInactiveTintColor: '#07BDBD4A',
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontFamily: Font_BOLD,
            fontWeight: '900',
            marginBottom: 15,
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontFamily: Font_BOLD,
            fontWeight: '900',
            marginBottom: 15,
          },
        }}
        name="ProgressScreen"
        component={ProgressScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontFamily: Font_BOLD,
            fontWeight: '900',
            marginBottom: 15,
          },
        }}
        name="CalendarScreen"
        component={CalendarScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontFamily: Font_BOLD,
            fontWeight: '900',
            marginBottom: 15,
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
