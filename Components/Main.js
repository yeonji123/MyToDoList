import { useState, useEffect } from 'react';
import {
    View, Button, StyleSheet, Dimensions, Text, TextInput,
    TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, NativeModules,
    Modal
} from 'react-native';
//fire store
//npx expo install firebase
import { db } from '../firbaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// npm i react-native-progress
import * as Progress from 'react-native-progress';
import TodoCom from './TodoCom';


// 키보드가 가리는 문제 때문에 아마 아이폰에만 있을 듯?
const { StatusBarManager } = NativeModules

const Main = (props) => {
    const [today, setToday] = useState();
    const [fastAdd, setFastAdd] = useState(''); // 빠르게 todo 추가하기
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [modal,setModal] = useState(false);

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
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(!modal);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{height:'20%', backgroundColor:'blue', width:'100%'}}>
                                <Text>dfdf</Text>
                                <Button title='닫기' onPress={()=>setModal(false)}></Button>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>


            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.topView}>
                    <Text style={{ fontSize: 25, marginBottom: 3 }}>{today}</Text>
                    <View style={styles.detail}>
                        <Text>   일정</Text>
                    </View>
                </View>

                    
                <View style={styles.midView}>
                    <View style={{ height: '30%', backgroundColor: 'pink' }}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center', margin: 15, }}>MyToDoList</Text>
                        <Progress.Bar progress={0.5} width={200} borderWidth={4} borderColor='orange' height={15} />
                        <Text>해결한일 / 전체 할일</Text>
                    </View>
                    
                    <ScrollView style={{width:'80%', height:'90%', backgroundColor:'yellow'}}>
                        <TodoCom />
                        
                    </ScrollView>
                </View>

            </TouchableWithoutFeedback>


                <View style={styles.bottomView}>


                    <TouchableOpacity
                        style={styles.plus}
                        onPress={() => {
                            console.log('plus')
                            setModal(true)  
                        }}
                    >
                        <Text style={{ fontSize: 50, textAlign: 'center', }}>+</Text>
                    </TouchableOpacity>

                </View>

            
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topView: {
        height: Dimensions.get('window').height * 0.2,
        width: Dimensions.get('window').width,
        backgroundColor: 'skyblue',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    detail: {
        height: '80%',
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
    },
    midView: {
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width,
        backgroundColor: 'red',
        alignItems: 'center',
    },
    bottomView: {
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width,
        backgroundColor: 'pink',
        padding: 10,
        alignItems: 'flex-end',
    },
    plus: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width:Dimensions.get('window').width*0.8,
        height:Dimensions.get('window').height*0.5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding:20,
    },
})
