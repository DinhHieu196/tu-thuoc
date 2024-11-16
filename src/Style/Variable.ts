import {Dimensions} from 'react-native';

const WIDTH = Math.round(Dimensions.get('window').width);
const HEIGHT = Math.round(Dimensions.get('window').height);

const CommonVariable = {
    appPadding: 15,
    iconSize: 22,
    smallTextSize: 12,
    mediumTextSize: 16,
    largeTextSize: 18,
    activeOpacity: 0.8,
    screenWidth: WIDTH,
    screenHeight: HEIGHT,
    GradientHeight: HEIGHT * 0.08,
};

export default CommonVariable;
