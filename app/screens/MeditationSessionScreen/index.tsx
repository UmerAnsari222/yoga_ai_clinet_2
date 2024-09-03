import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ArrowRight, Image2, Image7, Image8} from '../../../assets/icons/icons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import CircleYogaCard from '../../components/CircleYogaCard';
import CircleMeditationCard from '../../components/CircleMeditationCard';

enum LevelType {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCE = 'INTERMEDIATE',
}

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

const MeditationSessionScreen = () => {
  const navigation = useNavigation();
  const [yogaList, setYogaList] = useState([
    {
      id: 1,
      title: 'Beginner',
      image: Image2,
      type: LevelType.BEGINNER,
    },
    {
      id: 2,
      title: 'Intermediate',
      image: Image7,
      type: LevelType.INTERMEDIATE,
    },
    {
      id: 3,

      title: 'Advance',
      image: Image8,
      type: LevelType.INTERMEDIATE,
    },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} />

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
            <Text style={styles.backText}>Meditation Sessions</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: heightPercentageToDP('2'),
            }}>
            {yogaList.map((yoga, i) => (
              <CircleMeditationCard
                onPress={() =>
                  navigation.navigate('EachMeditationSessionScreen', {
                    yogaClass: {title: yoga.title, type: yoga.type},
                  })
                }
                key={i}
                ImageIcon={yoga.image}
                title={yoga.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MeditationSessionScreen;
