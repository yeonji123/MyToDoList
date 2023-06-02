
import { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text,
    LogBox, Modal, ScrollView, Alert, 
    Image,
} from 'react-native';
// npm i react-native-calendars
import {
    Calendar,
    LocaleConfig
} from 'react-native-calendars';

import styles from '../Components/Style';

//fire store
//npx expo install firebase
import { db } from '../firbaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage'


const CalendarPage = () => {
    // 초기값 :  오늘 날짜
    const [today, setToday] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [selected, setSelected] = useState(''); // 선택한 날짜
    const [schedule, setSchedule] = useState([]); // 전체 할일
    const [id, setId] = useState(''); // id
    const [num, setNum] =useState(0); // 전체 개수
    const [detail, setDetail] = useState(''); // 선택한 날짜의 내 할일
    
    //모달
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState(''); // 입력한 할일

    // 내용 수정
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedschedule, setEditedschedule] = useState(''); // 수정한 할일
    useEffect(() => {
        (async () => {
            try {
                const id=await AsyncStorage.getItem('id')
                setId(id)
                
                var n =0
                const data = await getDocs(collection(db, "Calendar")) // Station이라는 테이블 명
                setSchedule(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌
                data.docs.map(data=>{
                    console.log('data',data.data())
                    if(data.data().id.split("_")[0]==id){
                        console.log('id와 동일한거')
                        n+=1
                    }   
                })
                setNum(n+1) // 마지막 값 추가할때 필요

            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, []);

    // DB에 있는 값 데이터 정제하기
    const markedDates = schedule.reduce((acc, current) => {
        // format에 맞춰서 데이터 저장해두기
        acc[current.dataString] = {marked: true, text:current.sentence}
        return acc;
      }, {});

 


    // 달력에 보일 
    const markedSelectedDates = {
        ...markedDates,
        [selected]: {
            selected: true,
            marked: markedDates[selected]?.marked,
        }
    }


    const addScheduleData = async (inputText, selected) => {
        try {
            console.log('addScheduleData')
            if (inputText) {
                const idname = id + "_" + num

                //data add
                await setDoc(doc(db, "Calendar", idname), {
                    id: idname,
                    sentence: inputText,
                    marked: true,
                    dataString: selected,
                });

                setSchedule([...schedule, { dataString: selected, sentence: inputText }])
            }
            
        } catch (error) {
            console.log('error', error.message)
        }
    }


    // todolist 삭제
    const handleDeleteTodo = async (id) => {
        console.log('handleDeleteTodo', id)
        setSchedule(schedule.filter((todo) => todo.id !== id));
                
        // DB에서 삭제
        await deleteDoc(doc(db, "Calendar", id))
    };


    // 수정 완료 함수
    const handlemodifyTodo = async(item, idx) => {
        console.log('item', item.sentence, 'idx' ,idx)
        setEditingIndex(idx); // 선택한 부분은 textinput값을 갖도록 함
        setEditedschedule(item.sentence); // textinput에 기존 값 넣어주기
    };

    const handleCompleteModify = async (item, idx) => {
        console.log('handleCompleteModify', item)
        const updatedSchedule = [...schedule]; // 원래 데이터를 새로운 변수에 저장
        updatedSchedule[idx].sentence = editedschedule; // 수정한 인덱스 값의 데이터를 sentece를 수정해줌
        setSchedule(updatedSchedule); // 수정한 값을 다시 set
        // 초기화
        setEditingIndex(-1);
        setEditedschedule('');

        const idname = id + "_" + num

        //data add
        await setDoc(doc(db, "Calendar", idname), {
            id: idname,
            sentence: inputText,
            marked: true,
            dataString: selected,
        });
    }




    return (
        <View style={styles.container}>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTop}> 
                                <View style={{width:40, height:40}}></View>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>일정 추가</Text>
                                <TouchableOpacity
                                    style={[styles.addschedule, {backgroundColor:'#DADDE2', }]}
                                    onPress={() => {
                                        setInputText('')
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={{ fontSize: 20 }}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalMid}>
                                <Text> 새로운 일정을 추가해주세요 </Text>
                                <TextInput
                                    style={styles.addScheduleData}
                                    placeholder="Enter a task..."
                                    placeholderTextColor={'#43655A'}
                                    value={inputText}
                                    multiline={true}
                                    onChangeText={setInputText}
                                />
                            </View>

                            <View style={styles.modalBot}>
                                <TouchableOpacity
                                    style={styles.addBottomButton}
                                    onPress={() => {
                                        addScheduleData(inputText, selected)
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={{ fontSize: 15, color:'white', fontWeight:'bold' }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>









            <View style={styles.today}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{today}</Text>
            </View>

            <Calendar
                style={styles.calendar}
                onDayPress={day => {
                    console.log(day)
                    setSelected(day.dateString);
                }}
                markedDates={markedSelectedDates}
                
            />
            <View style={styles.calendarView}>
                <View style={styles.calendarData}>
                    <View style={styles.schduledate}>
                        <View style={{ width: 40, height: 40 }}></View>
                        {
                            selected ?
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selected}</Text> :
                                <Text>날짜를 선택해주세요</Text>
                        }


                        <TouchableOpacity 
                            style={styles.addschedule}
                            onPress={() => {
                                console.log('modal')
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:'100%', height:'85%', padding:10}}>
                    <ScrollView>
                            {
                                selected && schedule?.map((item, idx) => {
                                    if (item.id.split('_')[0] == id && item.dataString == selected ){
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
                                                
                                                {
                                                    idx == editingIndex ? (
                                                        <>
                                                            <TextInput
                                                                placeholder='수정해주세요'
                                                                style={{ flex: 1 }}
                                                                value={editedschedule}
                                                                onChangeText={(text) => setEditedschedule(text)}
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
        </View>
    );
};

export default CalendarPage;


