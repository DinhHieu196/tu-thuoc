import React, { } from 'react';
import { StatusBar, Text } from 'react-native';
import Navigation from './Router/index';
// import { ModalPortal } from '@type/react-native-modals';
const ModalPortal = require('react-native-modals');

import Toast from 'react-native-toast-message';

// const Application = (props: any) => {

//     return (
//         <>
//             <StatusBar backgroundColor={'transparent'} translucent />
//             <Navigation />
//             <ModalPortal />
//             <Toast ref={(ref) => Toast.setRef(ref)} />
//         </>
//     )
// };

class Application extends React.Component {

    render() {
        return (
            <>
                <StatusBar backgroundColor={'transparent'} translucent />
                <Navigation />
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </>
        );
    }
}

export default Application;