import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import {useNavigation, StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUserData} from '../../Actions/userPageAction';
import {getData} from '../../Utilities/Storage';
import axios from 'axios';
import Config from '../../config';

const SplashScreen = (props: any) => {
  const navigation = useNavigation();
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fadeIn();
    loading();
  }, []);

  const loading = async () => {
    await props.getUserData();
    setTimeout(() => {
      getProfile();
    }, 3000);
  };

  const getProfile = async () => {
    try {
      const data = await getData('userData');
      const response = await axios.get(
        `${Config.api.api_base_url}/api/profile`,
        {headers: {Authorization: `Bearer ${data}`}},
      );
      console.log(response);
      if (response.data.success) {
        props.navigation.dispatch(StackActions.replace('MainDrawer'));
      } else {
        props.navigation.dispatch(StackActions.replace('LoginStack'));
      }
    } catch (e) {
      props.navigation.dispatch(StackActions.replace('LoginStack'));
    }
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => console.log(props.userPage.userInfo)}>
        <Animated.View style={[{opacity, alignItems: 'center'}]}>
          <Image source={require('../../assets/doctor.png')} />
          <UIText style={styles.textSplash}></UIText>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSplash: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

SplashScreen.defaultProps = {
  userPage: {
    data: '',
    isFetching: false,
  },
};
const mapStateToProps = (state: any) => {
  return {
    userPage: state.userPage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserData: () => {
      dispatch(getUserData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
