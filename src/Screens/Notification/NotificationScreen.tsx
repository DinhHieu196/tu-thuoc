import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Text,
} from 'react-native';
import {logoutAction} from '../../Actions/userPageAction';
import UIText from '../../Component/UIText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchData} from '../../Actions/notificationAction';
import {connect} from 'react-redux';
import {getData} from '../../Utilities/Storage';
import Loading from '../Account/Loading';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../Style/Colors';

const NotificationScreen = (props: any) => {
  const [token, setToken] = useState('');
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getToken();
  }, []);
  const getToken = () => {
    setLoading(true);
    getData('userData')
      .then(res => {
        console.log(res);
        if (res == null) {
          setIsLogin(false);
        } else {
          setToken(res);
          getNotify(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getNotify = (token: string) => {
    axios
      .get(`http://api.idoctors.vn/api/notify`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        if (response.data.success) {
          setNotify(response.data.data);
        }
      })
      .catch(error => Alert.alert(error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    getNotify(token);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const logout = () => {
    navigation.navigate('LoginStack');
    props.logoutAction();
  };

  const readNotify = async (item: any) => {
    if (item.is_new === 1) {
      fetch(`http://api.idoctors.vn/api/notify/${item.id}?is_new=false`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok && response.status === 200) {
            getNotify(token);
            navigation.navigate('DetailNotify', {notify: item});
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      navigation.navigate('DetailNotify', {notify: item});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      {loading ? (
        <Loading />
      ) : isLogin ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={notify}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => readNotify(item)}
                style={[
                  styles.notify,
                  {backgroundColor: item.is_new === 1 ? '#E5E5E5' : 'white'},
                ]}>
                <UIText style={{fontSize: 16, lineHeight: 25}}>
                  {item.content}
                </UIText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign name="clockcircleo" size={16} />
                  <UIText style={{fontSize: 16, lineHeight: 25, marginLeft: 5}}>
                    {item.updated_at}
                  </UIText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Đăng nhập để sử dụng tính năng này</Text>
          <TouchableOpacity
            onPress={() => logout()}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              backgroundColor: Colors.mainColor,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notify: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
});
NotificationScreen.defaultProps = {
  notificationPage: {
    data: {},
  },
};
const mapStateToProps = (state: any) => {
  return {
    notificationPage: state.notificationPage,
    userPage: state.userPage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (id: any) => {
      dispatch(fetchData(id));
    },
    logoutAction: () => {
      dispatch(logoutAction());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
