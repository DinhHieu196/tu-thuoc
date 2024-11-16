import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
//import * as React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SpeciesScreen from '../Screens/HomeScreen/SpeciesScreen';
import SearchScreen from '../Screens/HomeScreen/SearchScreen';
import DetailProduct from '../Screens/HomeScreen/DetailProduct';
import ShoppingCart from '../Screens/HomeScreen/ShoppingCart';
import PayScreen from '../Screens/HomeScreen/PayScreen';
import SelectAddress from '../Screens/HomeScreen/SelectAddress';
import PayDone from '../Screens/HomeScreen/PayDone';
import FilterProduct from '../Screens/HomeScreen/FilterProduct';
import FlashSale from '../Screens/HomeScreen/FlashSale';
import DetailNews from '../Screens/HomeScreen/DetailNews';
import OTPScreen from '../Screens/Login/OTPScreen';
import LoginPhone from '../Screens/Login/LoginPhone';
import ForgotPassword from '../Screens/Login/ForgotPassword';
import SignUpScreen from '../Screens/Login/SignUpScreen';
import SplashScreen from '../Screens/Login/SplashScreen';
import NotificationScreen from '../Screens/Notification/NotificationScreen';
import DetailNotify from '../Screens/Notification/DetailNotify';
import AccountScreen from '../Screens/Account/AccountScreen';
import ChangePassword from '../Screens/Account/ChangePassword';
import Loading from '../Screens/Account/Loading';
import MyOrder from '../Screens/Account/MyOrder';
import EditAccount from '../Screens/Account/EditAccount';
import CalendarScreen from '../Screens/Account/CalendarScreen';
import {RouteNames} from './route-names';
import Colors from '../Style/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LogoRight from './LogoRight';
import UIText from '../Component/UIText';
import storage from '../Utilities/Storage';
import ButtonBack from './ButtonBack';
import {navigationRef} from './RootNavigation';
import AgreementScreen from '../Screens/Login/AgreementScreen';

const Stack = createStackNavigator();

const headerTitle = (headerLeft?: boolean) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: headerLeft ? 15 : 0,
      }}>
      <UIText style={{color: '#FFFFFF'}}></UIText>
      <Image
        source={require('../assets/doctor.png')}
        style={{height: 40, width: 27}}
      />
    </View>
  );
};

function HomeScreenStack({navigation}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <AntDesign
            name="left"
            size={25}
            color="white"
            style={{marginLeft: 5}}
          />
        ),
        headerBackTitleStyle: {color: 'white'},
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RouteNames.HOMESCREEN}
        component={HomeScreen}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerLeft: () => null,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.DETAILPRODUCT}
        component={DetailProduct}
        options={{
          headerTitle: 'Chi tiết sản phẩm',
          headerTitleStyle: styles.textTitle,
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.SPECIESSCREEN}
        component={SpeciesScreen}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.SEARCHSCREEN}
        component={SearchScreen}
        options={{
          headerTitle: 'Tìm kiếm',
          headerTitleStyle: styles.textTitle,
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          headerTitleStyle: styles.textTitle,
          headerTitle: 'Giỏ hàng',
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.PAYSCREEN}
        component={PayScreen}
        options={{
          headerTitle: 'Thanh toán',
          headerTitleStyle: styles.textTitle,
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.SELECTADDRESS}
        component={SelectAddress}
        options={{
          headerTitle: 'Chọn địa chỉ',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.PAYDONE}
        component={PayDone}
        options={{
          headerTitle: 'Thanh toán',
          headerTitleStyle: styles.textTitle,
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.FILTERPRODUCT}
        component={FilterProduct}
        options={{
          headerTitle: 'Lọc sản phẩm',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.FLASHSALE}
        component={FlashSale}
        options={{
          headerTitle: 'FLASH SALE',
          headerTitleStyle: styles.textTitle,
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.LOGINPHONE}
        component={LoginPhone}
        options={{
          // headerShown: false
          headerTitle: '',
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.FORGOTPASS}
        //component={LoginScreen}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.SIGNUPSCREEN}
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.LOADING}
        component={Loading}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={RouteNames.DETAILNEWS}
        component={DetailNews}
        options={{
          headerTitle: () => headerTitle(),
          // headerRight: props => <LogoRight {...props} navigation={navigation} />,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

function FavouriteStack({navigation}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <AntDesign
            name="left"
            size={25}
            color="white"
            style={{marginLeft: 5}}
          />
        ),
        headerBackTitleStyle: {color: 'white'},
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RouteNames.SPECIESSCREEN}
        component={SpeciesScreen}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerLeft: () => null,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

function NotificationStack({navigation}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <AntDesign
            name="left"
            size={25}
            color="white"
            style={{marginLeft: 5}}
          />
        ),
        headerBackTitleStyle: {color: 'white'},
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RouteNames.NOTIFICATIONSCREEN}
        component={NotificationScreen}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerLeft: () => null,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={'DetailNotify'}
        component={DetailNotify}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

function FlashSaleStack({navigation}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <AntDesign
            name="left"
            size={25}
            color="white"
            style={{marginLeft: 5}}
          />
        ),
        headerBackTitleStyle: {color: 'white'},
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RouteNames.FLASHSALE}
        component={FlashSale}
        options={{
          headerTitle: () => headerTitle(),
          headerRight: props => (
            <LogoRight {...props} navigation={navigation} />
          ),
          headerLeft: () => null,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.DETAILNEWS}
        component={DetailNews}
        options={{
          headerTitle: () => headerTitle(),
          // headerRight: props => <LogoRight {...props} navigation={navigation} />,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack({navigation}: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <AntDesign
            name="left"
            size={25}
            color="white"
            style={{marginLeft: 5}}
          />
        ),
        headerBackTitleStyle: {color: 'white'},
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RouteNames.ACCOUNTSCREEN}
        component={AccountScreen}
        options={{
          headerLeft: () => headerTitle(true),
          headerRight: props => (
            <LogoRight {...props} editProfile navigation={navigation} />
          ),
          headerTitle: '',
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.MYORDER}
        component={MyOrder}
        options={{
          headerLeft: props => (
            <ButtonBack {...props} navigation={navigation} />
          ),
          headerTitle: 'Lịch sử đơn hàng',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.EDITACCOUNT}
        component={EditAccount}
        options={{
          headerTitle: 'Sửa thông tin',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.CALENDARSCREEN}
        component={CalendarScreen}
        options={{
          headerTitle: 'Chiết khấu',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name={RouteNames.CHANGEPASSWORD}
        component={ChangePassword}
        options={{
          headerTitle: 'Đổi mật khẩu',
          headerTitleStyle: styles.textTitle,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MainTab() {
  const TabIcon = (name: string, focused: boolean) => {
    const renderIcon = () => {
      switch (name) {
        case 'Trang chủ':
          if (focused)
            return (
              <Image
                source={require(`../assets/home1.png`)}
                style={{marginTop: 3, width: 25.61, height: 22.83}}
              />
            );
          else
            return (
              <Image
                source={require(`../assets/home2.png`)}
                style={{marginTop: 3, width: 25.61, height: 22.83}}
              />
            );
        case 'Kho thuốc':
          if (focused)
            return (
              <Image
                source={require(`../assets/medicine1.png`)}
                style={{marginTop: 3, width: 24.53, height: 23.21}}
              />
            );
          else
            return (
              <Image
                source={require(`../assets/medicine.png`)}
                style={{marginTop: 3, width: 24.53, height: 23.21}}
              />
            );
        case 'Tin tức':
          if (focused)
            return (
              <Image
                source={require(`../assets/news1.png`)}
                style={{marginTop: 3, width: 23.67, height: 22.1}}
              />
            );
          else
            return (
              <Image
                source={require(`../assets/news.png`)}
                style={{marginTop: 3, width: 23.67, height: 22.1}}
              />
            );
        case 'Thông báo':
          if (focused)
            return (
              <Image
                source={require(`../assets/bell-1.png`)}
                style={{marginTop: 3, width: 18.6, height: 22.83}}
              />
            );
          else
            return (
              <Image
                source={require(`../assets/bell.png`)}
                style={{marginTop: 3, width: 18.6, height: 22.83}}
              />
            );
        case 'Tài khoản':
          if (focused)
            return (
              <Image
                source={require(`../assets/acc1.png`)}
                style={{marginTop: 3, width: 22.83, height: 22.83}}
              />
            );
          else
            return (
              <Image
                source={require(`../assets/acc2.png`)}
                style={{marginTop: 3, width: 22.83, height: 22.83}}
              />
            );
      }
    };
    return <View>{renderIcon()}</View>;
  };

  const TabLabel = (name: string, focused: boolean) => {
    return name == 'FlashSale' ? (
      <Text></Text>
    ) : (
      <Text
        style={[styles.label, {color: focused ? Colors.mainColor : '#909090'}]}>
        {name}
      </Text>
    );
  };

  const _getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // const routeName = route.state
    // ? route.state.routes[route.state.index].name
    // : '';
    if (routeName === RouteNames.LOGINPHONE) {
      return false;
    } else if (routeName === RouteNames.PAYDONE) {
      return false;
    } else if (routeName === RouteNames.FORGOTPASS) {
      return false;
    } else if (routeName === RouteNames.SIGNUPSCREEN) {
      return false;
    } else if (routeName === RouteNames.DETAILPRODUCT) {
      return false;
    } else if (routeName === RouteNames.SHOPPINGCART) {
      return false;
    } else if (routeName === RouteNames.PAYSCREEN) {
      return false;
    } else if (routeName === RouteNames.SEARCHSCREEN) {
      return false;
    } else if (routeName === RouteNames.DETAILNEWS) {
      return false;
    } else if (routeName === RouteNames.CHANGEPASSWORD) {
      return false;
    } else if (routeName === RouteNames.EDITACCOUNT) {
      return false;
    } else if (routeName === RouteNames.MYORDER) {
      return false;
    } else if (routeName === 'DetailNotify') {
      return false;
    } else if (routeName === RouteNames.CALENDARSCREEN) {
      return false;
    } else if (routeName === RouteNames.SELECTADDRESS) {
      return false;
    }

    return true;
  };
  // const [tokenKey, setTokenKey] = useState('');
  // useEffect(() => {
  //   storage.getData('userData').then(tokenKey => {
  //     setTokenKey(tokenKey == null ? '' : tokenKey)
  //   });
  // }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (route.name === 'Trang chủ') {
            return TabIcon('Trang chủ', focused);
          } else if (route.name === 'Kho thuốc') {
            return TabIcon('Kho thuốc', focused);
          } else if (route.name === 'Tin tức') {
            return TabIcon('Tin tức', focused);
          } else if (route.name === 'Thông báo') {
            return TabIcon('Thông báo', focused);
          } else if (route.name === 'Tài khoản') {
            return TabIcon('Tài khoản', focused);
          }
        },
        tabBarLabel: ({focused}) => {
          if (route.name === 'Trang chủ') {
            return TabLabel('Trang chủ', focused);
          } else if (route.name === 'Kho thuốc') {
            return TabLabel('Kho thuốc', focused);
          } else if (route.name === 'Tin tức') {
            return TabLabel('Tin tức', focused);
          } else if (route.name === 'Thông báo') {
            return TabLabel('Thông báo', focused);
          } else if (route.name === 'Tài khoản') {
            return TabLabel('Tài khoản', focused);
          }
        },
      })}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreenStack}
        options={({route}) => ({
          tabBarVisible: _getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Kho thuốc"
        component={FavouriteStack}
        options={({route}) => ({
          tabBarVisible: _getTabBarVisibility(route),
        })}
      />
      {/* {tokenKey != '' &&  */}
      <Tab.Screen
        name="Thông báo"
        component={NotificationStack}
        options={({route}) => ({
          tabBarVisible: _getTabBarVisibility(route),
        })}
      />
      {/* // } */}
      <Tab.Screen
        name="Tin tức"
        component={FlashSaleStack}
        options={({route}) => ({
          tabBarVisible: _getTabBarVisibility(route),
        })}
      />
      {/* {tokenKey != '' &&  */}
      <Tab.Screen
        name="Tài khoản"
        component={AccountStack}
        options={({route}) => ({
          tabBarVisible: _getTabBarVisibility(route),
        })}
      />
      {/* } */}
    </Tab.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {color: '#474747'},
        headerLeft: () => null,
      }}>
      <Stack.Screen
        name={RouteNames.LOGINPHONE}
        component={LoginPhone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.FORGOTPASS}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.SIGNUPSCREEN}
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.POLICY_SCREEN}
        component={AgreementScreen}
        options={{
          headerStyle: styles.header,
          title: 'Điều khoản chính sách',
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.OTPSCREEN}
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={'SplashScreen'}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'LoginStack'}
          component={LoginStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'MainDrawer'}
          component={MainTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.mainColor,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
  itemCart: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5BC8AC',
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    bottom: 8,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginBottom: 3,
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
  },
});
