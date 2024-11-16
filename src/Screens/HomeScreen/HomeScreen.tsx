import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  Text,
  FlatList,
  Alert,
  Clipboard,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { get } from "lodash";
import { SliderBox } from "react-native-image-slider-box";
import { fetchData, pushDeviceToken } from "./../../Actions/homepageAction";
import { fetchCategory } from "./../../Actions/categoryPageAction";
import {
  getUserData,
  getReport,
  logoutAction,
} from "../../Actions/userPageAction";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { fetchDataCart } from "../../Actions/cartlPageAction";
import { fetchDataLike } from "../../Actions/likeAction";
import { RouteNames } from "../../Router/route-names";
import UIText from "../../Component/UIText";
import NetInfo from "@react-native-community/netinfo";
import Disconect from "./Disconnect";
import Colors from "../../Style/Colors";
import { number_format } from "../../Utilities/Number";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { addItemLike } from "../../Actions/likeAction";
import CommonVariable from "../../Style/Variable";
import { addItemCart } from "../../Actions/cartlPageAction";
import { getData } from "../../Utilities/Storage";
import Toast from "react-native-toast-message";
("../../Utilities/Storage");

const HomeScreen = (props: any) => {
  const navigation = useNavigation();
  const [connect, setConnect] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenKey, setTokenKey] = useState("");
  let urlBanner = [] as string[];
  let idBanner = [] as number[];
  const [tokenDevice, setTokenDevice] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    initData();
    getData("userData").then((tokenKey) => {
      setTokenKey(tokenKey == null ? "" : tokenKey);
    });
    getData("navigation").then((route) => {
      if (route != null) {
        console.log(route);
        if (route.type == "PRODUCT") {
          navigation.navigate(RouteNames.DETAILPRODUCT, {
            productId: parseInt(route.id),
          });
        } else {
          navigation.navigate(RouteNames.DETAILNEWS, {
            news: parseInt(route.id),
          });
        }
      }
    });
    getToken();
  }, []);

  const getToken = async () => {
    const token = await getData("deviceToken");
    const data = await getData("userData");
    // if (token != undefined) {
    //   Clipboard.setString(tokenDevice != undefined ? tokenDevice : "null");
    //   console.log(token);
    // } else {
    //   Toast.show({
    //     type: "error",
    //     position: "top",
    //     text1: "Thông báo",
    //     text2: "K có token",
    //     visibilityTime: 1000,
    //     autoHide: true,
    //     topOffset: 30,
    //     bottomOffset: 40,
    //   });
    // }
    setTokenDevice(token.token);
    setUserData(data);
  };

  get(props, "homepage.data.images", []).forEach((element: any) => {
    urlBanner.push(element.image);
    idBanner.push(element.news_id);
  });

  const initData = () => {
    getConnect;
    props.fetchDataCart();
    props.fetchDataLike();
    props.getUserData();
    props.fetchCategory();
    props.getReport();
    if (props.homepage.data.length === 0) {
      props.fetchData();
      props.pushDeviceToken();
    }
  };
  const searchAction = () => {
    navigation.navigate(RouteNames.SEARCHSCREEN);
  };
  const getConnect = NetInfo.fetch().then((state: any) => {
    setConnect(state.isConnected);
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const likeProduct = (id: number) => {
    let arrLike = props.likeProduct.data;
    if (arrLike.filter((item: any) => item == id).length > 0) {
      let newData = arrLike.filter((item: any) => {
        return parseInt(item) !== id;
      });
      props.addItemLike(JSON.stringify(newData));
    } else {
      arrLike.push(id);
      props.addItemLike(JSON.stringify(arrLike));
    }
  };
  const logout = () => {
    navigation.navigate("LoginStack");
    props.logoutAction();
  };

  const order = (item: any) => {
    if (tokenKey == "") {
      Alert.alert(
        "Cảnh báo",
        "Bạn phải đăng nhập mới sử dụng được chức năng này",
        [
          {
            text: "Không đăng nhập",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Đăng nhập",
            onPress: () => {
              logout();
            },
          },
        ]
      );

      return;
    }
    let arr = props.cartPage.data;
    let checkCart = arr.filter((val: any) => val.id == item.id);
    if (checkCart.length > 0) {
      navigation.navigate(RouteNames.SHOPPINGCART);
    } else {
      const product = {
        id: item.id,
        quantity: 1,
        image: item.image_slider[0],
        title: item.title,
        base_cost: item.base_cost,
        promotion_cost: item.promotion_cost,
        lieuluong: item.lieuluong,
      };
      arr.push(product);
      props.addItemCart(JSON.stringify(arr));
      navigation.navigate(RouteNames.SHOPPINGCART);
    }
  };

  const renderProduct = (item: any) => {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 15,
          alignItems: "center",
          width: CommonVariable.screenWidth / 2,
        }}
      >
        <View style={[styles.product]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.detail}
            onPress={() => {
              navigation.navigate(RouteNames.DETAILPRODUCT, {
                productId: item.id,
              });
            }}
          >
            <Image
              source={
                item.image_slider[0] !== undefined
                  ? { uri: item.image_slider[0] }
                  : require("../../assets/no-image.png")
              }
              style={styles.imageProduct}
            />
            <UIText numberOfLines={2} style={styles.name}>
              {item.title}
            </UIText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UIText style={styles.current}>
                {item.promotion_cost != ""
                  ? number_format(item.promotion_cost, 0, "", ".") + "đ"
                  : number_format(item.base_cost, 0, "", ".") + "đ"}
              </UIText>
              <UIText style={styles.old}>
                {item.promotion_cost != ""
                  ? number_format(item.base_cost, 0, "", ".") + "đ"
                  : ""}
              </UIText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => order(item)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../assets/order.png")}
              style={{ width: 25, height: 25 }}
            />
            <UIText style={{ color: "#414C58" }}>Đặt Hàng</UIText>
            <View />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.btnShare,
              {
                backgroundColor:
                  props.likeProduct.data.filter((val: any) => val == item.id)
                    .length > 0
                    ? "#F54F9A"
                    : "#F6F7FA",
              },
            ]}
            onPress={() => likeProduct(item.id)}
          >
            <EvilIcons
              name="heart"
              size={20}
              color={
                props.likeProduct.data.filter((val: any) => val == item.id)
                  .length > 0
                  ? "white"
                  : "#414C58"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBanner = () => {
    return (
      <View style={{ marginBottom: 15 }}>
        <SliderBox
          images={urlBanner}
          dotColor={Colors.mainColor}
          inactiveDotColor="white"
          resizeMode="stretch"
          onCurrentImagePressed={(index: any) => {
            props.navigation.navigate(RouteNames.DETAILNEWS, {
              news: idBanner[index],
            });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EBEBEC" }}>
      <Spinner visible={get(props, "homepage.isFetching", "")} />
      {connect ? (
        <View style={{ flex: 1 }}>
          <View style={{ padding: 15, height: 70 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.viewInput}
              onPress={() => searchAction()}
            >
              <UIText style={styles.textInput}>
                Tìm kiếm tên thuốc hoặc hoạt chất
              </UIText>
              <AntDesign
                name="search1"
                size={22}
                color={"#707070"}
                style={{}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={get(props, "homepage.data.products", [])}
              style={{ marginHorizontal: 7.5 }}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return renderProduct(item);
              }}
              ListHeaderComponent={() => renderBanner()}
              ListFooterComponent={() => <View style={{ height: 100 }}></View>}
            />
          </View>
        </View>
      ) : (
        <Disconect onPress={() => getData()} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    fontFamily: "Arial",
    flex: 1,
    color: "#909090",
  },
  viewInput: {
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 24,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  textCategory: {
    fontSize: 12,
    color: "#363636",
    marginTop: 5,
  },
  iconCaterogy: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderRadius: 23,
    borderColor: "#707070",
  },
  detail: {
    marginHorizontal: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
    paddingBottom: 10,
    alignItems: "center",
  },
  product: {
    backgroundColor: "white",
    width: CommonVariable.screenWidth / 2 - 25,
    borderRadius: 14,
    paddingVertical: 15,
    marginHorizontal: 7.5,
  },
  imageProduct: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  name: {
    fontSize: 12,
    color: Colors.mainColor,
    marginTop: 10,
    marginBottom: 5,
    height: 40,
    textAlign: "center",
  },
  old: {
    fontSize: 11,
    color: "#9FA6B6",
    textDecorationLine: "line-through",
    textDecorationColor: "#9FA6B6",
    fontWeight: "bold",
  },
  current: {
    fontSize: 11,
    color: "#EF699A",
    fontWeight: "bold",
    marginRight: 5,
  },
  btnShare: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    position: "absolute",
    right: 0,
    top: 10,
  },
});
HomeScreen.defaultProps = {
  homepage: {
    isFetching: false,
    data: {
      data: {
        bestCategory: [],
        topSlider: {
          data: [],
        },
        categoryProduct: [],
        flashSale: [],
      },
    },
  },
};
const mapStateToProps = (state: any) => {
  return {
    homepage: state.homepage,
    likeProduct: state.likeProduct,
    cartPage: state.cartPage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: () => {
      dispatch(fetchData());
    },
    pushDeviceToken: () => {
      dispatch(pushDeviceToken());
    },
    fetchDataCart: () => {
      dispatch(fetchDataCart());
    },
    fetchDataLike: () => {
      dispatch(fetchDataLike());
    },
    getUserData: () => {
      dispatch(getUserData());
    },
    addItemLike: (data: any) => {
      dispatch(addItemLike(data));
    },
    addItemCart: (data: any) => {
      dispatch(addItemCart(data));
    },
    fetchCategory: () => {
      dispatch(fetchCategory());
    },
    getReport: () => {
      dispatch(getReport());
    },
    logoutAction: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
