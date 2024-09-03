import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  ArrowRight,
  ClockIcon,
  FilledCalenderIcon,
} from '../../../assets/icons/icons';
import {styles} from './style';
import PrimaryInput from '../../components/PrimaryInput';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import {useCreateReminderMutation} from '../../store/services/reminder.service';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const CalendarScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date().toString());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const auth = useSelector(state => state.authSlice);

  const [createReminder] = useCreateReminderMutation();

  const onChange = (event, selectedDate) => {
    console.log(event);
    console.log(selectedDate);

    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    console.log(event);
    console.log(selectedTime);

    const currentTime = selectedTime;
    setTime(currentTime);
  };

  const showMode = currentMode => {
    if (!DateTimePickerAndroid) {
      console.log('DateTimePickerAndroid is not available.');
      return;
    }

    DateTimePickerAndroid.open({
      value: date,
      onChange: currentMode == 'date' ? onChange : onTimeChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  async function handelSubmit() {
    try {
      setIsLoading(true);
      const data = {title, description, reminderDate: date, reminderTime: time};

      const res = await createReminder({data, token: auth.token});

      console.log(res);

      if (res?.error?.data?.message === 'failed') {
        console.log('Insdei IF failed', res?.error.data.errors);
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
        Toast.show({
          type: 'success',
          text1: 'Reminder set successfully!',
        });
      }
      setTitle('');
      setDescription('');
    } catch (error) {
      console.log('REMINDER ERROR: ', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  }

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              justifyContent: 'center',
            }}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowRight />
            </TouchableOpacity> */}
            <Text style={styles.backText}>Set Reminder</Text>
          </View>

          <View style={{marginTop: heightPercentageToDP('3')}}>
            <View style={styles.inputWrapper}>
              <PrimaryInput
                value={title}
                onChange={setTitle}
                keyboardType="default"
                placeholder="Activity Title"
              />
              {/* <MessageGray fill={'#9E9E9E'} /> */}
            </View>

            <View style={styles.inputWrapper}>
              <PrimaryInput
                value={description}
                onChange={setDescription}
                keyboardType="default"
                placeholder="Description"
              />
              {/* <MessageGray fill={'#9E9E9E'} /> */}
            </View>

            <View
              style={[
                styles.inputWrapper,
                {paddingVertical: heightPercentageToDP('3.2')},
                // {height: 109},
              ]}>
              <TouchableOpacity style={{flex: 1}} onPress={showDatepicker}>
                <Text style={{color: '#B9B9B9'}}>{date.toDateString()}</Text>
              </TouchableOpacity>
              <FilledCalenderIcon />
            </View>
            <View
              style={[
                styles.inputWrapper,
                {paddingVertical: heightPercentageToDP('3.2')},
                // {height: 109},
              ]}>
              <TouchableOpacity style={{flex: 1}} onPress={showTimepicker}>
                <Text style={{color: '#B9B9B9'}}>{time.toString()}</Text>
              </TouchableOpacity>
              <ClockIcon />
            </View>
          </View>
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
            Submit
          </Text>
        </PrimaryButton>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
