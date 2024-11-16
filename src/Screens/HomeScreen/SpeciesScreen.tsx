import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  SafeAreaView,
  Modal,
} from 'react-native';
import { get } from 'lodash';
import UIText from '../../Component/UIText';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Style/Colors';
import CommonVariable from '../../Style/Variable';
import { RouteNames } from '../../Router/route-names';
import { connect } from 'react-redux';
import { logoutAction } from '../../Actions/userPageAction';
import Loading from '../Account/Loading';
import { getData } from '../../Utilities/Storage';
import axios from 'axios';
import { number_format } from '../../Utilities/Number';
import { addItemCart } from '../../Actions/cartlPageAction';

// import {
//   Modal,
//   SlideAnimation,
//   ModalContent,
//   ModalTitle,
// } from 'react-native-modals';

const sort = [
  { id: 1, name: 'Mới nhất' },
  { id: 2, name: 'Giá cao nhất' },
  { id: 3, name: 'Giá thấp nhất' },
];

const SpeciesScreen = (props: any) => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [dialogSort, setDialogSort] = useState<boolean>(false);
  const [dialogSort2, setDialogSort2] = useState<boolean>(false);
  const [selectSort, setSelectSort] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({}) as any;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    getData('userData').then(res => {
      if (Object.keys(category).length === 0) {
        setCategory(get(props, 'categoryPage.data[0]', 1));
      }
      getProducts(res, props.categoryPage.data[0].id, category.id);
      setToken(res == null ? '' : res);
    });
  };

  const getProducts = async (token: string, id?: number, sort?: number) => {
    await setToken(token);
    await axios
      .get(`http://api.idoctors.vn/api/products/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { sortBy: sort },
      })
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => Alert.alert(error));
  };

  const handleSort = (id: any) => {
    setDialogSort(false);
    setSelectSort(id);
    getProducts(token, category.id, id);
  };

  const selectCategory = (item: any) => {
    setDialogSort2(false);
    setCategory(item);
    getProducts(token, item.id, selectSort);
  };
  const logout = () => {
    navigation.navigate('LoginStack');
    props.logoutAction();
  };
  const order = (item: any) => {
    if (token == '') {
      Alert.alert(
        'Cảnh báo',
        'Bạn phải đăng nhập mới sử dụng được chức năng này',
        [
          {
            text: 'Không đăng nhập',
            onPress: () => { },
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

  const renderHeader = () => {
    return (
      <View>
        <UIText
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: Colors.mainColor,
            textAlign: 'center',
            paddingVertical: 15,
          }}>
          {category.name}
        </UIText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flexDirection: 'row', alignItems: 'center', zIndex: 100 }}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setDialogSort2(true);
            }}>
            <UIText style={[styles.titleSort, { padding: 10 }]}>
              Lọc sản phẩm
            </UIText>
            <Image source={require('../../assets/equalizer.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flexDirection: 'row', alignItems: 'center', zIndex: 100 }}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setDialogSort(!dialogSort);
            }}>
            <UIText style={styles.titleSort}>Sắp xếp</UIText>
            <Image source={require('../../assets/sort.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={dialogSort2}
        onRequestClose={() => {
          setDialogSort2(false);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDialogSort2(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: CommonVariable.screenWidth - 30,
              borderRadius: 10,
              paddingVertical: 10,
            }}>
            <FlatList
              data={props.categoryPage.data}
              keyExtractor={item => item.name}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ paddingVertical: 10 }}
                    onPress={() => selectCategory(item)}>
                    <UIText
                      style={[
                        styles.textSort,
                        {
                          color:
                            category.id == item.id
                              ? Colors.mainColor
                              : '#363636',
                        },
                      ]}>
                      {item.name}
                    </UIText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={dialogSort}
        onRequestClose={() => {
          setDialogSort(false);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDialogSort(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: CommonVariable.screenWidth - 50,
              borderRadius: 10,
              paddingVertical: 10,
            }}>
            <FlatList
              data={sort}
              keyExtractor={item => item.name}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{ paddingVertical: 10 }}
                    onPress={() => handleSort(item.id)}>
                    <UIText
                      style={[
                        styles.textSort,
                        {
                          color:
                            selectSort == item.id
                              ? Colors.mainColor
                              : '#363636',
                        },
                      ]}>
                      {item.name}
                    </UIText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={dialogSort2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDialogSort2(false);
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              width: CommonVariable.screenWidth - 30,
            }}></View>
        </TouchableOpacity>
      </Modal> */}

      {/* <Modal
        visible={dialogSort}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        modalStyle={{justifyContent: 'center', backgroundColor: 'transparent'}}
        onTouchOutside={() => {
          setDialogSort(false);
        }}>
        <ModalContent style={styles.modalView}>
          <FlatList
            data={sort}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{paddingVertical: 10}}
                  onPress={() => handleSort(item.id)}>
                  <UIText
                    style={[
                      styles.textSort,
                      {
                        color:
                          selectSort == item.id ? Colors.mainColor : '#363636',
                      },
                    ]}>
                    {item.name}
                  </UIText>
                </TouchableOpacity>
              );
            }}
          />
        </ModalContent>
      </Modal> */}
      {/* <Modal
        visible={dialogSort2}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onTouchOutside={() => {
          setDialogSort2(true);
        }}
        modalStyle={{justifyContent: 'center', backgroundColor: 'transparent'}}>
        <ModalContent style={styles.modalView}>
          <FlatList
            data={props.categoryPage.data}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{paddingVertical: 10}}
                  onPress={() => selectCategory(item)}>
                  <UIText
                    style={[
                      styles.textSort,
                      {
                        color:
                          category.id == item.id ? Colors.mainColor : '#363636',
                      },
                    ]}>
                    {item.name}
                  </UIText>
                </TouchableOpacity>
              );
            }}
          />
        </ModalContent>
      </Modal> */}

      <View style={{}}>
        {loading == true ? (
          <Loading />
        ) : (
          <FlatList
            style={{}}
            data={products}
            numColumns={2}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }: any) => {
              return (
                <View style={{ flex: 1, marginBottom: 15, marginLeft: 7.5 }}>
                  <View style={[styles.product]}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.detail}
                      onPress={() => {
                        navigation.navigate(RouteNames.DETAILPRODUCT, {
                          productId: item.id,
                        });
                      }}>
                      <Image
                        source={
                          item.image_slider[0] !== undefined
                            ? { uri: item.image_slider[0] }
                            : require('../../assets/no-image.png')
                        }
                        style={styles.imageProduct}
                      />
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
                          {item.promotion_cost != 0
                            ? number_format(item.promotion_cost, 0, '', '.') +
                            'đ'
                            : number_format(item.base_cost, 0, '', '.') + 'đ'}
                        </UIText>
                        <UIText style={styles.old}>
                          {item.promotion_cost != 0
                            ? number_format(item.base_cost, 0, '', '.') + 'đ'
                            : ''}
                        </UIText>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => order(item)}
                      activeOpacity={0.8}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 15,
                        marginTop: 10,
                      }}>
                      <Image
                        source={require('../../assets/order.png')}
                        style={{ width: 25, height: 25 }}
                      />
                      <UIText style={{ color: '#414C58' }}>Đặt Hàng</UIText>
                      <View />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            ListHeaderComponent={() => renderHeader()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleSort: {
    fontSize: 16,
    color: '#363636',
    marginRight: 5,
  },
  btnCategory: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,

    marginRight: 10,
  },
  textSort: {
    fontSize: 14,
    textAlign: 'center',
  },
  product: {
    backgroundColor: 'white',
    width: CommonVariable.screenWidth / 2 - 25,
    borderRadius: 14,
    paddingVertical: 15,
    marginHorizontal: 7.5,
  },
  imageProduct: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 12,
    color: Colors.mainColor,
    marginTop: 10,
    marginBottom: 5,
    height: 40,
    textAlign: 'center',
  },
  old: {
    fontSize: 11,
    color: '#9FA6B6',
    textDecorationLine: 'line-through',
    textDecorationColor: '#9FA6B6',
    fontWeight: 'bold',
  },
  current: {
    fontSize: 11,
    color: '#EF699A',
    fontWeight: 'bold',
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    color: Colors.mainColor,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  detail: {
    marginHorizontal: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    paddingBottom: 10,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 50,
    // width: CommonVariable.screenWidth - 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const mapStateToProps = (state: any) => {
  return {
    categoryPage: state.categoryPage,
    cartPage: state.cartPage,
    homepage: state.homepage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItemCart: (data: any) => {
      dispatch(addItemCart(data));
    },
    logoutAction: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesScreen);
