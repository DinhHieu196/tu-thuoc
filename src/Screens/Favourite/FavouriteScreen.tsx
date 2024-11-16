import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Style/Colors';
import { RouteNames } from '../../Router/route-names';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { deleteItem } from '../../Actions/likeAction';
import Spinner from 'react-native-loading-spinner-overlay';

const FavouriteScreen = (props: any) => {
    const navigation = useNavigation();
    const [showLike, setShowLike] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={showLike}
            />
            <Body style={{ borderRadius: 0, backgroundColor: "#F5F5F5" }}>
                <UIText style={{ fontSize: 15, color: "#363636", textAlign: "center", marginVertical: 15 }}>Không có khuyến mãi</UIText>
            </Body>
        </View>
    )
}

const styles = StyleSheet.create({
    itemCart: {
        padding: 15,
        paddingTop: 25,
        backgroundColor: "white",
        marginTop: 15,
        flexDirection: "row"
    },
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginRight: 10
    },
    price: {
        fontSize: 18,
        color: Colors.mainColor,
        fontWeight: "bold"
    },
    nameProduct: {
        fontSize: 16,
        color: "#363636"
    },
    btnClose: {
        position: "absolute",
        right: 15,
        top: 5
    }
})

const mapStateToProps = (state: any) => {
    return {
        likeProduct: state.likeProduct
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteItem: (id: any) => {
            dispatch(deleteItem(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);