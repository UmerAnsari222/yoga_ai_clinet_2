import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {styles} from './style';
import TypeCard from '../../components/TypeCard';
import {
  ClockImage,
  ColorKcal,
  Image2,
  Image6,
} from '../../../assets/icons/icons';
import MiniTypeCard from '../../components/MiniTypCard';
import {BarChart} from 'react-native-gifted-charts';
import {Font_SEMIBOLD} from '../../themes/typography';
import {BASE_URL} from '../../constants';
import {useSelector} from 'react-redux';
import {
  millisecondsToMinutes,
  millisecondsToSeconds,
  secondsToMinutes,
} from 'date-fns';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ProgressScreen = () => {
  const [yoga, setYoga] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [duration, setDuration] = useState(0);
  const [barData, setBarData] = useState([]);
  const [maxValue, setMaxValue] = useState(75);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector(state => state.authSlice);
  const navigation = useNavigation();

  // const barData = [
  //   {
  //     value: 40,

  //     label: '16',

  //     spacing: 3,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 8, frontColor: '#07BDBD', spacing: 3},
  //   {value: 11, frontColor: '#FF0000'},

  //   {
  //     value: 50,

  //     label: '20',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 40, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 75,

  //     label: '32',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 25, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 30,

  //     label: '40',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 20, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 60,

  //     label: '28',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 40, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 65,

  //     label: '28',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 30, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 65,

  //     label: '28',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 30, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 65,

  //     label: '28',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 30, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},

  //   {
  //     value: 65,

  //     label: '28',

  //     spacing: 2,

  //     labelWidth: 30,

  //     labelTextStyle: {color: 'gray'},

  //     frontColor: '#F28649',
  //   },

  //   {value: 30, frontColor: '#07BDBD', spacing: 3},
  //   {value: 20, frontColor: '#FF0000'},
  // ];

  useEffect(() => {
    getProgressReport();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProgressReport();
    }, []),
  );

  async function getProgressReport() {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/api/v1/progress/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      const data = await res.json();

      const chartData = formatData(data.progressReports);

      console.log('CHART DATA: ', chartData);

      setDuration(data?.reports?.duration);
      setYoga(data?.reports?.yoga);
      setKcal(data?.reports?.kcal);

      setBarData(chartData);

      // console.log('REPORT RESPONSE: ', data);
    } catch (error) {
      console.log('PROGRESS REPORT ERROR', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formatData = data => {
    const maxKcalProgress = data.reduce(
      (max, obj) => (obj.kcalProgress > max.kcalProgress ? obj : max),
      data[0],
    );

    setMaxValue(maxKcalProgress.kcalProgress);
    console.log('MAX VALUE: ', maxKcalProgress);

    return data.reduce((acc, item) => {
      const {durationProgress, kcalProgress, yogaProgress, date} = item;

      const day = parseInt(date.split(' ')[1], 10);

      acc.push({
        value: yogaProgress,
        label: `${day}`,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: {color: 'gray'},
        frontColor: '#07BDBD',
      });

      acc.push({
        value: kcalProgress,
        frontColor: '#F28649',
        spacing: 3,
      });

      const duration =
        millisecondsToMinutes(durationProgress) > 0
          ? millisecondsToMinutes(durationProgress)
          : millisecondsToSeconds(durationProgress);

      console.log('DURATION: ', millisecondsToMinutes(60000));

      acc.push({
        value: duration,
        frontColor: '#FF0000',
      });

      return acc;
    }, []);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
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
            <Text style={styles.backText}>Progress Report</Text>
          </View>

          <View style={{marginTop: heightPercentageToDP('10')}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 40,
              }}>
              <MiniTypeCard ImageIcon={Image6} count={yoga} type="Yoga" />
              <MiniTypeCard
                ImageIcon={ClockImage}
                count={
                  millisecondsToMinutes(duration) > 0
                    ? millisecondsToMinutes(duration)
                    : millisecondsToSeconds(duration)
                }
                type={
                  millisecondsToMinutes(duration) > 0 ? 'Minutes' : 'Seconds'
                }
              />
              <MiniTypeCard
                ImageIcon={ColorKcal}
                count={Number(kcal.toFixed(3))}
                type="Kcal"
              />
            </View>

            <View style={styles.chartWrapper}>
              <View
                style={{
                  // backgroundColor: 'red',
                  width: widthPercentageToDP('80'),
                }}>
                <View style={styles.chartFlex}>
                  <Text style={styles.statText}>Statistics</Text>
                </View>
                <BarChart
                  data={barData}
                  barWidth={12}
                  spacing={24}
                  roundedBottom
                  roundedTop
                  hideRules
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{color: 'gray'}}
                  noOfSections={3}
                />

                <View style={styles.squareNameWrapper}>
                  <View style={styles.squareWrapper}>
                    <View
                      style={[styles.colorSquare, {backgroundColor: '#07BDBD'}]}
                    />
                    <Text style={styles.squareText}>Yoga</Text>
                  </View>

                  <View style={styles.squareWrapper}>
                    <View
                      style={[styles.colorSquare, {backgroundColor: '#FF0000'}]}
                    />
                    <Text style={styles.squareText}>
                      {millisecondsToMinutes(duration) > 0
                        ? 'Minutes'
                        : 'Seconds'}
                    </Text>
                  </View>

                  <View style={styles.squareWrapper}>
                    <View
                      style={[styles.colorSquare, {backgroundColor: '#F28649'}]}
                    />
                    <Text style={styles.squareText}>Calories</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;
