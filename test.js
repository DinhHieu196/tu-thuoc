import React from 'react';
import { View, Text } from 'react-native';

class Test extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello, I am your cat!</Text>
      </View>
    );
  }
}

export default Test;