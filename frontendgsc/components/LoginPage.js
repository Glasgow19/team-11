import React from 'react';

import { View, Text, Button } from 'react-native';


const LoginPage = (props) => {
    return (
        <View>
            <Text>
                Hello from Login.
            </Text>
            <Button title="Navigate to Home" onPress={() => props.navigation.navigate('HomePage')}>
            </Button>
        </View>
    )
}

export default LoginPage;