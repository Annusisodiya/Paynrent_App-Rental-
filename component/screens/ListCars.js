import {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StatusBar,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {getData, ServerURL} from '../../services/FetchNodeServices';
import LinearGradient from 'react-native-linear-gradient';

import AppButton from '../uicomponents/AppButton';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default function ListCars({navigation, props}) {
  const [cars, setListCars] = useState([]);
  var dispatch = useDispatch();
  const fetchCarList = async () => {
    var result = await getData('user/display_all_vehicle');
    setListCars(result.data);
  };
  useEffect(function () {
    fetchCarList();
  }, []);

  const RenderItem = ({item}) => {
    const handleVehicle = selectedItem => {
      dispatch({
        type: 'ADD_VEHICLE',
        payload: [selectedItem.vehicleid, selectedItem],
      });

      navigation.navigate('BookingSummary');
    };

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#d3d3d3',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: width * 0.95,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 10,
            margin: 10,
          }}>
          <View
            style={{
              width: '50%',
              flexDirection: 'column',
              marginLeft: 5,
              marginTop: 0,
            }}>
            <Text
              style={{fontFamily: 'poppins', fontSize: 20, fontWeight: 'bold'}}>
              {item.companyname}
            </Text>
            <Text
              style={{
                fontFamily: 'poppins',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              {item.modelname}
            </Text>

            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 52,
                }}>
                <Image
                  source={require('../assets/petrol.png')}
                  style={{
                    resizeMode: 'contain',
                    height: 13,
                    width: 13,
                    alignItems: 'baseline',
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {item.fueltype}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 62,
                }}>
                <Image
                  source={require('../assets/manual.png')}
                  style={{
                    resizeMode: 'contain',
                    height: 13,
                    width: 13,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 13,
                    fontWeight: 'bold',
                    width: 65,
                    marginLeft: 10,
                  }}>
                  {item.mode}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 65,
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/seat.png')}
                  style={{
                    resizeMode: 'contain',
                    height: 13,
                    width: 13,
                  }}
                />

                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {item.capacity} Seats
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontSize: 34,
                  fontWeight: 'bold',
                  color: '#000000',
                }}>
                &#8377; {item.rentperhour}/hr
              </Text>
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontSize: 13,
                  fontWeight: '700',
                }}>
                Prices excludes fuel cost
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', width: '50%', height: 140}}>
            <View style={{width: '100%'}}>
              <Image
                source={{uri: `${ServerURL}/images/${item.icon}`}}
                style={{
                  resizeMode: 'contain',
                  height: 86,
                  width: '100%',
                }}
              />
            </View>

            <View
              style={{
                height: height * 0.09,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 8,
              }}>
              <TouchableOpacity onPress={() => handleVehicle(item)}>
                <LinearGradient
                  style={{
                    width: width * 0.25,

                    borderRadius: 10,
                    padding: 10,

                    display: 'flex',
                    alignItems: 'center',
                  }}
                  colors={['#4c669f', '#3b5998', '#192f6a']}>
                  <Text
                    style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
                    Book &gt;
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cars}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={item => item.vehicleid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ecf0f1',
  },
  itemStyle: {
    padding: 8,
    margin: 5,
    width: width * 0.9,
    backgroundColor: '#fff',
  },
});
