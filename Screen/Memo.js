import React from 'react';
import {
    View, LogBox, Text,
} 
from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);


const Memo = () => {
    return (
        <View>
            <Text>Memo</Text>
        </View>
    );
};

export default Memo;