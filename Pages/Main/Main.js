import { useState, useEffect } from 'react';
import { View, Button } from 'react-native';



const Main = (props) => {
    return (
        <>
            <Button title='Todo' onPress={() => (props.navigation.navigate("Todo"))}></Button>
            <Button title='CalendarComponent' onPress={() => (props.navigation.navigate("CalendarComponent"))}></Button>
        </>
    );
};

export default Main;