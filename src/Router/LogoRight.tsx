import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { RouteNames } from './route-names';
import { connect } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import storage from '../Utilities/Storage';

const LogoRight = (props: any) => {
  const [tokenKey, setTokenKey] = useState('');   
  useEffect(() => {  
    storage.getData('userData').then(tokenKey => {
        setTokenKey(tokenKey == null ? '' : tokenKey)            
    });
  }, []);
  if(tokenKey == '') {
    return <View></View>
  }
  return (
    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 15 }} onPress={() => Linking.openURL('tel:+84383839094')}>
        <FontAwesome name="phone" size={30} color="white" />        
      </TouchableOpacity>
      {props.editProfile ?
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => props.navigation.navigate(RouteNames.EDITACCOUNT)}>
          <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold' }}>Sửa</Text>
        </TouchableOpacity> : null
      }
      <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 15 }} onPress={() => props.navigation.navigate("ShoppingCart")}>
        <Image
          source={require('../assets/shopping-cart.png')}
          style={{ width: 27.93, height: 25.39 }}
        />
        {props.cartPage.data.length > 0 ?
          <View style={styles.itemCart}>
            <Text style={{ color: '#5BC8AC' }}>{props.cartPage.data.length}</Text>
          </View> : null
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemCart: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5BC8AC",
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    bottom: 8,
    left: 10,
    alignItems: "center",
    justifyContent: "center"
  }
})

const mapStateToProps = (state: any) => {
  return {
    userPage: state.userPage,
    cartPage: state.cartPage,
  };
};

export default connect(mapStateToProps)(LogoRight);
