import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../../Style/Colors';
import { Calendar } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import CommonVariable from '../../Style/Variable';
import { fetchCommission } from "../../Actions/userPageAction";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import { get } from 'lodash';

const CalendarScreen = (props: any) => {
    const [markedDates, setMarkedDates] = useState<any>({});
    const navigation = useNavigation();

    const [startDate, setStateDate] = useState(get(props, "userPage.commission.startDate", moment().startOf('month').format('YYYY-MM-DD')));
    const [endDate, setEndDate] = useState(get(props, "userPage.commission.endDate", moment().format('YYYY-MM-DD')));

    useEffect(() => {
        getInitialDates();

    }, []);

    const getInitialDates = () => {
        const obj: any = Object.assign({}, markedDates)
        var start = new Date(startDate);
        var end = new Date(endDate);
        var difference = end.getTime() - start.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));
        obj[startDate] = { startingDay: true, color: Colors.mainColor, textColor: 'white', borderRadius: 30 };
        for (let i = 0; i < days - 1; i++) {
            obj[moment(new Date(startDate)).add(i + 1, 'days').format('YYYY-MM-DD')] = { color: '#FFE0CF' };
        }
        obj[endDate] = { endingDay: true, color: Colors.mainColor, textColor: 'white', borderRadius: 30 };
        setMarkedDates(obj);
    }

    const onDateChange = (date: any) => {
        let keys = Object.keys(markedDates).length;
        let newObj: any = Object.assign({}, markedDates);
        if (keys > 1) {
            for (let index = 0; index < keys; index++) {
                delete newObj[Object.keys(markedDates)[index]];
            }
            newObj[date.dateString] = { startingDay: true, color: Colors.mainColor, textColor: 'white' };
        } else {
            let listDate = [];
            var startDate = Object.keys(markedDates)[0];
            var endDate = date.dateString;
            const dateMove = new Date(startDate);
            let strDate = startDate;
            if (endDate < strDate) {
                delete newObj[startDate];
                newObj[date.dateString] = { startingDay: true, color: Colors.mainColor, textColor: 'white' };
            }
            while (strDate < endDate) {
                strDate = dateMove.toISOString().slice(0, 10);
                listDate.push(strDate);
                dateMove.setDate(dateMove.getDate() + 1);
            };
            listDate.map((date, index) => {
                if (index > 0 && index < listDate.length - 1) {
                    newObj[date] = { color: '#FFE0CF' }
                }
                if (index == listDate.length - 1) {
                    newObj[date] = { endingDay: true, color: Colors.mainColor, textColor: 'white' }
                }
            })
        }
        setMarkedDates(newObj)
    }

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                markingType={'period'}
                minDate={'2000-01-01'}
                maxDate={moment().format('YYYY-MM-DD')}
                firstDay={1}
                markedDates={markedDates}
                // hideDayNames={true}
                // minDate={moment().format("YYYY-MM-DD")}
                onDayPress={(day: any) => { onDateChange(day) }}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 12, textAlign: 'center', lineHeight: 25 }}>Bắt đầu</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '500' }}>
                            {
                                moment(new Date(Object.keys(markedDates)[0])).format('DD/MM/YYYY')
                            }
                        </Text>
                    </View>
                    {/* <SimpleLineIcons name="arrow-right-circle" size={25} color="#666666" style={{ marginHorizontal: 12 }} /> */}
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, textAlign: 'center', lineHeight: 25 }}>Kết thúc</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '500' }}>
                            {
                                Object.keys(markedDates).length > 1 ? moment(new Date(Object.keys(markedDates)[Object.keys(markedDates).length - 1])).format('DD/MM/YYYY') : "Chưa chọn"
                            }
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (Object.keys(markedDates).length > 1) {
                            props.fetchCommission(Object.keys(markedDates)[0], Object.keys(markedDates)[Object.keys(markedDates).length - 1]);
                            setStateDate(Object.keys(markedDates)[0]);
                            setEndDate(Object.keys(markedDates)[Object.keys(markedDates).length - 1]);
                            // setModalCalendar(false);
                            navigation.navigate(RouteNames.ACCOUNTSCREEN);
                        }
                    }}
                    style={{
                        padding: 15,
                        backgroundColor: Object.keys(markedDates).length > 1 ? Colors.mainColor : '#cccccc',
                        borderRadius: 10, marginTop: 15
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center', color: 'white' }}>Chọn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBottom: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: CommonVariable.screenWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

const mapStateToProps = (state: any) => {
    return {
        userPage: state.userPage,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCommission: (starDate: string, endDate: string) => {
            dispatch(fetchCommission(starDate, endDate))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);