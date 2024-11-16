import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {get, size} from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import RowProduct from '../Components/RowProduct';
import Service from '../Components/Service';
import {useNavigation, useRoute} from '@react-navigation/native';
import Colors from '../../Style/Colors';
import CommonVariable from '../../Style/Variable';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {fetchData, fetchDvt} from '../../Actions/detailPageAction';
import {addItemCart} from '../../Actions/cartlPageAction';
import {addItemLike} from '../../Actions/likeAction';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {RouteNames} from '../../Router/route-names';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
import Loading from '../Account/Loading';
import {number_format} from '../../Utilities/Number';
import storage from '../../Utilities/Storage';
import {logoutAction} from '../../Actions/userPageAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width: screenWidth} = Dimensions.get('window');
const DetailProduct = (props?: any) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectColor, setSelectColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showLike, setShowLike] = useState(false);
  const navigation = useNavigation();
  const [tokenKey, setTokenKey] = useState('');

  const getProduct = () => {
    let product = {
      id: get(props, 'detailpage.data.product.id', 0),
      quantity: quantity,
      image: get(props, 'detailpage.data.product.image_slider[0]', ''),
      title: get(props, 'detailpage.data.product.title', ''),
      base_cost: get(props, 'detailpage.data.product.base_cost', 0),
      promotion_cost: get(props, 'detailpage.data.product.promotion_cost', 0),
      lieuluong: get(props, 'detailpage.data.product.lieuluong', 'null'),
    };
    return product;
  };
  const logout = () => {
    props.logoutAction();
    props.navigation.replace('LoginStack');
  };
  const validate = async (type: any) => {
    if (tokenKey == '') {
      Alert.alert(
        'Cảnh báo',
        'Bạn phải đăng nhập mới sử dụng được chức năng này',
        [
          {
            text: 'Không đăng nhập',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Đăng nhập',
            onPress: () => {
              logout();
            },
          },
        ],
      );

      return;
    }
    let arr = props.cartPage.data;
    let checkCart = arr.filter(
      (item: any) => item.id == get(props, 'detailpage.data.product.id', 0),
    );
    let product = getProduct();

    if (type === 0) {
      if (checkCart.length > 0) {
        Toast.show({
          type: 'info',
          position: 'top',
          text1: 'Thông báo',
          text2: 'Trong giỏ hàng đã có sản phẩm này',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        arr.push(product);
        props.addItemCart(JSON.stringify(arr));
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thêm thành công',
          text2: 'Sản phẩm được thêm vào giỏ hàng',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } else {
      if (checkCart.length > 0) {
        navigation.navigate(RouteNames.SHOPPINGCART);
      } else {
        arr.push(product);
        props.addItemCart(JSON.stringify(arr));
        navigation.navigate(RouteNames.SHOPPINGCART);
      }
    }
  };

  const renderItem = ({item, index}: any, parallaxProps: any) => {
    return (
      <View style={styles.item}>
        {get(props, 'detailpage.data.product.percent', '0') != 0 ? (
          <View style={{position: 'absolute', zIndex: 100, right: 15, top: 15}}>
            <UIText
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'red',
              }}>
              {get(props, 'detailpage.data.product.percent', '')}%
            </UIText>
          </View>
        ) : null}
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(
          get(props, 'detailpage.data.product.image_slider', []),
        )}
        activeDotIndex={activeSlide}
        containerStyle={{paddingVertical: 20}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#5BC8AC',
        }}
        inactiveDotStyle={{
          backgroundColor: '#DBDBDB',
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };
  useEffect(() => {
    // let productId = get(props, 'route.params.productId', null);
    fetchData();
  }, []);

  const fetchData = async () => {
    // await props.fetchDvt();
    await props.fetchData(get(props, 'route.params.productId', 0));
    AsyncStorage.removeItem('navigation');
    storage.getData('userData').then(tokenKey => {
      setTokenKey(tokenKey == null ? '' : tokenKey);
    });
  };

  let imageData = get(props, 'detailpage.data.product.image_slider', []).map(
    (item: any) => {
      return {illustration: item};
    },
  );

  const getBase = () => {
    ImgToBase64.getBase64String(
      get(props, 'detailpage.data.product.image_slider[0]', []),
    )
      .then((base64String: any) => onShare(base64String))
      .catch((err: any) => console.log(err));
  };

  const onShare = async (base64String: any) => {
    let base64Data = `data:image/png;base64,` + base64String;
    const shareOptions = {
      message: props.detailpage.data.product.title,
      url: base64Data,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const likeProduct = () => {
    let arrLike = props.likeProduct.data;
    if (
      arrLike.filter(
        (item: any) => item == get(props, 'detailpage.data.product.id', 0),
      ).length > 0
    ) {
      let newData = arrLike.filter((item: any) => {
        return parseInt(item) !== get(props, 'detailpage.data.product.id', 0);
      });
      props.addItemLike(JSON.stringify(newData));
    } else {
      arrLike.push(get(props, 'detailpage.data.product.id', 0));
      props.addItemLike(JSON.stringify(arrLike));
    }
  };

  const renderPrice = (price: any) => {
    return number_format(price, 0, '', '.') + 'đ';
  };
  return get(props, 'detailpage.isFetching', '') ? (
    <Loading />
  ) : (
    <View style={{flex: 1}}>
      <Body>
        <Spinner visible={showLike} />
        <View style={{backgroundColor: '#F5F5F5', paddingTop: 30}}>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={imageData}
            // data={slider}
            renderItem={renderItem}
            hasParallaxImages={true}
            onSnapToItem={index => setActiveSlide(index)}
          />
          {pagination()}
          <View style={styles.shareLike}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnShare}
              onPress={() => getBase()}>
              <EvilIcons name="share-google" size={30} color="#414C58" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btnShare,
                {
                  backgroundColor:
                    props.likeProduct.data.filter(
                      (item: any) =>
                        item == get(props, 'detailpage.data.product.id', 0),
                    ).length > 0
                      ? '#F54F9A'
                      : '#F6F7FA',
                },
              ]}
              onPress={() => likeProduct()}>
              <EvilIcons
                name="heart"
                size={30}
                color={
                  props.likeProduct.data.filter(
                    (item: any) =>
                      item == get(props, 'detailpage.data.product.id', 0),
                  ).length > 0
                    ? 'white'
                    : '#414C58'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#E2E2E2'}}>
            <UIText style={styles.nameProduct}>
              {get(props, 'detailpage.data.product.title', '')}
            </UIText>
          </View>
          <View style={styles.selectQuantity}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <UIText
                style={{
                  fontSize: 18,
                  color: '#ED7CA8',
                  fontWeight: 'bold',
                  marginRight: 10,
                }}>
                {get(props, 'detailpage.data.product.promotion_cost', '') === 0
                  ? renderPrice(
                      get(props, 'detailpage.data.product.base_cost', ''),
                    )
                  : renderPrice(
                      get(props, 'detailpage.data.product.promotion_cost', ''),
                    )}
              </UIText>
              <UIText
                style={{
                  fontSize: 15,
                  color: '#363636',
                  textDecorationLine: 'line-through',
                  textDecorationColor: '#707070',
                  marginRight: 10,
                }}>
                {get(props, 'detailpage.data.product.promotion_cost', '') === 0
                  ? ''
                  : renderPrice(
                      get(props, 'detailpage.data.product.base_cost', ''),
                    )}
              </UIText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Feather name="plus" size={25} color="#909090" />
              </TouchableOpacity>
              <UIText
                style={{
                  width: 35,
                  height: 30,
                  textAlign: 'center',
                  lineHeight: 30,
                  borderWidth: 1,
                  borderColor: '#909090',
                  marginHorizontal: 15,
                }}>
                {quantity}
              </UIText>
              <TouchableOpacity
                onPress={() =>
                  quantity == 1 ? undefined : setQuantity(quantity - 1)
                }>
                <Feather name="minus" size={25} color="#909090" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <UIText
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Đã bán: {get(props, 'detailpage.data.product.buy', '')}
            </UIText>
            {/* <UIText style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>Chiết khấu: {get(props, 'detailpage.data.product.percent', '')}%</UIText> */}
          </View>
          <View style={{paddingBottom: 15}}>
            <View style={styles.headerProduct}>
              <UIText style={styles.title}>Mô tả sản phẩm</UIText>
              <TouchableOpacity onPress={() => null}>
                <AntDesign name="right" size={20} color="#363636" />
              </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 15}}>
              <View style={{flex: 1}}>
                {props.detailpage.data.product !== undefined ? (
                  // <HTML
                  //     html={get(props, 'detailpage.data.product.content', '')}
                  //     imagesMaxWidth={Dimensions.get("window").width}
                  //     baseFontStyle={{ fontSize: 15, fontFamily: "arial" }}
                  //     ignoredStyles={["font-family", "letter-spacing"]}
                  // />
                  // <HTMLView
                  //     value={props.detailpage.data.product.content}
                  //     stylesheet={webview}
                  // />
                  <HTML
                    source={{
                      html: get(props, 'detailpage.data.product.content', ''),
                    }}
                    contentWidth={Dimensions.get('window').width}
                    baseFontStyle={{fontSize: 15}}
                  />
                ) : null}
              </View>
            </View>
          </View>
          {size(get(props, 'detailpage.data.same_product', '')) > 0 && (
            <View style={styles.rowProduct}>
              <UIText style={styles.suggestions} numberOfLines={1}>
                GỢI Ý DÀNH CHO BẠN
              </UIText>
              <FlatList
                data={get(props, 'detailpage.data.same_product', '')}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{flex: 1}}
                      onPress={() => {
                        props.fetchData(item.id);
                      }}>
                      <View style={[styles.product]}>
                        <Image
                          source={
                            item.image_slider[0] !== undefined
                              ? {uri: item.image_slider[0]}
                              : require('../../assets/no-image.png')
                          }
                          style={styles.imageProduct}
                        />
                        <View style={styles.detail}>
                          <UIText numberOfLines={2} style={styles.name}>
                            {item.title}
                          </UIText>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <UIText style={styles.current}>
                              {item.promotion_cost != ''
                                ? number_format(
                                    item.promotion_cost,
                                    0,
                                    '',
                                    '.',
                                  ) + 'đ'
                                : number_format(item.base_cost, 0, '', '.') +
                                  'đ'}
                            </UIText>
                            <UIText style={styles.old}>
                              {item.promotion_cost != ''
                                ? number_format(item.base_cost, 0, '', '.') +
                                  'đ'
                                : ''}
                            </UIText>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
      </Body>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={[styles.btnBt, {backgroundColor: '#24AEB1'}]}
          activeOpacity={0.9}
          onPress={() => {
            validate(0);
          }}>
          <UIText style={styles.textBtn}>GIỎ HÀNG</UIText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            validate(1);
          }}
          activeOpacity={0.9}
          style={[styles.btnBt, {backgroundColor: '#D30101'}]}>
          <UIText style={styles.textBtn}>ĐẶT HÀNG</UIText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    width: screenWidth - 60,
    height: 280,
  },
  imageContainer: {
    // flex: 1,
    height: 280,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    // height: 100,
    // width: 200,
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  btnShare: {
    width: 40,
    height: 40,
    backgroundColor: '#F6F7FA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  shareLike: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  nameProduct: {
    fontSize: 18,
    color: Colors.mainColor,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  color: {
    height: 34,
    width: 34,
    borderRadius: 17,
    borderWidth: 2,
    marginRight: 10,
  },
  selectQuantity: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: CommonVariable.appPadding,
    paddingBottom: 10,
    borderTopColor: '#F5F5F5',
    borderTopWidth: 10,
  },
  service: {
    padding: 15,
    borderTopColor: '#F5F5F5',
    borderTopWidth: 10,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 10,
  },
  btnBt: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  detail: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  product: {
    width: CommonVariable.screenWidth / 2.5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRightWidth: 0.5,
    marginRight: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageProduct: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    color: Colors.mainColor,
    marginBottom: 5,
    height: 40,
    textAlign: 'center',
  },
  old: {
    fontSize: 12,
    color: '#909090',
    textDecorationLine: 'line-through',
    textDecorationColor: '#909090',
  },
  current: {
    fontSize: 14,
    color: '#ED7CA8',
    fontWeight: 'bold',
  },
  sale: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#5BC8AC',
    position: 'absolute',
    right: 0,
    fontSize: 12,
    color: 'white',
  },
  rowProduct: {
    paddingHorizontal: CommonVariable.appPadding,
    paddingBottom: 15,
  },
  suggestions: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.mainColor,
    paddingVertical: 10,
  },
});

DetailProduct.defaultProps = {
  detailpage: {
    data: {},
    dvt: [],
  },
};
const mapStateToProps = (state: any) => {
  return {
    detailpage: state.detailpage,
    cartPage: state.cartPage,
    likeProduct: state.likeProduct,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (productId: any) => {
      dispatch(fetchData(productId));
    },
    addItemCart: (data: any) => {
      dispatch(addItemCart(data));
    },
    addItemLike: (data: any) => {
      dispatch(addItemLike(data));
    },
    logoutAction: () => {
      dispatch(logoutAction());
    },
    // fetchDvt: () => {
    //     dispatch(fetchDvt());
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
