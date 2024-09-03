import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {styles} from './style';
import {Advanced, Basic, Standard} from '../../../assets/icons/icons';
import {Font_BLACK, Font_REGULAR, Font_SEMIBOLD} from '../../themes/typography';
import PrimaryButton from '../../components/PrimaryButton';
import PreferenceButton from '../../components/PreferenceButton';
import {useNavigation} from '@react-navigation/native';

const FeedbackPreferenceScreen = () => {
  const [isDisable, setIsDisable] = useState(true);
  const [selectedPreference, setSelectedPreference] = useState(null);

  const navigation = useNavigation();

  const [preferences, setPreferences] = useState([
    {
      id: 1,
      name: 'Basic',
      icon: Basic,
      isActive: false,
    },
    {
      id: 2,
      name: 'Standard',
      icon: Standard,
      isActive: false,
    },
    {
      id: 3,
      name: 'Advanced',
      icon: Advanced,
      isActive: false,
    },
  ]);

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
          <Text style={styles.headingTitle}>Set your feedback preferences</Text>

          <View style={{gap: 40, marginTop: heightPercentageToDP('10')}}>
            {preferences.map((preference, i) => (
              <PreferenceButton
                setSelectedPreference={setSelectedPreference}
                key={preference.id}
                preference={preference}
                selectedPreference={selectedPreference}
              />
              //   <TouchableOpacity
              //     onPress={() => handelPreferences(i)}
              //     key={i}
              //     style={styles.preferenceButton}>
              //     <Image
              //       source={preference.icon}
              //       style={{width: 44, height: 44}}
              //     />
              //     <Text style={styles.preferenceButtonText}>
              //       {preference.name}
              //       {JSON.stringify(preference.isActive)}
              //     </Text>
              //   </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isDisable ? '#19C6BB' : '#89E1DD'},
          ]}
          disabled={selectedPreference != null ? false : true}
          onPress={() => navigation.navigate('BottomTab')}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              color: '#000',
              lineHeight: 33,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FeedbackPreferenceScreen;
