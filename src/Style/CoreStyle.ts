import {Platform, StatusBar, Dimensions} from 'react-native';

export const WIDTH: number = Dimensions.get('window').width;
export const HEIGHT: number = Dimensions.get('window').height;

export const isIphoneX = (): boolean => {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (Dimensions.get('window').height === 812 ||
            Dimensions.get('window').width === 812 ||
            Dimensions.get('window').height === 896 ||
            Dimensions.get('window').width === 896)
    );
};

const ifIphoneX = (iphoneXStyle: number, regularStyle: number): number => {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
};

export const getStatusBarHeight = (safe?: boolean): number => {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight || 0,
    });
};

const deviceHeaderHeight = 55;
const deviceStatusBarHeight =
    Platform.OS === 'ios'
        ? getStatusBarHeight() == 30
            ? 40
            : 20
        : getStatusBarHeight();

const CoreStyle = {
    vw: (percent: number): number => (WIDTH * percent) / 100,

    mainColor: '#EA0F17',
    secondColor: '#ea604e',
    // secondColor: "#eaae1f",
    lightColor: '#FFF',
    darkColor: '#828899',
    grayColor: '#ccc',
    textColor: '#122139',
    backgroundColor: '#eee',

    appPadding: 15,
    deviceWidth: WIDTH,
    deviceHeight:
        Platform.OS === 'android' && getStatusBarHeight() >= 40
            ? HEIGHT + getStatusBarHeight()
            : HEIGHT,
    deviceHeaderHeight,
    deviceHeaderStatusHeight: deviceHeaderHeight + deviceStatusBarHeight,
    deviceTabHeight: 49 + ifIphoneX(34, 0),
    deviceStatusBarHeight,
};

export default CoreStyle;
