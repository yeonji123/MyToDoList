
import { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text,
} from 'react-native';
// npm i react-native-calendars
import {
    Calendar,
    LocaleConfig
} from 'react-native-calendars';

//fire store
//npx expo install firebase
import { db } from '../firbaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const CalendarPage = () => {
    const [selected, setSelected] = useState(''); // 선택한 날짜
    const [schedule, setSchedule] = useState([]); // 전체 할일
    const [detail, setDetail] = useState(''); // 선택한 날짜의 내 할일


    useEffect(() => {
        (async () => {
            try {
                const data = await getDocs(collection(db, "schedule")) // Station이라는 테이블 명
                setSchedule(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌
                data.docs.map(data=>{
                    console.log(data.data())
                })
            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, []);

    return (
        <>
            <View style={{ backgroundColor: 'skyblue' }}>
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

export default CalendarPage;


const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    }
});

