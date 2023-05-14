
import { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
} from 'react-native';
// npm i react-native-calendars
import {
    Calendar, 
    LocaleConfig
} from 'react-native-calendars';




const CalendarComponent = () => {
    const [selected, setSelected] = useState(''); // 선택한 날짜



    return (
        <>
        <View style={{backgroundColor:'skyblue'}}>
            <Text> 2023.05.11</Text>
        </View>

            <Calendar
                style={styles.calendar}
                onDayPress={day => {
                    console.log(day)
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </>
    );
};

export default CalendarComponent;


const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    }
});

