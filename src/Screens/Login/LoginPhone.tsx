import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  LogBox,
  Platform,
  PermissionsAndroid,
  Text,
  Clipboard,
} from "react-native";
import { size, get } from "lodash";
import Body from "../Element/Body";
import Colors from "../../Style/Colors";
import UIText from "../../Component/UIText";
import CommonStyles from "../../Style/CommonStyles";
import {
  useNavigation,
  useRoute,
  StackActions,
} from "@react-navigation/native";
import { RouteNames } from "../../Router/route-names";
import Toast from "react-native-toast-message";
import {
  loginAction,
  resetAction,
  getUserData,
} from "../../Actions/userPageAction";
import { connect } from "react-redux";
import CommonVariable from "../../Style/Variable";
import { getData } from "../../Utilities/Storage";
/**
 phone: 0964896239
 pass: 366935

 phone: 0984067454
 pass: 12345678

 phone: 0979239227
 pass: 123456
 
 */
const LoginPhone = (props: any) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // const [typeUser, setTypeUser] = useState(1);
  const [tokenDevice, setTokenDevice] = useState();

  useEffect(() => {
    checkApplicationPermission();
  }, []);

  const getToken = async () => {
    const token = await getData("deviceToken");
    if (token != undefined) {
      Clipboard.setString(tokenDevice != undefined ? tokenDevice : "null");
      console.log(token);
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Thông báo",
        text2: "K có token",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    setTokenDevice(token);
  };

  if (props.userPage.isFetching === false && props.userPage.message !== "") {
    Toast.show({
      type: get(props, "userPage.error", true) === true ? "error" : "success",
      position: "top",
      text1: "Thông báo",
      text2: props.userPage.message,
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onHide: () => {
        if (get(props, "userPage.message", "") === "Đăng nhập thành công") {
          props.getUserData();
          props.navigation.dispatch(StackActions.replace("MainDrawer"));
        }
      },
      onShow: () => {
        props.resetAction();
      },
    });
    if (size(props.userPage.data) > 0) {
      console.log(props.userPage.data);
      props.navigation.dispatch(StackActions.replace("MainDrawer"));
    }
  }

  const checkApplicationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (error) {}
    }
  };
  return (
    <Body
      style={styles.container}
      // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <UIText style={{ textAlign: "center", lineHeight: 25 }}>
              Trước khi đăng ký tài khoản bạn phải xác nhận bạn là Chuyên gia Y
              tế
            </UIText>
            <View style={{ marginTop: 15 }}>
              {/* <TouchableOpacity activeOpacity={0.7} onPress={() => setTypeUser(1)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <View style={styles.radio}>
                                    {typeUser === 1 && <View style={styles.radioSelect}></View>}
                                </View>
                                <UIText>Tài khoản thường</UIText>
                            </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setConfirm(!confirm);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={styles.radio}>
                  {confirm && <View style={styles.radioSelect}></View>}
                </View>
                <UIText>Tôi là Chuyên gia Y tế</UIText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setModalVisible(false);
                  setConfirm(false);
                }}
                style={styles.btnModal}
              >
                <UIText style={{ color: "white", textAlign: "center" }}>
                  Huỷ bỏ
                </UIText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.btnModal,
                  { backgroundColor: confirm ? Colors.mainColor : "white" },
                ]}
                onPress={() => {
                  if (confirm) {
                    setModalVisible(false);
                    setConfirm(false);
                    navigation.navigate(RouteNames.SIGNUPSCREEN, {
                      typeUser: 2,
                    });
                  }
                }}
              >
                <UIText
                  style={{
                    color: confirm ? "white" : Colors.mainColor,
                    textAlign: "center",
                  }}
                >
                  Đăng ký
                </UIText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={[CommonStyles.center, { marginTop: 100 }]}>
        <Image
          source={require("../../assets/login.png")}
          style={{ width: CommonVariable.screenWidth, height: 250 }}
        />
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Clipboard.setString(
              tokenDevice != undefined ? tokenDevice : "null"
            );
            Toast.show({
              type: "success",
              position: "top",
              text1: "Thông báo",
              text2: "Đã sao chép số điện thoại",
              visibilityTime: 1000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }}
        >
          <Text>{tokenDevice != "" ? tokenDevice : "null"}</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ marginTop: 30 }}>
        <TextInput
          placeholder="Số điện thoại"
          placeholderTextColor="#6A6A6A"
          defaultValue={phone}
          style={styles.textInput}
          onChangeText={(username) => setPhone(username)}
        />
        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor="#6A6A6A"
          secureTextEntry={true}
          defaultValue={password}
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
        />
        <View
          style={{
            marginHorizontal: 25,
            alignItems: "flex-end",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(RouteNames.FORGOTPASS);
            }}
            activeOpacity={0.8}
          >
            <UIText style={styles.textBtnRegister}>Quên mật khẩu?</UIText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 30, justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnLogin}
          onPress={() => {
            if (phone === "" || password === "") {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Thông báo",
                text2: "Vui lòng điền đầy đủ email và password",
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            } else {
              props.loginAction(phone, password);
            }
          }}
        >
          <UIText style={styles.textBtn}>Đăng nhập</UIText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <UIText style={{ marginRight: 10, fontSize: 15, color: "black" }}>
            Chưa có tài khoản?
          </UIText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setModalVisible(true);
              // navigation.navigate(RouteNames.SIGNUPSCREEN, { typeUser: 2 })
            }}
          >
            <UIText
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: Colors.mainColor,
              }}
            >
              Đăng ký
            </UIText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.replace("MainDrawer", {
                screen: RouteNames.HOMESCREEN,
              });
            }}
          >
            <UIText
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: Colors.mainColor,
              }}
            >
              Bỏ qua đăng nhập
            </UIText>
          </TouchableOpacity>
        </View>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 0,
  },
  textSplash: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
  },
  textInput: {
    borderWidth: 1,
    color: "black",
    borderColor: "white",
    fontSize: 16,
    marginHorizontal: 25,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,

    elevation: 5,
    opacity: 1,
  },
  btnLogin: {
    height: 50,
    marginHorizontal: 30,
    backgroundColor: Colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 25,
  },
  btnRegister: {
    fontSize: 14,
    paddingVertical: 15,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 15,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textBtnRegister: {
    fontSize: 13,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 10,
    borderColor: Colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelect: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.mainColor,
  },
  btnModal: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: Colors.mainColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
});

LoginPhone.defaultProps = {
  userPage: {
    data: {},
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
    loginAction: (phone: string, password: string) => {
      dispatch(loginAction(phone, password));
    },
    resetAction: () => {
      dispatch(resetAction());
    },
    getUserData: () => {
      dispatch(getUserData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPhone);
