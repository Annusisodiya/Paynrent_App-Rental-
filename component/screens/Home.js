import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getData} from '../../services/FetchNodeServices';
import AppButton from '../uicomponents/AppButton';
import Dialog from 'react-native-dialog';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
function Home(props) {
  const [visible, setVisible] = useState(false);
  const [Cities, setCities] = useState([]);
  const [endDate, setEndDate] = useState('End Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Start Date');
  const [startTime, setStartTime] = useState('Start Time');
  const [endTime, setEndTime] = useState('End Time');
  const [selectedCity, setSelectedCity] = useState('Gwalior');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hrs, setHrs] = useState('');
  const [days, setDays] = useState('');
  const [daysTime, setDaysTime] = useState('');
  var dispatch = useDispatch();
  var navigation = useNavigation();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const handleStartConfirm = date => {
    console.warn('A date has been picked: ', date);
    setDate(date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0]);

    hideDatePicker();
  };

  const handleEndConfirm = date => {
    console.warn('A date has been picked: ', date);
    const dt = new Date(date);
    const z = dt.toISOString().split('T');

    const z1 = z[0].split('-');
    console.log(z1[2] + '/' + z1[1] + '/' + z1[0]);
    setEndDate(z1[2] + '/' + z1[1] + '/' + z1[0]);
    dateDiff(date);
    hideEndDatePicker();
  };

  const dateDiff = et => {
    var startDay = new Date(date);
    var endDay = new Date(et);
    var diff = Math.abs(endDay - startDay);

    var diffe = Math.floor(diff / 1000);
    setDays(Math.floor(diffe / 86400));

    console.log(Math.floor(diffe / 86400));
  };

  const handleStartTimeConfirm = date => {
    console.warn('A date has been picked: ', date);
    const y = new Date(date);
    setTime(date);
    const z = y.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    console.log(z);
    setStartTime(z);

    hideTimePicker();
  };

  const handleEndTimeConfirm = date => {
    console.warn('A date has been picked: ', date);
    const y = new Date(date);
    const z = y.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    console.log(z);
    setEndTime(z);
    dateDiff2(date);
    hideTimePicker();
  };

  const dateDiff2 = et => {
    var startDay = new Date(time);
    var endDay = new Date(et);
    var diff = Math.abs(endDay - startDay);

    var diffe = Math.floor(diff / 1000);
    var hours = Math.floor(diffe / 3600);
    setHrs(Math.floor(diffe / 3600));
    daystimecalculation(hours);
    console.log(Math.floor(diffe / 3600));
  };

  const daystimecalculation = hr => {
    setDaysTime('Duration : ' + days + ' days ' + hr + ' hrs');
  };

  const fetchAllCities = async () => {
    var response = await getData('user/display_all_cities');
    setCities(response.data);
  };
  useEffect(function () {
    fetchAllCities();
  }, []);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  const SectionListBasics = ({item}) => {
    return (
      <View style={{flexDirection: 'column', gap: 10}}>
        <TouchableOpacity onPress={() => handleCitySelected(item.cityname)}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            {item.cityname}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleCitySelected = citySelected => {
    setSelectedCity(citySelected);
    setVisible(false);
  };

  const handleSearch = () => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: {
        city: selectedCity,
        startDate: selectedDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        days: days,
        hours: hrs,
      },
    });
    navigation.navigate('ListCars');
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: height * 1,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: width * 0.9,
          marginTop: height * 0.19,
          backgroundColor: '#f5fffa',
          elevation: 15,
          margin: 5,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          padding: 10,
        }}>
        <View>
          <Image
            source={require('../assets/Logo1.png')}
            style={{
              resizeMode: 'contain',
              height: 60,
              width: 150,
            }}
          />
        </View>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontFamily: 'poppins',
              marginTop: 5,
              marginBottom: 5,
              fontSize: 17,
              fontWeight: 'bolder',
            }}>
            Self Drive Car Rental in India
          </Text>
        </View>
        <View
          style={{
            width: width * 0.85,
            //height:height*(0.25),
            borderRadius: 10,
            borderWidth: 1,

            backgroundColor: '#fff',
          }}>
          <TouchableOpacity onPress={showDialog}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: width * 0.79,
                height: 60,
                borderTopRightRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="location-on" style={{marginRight: 10}} size={20} />
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                {selectedCity}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: width * 0.84,
              height: 60,
              borderTopWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 170,
                height: 57,
                borderRightWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="schedule" style={{marginRight: 5}} size={20} />
              <TouchableOpacity onPress={showDatePicker}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {selectedDate}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleStartConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View
              style={{
                width: 170,
                height: 57,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="schedule" size={20} style={{marginRight: 5}} />
              <TouchableOpacity onPress={showEndDatePicker}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {endDate}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="dateTime"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
          </View>
          <View
            style={{
              width: width * 0.84,
              height: 60,
              borderTopWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 170,
                height: 57,
                borderRightWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="schedule" size={20} style={{marginRight: 10}} />
              <TouchableOpacity onPress={showStartTimePicker}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {startTime}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
            <View
              style={{
                width: 170,
                height: 57,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Icon name="schedule" size={20} style={{marginRight: 10}} />
              <TouchableOpacity onPress={showEndTimePicker}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {endTime}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
          </View>
        </View>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>
            {daysTime}
          </Text>
        </View>

        <Dialog.Container visible={visible}>
          <Dialog.Title>Cities</Dialog.Title>
          <Dialog.Description>
            <FlatList
              data={Cities}
              renderItem={({item}) => <SectionListBasics item={item} />}
              keyExtractor={item => item.cityid}
            />
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Close" onPress={handleDelete} />
        </Dialog.Container>

        <AppButton
          style={{margin: 10}}
          btnWidth={0.78}
          onPress={() => handleSearch()}
          buttonText={'Search'}
          bgColor="#27ae60"
        />
      </View>
    </View>
  );
}
export default Home;
