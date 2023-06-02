import { useState, useEffect, } from 'react';

import {
    View, Text, TextInput,
    TouchableOpacity, Keyboard,
    ActivityIndicator, Platform,
    NativeModules, Image,
    Modal, LogBox, Button,
    FlatList,
} from 'react-native';

// npm i react-native-circular-progress --save
import { AnimatedCircularProgress } from 'react-native-circular-progress';

//fire store
//npx expo install firebase
import { db } from '../firbaseConfig';
import { collection, getDocs } from 'firebase/firestore';
// style
import styles from '../Components/Style'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
// npm i react-native-bouncy-checkbox --save
import BouncyCheckbox from "react-native-bouncy-checkbox";

// warning 무시
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

//날씨 api키
const API_KEY = "204756a8614d5d5f3d4e6544f1cd8c7d"

// 키보드가 가리는 문제 때문에 아마 아이폰에만 있을 듯?
const { StatusBarManager } = NativeModules

const Home = (props) => {
    //날씨
    const [weather, setWeather] = useState("");
    const [address, setAddress] = useState("");

    // 기본 변수값
    const [id, setId] = useState("");
    const [modal, setModal] = useState(false);
    const [today, setToday] = useState("");

    // 키보드 겹침 오류 수정
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    // todolist
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');

    //progress
    const [fill, setFill] = useState(50);



    useEffect(async () => {
        try {
            const id = await AsyncStorage.getItem('id')
            setId(id)

        } catch (e) {
            // saving error
        }
    }, [])


    // todolist 추가
    const handleAddTodo = () => {
        if (inputText) {
            setTodos([...todos, { id: Date.now(), text: inputText }]);
            setInputText('');
        }
    };
    // todolist 삭제
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));

    };




    useEffect(() => {
        (async () => {

            //위치 수집 허용하는지 물어보기
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // 사용자의 위치에 맞는 날씨 정보 가져오기
            let location = await Location.getCurrentPositionAsync({});
            let addresscheck = await Location.reverseGeocodeAsync(location.coords);
            var addresstotal = addresscheck[0].region + ' ' + addresscheck[0].city // 충청남도 아산시    
            setAddress(addresstotal)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(5)}&lon=${location.coords.longitude.toFixed(5)}&appid=${API_KEY}&units=metric`);
            const res = await response.json()
            // console.log('temp -> ',res)
            setWeather(res)
        })();
    }, [])

    useEffect(() => {
        let todayData = new Date();
        setToday(todayData.toLocaleDateString())
    }, []);

    useEffect(() => {
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             console.log('Main')
    //             const data = await getDocs(collection(db, "StationNotification")) // Station이라는 테이블 명
    //             setNotifiData(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌
    //             data.docs.map(doc => (console.log(doc.data())))
    //         } catch (error) {
    //             console.log('eerror', error.message)
    //         }
    //     })();
    // }, []);

    return (

        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.weatherView}>
                    <View style={styles.weather}>
                        {
                            weather != "" ?
                                <>
                                    <View style={styles.temperature}>

                                        <Image style={{ width: 60, height: 60, marginRight: 10 }} source={{ uri: `http://openweathermap.org/img/wn/10d@2x.png` }} />

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 30 }}>{weather.main.temp.toFixed(0)}</Text>
                                            <Text style={{ fontSize: 20 }}>  °C </Text>
                                        </View>
                                    </View>
                                    <View style={styles.location}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{address}</Text>
                                    </View>
                                </>
                                :
                                <ActivityIndicator />
                        }
                    </View>
                </View>
            </View>


            <View style={styles.middleView}>
                <View style={styles.totalcheck}>


                    <View style={styles.progressView}>{
                        id ?
                            <AnimatedCircularProgress
                                size={80}
                                width={10}
                                fill={fill}
                                tintColor="#43655A"
                                onAnimationComplete={() => {

                                    console.log('onAnimationComplete')
                                }}
                                backgroundColor="#B1BDC5"
                                arcSweepAngle={280}
                                rotation={220}
                            >
                                {
                                    (fill) => {
                                        fill = fill.toFixed(0)
                                        return (
                                            <Text
                                                style={{ fontSize: 15, fontWeight: 'bold', color: '#43655A', marginTop: 10 }}
                                            >
                                                {fill} %
                                            </Text>
                                        )
                                    }
                                }
                            </AnimatedCircularProgress>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>로그인을 해주세요</Text>
                                <Button title='로그인' onPress={() => props.navigation.reset({ routes: [{ name: 'Login' }] })} />
                            </View>
                    }
                    </View>


                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.addinput}
                            placeholder="Enter a task..."
                            value={inputText}
                            onChangeText={setInputText}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddTodo}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#43655A' }}>Add</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.checklistView}>
                        <FlatList
                            data={todos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                console.log(item)
                                console.log('todo', todos)
                                return (
                                    <View
                                        style={styles.checklist}
                                    >
                                        <BouncyCheckbox
                                            size={25}
                                            fillColor="#43655A"
                                            unfillColor="#FFFFFF"
                                            text=""
                                            iconStyle={{ borderColor: "#43655A" }}
                                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                            onPress={(isChecked) => { console.log('item :', item, 'ischecked', isChecked) }}
                                        />
                                        <Text style={{ flex: 1 }}>{item.text}</Text>
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => handleDeleteTodo(item.id)}
                                        >
                                            <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png' }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />

                    </View>
                </View>
            </View>



        </View >

    );
};

export default Home;


