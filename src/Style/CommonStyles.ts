import {StyleSheet} from 'react-native';
import CommonVariable from './Variable';

const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jc_c: {
        justifyContent: 'center',
    },
    ai_c: {
        alignItems: 'center',
    },
    fd_c: {
        flexDirection: 'column',
    },
    fd_r: {
        flexDirection: 'row',
    },
    padding: {
        padding: CommonVariable.appPadding,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CommonStyles;
