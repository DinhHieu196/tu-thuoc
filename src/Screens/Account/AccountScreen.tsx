import React, {useState} from 'react';
import {get} from 'lodash';
import {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Clipboard,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import UIText from '../../Component/UIText';
import Colors from '../../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../Style/CommonStyles';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {RouteNames} from '../../Router/route-names';
import {
  getUserData,
  logoutAction,
  fetchCommission,
} from '../../Actions/userPageAction';
import {connect} from 'react-redux';
import Config from '../../config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Loading from '../Account/Loading';
import {getData} from '../../Utilities/Storage';
import {number_format} from '../../Utilities/Number';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import moment from 'moment';
import CommonVariable from '../../Style/Variable';

const AccountScreen = (props: any) => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [specialty, setSpecialty] = useState([]);
  const [refund, setRefund] = useState([]);
  const [modalCalendar, setModalCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [startDate, setStateDate] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const param = route.params as any;

  if (param != null && param.reload == true) {
    console.log('OKEE');
  }

  useEffect(() => {
    props.fetchCommission(startDate, endDate);
    getToken();
    getData1();
    // getData('userData').then(res => {
    //   if (res == null) {
    //     setIsLogin(false);
    //   } else {
    //     axios
    //       .get(`${Config.api.api_base_url}/api/settings`, {
    //         headers: {Authorization: `Bearer ${res}`},
    //       })
    //       .then(res => {
    //         if (res.data.success) {
    //           setRefund(res.data.data);
    //         }
    //       })
    //       .catch(err => console.log(err));
    //   }
    // });
    getInitialDates();
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
          getSettings(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSettings = async (token: string) => {
    axios
      .get(`${Config.api.api_base_url}/api/settings`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.success) {
          setRefund(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  const getData1 = async () => {
    axios
      .get(`${Config.api.api_base_url}/api/specialty`)
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setSpecialty(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  const logout = () => {
    props.logoutAction();
    props.navigation.dispatch(StackActions.replace('LoginStack'));
  };

  const getSpecialty = (id: number) => {
    const data = specialty.filter((item: any) => item.id === id) as any;
    if (data.length > 0) {
      return data[0].name;
    } else {
      return null;
    }
  };

  const getInitialDates = () => {
    const obj: any = Object.assign({}, markedDates);
    var start = new Date(startDate);
    var end = new Date(endDate);
    var difference = end.getTime() - start.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    obj[startDate] = {
      startingDay: true,
      color: Colors.mainColor,
      textColor: 'white',
      borderRadius: 30,
    };
    for (let i = 0; i < days - 1; i++) {
      obj[
        moment(new Date(startDate))
          .add(i + 1, 'days')
          .format('YYYY-MM-DD')
      ] = {color: '#FFE0CF'};
    }
    obj[endDate] = {
      endingDay: true,
      color: Colors.mainColor,
      textColor: 'white',
      borderRadius: 30,
    };
    setMarkedDates(obj);
  };

  const onDateChange = (date: any) => {
    let keys = Object.keys(markedDates).length;
    let newObj: any = Object.assign({}, markedDates);
    if (keys > 1) {
      for (let index = 0; index < keys; index++) {
        delete newObj[Object.keys(markedDates)[index]];
      }
      newObj[date.dateString] = {
        startingDay: true,
        color: Colors.mainColor,
        textColor: 'white',
      };
    } else {
      let listDate = [];
      var startDate = Object.keys(markedDates)[0];
      var endDate = date.dateString;
      const dateMove = new Date(startDate);
      let strDate = startDate;
      if (endDate < strDate) {
        delete newObj[startDate];
        newObj[date.dateString] = {
          startingDay: true,
          color: Colors.mainColor,
          textColor: 'white',
        };
      }
      while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
      }
      listDate.map((date, index) => {
        if (index > 0 && index < listDate.length - 1) {
          newObj[date] = {color: '#FFE0CF'};
        }
        if (index == listDate.length - 1) {
          newObj[date] = {
            endingDay: true,
            color: Colors.mainColor,
            textColor: 'white',
          };
        }
      });
    }
    setMarkedDates(newObj);
  };

  const onSelect = (data?: String) => {
    if (data != null) {
      console.log(data);
    }
  };
  return isLogin ? (
    <SafeAreaView style={{borderRadius: 0, backgroundColor: '#F5F5F5'}}>
      <Modal
        visible={modalCalendar}
        height={1}
        width={1}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <ModalContent style={{paddingHorizontal: 0, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <View />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                setModalCalendar(false);
              }}
              style={{padding: 10}}>
              <AntDesign name="closecircleo" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <Calendar
            markingType={'period'}
            minDate={'2000-01-01'}
            maxDate={moment().format('YYYY-MM-DD')}
            firstDay={1}
            markedDates={markedDates}
            // hideDayNames={true}
            // minDate={moment().format("YYYY-MM-DD")}
            onDayPress={(day: any) => {
              onDateChange(day);
            }}
            theme={{
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: Colors.mainColor,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: Colors.mainColor,
              indicatorColor: Colors.mainColor,
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
            }}
          />
          <View style={styles.viewBottom}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{fontSize: 12, textAlign: 'center', lineHeight: 25}}>
                  Bắt đầu
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: '500',
                  }}>
                  {moment(new Date(Object.keys(markedDates)[0])).format(
                    'DD/MM/YYYY',
                  )}
                </Text>
              </View>
              {/* <SimpleLineIcons name="arrow-right-circle" size={25} color="#666666" style={{ marginHorizontal: 12 }} /> */}
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{fontSize: 12, textAlign: 'center', lineHeight: 25}}>
                  Kết thúc
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: '500',
                  }}>
                  {Object.keys(markedDates).length > 1
                    ? moment(
                        new Date(
                          Object.keys(markedDates)[
                            Object.keys(markedDates).length - 1
                          ],
                        ),
                      ).format('DD/MM/YYYY')
                    : 'Chưa chọn'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (Object.keys(markedDates).length > 1) {
                  props.fetchCommission(
                    Object.keys(markedDates)[0],
                    Object.keys(markedDates)[
                      Object.keys(markedDates).length - 1
                    ],
                  );
                  setStateDate(Object.keys(markedDates)[0]);
                  setEndDate(
                    Object.keys(markedDates)[
                      Object.keys(markedDates).length - 1
                    ],
                  );
                  setModalCalendar(false);
                }
              }}
              style={{
                padding: 15,
                backgroundColor:
                  Object.keys(markedDates).length > 1
                    ? Colors.mainColor
                    : '#cccccc',
                borderRadius: 10,
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Chọn
              </Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
      <ScrollView>
        <View style={{marginTop: 15, paddingHorizontal: 15}}>
          <View style={styles.user}>
            <Image
              source={require('../../assets/user.png')}
              style={{width: 50, height: 50, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <UIText
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {get(props, 'userPage.userInfo.name', '')}
                </UIText>
                <UIText
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'red',
                  }}>
                  {get(props, 'userPage.userInfo.vip', '') == 1 ? 'VIP' : ''}
                </UIText>
              </View>
              <UIText>{get(props, 'userPage.userInfo.phone', '')}</UIText>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomColor: '#c3c3c3',
              borderBottomWidth: 1,
            }}>
            <UIText style={{fontSize: 16}}>
              Email: {get(props, 'userPage.userInfo.email', '')}
            </UIText>
          </View>
          {get(props, 'userPage.userInfo.address') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16, marginBottom: 3}}>Địa chỉ: </UIText>
              <UIText>{get(props, 'userPage.userInfo.address', '')}</UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.specialty_id') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16}}>
                Chuyên khoa:{' '}
                {getSpecialty(get(props, 'userPage.userInfo.specialty_id'))}
              </UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.certificate') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16, marginBottom: 3}}>
                Số Chứng chỉ hành nghề:{' '}
              </UIText>
              <UIText>{get(props, 'userPage.userInfo.certificate')}</UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.work_place') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16, marginBottom: 3}}>
                Nơi công tác:{' '}
              </UIText>
              <UIText>{get(props, 'userPage.userInfo.work_place')}</UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.clinic_name') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16, marginBottom: 3}}>
                Tên phòng khám:{' '}
              </UIText>
              <UIText>{get(props, 'userPage.userInfo.clinic_name')}</UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.address_clinic') !== null && (
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#c3c3c3',
                borderBottomWidth: 1,
              }}>
              <UIText style={{fontSize: 16, marginBottom: 3}}>
                Địa chỉ phòng khám:{' '}
              </UIText>
              <UIText>{get(props, 'userPage.userInfo.address_clinic')}</UIText>
            </View>
          )}
          {get(props, 'userPage.userInfo.account_bank') !== null &&
            get(props, 'userPage.userInfo.bank') !== null && (
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#c3c3c3',
                  borderBottomWidth: 1,
                }}>
                <UIText style={{fontSize: 16, marginBottom: 3}}>
                  Tài khoản:{' '}
                </UIText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <UIText>
                    {get(props, 'userPage.userInfo.account_bank', '')}
                  </UIText>
                  <UIText>{get(props, 'userPage.userInfo.bank', '')}</UIText>
                </View>
              </View>
            )}
          <View
            style={{
              paddingVertical: 10,
              marginTop: 10,
              borderBottomColor: '#c3c3c3',
              borderBottomWidth: 1,
            }}>
            <UIText
              style={{fontSize: 16, marginBottom: 3, textAlign: 'center'}}>
              Bảng thống kê doanh thu{' '}
            </UIText>
            {props.userPage.revenue.length > 0 ? (
              <View>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={{flex: 1}}>
                    <UIText style={{textAlign: 'left', fontWeight: 'bold'}}>
                      Ngày
                    </UIText>
                  </View>
                  <View style={{flex: 1}}>
                    <UIText style={{textAlign: 'center', fontWeight: 'bold'}}>
                      Đơn hàng
                    </UIText>
                  </View>
                  <View style={{flex: 1}}>
                    <UIText style={{textAlign: 'right', fontWeight: 'bold'}}>
                      Tổng tiền
                    </UIText>
                  </View>
                </View>
                {props.userPage.revenue.map((item: any, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{flexDirection: 'row', paddingVertical: 5}}>
                      <View style={{flex: 1}}>
                        <UIText style={{textAlign: 'left'}}>
                          {item.date_time}
                        </UIText>
                      </View>
                      <View style={{flex: 1}}>
                        <UIText style={{textAlign: 'center'}}>
                          {item.total_orders}
                        </UIText>
                      </View>
                      <View style={{flex: 1}}>
                        <UIText style={{textAlign: 'right'}}>
                          {number_format(item.total_price, 0, '', '.') + 'đ'}
                        </UIText>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <UIText style={{marginTop: 10}}>
                Bạn chưa có đơn hàng nào được hoàn thành
              </UIText>
            )}
          </View>
        </View>
        <View style={styles.viewCommission}>
          <UIText style={{fontSize: 16, textAlign: 'center', marginBottom: 8}}>
            Chiết khấu
          </UIText>
          <TouchableOpacity
            onPress={() => {
              // setModalCalendar(true);
              navigation.navigate(RouteNames.CALENDARSCREEN);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UIText style={{marginRight: 5}}>
                {get(props, 'userPage.commission.startDate', startDate)} -{' '}
                {get(props, 'userPage.commission.endDate', endDate)}
              </UIText>
              <AntDesign name="caretdown" size={12} color="#0A0A0A" />
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'left', fontWeight: 'bold'}}>
                Doanh thu
              </UIText>
            </View>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'center', fontWeight: 'bold'}}>
                Đơn hàng
              </UIText>
            </View>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'right', fontWeight: 'bold'}}>
                Chiết khấu
              </UIText>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'left'}}>
                {number_format(
                  get(props, 'userPage.commission.commission.total_reven', '0'),
                  0,
                  '',
                  '.',
                ) + 'đ'}
              </UIText>
            </View>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'center'}}>
                {get(props, 'userPage.commission.commission.total', '0')}
              </UIText>
            </View>
            <View style={{flex: 1}}>
              <UIText style={{textAlign: 'right'}}>
                {number_format(
                  get(
                    props,
                    'userPage.commission.commission.total_after_promotion',
                    '0',
                  ),
                  0,
                  '',
                  '.',
                ) + 'đ'}
              </UIText>
            </View>
          </View>
        </View>
        <View>
          {get(props, 'userPage.userInfo.referral') !== null && (
            <View style={styles.viewCode}>
              <UIText style={{fontSize: 16}}>Mã giới thiệu: </UIText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <UIText style={{marginRight: 10}}>
                  {get(props, 'userPage.userInfo.referral', '')}
                </UIText>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(
                      get(props, 'userPage.userInfo.referral', ''),
                    );
                    Toast.show({
                      type: 'success',
                      position: 'top',
                      text1: 'Thông báo',
                      text2: 'Sao chép mã giới thiệu',
                      visibilityTime: 500,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 40,
                    });
                  }}>
                  <Ionicons name="copy-outline" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{padding: 15, paddingBottom: 0}}>
            {/* <UIText style={{ lineHeight: 25 }}>CÔNG TY TNHH EURO PHARM VN (EURO PHARM VN CO.,LTD.)</UIText>
                        <UIText style={{ lineHeight: 25 }}>MST: 0107486110</UIText> */}
            <UIText style={{lineHeight: 25}}>
              Địa chỉ: Số 90, Đường Trung Kính, Phường Yên Hòa, Quận Cầu Giấy,
              TP.Hà Nội
            </UIText>
            <UIText style={{lineHeight: 25}}>Hotline: 024.2123.9797</UIText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[CommonStyles.center, styles.btnLogOut, {marginBottom: 0}]}
            onPress={() =>
              navigation.navigate(RouteNames.MYORDER, {onSelect: onSelect()})
            }>
            <UIText style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              LỊCH SỬ ĐƠN HÀNG
            </UIText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[CommonStyles.center, styles.btnLogOut, {marginBottom: 0}]}
            onPress={() => navigation.navigate(RouteNames.CHANGEPASSWORD)}>
            <UIText style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              ĐỔI MẬT KHẨU
            </UIText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[CommonStyles.center, styles.btnLogOut]}
            onPress={() => logout()}>
            <UIText style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              ĐĂNG XUẤT
            </UIText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnSupport: {
    fontSize: 16,
    color: '#363636',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  hotline: {
    fontSize: 16,
    color: Colors.mainColor,
    fontFamily: 'Arial',
  },
  btnHotline: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  btnIntro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 15,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopColor: '#c3c3c3',
    borderTopWidth: 1,
    borderBottomColor: '#c3c3c3',
    borderBottomWidth: 1,
  },
  address: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginTop: 15,
  },
  btnLogOut: {
    backgroundColor: Colors.mainColor,
    margin: 15,
    height: 45,
    borderRadius: 25,
  },
  viewCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  viewCommission: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: CommonVariable.screenWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
AccountScreen.defaultProps = {
  userPage: {
    data: {},
    isFetching: false,
  },
};
const mapStateToProps = (state: any) => {
  return {
    userPage: state.userPage,
    homepage: state.homepage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserData: () => {
      dispatch(getUserData());
    },
    logoutAction: () => {
      dispatch(logoutAction());
    },
    fetchCommission: (starDate: string, endDate: string) => {
      dispatch(fetchCommission(starDate, endDate));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
