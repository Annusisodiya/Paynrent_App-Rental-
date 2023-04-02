import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getStoreData} from '../storage/AsyncStroage';
import AppButton from '../uicomponents/AppButton';
import {useSelector} from 'react-redux';
import {ServerURL} from '../../services/FetchNodeServices';
// const {width, height} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
import RazorpayCheckout from 'react-native-razorpay';
export default function BookingSummary(props) {
  const [userInfo, setUserInfo] = useState([]);

  const checkAuth = async () => {
    var user = await getStoreData('USER');
    setUserInfo(user);
    console.log('user payment:', user);
  };
  useEffect(function () {
    checkAuth();
  }, []);
  var vehicle = useSelector(state => state.vehicle);
  var item = Object.values(vehicle)[0];
  var dpc = 500;
  var rc = 1000;
  var bookingDetails = useSelector(state => state.booking);
  var ta =
    item.rentperhour *
      (bookingDetails.days * (24 + parseInt(bookingDetails.hours))) +
    dpc +
    rc;
  var month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const getDateFormat = (d, t) => {
    var dd = d.split('/');
    var cd =
      dd[2] +
      '-' +
      parseInt(dd[1]) +
      '-' +
      dd[0] +
      ' ' +
      t.substring(0, t.lastIndexOf(' ')) +
      ':00';
    var nd = new Date(cd);
    console.log('Date:', cd + ' Date:' + nd);
    return nd;
  };

  var options = {
    description: 'Credits towards car rent',
    image: `${ServerURL}/images/Logo1.png`,
    currency: 'INR',
    key: 'rzp_test_GQ6XaPC6gMPNwH', // Your api key
    amount: ta * 100,
    name: userInfo.fullname,
    prefill: {
      email: userInfo.emailid,
      contact: userInfo.mobileno,
      name: 'PaynRent',
    },
    theme: {color: '#F37254'},
  };

  const handlePayment = () => {
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <ScrollView style={{marginBottom: 20}}>
      <View
        style={{
          flexDirection: 'column',
          // height: '100vh',
          marginBottom: 20,
          backgroundColor: '#ecf0f1',
          alignItems: 'center',
        }}>
        <View style={{marginTop: 10}}>
          <Text
            style={{fontFamily: 'poppins', fontSize: 20, fontWeight: 'bold'}}>
            Booking Details
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'poppins',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            {item.companyname} {item.modelname}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'baseline'}}>
            <Image
              source={require('../assets/petrol.png')}
              style={{
                resizeMode: 'contain',
                height: 13,
                width: 13,
              }}
            />
            <Text
              style={{
                fontFamily: 'poppins',
                fontWeight: 'bold',
                alignItems: 'flex-start',
              }}>
              {item.fueltype}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Image
              source={require('../assets/manual.png')}
              style={{
                resizeMode: 'contain',
                height: 13,
                width: 13,
              }}
            />
            <Text style={{fontFamily: 'poppins', fontWeight: 'bold'}}>
              {item.mode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'baseline'}}>
            <Image
              source={require('../assets/seat.png')}
              style={{
                resizeMode: 'contain',
                height: 13,
                width: 13,
              }}
            />
            <Text style={{fontFamily: 'poppins', fontWeight: 'bold'}}>
              {item.capacity} Seats
            </Text>
          </View>
        </View>
        <View style={{width: width * 0.6, height: height * 0.12, marginTop: 8}}>
          <Image
            source={{uri: `${ServerURL}/images/${item.icon}`}}
            style={{
              resizeMode: 'contain',
              height: height * 0.12,
              width: width * 0.6,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: 10,
            marginTop: 5,
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <View style={{width: width * 0.6, flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontWeight: 'bold',
                    color: '#008b8b',
                  }}>
                  1008 kms
                </Text>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  included,
                </Text>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#008b8b',
                  }}>
                  without
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontFamily: 'poppins',
                    fontWeight: 'bold',
                    color: '#008b8b',
                  }}>
                  {item.fueltype}
                </Text>
              </View>
              <Text style={{fontFamily: 'poppins', fontWeight: 'bolder'}}>
                Extra Kms @ &#8377; 9/km
              </Text>
            </View>
          </View>
          <View
            style={{
              width: width * 0.1,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  width: 100,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#a9a9a9',
                  padding: 5,
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold'}}>Change Plan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <View style={{alignItems: 'center', width: width * 0.8}}>
            <Text style={{fontWeight: 'bold'}}>
              {bookingDetails.days} Days {bookingDetails.hours} Hours
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              {getDateFormat(
                bookingDetails.startDate,
                bookingDetails.startTime,
              ).getDate() +
                ' ' +
                month[
                  getDateFormat(
                    bookingDetails.startDate,
                    bookingDetails.startTime,
                  ).getMonth()
                ]}
            </Text>

            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#a9a9a9',
                borderStyle: 'dotted',
                width: 100,
                height: 0,
              }}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              {getDateFormat(
                bookingDetails.endDate,
                bookingDetails.endTime,
              ).getDate() +
                ' ' +
                month[
                  getDateFormat(
                    bookingDetails.endDate,
                    bookingDetails.endTime,
                  ).getMonth()
                ]}
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{fontWeight: 'bold'}}>
              {bookingDetails.startTime},{' '}
              {
                days[
                  getDateFormat(
                    bookingDetails.startDate,
                    bookingDetails.startTime,
                  ).getDay()
                ]
              }
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {bookingDetails.endTime},{' '}
              {
                days[
                  getDateFormat(
                    bookingDetails.endDate,
                    bookingDetails.endTime,
                  ).getDay()
                ]
              }
            </Text>
          </View>
        </View>
        <View
          style={{
            // flexDirection: 'column',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: 10,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            // width: width * 0.79,
            height: 60,
            borderTopRightRadius: 10,
            // alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            // height: 50,
            elevation: 10,
            // backgroundColor: 'white',
          }}>
          <Icon
            style={{
              marginLeft: 10,
              marginTop: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            name="location-on"
            size={30}
          />
          <Text
            style={{
              marginTop: 2,
              marginLeft: 35,
              fontSize: 22,
              fontWeight: 'bold',
              color: '#008b8b',
            }}>
            Booking From {bookingDetails.city}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              Base Price
            </Text>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              &#8377; {item.rentperhour}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#a9a9a9',
              borderStyle: 'dotted',
              width: width * 0.85,
              height: 0,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              Delivery & pickup charge
            </Text>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              &#8377; {dpc}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#a9a9a9',
              borderStyle: 'dotted',
              width: width * 0.85,
              height: 0,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              Refundable security deposite
            </Text>
            <Text
              style={{fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold'}}>
              &#8377; {rc}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#a9a9a9',
              borderStyle: 'dotted',
              width: width * 0.85,
              height: 0,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}>
            <Text
              style={{
                fontFamily: 'poppins',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'poppins',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              &#8377;{' '}
              {item.rentperhour *
                (bookingDetails.days * (24 + parseInt(bookingDetails.hours))) +
                dpc +
                rc}
            </Text>
          </View>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
            inclusive of Taxes and insurance
          </Text>
        </View>
        <View>
          <AppButton
            btnWidth={0.87}
            onPress={() => handlePayment()}
            buttonText={'Payment'}
            bgColor="#27ae60"
          />
        </View>
      </View>
    </ScrollView>
  );
}
