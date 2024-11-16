import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import UIText from '../../Component/UIText';
import Colors from '../../Style/Colors';
import { number_format } from '../../Utilities/Number';
import axios from 'axios';

const ProductOrder = (props: any) => {
    const [detail, setDetail] = useState(null) as any;

    useEffect(() => {
        fetchDetail(props.id)
    }, []);

    const fetchDetail = async (id: any) => {

        try {
            const response = await axios.get(`http://api.idoctors.vn/api/products/${id}`);
            if (response.data.success) {
                setDetail(response.data.data.product);
            }
        } catch (error) {
            // console.log("Error in "+id);
            // console.log(error)
        }
    }

    return (
        detail != null ?
            <View style={styles.itemCart}>
                <Image source={{ uri: detail.image_slider[0] }} style={styles.imgProduct} />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <UIText style={{ fontSize: 16, color: Colors.mainColor, fontWeight: '500' }} numberOfLines={1}>{detail.title}</UIText>
                    <View>
                        {detail.promotion_cost !== 0 ?
                            <UIText style={{ textDecorationLine: 'line-through', textDecorationColor: '#707070', color: '#707070' }}>{number_format(detail.base_cost, 0, '', '.') + 'đ'}</UIText>
                            : null}
                        {detail.promotion_cost !== 0 ?
                            <UIText style={{ fontSize: 16, color: '#F54F9A', fontWeight: 'bold', }}>{number_format(detail.promotion_cost, 0, '', '.') + 'đ'}</UIText>
                            :
                            <UIText style={{ fontSize: 16, color: '#F54F9A', fontWeight: 'bold', }}>{number_format(detail.base_cost, 0, '', '.') + 'đ'}</UIText>
                        }
                        <UIText style={styles.textScreen}>Số lượng: {props.quantity}</UIText>
                    </View>
                </View>
            </View>
            :
            <View>
                <UIText style={{ lineHeight: 25, color: '#D7373F' }}>Không tìm thấy sản phẩm</UIText>
            </View>
    );
}

const styles = StyleSheet.create({
    textScreen: {
        fontSize: 12,
        color: "#363636",
        marginTop: 3
    },
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginRight: 10
    },
    itemCart: {
        backgroundColor: "white",
        marginBottom: 15,
        flexDirection: "row",
    },
})

export default ProductOrder;