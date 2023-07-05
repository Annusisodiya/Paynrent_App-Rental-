import React, {useState, useEffect} from 'react';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ListCars from '../screens/ListCars';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Image, Text} from 'react-native';
import AppHeader from '../uicomponents/AppHeader';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {getStoreData, removeStoreData} from '../storage/AsyncStroage';
import BookingSummary from '../screens/BookingSummary';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function RootNavigation() {
  const [initialScreen, setInitialScreen] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const checkAuth = async () => {
    var user = await getStoreData('USER');
    setUserInfo(user);
    console.log('user:', user);
    if (!user) setInitialScreen('Login');
    else setInitialScreen('Home1');
  };
  const handleLogout = props => {
    removeStoreData('USER');
    props.navigation.navigate('Login');
  };
  useEffect(() => {
    checkAuth();
  }, []);
  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,

            drawerIcon: () => <MCI name={'home-city'} size={24} />,
          }}
        />
        <Drawer.Screen
          name="ListCars"
          component={ListCars}
          options={{
            headerShown: false,
            drawerIcon: () => <MCI name={'car'} size={24} />,
          }}
        />
      </Drawer.Navigator>
    );
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            display: 'flex',
            padding: 20,
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Image
            style={{
              marginBottom: 5,
              borderRadius: 50,
              resizeMode: 'contain',
              width: 100,
              height: 100,
            }}
            source={require('../assets/pratishthaa.jpg')}
          />
          <Text style={{fontWeight: 'bold'}}>{userInfo.fullname}</Text>
          <Text>+91{userInfo.mobileno}</Text>
          <Text style={{fontSize: 12}}>{userInfo.emailid}</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="My Profile"
          icon={() => <MCI name={'account-box'} size={24} />}
        />
        <DrawerItem
          label="Settings"
          icon={() => <MCI name={'account-settings'} size={24} />}
        />

        <DrawerItem
          label="Logout"
          onPress={() => handleLogout(props)}
          icon={() => <MCI name={'logout'} size={24} />}
        />
      </DrawerContentScrollView>
    );
  }
  return (
    <NavigationContainer>
      {initialScreen ? (
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            name="Home1"
            component={ProjectDrawer}
            options={{
              header: AppHeader,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookingSummary"
            component={BookingSummary}
            options={{
              header: AppHeader,
            }}
          />

          <Stack.Screen
            name="ListCars"
            component={ListCars}
            options={{
              header: AppHeader,
            }}
          />
          <Stack.Screen
            name="AppHeader"
            component={AppHeader}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Text>Pls withRepeat...</Text>
      )}
    </NavigationContainer>
  );
}
