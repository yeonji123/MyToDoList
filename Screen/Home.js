import { useState, useEffect, } from 'react';

import {
    View, Text, TextInput,
    TouchableOpacity, Keyboard,
    ActivityIndicator, Platform,
    NativeModules, Image,
    Modal, LogBox, Button,
    Alert,
} from 'react-native';

// npm i react-native-circular-progress --save
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// firebase 연동
//npx expo install firebase
import { db } from '../firbaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';

// style
import styles from '../Components/Style'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
// npm i react-native-bouncy-checkbox --save
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { set } from 'react-native-reanimated';

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
    const [icon, seticon] = useState("");

    // 기본 변수값
    const [id, setId] = useState("");
    const [modal, setModal] = useState(false);

    // 키보드 겹침 오류 수정
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    // todolist
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [todolist, setTodolist] = useState([]);

    //progress
    const [fill, setFill] = useState(50);
    const [total, setTotal] = useState(0) // db 전체
    const [value, setValue] = useState(0) // check, state=true개수

    // modify
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedTodo, setEditedTodo] = useState('');

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
            iconsplit = res.weather[0].icon.split('n')
            seticon(iconsplit[0])
        })();
    }, [])


    useEffect(() => {
        (async () => {
            try {
                console.log('Home')

                const id = await AsyncStorage.getItem('id')
                setId(id)

                
                const data = await getDocs(collection(db, "CheckList"));
                // data저장
                setTodolist(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                checkFill(id)
                
            } catch (error) {
                console.log('eerror', error.message)
            }
        })();


    }, [])

    const checkFill = async () => {
        const id = await AsyncStorage.getItem('id')
        // db에서 값 읽어오기
        const data = await getDocs(collection(db, "CheckList"));
        var t = 0
        var c = 0
        // fill 값 계산
        data.docs.map(doc => {
            if (doc.data().id.split('_')[0] == id){
                t+=1 // list 개수
                if (doc.data().state) { // 완료된 todo 개수
                    c += 1
                }
            }
        })

        // console.log('t',t)
        // console.log('c',c)
        // console.log('fill : ', c/t*100)
        setFill(c / t * 100)
    }


    
    // todolist 추가
    const handleAddTodo = async () => {
        if (inputText) {
            // todolist에 추가하고 DB에도 추가
            var idnum = 0
            todolist.map((item, idx) => {
                console.log('item', item)
                if(item.id.split('_')[0] == id){
                    idnum=parseInt(item.id.split('_')[1])
                    console.log(typeof(idnum))
                }
            })
            idnum=idnum+1
            // id
            console.log('db num', idnum)
            var idname = id + '_' + idnum

            // set 하기
            setTodolist([...todolist, { id: idname, sentence: inputText, state: false }]) ;
            console.log('todolist', todolist)
            
            //data add
            await setDoc(doc(db, "CheckList", idname), {
                id: idname,
                sentence: inputText,
                state: false,
            });
            // checkFill()
            checkFill()

            setInputText('');
        }
    };

    // todolist 삭제
    const handleDeleteTodo = async (id) => {
        console.log('handleDeleteTodo', id)
        setTodolist(todolist.filter((todo) => todo.id !== id));
                
        // DB에서 삭제
        await deleteDoc(doc(db, "CheckList", id))
        checkFill()
    };



    // check DB update
    const handleCheckTodo = async (item, checked) => {
        //check 하면 DB 값 바꿔주기
        console.log('handleCheckTodo')
        console.log('checked', checked) //check 여부
        
        // data add
        await setDoc(doc(db, "CheckList", item.id), {
            id:item.id,
            sentence: item.sentence,
            state: checked,
        });
        // 프로그래스바
        checkFill()

    }

    // 수정 완료 함수
    const handlemodifyTodo = async(item, idx) => {
        console.log('item', item, 'idx' ,idx)
        setEditingIndex(idx); // 선택한 부분은 textinput값을 갖도록 함
        setEditedTodo(item.sentence); // textinput에 기존 값 넣어주기
    };

    const handleCompleteModify = async (item, idx) => {
        console.log('handleCompleteModify', item)
        const updatedTodos = [...todolist]; // 원래 데이터를 새로운 변수에 저장
        updatedTodos[idx].sentence = editedTodo; // 수정한 인덱스 값의 데이터를 sentece를 수정해줌
        setTodolist(updatedTodos); // 수정한 값을 다시 set
        // 초기화
        setEditingIndex(-1);
        setEditedTodo('');

        // DB update
        await setDoc(doc(db, "CheckList", item.id), {
            id:item.id,
            sentence: editedTodo,
            state: item.state,
        });

    }


    return (

        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.weatherView}>
                    <View style={styles.weather}>
                        {
                            weather != "" ?
                                <>
                                    <View style={styles.temperature}>

                                        <Image style={{ width: 60, height: 60, marginRight: 10 }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />

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


                    <View style={styles.progressView}>
                        {
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
                        <ScrollView>
                            
                            {
                                todolist?.map((item, idx) => {
                                    if (item.id.split('_')[0] == id){
                                        return (
                                            <TouchableOpacity
                                                style={styles.checklist}
                                                key={idx}
                                                onLongPress={() => {
                                                    console.log('delete')
                                                    Alert.alert('삭제하시겠습니까?','', [
                                                        {
                                                            text: '취소',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel'
                                                        },
                                                        {
                                                            text: '삭제',
                                                            onPress: () => handleDeleteTodo(item.id)
                                                        }
                                                    ])
                                                    
                                                }}
                                            >
                                                <BouncyCheckbox
                                                    size={25}
                                                    fillColor="#43655A"
                                                    unfillColor="#FFFFFF"
                                                    isChecked={item.state}
                                                    iconStyle={{ borderColor: "#43655A" }}
                                                    onPress={(isChecked) => { handleCheckTodo(item, isChecked) }}
                                                />
                                                {
                                                    idx == editingIndex ? (
                                                        <>
                                                            <TextInput
                                                                placeholder='수정해주세요'
                                                                style={{ flex: 1 }}
                                                                value={editedTodo}
                                                                onChangeText={(text) => setEditedTodo(text)}
                                                            />
                                                            
                                                            <TouchableOpacity
                                                                style={styles.modifyButton}
                                                                onPress={()=>handleCompleteModify(item, idx)}
                                                            >
                                                                <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5291/5291043.png' }} />
                                                            </TouchableOpacity>
                                                        </>
                                                    ) 
                                                    : 
                                                    (
                                                        <>
                                                            <Text style={{ flex: 1 }}>{item.sentence}</Text>

                                                            <TouchableOpacity
                                                                style={styles.modifyButton}
                                                                onPress={() => handlemodifyTodo(item, idx)}
                                                            >
                                                                <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://w7.pngwing.com/pngs/818/878/png-transparent-computer-icons-editing-symbol-symbol-miscellaneous-angle-text-thumbnail.png' }} />
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                }


                                            </TouchableOpacity>

                                        )
                                    }
                                })

                            }
                        </ScrollView>

                    </View>
                </View>
            </View>



        </View >

    );
};

export default Home;


